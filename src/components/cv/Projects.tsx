import { useState } from "react";
import { cv } from "../../data/cv";
import type { Project } from "../../lib/cv-types";
import { asset, Collapsible, css, Keywords, Md, MoreButton, useToggle } from "../ui";
import { useCv } from "./context";

// The thumbnail changes to the video player when the user clicks the play button.
function VideoThumbnail({ project }: { project: Project }) {
  const [playing, setPlaying] = useState(false);
  const src = project.youtube
    ? `https://www.youtube.com/embed/${project.youtube}?autoplay=1&vq=hd1080`
    : project.vimeo
      ? `https://player.vimeo.com/video/${project.vimeo}?autoplay=1`
      : "";
  if (playing && src) {
    return (
      <iframe
        src={src}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ margin: 0, width: "100%", aspectRatio: "16 / 9", border: 0 }}
      />
    );
  }
  return (
    <div style={{ position: "relative", width: "100%", height: "auto", cursor: "pointer" }} onClick={() => setPlaying(true)}>
      <img src={asset(project.thumbnail)} className="card-img-top" alt="Video thumbnail" />
      <div
        style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          fontSize: "5rem", color: "white", textShadow: "0 0 10px rgba(0,0,0,0.7)",
        }}
      >
        <i className="bi bi-play-circle-fill" />
      </div>
    </div>
  );
}

function Details({ project }: { project: Project }) {
  const { lang } = useCv();
  const headers = cv.projects.titles.headers[lang];
  return (
    <>
      <div style={{ marginBottom: "0.25rem" }}>
        <Keywords items={project.keywords[lang]} />
      </div>
      <div style={{ marginBottom: "0.25rem" }}>
        <Md text={project.abstract[lang]} />
      </div>
      <div style={{ marginBottom: "0.25rem" }}>
        <b>{headers[1]}:</b> <Md text={project.contributors[lang]} />
      </div>
      <div>
        <b>{headers[2]}:</b> <Md text={project.fundings[lang]} />
      </div>
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { lang } = useCv();
  const { open, toggle } = useToggle();
  return (
    <div className="card g-col-12 g-col-sm-12 g-col-md-6 g-col-lg-4" style={css({ "--bs-card-title-spacer-y": 0 })}>
      <VideoThumbnail project={project} />
      <div className="card-body" style={{ paddingTop: "0.5rem" }}>
        <div className="card-title d-flex justify-content-between align-items-center">
          <div className="text-start">
            <span className="fw-bold fs-5">{project.name[lang]}</span>
            <br />
            <span className="text-muted fs-6">{project.period[lang]}</span>
            <br />
          </div>
          <MoreButton open={open} onClick={toggle} />
        </div>
        <div className="card-text">
          <Collapsible open={open}>
            <Details project={project} />
          </Collapsible>
        </div>
      </div>
    </div>
  );
}

function ProjectRow({ project }: { project: Project }) {
  const { lang } = useCv();
  const headers = cv.projects.titles.headers[lang];
  const link = project.youtube
    ? `https://www.youtube.com/watch?v=${project.youtube}`
    : project.vimeo
      ? `https://vimeo.com/${project.vimeo}`
      : "";
  return (
    <>
      <div className="g-col-4">
        <img src={asset(project.thumbnail)} className="card-img-top" />
      </div>
      <div className="g-col-8">
        <div className="text-start">
          <div className="fw-bold fs-5">{project.name[lang]}</div>
          <div className="text-muted fs-6">{project.period[lang]}</div>
          <div style={{ marginBottom: "0.25rem" }}>
            <Keywords items={project.keywords[lang]} />
          </div>
          <div style={{ marginBottom: "0.25rem" }}>
            <Md text={project.abstract[lang]} />
          </div>
          <div style={{ marginBottom: "0.25rem" }}>
            <b>{headers[0]}:</b> <a href={link}>{link}</a>
          </div>
          <div style={{ marginBottom: "0.25rem" }}>
            <b>{headers[1]}:</b> <Md text={project.contributors[lang]} />
          </div>
          <div>
            <b>{headers[2]}:</b> <Md text={project.fundings[lang]} />
          </div>
        </div>
      </div>
    </>
  );
}

export function Projects() {
  const { printable } = useCv();
  return (
    <div className="grid" style={css({ "--bs-gap": "2rem 2rem" })}>
      {cv.projects.items.map((p) => (printable ? <ProjectRow key={p.name.en} project={p} /> : <ProjectCard key={p.name.en} project={p} />))}
    </div>
  );
}
