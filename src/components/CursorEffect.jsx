import { useEffect, useRef } from 'react';

export default function CursorEffect() {
  const cursorRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;

    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Smooth follow effect
      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * 0.2;
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * 0.2;

      cursor.style.left = positionRef.current.x + 'px';
      cursor.style.top = positionRef.current.y + 'px';

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        width: '24px',
        height: '24px',
        border: '2px solid #22abfa',
        borderRadius: '50%',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        mixBlendMode: 'screen',
      }}
    />
  );
}
