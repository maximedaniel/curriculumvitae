import { Children, isValidElement, useState, type KeyboardEvent, type ReactElement, type ReactNode } from "react";

interface FilmProps {
  title: string;
  year: string;
  src: string; // poster image
  gif: string; // animation, loaded only when the reader asks for it
  children: ReactNode; // description
}

// Data holder. The Gallery reads the props of each Film.
export function Film(_props: FilmProps) {
  return null;
}

// A gallery of films. The reader picks a film and plays its animation.
// The GIF files are large, so the page loads a GIF only after a click on the play button.
export function FilmGallery({ children }: { children: ReactNode }) {
  const films = Children.toArray(children).filter(
    (c): c is ReactElement<FilmProps> => isValidElement(c) && c.type === Film,
  );
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const film = films[index].props;

  const select = (i: number) => {
    setIndex(i);
    setPlaying(false);
    setLoaded(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") select((index + 1) % films.length);
    else if (e.key === "ArrowLeft") select((index - 1 + films.length) % films.length);
    else return;
    e.preventDefault();
  };

  return (
    <div className="film-gallery" onKeyDown={onKeyDown}>
      <div className="film-stage">
        <img src={playing ? film.gif : film.src} alt={`${film.title} (${film.year})`} />
        {playing && !loaded && <div className="film-loading">Loading the animation…</div>}
        {playing && (
          <img className="film-preload" src={film.gif} alt="" onLoad={() => setLoaded(true)} hidden />
        )}
        <button
          type="button"
          className="film-play"
          aria-label={playing ? "Stop the animation" : "Play the animation"}
          onClick={() => {
            setPlaying((p) => !p);
            setLoaded(false);
          }}
        >
          <i className={playing ? "bi bi-stop-circle-fill" : "bi bi-play-circle-fill"} />
          <span>{playing ? "Stop" : "GIF"}</span>
        </button>
      </div>

      <div className="film-tabs" role="tablist" aria-label="Films">
        {films.map((f, i) => (
          <button
            key={f.props.title}
            type="button"
            role="tab"
            id={`film-tab-${i}`}
            aria-selected={i === index}
            aria-controls={`film-panel-${i}`}
            tabIndex={i === index ? 0 : -1}
            className={i === index ? "film-tab active" : "film-tab"}
            onClick={() => select(i)}
          >
            <img src={f.props.src} alt="" loading="lazy" />
            <span className="film-tab-title">{f.props.title}</span>
            <span className="film-tab-year">{f.props.year}</span>
          </button>
        ))}
      </div>

      {/* All the descriptions stay in the page. The page hides the ones that the reader did not pick. */}
      {films.map((f, i) => (
        <p
          key={f.props.title}
          id={`film-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`film-tab-${i}`}
          className="film-description"
          hidden={i !== index}
        >
          {f.props.children}
        </p>
      ))}
    </div>
  );
}
