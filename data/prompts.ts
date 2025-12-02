import { Vibe, PromptsDatabase } from "../types/game";

export const PROMPTS: PromptsDatabase = {
  chill: [
    "Share your favorite comfort food",
    "Describe your ideal weekend",
    "What's a skill you want to learn?",
    "Tell us about your dream vacation",
    "What's your favorite movie genre?",
    "Share a hobby you're passionate about",
    "Describe your perfect morning routine",
    "What's a book or show you'd recommend?",
    "Tell us about a person who inspires you",
    "What's something that always makes you smile?",
    "Share your favorite song at the moment",
    "What's a place that makes you feel peaceful?",
    "Describe your ideal day from start to finish",
    "What's your go-to comfort activity?",
    "Tell us about your favorite childhood memory",
    "What's a talent you have that others might not know?",
    "Share a compliment about the person to your left",
    "What's your favorite time of day and why?",
    "Describe a goal you're working towards",
    "What's something you've learned recently?",
    "Share a fun fact about yourself",
    "What's your favorite weather and why?",
    "Tell us about a hobby that relaxes you",
    "What's a quality you admire in your friends?",
    "Describe your ideal weekend getaway",
    "What's your favorite way to spend free time?",
    "Share something you're grateful for today",
    "What's a small thing that brings you joy?",
    "Tell us about your favorite local spot",
    "What's a positive change you've made recently?",
  ],

  chaotic: [
    "Do your best impression of someone in this group",
    "Sing the chorus of a song (any song!)",
    "Do 10 jumping jacks while humming",
    "Tell a joke (it can be terrible)",
    "Make the weirdest face possible for 5 seconds",
    "Do a silly dance for 10 seconds",
    "Speak in an accent for the next 2 turns",
    "Act out a famous movie scene",
    "Describe something using only hand gestures",
    "Make animal sounds for each person here",
    "Put your shirt on backwards and keep it that way for 3 turns",
    "Do the funniest walk you can muster to the kitchen and back",
    "Speak in rhyme for your next answer",
    "Pretend to be a news anchor reporting on this group",
    "Do your best celebrity impression",
    "Tell the most unhinged story you can think of",
    "Act like you're in a dramatic movie scene",
    "Do a cartwheel or attempt one",
    "Yodel as loud as you can",
    "Pretend to be a sports commentator for 30 seconds",
    "Do an interpretive dance to an imaginary song",
    "Tell a story but only using movie titles",
    "Impersonate everyone in the group one by one",
    "Do your best TikTok dance",
    "Speak only in questions until your next turn",
    "Pretend to be a game show host",
    "Do your best villain laugh",
    "Describe your day like you're a nature documentary",
    "Do the silliest run in place possible",
    "Pretend to propose to someone in the group",
  ],

  toxic: [
    "Who here would you trust with your biggest secret?",
    "Who's the funniest person in this group?",
    "Who would you want on your team in a zombie apocalypse?",
    "Who has the best fashion sense here?",
    "Who's most likely to become famous?",
    "Who would survive longest in the wild?",
    "Who's the most chaotic?",
    "Who's most likely to ghost someone?",
    "Who would be your sidekick in a heist?",
    "Who's the most dramatic?",
    "Who gives the best advice?",
    "Who's the most likely to get in trouble?",
    "Who has the worst taste in music?",
    "Who's most likely to start a fight?",
    "Who's the most likely to cry at a movie?",
    "Who would you want as your lawyer?",
    "Who's most likely to be late to everything?",
    "Who has the weirdest secret talent?",
    "Who's most likely to forget your birthday?",
    "Who would you want as your roommate?",
    "Who's the most likely to succeed?",
    "Who's the biggest workaholic?",
    "Who's most likely to become a millionaire?",
    "Who's the worst at keeping secrets?",
    "Who would you want with you on a desert island?",
    "Who's the most likely to ditch everyone for their partner?",
    "Who has the best story from this month?",
    "Who would you trust to plan your birthday?",
    "Who's most likely to get fired from a job?",
    "Who would win in a fight with their younger self?",
  ],

  family: [
    "What's your favorite family tradition?",
    "If you could have dinner with anyone, who?",
    "What's your favorite childhood memory?",
    "Describe your dream house",
    "What's a talent you wish you had?",
    "Tell us about your first pet",
    "What's your favorite season and why?",
    "Share a funny family story",
    "What's something you're really good at?",
    "If you could have any superpower, what would it be?",
    "What's your favorite holiday memory?",
    "Tell us about a mentor in your life",
    "What's a life lesson you've learned?",
    "What's your favorite type of cuisine?",
    "Describe a time you felt proud",
    "What's your favorite sport to play or watch?",
    "Tell us about a teacher who made a difference",
    "What's your favorite thing about your family?",
    "What's a goal you had as a kid?",
    "Tell us about your best friend",
    "What's a tradition you want to start?",
    "Describe your ideal family vacation",
    "What's something you do really well?",
    "Tell us about someone you look up to",
    "What's your favorite movie to watch with family?",
    "What's a skill your parents taught you?",
    "Tell us about a happy moment this year",
    "What's your favorite childhood game?",
    "Describe a family member you admire",
    "What's something you want to accomplish this year?",
  ],

  nsfw: [
    "What's your most embarrassing moment?",
    "Tell us your worst date story",
    "What's something you've lied about to friends?",
    "Describe your celebrity crush",
    "What's the weirdest thing you've Googled?",
    "Tell us your most unpopular opinion",
    "What's your guilty pleasure?",
    "What's the most awkward thing that's happened to you?",
    "Tell us something you've never admitted",
    "What's the funniest thing that's happened to you?",
    "What's something you're secretly good at?",
    "Tell us your spiciest take on this group",
    "What's something you do when nobody's watching?",
    "Describe your type in one sentence",
    "What's the most you'd spend on something silly?",
    "Tell us something controversial you believe",
    "What's a weird habit you have?",
    "Describe the worst haircut you've ever had",
    "What's something you impulse bought you regret?",
    "Tell us your most unpopular food opinion",
    "What's something you pretend to like but don't?",
    "Describe the most dramatic thing that happened to you",
    "What's something you're weirdly competitive about?",
    "Tell us about your worst breakup",
    "What's something you do that you think is weird?",
    "Describe a time you totally embarrassed yourself",
    "What's something you've blamed someone else for?",
    "Tell us about the worst advice you've ever given",
    "What's something you're lowkey obsessed with?",
    "Describe the most ridiculous thing you've done for attention",
  ],
};

/**
 * Get all prompts for a specific vibe
 */
export const getPromptsForVibe = (vibe: Vibe): string[] => {
  return PROMPTS[vibe as keyof PromptsDatabase] || [];
};

/**
 * Get all available vibes
 */
export const getAvailableVibes = (): Vibe[] => {
  return Object.keys(PROMPTS) as Vibe[];
};

/**
 * Get prompt count for a vibe
 */
export const getPromptCount = (vibe: Vibe): number => {
  return getPromptsForVibe(vibe).length;
};

/**
 * Get a specific prompt by vibe and index
 */
export const getPromptByIndex = (vibe: Vibe, index: number): string | null => {
  const prompts = getPromptsForVibe(vibe);
  if (index < 0 || index >= prompts.length) {
    return null;
  }
  return prompts[index];
};
