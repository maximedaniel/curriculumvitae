import { cv } from "../../data/cv";
import { asset, ExtLink, Md } from "../ui";
import { useCv } from "./context";

// Common rendering for experiences, educations and missions.
interface Row {
  thumbnail: string;
  title: string;
  period: string;
  institution?: string;
  url?: string;
  location?: string;
  hover?: boolean;
}

function TimelineList({ rows, table }: { rows: Row[]; table: boolean }) {
  const { printable } = useCv();
  if (printable && table) {
    return (
      <div className="grid gap-2">
        <div className="g-col-12">
          <table className="table table-borderless">
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td style={{ textAlign: "right" }}>
                    <Md text={r.period} />
                  </td>
                  <td>
                    <b>
                      <Md text={r.title} />
                    </b>
                    <br />
                    {r.institution ? (
                      <>
                        <ExtLink href={r.url ?? ""}>{r.institution}</ExtLink>,{" "}
                      </>
                    ) : null}
                    {r.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  return (
    <div className="grid gap-2">
      {rows.map((r, i) => (
        <div className="g-col-12" key={i}>
          <div className="grid">
            <div className="g-col-2 d-flex align-items-center justify-content-center">
              {r.thumbnail ? (
                <img
                  src={asset(r.thumbnail)}
                  className={r.hover ? "image-hover-effect" : undefined}
                  style={{ maxHeight: 100, maxWidth: "100%", objectFit: "contain" }}
                />
              ) : null}
            </div>
            <div className="g-col-10 d-flex align-items-center">
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
                <div style={{ fontSize: "1em" }}>
                  <Md text={r.title} />
                </div>
                <div style={{ fontSize: "0.8em", color: "rgba(0,0,0,.4)" }}>
                  <Md text={r.period} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Experiences() {
  const { lang } = useCv();
  const rows = cv.experiences.items.map((e) => ({
    thumbnail: e.thumbnail, title: e.position[lang], period: e.period[lang],
    institution: e.institution[lang], url: e.url, location: e.location[lang],
  }));
  return <TimelineList rows={rows} table />;
}

export function Educations() {
  const { lang } = useCv();
  const rows = cv.educations.items.map((e) => ({
    thumbnail: e.thumbnail, title: e.degree[lang], period: e.period[lang],
    institution: e.institution[lang], url: e.url, location: e.location[lang], hover: true,
  }));
  return <TimelineList rows={rows} table />;
}

export function Missions() {
  const { lang } = useCv();
  const rows = cv.missions.items.map((m) => ({ thumbnail: m.thumbnail, title: m.position[lang], period: m.period[lang] }));
  // Missions use the same layout in the web and the printable page.
  return (
    <div className="grid">
      <TimelineList rows={rows} table={false} />
    </div>
  );
}
