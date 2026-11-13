import { smartypantsu as smartypants } from "smartypants";
import raw from "./cv.yml";
import type { CvData } from "../lib/cv-types";

// These keys hold paths, links or identifiers. Do not change their text.
const LITERAL_KEYS = new Set(["thumbnail", "pdf", "doi", "href", "url", "icon", "youtube", "vimeo", "color", "bibliography"]);

// Use typographic quotes and dashes in all the text of the CV, as Pandoc did.
function smart(value: unknown, key = ""): unknown {
  if (typeof value === "string") return LITERAL_KEYS.has(key) ? value : smartypants(value, 2);
  if (Array.isArray(value)) return value.map((v) => smart(v, key));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, smart(v, k)]));
  }
  return value;
}

export const cv = smart(raw) as unknown as CvData;
