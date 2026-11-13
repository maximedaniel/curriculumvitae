import { cv } from "../../data/cv";
import { Badge, ExtLink, Icon, Md } from "../ui";
import { useCv } from "./context";

const GRID_HALF = "g-col-12 g-col-sm-12 g-col-md-12 g-col-lg-6";
const heading = { fontSize: "1.25rem", fontWeight: 400, lineHeight: 1.2 } as const;
const subheading = { fontSize: "1rem", fontWeight: 400, lineHeight: 1, opacity: 0.75 } as const;

export function Coordinations() {
  const { lang } = useCv();
  const cats = cv.coordinations.titles.categories[lang];
  return (
    <div className="grid">
      {cv.coordinations.items.map((c) => (
        <div className={GRID_HALF} key={c.name.en}>
          <div className="text-start" style={heading}>
            {c.name[lang]}
          </div>
          <div className="text-start" style={subheading}>
            {c.period[lang]}
          </div>
          <div className="text-start" style={{ marginBottom: "0.5rem" }}>
            {c.tools[lang].map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <div className="text-start">
            <Icon name="bookmark-fill" /> <b>{cats[0]}:</b> {c.level[lang]}
          </div>
          <div className="text-start">
            <Icon name="geo-alt-fill" /> <b>{cats[1]}:</b> {c.location[lang]}
          </div>
          <div className="text-start">
            <Icon name="stopwatch" /> <b>{cats[2]}:</b> {c.volume[lang]}
          </div>
          <div className="text-start">
            <Icon name="bullseye" /> <b>{cats[3]}:</b>
            <ul style={{ marginBottom: "0.25rem" }}>
              {c.aavs[lang].map((a) => (
                <li key={a}>
                  <Md text={a} />
                </li>
              ))}
            </ul>
          </div>
          {c.responsibilities[lang].length > 0 && (
            <div className="text-start">
              <Icon name="bullseye" /> <b>{cats[4]}:</b>
              <ul style={{ marginBottom: "0.25rem" }}>
                {c.responsibilities[lang].map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          )}
          {c.links && c.links.length > 0 && (
            <div className="text-start">
              <Icon name="bullseye" /> <b>{cats[5]}:</b>{" "}
              {c.links.map((l, i) => (
                <span key={l.href}>
                  <ExtLink href={l.href}>{l.text[lang]}</ExtLink>
                  {i < c.links!.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function Reviews() {
  const { lang } = useCv();
  return (
    <div className="grid">
      <div className="g-col-12 g-col-sm-12 g-col-md-12 g-col-lg-12">
        <table className="table table-sm table-borderless">
          <thead>
            <tr>
              {cv.reviews.titles.review[lang].map((h) => (
                <th scope="col" key={h}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cv.reviews.items.map((r) => (
              <tr key={r.name.en}>
                <td>{r.name[lang]}</td>
                <td>{r.assigned}</td>
                <td>{r.recognized}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Supervisions() {
  const { lang } = useCv();
  const h = cv.supervisions.titles.headers[lang];
  return (
    <div className="grid">
      {cv.supervisions.items.map((s) => (
        <div className={GRID_HALF} key={s.name}>
          <div className="text-start" style={heading}>
            {s.name}
          </div>
          <div className="text-start" style={{ ...subheading, marginBottom: "0.5rem" }}>
            {s.level[lang]}
          </div>
          <div className="text-start">
            <Icon name="bookmark-fill" />
            <b>{h[0]}:</b> <i>{s.topic[lang]}</i>
          </div>
          <div className="text-start">
            <Icon name="hourglass-split" />
            <b>{h[1]}:</b> {s.duration[lang]}
          </div>
          <div className="text-start">
            <Icon name="geo-alt-fill" />
            <b>{h[2]}:</b> {s.location[lang]}
          </div>
          <div className="text-start">
            <Icon name="clipboard2-check-fill" />
            <b>{h[3]}:</b> {s.supervisor[lang]}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Animations() {
  const { lang } = useCv();
  const h = cv.animations.titles.headers[lang];
  return (
    <div className="grid">
      {cv.animations.items.map((a) => (
        <div className={GRID_HALF} key={a.title.en}>
          <div className="text-start" style={heading}>
            {a.type[lang]}
          </div>
          <div className="text-start" style={{ ...subheading, marginBottom: "0.5rem" }}>
            {a.title[lang]}
          </div>
          <div className="text-start">
            <Icon name="card-text" /> <b>{h[0]}:</b> <i>{a.description[lang]}</i>
          </div>
          <div className="text-start">
            <Icon name="person-fill" /> <b>{h[1]}:</b> {a.role[lang]}
          </div>
          <div className="text-start">
            <Icon name="calendar" /> <b>{h[2]}:</b> {a.date[lang]}
          </div>
          <div className="text-start">
            <Icon name="geo-alt-fill" /> <b>{h[3]}:</b> {a.location[lang]}
          </div>
        </div>
      ))}
    </div>
  );
}
