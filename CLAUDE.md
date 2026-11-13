# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Scope of the repository

This repository is a Vite, React, TypeScript and MDX website. The website shows the academic CV of Maxime Daniel at www.maximedaniel.me. It also contains standalone pages for teaching and research.

The repository has no tests and no linters. The command `pnpm typecheck` checks the types.

An older version of the site used Quarto and Lua filters. The git tag `quarto-final` marks the last commit of that version.

## Directory structure

| Directory | Content | Published |
|---|---|---|
| root | The configuration, `index.html`, the scripts and the Docker files | No |
| `src/` | The source code of the site | Yes (compiled) |
| `src/data/` | `cv.yml` (the CV data), `cv.ts` (the typed loader) | Yes (compiled) |
| `src/content/` | The MDX pages (`research/`, `teaching/`) | Yes (compiled) |
| `src/components/` | The React components (`cv/`, `mdx/`, `layout/`, `ui.tsx`) | Yes (compiled) |
| `src/styles/` | The SCSS (Bootswatch Cosmo with the Bootstrap CSS grid) | Yes (compiled) |
| `src/slides/` | The code for the reveal.js slides | Yes (compiled) |
| `src/bibliography.bib`, `src/sigchi-ext.csl` | The citation data and the citation style | Yes (compiled) |
| `scripts/` | The remark plugin and the prerender script | No |
| `public/assets/` | `img/` and `pdf/`, copied as they are | Yes |
| `public/pages/research/slr/` | The reports of the systematic literature reviews (static HTML) | Yes |
| `pages/teaching/` | The HTML entry of the reveal.js slides | Yes (compiled) |
| `notes/` | The private notes | No |
| `sources/` | The source files, for example `.pptx` files and the React components in `to_integrate/` | No |

## Rules for text

Write all English text in ASD-STE100 Simplified Technical English. This rule applies to:

- the comments
- the commit messages
- this file.

The text of the pages (CV data and MDX content) is the content of the CV. Do not rewrite it to STE. The French (`fr:`) text is not in the scope of STE.

Obey these STE rules:

- Use only approved words with their approved meaning. Use technical names and technical verbs from the domain when necessary. One word has one meaning.
- Use only the simple present, simple past and simple future tenses. Do not use the "-ing" form as a verb.
- Use the active voice. Use the imperative for instructions.
- Write procedural sentences of 20 words or fewer and descriptive sentences of 25 words or fewer.
- Write paragraphs of 6 sentences or fewer.
- Do not omit articles ("the", "a") or demonstratives ("this", "these").
- Do not use contractions.
- In a warning or caution, write the instruction first, then the reason.

## Commands

- `pnpm dev`: This command starts the Vite dev server on port 4307.
- `pnpm build`: This command does these steps:
  1. It checks the types.
  2. It builds the client into `dist/`.
  3. It builds the server bundle into `dist-ssr/`.
  4. It runs `scripts/prerender.mjs`. This script writes one static HTML file for each route.
- `pnpm typecheck`: This command checks the types only.
- `./deploy.sh`: This script does these steps:
  1. It builds the site.
  2. It puts `dist` and `Dockerfile` into a tar file and copies the tar file to the server with `scp`.
  3. It builds and runs the `cv` Docker container again. The container runs the Node `http-server` on port 5000, behind nginx.

After a server reboot, make sure that the container runs. Then run `systemctl restart nginx`.

The scripts are bash scripts. On Windows, run them in Git Bash or WSL. Git ignores `dist/` and `dist-ssr/`.

## Routes

The URLs are the same as the URLs of the Quarto site. Each URL ends with `.html`.

- `src/routes.tsx` makes the routes. The CV routes are `/`, `/printable_en.html` and `/printable_fr.html`.
- Each file `src/content/<dir>/<name>.mdx` becomes the route `/pages/<dir>/<name>.html`.
- `scripts/prerender.mjs` writes the HTML of each route in `dist/`. The browser then hydrates the page.

To add a page, make a new `.mdx` file in `src/content/research/` or `src/content/teaching/`. Set `title` and, if necessary, `subtitle` in the front matter. To show the page in the navbar, add it to `src/site.ts`.

## CV architecture: data in YAML, HTML from React components

- `src/data/cv.yml` contains all the CV data. Each text field is a bilingual object with `en:` and `fr:` keys. The types are in `src/lib/cv-types.ts`.
- `src/data/cv.ts` loads the data and changes the quotes and the dashes to typographic characters.
- `src/pages/CvPage.tsx` is the layout of the CV. It takes the props `lang` and `printable`.
- Each section has a component in `src/components/cv/`. The component reads the language and the printable flag from `useCv()`.
- The printable flag changes the output: it shows plain links instead of buttons and it expands the collapsed content.
- Paths in `cv.yml` are relative to the site root without a slash, for example `assets/img/x.jpg`. The `asset()` function adds the slash.

To add a CV entry, edit `src/data/cv.yml`. To add a new section type, add a type in `cv-types.ts`, add a component in `src/components/cv/` and add the component to `CvPage.tsx`.

## MDX pages

- `vite.config.ts` registers the MDX plugin with `remark-gfm`, `remark-smartypants` and `scripts/remark-quarto.ts`.
- Use `<Figure id="fig-x">` with `<Sub>` and `<Caption>` for numbered figures. The plugin gives each figure a number and each subfigure a letter.
- Use `<Ref id="fig-x" />` to refer to a figure.
- Use `<Cite k="key" />` to cite an entry of `src/bibliography.bib`. Use `<References />` to show the list of the cited entries. The plugin formats the entries with `citation-js` and the CSL style.
- Use `<Tabs>` and `<Tab title="...">` for tabs. Use `<Picture>` for an image with a caption.
- For an image in an MDX page, use a path from the site root, for example `/assets/img/x.png`.

## PDF CV

To make the PDF CV:

1. Run `pnpm dev` and open `/printable_en.html` or `/printable_fr.html` in Firefox.
2. Print the page to PDF.

To remove the headers and footers, open `about:config` in Firefox. Set the `print.print_header*` and `print.print_footer*` keys to empty values.

## Other files

- `sources/to_integrate/`: This directory contains React `.tsx` components. The build does not use them.
- `public/pages/research/slr/`: These static pages come from the SLR procedure. Vite copies them without change.

## Interactive components

The components in `src/components/interactive/` make the figures of the research page interactive. Each component keeps all the text in the page and hides the text that the reader did not pick.

- `FilmGallery` and `Film`: a stage with a GIF and a row of banners.
- `VennDiagram` and `Field`: a Venn diagram of three circles with an example for each circle.
- `ThingsToStuff`: a slider from large objects to a continuous material.
- `ImageZones` and `Zone`: an image with zones that the reader can pick.
- `SubTabs`: the `<Sub>` elements of a `<Figure>` as tabs. A `<Ref>` to a subfigure opens its tab.
- `SubZones`: an overview image with zones. Each zone opens its example subfigures. A `<Ref>` to an example opens its zone.

Register each new component in `mdxComponents` in `src/components/mdx/index.tsx`.
