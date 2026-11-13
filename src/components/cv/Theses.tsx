import { cv } from "../../data/cv";
import { asset, Collapsible, css, Md, MoreButton, useToggle } from "../ui";
import { useCv } from "./context";
import type { Thesis } from "../../lib/cv-types";

function Jury({ thesis }: { thesis: Thesis }) {
  const { lang } = useCv();
  return (
    <table className="table table-borderless table-sm">
      <thead>
        <tr>
          {cv.theses.titles.jury[lang].map((h) => (
            <th scope="col" key={h}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {thesis.jury.map((m) => (
          <tr key={m.name}>
            <td>{m.name}</td>
            <td>{m.role[lang]}</td>
            <td>{m.position[lang]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Details({ thesis }: { thesis: Thesis }) {
  const { lang } = useCv();
  const t = cv.theses.titles;
  const laboratory = typeof thesis.laboratory === "string" ? thesis.laboratory : thesis.laboratory[lang];
  return (
    <div className="d-flex flex-column align-items-left">
      <h3 style={{ marginBottom: 0 }}>
        <Md text={thesis.title[lang]} />
      </h3>
      <p className="subtitle lead">
        <Md text={thesis.name[lang]} />
      </p>
      <div style={{ fontSize: "1em", marginBottom: "1rem" }}>
        <b>{t.abstract[lang]}</b>
        <br />
        <Md text={thesis.abstract[lang]} />
      </div>
      <div style={{ fontSize: "1em", marginBottom: "1rem" }}>
        <b>{t.laboratory[lang]}</b>
        <br />
        <Md text={laboratory} />
      </div>
      <div style={{ fontSize: "1em", marginBottom: "1rem" }}>
        <Jury thesis={thesis} />
      </div>
    </div>
  );
}

function ThesisItem({ thesis }: { thesis: Thesis }) {
  const { lang, printable } = useCv();
  const { open, toggle } = useToggle();
  return (
    <div className="g-col-12">
      <div className="grid">
        <div className="g-col-2 d-flex align-self-start">
          <img src={asset(thesis.thumbnail)} style={{ maxHeight: 100, maxWidth: "100%", objectFit: "contain" }} />
        </div>
        <div className="g-col-10 d-flex align-items-center gap-2">
          <div style={css({ display: "flex", flexDirection: "column", lineHeight: 1.2 })}>
            <div style={{ marginBottom: "0.5rem" }}>
              <Md text={thesis.ref[lang]} />
            </div>
            {printable ? (
              <Details thesis={thesis} />
            ) : (
              <>
                <div className="d-inline-flex align-items-center gap-2">
                  <a className="btn btn-sm btn-outline-dark" href={asset(thesis.pdf)} target="_blank" rel="noreferrer">
                    <i className="bi bi-box-arrow-up-right" /> PDF
                  </a>
                  <MoreButton open={open} onClick={toggle} />
                </div>
                <Collapsible open={open}>
                  <Details thesis={thesis} />
                </Collapsible>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Theses() {
  return (
    <div className="grid">
      {cv.theses.items.map((t) => (
        <ThesisItem key={t.pdf} thesis={t} />
      ))}
    </div>
  );
}
