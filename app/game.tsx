import { useGame } from '@/contexts/GameContext';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function GameScreen() {
  const router = useRouter();
  const { 
    currentPrompt, 
    selectedVibe, 
    getNextPrompt, 
    resetGame, 
    changeVibe,
    promptsUsedCount,
    totalPrompts 
  } = useGame();

  // Load first prompt when screen loads
  useEffect(() => {
    if (!currentPrompt && selectedVibe) {
      getNextPrompt();
    }
  }, []);

  const handleNextPrompt = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const hasMore = getNextPrompt();
    if (!hasMore) {
      // Game ended - show end screen
      Alert.alert(
        'Out of Prompts!',
        `You've used all ${totalPrompts} prompts for this vibe.`,
        [
          {
            text: 'Change Vibe',
            onPress: () => {
              changeVibe();
              router.push('/(tabs)/explore');
            },
          },
          {
            text: 'Restart',
            onPress: () => {
              resetGame();
              router.push('/(tabs)');
            },
          },
        ]
      );
    }
  };

  const handleChangeVibe = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    changeVibe();
    router.push('/(tabs)/explore');
  };

  if (!currentPrompt) {
    return (
      <View style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.title}>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.gameContainer}>
        <View style={styles.headerSection}>
          <Text style={styles.vibeLabel}>
            {selectedVibe ? selectedVibe.toUpperCase() : ''}
          </Text>
          <Text style={styles.progressText}>
            {promptsUsedCount} / {totalPrompts}
          </Text>
        </View>

        <View style={styles.promptCard}>
          <Text style={styles.promptText}>{currentPrompt}</Text>
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={handleNextPrompt}
          >
            <Text style={styles.primaryButtonText}>Next Prompt</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={handleChangeVibe}
          >
            <Text style={styles.secondaryButtonText}>Change Vibe</Text>
          </TouchableOpacity>
        </View>
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
  gameContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  headerSection: {
    alignItems: 'center',
    gap: 8,
  },
  vibeLabel: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 3,
  },
  progressText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '500',
  },
  promptCard: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: '#111827',
    borderWidth: 2,
    borderColor: '#1F2937',
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  promptText: {
    color: '#F9FAFB',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 44,
    letterSpacing: 0.5,
  },
  buttonSection: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 999,
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
  secondaryButton: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  secondaryButtonText: {
    color: '#E5E7EB',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
});
