import fs from 'node:fs';
import path from 'node:path';

const OUT = 'directory';
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, '.claude-plugin'), { recursive: true });

const { mcpServers, ...manifest } = JSON.parse(fs.readFileSync('.claude-plugin/plugin.json', 'utf8'));
const listing = {
  ...manifest,
  privacyPolicyUrl: 'https://www.dembrandt.com/privacy',
  supportUrl: 'https://github.com/dembrandt/dembrandt-skills/issues',
  documentationUrl: 'https://www.dembrandt.com/getting-started',
};
fs.writeFileSync(path.join(OUT, '.claude-plugin/plugin.json'), JSON.stringify(listing, null, 2) + '\n');
fs.copyFileSync('.claude-plugin/icon.png', path.join(OUT, '.claude-plugin/icon.png'));
fs.copyFileSync('LICENSE', path.join(OUT, 'LICENSE'));

const plainFrontmatter = (md) => md.replace(/^---\n([\s\S]*?)\n---\n/, (_, fm) =>
  `---\n${fm.split('\n').filter((l) => /^(name|description): /.test(l)).join('\n')}\n---\n`);

const INSTALLS = /\bnpx\b|\bnpm (i|install)\b/;
const noInstalls = (md) => md
  .replace(/^(# .*\bnpx\b.*\nnpx .*|Note: .*\bnpx\b.*)\n\n?/gm, '')
  .replace(/^(?:# .*\n)?npm (?:i|install) -g (\S+)$/gm, '# Install $1 from its own instructions: https://www.npmjs.com/package/$1')
  .replace(/ \(no install — `npx` fetches it on first run\)/g, '')
  .replace(/"command": "npx", "args": \["-y", "dembrandt", "mcp"\]/g, '"command": "dembrandt", "args": ["mcp"]')
  .replace(/\bnpx (-y )?/g, '');

for (const skill of fs.readdirSync('skills')) {
  const dir = path.join('skills', skill);
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.md'))) {
    const md = fs.readFileSync(path.join(dir, file), 'utf8');
    fs.mkdirSync(path.join(OUT, dir), { recursive: true });
    const out = noInstalls(file === 'SKILL.md' ? plainFrontmatter(md) : md);
    if (INSTALLS.test(out)) throw new Error(`${dir}/${file}: install command left in the directory copy`);
    fs.writeFileSync(path.join(OUT, dir, file), out);
  }
}

fs.writeFileSync(path.join(OUT, 'README.md'), `# dembrandt skills

Generated from the repository root by scripts/build-directory.mjs. Do not edit by hand.

${manifest.description}

This copy carries the skills only. The full plugin, with the MCP server for live token extraction:

    /plugin install dembrandt --marketplace dembrandt/dembrandt-skills
`);
