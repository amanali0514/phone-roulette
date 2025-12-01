# 🎮 Phone Roulette - Development Plan

## 📱 What We're Building

A pass-the-phone party game app where players:
1. Select a "vibe" (Chill, Chaotic, Toxic Fun, Family, NSFW)
2. Get randomized prompts based on that vibe
3. Pass the phone after each prompt
4. Keep playing until all prompts are used

**Tech Stack:** React Native + Expo (works on iOS, Android, and Web)

---

## 🏗️ Project Structure

### Current Setup
We have a working Expo app with:
- ✅ Node.js and npm installed
- ✅ All dependencies installed
- ✅ Expo dev server running
- ✅ App displaying on Expo Go
- ✅ TypeScript configured
- ✅ Basic tab navigation setup

### What We're Building
```
phone-roulette/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          → Welcome Screen (START HERE)
│   │   └── explore.tsx         → Will become Vibe Selection Screen
│   ├── game.tsx                → NEW: Game/Prompt Display Screen
│   └── end.tsx                 → NEW: End of Game Screen
│
├── data/
│   └── prompts.ts              → NEW: All prompt categories & content
│
├── hooks/
│   └── useGameLogic.ts         → NEW: Game state management hook
│
├── utils/
│   └── promptGenerator.ts      → NEW: Random prompt logic (no duplicates)
│
└── types/
    └── game.ts                 → NEW: TypeScript types for game
```

---

## 👥 Work Division (To Avoid Merge Conflicts)

### 🎨 NATHAN (You) - Frontend/Screens
**Files you'll work on:**
- `app/(tabs)/index.tsx` - Welcome Screen
- `app/(tabs)/explore.tsx` - Vibe Selection Screen  
- `app/game.tsx` - Game Screen (shows prompts)
- `app/end.tsx` - End Screen

**Your responsibilities:**
- Create clean, simple UI for each screen
- Make text large and readable (party game from distance)
- Add navigation between screens
- Style buttons and layouts
- Test on Expo Go

**You do NOT touch:**
- `data/` folder
- `hooks/` folder
- `utils/` folder
- Prompt content

---

### 🔧 FRIEND - Data & Game Logic
**Files you'll work on:**
- `data/prompts.ts` - Create all prompt categories
- `hooks/useGameLogic.ts` - Game state management
- `utils/promptGenerator.ts` - Randomization algorithm
- `types/game.ts` - TypeScript type definitions

**Your responsibilities:**
- Write all prompts for each vibe (Chill, Chaotic, Toxic Fun, Family, NSFW)
- Build the game logic (no duplicate prompts until all are used)
- Create custom React hook to manage game state
- Export clean functions that Nathan can import in screens

**You do NOT touch:**
- Any files in `app/` folder
- UI/styling code

---

## 🎯 MVP Features

### 1. Welcome Screen
- Title: "Phone Roulette"
- Large "START" button
- Simple, clean design

### 2. Vibe Selection Screen
5 buttons for vibes:
- 😌 Chill
- 🤪 Chaotic
- 😈 Toxic Fun
- 👨‍👩‍👧 Family-Friendly
- 🔞 NSFW (shows 18+ confirmation popup)

### 3. Game/Prompt Screen
- Shows ONE prompt at a time
- Large centered text (readable from distance)
- "NEXT" button → loads new random prompt
- "Change Vibe" button → back to vibe selection
- No prompt repeats until all are used

### 4. End Screen
- Message: "Out of prompts for this vibe!"
- Button: "Play Again" → back to welcome
- Button: "Change Vibe" → back to vibe selection

---

## 🧩 How Your Code Connects

### Friend's Data Structure (Example)
```typescript
// data/prompts.ts
export const PROMPTS = {
  chill: [
    "Share your most embarrassing moment from this year",
    "What's the last thing you Googled?",
    // ... more prompts
  ],
  chaotic: [
    "Text your ex 'hey'",
    "Post an ugly selfie to your story",
    // ... more prompts
  ],
  // ... other vibes
};
```

### Friend's Game Hook (Example)
```typescript
// hooks/useGameLogic.ts
export function useGameLogic() {
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [selectedVibe, setSelectedVibe] = useState(null);
  
  function selectVibe(vibe: string) { /* ... */ }
  function getNextPrompt() { /* ... */ }
  function isGameOver() { /* ... */ }
  
  return { currentPrompt, selectVibe, getNextPrompt, isGameOver };
}
```

### Nathan Uses It (Example)
```typescript
// app/game.tsx
import { useGameLogic } from '@/hooks/useGameLogic';

export default function GameScreen() {
  const { currentPrompt, getNextPrompt } = useGameLogic();
  
  return (
    <View>
      <Text>{currentPrompt}</Text>
      <Button onPress={getNextPrompt}>NEXT</Button>
    </View>
  );
}
```

