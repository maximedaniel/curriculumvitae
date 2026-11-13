import { Children, isValidElement, useState, type KeyboardEvent, type ReactElement, type ReactNode } from "react";

type Position = "left" | "right" | "bottom";

interface FieldProps {
  position: Position;
  title: string; // bold text in the circle
  subtitle: string; // second text in the circle
  color: string;
  src: string; // image of the example
  children: ReactNode; // caption of the example
}

// Data holder. The VennDiagram reads the props of each Field.
export function Field(_props: FieldProps) {
  return null;
}

// The circles have the geometry of the original image (2000 x 1782 pixels, scaled to 1000 x 891).
const CIRCLES: Record<Position, { cx: number; cy: number; text: { x: number; y: number; lines: number } }> = {
  left: { cx: 297.5, cy: 297.5, text: { x: 208, y: 195, lines: 3 } },
  right: { cx: 702.5, cy: 297.5, text: { x: 785, y: 193, lines: 2 } },
  bottom: { cx: 500, cy: 594, text: { x: 500, y: 627, lines: 2 } },
};
const RADIUS = 297.5;

// A Venn diagram. The reader picks a circle and sees the example of this research field.
export function VennDiagram({ children }: { children: ReactNode }) {
  const fields = Children.toArray(children).filter(
    (c): c is ReactElement<FieldProps> => isValidElement(c) && c.type === Field,
  );
  const [index, setIndex] = useState(0);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") setIndex((index + 1) % fields.length);
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") setIndex((index - 1 + fields.length) % fields.length);
    else return;
    e.preventDefault();
  };

  return (
    <div className="venn">
      <svg viewBox="0 0 1000 891" role="tablist" aria-label="Research fields" onKeyDown={onKeyDown}>
        {fields.map((f, i) => {
          const { position, color } = f.props;
          const c = CIRCLES[position];
          return (
            <g
              key={position}
              role="tab"
              id={`venn-tab-${i}`}
              aria-selected={i === index}
              aria-controls={`venn-panel-${i}`}
              aria-label={f.props.title}
              tabIndex={i === index ? 0 : -1}
              className={i === index ? "venn-circle selected" : "venn-circle"}
              onMouseEnter={() => setIndex(i)}
              onClick={() => setIndex(i)}
              onFocus={() => setIndex(i)}
            >
              <circle cx={c.cx} cy={c.cy} r={RADIUS} fill={color} />
            </g>
          );
        })}

        {/* The texts do not catch the mouse. The circles below them do. */}
        <g className="venn-labels" fill="#fff" textAnchor="middle" pointerEvents="none">
          {fields.map((f) => {
            const { position, title, subtitle } = f.props;
            const t = CIRCLES[position].text;
            const subLines = subtitle.split("\n");
            return (
              <text key={position} x={t.x} y={t.y} fontSize="37">
                <tspan x={t.x} fontWeight="700">
                  {title}
                </tspan>
                {subLines.map((line, k) => (
                  <tspan key={k} x={t.x} dy="1.35em">
                    {line}
                  </tspan>
                ))}
              </text>
            );
          })}
          <text x="500" y="365" fontSize="37" fontWeight="700">
            <tspan x="500">PROGRAMMABLE</tspan>
            <tspan x="500" dy="1.25em">
              MATTER
            </tspan>
          </text>
        </g>
      </svg>

      {/* All the examples stay in the page. The page hides the ones that the reader did not pick. */}
      <div className="venn-panels">
        {fields.map((f, i) => (
          <div
            key={f.props.position}
            id={`venn-panel-${i}`}
            role="tabpanel"
            aria-labelledby={`venn-tab-${i}`}
            className="venn-panel"
            hidden={i !== index}
          >
            <img src={f.props.src}alt={f.props.title} />
            <p>{f.props.children}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
