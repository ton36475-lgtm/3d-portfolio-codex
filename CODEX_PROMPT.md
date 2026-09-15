# Codex continuation prompt

You are continuing a Vite + React + Three.js 3D portfolio project.

Goal: a drivable car in a 200x200 world with 4 zones (architecture, characters, vehicles, products). Hidden crystals collect projects from src/data/projects.json. Open a modal on collect.

Current files exist under src/. Improve these next, in order:

1. Car controls: WASD/arrows, touch joystick, gamepad. Add simple Rapier vehicle or kinematic movement with camera follow.
2. Audio: engine hum, wind, zone ambience using Howler. Mute toggle in HUD.
3. Models: load real .glb from /public/models using useGLTF. Add Draco if available.
4. Performance: LOD, texture atlases, target 60fps mobile.
5. Polish: day/night cycle, rain/snow particles, collectible sparkle, sound on collect.
6. Build: ensure `npm run build` passes. Add Netlify/Vercel config.

Keep code clean, typed where easy, no backend. Reply with file diffs or full files.
