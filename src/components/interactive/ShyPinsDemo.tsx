import { useEffect, useRef, useState, type PointerEvent } from "react";

// A simplified simulation of the safety strategy of ShyPins.
// A grid of pins moves between two patterns. The "user" is the pointer. The pins near the user slow down or stop.
// This is an illustration. It is not the original system.

type Mode = "none" | "pause" | "gradual";

const COLS = 12;
const ROWS = 8;
const CELL = 50; // size of a cell in the drawing
const MAX_SPEED = 0.5; // pin speed, in height units per second
const REACH = 3.4; // radius of the speed zones, in cells
const CONTACT = 0.9; // radius where a pin touches the user, in cells
const PAUSE_RADIUS = 2.2; // radius of the stop zone, in cells

// The two patterns that the pins reach one after the other.
const pattern = (index: 0 | 1, c: number, r: number) => (index === 0 ? 0 : 0.5 + 0.5 * Math.sin(c * 0.9) * Math.cos(r * 0.7));

// The speed of a pin as a fraction of the maximum speed, for a distance d from the user.
function speedFactor(mode: Mode, zones: number, d: number): number {
  if (mode === "none") return 1;
  if (mode === "pause") return d < PAUSE_RADIUS ? 0 : 1;
  const g = Math.min(Math.max((d - CONTACT) / (REACH - CONTACT), 0), 1);
  return Math.floor(g * zones) / zones;
}

const mix = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);
// From light gray (low pin) to blue (high pin).
const pinColor = (h: number) => `rgb(${mix(223, 39, h)}, ${mix(227, 128, h)}, ${mix(230, 227, h)})`;

const MODES: { id: Mode; label: string }[] = [
  { id: "none", label: "No safeguard" },
  { id: "pause", label: "Pause near the user" },
  { id: "gradual", label: "Gradual slowdown" },
];

export function ShyPinsDemo() {
  const [mode, setMode] = useState<Mode>("gradual");
  const [zones, setZones] = useState(4);
  const [reading, setReading] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const pins = useRef<(SVGCircleElement | null)[]>([]);
  const hand = useRef<SVGGElement>(null);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  // The loop reads the mode and the number of zones from this object. The loop does not restart when they change.
  const settings = useRef({ mode, zones });
  settings.current = { mode, zones };

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const heights = new Float32Array(COLS * ROWS);
    let target: 0 | 1 = 1;
    let last = performance.now();
    let phaseStart = last;
    let settledSince = 0;
    let lastReading = 0;
    let frame = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = now / 1000;
      // Without a pointer, the user moves along a path, so the reader sees the effect at once.
      const user = pointer.current ?? { x: COLS / 2 + 4.2 * Math.sin(t * 0.45), y: ROWS / 2 + 2.4 * Math.sin(t * 0.9 + 1) };
      const { mode: m, zones: z } = settings.current;

      let settled = true;
      let near = 0;
      let nearCount = 0;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const i = r * COLS + c;
          const goal = pattern(target, c, r);
          const d = Math.hypot(c + 0.5 - user.x, r + 0.5 - user.y);
          const f = speedFactor(m, z, d);
          const step = MAX_SPEED * f * dt;
          const diff = goal - heights[i];
          heights[i] += Math.abs(diff) <= step ? diff : Math.sign(diff) * step;
          if (Math.abs(goal - heights[i]) > 0.02) settled = false;
          if (d < 2.2) {
            near += f;
            nearCount++;
          }
          const el = pins.current[i];
          if (el) {
            const moving = Math.abs(goal - heights[i]) > 0.01;
            el.setAttribute("fill", pinColor(heights[i]));
            el.setAttribute("r", String(14 + 6 * heights[i]));
            el.setAttribute("stroke", moving && f < 1 ? "#ff7518" : "rgba(0,0,0,0.12)");
            el.setAttribute("stroke-width", moving && f < 1 ? "3" : "1");
          }
        }
      }
      hand.current?.setAttribute("transform", `translate(${user.x * CELL} ${user.y * CELL})`);

      // The pins go to the other pattern when they have arrived, or after a delay.
      if (settled) settledSince ||= now;
      else settledSince = 0;
      if ((settledSince && now - settledSince > 700) || now - phaseStart > 7000) {
        target = target === 0 ? 1 : 0;
        phaseStart = now;
        settledSince = 0;
      }

      if (now - lastReading > 150) {
        lastReading = now;
        setReading(nearCount ? Math.round((near / nearCount) * 100) : 100);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible]);

  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    const box = svg.current!.getBoundingClientRect();
    pointer.current = {
      x: ((e.clientX - box.left) / box.width) * COLS,
      y: ((e.clientY - box.top) / box.height) * ROWS,
    };
  };

  return (
    <figure className="shypins-demo" ref={root}>
      <div className="shypins-modes" role="group" aria-label="Safeguard">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            className={m.id === mode ? "btn btn-sm btn-dark" : "btn btn-sm btn-outline-dark"}
            aria-pressed={m.id === mode}
            onClick={() => setMode(m.id)}
          >
            {m.label}
          </button>
        ))}
        {mode === "gradual" && (
          <label className="shypins-zones">
            Speed zones: <b>{zones}</b>
            <input type="range" min={1} max={8} step={1} value={zones} onChange={(e) => setZones(Number(e.target.value))} />
          </label>
        )}
      </div>

      <svg
        ref={svg}
        viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`}
        role="img"
        aria-label="A grid of pins that move. The pins near the pointer slow down or stop."
        onPointerMove={onMove}
        onPointerDown={onMove}
        onPointerLeave={() => (pointer.current = null)}
        style={{ touchAction: "pan-y" }}
      >
        <rect width={COLS * CELL} height={ROWS * CELL} fill="#f1f3f5" />
        {Array.from({ length: COLS * ROWS }, (_, i) => (
          <circle
            key={i}
            ref={(el) => {
              pins.current[i] = el;
            }}
            cx={(i % COLS) * CELL + CELL / 2}
            cy={Math.floor(i / COLS) * CELL + CELL / 2}
            r={14}
            fill="#dfe3e6"
            stroke="rgba(0,0,0,0.12)"
          />
        ))}
        {/* The zones around the user. The drawing shows them as a projection on the pins. */}
        <g ref={hand} pointerEvents="none">
          {mode === "pause" && <circle r={PAUSE_RADIUS * CELL} fill="rgba(220,53,69,0.18)" stroke="#dc3545" strokeDasharray="6 4" />}
          {mode === "gradual" &&
            Array.from({ length: zones }, (_, k) => {
              const radius = CONTACT * CELL + ((REACH - CONTACT) * CELL * (zones - k)) / zones;
              return <circle key={k} r={radius} fill="rgba(255,117,24,0.12)" stroke="#ff7518" strokeDasharray="6 4" />;
            })}
          <circle r={CONTACT * CELL * 0.6} fill="#343a40" />
        </g>
      </svg>

      <figcaption>
        <b>Try ShyPins.</b> Move your pointer over the pins. The dark dot is the user. The orange rings show the pins that are slowing down or stopping.
        Pin speed near the user: <b>{reading === null ? "100" : reading}%</b>.{" "}
        <span className="shypins-note">Simplified illustration. It is not the original system.</span>
      </figcaption>
    </figure>
  );
}
