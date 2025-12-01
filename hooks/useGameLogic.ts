/**
 * useGameLogic Hook
 * Custom React hook for managing all game state and logic
 */

import { useCallback, useState } from "react";
import { Vibe, GameState, GameStats, UseGameLogicReturn } from "../types/game";
import { getPromptsForVibe, getPromptCount } from "../data/prompts";
import {
  pickNextPrompt,
  resetUsedIndices,
  resetForNewVibe,
  getProgressPercentage,
  getRemainingPromptsCount,
} from "../utils/promptGenerator";

/**
 * Custom hook for managing game state and logic
 */
export const useGameLogic = (): UseGameLogicReturn => {
  // Game state
  const [stage, setStage] = useState<GameState["stage"]>("welcome");
  const [selectedVibe, setSelectedVibe] = useState<Vibe | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  const [currentPromptIndex, setCurrentPromptIndex] = useState<number>(-1);
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set());
  const [totalPromptsInVibe, setTotalPromptsInVibe] = useState<number>(0);

  // Derived state
  const promptsUsedCount = usedIndices.size;
  const progressPercentage = getProgressPercentage(
    promptsUsedCount,
    totalPromptsInVibe
  );
  const promptsRemaining = getRemainingPromptsCount(
    totalPromptsInVibe,
    promptsUsedCount
  );

  // Game state object
  const state: GameState = {
    stage,
    selectedVibe,
    currentPrompt,
    currentPromptIndex,
    usedIndices,
    totalPromptsInVibe,
    promptsUsedCount,
  };

  // Game statistics
  const stats: GameStats = {
    vibeSelected: selectedVibe || "chill",
    totalPromptsAvailable: totalPromptsInVibe,
    totalPromptsUsed: promptsUsedCount,
    progressPercentage,
    promptsRemaining,
  };

  /**
   * Start the game (go to vibe selection)
   */
  const startGame = useCallback(() => {
    setStage("vibe");
  }, []);

  /**
   * Select a vibe and load prompts
   */
  const selectVibe = useCallback((vibe: Vibe) => {
    setSelectedVibe(vibe);
    setTotalPromptsInVibe(getPromptCount(vibe));
    setUsedIndices(resetForNewVibe(vibe));
    setCurrentPrompt("");
    setCurrentPromptIndex(-1);
    // Don't move to game stage yet - let parent handle NSFW confirmation if needed
  }, []);

  /**
   * Confirm NSFW and load first prompt
   */
  const confirmNSFW = useCallback(() => {
    if (selectedVibe) {
      nextPrompt();
    }
  }, [selectedVibe]);

  /**
   * Cancel NSFW selection
   */
  const cancelNSFW = useCallback(() => {
    setSelectedVibe(null);
    setStage("vibe");
  }, []);

  /**
   * Pick and display next prompt
   */
  const nextPrompt = useCallback(() => {
    if (!selectedVibe) return;

    const result = pickNextPrompt(selectedVibe, usedIndices);

    if (result === null) {
      // All prompts used
      setStage("end");
      return;
    }

    // Add index to used set
    setUsedIndices((prev) => new Set([...prev, result.index]));
    setCurrentPrompt(result.prompt);
    setCurrentPromptIndex(result.index);
    setStage("game");
  }, [selectedVibe, usedIndices]);

  /**
   * Change vibe - go back to vibe selection
   */
  const changeVibe = useCallback(() => {
    setSelectedVibe(null);
    setCurrentPrompt("");
    setCurrentPromptIndex(-1);
    setUsedIndices(resetUsedIndices());
    setTotalPromptsInVibe(0);
    setStage("vibe");
  }, []);

  /**
   * Restart game - go back to welcome
   */
  const restartGame = useCallback(() => {
    setStage("welcome");
    setSelectedVibe(null);
    setCurrentPrompt("");
    setCurrentPromptIndex(-1);
    setUsedIndices(resetUsedIndices());
    setTotalPromptsInVibe(0);
  }, []);

  return {
    state,
    stats,
    actions: {
      startGame,
      selectVibe,
      nextPrompt,
      changeVibe,
      restartGame,
      confirmNSFW,
      cancelNSFW,
    },
  };
};

export default useGameLogic;
