import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { DOMAINS, WEIGHT, TAGS, QUESTIONS, SERVICES } from '../data';
import { pct, poolSize } from '../logic';
import { useTheme, mono } from '../theme';
import { Panel, Eyebrow, T, Button, Chip, Bar, DomainTag, Row } from '../ui';

const MODES = [
  { k: 'focus', t: 'Weak-spot focus', s: 'Domains 3 and 4 only. Questions you missed and your weakest topics come first.', rec: true },
  { k: 'svc', t: 'Name that service', s: `Description → service name, and the reverse. Built from ${SERVICES.length} services.` },
  { k: 'practice', t: 'Free practice', s: 'Pick domains and topics. Answer and explanation after each question.' },
  { k: 'exam', t: 'Exam simulation', s: '65 questions weighted like the real exam, 90-minute timer, results at the end.' },
  { k: 'wrong', t: 'Retry missed', s: 'Questions you answered wrong before.' },
];
export const MODE_LABEL = Object.fromEntries(MODES.map((m) => [m.k, m.t]));

export default function Home({ store, onStart, onGlossary, onCompare, onReset }) {
  const c = useTheme();
  const [mode, setMode] = useState('focus');
  const [domains, setDomains] = useState([1, 2, 3, 4]);
  const [tags, setTags] = useState([]);
  const [count, setCount] = useState(20);
  const [armed, setArmed] = useState(false);

  const opts = { domains, tags, count };
  const pool = poolSize(mode, opts, store);
  const wrongN = poolSize('wrong', opts, store);
  const last = store.history[store.history.length - 1];
  const availTags = [...new Set(QUESTIONS.filter((q) => domains.includes(q.d)).map((q) => q.t))].filter(Boolean);
  const weak = Object.entries(store.tag)
    .filter(([, x]) => x[1] >= 3)
    .map(([t, x]) => ({ t, p: pct(x[0], x[1]) }))
    .sort((a, b) => a.p - b.p)
    .slice(0, 5);
  const toggle = (arr, v) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  return (
    <View style={{ gap: 18 }}>
      <View style={{ gap: 8 }}>
        <Text accessibilityRole="header" style={{ color: c.fg, fontSize: 30, fontWeight: '800' }}>CLF-C02 Drill</Text>
        <T muted>
          AWS Certified Cloud Practitioner practice: {QUESTIONS.length.toLocaleString('en-US')} questions and a {SERVICES.length}-service glossary. Passing is 700/1000; aim to stay above 75% here.
        </T>
        <Row>
          {[1, 2, 3, 4].map((d) => (
            <DomainTag key={d} d={d} label={`D${d} · ${QUESTIONS.filter((q) => q.d === d).length}`} />
          ))}
        </Row>
      </View>

      <Row>
        <Button title="Compare services" icon="git-compare-outline" onPress={onCompare} style={{ flexGrow: 1 }} />
        <Button title="Service glossary" icon="book-outline" onPress={onGlossary} style={{ flexGrow: 1 }} />
      </Row>

      <Panel>
        <Eyebrow>Mode</Eyebrow>
        {MODES.map((m) => {
          const on = mode === m.k;
          const disabled = m.k === 'wrong' && !wrongN;
          return (
            <Pressable
              key={m.k}
              accessibilityRole="button"
              accessibilityState={{ selected: on, disabled }}
              disabled={disabled}
              onPress={() => setMode(m.k)}
              style={({ pressed }) => ({ borderWidth: 1, borderRadius: 8, padding: 12, gap: 3, minHeight: 48, opacity: disabled ? 0.45 : 1,
                borderColor: on || pressed ? c.accent : c.line, backgroundColor: on || pressed ? c.accentSoft : c.surface })}
            >
              {m.rec && <Text style={{ color: c.warn, fontFamily: mono, fontSize: 10, fontWeight: '700', letterSpacing: 1 }}>RECOMMENDED</Text>}
              <Text style={{ color: c.fg, fontWeight: '700', fontSize: 16 }}>{m.t}</Text>
              <T muted style={{ fontSize: 13, lineHeight: 19 }}>{m.k === 'wrong' ? (wrongN ? `${wrongN} missed question${wrongN === 1 ? '' : 's'} saved.` : 'Nothing missed yet. Questions you get wrong will show up here.') : m.s}</T>
            </Pressable>
          );
        })}
      </Panel>

      {mode === 'practice' && (
        <Panel>
          <Eyebrow>Domains</Eyebrow>
          <Row>
            {[1, 2, 3, 4].map((d) => (
              <Chip key={d} label={`${d}. ${DOMAINS[d]}`} right={`${WEIGHT[d]}%`} on={domains.includes(d)}
                onPress={() => { setDomains(toggle(domains, d).sort()); setTags([]); }} />
            ))}
          </Row>
          {availTags.length > 1 && (
            <>
              <Eyebrow>Topics (none = all)</Eyebrow>
              <Row>
                {availTags.map((t) => (
                  <Chip key={t} label={TAGS[t] || t} on={tags.includes(t)} onPress={() => setTags(toggle(tags, t))}
                    right={QUESTIONS.filter((q) => q.t === t && domains.includes(q.d)).length} />
                ))}
              </Row>
            </>
          )}
        </Panel>
      )}

      {['practice', 'focus', 'svc'].includes(mode) && (
        <Panel>
          <Eyebrow>Questions</Eyebrow>
          <Row>
            {[10, 20, 40, 'all'].map((n) => (
              <Chip key={n} label={n === 'all' ? `All (${pool})` : String(n)} on={count === n} onPress={() => setCount(n)} />
            ))}
          </Row>
        </Panel>
      )}

      <Row style={{ justifyContent: 'space-between' }}>
        <T muted style={{ fontSize: 13, fontFamily: mono, flexShrink: 1 }}>
          {last ? `Last: ${last.score}% · ${last.label} · ${last.n} q` : 'No sessions yet'}
        </T>
        <Button primary title="Start" disabled={!pool} onPress={() => onStart(mode, opts)} />
      </Row>

      <Panel>
        <Eyebrow>Your accuracy by domain</Eyebrow>
        {[1, 2, 3, 4].map((d) => {
          const x = store.dom[d] || [0, 0];
          return (
            <View key={d} style={{ gap: 4 }}>
              <Row style={{ justifyContent: 'space-between' }}>
                <T style={{ flexShrink: 1 }}>
                  <Text style={{ color: c.d[d], fontWeight: '700' }}>{d}. </Text>{DOMAINS[d]}
                </T>
                <T muted style={{ fontFamily: mono, fontSize: 13 }}>{x[1] ? `${pct(...x)}% · ${x[0]}/${x[1]}` : '—'}</T>
              </Row>
              <Bar value={pct(...x)} color={c.d[d]} />
            </View>
          );
        })}
        {weak.length > 0 && (
          <>
            <Eyebrow>Weakest topics · tap to practice</Eyebrow>
            <Row>
              {weak.map((w) => (
                <Chip key={w.t} label={TAGS[w.t] || w.t} right={`${w.p}%`}
                  onPress={() => onStart('practice', { domains: [1, 2, 3, 4], tags: [w.t], count: 20 })} />
              ))}
            </Row>
          </>
        )}
        <Pressable accessibilityRole="button" hitSlop={8} onPress={() => (armed ? (onReset(), setArmed(false)) : setArmed(true))}
          style={{ alignSelf: 'flex-start', minHeight: 44, justifyContent: 'center' }}>
          <Text style={{ color: armed ? c.bad : c.muted, fontSize: 13, textDecorationLine: 'underline' }}>
            {armed ? 'Tap again to erase all progress' : 'Reset progress'}
          </Text>
        </Pressable>
      </Panel>
    </View>
  );
}
