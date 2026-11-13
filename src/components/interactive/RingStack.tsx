import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

// A simplified model of a stack of expandable illuminated rings (CairnFORM).
// Each ring has a radius. The radii of the stack give an axisymmetric shape.
// This is an illustration. It is not the original device.

const COUNT = 14;
const WIDTH = 500;
const CENTER_X = WIDTH / 2;
const BOTTOM_Y = 410;
const GAP = 26;
const MIN_R = 0.2;
const MAX_R = 1;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number) => Math.min(Math.max(v, MIN_R), MAX_R);
// Pixel radius of a ring on the drawing.
const pixels = (r: number) => 40 + r * 170;

// A shape is a function of the position t in the stack: 0 is the bottom ring and 1 is the top ring.
const SHAPES: { id: string; label: string; radius: (t: number) => number }[] = [
  { id: "cylinder", label: "Cylinder", radius: () => 0.6 },
  { id: "cone", label: "Cone", radius: (t) => lerp(1, 0.25, t) },
  { id: "double-cone", label: "Double cone", radius: (t) => 0.25 + 0.75 * (1 - Math.abs(2 * t - 1)) },
  { id: "hourglass", label: "Hourglass", radius: (t) => 0.25 + 0.75 * Math.abs(2 * t - 1) },
];
const profile = (id: string) => Array.from({ length: COUNT }, (_, i) => SHAPES.find((s) => s.id === id)!.radius(i / (COUNT - 1)));

// A small ring is blue. A large ring is green.
const ringColor = (r: number) => `hsl(${lerp(215, 140, (r - MIN_R) / (MAX_R - MIN_R))} 80% 55%)`;

export function RingStack() {
  const [shape, setShape] = useState<string | null>("cone");
  const [radii, setRadii] = useState<number[]>(() => profile("cylinder"));
  const [tilt, setTilt] = useState(28); // view angle, in degrees
  const [visible, setVisible] = useState(false);
  const target = useRef<number[]>(profile("cone"));
  const current = useRef<number[]>(radii);
  const dragging = useRef<number | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // The rings move smoothly to their target radius.
  useEffect(() => {
    if (!visible) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      let changed = false;
      const next = current.current.map((r, i) => {
        if (dragging.current === i) return r;
        const diff = target.current[i] - r;
        if (Math.abs(diff) < 0.001) return target.current[i] === r ? r : ((changed = true), target.current[i]);
        changed = true;
        return r + diff * Math.min(1, dt * 7);
      });
      if (changed) {
        current.current = next;
        setRadii(next);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible]);

  const pick = (id: string) => {
    setShape(id);
    target.current = profile(id);
  };

  const setRing = (i: number, r: number, immediate: boolean) => {
    const value = clamp(r);
    target.current = target.current.map((v, k) => (k === i ? value : v));
    if (immediate) {
      current.current = current.current.map((v, k) => (k === i ? value : v));
      setRadii(current.current);
    }
    setShape(null);
  };

  const onDrag = (i: number) => (e: PointerEvent<SVGCircleElement>) => {
    if (dragging.current !== i) return;
    const box = svg.current!.getBoundingClientRect();
    const x = ((e.clientX - box.left) / box.width) * WIDTH;
    setRing(i, (Math.abs(x - CENTER_X) - 40) / 170, true);
  };

  const onKey = (i: number) => (e: KeyboardEvent<SVGCircleElement>) => {
    const step = e.key === "ArrowRight" || e.key === "ArrowUp" ? 0.05 : e.key === "ArrowLeft" || e.key === "ArrowDown" ? -0.05 : 0;
    if (!step) return;
    e.preventDefault();
    setRing(i, target.current[i] + step, false);
  };

  const sin = Math.sin((tilt * Math.PI) / 180);

  return (
    <figure className="ring-stack" ref={root}>
      <div className="ring-stack-controls">
        <div className="ring-stack-shapes" role="group" aria-label="Shape of the stack">
          {SHAPES.map((s) => (
            <button
              key={s.id}
              type="button"
              className={s.id === shape ? "btn btn-sm btn-dark" : "btn btn-sm btn-outline-dark"}
              aria-pressed={s.id === shape}
              onClick={() => pick(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
        <label className="ring-stack-tilt">
          View angle
          <input type="range" min={8} max={70} step={1} value={tilt} onChange={(e) => setTilt(Number(e.target.value))} />
        </label>
      </div>

      <svg ref={svg} viewBox={`0 0 ${WIDTH} 450`} role="group" aria-label="A stack of 14 illuminated rings">
        <defs>
          <filter id="ring-glow" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        <rect width={WIDTH} height="450" fill="#15181d" rx="4" />
        {radii.map((r, i) => {
          const rx = pixels(r);
          const ry = rx * sin;
          const cy = BOTTOM_Y - i * GAP;
          const color = ringColor(r);
          const back = `M${CENTER_X - rx} ${cy} A${rx} ${ry} 0 0 1 ${CENTER_X + rx} ${cy}`;
          const front = `M${CENTER_X - rx} ${cy} A${rx} ${ry} 0 0 0 ${CENTER_X + rx} ${cy}`;
          return (
            <g key={i} fill="none" strokeLinecap="round">
              <path d={back} stroke={color} strokeWidth={5} opacity={0.3} />
              <path d={front} stroke={color} strokeWidth={9} opacity={0.55} filter="url(#ring-glow)" />
              <path d={front} stroke={color} strokeWidth={5} />
              <circle
                cx={CENTER_X + rx}
                cy={cy}
                r={9}
                fill={color}
                stroke="#fff"
                strokeWidth={2}
                className="ring-handle"
                role="slider"
                tabIndex={0}
                aria-label={`Ring ${i + 1}, from the bottom`}
                aria-valuemin={MIN_R}
                aria-valuemax={MAX_R}
                aria-valuenow={Number(r.toFixed(2))}
                onPointerDown={(e) => {
                  dragging.current = i;
                  e.currentTarget.setPointerCapture(e.pointerId);
                }}
                onPointerMove={onDrag(i)}
                onPointerUp={() => (dragging.current = null)}
                onPointerCancel={() => (dragging.current = null)}
                onKeyDown={onKey(i)}
              />
            </g>
          );
        })}
      </svg>

      <figcaption>
        <b>Try the stack of rings.</b> Pick an axisymmetric shape, or drag the handle of a ring to expand or shrink it. The color of a ring follows its size.{" "}
        <span className="ring-stack-note">Simplified illustration. It is not the original device.</span>
      </figcaption>
    </figure>
  );
}
