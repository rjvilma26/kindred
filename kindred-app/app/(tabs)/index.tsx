import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../../lib/supabase';

async function handleSignOut() {
  await supabase.auth.signOut();
  router.replace('/login');
}

export default function HomeScreen() {
  const [profile, setProfile] = useState(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (data) {
        setProfile(data);
        const start = new Date(data.no_contact_start);
        const today = new Date();
        const days = Math.floor((today - start) / (1000 * 60 * 60 * 24)) + 1;
        setStreak(days);
      }
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const percent = profile ? Math.round((streak / profile.goal_days) * 100) : 0;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>KINDRED</Text>
        <Text style={styles.greeting}>{getGreeting()} {profile?.name} 🤍</Text>
        <Text style={styles.day}>Day {streak} of your journey</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOut}>
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.streakCard}>
        <View>
          <Text style={styles.streakLabel}>NO CONTACT STREAK</Text>
          <Text style={styles.streakNum}>{streak}</Text>
          <Text style={styles.streakDays}>{streak === 1 ? 'day' : 'days'} strong</Text>
        </View>
        <View style={styles.streakRing}>
          <Text style={styles.streakPercent}>{percent}%</Text>
        </View>
      </View>

      <View style={styles.grid}>
        <TouchableOpacity style={[styles.card, styles.roseCard]} onPress={() => router.push('/(tabs)/kira')}>
          <Text style={styles.cardIcon}>💬</Text>
          <Text style={styles.cardTitle}>Talk to Kira</Text>
          <Text style={styles.cardSub}>She's here now</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.greenCard]} onPress={() => router.push('/(tabs)/explore')}>
          <Text style={styles.cardIcon}>🤝</Text>
          <Text style={styles.cardTitle}>Your Circle</Text>
          <Text style={styles.cardSub}>Community</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/(tabs)/journal')}>
          <Text style={styles.cardIcon}>📓</Text>
          <Text style={styles.cardTitle}>Journal</Text>
          <Text style={styles.cardSub}>Today's prompt</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/(tabs)/mood')}>
          <Text style={styles.cardIcon}>📈</Text>
          <Text style={styles.cardTitle}>Your Mood</Text>
          <Text style={styles.cardSub}>Track progress</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.kiraCard}>
        <Text style={styles.kiraName}>Kira 💙</Text>
        <Text style={styles.kiraMsg}>"Hey. I know today might be hard. I'm right here whenever you need to talk."</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#FAF8F5' },
  container: { padding: 24, gap: 16, paddingBottom: 40 },
  header: { marginBottom: 8, marginTop: 20 },
  logo: { fontSize: 12, letterSpacing: 4, color: '#ADA8A4', marginBottom: 8 },
  greeting: { fontSize: 28, color: '#2C2825', fontWeight: '300', marginBottom: 4 },
  day: { fontSize: 13, color: '#ADA8A4', letterSpacing: 1 },
  signOut: { marginTop: 8 },
  signOutText: { fontSize: 12, color: '#C9877A' },
  streakCard: { backgroundColor: '#2C2825', borderRadius: 20, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  streakLabel: { fontSize: 9, letterSpacing: 2, color: 'rgba(255,255,255,0.4)', marginBottom: 6 },
  streakNum: { fontSize: 48, color: 'white', fontWeight: '200', lineHeight: 52 },
  streakDays: { fontSize: 12, color: 'rgba(255,255,255,0.5)' },
  streakRing: { width: 64, height: 64, borderRadius: 32, borderWidth: 3, borderColor: 'rgba(255,255,255,0.15)', borderTopColor: '#D4A090', alignItems: 'center', justifyContent: 'center' },
  streakPercent: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: { backgroundColor: 'white', borderRadius: 16, padding: 16, width: '47%', gap: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
  roseCard: { backgroundColor: '#F2E8E1' },
  greenCard: { backgroundColor: '#EEF4F1' },
  cardIcon: { fontSize: 22, marginBottom: 4 },
  cardTitle: { fontSize: 13, fontWeight: '500', color: '#2C2825' },
  cardSub: { fontSize: 11, color: '#ADA8A4' },
  kiraCard: { backgroundColor: '#F2E8E1', borderRadius: 16, padding: 18, gap: 8 },
  kiraName: { fontSize: 12, fontWeight: '500', color: '#C9877A', letterSpacing: 1 },
  kiraMsg: { fontSize: 13, color: '#6B6460', lineHeight: 20, fontStyle: 'italic' },
});