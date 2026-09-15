import { Howl } from 'howler';

const sounds = {
  engine: new Howl({ src: ['/audio/engine.mp3'], loop: true, volume: 0.3 }),
  wind: new Howl({ src: ['/audio/wind.mp3'], loop: true, volume: 0.2 }),
  collect: new Howl({ src: ['/audio/collect.mp3'], volume: 0.5 }),
  zone: {
    architecture: new Howl({ src: ['/audio/zone-arch.mp3'], loop: true, volume: 0.15 }),
    characters: new Howl({ src: ['/audio/zone-char.mp3'], loop: true, volume: 0.15 }),
    vehicles: new Howl({ src: ['/audio/zone-veh.mp3'], loop: true, volume: 0.15 }),
    products: new Howl({ src: ['/audio/zone-prod.mp3'], loop: true, volume: 0.15 }),
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
  },
  toggleMute() {
    muted = !muted;
    Object.values(sounds).forEach(s => s.mute(muted));
    return muted;
  },
  isMuted: () => muted,
};
