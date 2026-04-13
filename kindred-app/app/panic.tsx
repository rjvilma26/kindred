import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

const breathSteps = [
  { label: 'Breathe in', duration: 4, color: '#C9877A' },
  { label: 'Hold', duration: 4, color: '#C9A96E' },
  { label: 'Breathe out', duration: 4, color: '#7A9E8A' },
];

const affirmations = [
  "You are stronger than this urge.",
  "Reaching out won't give you the closure you need.",
  "This feeling will pass. It always does.",
  "You've made it this far. Don't break now.",
  "Future you will be proud you didn't send it.",
];

export default function PanicScreen() {
  const [step, setStep] = useState(0);
  const [unsentText, setUnsentText] = useState('');
  const [showUnsent, setShowUnsent] = useState(false);
  const [affirmIndex, setAffirmIndex] = useState(0);
  const [breathActive, setBreathActive] = useState(false);

  const nextAffirmation = () => {
    setAffirmIndex((prev) => (prev + 1) % affirmations.length);
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>KINDRED</Text>
        <Text style={styles.title}>Panic Button 🆘</Text>
        <Text style={styles.subtitle}>
          You're about to text them. Stop. Breathe. Read this first.
        </Text>
      </View>

      {/* Warning Card */}
      <View style={styles.warningCard}>
        <Text style={styles.warningTitle}>Wait — just 60 seconds.</Text>
        <Text style={styles.warningText}>
          Texting them won't make the pain stop. It will reset your progress and make tomorrow harder. You've worked too hard to break now.
        </Text>
      </View>

      {/* Breathing Exercise */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>STEP 1 — BREATHE</Text>
        <View style={styles.breathCircle}>
          <Text style={styles.breathEmoji}>🫁</Text>
          <Text style={styles.breathText}>
            {breathActive ? breathSteps[step % 3].label : 'Tap to start'}
          </Text>
          <Text style={styles.breathSub}>
            {breathActive ? `${breathSteps[step % 3].duration} seconds` : '4-4-4 breathing'}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.breathBtn, breathActive && styles.breathBtnActive]}
          onPress={() => {
            setBreathActive(!breathActive);
            setStep(0);
          }}>
          <Text style={styles.breathBtnText}>
            {breathActive ? 'Stop' : 'Start breathing exercise'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Affirmation */}
      <View style={styles.affirmCard}>
        <Text style={styles.cardLabel}>STEP 2 — READ THIS</Text>
        <Text style={styles.affirmText}>"{affirmations[affirmIndex]}"</Text>
        <TouchableOpacity onPress={nextAffirmation}>
          <Text style={styles.nextAffirm}>Next →</Text>
        </TouchableOpacity>
      </View>

      {/* Unsent Message */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>STEP 3 — WRITE IT BUT DON'T SEND IT</Text>
        <Text style={styles.unsentSub}>
          Get it out of your system. Write everything you want to say — then close this and move on.
        </Text>
        {!showUnsent ? (
          <TouchableOpacity
            style={styles.unsentBtn}
            onPress={() => setShowUnsent(true)}>
            <Text style={styles.unsentBtnText}>Write the unsent message</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.unsentContainer}>
            <TextInput
              style={styles.unsentInput}
              value={unsentText}
              onChangeText={setUnsentText}
              placeholder="Say everything you wish you could say..."
              placeholderTextColor="#ADA8A4"
              multiline
              textAlignVertical="top"
            />
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => { setUnsentText(''); setShowUnsent(false); }}>
              <Text style={styles.deleteBtnText}>🗑 Delete & move on</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* You made it */}
      <View style={styles.madeItCard}>
        <Text style={styles.madeItTitle}>💙 You made it through.</Text>
        <Text style={styles.madeItText}>
          Every time you resist, you get stronger. Your streak is still intact. Be proud.
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#FAF8F5' },
  container: { padding: 24, gap: 16, paddingBottom: 40 },
  header: { marginTop: 20, marginBottom: 8 },
  logo: { fontSize: 12, letterSpacing: 4, color: '#ADA8A4', marginBottom: 8 },
  title: { fontSize: 28, color: '#2C2825', fontWeight: '300', marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#6B6460', lineHeight: 20 },
  warningCard: {
    backgroundColor: '#2C2825', borderRadius: 20, padding: 24, gap: 12,
  },
  warningTitle: { fontSize: 18, color: 'white', fontWeight: '400' },
  warningText: { fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 22 },
  card: {
    backgroundColor: 'white', borderRadius: 20, padding: 20, gap: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  cardLabel: { fontSize: 9, letterSpacing: 3, color: '#ADA8A4', textTransform: 'uppercase' },
  breathCircle: {
    alignItems: 'center', gap: 8,
    backgroundColor: '#FAF8F5', borderRadius: 100,
    padding: 32, alignSelf: 'center',
  },
  breathEmoji: { fontSize: 40 },
  breathText: { fontSize: 18, color: '#2C2825', fontWeight: '300' },
  breathSub: { fontSize: 12, color: '#ADA8A4' },
  breathBtn: {
    backgroundColor: '#F2E8E1', borderRadius: 16,
    padding: 14, alignItems: 'center',
  },
  breathBtnActive: { backgroundColor: '#2C2825' },
  breathBtnText: { fontSize: 14, color: '#C9877A', fontWeight: '500' },
  affirmCard: {
    backgroundColor: '#F2E8E1', borderRadius: 20, padding: 24, gap: 12,
  },
  affirmText: {
    fontSize: 18, color: '#2C2825', fontWeight: '300',
    lineHeight: 28, fontStyle: 'italic',
  },
  nextAffirm: { fontSize: 13, color: '#C9877A' },
  unsentSub: { fontSize: 13, color: '#6B6460', lineHeight: 20 },
  unsentBtn: {
    backgroundColor: '#F2E8E1', borderRadius: 16,
    padding: 14, alignItems: 'center',
  },
  unsentBtnText: { fontSize: 14, color: '#C9877A', fontWeight: '500' },
  unsentContainer: { gap: 12 },
  unsentInput: {
    fontSize: 14, color: '#2C2825', lineHeight: 22,
    minHeight: 120, backgroundColor: '#FAF8F5',
    borderRadius: 12, padding: 16,
  },
  deleteBtn: {
    backgroundColor: '#2C2825', borderRadius: 16,
    padding: 14, alignItems: 'center',
  },
  deleteBtnText: { fontSize: 14, color: 'white', fontWeight: '500' },
  madeItCard: {
    backgroundColor: '#EEF4F1', borderRadius: 20, padding: 20, gap: 8,
  },
  madeItTitle: { fontSize: 16, fontWeight: '500', color: '#2C2825' },
  madeItText: { fontSize: 14, color: '#6B6460', lineHeight: 22 },
});