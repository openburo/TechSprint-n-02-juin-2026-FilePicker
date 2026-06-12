#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const ROOT = process.cwd();
const SOURCE = resolve(ROOT, 'src/OpenBuro-FilePicker-index.md');
const OUTPUT = resolve(ROOT, 'OpenBuro-FilePicker.md');
const INCLUDE_RE = /^[ \t]*<!--\s*include\s+src="([^"]+)"\s*-->[ \t]*$/gm;

function rewritePathsForRoot(markdown) {
  return markdown
    .replaceAll('../diagrams/', 'src/diagrams/')
    .replaceAll('../images/', 'src/images/')
    .replaceAll('../schemas/', 'src/schemas/');
}

function readIncludes(sourcePath) {
  const source = readFileSync(sourcePath, 'utf8');
  const sourceDir = dirname(sourcePath);
  const includes = [...source.matchAll(INCLUDE_RE)].map((match) => match[1]);

  if (includes.length === 0) {
    throw new Error(`${sourcePath} does not contain any include directives`);
  }

  return includes.map((includePath) => {
    const absolutePath = resolve(sourceDir, includePath);
    if (!existsSync(absolutePath)) {
      throw new Error(`Missing included page: ${includePath}`);
    }
    return rewritePathsForRoot(readFileSync(absolutePath, 'utf8').trimEnd());
  });
}

const output = `${readIncludes(SOURCE).join('\n\n')}\n`;
mkdirSync(dirname(OUTPUT), { recursive: true });
writeFileSync(OUTPUT, output);

console.log(`Built ${OUTPUT}`);
