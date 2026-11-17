import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { DOMAINS } from '../data';
import { TABLES } from '../data/compare';
import { useTheme, mono } from '../theme';
import { T, Chip, Row, DomainTag, BackLink, Icon } from '../ui';

const COL_W = 170; // first column a bit wider via flex below; table scrolls sideways on phones

function Table({ t }) {
  const c = useTheme();
  const cell = (txt, k, head) => (
    <View key={k} style={{ width: k === 0 ? COL_W + 20 : COL_W, padding: 8, borderRightWidth: 1, borderColor: c.line,
      backgroundColor: head ? c.accentSoft : k === 0 ? c.bg : c.surface }}>
      <Text style={{ color: c.fg, fontSize: 13, lineHeight: 18, fontWeight: head || k === 0 ? '700' : '400' }}>{txt}</Text>
    </View>
  );
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator style={{ borderWidth: 1, borderColor: c.line, borderRadius: 8 }}>
      <View>
        <View style={{ flexDirection: 'row' }}>{t.columns.map((h, k) => cell(h, k, true))}</View>
        {t.rows.map((r, i) => (
          <View key={i} style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: c.line }}>{r.map((x, k) => cell(x, k))}</View>
        ))}
      </View>
    </ScrollView>
  );
}

export default function Compare({ onBack }) {
  const c = useTheme();
  const [dom, setDom] = useState(3);
  const [open, setOpen] = useState(TABLES.find((t) => t.domain === 3)?.id);
  const list = TABLES.filter((t) => t.domain === dom);

  return (
    <View style={{ gap: 16 }}>
      <BackLink onPress={onBack} />
      <Text accessibilityRole="header" style={{ color: c.fg, fontSize: 28, fontWeight: '800' }}>Compare services</Text>
      <T muted>Side-by-side tables of the services the exam likes to swap. Tables scroll sideways on a phone. Read the traps under each table.</T>
      <Row>
        {[1, 2, 3, 4].map((d) => (
          <Chip key={d} label={`D${d} · ${DOMAINS[d]}`} right={TABLES.filter((t) => t.domain === d).length} on={dom === d}
            onPress={() => { setDom(d); setOpen(TABLES.find((t) => t.domain === d)?.id); }} />
        ))}
      </Row>
      {list.length === 0 && <T muted>No tables for this domain yet.</T>}
      {list.map((t) => {
        const on = open === t.id;
        return (
          <View key={t.id} style={[{ borderWidth: 1, borderColor: on ? c.accent : c.line, borderRadius: 10, backgroundColor: c.surface }, c.sheetShadow]}>
            <Pressable onPress={() => setOpen(on ? null : t.id)} accessibilityRole="button" accessibilityState={{ expanded: on }}
              style={({ pressed }) => ({ padding: 14, minHeight: 48, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8,
                borderRadius: 10, backgroundColor: pressed ? c.accentSoft : 'transparent' })}>
              <View style={{ flex: 1, gap: 4 }}>
                <DomainTag d={t.domain} label={`D${t.domain}`} />
                <Text style={{ color: c.fg, fontSize: 17, fontWeight: '700' }}>{t.title}</Text>
                <T muted style={{ fontSize: 13 }}>{t.rows.length} rows · {t.tips.length} traps</T>
              </View>
              <Icon name={on ? 'chevron-up' : 'chevron-down'} size={20} color={c.muted} />
            </Pressable>
            {on && (
              <View style={{ paddingHorizontal: 14, paddingBottom: 14, gap: 12 }}>
                <Table t={t} />
                <View style={{ gap: 6 }}>
                  <Text style={{ color: c.warn, fontFamily: mono, fontSize: 11, fontWeight: '700', letterSpacing: 1 }}>EXAM TRAPS</Text>
                  {t.tips.map((tip, i) => (
                    <View key={i} style={{ flexDirection: 'row', gap: 8 }}>
                      <Text style={{ color: c.warn, lineHeight: 21 }}>•</Text>
                      <T style={{ flex: 1, fontSize: 14, lineHeight: 21 }}>{tip}</T>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}
