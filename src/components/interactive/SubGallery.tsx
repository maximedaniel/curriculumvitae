import { Children, isValidElement, useEffect, useRef, useState, type ReactElement, type ReactNode } from "react";

interface SubProps {
  id?: string;
  src: string;
  letter?: string; // set by the remark plugin
  children?: ReactNode; // caption
}

// Show the subfigures of a Figure as a large view and a row of thumbnails.
// The children are the same <Sub> elements as in a normal Figure.
// A link to the id of a subfigure (for example from a <Ref>) opens it.
export function SubGallery({ columns = 5, children }: { columns?: number; children: ReactNode }) {
  const subs = Children.toArray(children).filter(
    (c): c is ReactElement<SubProps> => isValidElement(c) && typeof (c.props as SubProps).src === "string",
  );
  const [index, setIndex] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const open = (hash: string, scroll: boolean) => {
      const i = subs.findIndex((s) => s.props.id === hash.replace(/^#/, ""));
      if (i < 0) return false;
      setIndex(i);
      if (scroll) root.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return true;
    };
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
    <div
      className="sub-gallery"
      ref={root}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") setIndex((index + 1) % subs.length);
        else if (e.key === "ArrowLeft") setIndex((index - 1 + subs.length) % subs.length);
        else return;
        e.preventDefault();
      }}
    >
      {/* All the views stay in the page. The page hides the ones that the reader did not pick. */}
      {subs.map((s, i) => (
        <figure key={s.props.id ?? i} id={s.props.id} className="sub-gallery-view" hidden={i !== index}>
          <div className="sub-gallery-stage">
            <img src={s.props.src} alt="" />
          </div>
          {s.props.children && (
            <figcaption>
              ({s.props.letter}) {s.props.children}
            </figcaption>
          )}
        </figure>
      ))}

      <div className="sub-gallery-thumbs" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }} role="tablist">
        {subs.map((s, i) => (
          <button
            key={s.props.id ?? i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Image ${i + 1} of ${subs.length}`}
            tabIndex={i === index ? 0 : -1}
            className={i === index ? "sub-thumb active" : "sub-thumb"}
            onClick={() => setIndex(i)}
          >
            <img src={s.props.src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}
