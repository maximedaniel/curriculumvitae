import { Children, isValidElement, useState, type CSSProperties, type KeyboardEvent, type ReactElement, type ReactNode } from "react";

interface ZoneProps {
  title: string;
  label?: string; // small text after the title
  x?: number; // left edge of a column zone, in percent of the image width
  width?: number; // width of a column zone, in percent of the image width
  polygon?: [number, number][]; // corners of a polygon zone, in percent of the image size
  children: ReactNode; // explanation
}

// Data holder. ImageZones reads the props of each Zone.
export function Zone(_props: ZoneProps) {
  return null;
}

// A column zone uses x and width. A polygon zone covers the whole image and a clip path cuts its shape.
function zoneStyle({ x, width, polygon }: ZoneProps): CSSProperties {
  if (polygon) return { left: 0, width: "100%", clipPath: `polygon(${polygon.map(([px, py]) => `${px}% ${py}%`).join(", ")})` };
  return { left: `${x}%`, width: `${width}%` };
}

// An image with zones that the reader can pick. The other zones become pale.
// The explanation of the picked zone appears below the image.
export function ImageZones({
  src,
  alt,
  hint,
  children,
}: {
  src: string;
  alt: string;
  hint: string; // text shown before the reader picks a zone
  children: ReactNode;
}) {
  const zones = Children.toArray(children).filter(
    (c): c is ReactElement<ZoneProps> => isValidElement(c) && c.type === Zone,
  );
  const [index, setIndex] = useState<number | null>(null);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") setIndex(null);
    else if (e.key === "ArrowRight") setIndex(index === null ? 0 : (index + 1) % zones.length);
    else if (e.key === "ArrowLeft") setIndex(index === null ? zones.length - 1 : (index - 1 + zones.length) % zones.length);
    else return;
    e.preventDefault();
  };

  return (
    <div className="image-zones" onKeyDown={onKeyDown}>
      <div className={index === null ? "zones-image" : "zones-image has-selection"}>
        <img src={src} alt={alt} />
        {zones.map((z, i) => (
          <button
            key={z.props.title}
            type="button"
            className={i === index ? "zone selected" : "zone"}
            style={zoneStyle(z.props)}
            aria-label={z.props.title}
            aria-pressed={i === index}
            aria-controls={`zone-panel-${i}`}
            onMouseEnter={() => setIndex(i)}
            onFocus={() => setIndex(i)}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      <p className="zones-hint" hidden={index !== null}>
        {hint}
      </p>
      {/* All the explanations stay in the page. The page hides the ones that the reader did not pick. */}
      {zones.map((z, i) => (
        <div key={z.props.title} id={`zone-panel-${i}`} className="zone-panel" hidden={i !== index}>
          <strong>{z.props.title}</strong>
          {z.props.label && <span className="zone-label"> {z.props.label}</span>}
          <div className="zone-body">{z.props.children}</div>
        </div>
      ))}
    </div>
  );
}
