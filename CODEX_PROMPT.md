# Codex continuation prompt

You are continuing a Vite + React + Three.js 3D portfolio project on branch `codex/full-systems`.

Goal: a drivable car in a 200x200 world with 4 zones (architecture, characters, vehicles, products). Hidden crystals collect projects from src/data/projects.json. Open a modal on collect.

Systems already scaffolded under src/systems/:
- AudioManager.js (Howler: engine, wind, zone ambience, collect SFX, mute toggle)
- InputManager.js (WASD/arrows, touch joystick, gamepad)
- Performance.js (FPS monitor, auto pixel ratio, LOD distances)
- DayNight.js (sun + ambient cycle)

Next steps for Codex, in order:
1. Replace placeholder audio files in /public/audio with real short loops (engine hum, wind, 4 zone beds, collect chime). Keep under 200KB each.
2. Add real .glb models in /public/models (arch, char, veh, prod) and load them with useGLTF + Draco. Add fallback boxes.
3. Implement proper Rapier vehicle controller or kinematic car with wheel colliders. Camera follow behind car, smooth lerp.
4. Add particle systems: collectible sparkle, optional rain/snow in zones.
5. Performance: texture atlases, instanced meshes for repeated props, target 60fps on mid phones.
6. Polish: day/night affects lighting + fog, zone enter/exit sound crossfade, HUD shows FPS + mute.
7. Ensure `npm run build` passes. Netlify + Vercel configs included.
8. Add README with run instructions and a short architecture diagram.

Keep code clean, no backend. Reply with file diffs or full files. Commit to this branch.
