import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { supabase } from '../../lib/supabase';

const prompts = [
  "What's one thing you're feeling right now that you haven't said out loud?",
  "What do you miss most — and is it them, or how they made you feel?",
  "What would you tell yourself 6 months from now about this moment?",
  "What's one thing this relationship taught you about yourself?",
  "What does moving forward look like for you — not today, but eventually?",
  "Write the text you want to send — but won't.",
  "What part of yourself did you lose in this relationship? How do you get it back?",
  "What are three things you're grateful for today, even in the pain?",
];

export default function JournalScreen() {
  const [entry, setEntry] = useState('');
  const [saved, setSaved] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const [saving, setSaving] = useState(false);

  const saveEntry = async () => {
    if (!entry.trim()) return;
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase.from('journal_entries').insert({
        user_id: user.id,
        prompt: prompts[promptIndex],
        content: entry,
      });
      if (error) {
        Alert.alert('Error', 'Could not save entry. Please try again.');
      } else {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    }
    setSaving(false);
  };

  const nextPrompt = () => {
    setPromptIndex((prev) => (prev + 1) % prompts.length);
    setEntry('');
    setSaved(false);
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>KINDRED</Text>
        <Text style={styles.title}>Your Journal</Text>
        <Text style={styles.subtitle}>🔒 Private. Safe. Just for you.</Text>
      </View>

      <View style={styles.promptCard}>
        <Text style={styles.promptLabel}>TODAY'S PROMPT</Text>
        <Text style={styles.promptText}>{prompts[promptIndex]}</Text>
        <TouchableOpacity onPress={nextPrompt} style={styles.newPromptBtn}>
          <Text style={styles.newPromptText}>Different prompt →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.entryContainer}>
        <TextInput
          style={styles.entryInput}
          value={entry}
          onChangeText={setEntry}
          placeholder="Start writing... this is just for you."
          placeholderTextColor="#ADA8A4"
          multiline
          textAlignVertical="top"
        />
      </View>

      <TouchableOpacity
        style={[styles.saveBtn, saved && styles.savedBtn]}
        onPress={saveEntry}
        disabled={saving}
      >
        <Text style={styles.saveBtnText}>
          {saving ? 'Saving...' : saved ? '✓ Saved to your journal' : 'Save Entry'}
        </Text>
      </TouchableOpacity>

      <View style={styles.unsentCard}>
        <Text style={styles.unsentTitle}>💌 Unsent Message</Text>
        <Text style={styles.unsentSub}>
          Write what you wish you could say — you never have to send it.
        </Text>
        <TouchableOpacity style={styles.unsentBtn}>
          <Text style={styles.unsentBtnText}>Write unsent message</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#FAF8F5' },
  container: { padding: 24, gap: 20, paddingBottom: 40 },
  header: { marginTop: 20, marginBottom: 8 },
  logo: { fontSize: 12, letterSpacing: 4, color: '#ADA8A4', marginBottom: 8 },
  title: { fontSize: 28, color: '#2C2825', fontWeight: '300', marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#ADA8A4' },
  promptCard: { backgroundColor: '#2C2825', borderRadius: 20, padding: 24, gap: 12 },
  promptLabel: { fontSize: 9, letterSpacing: 3, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' },
  promptText: { fontSize: 16, color: 'white', fontWeight: '300', lineHeight: 24, fontStyle: 'italic' },
  newPromptBtn: { alignSelf: 'flex-start' },
  newPromptText: { fontSize: 12, color: '#D4A090' },
  entryContainer: { backgroundColor: 'white', borderRadius: 20, padding: 20, minHeight: 200, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
  entryInput: { fontSize: 15, color: '#2C2825', lineHeight: 24, minHeight: 180 },
  saveBtn: { backgroundColor: '#C9877A', borderRadius: 16, padding: 16, alignItems: 'center' },
  savedBtn: { backgroundColor: '#7A9E8A' },
  saveBtnText: { color: 'white', fontSize: 15, fontWeight: '500', letterSpacing: 1 },
  unsentCard: { backgroundColor: '#F2E8E1', borderRadius: 20, padding: 20, gap: 8 },
  unsentTitle: { fontSize: 15, fontWeight: '500', color: '#2C2825' },
  unsentSub: { fontSize: 13, color: '#6B6460', lineHeight: 20 },
  unsentBtn: { backgroundColor: 'white', borderRadius: 12, padding: 12, alignItems: 'center', marginTop: 4 },
  unsentBtnText: { fontSize: 13, color: '#C9877A', fontWeight: '500' },
});