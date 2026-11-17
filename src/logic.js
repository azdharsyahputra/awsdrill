import AsyncStorage from '@react-native-async-storage/async-storage';
import { QUESTIONS, SERVICES, EXAM_PER, hash } from './data';

export const shuffle = (a) => {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
export const same = (x, y) => x.length === y.length && x.every((v) => y.includes(v));
export const pct = (r, n) => (n ? Math.round((r / n) * 100) : 0);
export const fmt = (ms) => {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
};

// ---------- progress (AsyncStorage = localStorage on web) ----------
const KEY = 'clf02-drill-v1';
export const emptyStore = () => ({ wrong: [], history: [], dom: {}, tag: {} });
export async function loadStore() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? { ...emptyStore(), ...JSON.parse(raw) } : emptyStore();
  } catch {
    return emptyStore();
  }
}
export function saveStore(store) {
  AsyncStorage.setItem(KEY, JSON.stringify(store)).catch(() => {});
}

// Returns a new store with one answered question recorded.
export function record(store, q, ok) {
  const bump = (o, k) => {
    const cur = o[k] || [0, 0];
    return { ...o, [k]: [cur[0] + (ok ? 1 : 0), cur[1] + 1] };
  };
  let wrong = store.wrong;
  if (!q.gen) {
    wrong = wrong.filter((x) => x !== q.id);
    if (!ok) wrong = [...wrong, q.id];
  }
  return { ...store, wrong, dom: bump(store.dom, q.d), tag: q.t ? bump(store.tag, q.t) : store.tag };
}

// ---------- generated "Name that service" questions ----------
function serviceQuestion(s) {
  const pool = [
    ...shuffle(SERVICES.filter((x) => x.c === s.c && x.n !== s.n)),
    ...shuffle(SERVICES.filter((x) => x.c !== s.c)),
  ].slice(0, 3);
  const opts = shuffle([s, ...pool]);
  const d = s.c === 'security' ? 2 : 3;
  if (Math.random() < 0.35) {
    return {
      id: 'svc-r-' + hash(s.n), d, t: s.c, gen: true,
      q: `What is ${s.n} mainly used for?`,
      o: opts.map((x) => x.s), a: [opts.indexOf(s)],
      e: `${s.n}: ${s.s} Keywords: ${s.k}.`,
    };
  }
  const twins = pool.filter((x) => x.c === s.c).map((x) => `${x.n} = ${x.k}`);
  return {
    id: 'svc-' + hash(s.n), d, t: s.c, gen: true,
    q: `Which service fits? ${s.s}`,
    o: opts.map((x) => x.n), a: [opts.indexOf(s)],
    e: `${s.n} → ${s.k}.${twins.length ? ' ' + twins.join('; ') + '.' : ''}`,
  };
}

// ---------- build a session ----------
export function buildList(mode, opts, store) {
  const { domains = [1, 2, 3, 4], tags = [], count = 20 } = opts;
  const take = (arr) => (count === 'all' ? arr : arr.slice(0, count));
  let list = [];
  if (mode === 'exam') {
    list = shuffle([1, 2, 3, 4].flatMap((d) => shuffle(QUESTIONS.filter((q) => q.d === d)).slice(0, EXAM_PER[d])));
  } else if (mode === 'wrong') {
    list = shuffle(QUESTIONS.filter((q) => store.wrong.includes(q.id)));
  } else if (mode === 'svc') {
    list = shuffle(SERVICES).slice(0, count === 'all' ? SERVICES.length : count).map(serviceQuestion);
  } else if (mode === 'focus') {
    // Domains 3 and 4; previously-missed questions and weak topics first.
    const score = (q) =>
      (store.wrong.includes(q.id) ? 0 : 1) +
      (store.tag[q.t] ? pct(...store.tag[q.t]) / 100 : 0.5) +
      Math.random() * 0.6;
    const ranked = QUESTIONS.filter((q) => q.d >= 3).map((q) => [score(q), q]).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
    list = shuffle(take(ranked));
  } else {
    list = take(shuffle(QUESTIONS.filter((q) => domains.includes(q.d) && (!tags.length || tags.includes(q.t)))));
  }
  return list.map((q) => ({ q, order: shuffle(q.o.map((_, i) => i)) }));
}

export function poolSize(mode, { domains = [], tags = [] }, store) {
  if (mode === 'practice') return QUESTIONS.filter((q) => domains.includes(q.d) && (!tags.length || tags.includes(q.t))).length;
  if (mode === 'focus') return QUESTIONS.filter((q) => q.d >= 3).length;
  if (mode === 'svc') return SERVICES.length;
  if (mode === 'wrong') return QUESTIONS.filter((q) => store.wrong.includes(q.id)).length;
  return 65;
}
