import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heart}>🤍</Text>
      <Text style={styles.logo}>KINDRED</Text>
      <View style={styles.line} />
      <Text style={styles.tagline}>
        You don't have to heal alone
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2825',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  heart: {
    fontSize: 48,
  },
  logo: {
    fontSize: 42,
    letterSpacing: 10,
    color: 'white',
    fontWeight: '300',
  },
  line: {
    width: 40,
    height: 1,
    backgroundColor: '#D4A090',
    opacity: 0.6,
  },
  tagline: {
    fontSize: 11,
    letterSpacing: 3,
    color: '#ADA8A4',
    textTransform: 'uppercase',
  },
});