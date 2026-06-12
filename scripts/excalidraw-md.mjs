#!/usr/bin/env node
// Excalidraw → SVG → Markdown pipeline.
//
// Scans every Markdown file for "managed blocks" that reference an .excalidraw
// source, renders each source to a sibling .svg (preserving fonts and embedded
// element hyperlinks via the real Excalidraw export engine), and rewrites the
// block to embed that SVG — wrapped in a link back to the editable source.
//
// Two modes:
//   node scripts/excalidraw-md.mjs           (write)  regenerate stale SVGs + rewrite blocks
//   node scripts/excalidraw-md.mjs --check   (CI)     fail if anything is out of date — no browser needed
//
// Staleness is tracked by the sha256 of the source file, stored in the block
// marker. The CHECK mode is pure Node (hash comparison only); only WRITE mode
// shells out to the renderer, so CI stays fast and dependency-free.
//
// Authoring syntax — write just the opening marker where you want the diagram:
//   <!-- excalidraw src="diagrams/architecture.excalidraw" -->
//   <!-- excalidraw src="diagrams/architecture.excalidraw" alt="Component architecture" -->
// then run `npm run diagrams`. The tool expands it into:
//   <!-- excalidraw src="diagrams/architecture.excalidraw" alt="..." sha256="..." -->
//   [![Component architecture](diagrams/architecture.excalidraw.svg)](diagrams/architecture.excalidraw)
//   <!-- /excalidraw -->

import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import {
  readFileSync, writeFileSync, existsSync, readdirSync, statSync,
} from 'node:fs';
import { resolve, dirname, basename, join } from 'node:path';

const CHECK = process.argv.includes('--check');
const ROOT = process.cwd();
const IGNORE_DIRS = new Set(['.git', 'node_modules', '.github']);

// Matches a managed block. Group 1 = marker attributes, Group 2 = body (only
// present once the block has been expanded with a closing marker). The opening
// marker must start a line (after optional indent) so mid-sentence inline-code
// mentions like `<!-- excalidraw … -->` in prose are never treated as real.
const BLOCK_RE =
  /^[ \t]*<!--\s*excalidraw\s+([^>]*?)-->[ \t]*(?:\r?\n([\s\S]*?)<!--\s*\/excalidraw\s*-->)?/gm;

function parseAttrs(raw) {
  const attrs = {};
  const re = /(\w+)\s*=\s*"([^"]*)"/g;
  let m;
  while ((m = re.exec(raw))) attrs[m[1]] = m[2];
  return attrs;
}

function sha256(filePath) {
  return createHash('sha256').update(readFileSync(filePath)).digest('hex');
}

function altFor(attrs) {
  return attrs.alt || basename(attrs.src).replace(/\.excalidraw$/i, '');
}

// The deterministic, normalized form of a managed block.
function buildBlock(attrs, hash) {
  const parts = [`src="${attrs.src}"`];
  if (attrs.alt) parts.push(`alt="${attrs.alt}"`);
  parts.push(`sha256="${hash}"`);
  const imageLine = `[![${altFor(attrs)}](${attrs.src}.svg)](${attrs.src})`;
  return `<!-- excalidraw ${parts.join(' ')} -->\n${imageLine}\n<!-- /excalidraw -->`;
}

// The single image line a correct block body must contain.
function expectedImageLine(attrs) {
  return `[![${altFor(attrs)}](${attrs.src}.svg)](${attrs.src})`;
}

