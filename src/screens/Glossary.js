import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { SERVICES, CATEGORIES } from '../data';
import { useTheme, mono } from '../theme';
import { T, BackLink } from '../ui';

export default function Glossary({ onBack }) {
  const c = useTheme();
  const [term, setTerm] = useState('');
  const t = term.trim().toLowerCase();
  const hit = (s) => !t || `${s.n} ${s.s} ${s.k}`.toLowerCase().includes(t);
  const cats = Object.keys(CATEGORIES)
    .map((k) => ({ k, items: SERVICES.filter((s) => s.c === k && hit(s)) }))
    .filter((x) => x.items.length);

  return (
    <View style={{ gap: 16 }}>
      <BackLink onPress={onBack} />
      <Text accessibilityRole="header" style={{ color: c.fg, fontSize: 28, fontWeight: '800' }}>Service glossary</Text>
      <T muted>{SERVICES.length} services that show up on the exam, grouped by category. Green text = the keywords questions usually use.</T>
      <TextInput
        value={term}
        onChangeText={setTerm}
        placeholder="Search: queue, NoSQL, DDoS, SFTP…"
        placeholderTextColor={c.muted}
        autoCapitalize="none"
        autoCorrect={false}
        accessibilityLabel="Search services"
        clearButtonMode="while-editing"
        returnKeyType="search"
        style={{ borderWidth: 1, borderColor: c.line, borderRadius: 8, padding: 12, minHeight: 48, color: c.fg, backgroundColor: c.surface, fontSize: 15 }}
      />
      {cats.length === 0 && <T muted>No matching services.</T>}
      {cats.map((x) => (
        <View key={x.k} style={{ gap: 8 }}>
          <Text accessibilityRole="header" aria-level={2} style={{ color: c.fg, fontSize: 19, fontWeight: '700', marginTop: 6 }}>{CATEGORIES[x.k]}</Text>
          {x.items.map((s) => (
            <View key={s.n} style={{ borderWidth: 1, borderColor: c.line, borderRadius: 8, padding: 12, gap: 3, backgroundColor: c.surface }}>
              <T style={{ fontWeight: '700' }}>{s.n}</T>
              <Text style={{ color: c.accent, fontFamily: mono, fontSize: 12 }}>{s.k}</Text>
              <T muted style={{ fontSize: 14 }}>{s.s}</T>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
