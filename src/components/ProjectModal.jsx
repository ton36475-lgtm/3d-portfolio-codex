import { useEffect, useState } from 'react';

export default function ProjectModal({ project, onClose }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);
  if (!project) return null;
  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(5,5,15,0.72)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50,
        backdropFilter: 'blur(6px)', opacity: visible ? 1 : 0, transition: 'opacity 0.25s',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'linear-gradient(160deg, #1a1a2e 0%, #12121f 100%)',
          color: '#fff', padding: 28, borderRadius: 16, maxWidth: 440, width: '90%',
          border: `1px solid ${project.color || '#7df9ff'}`, boxShadow: `0 0 40px ${project.color || '#7df9ff'}33`,
          transform: visible ? 'translateY(0)' : 'translateY(12px)', transition: 'transform 0.25s',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: project.color || '#7df9ff', boxShadow: `0 0 12px ${project.color || '#7df9ff'}` }} />
          <span style={{ opacity: 0.6, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>{project.zone}</span>
        </div>
        <h2 style={{ margin: '0 0 10px', fontSize: 22 }}>{project.title}</h2>
        <p style={{ margin: '0 0 18px', opacity: 0.8, lineHeight: 1.5 }}>{project.desc}</p>
        {project.model && (
          <div style={{ fontSize: 12, opacity: 0.45, marginBottom: 16, fontFamily: 'monospace' }}>model: {project.model}</div>
        )}
        <div style={{ display: 'flex', gap: 10 }}>
          {project.url && (
            <a href={project.url} target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: 'center', padding: '10px 16px', background: project.color || '#7df9ff', color: '#0a0a12', border: 'none', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>
              View Live
            </a>
          )}
          <button onClick={onClose} style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: 8, cursor: 'pointer' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
