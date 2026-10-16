'use strict';
// Lint minimo sem dependencias externas: verifica que src/ tem ficheiros .js
// e que parseiam. Substituir por eslint quando o projeto crescer.
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'));
if (files.length === 0) { console.error('lint: src/ sem ficheiros .js'); process.exit(1); }
for (const f of files) {
  try { new Function(fs.readFileSync(path.join(dir, f), 'utf8')); }
  catch (e) { console.error(`lint: ${f} nao parseia: ${e.message}`); process.exit(1); }
}
console.log(`lint ok (${files.length} ficheiro(s))`);
