import { useGame } from '@/contexts/GameContext';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

  // Hold-to-reveal state
  // On web, always reveal to avoid long-press UX issues
  const isWeb = Platform.OS === 'web';
  const [revealed, setRevealed] = useState(true);

  // Fade-in animation for prompt text
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    // Each time prompt changes, fade it in
    if (!isWeb) {
      setRevealed(false);
    }
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      if (!isWeb) setRevealed(true);
    });
  }, [currentPrompt]);

  const handleNextPrompt = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const hasMore = getNextPrompt();
    if (!hasMore) {
      router.push('/end');
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
          {/* Progress bar */}
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${Math.min(100, (promptsUsedCount / Math.max(1, totalPrompts)) * 100)}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {promptsUsedCount} / {totalPrompts}
          </Text>
        </View>

        <View style={styles.promptCard}>
          {/* Reveal overlay */}
          {!isWeb && !revealed && (
            <TouchableOpacity
              activeOpacity={0.8}
              onLongPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                setRevealed(true);
              }}
              style={styles.revealOverlay}
            >
              <Text style={styles.revealText}>Press & Hold to Reveal</Text>
            </TouchableOpacity>
          )}

          <Animated.Text style={[styles.promptText, { opacity: fadeAnim }]}>
            {currentPrompt}
          </Animated.Text>
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
  progressBarBackground: {
    width: '60%',
    height: 6,
    borderRadius: 999,
    backgroundColor: '#1F2937',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6366F1',
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
  revealOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(17,24,39,0.9)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  revealText: {
    color: '#E5E7EB',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
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
