# Diagrams — Excalidraw → SVG in Markdown

Diagrams live as editable `.excalidraw` source files in the repo. A small
pipeline renders each referenced diagram to an SVG and embeds it in the
Markdown, so readers see the picture on GitHub while contributors keep editing
the real source.

## Authoring

Write a single marker comment where you want the diagram to appear:

```markdown
<!-- excalidraw src="OpenBuro-FilePicker-Scheme-consumer-provider-architecture.excalidraw" -->
```

`src` is relative to the Markdown file. You can add a caption:

```markdown
<!-- excalidraw src="diagrams/lifecycle.excalidraw" alt="Intent lifecycle" -->
```

Then regenerate:

```bash
npm install                 # first time only — pulls the renderer
npx playwright install-deps # first time only (CI/Linux: system libs)
npx playwright install firefox
npm run diagrams
```

The tool expands the marker into a managed block it fully owns:

```markdown
<!-- excalidraw src="diagrams/lifecycle.excalidraw" alt="Intent lifecycle" sha256="…" -->
[![Intent lifecycle](diagrams/lifecycle.excalidraw.svg)](diagrams/lifecycle.excalidraw)
<!-- /excalidraw -->
```

- The generated SVG is committed next to its source: `foo.excalidraw` → `foo.excalidraw.svg`.
- The image is wrapped in a link back to the editable `.excalidraw` source.
- Hyperlinks you attach to elements inside Excalidraw are preserved as `<a>` in the SVG (clickable when the SVG is opened directly).
- **Do not edit** anything between `<!-- excalidraw … -->` and `<!-- /excalidraw -->` by hand — re-run `npm run diagrams` instead.

## How staleness is detected

The marker stores the `sha256` of the source at the last render. When the
`.excalidraw` changes, its hash no longer matches and the corresponding
`*.excalidraw.svg` is re-rendered and re-embedded. The SVG path is derived
deterministically from `src`, so the tool always knows which file to replace.

## CI

`.github/workflows/excalidraw-svg.yml` runs `npm run diagrams:check` on every PR
and push touching `.md` / `.excalidraw`. It is a **pure hash check** (no browser,
no install) and fails if any diagram is out of date, pointing you to
`npm run diagrams`.

> Note on GitHub rendering: an embedded SVG image is shown flattened, so
> per-element hyperlinks inside the diagram are not clickable in GitHub's
> Markdown preview (they work when the `.svg` is opened on its own). The whole
> image links back to the source. Per-element clickable links in the preview
> would require inline SVG, which GitHub sanitizes away.
