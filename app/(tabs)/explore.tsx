import { useGame } from '@/contexts/GameContext';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const VIBES = [
  { key: 'chill', label: '😌 Chill', emoji: '😌' },
  { key: 'chaotic', label: '🤪 Chaotic', emoji: '🤪' },
  { key: 'toxic', label: '😈 Toxic Fun', emoji: '😈' },
  { key: 'family', label: '👨‍👩‍👧 Family', emoji: '👨‍👩‍👧' },
  { key: 'nsfw', label: '🔞 NSFW 18+', emoji: '🔞' },
] as const;

export default function VibeSelectionScreen() {
  const router = useRouter();
  const { selectVibe } = useGame();

  const handleSelectVibe = (vibeKey: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    if (vibeKey === 'nsfw') {
      Alert.alert(
        'NSFW Content',
        'This mode is for adults only. Are you over 18?',
        [
          { text: 'No', style: 'cancel' },
          {
            text: 'Yes',
            style: 'default',
            onPress: () => {
              selectVibe(vibeKey as any);
              router.push('/game');
            },
          },
        ]
      );
      return;
    }

    selectVibe(vibeKey as any);
    router.push('/game');
  };

  return (
    <View style={styles.container}>
      <View style={styles.centerContainer}>
        <Text style={styles.title}>Choose Your Vibe</Text>
        <Text style={styles.subtitle}>
          Pick how wild you want the game to be.
        </Text>

        <View style={styles.vibeList}>
          {VIBES.map((vibe) => (
            <TouchableOpacity
              key={vibe.key}
              style={[
                styles.vibeButton,
                vibe.key === 'nsfw' ? styles.vibeButtonNSFW : null,
              ]}
              onPress={() => handleSelectVibe(vibe.key)}
            >
              <Text style={styles.vibeButtonText}>{vibe.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={() => router.back()}
        >
          <Text style={styles.secondaryButtonText}>Back</Text>
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
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#A3A3A3',
    textAlign: 'center',
    marginBottom: 32,
  },
  vibeList: {
    width: '100%',
    marginTop: 16,
  },
  vibeButton: {
    backgroundColor: '#111827',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#1F2937',
  },
  vibeButtonNSFW: {
    borderColor: '#F87171',
    backgroundColor: '#1F1111',
  },
  vibeButtonText: {
    color: '#E5E7EB',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#4B5563',
    marginTop: 24,
  },
  secondaryButtonText: {
    color: '#E5E7EB',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
