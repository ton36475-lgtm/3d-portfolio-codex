import { useState } from 'react';
import { AudioManager } from '../systems/AudioManager';

export default function HUD({ collected, total, fps }) {
  const [muted, setMuted] = useState(false);
  const toggle = () => {
    const m = AudioManager.toggleMute();
    setMuted(m);
  };
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, padding: '12px 16px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      color: '#fff', fontFamily: 'monospace', pointerEvents: 'none', zIndex: 10,
    }}>
      <div>Projects: {collected} / {total}</div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {fps && <span>{fps} FPS</span>}
        <button onClick={toggle} style={{ pointerEvents: 'auto', background: 'rgba(0,0,0,0.4)', border: '1px solid #fff', color: '#fff', borderRadius: 6, padding: '4px 10px' }}>
          {muted ? 'Unmute' : 'Mute'}
        </button>
      </div>
    </div>
  );
}
