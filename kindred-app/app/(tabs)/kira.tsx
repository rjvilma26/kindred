import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';

const CLAUDE_API_KEY = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;

const initialMessages = [
  { id: 1, from: 'kira', text: "Hey. I'm Kira 💙 I'm here for you — no judgment, no rush. Whenever you're ready, tell me what's going on." }
];

export default function KiraScreen() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { id: messages.length + 1, from: 'user', text: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 300,
          system: `You are Kira, a warm and caring AI companion inside the Kindred app — a heartbreak recovery app. You are like a best friend who truly listens. You are casual, warm, real and never robotic. You never give generic advice. You ask thoughtful follow up questions. You validate feelings without toxic positivity. You are available 24/7 and never judge. Keep responses SHORT — 2-3 sentences maximum. Always make the person feel heard first before offering any advice.

SAFETY PROTOCOL — This is critical:
If a user expresses any of the following:
- Not wanting to exist or be here anymore
- Self harm or hurting themselves
- Extreme hopelessness like "nothing matters" or "no point"
- Phrases like "I just want it to stop" or "I can't do this anymore"
- Not eating or sleeping for multiple days
- Feeling like a burden to others

DO NOT give generic advice like meditation or going for a walk.
FIRST say something like: "Hey — I hear you. Before anything else, are you okay? Like really okay?"
THEN if distress continues say: "I care about you and I want to make sure you're safe. Please reach out to the Crisis Text Line — just text HOME to 741741. They're real humans available 24/7 and it's completely free and confidential."
NEVER minimize. NEVER rush past the pain. A human life is more important than any advice.`,
          messages: updatedMessages
            .filter(m => m.from !== 'kira' || m.id !== 1)
            .map(m => ({
              role: m.from === 'user' ? 'user' : 'assistant',
              content: m.text
            }))
        })
      });

      const data = await response.json();
      const kiraReply = {
        id: updatedMessages.length + 1,
        from: 'kira',
        text: data.content[0].text
      };
      setMessages([...updatedMessages, kiraReply]);
    } catch (error) {
      const errorMsg = {
        id: updatedMessages.length + 1,
        from: 'kira',
        text: "I'm here. Sometimes connections get fuzzy — try sending that again 💙"
      };
      setMessages([...updatedMessages, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>K</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.kiraName}>Kira</Text>
          <View style={styles.kiraStatusRow}>
            <Text style={styles.kiraStatus}>● Always here</Text>
            <Text style={styles.kiraPrivacy}>🔒 Private & secure</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.messages} contentContainerStyle={{ padding: 20, gap: 12 }}>
        {messages.map((msg) => (
          <View key={msg.id} style={[styles.bubble, msg.from === 'user' ? styles.userBubble : styles.kiraBubble]}>
            <Text style={[styles.bubbleText, msg.from === 'user' ? styles.userText : styles.kiraText]}>
              {msg.text}
            </Text>
          </View>
        ))}
        {loading && (
          <View style={styles.kiraBubble}>
            <ActivityIndicator size="small" color="#C9877A" />
          </View>
        )}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Say anything..."
          placeholderTextColor="#ADA8A4"
          multiline
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage} disabled={loading}>
          <Text style={styles.sendText}>↑</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 20, paddingTop: 40,
    borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#C9877A', alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: 'white', fontSize: 18, fontWeight: '300' },
  kiraName: { fontSize: 15, fontWeight: '500', color: '#2C2825' },
  kiraStatusRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  kiraStatus: { fontSize: 11, color: '#7A9E8A' },
  kiraPrivacy: { fontSize: 9, color: '#ADA8A4', letterSpacing: 0.5 },
  messages: { flex: 1 },
  bubble: { maxWidth: '80%', padding: 12, borderRadius: 16, marginBottom: 4 },
  kiraBubble: {
    backgroundColor: '#F2E8E1', borderBottomLeftRadius: 4, alignSelf: 'flex-start',
  },
  userBubble: {
    backgroundColor: '#2C2825', borderBottomRightRadius: 4, alignSelf: 'flex-end',
  },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  kiraText: { color: '#2C2825' },
  userText: { color: 'white' },
  inputRow: {
    flexDirection: 'row', alignItems: 'flex-end', padding: 16, gap: 10,
    borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.05)',
  },
  input: {
    flex: 1, backgroundColor: '#FAF8F5', borderRadius: 24,
    paddingHorizontal: 16, paddingVertical: 10, fontSize: 14,
    color: '#2C2825', maxHeight: 100,
  },
  sendBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#C9877A', alignItems: 'center', justifyContent: 'center',
  },
  sendText: { color: 'white', fontSize: 16, fontWeight: '500' },
});