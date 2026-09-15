# 3D Portfolio Drive — Realism v2

Drivable 3D portfolio. Drive through four zones, collect glowing crystals, open project cards. Procedural terrain, PBR materials, particles, weather, dynamic fog.

## Stack
- Vite + React 18 + Three.js via @react-three/fiber + @react-three/drei
- @react-three/rapier (physics)
- howler (audio, with synth fallback)
- Systems: AudioManager, InputManager, Performance, DayNight, Terrain, Particles, Weather, Fog

## Run
```
npm install
npm run dev
```

## Build
```
npm run build
npm run preview
```

## Controls
- Desktop: WASD or Arrow keys
- Mobile: touch drag
- Gamepad: left stick + A

## Deploy
- Branch: `codex/realism-v2`
- Netlify / Vercel: connect repo, set build `npm run build`, publish `dist`

## Codex
Paste `MASTER_PROMPT.md` into Codex on this branch to continue.
