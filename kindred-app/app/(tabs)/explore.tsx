import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

const posts = [
  { id: 1, name: 'Moonwalker', day: 8, color: '#C9877A', emoji: '🌙', text: 'Finally made it through a whole dinner without checking their Instagram. Small win but it felt huge.', hearts: 47, replies: 12 },
  { id: 2, name: 'Quietstorm', day: 23, color: '#7A9E8A', emoji: '🌱', text: 'Day 23. For anyone on day 1 right now — I promise it gets softer. You will be okay.', hearts: 203, replies: 58 },
  { id: 3, name: 'Risingup', day: 4, color: '#C9A96E', emoji: '🔥', text: 'Cried in my car for 20 minutes today. But then I got up, went inside and made myself dinner. That counts.', hearts: 89, replies: 24 },
  { id: 4, name: 'Starlite', day: 15, color: '#9B8EA8', emoji: '⭐', text: 'Deleted all our photos today. Took 3 hours. Cried through all of it. But it needed to happen.', hearts: 134, replies: 41 },
];

export default function CircleScreen() {
  const [liked, setLiked] = useState<number[]>([]);
  const [showPost, setShowPost] = useState(false);
  const [newPost, setNewPost] = useState('');

  const toggleLike = (id: number) => {
    setLiked(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>KINDRED</Text>
          <Text style={styles.title}>Your Circle</Text>
          <Text style={styles.subtitle}>Anonymous. Real. Always here.</Text>
        </View>

        {/* Stats Bar */}
        <View style={styles.statsBar}>
          <View style={styles.stat}>
            <Text style={styles.statNum}>2,847</Text>
            <Text style={styles.statLabel}>healing today</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNum}>847</Text>
            <Text style={styles.statLabel}>online now</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statNum}>∞</Text>
            <Text style={styles.statLabel}>not alone</Text>
          </View>
        </View>

        {/* Post Button */}
        <TouchableOpacity
          style={styles.postBtn}
          onPress={() => setShowPost(!showPost)}>
          <Text style={styles.postBtnText}>+ Share something</Text>
        </TouchableOpacity>

        {/* New Post Input */}
        {showPost && (
          <View style={styles.newPostCard}>
            <Text style={styles.newPostLabel}>You're posting anonymously 🔒</Text>
            <TextInput
              style={styles.newPostInput}
              value={newPost}
              onChangeText={setNewPost}
              placeholder="What's on your heart right now?"
              placeholderTextColor="#ADA8A4"
              multiline
            />
            <TouchableOpacity style={styles.submitBtn} onPress={() => { setShowPost(false); setNewPost(''); }}>
              <Text style={styles.submitBtnText}>Post anonymously</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Feed */}
        {posts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postTop}>
              <View style={[styles.avatar, { backgroundColor: post.color }]}>
                <Text style={styles.avatarEmoji}>{post.emoji}</Text>
              </View>
              <View>
                <Text style={styles.postName}>{post.name}</Text>
                <Text style={styles.postDay}>Day {post.day} of healing</Text>
              </View>
            </View>
            <Text style={styles.postText}>{post.text}</Text>
            <View style={styles.postActions}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => toggleLike(post.id)}>
                <Text style={styles.actionText}>
                  {liked.includes(post.id) ? '🤍' : '🤍'} {post.hearts + (liked.includes(post.id) ? 1 : 0)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionText}>💬 {post.replies}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF8F5' },
  scroll: { padding: 24, gap: 16, paddingBottom: 40 },
  header: { marginTop: 20, marginBottom: 8 },
  logo: { fontSize: 12, letterSpacing: 4, color: '#ADA8A4', marginBottom: 8 },
  title: { fontSize: 28, color: '#2C2825', fontWeight: '300', marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#ADA8A4' },
  statsBar: {
    backgroundColor: '#2C2825', borderRadius: 20,
    padding: 20, flexDirection: 'row',
    justifyContent: 'space-around', alignItems: 'center',
  },
  stat: { alignItems: 'center', gap: 4 },
  statNum: { fontSize: 22, color: 'white', fontWeight: '300' },
  statLabel: { fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: 1 },
  statDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.1)' },
  postBtn: {
    backgroundColor: '#F2E8E1', borderRadius: 16,
    padding: 16, alignItems: 'center',
  },
  postBtnText: { fontSize: 14, color: '#C9877A', fontWeight: '500' },
  newPostCard: {
    backgroundColor: 'white', borderRadius: 20,
    padding: 20, gap: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  newPostLabel: { fontSize: 11, color: '#ADA8A4', letterSpacing: 1 },
  newPostInput: {
    fontSize: 14, color: '#2C2825',
    lineHeight: 22, minHeight: 80,
  },
  submitBtn: {
    backgroundColor: '#C9877A', borderRadius: 12,
    padding: 12, alignItems: 'center',
  },
  submitBtnText: { color: 'white', fontSize: 13, fontWeight: '500' },
  postCard: {
    backgroundColor: 'white', borderRadius: 20,
    padding: 20, gap: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  postTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 16 },
  postName: { fontSize: 13, fontWeight: '500', color: '#2C2825' },
  postDay: { fontSize: 11, color: '#ADA8A4' },
  postText: { fontSize: 14, color: '#6B6460', lineHeight: 22 },
  postActions: { flexDirection: 'row', gap: 16 },
  actionBtn: { flexDirection: 'row', alignItems: 'center' },
  actionText: { fontSize: 13, color: '#ADA8A4' },
});