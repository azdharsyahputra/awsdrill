import { Text, View } from 'react-native';
import { DOMAINS, TAGS, CATEGORIES } from '../data';
import { pct } from '../logic';
import { useTheme, mono } from '../theme';
import { Panel, Eyebrow, T, Button, Bar, DomainTag, Row } from '../ui';

const TARGET = 75;

export default function Result({ result, onHome, onAgain, onRetry }) {
  const c = useTheme();
  const { label, exam, per, right, total, wrongs } = result;
  const p = pct(right, total);
  return (
    <View style={{ gap: 18 }}>
      <View style={{ gap: 8 }}>
        <Text accessibilityRole="header" style={{ color: c.fg, fontSize: 17, fontWeight: '700' }}>{label} results</Text>
        <Text style={{ fontSize: 48, fontWeight: '800', color: p >= TARGET ? c.ok : c.bad, fontVariant: ['tabular-nums'] }}>{p}%</Text>
        <T muted>
          {right} of {total} correct
          {exam ? ` · rough scaled estimate ≈ ${Math.round(100 + p * 9)}/1000` : ''} ·{' '}
          {p >= TARGET ? 'on track, keep it there' : `below the ${TARGET}% target`}
        </T>
      </View>

      <Panel>
        <Eyebrow>By domain</Eyebrow>
        {total === 0 && <T muted>No questions answered.</T>}
        {[1, 2, 3, 4].filter((d) => per[d][1]).map((d) => (
          <View key={d} style={{ gap: 4 }}>
            <Row style={{ justifyContent: 'space-between' }}>
              <T style={{ flexShrink: 1 }}><Text style={{ color: c.d[d], fontWeight: '700' }}>{d}. </Text>{DOMAINS[d]}</T>
              <T style={{ fontFamily: mono }}>{per[d][0]}/{per[d][1]}</T>
            </Row>
            <Bar value={pct(...per[d])} color={c.d[d]} />
          </View>
        ))}
      </Panel>

      <Row style={{ justifyContent: 'space-between' }}>
        <Button title="Menu" onPress={onHome} />
        <Row>
          {wrongs.some((w) => !w.q.gen) && <Button title="Retry missed" onPress={onRetry} />}
          <Button primary title="New session" onPress={onAgain} />
        </Row>
      </Row>

      {wrongs.length > 0 && (
        <Panel>
          <Eyebrow>Review: missed questions ({wrongs.length})</Eyebrow>
          {wrongs.map(({ q, mine }, k) => (
            <View key={k} style={{ borderWidth: 1, borderColor: c.line, borderRadius: 8, padding: 12, gap: 6 }}>
              <DomainTag d={q.d} label={`D${q.d} · ${TAGS[q.t] || CATEGORIES[q.t] || ''}`} />
              <T>{q.q}</T>
              <T style={{ fontSize: 14 }}>
                <Text style={{ color: c.bad, fontWeight: '700' }}>Your answer: </Text>
                {mine.length ? mine.map((i) => q.o[i]).join('; ') : '(blank)'}
              </T>
              <T style={{ fontSize: 14 }}>
                <Text style={{ color: c.ok, fontWeight: '700' }}>Correct: </Text>
                {q.a.map((i) => q.o[i]).join('; ')}
              </T>
              <T muted style={{ fontSize: 14 }}>{q.e}</T>
            </View>
          ))}
        </Panel>
      )}
    </View>
  );
}
