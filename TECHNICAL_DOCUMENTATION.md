# 📘 PHONE GAME — TECHNICAL DOCUMENTATION (MVP v1.0)

## 1. PRODUCT OVERVIEW

Phone Game is a pass-the-phone party game designed for in-person groups.
Players select a "vibe" (Chill, Chaotic, Toxic, Family, NSFW) and the app generates randomized prompts.
After each prompt, the phone is passed to the next person.

This game is designed to be:
- Zero setup
- High replay value
- Viral friendly
- Usable on iOS, Android, and Web (via Expo)

The focus is on simplicity, speed, and group fun.

---

## 2. CORE FEATURES (MVP)

### 1. Welcome Screen
- Displays game title
- "Start" button takes player to vibe selection

### 2. Vibe Selection
User chooses one of:
- Chill
- Chaotic
- Toxic Fun
- Family-Friendly
- NSFW (18+ confirmation popup)

Each vibe corresponds to a different prompt category.

### 3. Prompt Delivery Screen
- Shows ONE prompt at a time
- Large text, centered (readable from distance)
- "Next" button generates a new prompt
- Prompts do not repeat until all used
- "Change Vibe" button to go back

### 4. End-of-Prompts Screen
When all prompts in a category are used:
- Message: "Out of prompts"
- Options:
  - Restart
  - Change Vibe

### 5. Web + Mobile Support
Built with Expo, runs on:
- iOS (Expo Go)
- Android (Expo Go)
- Web browsers (npm run web)

---

## 3. TECH STACK

### Frontend Framework
- React Native
- Expo (managed workflow)

### Language
- JavaScript (ES6)

### UI Libraries
- React Native built-in components
- Custom stylesheet via StyleSheet.create

### State Management
React Hooks:
- useState
- useCallback

### Randomization Logic
- JavaScript Math.random()
- Unique-index filtering using Set

### Environment
- Node.js (LTS)
- npm

### Platforms
- iOS (Expo Go)
- Android (Expo Go)
- Web (React Native Web + Expo)

### Version Control
- Git
- GitHub (repo: Phone-Game)

---

## 4. APP ARCHITECTURE

```
phone-roulette/
│
├── App.js                # Main app UI + navigation between screens
├── prompts.js            # Central prompt database for all vibe categories
├── package.json
├── app.json
├── .gitignore
│
└── assets/               # (Optional) images, fonts
```

---

## 5. GAME LOGIC FLOW

### State Variables
- `stage` → "welcome" | "vibe" | "game" | "end"
- `selectedVibe` → "chill" | "chaotic" | etc.
- `currentPrompt` → string
- `usedIndices` → array of used prompt indexes

### Flowchart
```
START → Welcome Screen
    ↓
User clicks Start
    ↓
Vibe Selection Screen
    ↓
User selects vibe
    ↓
If vibe = NSFW → show 18+ confirm
    ↓
Load prompt pool for selected vibe
    ↓
Generate random prompt
    ↓
Show Prompt Screen
    ↓
Loop:
  Player taps Next → generate next prompt
    ↓
If all prompts used → End Screen
    ↓
User chooses:
  - Restart → back to Welcome
  - Change vibe → back to Vibe Screen
```

---

## 6. PROMPT GENERATION ALGORITHM

### Pseudocode:
```javascript
function pickNextPrompt(vibe):
    prompts = PROMPTS[vibe]
    if usedIndices.length == prompts.length:
        stage = "end"
        return

    do:
        i = random index between 0 and prompts.length-1
    while i in usedIndices

    usedIndices.add(i)
    currentPrompt = prompts[i]
    stage = "game"
```

**Guarantees:**
- No duplicates
- Every prompt eventually shows
- Smooth experience

---

## 7. CURRENT PROMPTS LIBRARY

Defined in `prompts.js`.

**Categories:**
- Chill
- Chaotic
- Toxic Fun
- Family
- NSFW

Each contains 5 starter prompts (expandable).

---

## 8. DEPLOYMENT PLAN

### Local Development
Start dev server:
```bash
npm run start
```

Run on:
- iPhone/Android via Expo Go
- Web via:
  ```bash
  npm run web
  ```

### Publishing (Future)
Expo allows:

**To App Store / Play Store:**
```bash
expo build:ios
expo build:android
```

**To Web (Static Build):**
```bash
expo export:web
```

Can deploy to:
- Vercel
- Netlify
- GitHub Pages

---

## 9. GITHUB WORKFLOW

### Initial Setup
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/Sickofro/Phone-Game.git
git branch -M main
git push -u origin main
```

---

## 10. ROADMAP (Planned Features)

### v1.1 — Polish
- Add haptic vibration on prompt change
- Add fade-in / fade-out animation
- Better typography

### v1.2 — Game Enhancements
- "Hold to reveal" prompt mode
- "Surprise mode" (mix all vibes)
- Dark/light theme

### v1.3 — Social Features
- Share prompt results
- Screenshot templates
- "Post your result" meme export

### v2.0 — Advanced Version
- User-generated prompts
- Online multiplayer
- Profiles
- Daily packs
- Tokens / XP
- Store for premium prompt categories
- Custom vibe creation

---

## 11. FUTURE TECH CONSIDERATIONS

- Migrate to TypeScript
- Add Zustand or Redux for global state
- Add Firebase for remote prompt syncing
- Add backend for analytics and A/B testing
- Add push notifications

---

## 12. HOW USERS SHOULD PLAY

1. Open the app
2. Group sits in a circle
3. Pick a vibe
4. First player reads prompt
5. Does the action
6. Passes the phone
7. Next prompt appears
8. Game continues until pack is exhausted

**Simple. No learning curve.**
