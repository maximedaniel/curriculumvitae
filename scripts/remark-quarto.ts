// Remark plugin. It does the work that Quarto did for cross-references and citations.
//
// - <Figure id> and <Sub id> receive a number and a letter.
// - <Ref id="fig-x" /> receives the label, for example "Figure 5 (a)".
// - <Cite k="a,b" /> receives the number of each cited entry.
// - <References /> receives the formatted list of the cited entries.
import { readFileSync } from "node:fs";
import { visit } from "unist-util-visit";
import { Cite, plugins } from "@citation-js/core";
import "@citation-js/plugin-bibtex";
import "@citation-js/plugin-csl";

const BIB_FILE = new URL("../src/bibliography.bib", import.meta.url);
const CSL_FILE = new URL("../src/sigchi-ext.csl", import.meta.url);

let bibEntries: Record<string, any>[] | undefined;

// Read the value of a BibTeX field with its braces. A value is "{...}" or "...".
function readField(entry: string, field: string): string | undefined {
  const m = new RegExp(`(?:^|[\\s,])${field}\\s*=\\s*`, "i").exec(entry);
  if (!m) return undefined;
  let i = m.index + m[0].length;
  const open = entry[i];
  if (open === '"') return entry.slice(i + 1, entry.indexOf('"', i + 1));
  if (open !== "{") return undefined;
  let depth = 0;
  const start = i + 1;
  for (; i < entry.length; i++) {
    if (entry[i] === "{") depth++;
    else if (entry[i] === "}" && --depth === 0) return entry.slice(start, i);
  }
  return undefined;
}

// Convert a title to sentence case. Words in braces are protected, as in BibTeX.
// Pandoc does the same when it reads a BibTeX file.
export function sentenceCase(raw: string): string {
  let out = "";
  let capNext = true;
  let i = 0;
  while (i < raw.length) {
    const c = raw[i];
    if (c === "{") {
      let depth = 0;
      let j = i;
      for (; j < raw.length; j++) {
        if (raw[j] === "{") depth++;
        else if (raw[j] === "}" && --depth === 0) break;
      }
      out += raw.slice(i + 1, j).replace(/[{}]/g, "");
      capNext = false;
      i = j + 1;
      continue;
    }
    const word = /^\p{L}[\p{L}'’]*/u.exec(raw.slice(i));
    if (word) {
      let w = word[0];
      if (capNext) w = w[0].toUpperCase() + w.slice(1);
      else if (/^\p{Lu}\p{Ll}*$/u.test(w)) w = w.toLowerCase();
      out += w;
      capNext = false;
      i += word[0].length;
      continue;
    }
    if (c === ":") capNext = true;
    out += c;
    i++;
  }
  return out;
}

function loadBib() {
  if (!bibEntries) {
    plugins.config.get("@csl").styles.add("sigchi", readFileSync(CSL_FILE, "utf8"));
    const text = readFileSync(BIB_FILE, "utf8");
    const entries: Record<string, any>[] = new Cite(text).data;
    // Apply the sentence case to the titles from the raw text, where the braces are still present.
    const raw = new Map<string, string>();
    for (const chunk of text.split(/^\s*@/m).slice(1)) {
      const key = /^\w+\s*\{\s*([^,\s]+)\s*,/.exec(chunk)?.[1];
      if (key) raw.set(key, chunk);
    }
    for (const e of entries) {
      const chunk = raw.get(e.id);
      if (!chunk) continue;
      const clean = (s: string) =>
        sentenceCase(s)
          .replace(/\\&/g, "&")
          .replace(/`([^`']*)'/g, "“$1”");
      // Pandoc ignores "booktitle" in an article without a journal.
      if (/^article\b/i.test(chunk) && !readField(chunk, "journal")) delete e["container-title"];
      const title = readField(chunk, "title");
      if (title && e.title) e.title = clean(title);
      const book = readField(chunk, "booktitle");
      if (book && e["container-title"]) e["container-title"] = clean(book);
      // Pandoc prints the "address" field as the place. The "location" field is not used.
      const address = readField(chunk, "address");
      if (address) {
        e["publisher-place"] = address;
        e["event-place"] = address;
      }
    }
    bibEntries = entries;
  }
  return bibEntries!;
}

// Return the formatted entries in the sorted order of the style.
function formatEntries(keys: string[]): { key: string; html: string }[] {
  const entries = loadBib().filter((e) => keys.includes(e.id));
  const missing = keys.filter((k) => !entries.some((e) => e.id === k));
  if (missing.length) throw new Error(`Unknown citation key: ${missing.join(", ")}`);
  const html: string = new Cite(entries).format("bibliography", {
    format: "html",
    template: "sigchi",
    lang: "en-US",
  });
  const out: { key: string; html: string }[] = [];
  const re = /<div[^>]*data-csl-entry-id="([^"]+)"[^>]*>([\s\S]*?)<\/div>\s*(?=<div[^>]*data-csl-entry-id|<\/div>\s*$)/g;
  for (const m of html.matchAll(re)) {
    // Remove the number that the style adds. The component adds its own number.
    const inner = m[2]
      .replace(/<div class="csl-left-margin">[\s\S]*?<\/div>/, "")
      .replace(/^\s*<div class="csl-right-inline">([\s\S]*)<\/div>\s*$/, "$1")
      .trim();
    out.push({
      key: m[1],
      html: inner
        .replace(/ and others /, " et al. ")
        .replace(/\b(June|July)(?= \d{4})/, (_, month: string) => (month === "June" ? "Jun." : "Jul.")),
    });
  }
  if (out.length !== entries.length) throw new Error("Could not parse the bibliography output.");
  return out;
}

