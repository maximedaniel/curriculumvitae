import { useEffect, useMemo, useRef, useState } from "react";

// A slider from "things" (a few large objects) to "stuff" (a continuous material).
// The number of particles grows and their size shrinks. At the nanometer scale, the particles merge into a cloud.

const STOPS = ["meters", "centimeters", "millimeters", "micrometers", "nanometers"];
const COUNTS = [2, 5, 20, 90, 400]; // number of particles at each stop
const MAX_STEP = STOPS.length - 1;

// The particles stay inside an ellipse.
const CX = 500;
const CY = 190;
const RX = 340;
const RY = 165;
const AREA = Math.PI * RX * RY;

// A small deterministic random generator. The server and the browser must draw the same particles.
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// The first particles have fixed places. The next ones use the "best candidate" method.
// With this method, the first n particles are always well spread, for any n.
function makePoints(count: number): [number, number][] {
  const points: [number, number][] = [
    [390, 150],
    [610, 235],
    [575, 95],
    [330, 275],
    [480, 300],
  ];
  const rand = mulberry32(7);
  const inside = () => {
    for (;;) {
      const x = CX + (rand() * 2 - 1) * RX;
      const y = CY + (rand() * 2 - 1) * RY;
      if (((x - CX) / RX) ** 2 + ((y - CY) / RY) ** 2 <= 1) return [x, y] as [number, number];
    }
  };
  while (points.length < count) {
    let best = inside();
    let bestDistance = -1;
    for (let k = 0; k < 12; k++) {
      const c = inside();
      let nearest = Infinity;
      for (const p of points) nearest = Math.min(nearest, (c[0] - p[0]) ** 2 + (c[1] - p[1]) ** 2);
      if (nearest > bestDistance) {
        bestDistance = nearest;
        best = c;
      }
    }
    points.push(best);
  }
  return points;
}

// Number of particles for a position t of the slider (from 0 to 4). The growth is exponential between two stops.
function countAt(t: number): number {
  const k = Math.min(Math.floor(t), MAX_STEP - 1);
  const f = t - k;
  return Math.round(Math.exp(Math.log(COUNTS[k]) * (1 - f) + Math.log(COUNTS[k + 1]) * f));
}

export function ThingsToStuff() {
  const points = useMemo(() => makePoints(COUNTS[MAX_STEP]), []);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const frame = useRef(0);

  // The play button moves the slider from "meters" to "nanometers", then stops.
  useEffect(() => {
    if (!playing) return;
    const duration = 7000;
    const start = performance.now() - (t / MAX_STEP) * duration;
    const tick = (now: number) => {
      const next = Math.min(((now - start) / duration) * MAX_STEP, MAX_STEP);
      setT(next);
      if (next < MAX_STEP) frame.current = requestAnimationFrame(tick);
      else setPlaying(false);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
    // The animation starts from the current position when the reader presses play.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  const n = countAt(t);
  const radius = Math.min(0.42 * Math.sqrt(AREA / n), 120);
  // Beyond the micrometer stop, the particles merge into a cloud.
  const blur = Math.max(0, t - 3) * 5;
  const nearest = Math.round(t);
  const thingsWeight = 1 - t / MAX_STEP;

  return (
    <div className="things-to-stuff">
      <div className="tts-axis" aria-hidden="true">
        <div className="tts-bar tts-things" style={{ opacity: 0.35 + 0.65 * thingsWeight }}>
          <span>things</span>
        </div>
        <div className="tts-bar tts-stuff" style={{ opacity: 0.35 + 0.65 * (1 - thingsWeight) }}>
          <span>stuff</span>
        </div>
      </div>

      <svg viewBox="0 0 1000 380" role="img" aria-label={`About ${n} particles, at the scale of ${STOPS[nearest]}`}>
        <defs>
          <filter id="tts-goo" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blur" />
            <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -6" />
          </filter>
        </defs>
        <g filter={blur > 0.05 ? "url(#tts-goo)" : undefined} fill="#4f7fea">
          {points.slice(0, n).map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={radius} />
          ))}
        </g>
      </svg>

      <div className="tts-controls">
        <button
          type="button"
          className="btn btn-sm btn-outline-dark"
          aria-label={playing ? "Pause the animation" : "Play the animation"}
          onClick={() => {
            if (!playing && t >= MAX_STEP) setT(0);
            setPlaying((p) => !p);
          }}
        >
          <i className={playing ? "bi bi-pause-fill" : "bi bi-play-fill"} />
        </button>
        <input
          type="range"
          min={0}
          max={MAX_STEP}
          step={0.01}
          value={t}
          aria-label="Scale of the particles, from meters to nanometers"
          aria-valuetext={`${STOPS[nearest]}, about ${n} particles`}
          onChange={(e) => {
            setPlaying(false);
            setT(Number(e.target.value));
          }}
        />
      </div>

      <div className="tts-stops">
        {STOPS.map((label, i) => (
          <button
            key={label}
            type="button"
            className={i === nearest ? "active" : undefined}
            onClick={() => {
              setPlaying(false);
              setT(i);
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
