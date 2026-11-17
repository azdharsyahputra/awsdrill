// Validate comparison tables in src/data/compare/*.js
// Usage: node scripts/validate-compare.mjs
import { readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'compare');
let bad = 0, n = 0;
const ids = new Set();
for (const f of readdirSync(dir).filter((x) => x.endsWith('.js') && x !== 'index.js')) {
  const { default: tables } = await import(pathToFileURL(path.join(dir, f)).href);
  for (const t of tables) {
    n++;
    const err = (m) => { bad++; console.log(`BAD ${f} ${t.id}: ${m}`); };
    if (!t.id || ids.has(t.id)) err('missing or duplicate id'); ids.add(t.id);
    if (![1, 2, 3, 4].includes(t.domain)) err('domain must be 1-4');
    if (!t.title || !Array.isArray(t.columns) || t.columns.length < 2) err('needs title and >=2 columns');
    if (!Array.isArray(t.rows) || t.rows.length < 2) err('needs >=2 rows');
    for (const r of t.rows || []) if (!Array.isArray(r) || r.length !== t.columns.length) err(`row length ${r?.length} != ${t.columns.length}: ${r?.[0]}`);
    if (!Array.isArray(t.tips) || !t.tips.length) err('needs tips');
  }
}
console.log(`${n} tables`, bad ? `${bad} problem(s)` : 'OK');
process.exit(bad ? 1 : 0);
