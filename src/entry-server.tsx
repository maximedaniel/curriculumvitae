import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { App } from "./App";
import { routes } from "./routes";
import { SITE_TITLE } from "./site";

export const paths = routes.map((r) => r.path);

export function render(url: string) {
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
  const title = routes.find((r) => r.path === url)?.title ?? "";
  return { html, title: `${title} – ${SITE_TITLE}` };
}
