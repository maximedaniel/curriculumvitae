import type { ComponentType } from "react";
import { cv } from "./data/cv";
import { CvPage } from "./pages/CvPage";
import { mdxComponents } from "./components/mdx";

export interface RouteDef {
  path: string;
  title: string;
  element: () => React.ReactElement;
}

interface MdxModule {
  default: ComponentType<{ components?: Record<string, unknown> }>;
  frontmatter?: { title?: string };
}

const modules = import.meta.glob<MdxModule>("./content/**/*.mdx", { eager: true });

// ./content/research/research.mdx -> /pages/research/research.html
const mdxRoutes: RouteDef[] = Object.entries(modules).map(([file, mod]) => {
  const path = "/pages/" + file.replace("./content/", "").replace(/\.mdx$/, ".html");
  const Content = mod.default;
  return {
    path,
    title: mod.frontmatter?.title ?? path,
    element: () => <Content components={mdxComponents} />,
  };
});

export const routes: RouteDef[] = [
  { path: "/", title: cv.title, element: () => <CvPage lang="en" printable={false} /> },
  { path: "/printable_en.html", title: cv.title, element: () => <CvPage lang="en" printable /> },
  { path: "/printable_fr.html", title: cv.title, element: () => <CvPage lang="fr" printable /> },
  ...mdxRoutes,
];

export const pageTitle = (path: string) => routes.find((r) => r.path === path)?.title ?? path;
