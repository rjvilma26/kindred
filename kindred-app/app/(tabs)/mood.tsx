import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { supabase } from '../../lib/supabase';

const moods = [
  { emoji: '😔', label: 'Really hard', value: 1 },
  { emoji: '😕', label: 'Struggling', value: 2 },
  { emoji: '😐', label: 'Okay', value: 3 },
  { emoji: '🙂', label: 'Better', value: 4 },
  { emoji: '😊', label: 'Good', value: 5 },
];

const insights = [
  "Your mood is 38% better than your first week 💙",
  "You've logged 7 days straight — that takes courage.",
  "The hardest part is already behind you.",
  "Kira noticed you're having more good moments.",
];

export default function MoodScreen() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState(null);
  const [streak, setStreak] = useState(0);
  const [moodLogs, setMoodLogs] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (profileData) {
        setProfile(profileData);
        const start = new Date(profileData.no_contact_start);
        const today = new Date();
        const days = Math.floor((today - start) / (1000 * 60 * 60 * 24)) + 1;
        setStreak(days);
      }
      const { data: logs } = await supabase
        .from('mood_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(7);
      if (logs) setMoodLogs(logs);
    }
  };

  const saveMood = async (value) => {
    setSaving(true);
    setSelectedMood(value);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const mood = moods.find(m => m.value === value);
      await supabase.from('mood_logs').insert({
        user_id: user.id,
        mood: mood.label,
        note: mood.emoji,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      loadData();
    }
    setSaving(false);
  };

  const percent = profile ? Math.round((streak / profile.goal_days) * 100) : 0;
  const milestones = [1, 3, 7, 14, 30];

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>KINDRED</Text>
        <Text style={styles.title}>Your Healing</Text>
        <Text style={styles.subtitle}>You're further than you feel.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>HOW ARE YOU FEELING TODAY?</Text>
        <View style={styles.moodRow}>
          {moods.map((mood) => (
            <TouchableOpacity
              key={mood.value}
              style={[styles.moodBtn, selectedMood === mood.value && styles.moodBtnSelected]}
              onPress={() => saveMood(mood.value)}
              disabled={saving}>
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text style={styles.moodLabel}>{mood.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {saved && <Text style={styles.savedText}>✓ Mood logged for today</Text>}
      </View>

      {moodLogs.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardLabel}>RECENT MOODS</Text>
          <View style={styles.recentMoods}>
            {moodLogs.slice(0, 5).map((log, i) => (
              <View key={i} style={styles.recentMoodRow}>
                <Text style={styles.recentMoodEmoji}>{log.note}</Text>
                <Text style={styles.recentMoodLabel}>{log.mood}</Text>
                <Text style={styles.recentMoodDate}>
                  {new Date(log.created_at).toLocaleDateString()}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={styles.insightCard}>
        <Text style={styles.insightTitle}>✨ Kira noticed something</Text>
        <Text style={styles.insightText}>{insights[0]}</Text>
      </View>

      <View style={styles.streakCard}>
        <View>
          <Text style={styles.streakLabel}>NO CONTACT STREAK</Text>
          <Text style={styles.streakNum}>{streak}</Text>
          <Text style={styles.streakDays}>{streak === 1 ? 'day' : 'days'} strong 🔥</Text>
        </View>
        <View style={styles.streakRight}>
          <Text style={styles.streakPercent}>{percent}%</Text>
          <Text style={styles.streakGoal}>to {profile?.goal_days} days</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>MILESTONES</Text>
        <View style={styles.milestones}>
          {milestones.map((m) => (
            <View key={m} style={styles.milestone}>
              <Text style={styles.milestoneEmoji}>{streak >= m ? '✓' : '○'}</Text>
              <Text style={styles.milestoneText}>{m} days</Text>
            </View>
          ))}
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
  card: { backgroundColor: 'white', borderRadius: 20, padding: 20, gap: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
  cardLabel: { fontSize: 9, letterSpacing: 3, color: '#ADA8A4', textTransform: 'uppercase' },
  moodRow: { flexDirection: 'row', justifyContent: 'space-between' },
  moodBtn: { alignItems: 'center', gap: 4, padding: 8, borderRadius: 12, flex: 1 },
  moodBtnSelected: { backgroundColor: '#F2E8E1' },
  moodEmoji: { fontSize: 28 },
  moodLabel: { fontSize: 9, color: '#ADA8A4', textAlign: 'center' },
  savedText: { fontSize: 12, color: '#7A9E8A', textAlign: 'center' },
  recentMoods: { gap: 10 },
  recentMoodRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  recentMoodEmoji: { fontSize: 20 },
  recentMoodLabel: { flex: 1, fontSize: 13, color: '#2C2825' },
  recentMoodDate: { fontSize: 11, color: '#ADA8A4' },
  insightCard: { backgroundColor: '#F2E8E1', borderRadius: 20, padding: 20, gap: 8 },
  insightTitle: { fontSize: 13, fontWeight: '500', color: '#C9877A' },
  insightText: { fontSize: 14, color: '#6B6460', lineHeight: 22 },
  streakCard: { backgroundColor: '#2C2825', borderRadius: 20, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  streakLabel: { fontSize: 9, letterSpacing: 2, color: 'rgba(255,255,255,0.4)', marginBottom: 6 },
  streakNum: { fontSize: 48, color: 'white', fontWeight: '200', lineHeight: 52 },
  streakDays: { fontSize: 12, color: 'rgba(255,255,255,0.5)' },
  streakRight: { alignItems: 'center', gap: 4 },
  streakPercent: { fontSize: 28, color: 'white', fontWeight: '200' },
  streakGoal: { fontSize: 11, color: 'rgba(255,255,255,0.4)' },
  milestones: { flexDirection: 'row', justifyContent: 'space-between' },
  milestone: { alignItems: 'center', gap: 4 },
  milestoneEmoji: { fontSize: 18, color: '#7A9E8A' },
  milestoneText: { fontSize: 10, color: '#ADA8A4' },
});