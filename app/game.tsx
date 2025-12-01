import { useCallback, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PROMPTS } from "@/prompts";

const VIBES = [
  { key: "chill", label: "Chill" },
  { key: "chaotic", label: "Chaotic" },
  { key: "toxic", label: "Toxic Fun" },
  { key: "family", label: "Family" },
  { key: "nsfw", label: "NSFW 18+" },
];

export default function GameScreen() {
  const [stage, setStage] = useState("welcome");
  const [selectedVibe, setSelectedVibe] = useState(null);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [usedIndices, setUsedIndices] = useState([]);

  const resetGame = useCallback(() => {
    setSelectedVibe(null);
    setCurrentPrompt("");
    setUsedIndices([]);
    setStage("welcome");
  }, []);

  const goToVibeSelection = () => {
    setStage("vibe");
  };

  const pickNextPrompt = useCallback(
    (vibeKey) => {
      const promptsForVibe = PROMPTS[vibeKey] || [];
      const total = promptsForVibe.length;

      if (total === 0) {
        setCurrentPrompt("No prompts available for this vibe.");
        setStage("end");
        return;
      }

      if (usedIndices.length >= total) {
        setStage("end");
        return;
      }

      let candidateIndex = null;
      const usedSet = new Set(usedIndices);

      for (let i = 0; i < total; i++) {
        const randomIndex = Math.floor(Math.random() * total);
        if (!usedSet.has(randomIndex)) {
          candidateIndex = randomIndex;
          break;
        }
      }

      if (candidateIndex === null) {
        setStage("end");
        return;
      }

      setUsedIndices((prev) => [...prev, candidateIndex]);
      setCurrentPrompt(promptsForVibe[candidateIndex]);
      setStage("game");
    },
    [usedIndices]
  );

  const handleSelectVibe = (vibeKey) => {
    if (vibeKey === "nsfw") {
      Alert.alert(
        "NSFW Content",
        "This mode is for adults only. Are you over 18?",
        [
          { text: "No", style: "cancel" },
          {
            text: "Yes",
            style: "default",
            onPress: () => {
              setSelectedVibe(vibeKey);
              setUsedIndices([]);
              pickNextPrompt(vibeKey);
            },
          },
        ]
      );
      return;
    }

    setSelectedVibe(vibeKey);
    setUsedIndices([]);
    pickNextPrompt(vibeKey);
  };

  const handleNextPrompt = () => {
    if (!selectedVibe) return;
    pickNextPrompt(selectedVibe);
  };

  const handleChangeVibe = () => {
    setSelectedVibe(null);
    setUsedIndices([]);
    setCurrentPrompt("");
    setStage("vibe");
  };

  const renderWelcome = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.title}>Phone Game</Text>
      <Text style={styles.subtitle}>
        Pass the phone around and follow the prompt.
      </Text>
      <TouchableOpacity style={styles.primaryButton} onPress={goToVibeSelection}>
        <Text style={styles.primaryButtonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );

  const renderVibeSelection = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.title}>Choose the vibe</Text>
      <Text style={styles.subtitle}>
        Pick how wild you want the game to be.
      </Text>

      <View style={styles.vibeList}>
        {VIBES.map((vibe) => (
          <TouchableOpacity
            key={vibe.key}
            style={[
              styles.vibeButton,
              vibe.key === "nsfw" ? styles.vibeButtonNSFW : null,
            ]}
            onPress={() => handleSelectVibe(vibe.key)}
          >
            <Text style={styles.vibeButtonText}>{vibe.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.secondaryButton} onPress={resetGame}>
        <Text style={styles.secondaryButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );

  const renderGameScreen = () => (
    <View style={styles.gameContainer}>
      <Text style={styles.vibeLabel}>
        {selectedVibe ? selectedVibe.toUpperCase() : ""}
      </Text>
      <View style={styles.promptCard}>
        <Text style={styles.promptText}>{currentPrompt}</Text>
      </View>
      <TouchableOpacity style={styles.primaryButton} onPress={handleNextPrompt}>
        <Text style={styles.primaryButtonText}>Next</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={handleChangeVibe}>
        <Text style={styles.secondaryButtonText}>Change vibe</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEndScreen = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.title}>Out of prompts</Text>
      <Text style={styles.subtitle}>
        You have used all prompts for this vibe.
      </Text>

      <TouchableOpacity style={styles.primaryButton} onPress={handleChangeVibe}>
        <Text style={styles.primaryButtonText}>Change vibe</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={resetGame}>
        <Text style={styles.secondaryButtonText}>Restart</Text>
      </TouchableOpacity>
    </View>
  );

  let content = null;
  if (stage === "welcome") content = renderWelcome();
  else if (stage === "vibe") content = renderVibeSelection();
  else if (stage === "game") content = renderGameScreen();
  else if (stage === "end") content = renderEndScreen();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>{content}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#050816",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#A3A3A3",
    textAlign: "center",
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: "#6366F1",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 999,
    marginTop: 12,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  secondaryButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#4B5563",
    marginTop: 16,
  },
  secondaryButtonText: {
    color: "#E5E7EB",
    fontSize: 16,
    textAlign: "center",
  },
  vibeList: {
    width: "100%",
    marginTop: 16,
  },
  vibeButton: {
    backgroundColor: "#111827",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#1F2937",
  },
  vibeButtonNSFW: {
    borderColor: "#F97373",
  },
  vibeButtonText: {
    color: "#E5E7EB",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  gameContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 32,
  },
  vibeLabel: {
    color: "#9CA3AF",
    fontSize: 14,
    textAlign: "center",
    letterSpacing: 3,
  },
  promptCard: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#1F2937",
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 24,
  },
  promptText: {
    color: "#F9FAFB",
    fontSize: 22,
    textAlign: "center",
  },
});
