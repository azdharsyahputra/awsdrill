// Validate every question file: schema, answer indexes, "Choose TWO" consistency, duplicates.
// Usage: node scripts/validate.mjs
import { readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data');
const TAGS = {
  1: ['concepts'],
  2: ['security'],
  3: ['compute', 'containers', 'storage', 'database', 'network', 'global-infra', 'analytics', 'ml-ai', 'integration', 'devtools', 'management', 'migration', 'iot-other'],
  4: ['pricing-models', 'cost-tools', 'billing-org', 'support', 'resources'],
};
const ID_WORDS = /\b(dan|untuk|yang|tidak|bisa|pakai|sedangkan|adalah)\b/;

let bad = 0;
const seen = new Map();
const perDomain = { 1: 0, 2: 0, 3: 0, 4: 0 };
const files = readdirSync(dir).filter((f) => f.endsWith('.js') && !['index.js', 'services.js'].includes(f));
for (const f of files) {
  const { default: qs } = await import(pathToFileURL(path.join(dir, f)).href);
  for (const [i, x] of qs.entries()) {
    const where = `${f}#${i}`;
    const err = (m) => { bad++; console.log(`BAD ${where}: ${m} :: ${String(x.q).slice(0, 80)}`); };
    if (![1, 2, 3, 4].includes(x.d)) err('d must be 1-4');
    else if (!TAGS[x.d].includes(x.t)) err(`tag "${x.t}" not valid for domain ${x.d}`);
    if (!x.q || !x.e || !Array.isArray(x.o) || !Array.isArray(x.a)) { err('missing field'); continue; }
    const two = /\(Choose TWO\.\)/.test(x.q);
    if (two && (x.a.length !== 2 || x.o.length !== 5)) err('Choose TWO needs 5 options and 2 answers');
    if (!two && (x.a.length !== 1 || x.o.length !== 4)) err('single answer needs 4 options and 1 answer');
    if (x.a.some((k) => !Number.isInteger(k) || k < 0 || k >= x.o.length)) err('answer index out of range');
    if (new Set(x.o).size !== x.o.length) err('duplicate options');
    if (ID_WORDS.test(x.e)) err('explanation looks Indonesian');
    const key = x.q.trim().toLowerCase();
    if (seen.has(key)) err(`duplicate of ${seen.get(key)}`);
    else seen.set(key, where);
    perDomain[x.d]++;
  }
}
console.log('files:', files.join(', '));
console.log('per domain:', perDomain, 'total:', seen.size);
console.log(bad ? `${bad} problem(s)` : 'OK');
process.exit(bad ? 1 : 0);
