# MASTER PROMPT — 3D Portfolio Drive (Realism v2)

You are Codex continuing branch `codex/realism-v2` of repo `ton36475-lgtm/3d-portfolio-codex`.

## Goal
Drivable car in a 200x200 world, 4 zones, collect glowing crystals, open project modal. Target 60 FPS on mid phones. No backend.

## What's new in this commit
- `src/systems/Terrain.js` — procedural rolling hills
- `src/systems/Particles.js` — dust motes + collect sparkles
- `src/systems/Weather.js` — rain (Vehicles) + snow (Products)
- `src/systems/Fog.js` — dynamic fog tied to day/night
- `src/components/Crystal.jsx` — PBR crystal with Float + Sparkles
- `src/components/Zone.jsx` — glowing pads, rings, pillars, weather hooks
- `src/components/Car.jsx` — detailed body, cabin, windshield, headlights, spinning wheels, shadow catcher
- Enhanced `App.jsx` — clouds, hemisphere light, contact shadows, 2048 shadow maps, dynamic fog wiring
- Polished HUD + modal with glow + View Live link
- AudioManager with synth fallback when files missing

## Next tasks for Codex
1. Add real `.glb` models in `/public/models` (arch, char, veh, prod) loaded via `useGLTF` + Draco, with fallback boxes.
2. Replace placeholder audio in `/public/audio` with real loops under 200KB each.
3. Implement proper Rapier vehicle controller with wheel colliders (replace kinematic velocity).
4. Add texture atlases + instanced meshes for repeated props (trees, rocks).
5. Ensure `npm run build` passes with zero errors.
6. Update README with architecture diagram and deploy notes.

## Constraints
- No backend. Keep modular. Commit to `codex/realism-v2`.
- Do not break existing systems; extend them.

Start now. Read files, then begin task 1.
