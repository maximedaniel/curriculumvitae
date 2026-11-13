import { useState, type CSSProperties, type ReactNode } from "react";
import { inlineHtml } from "../lib/md";

// Allow CSS custom properties in a style object.
export const css = (style: Record<string, string | number>) => style as CSSProperties;

// Convert a path from the data ("assets/img/x.jpg") to a path from the site root.
export const asset = (path: string) => (path.startsWith("/") || /^https?:/.test(path) ? path : `/${path}`);

// Inline Markdown text with smart punctuation.
export function Md({ text, as: Tag = "span", ...rest }: { text: string; as?: "span" | "div" | "p" | "li" } & Record<string, unknown>) {
  return <Tag {...rest} dangerouslySetInnerHTML={{ __html: inlineHtml(text) }} />;
}

export function Icon({ name, style }: { name: string; style?: CSSProperties }) {
  return <i className={`bi bi-${name}`} style={style} />;
}

export function Badge({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <span className="badge bg-light" style={style}>
      {children}
    </span>
  );
}

export function Keywords({ items, large }: { items: string[]; large?: boolean }) {
  if (!items.length) return null;
  const style: CSSProperties = large
    ? { marginRight: "0.25rem", fontSize: "1rem" }
    : { marginRight: "0.25rem", marginBottom: "0.25rem" };
  return (
    <div className="d-inline-flex align-items-start flex-wrap">
      {items.map((k) => (
        <Badge key={k} style={style}>
          <Md text={k} />
        </Badge>
      ))}
    </div>
  );
}

// A link with the "external" icon, as in the printable CV.
export function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children} <Icon name="box-arrow-up-right" style={{ fontSize: "0.8em" }} />
    </a>
  );
}

// State for a "More" / "Less" button and the collapsed content that it controls.
export function useToggle() {
  const [open, setOpen] = useState(false);
  return { open, toggle: () => setOpen((v) => !v) };
}

export function MoreButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <a
      className="btn btn-outline-dark btn-sm btn-collapse"
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onClick())}
    >
      <Icon name={open ? "caret-down-fill" : "caret-right-fill"} />
      <span> {open ? "Less" : "More"}</span>
    </a>
  );
}

export function Collapsible({ open, children }: { open: boolean; children: ReactNode }) {
  return <div className={open ? "collapse show" : "collapse"}>{children}</div>;
}
