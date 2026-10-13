# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Scope of the repository

This repository is a Quarto website (`project: type: website`). The website shows the academic CV of Maxime Daniel at www.maximedaniel.me. It also contains standalone pages for teaching and research.

The repository has no tests and no linters.

## Directory structure

| Directory | Content | Published |
|---|---|---|
| root | The CV pages (`index.qmd`, `printable_en.qmd`, `printable_fr.qmd`), `_cv-body.qmd`, the configuration and the scripts | Yes (pages only) |
| `data/` | `cv.yml`, the CV data | No |
| `filters/` | The Lua filters | No |
| `pages/research/` | The research pages, for example `research.qmd` and `state-of-art.qmd` | Yes |
| `pages/research/slr/` | The reports of the systematic literature reviews | Yes (all files) |
| `pages/teaching/` | The teaching pages, for example `design-methods.qmd` and `statistics.qmd` | Yes |
| `assets/` | `img/`, `pdf/`, `css/` and `js/` | Yes (only the files that a page refers to) |
| `notes/` | The private notes, for example `TODO.md` and `ideas.md` | No |
| `sources/` | The source files, for example `.pptx` files and the React components | No |

Put a new page in `pages/research/` or `pages/teaching/`. Quarto renders all `.qmd` files, but not the files in `notes/` and `sources/`.

To show a new page in the navbar, add the page to `website.navbar` in `_quarto.yml`. Most pages are in the "Misc" menu.

Obey these rules for paths in a page in `pages/`:

- For a Markdown image or link to an asset, use a path from the project root, for example `/assets/img/x.png`. Quarto changes this path to a relative path.
- For a raw HTML `src` or `href`, use a path from the site root, for example `/assets/js/x.js`. Quarto does not change this path.
- For a YAML option such as `bibliography`, `csl` or `css`, use a relative path, for example `../../bibliography.bib`.

In `data/cv.yml`, write the paths relative to the site root without a slash, for example `assets/img/x.jpg`. Only the CV pages use these paths, and these pages are in the root directory.

## Rules for text

Write all English text in ASD-STE100 Simplified Technical English. This rule applies to:

- the page content (`.qmd`)
- the English (`en:`) fields in the CV YAML
- the comments
- the commit messages
- this file.

The French (`fr:`) text is not in the scope of STE.

Obey these STE rules:

- Use only approved words with their approved meaning. Use technical names and technical verbs from the domain when necessary. One word has one meaning.
- Use only the simple present, simple past and simple future tenses. Do not use the "-ing" form as a verb. Use the past participle only as an adjective or with "is/are".
- Use the active voice. Use the imperative for instructions.
- Write procedural sentences of 20 words or fewer and descriptive sentences of 25 words or fewer. Write one instruction or one topic in each sentence.
- Write paragraphs of 6 sentences or fewer.
- Do not make noun clusters of more than 3 words.
- Do not omit articles ("the", "a") or demonstratives ("this", "these").
- Use vertical lists for complex text.
- Do not use contractions.
- In a warning or caution, write the instruction first, then the reason.

## Commands

- `./run.sh`: This script runs `quarto preview --no-browser --port 4307`.
- `quarto render`: This command builds the site into `_site/`. Git ignores `_site/`.
- `./deploy.sh`: This script does these steps:
  1. It renders the site.
  2. It puts `_site` and `Dockerfile` into a tar file and copies the tar file to the server with `scp`.
  3. It builds and runs the `cv` Docker container again. The container runs the Node `http-server` on port 5000, behind nginx.

After a server reboot, make sure that the container runs. Then run `systemctl restart nginx`.

The scripts are bash scripts. On Windows, run them in Git Bash or WSL.

## CV architecture: data in YAML, HTML from Lua filters

The CV has three pages. These pages use the same data and the same layout:

| Page | `lang` | `printable` |
|---|---|---|
| `index.qmd` | `en` | `false` |
| `printable_en.qmd` | `en` | `true` |
| `printable_fr.qmd` | `fr` | `true` |

- Each page is a short file. It contains only its flags, a `metadata-files` entry for `data/cv.yml` and an include of `_cv-body.qmd`.
- `data/cv.yml` contains all the CV data (approximately 3,500 lines). The sections are `profil`, `experiences`, `educations`, `theses`, `projects`, `publications`, `reviews`, `supervisions`, `animations`, `coordinations`, `lectures` and `missions`.
- Each text field is a bilingual object with `en:` and `fr:` keys.
- `_cv-body.qmd` is only a layout skeleton. It contains empty fenced divs, for example `::: {.publications}\n:::`. Quarto does not render files with a `_` prefix as pages.
- `_quarto.yml` registers `filters/main.lua` for all pages. `main.lua` examines the document and finds each empty div with a section class.
- `main.lua` replaces each of these divs with a `RawBlock("html", ...)`. The function `render(metadata, debug)` in `filters/<section>.lua` makes this block.
- Each filter module reads its section from the metadata. It selects the language with `metadata.lang`. It builds Bootstrap HTML strings manually.

To add a CV entry, edit `data/cv.yml`.

To add a new section type, do these steps:

1. Make the file `filters/<name>.lua`.
2. In `main.lua`, add a `require("filters.<name>")` statement. `main.lua` finds the modules from the project root.
3. In `main.lua`, add the class to `render_div_for_class` and to `classes_to_check`.
4. Add the div to `_cv-body.qmd`.

Metadata flags change the HTML output:

- `printable: true`: The filters show plain links instead of buttons. They also expand the collapsed content.
- `lang`, `en` and `fr`: These flags select the language. The headings use `.content-visible when-meta="en|fr"`.

Do not put these flags in `data/cv.yml`. Each page sets its own flags.

## PDF CV

To make the PDF CV (refer to README):

1. Open the printable page in Firefox.
2. Print the page to PDF.

To remove the headers and footers, open `about:config` in Firefox. Set the `print.print_header*` and `print.print_footer*` keys to empty values.

## Other files

- `assets/js/`: These scripts run in the browser. `_quarto.yml` adds them to all pages. They contain jQuery, the collapse buttons, the YouTube and video embeds, and the printable toggle. The printable toggle hides the buttons and expands the collapsed content.
- `bibliography.bib` and `sigchi-ext.csl`: These files supply the citations for the content pages.
- `assets/pdf/` and `assets/img/`: The YAML fields `pdf:` and `thumbnail:` refer to the files in these directories.
- `sources/to_integrate/`: This directory contains React `.tsx` components. The build does not use them.
