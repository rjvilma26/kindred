import { useEffect, useState } from 'react';
import { Stack, router } from 'expo-router';
import { supabase } from '../lib/supabase';

export default function RootLayout() {
  const [session, setSession] = useState(null);
  const [hasProfile, setHasProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [navigated, setNavigated] = useState(false);

  const checkProfile = async (userId) => {
    const { data } = await supabase.from('profiles').select('id').eq('id', userId).maybeSingle();
    return !!data;
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      if (session) {
        const profile = await checkProfile(session.user.id);
        setHasProfile(profile);
      }
      setLoading(false);
    });

    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (_event === 'SIGNED_OUT') {
        setSession(null);
        setHasProfile(null);
        setNavigated(false);
        router.replace('/login');
      } else if (_event === 'SIGNED_IN' && session) {
        setSession(session);
        const profile = await checkProfile(session.user.id);
        if (!profile) {
          router.replace('/onboarding');
        } else {
          router.replace('/(tabs)');
        }
      }
    });
  }, []);

  useEffect(() => {
    if (loading || navigated) return;
    if (!session) {
      setNavigated(true);
      router.replace('/login');
    } else if (hasProfile === false) {
      setNavigated(true);
      router.replace('/onboarding');
    } else if (hasProfile === true) {
      setNavigated(true);
      router.replace('/(tabs)');
    }
  }, [session, hasProfile, loading]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}