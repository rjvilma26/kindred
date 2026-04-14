import { useState } from 'react';
import { router } from 'expo-router';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const steps = [
  { id: 1, title: "You found us. 🤍", subtitle: "Kindred is a safe place to heal. No judgment. No pressure. Just support." },
  { id: 2, title: "What's your name?", subtitle: "Just your first name — this is your private space." },
  { id: 3, title: "What happened?", subtitle: "You don't have to explain everything. Just tell us what you're going through." },
  { id: 4, title: "Set your goal.", subtitle: "How many days no contact do you want to achieve?" },
  { id: 5, title: "Kira is ready. 💙", subtitle: "Your AI companion is here 24/7. You're not alone anymore." },
];

const goals = [
  { label: '7 days', value: 7 },
  { label: '14 days', value: 14 },
  { label: '30 days', value: 30 },
  { label: '60 days', value: 60 },
  { label: '90 days', value: 90 },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState('');
  const [story, setStory] = useState('');
  const [goal, setGoal] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setDone(true);
    }
  };

  const canProceed = () => {
    if (currentStep === 1) return name.trim().length > 0;
    if (currentStep === 2) return story.trim().length > 0;
    if (currentStep === 3) return goal !== null;
    return true;
  };

  if (done) {
    return (
      <View style={styles.doneContainer}>
        <Text style={styles.doneHeart}>🤍</Text>
        <Text style={styles.doneLogo}>KINDRED</Text>
        <Text style={styles.doneTitle}>Welcome, {name}.</Text>
        <Text style={styles.doneText}>
          Your journey starts now. Kira is waiting for you. You've already taken the hardest step — asking for support.
        </Text>
        <View style={styles.doneGoal}>
          <Text style={styles.doneGoalLabel}>YOUR GOAL</Text>
          <Text style={styles.doneGoalNum}>{goal}</Text>
          <Text style={styles.doneGoalDays}>days no contact</Text>
        </View>
        <TouchableOpacity style={styles.startBtn} onPress={() => router.replace('/(tabs)')}>>
          <Text style={styles.startBtnText}>Start healing →</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const step = steps[currentStep];

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>

      {/* Progress */}
      <View style={styles.progressRow}>
        {steps.map((_, i) => (
          <View
            key={i}
            style={[styles.progressDot, i <= currentStep && styles.progressDotActive]}
          />
        ))}
      </View>

      {/* Step Content */}
      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>{step.title}</Text>
        <Text style={styles.stepSubtitle}>{step.subtitle}</Text>
      </View>

      {/* Step 0 — Welcome */}
      {currentStep === 0 && (
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>
            Whether you just went through a breakup, a divorce, or the end of something that mattered — you deserve support. Kindred was built for exactly this moment.
          </Text>
          <Text style={styles.welcomeFeatures}>
            💬 Kira — your AI companion{'\n'}
            🤝 Circle — anonymous community{'\n'}
            📓 Journal — private reflection{'\n'}
            🆘 SOS — panic button for hard moments{'\n'}
            📈 Healing — track your progress
          </Text>
        </View>
      )}

      {/* Step 1 — Name */}
      {currentStep === 1 && (
        <View style={styles.inputCard}>
          <TextInput
            style={styles.nameInput}
            value={name}
            onChangeText={setName}
            placeholder="Your first name..."
            placeholderTextColor="#ADA8A4"
            autoFocus
          />
        </View>
      )}

      {/* Step 2 — Story */}
      {currentStep === 2 && (
        <View style={styles.inputCard}>
          <TextInput
            style={styles.storyInput}
            value={story}
            onChangeText={setStory}
            placeholder="I just went through..."
            placeholderTextColor="#ADA8A4"
            multiline
            textAlignVertical="top"
            autoFocus
          />
        </View>
      )}

      {/* Step 3 — Goal */}
      {currentStep === 3 && (
        <View style={styles.goalsGrid}>
          {goals.map((g) => (
            <TouchableOpacity
              key={g.value}
              style={[styles.goalBtn, goal === g.value && styles.goalBtnSelected]}
              onPress={() => setGoal(g.value)}>
              <Text style={[styles.goalNum, goal === g.value && styles.goalNumSelected]}>
                {g.value}
              </Text>
              <Text style={[styles.goalLabel, goal === g.value && styles.goalLabelSelected]}>
                days
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Step 4 — Ready */}
      {currentStep === 4 && (
        <View style={styles.readyCard}>
          <View style={styles.kiraPreview}>
            <View style={styles.kiraAvatar}>
              <Text style={styles.kiraAvatarText}>K</Text>
            </View>
            <View style={styles.kiraBubble}>
              <Text style={styles.kiraBubbleText}>
                Hey {name} 💙 I've been waiting for you. Whatever you're carrying right now — you don't have to carry it alone anymore. I'm here.
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Next Button */}
      <TouchableOpacity
        style={[styles.nextBtn, !canProceed() && styles.nextBtnDisabled]}
        onPress={nextStep}
        disabled={!canProceed()}>
        <Text style={styles.nextBtnText}>
          {currentStep === steps.length - 1 ? "Begin healing →" : "Continue →"}
        </Text>
      </TouchableOpacity>

      {currentStep === 0 && (
        <Text style={styles.privacy}>🔒 Everything is private. We never share your data.</Text>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#FAF8F5' },
  container: { padding: 24, gap: 24, paddingBottom: 60, paddingTop: 60 },
  progressRow: { flexDirection: 'row', gap: 8, justifyContent: 'center' },
  progressDot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: '#E8E4E0',
  },
  progressDotActive: { backgroundColor: '#C9877A', width: 24 },
  stepContent: { gap: 8, alignItems: 'center', textAlign: 'center' },
  stepTitle: {
    fontSize: 28, color: '#2C2825',
    fontWeight: '300', textAlign: 'center',
  },
  stepSubtitle: {
    fontSize: 14, color: '#6B6460',
    lineHeight: 22, textAlign: 'center',
  },
  welcomeCard: {
    backgroundColor: 'white', borderRadius: 20, padding: 24, gap: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  welcomeText: { fontSize: 14, color: '#6B6460', lineHeight: 22 },
  welcomeFeatures: { fontSize: 14, color: '#2C2825', lineHeight: 28 },
  inputCard: {
    backgroundColor: 'white', borderRadius: 20, padding: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  nameInput: {
    fontSize: 24, color: '#2C2825',
    fontWeight: '300', textAlign: 'center',
    padding: 16,
  },
  storyInput: {
    fontSize: 15, color: '#2C2825',
    lineHeight: 24, minHeight: 150, padding: 8,
  },
  goalsGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    gap: 12, justifyContent: 'center',
  },
  goalBtn: {
    width: 100, height: 100, borderRadius: 20,
    backgroundColor: 'white', alignItems: 'center',
    justifyContent: 'center', gap: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  goalBtnSelected: { backgroundColor: '#2C2825' },
  goalNum: { fontSize: 32, color: '#2C2825', fontWeight: '200' },
  goalNumSelected: { color: 'white' },
  goalLabel: { fontSize: 12, color: '#ADA8A4' },
  goalLabelSelected: { color: 'rgba(255,255,255,0.5)' },
  readyCard: {
    backgroundColor: 'white', borderRadius: 20, padding: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  kiraPreview: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  kiraAvatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#C9877A', alignItems: 'center', justifyContent: 'center',
  },
  kiraAvatarText: { color: 'white', fontSize: 18, fontWeight: '300' },
  kiraBubble: {
    flex: 1, backgroundColor: '#F2E8E1',
    borderRadius: 16, borderTopLeftRadius: 4, padding: 14,
  },
  kiraBubbleText: { fontSize: 14, color: '#2C2825', lineHeight: 22 },
  nextBtn: {
    backgroundColor: '#C9877A', borderRadius: 16,
    padding: 18, alignItems: 'center',
  },
  nextBtnDisabled: { backgroundColor: '#E8E4E0' },
  nextBtnText: { color: 'white', fontSize: 16, fontWeight: '500' },
  privacy: { fontSize: 12, color: '#ADA8A4', textAlign: 'center' },
  doneContainer: {
    flex: 1, backgroundColor: '#2C2825',
    alignItems: 'center', justifyContent: 'center',
    padding: 40, gap: 16,
  },
  doneHeart: { fontSize: 48 },
  doneLogo: {
    fontSize: 24, letterSpacing: 8,
    color: 'white', fontWeight: '300',
  },
  doneTitle: { fontSize: 28, color: 'white', fontWeight: '300' },
  doneText: {
    fontSize: 14, color: 'rgba(255,255,255,0.6)',
    lineHeight: 22, textAlign: 'center',
  },
  doneGoal: { alignItems: 'center', gap: 4, marginTop: 8 },
  doneGoalLabel: { fontSize: 9, letterSpacing: 3, color: 'rgba(255,255,255,0.4)' },
  doneGoalNum: { fontSize: 64, color: 'white', fontWeight: '200', lineHeight: 68 },
  doneGoalDays: { fontSize: 14, color: 'rgba(255,255,255,0.5)' },
  startBtn: {
    backgroundColor: '#C9877A', borderRadius: 16,
    padding: 18, paddingHorizontal: 40, marginTop: 8,
  },
  startBtnText: { color: 'white', fontSize: 16, fontWeight: '500' },
});