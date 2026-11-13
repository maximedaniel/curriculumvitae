import { Children, isValidElement, useState, type ReactElement, type ReactNode } from "react";

interface FilmProps {
  title: string;
  year: string;
  src: string; // banner image with several frames of the scene
  gif: string; // animation, loaded only when the reader clicks the banner
  children: ReactNode; // description
}

// Data holder. The Gallery reads the props of each Film.
export function Film(_props: FilmProps) {
  return null;
}

// A list of film banners. A click on a banner plays its animation at once, in place of the banner.
// The GIF files are large, so the page loads a GIF only after a click.
// Only one animation plays at a time.
export function FilmGallery({ children }: { children: ReactNode }) {
  const films = Children.toArray(children).filter(
    (c): c is ReactElement<FilmProps> => isValidElement(c) && c.type === Film,
  );
  const [playing, setPlaying] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  const play = (i: number | null) => {
    setPlaying(i);
    setLoaded(false);
  };

  return (
    <div className="film-gallery">
      {films.map((f, i) => {
        const { title, year, src, gif, children: description } = f.props;
        const isPlaying = playing === i;
        return (
          <figure key={title} className="film-item">
            <div className="film-media">
              {isPlaying ? (
                <>
                  <img src={gif} alt={`${title} (${year})`} onLoad={() => setLoaded(true)} />
                  {!loaded && <div className="film-loading">Loading the animation…</div>}
                  <button type="button" className="film-badge" aria-label="Stop the animation" onClick={() => play(null)}>
                    <i className="bi bi-stop-circle-fill" /> Stop
                  </button>
                </>
              ) : (
                <>
                  <img src={src} alt={`${title} (${year})`} loading="lazy" />
                  <button type="button" className="film-badge" aria-label={`Play the animation of ${title}`} onClick={() => play(i)}>
                    <i className="bi bi-play-circle-fill" /> GIF
                  </button>
                </>
              )}
            </div>
            <figcaption>{description}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}
