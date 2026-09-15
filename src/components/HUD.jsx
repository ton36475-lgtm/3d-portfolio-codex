import React from 'react'

export default function HUD({ collected, total }) {
  return (
    <div style={{
      position: 'absolute', top: 12, left: 12, zIndex: 10,
      background: 'rgba(0,0,0,0.45)', padding: '8px 12px', borderRadius: 8,
      fontSize: 14, color: '#fff'
    }}>
      Crystals: {collected} / {total}
      <div style={{ marginTop: 4, opacity: 0.8 }}>WASD / Arrows drive · Touch joystick on mobile</div>
    </div>
  )
}
