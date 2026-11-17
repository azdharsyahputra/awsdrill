import { useEffect, useRef, useState } from 'react';
import { BackHandler, ScrollView, useColorScheme, View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext, themes } from './src/theme';
import { buildList, loadStore, saveStore, record, same, emptyStore } from './src/logic';
import Home, { MODE_LABEL } from './src/screens/Home';
import Quiz from './src/screens/Quiz';
import Result from './src/screens/Result';
import Glossary from './src/screens/Glossary';
import Compare from './src/screens/Compare';

export default function App() {
  const scheme = useColorScheme();
  const c = themes[scheme === 'dark' ? 'dark' : 'light'];
  const [store, setStore] = useState(null);
  const [view, setView] = useState('home');
  const [session, setSession] = useState(null);
  const [result, setResult] = useState(null);
  const scroll = useRef(null);

  useEffect(() => { loadStore().then(setStore); }, []);
  // Android Back on Results / Compare / Glossary returns to the menu instead of closing the app.
  // (The quiz registers its own handler, which runs first.)
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (view === 'home') return false;
      show('home');
      return true;
    });
    return () => sub.remove();
  }, [view]);
  const update = (fn) => setStore((s) => { const n = fn(s); saveStore(n); return n; });
  const show = (v) => { setView(v); scroll.current?.scrollTo({ y: 0, animated: false }); };

  const start = (mode, opts) => {
    const list = buildList(mode, opts, store);
    if (!list.length) return;
    setSession({ mode, opts, list, deadline: Date.now() + 90 * 60 * 1000, key: Date.now() });
    show('quiz');
  };

  const finish = ({ answers, revealed }) => {
    const { mode, list } = session;
    const exam = mode === 'exam';
    const per = { 1: [0, 0], 2: [0, 0], 3: [0, 0], 4: [0, 0] };
    let right = 0, total = 0;
    const wrongs = [];
    let s = store;
    list.forEach(({ q }, k) => {
      if (!exam && !revealed[k]) return; // practice: only checked questions count
      const mine = answers[k] || [];
      const ok = same(mine, q.a);
      if (exam) s = record(s, q, ok); // practice already recorded on Check
      total++; per[q.d][1]++;
      if (ok) { right++; per[q.d][0]++; } else wrongs.push({ q, mine });
    });
    const label = MODE_LABEL[mode];
    if (total) s = { ...s, history: [...s.history, { score: Math.round((right / total) * 100), label, n: total, t: Date.now() }].slice(-30) };
    saveStore(s); setStore(s);
    setResult({ label, exam, per, right, total, wrongs });
    show('result');
  };

  let body;
  if (!store) body = <ActivityIndicator color={c.accent} style={{ marginTop: 40 }} />;
  else if (view === 'quiz') body = (
    <Quiz key={session.key} session={session}
      onRecord={(q, ok) => update((s) => record(s, q, ok))}
      onFinish={finish} onQuit={() => show('home')}
      onScrollTop={() => scroll.current?.scrollTo({ y: 0, animated: false })} />
  );
  else if (view === 'result') body = (
    <Result result={result} onHome={() => show('home')}
      onAgain={() => start(session.mode, session.opts)}
      onRetry={() => start('wrong', {})} />
  );
  else if (view === 'gloss') body = <Glossary onBack={() => show('home')} />;
  else if (view === 'compare') body = <Compare onBack={() => show('home')} />;
  else body = (
    <Home store={store} onStart={start} onGlossary={() => show('gloss')} onCompare={() => show('compare')}
      onReset={() => update(() => emptyStore())} />
  );

  return (
    <ThemeContext.Provider value={c}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }}>
          <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
          <ScrollView ref={scroll} keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 20 }}>
            <View style={{ width: '100%', maxWidth: view === 'compare' ? 1120 : 780, alignSelf: 'center' }}>{body}</View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemeContext.Provider>
  );
}