const attr = (node: any, name: string): string | undefined =>
  node.attributes?.find((a: any) => a.type === "mdxJsxAttribute" && a.name === name)?.value;

function setAttr(node: any, name: string, value: string) {
  node.attributes = (node.attributes ?? []).filter((a: any) => a.name !== name);
  node.attributes.push({ type: "mdxJsxAttribute", name, value });
}

const isJsx = (n: any) => n.type === "mdxJsxFlowElement" || n.type === "mdxJsxTextElement";

export default function remarkQuarto() {
  return (tree: any) => {
    // Pass 1: number the figures.
    const labels = new Map<string, string>();
    let figureCount = 0;
    visit(tree, (node: any) => {
      if (!isJsx(node) || node.name !== "Figure") return;
      figureCount += 1;
      setAttr(node, "num", String(figureCount));
      const id = attr(node, "id");
      if (id) labels.set(id, `Figure ${figureCount}`);
      let letter = 0;
      visit(node, (sub: any) => {
        if (!isJsx(sub) || sub.name !== "Sub") return;
        const letterChar = String.fromCharCode(97 + letter++);
        setAttr(sub, "letter", letterChar);
        const subId = attr(sub, "id");
        if (subId) labels.set(subId, `Figure ${figureCount} (${letterChar})`);
      });
    });

    // Pass 2: collect the citations.
    const cited = new Set<string>();
    visit(tree, (node: any) => {
      if (isJsx(node) && node.name === "Cite") {
        for (const k of (attr(node, "k") ?? "").split(",")) cited.add(k.trim());
      }
    });
    const formatted = cited.size ? formatEntries([...cited]) : [];
    const numbers = new Map(formatted.map((e, i) => [e.key, i + 1]));

    visit(tree, (node: any) => {
      if (!isJsx(node)) return;
      if (node.name === "Ref") {
        const id = attr(node, "id") ?? "";
        const label = attr(node, "label") ?? labels.get(id);
        if (!label) throw new Error(`Unknown reference: ${id}`);
        setAttr(node, "label", label);
      } else if (node.name === "Cite") {
        const keys = (attr(node, "k") ?? "").split(",").map((k) => k.trim());
        setAttr(node, "n", keys.map((k) => numbers.get(k)!).sort((a, b) => a - b).join(","));
      } else if (node.name === "References") {
        setAttr(node, "data", JSON.stringify(formatted.map((e, i) => ({ ...e, n: i + 1 }))));
      }
    });
  };
}
