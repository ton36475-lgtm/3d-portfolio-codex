import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

export function useCarInput() {
  const keys = useRef({ forward: false, backward: false, left: false, right: false });
  const touch = useRef({ active: false, x: 0, y: 0 });
  const gamepad = useRef(null);

  useEffect(() => {
    const onKey = (e, down) => {
      const k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup') keys.current.forward = down;
      if (k === 's' || k === 'arrowdown') keys.current.backward = down;
      if (k === 'a' || k === 'arrowleft') keys.current.left = down;
      if (k === 'd' || k === 'arrowright') keys.current.right = down;
    };
    const kd = (e) => onKey(e, true);
    const ku = (e) => onKey(e, false);
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);

    const onTouchStart = (e) => {
      const t = e.touches[0];
      touch.current = { active: true, x: t.clientX, y: t.clientY };
    };
    const onTouchMove = (e) => {
      if (!touch.current.active) return;
      const t = e.touches[0];
      const dx = t.clientX - touch.current.x;
      const dy = t.clientY - touch.current.y;
      keys.current.forward = dy < -20;
      keys.current.backward = dy > 20;
      keys.current.left = dx < -20;
      keys.current.right = dx > 20;
    };
    const onTouchEnd = () => {
      touch.current.active = false;
      keys.current = { forward: false, backward: false, left: false, right: false };
    };
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('keydown', kd);
      window.removeEventListener('keyup', ku);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  useFrame(() => {
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    const pad = pads[0];
    if (pad) {
      keys.current.forward = pad.buttons[0]?.pressed || pad.axes[1] < -0.3;
      keys.current.backward = pad.axes[1] > 0.3;
      keys.current.left = pad.axes[0] < -0.3;
      keys.current.right = pad.axes[0] > 0.3;
    }
  });

  return keys;
}
