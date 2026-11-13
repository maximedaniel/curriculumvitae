import type { ComponentType } from "react";
import { cv } from "./data/cv";
import { CvPage } from "./pages/CvPage";
import { mdxComponents } from "./components/mdx";

export interface RouteDef {
  path: string;
  title: string;
  subtitle?: string;
  titleBlock?: boolean;
  element: () => React.ReactElement;
}

interface MdxModule {
  default: ComponentType<{ components?: Record<string, unknown> }>;
  frontmatter?: { title?: string; subtitle?: string; titleBlock?: boolean };
}

const modules = import.meta.glob<MdxModule>("./content/**/*.mdx", { eager: true });

// ./content/research/research.mdx -> /pages/research/research.html
const mdxRoutes: RouteDef[] = Object.entries(modules).map(([file, mod]) => {
  const path = "/pages/" + file.replace("./content/", "").replace(/\.mdx$/, ".html");
  const Content = mod.default;
  return {
    path,
    title: mod.frontmatter?.title ?? path,
    subtitle: mod.frontmatter?.subtitle,
    titleBlock: mod.frontmatter?.titleBlock,
    element: () => <Content components={mdxComponents} />,
  };
});

export const routes: RouteDef[] = [
  { path: "/", title: cv.title, subtitle: cv.subtitle, element: () => <CvPage lang="en" printable={false} /> },
  { path: "/printable_en.html", title: cv.title, subtitle: cv.subtitle, element: () => <CvPage lang="en" printable /> },
  { path: "/printable_fr.html", title: cv.title, subtitle: cv.subtitle, element: () => <CvPage lang="fr" printable /> },
  ...mdxRoutes,
];

export const pageTitle = (path: string) => routes.find((r) => r.path === path)?.title ?? path;
