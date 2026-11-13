import { Children, isValidElement, useState, type KeyboardEvent, type ReactElement, type ReactNode } from "react";

interface FilmProps {
  title: string;
  year: string;
  src: string; // banner image. It is the placeholder of the film before the animation plays.
  gif: string; // animation, loaded only when the reader picks the film
  children: ReactNode; // description
}

// Data holder. The Gallery reads the props of each Film.
export function Film(_props: FilmProps) {
  return null;
}

// A stage, a row of film banners and a description.
// A click on a film plays its animation at once.
// The GIF files are large, so the page loads a GIF only after a click.
export function FilmGallery({ children }: { children: ReactNode }) {
  const films = Children.toArray(children).filter(
    (c): c is ReactElement<FilmProps> => isValidElement(c) && c.type === Film,
  );
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const film = films[index].props;

  // Pick a film and play its animation at once.
  const select = (i: number) => {
    setIndex(i);
    setPlaying(true);
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
        {playing ? (
          <img className="film-gif" src={film.gif} alt={`${film.title} (${film.year})`} onLoad={() => setLoaded(true)} />
        ) : (
          <img className="film-placeholder" src={film.src} alt={`${film.title} (${film.year})`} />
        )}
        {playing && !loaded && <div className="film-loading">Loading the animation…</div>}
        <button
          type="button"
          className="film-play"
          aria-label={playing ? "Stop the animation" : "Play the animation"}
          onClick={() => (playing ? setPlaying(false) : select(index))}
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
