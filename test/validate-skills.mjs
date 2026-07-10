#!/usr/bin/env node
// Validates the skills library so a broken skill can never ship.
// Checks, per skill: SKILL.md exists, YAML frontmatter parses, `name` matches
// the directory, a real description, promptSignals present, and every
// [[cross-link]] resolves. Also checks the package.json `skills` manifest
// lists exactly the skill directories on disk. Run: `npm test`.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SKILLS_DIR = path.join(ROOT, 'skills');

const errors = [];
const warnings = [];

const dirs = fs
  .readdirSync(SKILLS_DIR)
  .filter((d) => fs.statSync(path.join(SKILLS_DIR, d)).isDirectory())
  .sort();
const known = new Set(dirs);

let linkCount = 0;

for (const d of dirs) {
  const file = path.join(SKILLS_DIR, d, 'SKILL.md');
  if (!fs.existsSync(file)) {
    errors.push(`${d}: missing SKILL.md`);
    continue;
  }
  const raw = fs.readFileSync(file, 'utf8');

  const m = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) {
    errors.push(`${d}: no YAML frontmatter block at top of SKILL.md`);
    continue;
  }

  let fm;
  try {
    fm = yaml.load(m[1]);
  } catch (e) {
    errors.push(`${d}: YAML parse error — ${e.message.split('\n')[0]}`);
    continue;
  }

  if (!fm || typeof fm !== 'object') {
    errors.push(`${d}: frontmatter is not a map`);
    continue;
  }
  if (fm.name !== d) errors.push(`${d}: name "${fm.name}" does not match directory`);
  if (typeof fm.description !== 'string' || fm.description.length < 40)
    errors.push(`${d}: missing or too-short description`);

  const hasSignals = fm?.metadata?.promptSignals || fm.promptSignals;
  if (!hasSignals) warnings.push(`${d}: no promptSignals (skill may not be retrieved)`);

  const body = raw.slice(m[0].length);
  for (const match of body.matchAll(/\[\[([a-z0-9-]+)\]\]/g)) {
    linkCount++;
    if (!known.has(match[1])) errors.push(`${d}: dead cross-link [[${match[1]}]]`);
  }
}

// Manifest ↔ filesystem consistency (the `skills` CLI reads this array).
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
const manifest = new Set((pkg.skills || []).map((s) => s.replace(/^skills\//, '')));
for (const d of dirs) if (!manifest.has(d)) errors.push(`package.json: skill "${d}" on disk but not in "skills"`);
for (const s of manifest) if (!known.has(s)) errors.push(`package.json: "skills" lists "${s}" with no directory`);

console.log(`Validated ${dirs.length} skills, ${linkCount} cross-links, ${manifest.size} manifest entries.`);
if (warnings.length) {
  console.log(`\nWarnings (${warnings.length}):`);
  for (const w of warnings) console.log('  ! ' + w);
}
if (errors.length) {
  console.log(`\nErrors (${errors.length}):`);
  for (const e of errors) console.log('  ✗ ' + e);
  process.exit(1);
}
console.log('\nAll checks passed.');
