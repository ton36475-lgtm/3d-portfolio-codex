export default function HUD() {
  return (
    <div style={{
      position: 'absolute', bottom: 16, left: 16, right: 16,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      pointerEvents: 'none', fontSize: 14, opacity: 0.9
    }}>
      <div>WASD / Arrows to drive · Collect crystals</div>
      <div>3D Portfolio Drive</div>
    </div>
  );
}
