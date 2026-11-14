import { useEffect, useRef, useState, type ReactNode } from "react";

export type ShapeKind =
  | "orientation"
  | "form"
  | "volume"
  | "texture"
  | "viscosity"
  | "spatiality"
  | "adding"
  | "permeability";

const GRAY = "#b3b6b8";
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

// Points of the "spatiality" demo. The first layout is a cluster. The second layout is spread out.
const DOTS = Array.from({ length: 14 }, (_, i) => {
  const angle = i * 2.4;
  const root = Math.sqrt(i);
  return {
    from: [150 + 9 * root * Math.cos(angle), 100 + 9 * root * Math.sin(angle)],
    to: [150 + 22 * root * Math.cos(angle + 1), 100 + 16 * root * Math.sin(angle + 1)],
  };
});

// One drawing for each kind of shape change. The value p goes from 0 (before) to 1 (after).
function Drawing({ kind, p }: { kind: ShapeKind; p: number }) {
  switch (kind) {
    case "orientation":
      return <rect x={140} y={40} width={20} height={115} fill={GRAY} transform={`rotate(${-75 * p} 150 155)`} />;
    case "form":
      return <rect x={100} y={50} width={100} height={100} rx={50 * p} fill={GRAY} />;
    case "volume": {
      const side = lerp(110, 50, p);
      return <rect x={150 - side / 2} y={100 - side / 2} width={side} height={side} fill={GRAY} />;
    }
    case "texture":
      return (
        <g>
          <rect x={100} y={50} width={100} height={100} fill={GRAY} />
          <rect x={104} y={54} width={92} height={92} fill="none" stroke="#fff" strokeWidth={5} strokeDasharray="7 7" opacity={p} />
        </g>
      );
    case "viscosity": {
      const dent = 38 * p;
      return <path d={`M100 55 Q150 ${55 + dent * 2} 200 55 L200 150 L100 150 Z`} fill={GRAY} />;
    }
    case "spatiality":
      return (
        <g fill={GRAY}>
          {DOTS.map((d, i) => (
            <circle key={i} cx={lerp(d.from[0], d.to[0], p)} cy={lerp(d.from[1], d.to[1], p)} r={7} />
          ))}
        </g>
      );
    case "adding":
      return (
        <g fill={GRAY}>
          {/* Three parts: apart at p = 0 and merged into one block at p = 1. */}
          <rect x={100 - 26 * (1 - p)} y={50} width={34} height={100} />
          <rect x={134 + 12 * (1 - p)} y={50 - 20 * (1 - p)} width={66} height={50} />
          <rect x={134 + 12 * (1 - p)} y={100 + 20 * (1 - p)} width={66} height={50} />
        </g>
      );
    case "permeability":
      return (
        <g>
          <rect x={100} y={50} width={100} height={100} fill={GRAY} />
          {[0, 1, 2].flatMap((row) =>
            [0, 1, 2].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={117 + col * 30 - 9 * p}
                y={67 + row * 30 - 9 * p}
                width={18 * p}
                height={18 * p}
                rx={3}
                fill="#fff"
              />
            )),
          )}
        </g>
      );
  }
}

// A small animation of a shape change, with a slider from "before" to "after".
// The animation plays only while the demo is on the screen.
export function ShapeDemo({ kind, children }: { kind: ShapeKind; children?: ReactNode }) {
  const [p, setP] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !visible) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      // A smooth back and forth movement. A cycle takes 3.5 seconds.
      setP((1 - Math.cos(((now - start) / 3500) * 2 * Math.PI)) / 2);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, visible]);

  return (
    <div className="shape-demo" ref={root}>
      <div className="shape-demo-view">
        <svg viewBox="0 0 300 200" role="img" aria-label={`Animation of the shape change: ${kind}`}>
          <Drawing kind={kind} p={p} />
        </svg>
        <div className="shape-demo-controls">
          <button
            type="button"
            className="btn btn-sm btn-outline-dark"
            aria-label={playing ? "Pause the animation" : "Play the animation"}
            onClick={() => setPlaying((v) => !v)}
          >
            <i className={playing ? "bi bi-pause-fill" : "bi bi-play-fill"} />
          </button>
          <span>before</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={p}
            aria-label="From before to after the shape change"
            onChange={(e) => {
              setPlaying(false);
              setP(Number(e.target.value));
            }}
          />
          <span>after</span>
        </div>
      </div>
      <div className="shape-demo-text">{children}</div>
    </div>
  );
}
