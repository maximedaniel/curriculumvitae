import { Marked } from "marked";
import { markedSmartypants } from "marked-smartypants";

const marked = new Marked().use(markedSmartypants());

// Render an inline Markdown string (with smart quotes and dashes) to HTML.
export function inlineHtml(text: string): string {
  const withSpans = text.replace(/\[([^\]]+)\]\{\.underline\}/g, '<span class="underline">$1</span>');
  return marked.parseInline(withSpans, { async: false }) as string;
}
