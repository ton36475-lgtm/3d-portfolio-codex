export default function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <div style={{
      position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10
    }} onClick={onClose}>
      <div style={{
        background: '#0d1320', padding: 24, borderRadius: 12, maxWidth: 420, width: '90%',
        border: '1px solid #2a3550'
      }} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: 8 }}>{project.title}</h2>
        <p style={{ opacity: 0.8, marginBottom: 16 }}>{project.description}</p>
        <a href={project.url} target="_blank" rel="noreferrer" style={{ color: '#5ad1ff' }}>Open project →</a>
        <button onClick={onClose} style={{ marginLeft: 16, padding: '6px 12px', borderRadius: 6, background: '#334', color: '#fff', border: 'none' }}>Close</button>
      </div>
    </div>
  );
}
