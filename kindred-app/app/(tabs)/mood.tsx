import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const moods = [
  { emoji: '😔', label: 'Really hard', value: 1 },
  { emoji: '😕', label: 'Struggling', value: 2 },
  { emoji: '😐', label: 'Okay', value: 3 },
  { emoji: '🙂', label: 'Better', value: 4 },
  { emoji: '😊', label: 'Good', value: 5 },
];

const weekData = [
  { day: 'M', value: 1 },
  { day: 'T', value: 2 },
  { day: 'W', value: 3 },
  { day: 'T', value: 2 },
  { day: 'F', value: 3 },
  { day: 'S', value: 4 },
  { day: 'S', value: 4 },
];

const insights = [
  "Your mood is 38% better than your first week 💙",
  "You've logged 7 days straight — that takes courage.",
  "The hardest part is already behind you.",
  "Kira noticed you're having more good moments.",
];

export default function MoodScreen() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  const saveMood = (value: number) => {
    setSelectedMood(value);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const maxValue = Math.max(...weekData.map(d => d.value));

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>KINDRED</Text>
        <Text style={styles.title}>Your Healing</Text>
        <Text style={styles.subtitle}>You're further than you feel.</Text>
      </View>

      {/* Today's Mood */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>HOW ARE YOU FEELING TODAY?</Text>
        <View style={styles.moodRow}>
          {moods.map((mood) => (
            <TouchableOpacity
              key={mood.value}
              style={[styles.moodBtn, selectedMood === mood.value && styles.moodBtnSelected]}
              onPress={() => saveMood(mood.value)}>
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text style={styles.moodLabel}>{mood.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {saved && (
          <Text style={styles.savedText}>✓ Mood logged for today</Text>
        )}
      </View>

      {/* Weekly Chart */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>THIS WEEK</Text>
        <View style={styles.chart}>
          {weekData.map((d, i) => (
            <View key={i} style={styles.barWrap}>
              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${(d.value / maxValue) * 100}%`,
                      backgroundColor: i === weekData.length - 1 ? '#C9877A' : '#F2E8E1',
                    }
                  ]}
                />
              </View>
              <Text style={styles.barDay}>{d.day}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.chartNote}>Mood trending upward ↑</Text>
      </View>

      {/* Insight Card */}
      <View style={styles.insightCard}>
        <Text style={styles.insightTitle}>✨ Kira noticed something</Text>
        <Text style={styles.insightText}>{insights[0]}</Text>
      </View>

      {/* Streak */}
      <View style={styles.streakCard}>
        <View>
          <Text style={styles.streakLabel}>NO CONTACT STREAK</Text>
          <Text style={styles.streakNum}>7</Text>
          <Text style={styles.streakDays}>days strong 🔥</Text>
        </View>
        <View style={styles.streakRight}>
          <Text style={styles.streakPercent}>23%</Text>
          <Text style={styles.streakGoal}>to 30 days</Text>
        </View>
      </View>

      {/* Milestones */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>MILESTONES</Text>
        <View style={styles.milestones}>
          <View style={[styles.milestone, styles.milestoneComplete]}>
            <Text style={styles.milestoneEmoji}>✓</Text>
            <Text style={styles.milestoneText}>1 day</Text>
          </View>
          <View style={[styles.milestone, styles.milestoneComplete]}>
            <Text style={styles.milestoneEmoji}>✓</Text>
            <Text style={styles.milestoneText}>3 days</Text>
          </View>
          <View style={[styles.milestone, styles.milestoneComplete]}>
            <Text style={styles.milestoneEmoji}>✓</Text>
            <Text style={styles.milestoneText}>7 days</Text>
          </View>
          <View style={styles.milestone}>
            <Text style={styles.milestoneEmoji}>○</Text>
            <Text style={styles.milestoneText}>14 days</Text>
          </View>
          <View style={styles.milestone}>
            <Text style={styles.milestoneEmoji}>○</Text>
            <Text style={styles.milestoneText}>30 days</Text>
          </View>
        </View>
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
  subtitle: { fontSize: 13, color: '#ADA8A4' },
  card: {
    backgroundColor: 'white', borderRadius: 20, padding: 20, gap: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  cardLabel: {
    fontSize: 9, letterSpacing: 3,
    color: '#ADA8A4', textTransform: 'uppercase',
  },
  moodRow: { flexDirection: 'row', justifyContent: 'space-between' },
  moodBtn: {
    alignItems: 'center', gap: 4, padding: 8,
    borderRadius: 12, flex: 1,
  },
  moodBtnSelected: { backgroundColor: '#F2E8E1' },
  moodEmoji: { fontSize: 28 },
  moodLabel: { fontSize: 9, color: '#ADA8A4', textAlign: 'center' },
  savedText: { fontSize: 12, color: '#7A9E8A', textAlign: 'center' },
  chart: {
    flexDirection: 'row', alignItems: 'flex-end',
    gap: 8, height: 80,
  },
  barWrap: { flex: 1, alignItems: 'center', gap: 4, height: '100%' },
  barContainer: {
    flex: 1, width: '100%',
    justifyContent: 'flex-end',
  },
  bar: { width: '100%', borderRadius: 4, minHeight: 4 },
  barDay: { fontSize: 10, color: '#ADA8A4' },
  chartNote: { fontSize: 11, color: '#7A9E8A' },
  insightCard: {
    backgroundColor: '#F2E8E1', borderRadius: 20, padding: 20, gap: 8,
  },
  insightTitle: { fontSize: 13, fontWeight: '500', color: '#C9877A' },
  insightText: { fontSize: 14, color: '#6B6460', lineHeight: 22 },
  streakCard: {
    backgroundColor: '#2C2825', borderRadius: 20, padding: 20,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  streakLabel: { fontSize: 9, letterSpacing: 2, color: 'rgba(255,255,255,0.4)', marginBottom: 6 },
  streakNum: { fontSize: 48, color: 'white', fontWeight: '200', lineHeight: 52 },
  streakDays: { fontSize: 12, color: 'rgba(255,255,255,0.5)' },
  streakRight: { alignItems: 'center', gap: 4 },
  streakPercent: { fontSize: 28, color: 'white', fontWeight: '200' },
  streakGoal: { fontSize: 11, color: 'rgba(255,255,255,0.4)' },
  milestones: { flexDirection: 'row', justifyContent: 'space-between' },
  milestone: { alignItems: 'center', gap: 4 },
  milestoneComplete: {},
  milestoneEmoji: { fontSize: 18, color: '#7A9E8A' },
  milestoneText: { fontSize: 10, color: '#ADA8A4' },
});