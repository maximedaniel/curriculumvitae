import { cv } from "../../data/cv";
import type { Publication } from "../../lib/cv-types";
import { asset, css, Icon, Keywords, Md } from "../ui";
import { useCv } from "./context";

const BREADCRUMB_DIVIDER =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E\")";

function Submissions({ items }: { items: NonNullable<Publication["submissions"]> }) {
  return (
    <ol className="breadcrumb" style={{ marginBottom: "0.25rem" }}>
      {items.map((s, i) => {
        const last = i === items.length - 1;
        return (
          <li key={s.name} className={last ? "breadcrumb-item" : "breadcrumb-item active"}>
            <Icon name={last ? "check" : "x"} style={{ verticalAlign: "middle", WebkitTextStroke: "1px" }} />
            {s.name} ({s.track})
          </li>
        );
      })}
    </ol>
  );
}

function PublicationItem({ pub }: { pub: Publication }) {
  const { lang, printable } = useCv();
  const keywords = pub.keywords?.[lang] ?? [];
  const note = pub.note?.[lang];
  const body = (
    <div>
      <Keywords items={keywords} />
      <p style={{ marginBottom: "0.25rem" }}>
        <Md text={pub.ref} />{" "}
        {pub.doi ? (
          <a href={pub.doi} target="_blank" rel="noreferrer">
            {pub.doi}
          </a>
        ) : null}
      </p>
      {note ? (
        <p style={{ marginBottom: "0.25rem", fontSize: "0.8em", opacity: 0.75 }}>
          <Md text={note} />
        </p>
      ) : null}
    </div>
  );

  if (printable) {
    return (
      <>
        <div className="g-col-1" />
        <div className="g-col-11">
          <div className="grid">
            <div className="g-col-12 d-flex align-items-center gap-2">
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>{body}</div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="g-col-12">
      <div className="grid">
        <div className="g-col-2 d-flex align-items-center justify-content-center">
          <img src={asset(pub.thumbnail)} style={{ maxHeight: 100, maxWidth: "100%", objectFit: "contain" }} />
        </div>
        <div className="g-col-10 d-flex align-items-center gap-2">
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
            <nav style={css({ "--bs-breadcrumb-divider": BREADCRUMB_DIVIDER })} aria-label="breadcrumb">
              {pub.submissions ? <Submissions items={pub.submissions} /> : <ol className="breadcrumb" style={{ marginBottom: "0.25rem" }} />}
            </nav>
            {body}
            <div className="d-inline-flex align-items-center gap-2">
              {pub.pdf ? (
                <a className="btn btn-sm btn-outline-dark" href={asset(pub.pdf)} target="_blank" rel="noreferrer">
                  <Icon name="box-arrow-up-right" /> PDF
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Publications() {
  const { lang } = useCv();
  return (
    <>
      {cv.publications.categories.map((category) => (
        <div key={category.title.en}>
          <h3>{category.title[lang]}</h3>
          <div className="grid gap-4">
            {category.items.map((pub) => (
              <PublicationItem key={pub.ref} pub={pub} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
