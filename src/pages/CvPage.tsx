import type { ReactNode } from "react";
import { cv } from "../data/cv";
import type { Lang } from "../lib/cv-types";
import { CvContext } from "../components/cv/context";
import { Profil } from "../components/cv/Profil";
import { Educations, Experiences, Missions } from "../components/cv/Timeline";
import { Theses } from "../components/cv/Theses";
import { Projects } from "../components/cv/Projects";
import { Publications } from "../components/cv/Publications";
import { Animations, Coordinations, Reviews, Supervisions } from "../components/cv/Blocks";
import { Lectures } from "../components/cv/Lectures";

const H = ({ level, id, children }: { level: 1 | 2; id: string; children: ReactNode }) =>
  level === 1 ? <h1 id={id}>{children}</h1> : <h2 id={id}>{children}</h2>;

// The layout of the CV. The data is in src/data/cv.yml.
export function CvPage({ lang, printable }: { lang: Lang; printable: boolean }) {
  const t = <T extends Record<Lang, string>>(x: T) => x[lang];
  return (
    <CvContext.Provider value={{ lang, printable }}>
      <Profil />
      <div className="grid">
        <div className="g-col-12 g-col-sm-12 g-col-md-12 g-col-lg-6 g-col-print-6">
          <H level={1} id="experiences">{t(cv.experiences.title)}</H>
          <Experiences />
        </div>
        <div className="g-col-12 g-col-sm-12 g-col-md-12 g-col-lg-6 g-col-print-6">
          <H level={1} id="educations">{t(cv.educations.title)}</H>
          <Educations />
        </div>
      </div>

      <H level={1} id="research">{t(cv.researchs.title)}</H>
      <H level={2} id="theses">{t(cv.theses.titles.title)}</H>
      <Theses />
      <H level={2} id="projects">{t(cv.projects.titles.title)}</H>
      <Projects />
      <H level={2} id="publications">{t(cv.publications.title)}</H>
      <Publications />
      <H level={2} id="reviews">{t(cv.reviews.titles.title)}</H>
      <Reviews />
      <H level={2} id="supervisions">{t(cv.supervisions.titles.title)}</H>
      <Supervisions />
      <H level={2} id="animations">{t(cv.animations.titles.title)}</H>
      <Animations />

      <H level={1} id="teaching">{t(cv.teachings.title)}</H>
      <H level={2} id="coordinations">{t(cv.coordinations.titles.title)}</H>
      <Coordinations />
      <H level={2} id="lectures">{t(cv.lectures.title)}</H>
      <Lectures />

      <H level={1} id="others">{t(cv.others.title)}</H>
      <H level={2} id="missions">{t(cv.missions.title)}</H>
      <Missions />
    </CvContext.Provider>
  );
}
