import fs from 'node:fs';

const version = JSON.parse(fs.readFileSync('package.json', 'utf8')).version;
for (const f of ['.claude-plugin/plugin.json', '.claude-plugin/marketplace.json']) {
  const m = JSON.parse(fs.readFileSync(f, 'utf8'));
  if (m.plugins) m.plugins[0].version = version;
  else m.version = version;
  fs.writeFileSync(f, JSON.stringify(m, null, 2) + '\n');
}
