import { smartypantsu } from "smartypants";
import { Film, FilmGallery } from "../interactive/FilmGallery";
import { Field, VennDiagram } from "../interactive/VennDiagram";
import { Children, isValidElement, useState, type ComponentProps, type ReactElement, type ReactNode } from "react";
// ---------- Figures ----------

interface SubProps {
  id?: string;
  src: string;
  width?: string;
  letter?: string; // set by the remark plugin
  children?: ReactNode;
}

// One subfigure. The parent Figure lays out the subfigures.
export function Sub({ id, src, width, letter, children }: SubProps) {
  return (
    <figure id={id} className="q-subfigure">
      <img src={src} className="img-fluid" style={width ? { width } : undefined} alt="" />
      {children && (
        <figcaption>
          ({letter}) {children}
        </figcaption>
      )}
    </figure>
  );
}

// The caption of a Figure.
export function Caption({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

// An image with an optional caption. Quarto used the alternative text as the caption.
export function Picture({ id, src, width, children }: { id?: string; src: string; width?: string; children?: ReactNode }) {
  return (
    <figure id={id} className="figure q-picture">
      <img src={src} className="img-fluid figure-img" style={width ? { width } : undefined} alt="" />
      {children && <figcaption>{children}</figcaption>}
    </figure>
  );
}

interface FigureProps {
  id?: string;
  num?: string; // set by the remark plugin
  cols?: number;
  layout?: number[][];
  children: ReactNode;
}

export function Figure({ id, num, cols, layout, children }: FigureProps) {
  const items = Children.toArray(children);
  const isSub = (c: ReactNode): c is ReactElement => isValidElement(c) && c.type === Sub;
  const subs = items.filter(isSub);
  const caption = items.find((c) => isValidElement(c) && c.type === Caption) as ReactElement<{ children: ReactNode }> | undefined;
  let body: ReactNode = subs.length ? null : items.filter((c) => c !== caption);
  if (subs.length) {
    const rows: number[][] = layout ?? chunk(subs.length, cols ?? subs.length);
    let index = 0;
    body = rows.map((weights, r) => {
      const total = weights.reduce((a, b) => a + b, 0);
      return (
        <div className="q-row" key={r}>
          {weights.map((w, c) => {
            const sub = subs[index++];
            return (
              <div className="q-cell" key={c} style={{ flex: `${w / total} 1 0` }}>
                {sub}
              </div>
            );
          })}
        </div>
      );
    });
  }
  return (
    <figure id={id} className="q-figure">
      {body}
      {caption && (
        <figcaption>
          Figure&nbsp;{num}: {caption.props.children}
        </figcaption>
      )}
    </figure>
  );
}

function chunk(count: number, size: number): number[][] {
  const rows: number[][] = [];
  for (let i = 0; i < count; i += size) rows.push(Array(Math.min(size, count - i)).fill(1));
  return rows;
}

// ---------- Cross-references and citations ----------

export function Ref({ id, label }: { id: string; label?: string }) {
  return (
    <a href={`#${id}`} className="q-ref">
      {label}
    </a>
  );
}

export function Cite({ k, n }: { k: string; n?: string }) {
  const keys = k.split(",");
  const numbers = (n ?? "").split(",");
  return (
    <span className="citation">
      [
      {keys.map((key, i) => (
        <span key={key}>
          {i > 0 ? ", " : ""}
          <a href={`#ref-${key}`}>{numbers[i]}</a>
        </span>
      ))}
      ]
    </span>
  );
}

export function References({ data }: { data?: string }) {
  const entries: { key: string; n: number; html: string }[] = data ? JSON.parse(data) : [];
  return (
    <div id="refs" className="references csl-bib-body" role="list">
      {entries.map((e) => (
        <div id={`ref-${e.key}`} className="csl-entry" role="listitem" key={e.key}>
          <div className="csl-left-margin">[{e.n}] </div>
          <div className="csl-right-inline" dangerouslySetInnerHTML={{ __html: e.html }} />
        </div>
      ))}
    </div>
  );
}

// ---------- Tabs ----------

export function Tab({ children }: { title: string; children: ReactNode }) {
  return <>{children}</>;
}

export function Tabs({ children }: { children: ReactNode }) {
  const tabs = Children.toArray(children).filter(isValidElement) as ReactElement<{ title: string; children: ReactNode }>[];
  const [active, setActive] = useState(0);
  return (
    <div className="panel-tabset">
      <ul className="nav nav-tabs" role="tablist">
        {tabs.map((t, i) => (
          <li className="nav-item" role="presentation" key={t.props.title}>
            <a
              href="#"
              className={i === active ? "nav-link active" : "nav-link"}
              role="tab"
              aria-selected={i === active}
              onClick={(e) => {
                e.preventDefault();
                setActive(i);
              }}
            >
              {smartypantsu(t.props.title, 2)}
            </a>
          </li>
        ))}
      </ul>
      <div className="tab-content">
        {tabs.map((t, i) => (
          <div className={i === active ? "tab-pane active show" : "tab-pane"} role="tabpanel" key={t.props.title}>
            {t.props.children}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Elements ----------

export const mdxComponents = {
  Figure,
  Sub,
  Caption,
  Picture,
  FilmGallery,
  Film,
  VennDiagram,
  Field,
  Ref,
  Cite,
  References,
  Tabs,
  Tab,
  table: (props: ComponentProps<"table">) => <table className="table" {...props} />,
  img: (props: ComponentProps<"img">) => <img className="img-fluid" {...props} />,
};
