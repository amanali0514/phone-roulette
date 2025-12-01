/**
 * Game Types and Interfaces
 * Central location for all TypeScript types used in Phone Roulette
 */

/**
 * Game vibe/category types
 */
export type Vibe = "chill" | "chaotic" | "toxic" | "family" | "nsfw";

/**
 * Game stage/screen types
 */
export type GameStage = "welcome" | "vibe" | "game" | "end";

/**
 * Vibe configuration
 */
export interface VibeConfig {
  key: Vibe;
  label: string;
  description?: string;
  isExplicit?: boolean;
}

/**
 * Game state
 */
export interface GameState {
  stage: GameStage;
  selectedVibe: Vibe | null;
  currentPrompt: string;
  currentPromptIndex: number;
  usedIndices: Set<number>;
  totalPromptsInVibe: number;
  promptsUsedCount: number;
}

/**
 * Prompt generator result
 */
export interface PromptResult {
  prompt: string;
  index: number;
  vibe: Vibe;
}

/**
 * Prompt generator options
 */
export interface PromptGeneratorOptions {
  excludeIndices?: Set<number>;
  allowRepeats?: boolean;
}

/**
 * Game statistics
 */
export interface GameStats {
  vibeSelected: Vibe;
  totalPromptsAvailable: number;
  totalPromptsUsed: number;
  progressPercentage: number;
  promptsRemaining: number;
}

/**
 * Prompts database structure
 */
export interface PromptsDatabase {
  [key in Vibe]: string[];
}

/**
 * Game actions/events
 */
export type GameAction =
  | { type: "START_GAME" }
  | { type: "SELECT_VIBE"; payload: Vibe }
  | { type: "NEXT_PROMPT" }
  | { type: "CHANGE_VIBE" }
  | { type: "RESTART_GAME" }
  | { type: "CONFIRM_NSFW" }
  | { type: "CANCEL_NSFW" };

/**
 * Hook return type for useGameLogic
 */
export interface UseGameLogicReturn {
  state: GameState;
  stats: GameStats;
  actions: {
    startGame: () => void;
    selectVibe: (vibe: Vibe) => void;
    nextPrompt: () => void;
    changeVibe: () => void;
    restartGame: () => void;
    confirmNSFW: () => void;
    cancelNSFW: () => void;
  };
}

/**
 * NSFW confirmation state
 */
export interface NSFWConfirmation {
  isRequested: boolean;
  vibeSelected: Vibe | null;
}