---

## 🔄 Git Workflow

### Initial Setup (Both)
```bash
# Make sure you're on latest master
git checkout master
git pull origin master
```

### Create Your Branch
```bash
# Nathan:
git checkout -b feature/frontend-screens

# Friend:
git checkout -b feature/game-logic
```

### While Working
```bash
# Commit often with clear messages
git add .
git commit -m "feat: add welcome screen UI"

# Push your branch to GitHub
git push origin feature/frontend-screens
# or
git push origin feature/game-logic
```

### Merging Strategy
**Order matters to avoid conflicts:**

1. **Friend merges FIRST** (provides the data/logic foundation)
   ```bash
   git checkout master
   git pull origin master
   git merge feature/game-logic
   git push origin master
   ```

2. **Nathan merges SECOND** (uses Friend's code)
   ```bash
   git checkout master
   git pull origin master  # Gets Friend's changes
   git merge feature/frontend-screens
   git push origin master
   ```

---

## 🚀 Development Flow

### Phase 1: Setup (Friend)
Friend creates:
1. `data/prompts.ts` with all prompt categories
2. `types/game.ts` with TypeScript types
3. `utils/promptGenerator.ts` with randomization logic
4. `hooks/useGameLogic.ts` with game state management

**Commit and push** ✅

### Phase 2: UI Build (Nathan)
Nathan creates:
1. Welcome screen UI
2. Vibe selection screen UI
3. Game screen UI (imports Friend's hook)
4. End screen UI

**Commit and push** ✅

### Phase 3: Integration
1. Friend merges their branch
2. Nathan pulls latest master
3. Nathan tests integration with real data
4. Nathan merges their branch

### Phase 4: Testing & Polish
- Test on iOS (Expo Go)
- Test on Android (Expo Go)
- Fix any bugs
- Add styling improvements

---

## 📋 Prompt Requirements (For Friend)

Each vibe needs **at least 20-30 prompts** for MVP.

### Vibe Guidelines:

**Chill:**
- Fun questions
- Light dares
- Get-to-know-you prompts
- Safe for any audience

**Chaotic:**
- Silly challenges
- Unexpected actions
- Funny dares
- High energy

**Toxic Fun:**
- Spicy questions
- Roast challenges
- Drama starters
- Push boundaries (but not offensive)

**Family:**
- G-rated content
- Kid-friendly
- Wholesome prompts
- Appropriate for grandma

**NSFW:**
- Adult content
- Requires 18+ confirmation
- Party game vibes
- Keep it fun, not creepy

---

## ✅ Definition of Done (MVP)

- [ ] Welcome screen shows with START button
- [ ] Vibe selection shows 5 options
- [ ] NSFW shows age confirmation popup
- [ ] Game screen shows prompts one at a time
- [ ] NEXT button loads new random prompt
- [ ] No prompt repeats until all prompts used
- [ ] End screen appears when prompts exhausted
- [ ] Can restart game
- [ ] Can change vibe mid-game
- [ ] App works on iOS Expo Go
- [ ] App works on Android Expo Go
- [ ] Clean, readable design (visible from distance)
- [ ] No crashes or errors

---

## 🐛 Testing Checklist

- [ ] Can start game from welcome
- [ ] All 5 vibes are selectable
- [ ] NSFW requires confirmation
- [ ] Prompts load correctly
- [ ] No duplicate prompts appear
- [ ] All prompts eventually show
- [ ] End screen appears at right time
- [ ] Can restart after finishing
- [ ] Can change vibe mid-game
- [ ] Navigation works smoothly
- [ ] Text is readable from distance
- [ ] Buttons are easy to tap
- [ ] App doesn't crash

---

## 📞 Communication

### Stay in sync:
- Commit and push frequently
- Use clear commit messages
- Don't work on the same files
- Test before merging

### Commit Message Format:
```
feat: add welcome screen
fix: prompt duplication bug  
style: improve button sizing
docs: update README
```

---

## 🎉 Next Steps After MVP

Once the MVP works, we can add:
- Animations (fade in/out)
- Haptic feedback
- Dark/light theme toggle
- "Mix all vibes" surprise mode
- Share/screenshot features
- More prompt categories

**But first: Get the core game working!**

---

## 🆘 Need Help?

If you get stuck:
1. Check if dev server is running (`npx expo start`)
2. Check for TypeScript errors
3. Test on Expo Go
4. Ask in our chat
5. Check the TECHNICAL_DOCUMENTATION.md

**Let's build this! 🚀**
