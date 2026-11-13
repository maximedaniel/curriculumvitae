// Write one static HTML file for each route, as the Quarto build did.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const dist = path.resolve("dist");
const template = await readFile(path.join(dist, "index.html"), "utf8");
const { render, paths } = await import(pathToFileURL(path.resolve("dist-ssr/entry-server.js")).href);

for (const url of paths) {
  const { html, title } = render(url);
  const page = template
    .replace("<!--app-html-->", html)
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
  const file = url === "/" ? "index.html" : url.slice(1);
  await mkdir(path.dirname(path.join(dist, file)), { recursive: true });
  await writeFile(path.join(dist, file), page);
  console.log("prerendered", url);
}
