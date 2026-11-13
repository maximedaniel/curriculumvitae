import { Children, isValidElement, useEffect, useRef, useState, type ReactElement, type ReactNode } from "react";

interface SubProps {
  id?: string;
  src: string;
  letter?: string; // set by the remark plugin
  children?: ReactNode; // caption
}

export interface ZoneDef {
  title: string;
  x: number; // left edge of the zone, in percent of the image width
  width: number; // width of the zone, in percent of the image width
  subs: number[]; // numbers of the example subfigures. The number 0 is the overview image.
}

// The children are <Sub> elements. The first one is the overview image. The others are examples.
// The reader picks a zone on the overview image. The examples of this zone appear below the image.
// A link to the id of an example (for example from a <Ref>) opens its zone.
export function SubZones({ zones, hint, children }: { zones: ZoneDef[]; hint: string; children: ReactNode }) {
  const subs = Children.toArray(children).filter(
    (c): c is ReactElement<SubProps> => isValidElement(c) && typeof (c.props as SubProps).src === "string",
  );
  const overview = subs[0].props;
  const [index, setIndex] = useState<number | null>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const open = (hash: string, scroll: boolean) => {
      const id = hash.replace(/^#/, "");
      const subIndex = subs.findIndex((s) => s.props.id === id);
      if (subIndex < 0) return false;
      const zone = zones.findIndex((z) => z.subs.includes(subIndex));
      if (zone >= 0) setIndex(zone);
      if (scroll) root.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return true;
    };
    // The browser cannot scroll to a hidden example. The click handler opens the zone and scrolls to the figure.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a[href^='#']");
      if (link && open(link.getAttribute("href") ?? "", true)) e.preventDefault();
    };
    document.addEventListener("click", onClick);
    if (location.hash) open(location.hash, false);
    return () => document.removeEventListener("click", onClick);
    // The list of subfigures does not change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="image-zones sub-zones" ref={root}>
      <figure id={overview.id} className="sub-zones-overview">
        <div className={index === null ? "zones-image" : "zones-image has-selection"}>
          <img src={overview.src} alt="Types of interaction" />
          {zones.map((z, i) => (
            <button
              key={z.title}
              type="button"
              className={i === index ? "zone selected" : "zone"}
              style={{ left: `${z.x}%`, width: `${z.width}%` }}
              aria-label={z.title}
              aria-pressed={i === index}
              onMouseEnter={() => setIndex(i)}
              onFocus={() => setIndex(i)}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        {overview.children && (
          <figcaption>
            ({overview.letter}) {overview.children}
          </figcaption>
        )}
      </figure>

      <p className="zones-hint" hidden={index !== null}>
        {hint}
      </p>

      {/* All the examples stay in the page. The page hides the ones that the reader did not pick. */}
      {zones.map((z, i) => (
        <div key={z.title} className="sub-zone-examples" hidden={i !== index}>
          {z.subs.map((n) => {
            const s = subs[n].props;
            return (
              <figure key={n} id={s.id}>
                <img src={s.src} alt="" className="img-fluid" />
                {s.children && (
                  <figcaption>
                    ({s.letter}) {s.children}
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>
      ))}
    </div>
  );
}
