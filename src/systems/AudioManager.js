import { Howl } from 'howler';

// Procedural audio fallbacks via WebAudio when files missing.
function synthTone(freq, dur, type = 'sine', vol = 0.15) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(vol, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + dur);
  } catch (e) {}
}

const sounds = {
  engine: new Howl({ src: ['/audio/engine.mp3'], loop: true, volume: 0.25, onloaderror: () => {} }),
  wind: new Howl({ src: ['/audio/wind.mp3'], loop: true, volume: 0.15, onloaderror: () => {} }),
  collect: new Howl({ src: ['/audio/collect.mp3'], volume: 0.5, onloaderror: () => synthTone(880, 0.3, 'triangle', 0.2) }),
  zone: {
    architecture: new Howl({ src: ['/audio/zone-arch.mp3'], loop: true, volume: 0.12, onloaderror: () => {} }),
    characters: new Howl({ src: ['/audio/zone-char.mp3'], loop: true, volume: 0.12, onloaderror: () => {} }),
    vehicles: new Howl({ src: ['/audio/zone-veh.mp3'], loop: true, volume: 0.12, onloaderror: () => {} }),
    products: new Howl({ src: ['/audio/zone-prod.mp3'], loop: true, volume: 0.12, onloaderror: () => {} }),
  },
};

let muted = false;
let currentZone = null;

export const AudioManager = {
  start() {
    if (!muted) {
      sounds.engine.play();
      sounds.wind.play();
    }
  },
  setZone(zone) {
    if (currentZone === zone) return;
    if (currentZone && sounds.zone[currentZone]) sounds.zone[currentZone].stop();
    currentZone = zone;
    if (zone && sounds.zone[zone] && !muted) sounds.zone[zone].play();
  },
  collect() {
    if (!muted) sounds.collect.play();
    else synthTone(660, 0.25, 'sine', 0.15);
  },
  toggleMute() {
    muted = !muted;
    Object.values(sounds).forEach((s) => {
      if (s && s.mute) s.mute(muted);
    });
    Object.values(sounds.zone).forEach((s) => s && s.mute && s.mute(muted));
    return muted;
  },
  isMuted: () => muted,
  synthTone,
};
