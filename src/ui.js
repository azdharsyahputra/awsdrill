import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, mono, TOUCH } from './theme';

// A sheet on the Study Desk: Sheet White, 1px Ruled Line, 10px corners, soft ambient depth.
export function Panel({ children, style }) {
  const c = useTheme();
  return (
    <View style={[{ backgroundColor: c.surface, borderColor: c.line, borderWidth: 1, borderRadius: 10, padding: 16, gap: 12 }, c.sheetShadow, style]}>
      {children}
    </View>
  );
}

export function Eyebrow({ children }) {
  const c = useTheme();
  return <Text accessibilityRole="header" aria-level={2} style={{ fontFamily: mono, fontSize: 11, fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase', color: c.muted }}>{children}</Text>;
}

export function T({ style, muted, ...p }) {
  const c = useTheme();
  return <Text {...p} style={[{ color: muted ? c.muted : c.fg, fontSize: 15, lineHeight: 22 }, style]} />;
}

export function Icon({ name, size = 18, color }) {
  const c = useTheme();
  return <Ionicons name={name} size={size} color={color || c.fg} />;
}

// Primary: one per screen, the next step. Pressed state is a firmer fill, not just a fade.
export function Button({ title, onPress, primary, disabled, style, icon, accessibilityLabel }) {
  const c = useTheme();
  const ink = primary ? c.accentInk : c.fg;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityState={{ disabled: !!disabled }}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        {
          minHeight: TOUCH, paddingHorizontal: 16, borderRadius: 8, borderWidth: 1,
          flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
          borderColor: primary ? c.accent : pressed ? c.accent : c.line,
          backgroundColor: primary ? (pressed ? c.accentPressed : c.accent) : pressed ? c.accentSoft : c.surface,
          opacity: disabled ? 0.45 : 1,
        },
        style,
      ]}
    >
      {icon && <Icon name={icon} size={18} color={ink} />}
      <Text style={{ color: ink, fontWeight: primary ? '700' : '500', fontSize: 15 }}>{title}</Text>
    </Pressable>
  );
}

// Back to the menu: chevron + label, full touch target.
export function BackLink({ onPress, label = 'Back' }) {
  const c = useTheme();
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label} hitSlop={8}
      style={({ pressed }) => ({ alignSelf: 'flex-start', minHeight: 44, flexDirection: 'row', alignItems: 'center', gap: 2, marginLeft: -6, paddingRight: 8, opacity: pressed ? 0.6 : 1 })}>
      <Icon name="chevron-back" size={22} color={c.accent} />
      <Text style={{ color: c.accent, fontWeight: '700', fontSize: 16 }}>{label}</Text>
    </Pressable>
  );
}

export function Chip({ label, on, onPress, right, icon }) {
  const c = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: !!on }}
      onPress={onPress}
      hitSlop={4}
      style={({ pressed }) => ({
        minHeight: 40, paddingHorizontal: 14, borderRadius: 99, borderWidth: 1,
        borderColor: on || pressed ? c.accent : c.line, backgroundColor: on || pressed ? c.accentSoft : c.surface,
        flexDirection: 'row', alignItems: 'center', gap: 6,
      })}
    >
      {icon && <Icon name={icon} size={14} color={c.warn} />}
      <Text style={{ color: c.fg, fontSize: 13, fontWeight: on ? '700' : '400' }}>{label}</Text>
      {right != null && <Text style={{ color: c.muted, fontSize: 13, fontFamily: mono }}>{right}</Text>}
    </Pressable>
  );
}

export function Bar({ value, color }) {
  const c = useTheme();
  return (
    <View style={{ height: 6, backgroundColor: c.line, borderRadius: 99, overflow: 'hidden' }}>
      <View style={{ height: 6, width: `${Math.max(0, Math.min(100, value))}%`, backgroundColor: color || c.accent }} />
    </View>
  );
}

export function DomainTag({ d, label }) {
  const c = useTheme();
  return (
    <View style={{ borderWidth: 1, borderColor: c.d[d], borderRadius: 4, paddingHorizontal: 7, paddingVertical: 3, alignSelf: 'flex-start' }}>
      <Text style={{ color: c.d[d], fontFamily: mono, fontSize: 11, fontWeight: '600' }}>{label}</Text>
    </View>
  );
}

export const Row = ({ children, style }) => (
  <View style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center' }, style]}>{children}</View>
);
