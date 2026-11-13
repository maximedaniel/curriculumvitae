import { cv } from "../../data/cv";
import { Badge, css, Md } from "../ui";
import { useCv } from "./context";

export function Lectures() {
  const { lang } = useCv();
  return (
    <div className="grid" style={css({ "--bs-gap": 0 })}>
      {cv.lectures.items.map((year) => {
        const total = year.courses.reduce((sum, c) => sum + Number(c.duration[lang].match(/\d+/)?.[0] ?? 0), 0);
        return (
          <div className="g-col-12" key={year.year}>
            <h3 style={{ marginTop: 0 }}>{year.year}</h3>
            <table className="table table-sm">
              <thead>
                <tr>
                  {cv.lectures.headers[lang].map((h) => (
                    <th scope="col" key={h}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {year.courses.map((c) => (
                  <tr key={c.name.en}>
                    <td>
                      <div className="text-start" style={{ fontSize: "1.25rem", fontWeight: 400, lineHeight: 1.2 }}>
                        {c.name[lang]}
                      </div>
                      <div>
                        {c.tools[lang]
                          .split(",")
                          .map((t) => t.trim())
                          .map((t) => (
                            <Badge key={t}>{t}</Badge>
                          ))}
                      </div>
                    </td>
                    <td>{c.position[lang]}</td>
                    <td>{c.role[lang]}</td>
                    <td>{c.type[lang]}</td>
                    <td>{c.level[lang]}</td>
                    <td>{c.degree[lang]}</td>
                    <td>{c.school[lang]}</td>
                    <td>{c.size}</td>
                    <td>
                      <Md text={c.duration[lang]} />
                    </td>
                  </tr>
                ))}
                <tr>
                  {Array.from({ length: 8 }, (_, i) => (
                    <td key={i} />
                  ))}
                  <th scope="row">{total}h</th>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
