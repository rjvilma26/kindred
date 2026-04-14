import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../lib/supabase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  async function handleAuth() {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter your email and password');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        Alert.alert('Error', error.message);
      } else if (data.user) {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) {
          Alert.alert('Account created!', 'Please sign in with your new password.');
          setIsSignUp(false);
        } else {
          router.replace('/(tabs)');
        }
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        router.replace('/(tabs)');
      }
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>KINDRED</Text>
      <Text style={styles.title}>{isSignUp ? 'Create your account' : 'Welcome back'}</Text>
      <Text style={styles.subtitle}>🔒 Private. Safe. Just for you.</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password (min 6 characters)"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.btn} onPress={handleAuth} disabled={loading}>
        <Text style={styles.btnText}>{loading ? 'Please wait...' : isSignUp ? 'Sign up' : 'Sign in'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
        <Text style={styles.toggle}>
          {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a', justifyContent: 'center', padding: 32 },
  logo: { color: '#888', letterSpacing: 6, fontSize: 12, textAlign: 'center', marginBottom: 16 },
  title: { color: '#fff', fontSize: 28, fontWeight: '300', textAlign: 'center', marginBottom: 8 },
  subtitle: { color: '#888', fontSize: 14, textAlign: 'center', marginBottom: 40 },
  input: { backgroundColor: '#2a2a2a', color: '#fff', padding: 16, borderRadius: 12, marginBottom: 16, fontSize: 16 },
  btn: { backgroundColor: '#c17c6e', padding: 18, borderRadius: 16, alignItems: 'center', marginBottom: 16 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  toggle: { color: '#888', textAlign: 'center', fontSize: 14 },
});
