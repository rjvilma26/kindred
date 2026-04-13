import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: 'rgba(0,0,0,0.05)',
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#C9877A',
        tabBarInactiveTintColor: '#ADA8A4',
        tabBarLabelStyle: {
          fontSize: 10,
          letterSpacing: 0.5,
        },
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: () => <Text style={{fontSize:20}}>🏠</Text>,
        }}
      />

      <Tabs.Screen
        name="kira"
        options={{
          title: 'Kira',
          tabBarIcon: () => <Text style={{fontSize:20}}>💬</Text>,
        }}
      />

      <Tabs.Screen
        name="journal"
        options={{
          title: 'Journal',
          tabBarIcon: () => <Text style={{fontSize:20}}>📓</Text>,
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Circle',
          tabBarIcon: () => <Text style={{fontSize:20}}>🤝</Text>,
        }}
      />

    </Tabs>
  );
}