import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { C, FONT } from './theme';

export function Txt({ children, size = 13, color = C.navy, weight = 'regular', style, align, ...props }) {
  const chosen = FONT[weight] || FONT.regular;
  return <Text {...props} style={[{ fontFamily: chosen, fontSize: size, color, lineHeight: Math.round(size * 1.48), textAlign: align }, style]}>{children}</Text>;
}

export function Heading({ children, style, size = 24 }) {
  return <Txt size={size} weight="extrabold" style={[{ lineHeight: size * 1.19, letterSpacing: -0.8 }, style]}>{children}</Txt>;
}

export function AppButton({ label, icon, secondary = false, disabled = false, onPress, style }) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.button, secondary && styles.buttonSecondary, disabled && styles.buttonDisabled, pressed && !disabled && { opacity: 0.86 }, style]}
    >
      {icon && <Ionicons name={icon} size={17} color={secondary ? C.navy : '#FFF'} style={{ marginRight: 8 }} />}
      <Txt weight="bold" size={13} color={disabled ? C.muted : secondary ? C.navy : '#FFF'}>{label}</Txt>
    </Pressable>
  );
}

export function Field({ label, value, onChangeText, icon = 'person-outline', secure = false, keyboardType, placeholder, error, editable = true, autoCapitalize = 'none', textContentType }) {
  const [visible, setVisible] = useState(false);
  return (
    <View style={{ marginBottom: 12 }}>
      <Txt weight="bold" size={11} style={{ marginBottom: 5 }}>{label}</Txt>
      <View style={[styles.inputLine, error && { borderColor: C.red, backgroundColor: '#FFF7F6' }]}>
        <Ionicons name={icon} size={17} color={error ? C.red : C.navy} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#99A6B9"
          editable={editable}
          secureTextEntry={secure && !visible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          textContentType={textContentType}
          autoCorrect={false}
        />
        {secure && (
          <Pressable accessibilityLabel={visible ? 'Hide password' : 'Show password'} onPress={() => setVisible((v) => !v)}>
            <Ionicons name={visible ? 'eye-off-outline' : 'eye-outline'} color={C.navy} size={18} />
          </Pressable>
        )}
      </View>
      {error ? <Txt size={11} color={C.red} style={{ marginTop: 4 }}>{error}</Txt> : null}
    </View>
  );
}

export function Note({ children, kind = 'neutral', icon }) {
  const bg = kind === 'error' ? C.redSoft : kind === 'success' ? C.greenSoft : C.pale;
  const fg = kind === 'error' ? C.red : kind === 'success' ? C.green : C.navy;
  return (
    <View style={[styles.note, { backgroundColor: bg, borderColor: kind === 'neutral' ? '#E8EDF6' : bg }]}>
      {icon ? <Ionicons name={icon} size={16} color={fg} style={{ marginRight: 9 }} /> : null}
      <View style={{ flex: 1 }}><Txt size={11} color={fg}>{children}</Txt></View>
    </View>
  );
}

export function Header({ title, onBack, onMenu }) {
  return (
    <View style={styles.header}>
      <Pressable onPress={onBack} accessibilityLabel="Go back" style={styles.headerIcon}><Ionicons name="chevron-back" size={19} color={C.navy} /></Pressable>
      <Txt size={14} weight="extrabold" style={{ flex: 1 }} align="center">{title}</Txt>
      <Pressable onPress={onMenu || (() => Alert.alert('Driving Ustaad', 'Use the bottom navigation after signing in.'))} accessibilityLabel="Open menu" style={styles.headerIcon}><Ionicons name="menu-outline" size={21} color={C.navy} /></Pressable>
    </View>
  );
}

export function Screen({ children, header, onBack, footer, scroll = true, contentStyle }) {
  const main = <View style={[{ flexGrow: 1, paddingHorizontal: 20, paddingBottom: footer ? 14 : 30 }, contentStyle]}>{children}</View>;
  return (
    <View style={{ flex: 1, backgroundColor: '#FFF', width: '100%' }}>
      {header ? <Header title={header} onBack={onBack} /> : null}
      {scroll ? <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>{main}</ScrollView> : main}
      {footer}
    </View>
  );
}

export function Pill({ label, active, onPress, style }) {
  return (
    <Pressable onPress={onPress} style={[styles.pill, active && { backgroundColor: C.navy }, style]}>
      <Txt size={11} weight="bold" color={active ? '#FFF' : C.navy}>{label}</Txt>
    </Pressable>
  );
}

export function SectionLabel({ children }) {
  return <Txt size={10} weight="extrabold" color={C.orange} style={{ letterSpacing: 2, marginBottom: 10 }}>{children}</Txt>;
}

export function Logo({ style }) {
  return <Image source={require('../assets/driving-ustaad-logo.png')} resizeMode="contain" style={[{ width: 235, height: 145, alignSelf: 'center' }, style]} />;
}

export function BottomTabs({ current, onSelect }) {
  const tabs = [
    ['Home', 'home-outline'], ['Learn', 'book-outline'], ['Explore', 'compass-outline'], ['Progress', 'stats-chart-outline'], ['Profile', 'person-outline'],
  ];
  return (
    <View style={styles.tabBar}>
      {tabs.map(([label, icon]) => (
        <Pressable key={label} accessibilityRole="tab" accessibilityState={{ selected: current === label }} onPress={() => onSelect(label)} style={styles.tab}>
          <Ionicons name={icon} color={current === label ? C.orange : C.navy} size={20} />
          <Txt size={10} weight={current === label ? 'bold' : 'regular'} color={current === label ? C.orange : C.navy}>{label}</Txt>
          {current === label ? <View style={styles.tabIndicator} /> : null}
        </Pressable>
      ))}
    </View>
  );
}

export function ActionLink({ children, onPress, style }) {
  return <Pressable onPress={onPress} style={[{ alignSelf: 'center', padding: 9 }, style]}><Txt weight="bold" size={12} style={{ textDecorationLine: 'underline' }}>{children}</Txt></Pressable>;
}

export function IconCard({ icon, title, subtitle, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.iconCard}>
      <View style={{ width: 37, height: 37, borderRadius: 11, backgroundColor: C.pale, alignItems: 'center', justifyContent: 'center' }}><Ionicons name={icon} size={20} color={C.navy} /></View>
      <View style={{ flex: 1, marginLeft: 10 }}><Txt weight="bold" size={12}>{title}</Txt><Txt size={10} color={C.muted}>{subtitle}</Txt></View>
      <Ionicons name="chevron-forward" size={17} color={C.muted}/>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: 48, paddingHorizontal: 15, borderRadius: 23, flexDirection: 'row', backgroundColor: C.orange, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  buttonSecondary: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#B8D0F5' },
  buttonDisabled: { backgroundColor: '#E6EAF1', borderColor: '#E6EAF1' },
  inputLine: { borderWidth: 1, borderColor: C.border, borderRadius: 13, minHeight: 47, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, backgroundColor: '#FFF', gap: 9 },
  input: { flex: 1, paddingVertical: 10, color: C.navy, fontFamily: FONT.regular, fontSize: 13 },
  note: { borderRadius: 13, borderWidth: 1, padding: 13, flexDirection: 'row', alignItems: 'center', marginVertical: 7 },
  header: { height: 62, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF' },
  headerIcon: { width: 35, height: 35, alignItems: 'center', justifyContent: 'center' },
  pill: { flex: 1, backgroundColor: C.pale, minHeight: 38, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  tabBar: { borderTopColor: C.border, borderTopWidth: 1, borderTopLeftRadius: 22, borderTopRightRadius: 22, flexDirection: 'row', paddingTop: 8, paddingBottom: 8, backgroundColor: '#FFF', justifyContent: 'space-around' },
  tab: { alignItems: 'center', justifyContent: 'center', minHeight: 45, flex: 1, gap: 3 },
  tabIndicator: { position: 'absolute', height: 3, width: 18, backgroundColor: C.orange, top: -8, borderBottomLeftRadius: 3, borderBottomRightRadius: 3 },
  iconCard: { minHeight: 61, borderBottomWidth: 1, borderBottomColor: C.border, flexDirection: 'row', alignItems: 'center' },
});
