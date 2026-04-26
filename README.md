# ALIGNMENT — A Game of Sleeping Verbs

A mobile-optimised puzzle game pitch built in React + Vite.

**Mechanic:** Glyph-stones float in 3D space. You can't push them — but you can rotate the world. From the right camera angle, suspended glyphs visually align into a sentence (`LANTERN · WAKES · BRIDGE`). The moment it reads true, the rule fires.

Inspired by Baba is You (rules-as-objects), Monument Valley (camera-as-mechanic), and Hollow Knight (hand-curated melancholy).

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

The app is a scrollable **design canvas** showing all screens side by side. Use the **Tweaks panel** (bottom-right) to:
- Switch ambient (Night / Dusk / Dawn)
- Rotate the camera angle (0 = solved state for Chapter I)
- Toggle hint whispers
- Toggle audio placeholder

## Project structure

```
src/
  lib/
    iso.jsx          # Isometric rendering primitives (IsoBlock, Reader, Motes…)
  screens/
    TitleScreen.jsx  # Title screen with floating glyph letters
    WorldMap.jsx     # The Atlas — chapter spine with constellation nodes
    Level.jsx        # Core mechanic — isometric chamber with floating glyphs
    Narrative.jsx    # Story cards (opening, fragment, level-complete, codex)
    Variants.jsx     # Chapter II (Moth Court) and III (Ash Choir) level skins
  components/
    DesignCanvas.jsx # Pan/zoom canvas with sections and artboards
    TweaksPanel.jsx  # Floating controls panel
  tokens.css         # Design tokens (colours, fonts, keyframes)
  App.jsx            # Root — assembles the full design canvas
```

## Building for Android (Capacitor)

When you're ready to publish on Android:

```bash
# 1. Build the web app
npm run build

# 2. Add Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "Alignment" "com.yourname.alignment" --web-dir dist
npx cap add android

# 3. Sync and open in Android Studio
npx cap sync
npx cap open android
```

From Android Studio you can run on a device or create a signed APK for the Play Store.

## Chapters

| # | Name | Verb | Biome |
|---|------|------|-------|
| I | The Sunken Reliquary | WAKE | Drowned cathedral |
| II | Moth Court | FOLLOW | Clockwork forest |
| III | Ash Choir | SPEAK | Burning library |
| IV | The Hollow Sky | FORGET | Final ascent |
