const { cpSync, mkdirSync } = require('node:fs');
const { join } = require('node:path');

const root = join(__dirname, '..');
const output = join(root, 'public');

mkdirSync(output, { recursive: true });

for (const path of ['index.html', 'assets', 'css', 'js', 'projects']) {
  cpSync(join(root, path), join(output, path), { recursive: true });
}
