import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      if (session) {
        const { data } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', session.user.id)
          .single();
        setHasProfile(!!data);
      }
      setLoading(false);
    });

    supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session) {
        const { data } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', session.user.id)
          .single();
        setHasProfile(!!data);
      } else {
        setHasProfile(null);
      }
    });
  }, []);

  if (loading) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!session ? (
        <Stack.Screen name="login" />
      ) : !hasProfile ? (
        <Stack.Screen name="onboarding" />
      ) : (
        <Stack.Screen name="(tabs)" />
      )}
    </Stack>
  );
}