// Byte ranges covered by fenced code blocks (``` or ~~~), so example markers
// inside documentation fences are not treated as real diagrams.
function fencedRanges(text) {
  const ranges = [];
  let open = null; // { fence, start }
  let offset = 0;
  for (const line of text.split(/(?<=\n)/)) {
    const m = line.match(/^\s*(```+|~~~+)/);
    if (m) {
      if (!open) open = { fence: m[1][0], start: offset };
      else if (line.includes(open.fence)) { ranges.push([open.start, offset + line.length]); open = null; }
    }
    offset += line.length;
  }
  if (open) ranges.push([open.start, offset]);
  return ranges;
}

function* walkMarkdown(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.git')) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      yield* walkMarkdown(full);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      yield full;
    }
  }
}

function renderSvg(srcAbs, svgAbs) {
  // Uses the real Excalidraw export engine (Playwright + Firefox) so fonts,
  // hand-drawn styles and element hyperlinks are preserved in the SVG.
  execFileSync(
    'npx',
    [
      '--yes', 'excalidraw-brute-export-cli',
      '-i', srcAbs,
      '--format', 'svg',
      '--background', '1',
      '--dark-mode', '0',
      '--scale', '1',
      '--embed-scene', '0',
      '-o', svgAbs,
    ],
    { stdio: 'inherit' },
  );
}

const stale = [];   // problems found in --check mode
const errors = [];  // hard errors (missing source, malformed block)
let rendered = 0;
let rewritten = 0;

for (const mdPath of walkMarkdown(ROOT)) {
  const mdDir = dirname(mdPath);
  const original = readFileSync(mdPath, 'utf8');
  const fenced = fencedRanges(original);
  let changed = false;

  const updated = original.replace(BLOCK_RE, (match, rawAttrs, body, offset) => {
    // Skip markers that live inside fenced code blocks (e.g. documentation examples).
    if (fenced.some(([s, e]) => offset >= s && offset < e)) return match;
    const attrs = parseAttrs(rawAttrs);
    const where = `${mdPath} (offset ${offset})`;

    if (!attrs.src) {
      errors.push(`${where}: excalidraw marker is missing a src="..." attribute`);
      return match;
    }
    if (body && /<!--\s*excalidraw\s/.test(body)) {
      errors.push(`${where}: nested/unterminated excalidraw block — add a <!-- /excalidraw --> for "${attrs.src}"`);
      return match;
    }

    const srcAbs = resolve(mdDir, attrs.src);
    const svgAbs = `${srcAbs}.svg`;
    if (!existsSync(srcAbs)) {
      errors.push(`${where}: source not found: ${attrs.src}`);
      return match;
    }
    const curHash = sha256(srcAbs);

    if (CHECK) {
      const upToDate =
        body !== undefined &&
        attrs.sha256 === curHash &&
        existsSync(svgAbs) &&
        body.trim() === expectedImageLine(attrs);
      if (!upToDate) {
        let reason = 'needs regeneration';
        if (body === undefined) reason = 'marker not expanded';
        else if (attrs.sha256 !== curHash) reason = 'source changed since last render';
        else if (!existsSync(svgAbs)) reason = `missing SVG ${attrs.src}.svg`;
        else reason = 'embedded image line is out of date';
        stale.push(`${mdPath}: "${attrs.src}" — ${reason}`);
      }
      return match;
    }

    // WRITE mode
    const needRender = attrs.sha256 !== curHash || !existsSync(svgAbs);
    if (needRender) {
      console.log(`rendering ${attrs.src} → ${attrs.src}.svg`);
      renderSvg(srcAbs, svgAbs);
      rendered++;
    }
    const next = buildBlock(attrs, curHash);
    if (next !== match) { changed = true; rewritten++; }
    return next;
  });

  if (!CHECK && changed) writeFileSync(mdPath, updated);
}

if (errors.length) {
  console.error('\nExcalidraw block errors:');
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(2);
}

if (CHECK) {
  if (stale.length) {
    console.error('\nOut-of-date Excalidraw diagrams:');
    for (const s of stale) console.error(`  ✗ ${s}`);
    console.error('\nRun `npm run diagrams` and commit the updated .svg files and Markdown.');
    process.exit(1);
  }
  console.log('All Excalidraw diagrams are up to date.');
} else {
  console.log(`Done. ${rendered} SVG(s) rendered, ${rewritten} block(s) rewritten.`);
}
