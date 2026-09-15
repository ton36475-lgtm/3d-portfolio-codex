# 3D Portfolio Drive

Drivable 3D portfolio. Drive a car through four zones, collect glowing crystals to open project cards.

## Stack
- Vite + React + Three.js (React Three Fiber)
- Rapier physics
- Howler audio
- Systems: AudioManager, InputManager, Performance, DayNight

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

## Deploy
- Netlify: http://3d-portfolio-codex.netlify.app (site created, needs first deploy)
- Vercel: add GitHub login connection, then auto-deploy from `codex/full-systems`

## Codex
Open this repo, switch to branch `codex/full-systems`, paste the contents of `CODEX_PROMPT.md` into Codex. It will extend all systems and commit back.

## Controls
- Desktop: WASD or Arrow keys
- Mobile: touch drag (forward/back/steer)
- Gamepad: left stick + A button
