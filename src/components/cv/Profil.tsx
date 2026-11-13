import { cv } from "../../data/cv";
import { asset, css, Icon, Keywords, Md } from "../ui";
import { useCv } from "./context";

export function Profil() {
  const { lang, printable } = useCv();
  const p = cv.profil;
  const keywords = p.keywords[lang] ?? p.keywords.en;
  const thumbnail = <img src={asset(p.thumbnail)} className="img-thumbnail" alt="Profil picture" style={{ border: "none" }} />;
  const info = p.informations.items.map((i) => (
    <div className="d-inline-flex align-items-start" key={i.icon}>
      <span className="text-start">
        <Icon name={i.icon} /> <b>{i.name[lang]}:</b> <Md text={i.text[lang]} />
      </span>
    </div>
  ));

  if (printable) {
    return (
      <div>
        <div className="text-center profil">
          <div className="grid" style={css({ "--bs-gap": "0rem 1rem" })}>
            <div className="g-col-2">{thumbnail}</div>
            <div className="g-col-5 d-flex align-items-center">
              <div className="grid" style={css({ "--bs-columns": 1, "--bs-gap": "0.2em 0rem" })}>
                <h3 className="text-start">{p.informations.title[lang]}</h3>
                {info}
              </div>
            </div>
            <div className="g-col-5 d-flex align-items-center">
              <div className="grid" style={css({ "--bs-columns": 1, "--bs-gap": "0.2em 0rem" })}>
                <h3 className="text-start">{p.socials.title[lang]}</h3>
                {p.socials.links.map((s) => (
                  <div className="d-inline-flex align-items-start" key={s.href}>
                    <span className="text-start">
                      <Icon name={s.icon} /> <b>{s.name[lang]}:</b> <a href={s.href}>{s.href}</a>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container text-center profil">
        <div className="grid" style={css({ "--bs-gap": "0rem 1rem" })}>
          <div className="g-col-12 g-col-sm-12 g-col-md-3 g-col-lg-3">{thumbnail}</div>
          <div className="g-col-12 g-col-sm-12 g-col-md-9 g-col-lg-9 d-flex align-items-center">
            <div className="grid" style={css({ "--bs-columns": 1, "--bs-gap": "0.2em 0rem" })}>
              <Keywords items={keywords} large />
              {info}
              <div className="d-inline-flex align-items-center gap-2">
                {p.socials.links.map((s) => (
                  <a
                    key={s.href}
                    className="btn btn-outline-custom"
                    style={css({ "--bs-btn-color": s.color ?? "", "--bs-btn-hover-border-color": s.color ?? "" })}
                    href={s.href}
                  >
                    <Icon name={s.icon} /> {s.name[lang]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
