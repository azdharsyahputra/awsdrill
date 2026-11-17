import { useEffect, useState } from 'react';
import { BackHandler, Platform, Pressable, Text, View } from 'react-native';
import { DOMAINS, TAGS, CATEGORIES } from '../data';
import { same, fmt } from '../logic';
import { useTheme, mono, TOUCH } from '../theme';
import { Panel, T, Button, Chip, Bar, DomainTag, Row, Icon } from '../ui';

const L = 'ABCDE';

export default function Quiz({ session, onRecord, onFinish, onQuit, onScrollTop }) {
  const c = useTheme();
  const { list, mode, deadline } = session;
  const exam = mode === 'exam';
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const [flags, setFlags] = useState({});
  const [now, setNow] = useState(Date.now());
  const [quitArmed, setQuitArmed] = useState(false);

  const it = list[i];
  const q = it.q;
  const multi = q.a.length > 1;
  const chosen = answers[i] || [];
  const shown = !exam && revealed[i];
  const ok = shown && same(chosen, q.a);
  const last = i === list.length - 1;

  const finish = () => onFinish({ answers, revealed });
  // Exams take two taps to quit so a stray tap can't throw away a 90-minute run.
  const quit = () => {
    if (!exam || quitArmed) return onQuit();
    setQuitArmed(true);
  };

  // New question: start at the top (long stems and explanations push the options off-screen on a phone).
  useEffect(() => {
    onScrollTop?.();
    setQuitArmed(false);
  }, [i]);

  // Android hardware/gesture Back goes through the same quit path instead of closing the app.
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => { quit(); return true; });
    return () => sub.remove();
  });

  // exam timer
  useEffect(() => {
    if (!exam) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [exam]);
  useEffect(() => {
    if (exam && now >= deadline) finish();
  }, [now]);

  const choose = (v) => {
    if (shown) return;
    let next;
    if (multi) next = chosen.includes(v) ? chosen.filter((x) => x !== v) : [...chosen, v];
    else next = [v];
    setAnswers({ ...answers, [i]: next });
  };
  const check = () => {
    if (chosen.length !== q.a.length) return;
    setRevealed({ ...revealed, [i]: true });
    onRecord(q, same(chosen, q.a));
  };
  const go = (n) => setI((x) => Math.max(0, Math.min(list.length - 1, x + n)));
  const primary = () => (!exam && !shown ? check() : last ? finish() : go(1));

  // keyboard shortcuts on web
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const h = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = L.indexOf(e.key.toUpperCase());
      if (e.key.length === 1 && k >= 0 && k < it.order.length) choose(it.order[k]);
      else if (e.key === 'Enter') primary();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else return;
      e.preventDefault();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  });

  const answered = Object.values(answers).filter((a) => a.length).length;
  const correct = list.filter((x, k) => revealed[k] && same(answers[k] || [], x.q.a)).length;
  const left = deadline - now;

  return (
    <View style={{ gap: 16 }}>
      <View style={{ gap: 6 }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <T style={{ fontFamily: mono }}>Question {i + 1}/{list.length}</T>
          <T muted style={{ fontFamily: mono, fontSize: 13 }}>
            {exam ? (
              <>
                <Text style={{ color: left < 5 * 60e3 ? c.bad : c.muted }}>{fmt(left)}</Text> · {answered} answered
              </>
            ) : (
              `${Object.keys(revealed).length} done · ${correct} correct`
            )}
          </T>
        </Row>
        <Bar value={((i + 1) / list.length) * 100} />
      </View>

      <Panel>
        <Row style={{ justifyContent: 'space-between' }}>
          <Row>
            <DomainTag d={q.d} label={`D${q.d} · ${DOMAINS[q.d]}`} />
            {!exam && q.t && <T muted style={{ fontFamily: mono, fontSize: 12 }}>{TAGS[q.t] || CATEGORIES[q.t] || q.t}</T>}
          </Row>
          {exam && <Chip icon={flags[i] ? 'flag' : 'flag-outline'} label={flags[i] ? 'Flagged' : 'Flag for review'} on={!!flags[i]} onPress={() => setFlags({ ...flags, [i]: !flags[i] })} />}
        </Row>
        <T style={{ fontSize: 17, lineHeight: 25, fontWeight: '500' }}>{q.q}</T>
        {multi && <Text style={{ color: c.warn, fontWeight: '700', fontSize: 13 }}>Select {q.a.length} answers</Text>}
        <View style={{ gap: 8 }}>
          {it.order.map((oi, k) => {
            const sel = chosen.includes(oi);
            let border = sel ? c.accent : c.line;
            let bg = sel ? c.accentSoft : c.surface;
            if (shown && q.a.includes(oi)) (border = c.ok), (bg = c.okSoft);
            else if (shown && sel) (border = c.bad), (bg = c.badSoft);
            return (
              <Pressable
                key={oi}
                accessibilityRole={multi ? 'checkbox' : 'radio'}
                accessibilityState={{ checked: sel, disabled: !!shown }}
                onPress={() => choose(oi)}
                style={({ pressed }) => [
                  { flexDirection: 'row', gap: 12, borderWidth: 1, borderRadius: 8, padding: 12, minHeight: TOUCH, borderColor: border, backgroundColor: bg },
                  !shown && pressed && !sel ? { backgroundColor: c.accentSoft, borderColor: c.accent } : null,
                  c.sheetShadow,
                ]}
              >
                <Text style={{ fontFamily: mono, fontWeight: '700', color: c.muted, lineHeight: 22 }}>{L[k]}</Text>
                <T style={{ flex: 1 }}>{q.o[oi]}</T>
              </Pressable>
            );
          })}
        </View>
        {shown && (
          <View style={{ borderLeftWidth: 3, borderLeftColor: ok ? c.ok : c.bad, backgroundColor: ok ? c.okSoft : c.badSoft, padding: 12, gap: 4 }}>
            <T style={{ fontWeight: '700' }}>
              {ok ? 'Correct' : `Not quite. Answer: ${q.a.map((a) => L[it.order.indexOf(a)]).sort().join(', ')}`}
            </T>
            <T>{q.e}</T>
          </View>
        )}
      </Panel>

      <Row style={{ justifyContent: 'space-between' }}>
        <Button title="Back" disabled={i === 0} onPress={() => go(-1)} />
        <Row>
          <Button title={quitArmed ? 'Tap again to quit' : 'Quit'} onPress={quit} style={quitArmed ? { borderColor: c.bad } : null} />
          <Button
            primary
            title={!exam && !shown ? 'Check' : last ? 'See results' : 'Next'}
            disabled={!exam && !shown && chosen.length !== q.a.length}
            onPress={primary}
          />
        </Row>
      </Row>

      {exam && (
        <Panel>
          <Row>
            {list.map((_, k) => (
              <Pressable key={k} onPress={() => setI(k)} accessibilityRole="button"
                accessibilityLabel={`Question ${k + 1}${(answers[k] || []).length ? ', answered' : ', not answered'}${flags[k] ? ', flagged' : ''}`}
                style={{ minWidth: 48, minHeight: 40, paddingHorizontal: 8, borderRadius: 99, borderWidth: 1, alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'row', gap: 3,
                  borderColor: k === i ? c.accent : flags[k] ? c.warn : c.line, backgroundColor: k === i ? c.accentSoft : c.surface,
                  opacity: (answers[k] || []).length ? 1 : 0.55 }}>
                {flags[k] && <Icon name="flag" size={11} color={c.warn} />}
                <Text style={{ fontFamily: mono, color: c.fg, fontSize: 13 }}>{k + 1}</Text>
              </Pressable>
            ))}
          </Row>
        </Panel>
      )}
    </View>
  );
}
