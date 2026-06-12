# TechSprint #02 — June 2026 — File Picker

This repository hosts the work on **defining a File Picker standard for Open Buro**.

The goal: to allow any application (mail, docs, chat, calendar…) to ask any drive
(TDrive, Fichier DINUM, Nextcloud…) to display a file selection interface, and to
receive the result in a standardized way.

## Why the File Picker first

Picking a file from one application while working in another is the smallest complete proof that two independently-built services can cooperate deeply — not merely sit side by side. It is concrete, universally needed, and bounded enough to specify and demonstrate quickly. Starting from a working use case (rather than from abstract governance debates) is a deliberate sequencing choice: architecture conditions governance, and a demonstration earns the credibility that a specification alone cannot.

## Produced specification

- [Open Buro - Specification - File Picker](./OpenBuro-FilePicker.md)

The final specification is generated at the repository root from the source
assembly file [`src/OpenBuro-FilePicker-index.md`](./src/OpenBuro-FilePicker-index.md).
Edit the split source pages under [`src/pages/`](./src/pages/), then rebuild:

```bash
npm run build
```

## Build workflow

The repository keeps maintainable source files under `src/` and builds the
single-file deliverable at the root:

- source assembly: `src/OpenBuro-FilePicker-index.md`;
- source pages: `src/pages/*.md`;
- editable diagrams: `src/diagrams/*.excalidraw`;
- generated deliverable: `OpenBuro-FilePicker.md`.

Run `npm run check` to verify that diagrams and the generated root document are up to date.

## Generate documentation from JSON Schema

We used [jsonschema2md](https://pypi.org/project/jsonschema2md/) to generate the markdown documentation from the schema definitions.

## Editing the diagrams

Diagrams in the Markdown files are not hand-drawn images: each one is generated
from an editable **Excalidraw** source (`src/diagrams/*.excalidraw`) committed in the repo.
The `.svg` you see embedded is produced from that source, so the picture and the
editable original never drift apart.

**To change an existing diagram:**

1. Open the `*.excalidraw` source — drag it into [excalidraw.com](https://excalidraw.com),
   or use the *Excalidraw* extension in VS Code — edit it, and save back over the same file.
2. Regenerate the embedded SVGs and root document:
   ```bash
   npm install                  # first time only
   npx playwright install firefox   # first time only
   npm run build
   ```
3. Commit the changed `*.excalidraw` source, regenerated `*.excalidraw.svg`,
   updated source Markdown, and `OpenBuro-FilePicker.md`.

**To add a new diagram**, drop a single marker line where you want it to appear,
then run `npm run diagrams` — it expands the marker into the embedded image:

```markdown
<!-- excalidraw src="../diagrams/your-diagram.excalidraw" alt="Short caption" -->
```

Don't edit anything between `<!-- excalidraw … -->` and `<!-- /excalidraw -->` by
hand — re-run `npm run diagrams` instead.

See **[DIAGRAMS.md](./DIAGRAMS.md)** for the full reference.

## Learn more

- Background and introduction to Open Buro:
  [LinkedIn post by Benjamin André](https://www.linkedin.com/posts/benjam1andre_la-workplace-souveraine-open-buro-et-la-activity-7470368736391389184-En8f?utm_source=share&utm_medium=member_desktop&rcm=ACoAAACiZrIBoTReH05MDF2nQXykjIdLih6OZGM)
- Previous TechSprint: [TechSprint #01 — April 2026](https://github.com/openburo/TechSprint-n-01-april-20206-FilePicker)
