import React from 'react'

export default function ProjectModal({ project, onClose }) {
  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, zIndex: 20,
      background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: 'min(420px, 90vw)', background: '#12121c', borderRadius: 12, padding: 20, color: '#fff'
      }}>
        <h2 style={{ marginBottom: 8 }}>{project.title}</h2>
        <p style={{ opacity: 0.85, marginBottom: 12 }}>{project.desc}</p>
        <div style={{ fontSize: 12, opacity: 0.6 }}>Zone: {project.zone}</div>
        <button onClick={onClose} style={{
          marginTop: 16, padding: '8px 14px', borderRadius: 8, border: 'none',
          background: '#2ad4ff', color: '#001018', fontWeight: 600, cursor: 'pointer'
        }}>Close</button>
      </div>
    </div>
  )
}
