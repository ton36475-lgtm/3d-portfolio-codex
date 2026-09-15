export default function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50,
    }} onClick={onClose}>
      <div style={{
        background: '#1a1a2e', color: '#fff', padding: 24, borderRadius: 12,
        maxWidth: 420, width: '90%', border: '1px solid #7df9ff',
      }} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ margin: '0 0 8px' }}>{project.title}</h2>
        <p style={{ opacity: 0.7, margin: '0 0 16px' }}>{project.zone}</p>
        <p style={{ margin: '0 0 16px' }}>{project.desc}</p>
        {project.model && (
          <div style={{ fontSize: 12, opacity: 0.5 }}>Model: {project.model}</div>
        )}
        <button onClick={onClose} style={{ marginTop: 8, padding: '8px 16px', background: '#7df9ff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>
          Close
        </button>
      </div>
    </div>
  );
}
