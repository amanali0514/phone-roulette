import { getAvailableVibes, getPromptsForVibe } from '@/data/prompts';
import React, { createContext, useCallback, useContext, useState } from 'react';

type Vibe = 'chill' | 'chaotic' | 'toxic' | 'family' | 'nsfw' | 'surprise';

interface GameContextType {
  selectedVibe: Vibe | null;
  currentPrompt: string;
  usedIndices: Set<number>;
  totalPrompts: number;
  includeNSFWInSurprise: boolean;
  selectVibe: (vibe: Vibe) => void;
  setIncludeNSFWInSurprise: (include: boolean) => void;
  getNextPrompt: () => boolean;
  resetGame: () => void;
  changeVibe: () => void;
  promptsUsedCount: number;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [selectedVibe, setSelectedVibe] = useState<Vibe | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set());
  const [totalPrompts, setTotalPrompts] = useState<number>(0);
  const [includeNSFWInSurprise, setIncludeNSFWInSurprise] = useState<boolean>(false);

  const selectVibe = useCallback((vibe: Vibe) => {
    setSelectedVibe(vibe);
    // Build prompts list. If surprise, mix all vibes.
    const prompts =
      vibe === 'surprise'
        ? getAvailableVibes()
            .flatMap((v) =>
              v === 'nsfw' && !includeNSFWInSurprise ? [] : getPromptsForVibe(v)
            )
        : getPromptsForVibe(vibe);
    setTotalPrompts(prompts.length);
    setUsedIndices(new Set());
    setCurrentPrompt('');
  }, [includeNSFWInSurprise]);

  const getNextPrompt = useCallback((): boolean => {
    if (!selectedVibe) return false;
    const prompts =
      selectedVibe === 'surprise'
        ? getAvailableVibes()
            .flatMap((v) =>
              v === 'nsfw' && !includeNSFWInSurprise ? [] : getPromptsForVibe(v)
            )
        : getPromptsForVibe(selectedVibe);
    const total = prompts.length;

    if (usedIndices.size >= total) {
      return false; // No more prompts
    }

    // Find an unused index
    let newIndex: number | null = null;
    const maxAttempts = total * 2;
    let attempts = 0;

    while (newIndex === null && attempts < maxAttempts) {
      const randomIndex = Math.floor(Math.random() * total);
      if (!usedIndices.has(randomIndex)) {
        newIndex = randomIndex;
      }
      attempts++;
    }

    if (newIndex === null) {
      return false;
    }

    setUsedIndices((prev) => new Set([...prev, newIndex!]));
    setCurrentPrompt(prompts[newIndex]);
    return true;
  }, [selectedVibe, usedIndices, includeNSFWInSurprise]);

  const resetGame = useCallback(() => {
    setSelectedVibe(null);
    setCurrentPrompt('');
    setUsedIndices(new Set());
    setTotalPrompts(0);
  }, []);

  const changeVibe = useCallback(() => {
    setCurrentPrompt('');
    setUsedIndices(new Set());
  }, []);

  return (
    <GameContext.Provider
      value={{
        selectedVibe,
        currentPrompt,
        usedIndices,
        totalPrompts,
        includeNSFWInSurprise,
        selectVibe,
        setIncludeNSFWInSurprise,
        getNextPrompt,
        resetGame,
        changeVibe,
        promptsUsedCount: usedIndices.size,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
