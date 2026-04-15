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

const circleResponses = [
  { id: 1, name: 'Moonwalker', emoji: '🌙', response: "I'm here with you 💙" },
  { id: 2, name: 'Quietstorm', emoji: '🌱', response: "You're not alone. Sending love 🤍" },
  { id: 3, name: 'Risingup', emoji: '🔥', response: "I got you. Breathe. We're here." },
];

export default function PanicScreen() {
  const [step, setStep] = useState(0);
  const [unsentText, setUnsentText] = useState('');
  const [showUnsent, setShowUnsent] = useState(false);
  const [affirmIndex, setAffirmIndex] = useState(0);
  const [breathActive, setBreathActive] = useState(false);
  const [alertSent, setAlertSent] = useState(false);
  const [showCircleMode, setShowCircleMode] = useState(false);

  const nextAffirmation = () => {
    setAffirmIndex((prev) => (prev + 1) % affirmations.length);
  };

  const alertCircle = () => {
    setAlertSent(true);
    setShowCircleMode(true);
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

      {/* Two Path Options */}
      <View style={styles.pathRow}>
        <TouchableOpacity
          style={[styles.pathBtn, !showCircleMode && styles.pathBtnActive]}
          onPress={() => setShowCircleMode(false)}>
          <Text style={styles.pathIcon}>🔒</Text>
          <Text style={[styles.pathLabel, !showCircleMode && styles.pathLabelActive]}>
            Private SOS
          </Text>
          <Text style={styles.pathSub}>Just me & Kira</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.pathBtn, showCircleMode && styles.pathBtnActive]}
          onPress={() => setShowCircleMode(true)}>
          <Text style={styles.pathIcon}>🤝</Text>
          <Text style={[styles.pathLabel, showCircleMode && styles.pathLabelActive]}>
            Alert My Circle
          </Text>
          <Text style={styles.pathSub}>Get human support</Text>
        </TouchableOpacity>
      </View>

      {/* CIRCLE MODE */}
      {showCircleMode && (
        <View style={styles.circleMode}>
          {!alertSent ? (
            <View style={styles.alertCard}>
              <Text style={styles.alertTitle}>🤝 Alert Your Circle</Text>
              <Text style={styles.alertText}>
                An anonymous message will be sent to your Circle letting them know someone needs support right now. No name. No details. Just a call for presence.
              </Text>
              <View style={styles.previewBubble}>
                <Text style={styles.previewText}>
                  💙 Someone in your Circle needs support right now. Can you show up for them?
                </Text>
              </View>
              <TouchableOpacity style={styles.alertBtn} onPress={alertCircle}>
                <Text style={styles.alertBtnText}>Send anonymous alert →</Text>
              </TouchableOpacity>
              <Text style={styles.alertPrivacy}>🔒 Your identity is never revealed</Text>
            </View>
          ) : (
            <View style={styles.responseCard}>
              <Text style={styles.responseTitle}>💙 Your Circle showed up</Text>
              <Text style={styles.responseSub}>3 people are here for you right now</Text>
              {circleResponses.map((r) => (
                <View key={r.id} style={styles.responseRow}>
                  <View style={styles.responseAvatar}>
                    <Text style={styles.responseEmoji}>{r.emoji}</Text>
                  </View>
                  <View style={styles.responseBubble}>
                    <Text style={styles.responseName}>{r.name}</Text>
                    <Text style={styles.responseText}>{r.response}</Text>
                  </View>
                </View>
              ))}
              <Text style={styles.responseNote}>
                You are not alone. Your Circle is with you. 💙
              </Text>
            </View>
          )}
        </View>
      )}

      {/* PRIVATE SOS MODE */}
      {!showCircleMode && (
        <View>
          {/* Warning Card */}
          <View style={styles.warningCard}>
            <Text style={styles.warningTitle}>Wait — just 60 seconds.</Text>
            <Text style={styles.warningText}>
              Texting them won't make the pain stop. It will reset your progress and make tomorrow harder. You've worked too hard to break now.
            </Text>
          </View>

          {/* Breathing */}
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
              onPress={() => { setBreathActive(!breathActive); setStep(0); }}>
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
              <TouchableOpacity style={styles.unsentBtn} onPress={() => setShowUnsent(true)}>
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

          {/* Crisis Resources */}
          <View style={styles.crisisCard}>
            <Text style={styles.crisisTitle}>🆘 Need more support?</Text>
            <Text style={styles.crisisText}>
              If you're feeling overwhelmed or unsafe, real humans are available 24/7.
            </Text>
            <Text style={styles.crisisLine}>Crisis Text Line — text HOME to 741741</Text>
            <Text style={styles.crisisLine}>National Suicide Prevention — call 988</Text>
          </View>

        </View>
      )}

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
  pathRow: { flexDirection: 'row', gap: 12 },
  pathBtn: {
    flex: 1, backgroundColor: 'white', borderRadius: 16,
    padding: 16, alignItems: 'center', gap: 4,
    borderWidth: 2, borderColor: 'transparent',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  pathBtnActive: { borderColor: '#C9877A', backgroundColor: '#FDF5F3' },
  pathIcon: { fontSize: 24, marginBottom: 4 },
  pathLabel: { fontSize: 13, fontWeight: '500', color: '#ADA8A4' },
  pathLabelActive: { color: '#C9877A' },
  pathSub: { fontSize: 10, color: '#ADA8A4', textAlign: 'center' },
  circleMode: { gap: 16 },
  alertCard: {
    backgroundColor: 'white', borderRadius: 20, padding: 24, gap: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  alertTitle: { fontSize: 18, fontWeight: '500', color: '#2C2825' },
  alertText: { fontSize: 14, color: '#6B6460', lineHeight: 22 },
  previewBubble: {
    backgroundColor: '#F2E8E1', borderRadius: 16, padding: 16,
  },
  previewText: { fontSize: 14, color: '#2C2825', lineHeight: 22, fontStyle: 'italic' },
  alertBtn: {
    backgroundColor: '#C9877A', borderRadius: 16,
    padding: 16, alignItems: 'center',
  },
  alertBtnText: { color: 'white', fontSize: 15, fontWeight: '500' },
  alertPrivacy: { fontSize: 11, color: '#ADA8A4', textAlign: 'center' },
  responseCard: {
    backgroundColor: 'white', borderRadius: 20, padding: 24, gap: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  responseTitle: { fontSize: 18, fontWeight: '500', color: '#2C2825' },
  responseSub: { fontSize: 13, color: '#ADA8A4' },
  responseRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  responseAvatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#F2E8E1', alignItems: 'center', justifyContent: 'center',
  },
  responseEmoji: { fontSize: 18 },
  responseBubble: {
    flex: 1, backgroundColor: '#FAF8F5',
    borderRadius: 12, padding: 12, gap: 2,
  },
  responseName: { fontSize: 11, color: '#ADA8A4', fontWeight: '500' },
  responseText: { fontSize: 14, color: '#2C2825', lineHeight: 20 },
  responseNote: { fontSize: 13, color: '#7A9E8A', textAlign: 'center', fontStyle: 'italic' },
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
  crisisCard: {
    backgroundColor: '#FDF5F3', borderRadius: 20, padding: 20, gap: 8,
    borderWidth: 1, borderColor: '#F2E8E1',
  },
  crisisTitle: { fontSize: 14, fontWeight: '500', color: '#C9877A' },
  crisisText: { fontSize: 13, color: '#6B6460', lineHeight: 20 },
  crisisLine: { fontSize: 13, color: '#2C2825', fontWeight: '500' },
});