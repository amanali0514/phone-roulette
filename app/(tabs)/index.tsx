import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.centerContainer}>
        <Text style={styles.title}>Phone Roulette</Text>
        <Text style={styles.subtitle}>
          Pass the phone around and follow the prompt.
        </Text>
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => router.push('/(tabs)/explore')}
        >
          <Text style={styles.primaryButtonText}>Start Game</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050816',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 18,
    color: '#A3A3A3',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  primaryButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 999,
    marginTop: 12,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
});
