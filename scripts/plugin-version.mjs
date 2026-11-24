import fs from 'node:fs';

const version = JSON.parse(fs.readFileSync('package.json', 'utf8')).version;
for (const f of ['.claude-plugin/plugin.json', '.claude-plugin/marketplace.json']) {
  const m = JSON.parse(fs.readFileSync(f, 'utf8'));
  if (m.plugins) m.plugins[0].version = version;
  else m.version = version;
  fs.writeFileSync(f, JSON.stringify(m, null, 2) + '\n');
}

// The dembrandt release sync sets DEMBRANDT_VERSION, as a tag (v0.41.0).
const dembrandt = process.env.DEMBRANDT_VERSION?.replace(/^v/, '');
if (dembrandt) {
  const mcp = fs.readFileSync('.mcp.json', 'utf8');
  fs.writeFileSync('.mcp.json', mcp.replace(/dembrandt@\d[\w.-]*/, `dembrandt@${dembrandt}`));
}
