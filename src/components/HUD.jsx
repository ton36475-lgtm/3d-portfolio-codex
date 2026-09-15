import { useState } from 'react';
import { AudioManager } from '../systems/AudioManager';

export default function HUD({ collected, total, fps }) {
  const [muted, setMuted] = useState(false);
  const toggle = () => {
    const m = AudioManager.toggleMute();
    setMuted(m);
  };
  const lowFps = fps && fps < 30;
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, padding: '12px 16px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      color: '#fff', fontFamily: 'monospace', pointerEvents: 'none', zIndex: 10,
      textShadow: '0 1px 3px rgba(0,0,0,0.8)',
    }}>
      <div style={{ fontSize: 14 }}>
        <span style={{ opacity: 0.7 }}>Projects</span> {collected} / {total}
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 13 }}>
        {fps && (
          <span style={{ color: lowFps ? '#ff6b6b' : '#7df9ff' }}>{fps} FPS</span>
        )}
        <button
          onClick={toggle}
          style={{
            pointerEvents: 'auto', background: 'rgba(0,0,0,0.45)',
            border: '1px solid rgba(255,255,255,0.4)', color: '#fff',
            borderRadius: 8, padding: '5px 12px', cursor: 'pointer', backdropFilter: 'blur(4px)',
          }}
        >
          {muted ? '🔇 Unmute' : '🔊 Mute'}
        </button>
      </div>
    </div>
  );
}
