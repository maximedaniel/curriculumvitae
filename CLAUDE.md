# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Scope of the repository

This repository is a Quarto website (`project: type: website`). The website shows the academic CV of Maxime Daniel at www.maximedaniel.me. It also contains standalone pages for teaching and research, for example:

- `research.qmd`
- `design-methods.qmd`
- `user-scenario.qmd`
- `paper-writing.qmd`
- `statistics.qmd`

The repository has no tests and no linters.

To show a new standalone page in the navbar, add the page to `website.navbar` in `_quarto.yml`. Most pages are in the "Misc" menu.

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

- `./run.sh`: This script makes the printable variants (see below). Then it runs `quarto preview --no-browser --port 4307`.
- `quarto render`: This command builds the site into `_site/`. Git ignores `_site/`.
- `./deploy.sh`: This script does these steps:
  1. It makes the printable variants.
  2. It renders the site.
  3. It puts `_site` and `Dockerfile` into a tar file and copies the tar file to the server with `scp`.
  4. It builds and runs the `cv` Docker container again. The container runs the Node `http-server` on port 5000, behind nginx.

After a server reboot, make sure that the container runs. Then run `systemctl restart nginx`.

The scripts are bash scripts. They use `sed -i`. On Windows, run them in Git Bash or WSL.

## CV architecture: data in YAML, HTML from Lua filters

- The YAML front matter of `index.qmd` contains all the CV data (approximately 3,500 lines). The sections are `profil`, `experiences`, `educations`, `theses`, `projects`, `publications`, `reviews`, `supervisions`, `animations`, `coordinations`, `lectures` and `missions`.
- Each text field is a bilingual object with `en:` and `fr:` keys.
- The markdown body of `index.qmd` is only a layout skeleton. It contains empty fenced divs, for example `::: {.publications}\n:::`.
- `_quarto.yml` registers `filters/main.lua` for all pages. `main.lua` examines the document and finds each empty div with a section class.
- `main.lua` replaces each of these divs with a `RawBlock("html", ...)`. The function `render(metadata, debug)` in `filters/<section>.lua` makes this block.
- Each filter module reads its section from the metadata. It selects the language with `metadata.lang`. It builds Bootstrap HTML strings manually.

To add a CV entry, edit the YAML in `index.qmd`.

To add a new section type, do these steps:

1. Make the file `filters/<name>.lua`.
2. In `main.lua`, add the file to `package.path` and to the `require` statements.
3. In `main.lua`, add the class to `render_div_for_class` and to `classes_to_check`.
4. Add the div to the body of `index.qmd`.

Metadata flags change the HTML output:

- `printable: true`: The filters show plain links instead of buttons. They also expand the collapsed content.
- `lang`, `en` and `fr`: These flags select the language. The headings use `.content-visible when-meta="en|fr"`.

## Printable variants: do not edit them manually

`run.sh` and `deploy.sh` write over `printable_en.qmd` and `printable_fr.qmd`. Each file is a copy of `index.qmd` with `printable: true`. The French file also has `lang: fr` and `fr: true`.

- Always edit `index.qmd`. Do not edit the printable files.
- Git contains the printable files. Before you commit a change to `index.qmd`, run `run.sh` or do its `cp` and `sed` steps.

The scripts use `sed` to replace the text `printable: false`, `lang: en` and `en: true` in all lines of the file. At this time, only the flags at the top of `index.qmd` (lines 15–17) contain this text.

- Do not change these flag lines. If you change them, the printable files will be incorrect and no error will occur.
- Do not add CV data that contains this text. If you add it, `sed` will change the data in the printable files.

To make the PDF CV (refer to README):

1. Open the printable page in Firefox.
2. Print the page to PDF.

To remove the headers and footers, open `about:config` in Firefox. Set the `print.print_header*` and `print.print_footer*` keys to empty values.

## Other files

- `js/`: These scripts run in the browser. `_quarto.yml` adds them to all pages. They contain jQuery, the collapse buttons, the YouTube and video embeds, and the printable toggle. The printable toggle hides the buttons and expands the collapsed content.
- `bibliography.bib` and `sigchi-ext.csl`: These files supply the citations for the content pages.
- `pdf/`, `img/` and `gif/`: The YAML fields `pdf:` and `thumbnail:` refer to the files in these directories.
- `to_integrate/`: This directory contains React `.tsx` components. The build does not use them.
