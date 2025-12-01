/**
 * Prompt Generator Utility
 * Handles randomization logic and prompt selection without duplicates
 */

import { Vibe, PromptResult, PromptGeneratorOptions } from "../types/game";
import { getPromptsForVibe } from "../data/prompts";

/**
 * Pick a random unused prompt from the available prompts
 * @param vibe - The vibe category
 * @param usedIndices - Set of already used prompt indices
 * @returns PromptResult with selected prompt and index, or null if all used
 */
export const pickNextPrompt = (
  vibe: Vibe,
  usedIndices: Set<number>,
  options: PromptGeneratorOptions = {}
): PromptResult | null => {
  const prompts = getPromptsForVibe(vibe);
  const totalPrompts = prompts.length;

  if (totalPrompts === 0) {
    return null;
  }

  // Check if all prompts have been used
  if (usedIndices.size >= totalPrompts) {
    return null;
  }

  // If allow repeats is enabled, clear used indices
  if (options.allowRepeats) {
    usedIndices.clear();
  }

  // Find an unused prompt
  let selectedIndex: number | null = null;
  const availableIndices: number[] = [];

  // Build list of available indices
  for (let i = 0; i < totalPrompts; i++) {
    if (!usedIndices.has(i)) {
      availableIndices.push(i);
    }
  }

  // If no available indices, return null (all prompts used)
  if (availableIndices.length === 0) {
    return null;
  }

  // Pick a random available index
  selectedIndex =
    availableIndices[Math.floor(Math.random() * availableIndices.length)];

  if (selectedIndex === null || selectedIndex === undefined) {
    return null;
  }

  return {
    prompt: prompts[selectedIndex],
    index: selectedIndex,
    vibe,
  };
};

/**
 * Check if all prompts in a vibe have been used
 * @param totalPrompts - Total number of prompts available
 * @param usedIndices - Set of used indices
 * @returns Boolean indicating if all prompts are used
 */
export const areAllPromptsUsed = (
  totalPrompts: number,
  usedIndices: Set<number>
): boolean => {
  return usedIndices.size >= totalPrompts;
};

/**
 * Get progress percentage for a vibe
 * @param usedCount - Number of prompts used
 * @param totalCount - Total number of prompts
 * @returns Progress as percentage (0-100)
 */
export const getProgressPercentage = (
  usedCount: number,
  totalCount: number
): number => {
  if (totalCount === 0) return 0;
  return Math.round((usedCount / totalCount) * 100);
};

/**
 * Get remaining prompts count
 * @param totalCount - Total number of prompts
 * @param usedCount - Number of prompts used
 * @returns Number of remaining prompts
 */
export const getRemainingPromptsCount = (
  totalCount: number,
  usedCount: number
): number => {
  return Math.max(0, totalCount - usedCount);
};

/**
 * Reset used indices
 * @returns Empty Set
 */
export const resetUsedIndices = (): Set<number> => {
  return new Set<number>();
};

/**
 * Reset all game state for a new vibe
 * @param vibe - The new vibe selected
 * @returns Fresh set of used indices
 */
export const resetForNewVibe = (vibe: Vibe): Set<number> => {
  return resetUsedIndices();
};

/**
 * Validate if an index is valid for a vibe
 * @param vibe - The vibe category
 * @param index - The index to validate
 * @returns Boolean indicating if index is valid
 */
export const isValidPromptIndex = (vibe: Vibe, index: number): boolean => {
  const prompts = getPromptsForVibe(vibe);
  return index >= 0 && index < prompts.length;
};

/**
 * Get all unused indices for a vibe
 * @param vibe - The vibe category
 * @param usedIndices - Set of used indices
 * @returns Array of unused indices
 */
export const getUnusedIndices = (
  vibe: Vibe,
  usedIndices: Set<number>
): number[] => {
  const prompts = getPromptsForVibe(vibe);
  const unused: number[] = [];

  for (let i = 0; i < prompts.length; i++) {
    if (!usedIndices.has(i)) {
      unused.push(i);
    }
  }

  return unused;
};
