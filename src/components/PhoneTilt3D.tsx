import { useState, useRef, useEffect, type ReactNode, type MouseEvent } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface PhoneTilt3DProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  sheenOpacity?: number;
}

export function PhoneTilt3D({
  children,
  className = '',
  maxTilt = 7,
  sheenOpacity = 0.35,
}: PhoneTilt3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [sheen, setSheen] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const currentTiltRef = useRef({ x: 0, y: 0 });
  const targetTiltRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const updateTilt = () => {
      // Smooth lerp damping
      const factor = isHovered ? 0.08 : 0.05;
      currentTiltRef.current.x += (targetTiltRef.current.x - currentTiltRef.current.x) * factor;
      currentTiltRef.current.y += (targetTiltRef.current.y - currentTiltRef.current.y) * factor;

      setTilt({
        x: currentTiltRef.current.x,
        y: currentTiltRef.current.y,
      });

      // Keep updating until close to target
      if (
        isHovered ||
        Math.abs(currentTiltRef.current.x) > 0.01 ||
        Math.abs(currentTiltRef.current.y) > 0.01
      ) {
        animFrameRef.current = requestAnimationFrame(updateTilt);
      }
    };

    animFrameRef.current = requestAnimationFrame(updateTilt);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isHovered, reducedMotion]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    targetTiltRef.current = {
      x: -normY * maxTilt,
      y: normX * maxTilt,
    };

    setSheen({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: sheenOpacity,
    });

    if (!isHovered) {
      setIsHovered(true);
    }
  };

  const handleMouseEnter = () => {
    if (reducedMotion) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (reducedMotion) return;
    setIsHovered(false);
    targetTiltRef.current = { x: 0, y: 0 };
    setSheen((prev) => ({ ...prev, opacity: 0 }));
  };

  const transformStyle = reducedMotion
    ? undefined
    : {
        transform: `perspective(1000px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg)`,
        transformStyle: 'preserve-3d' as const,
        transition: isHovered ? 'none' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none ${className}`}
      style={transformStyle}
    >
      {children}

      {/* Dynamic Specular Sheen Layer */}
      {!reducedMotion && (
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[32px] sm:rounded-[36px] pointer-events-none z-30 transition-opacity duration-500 overflow-hidden mix-blend-overlay"
          style={{
            background: `radial-gradient(circle 320px at ${sheen.x}% ${sheen.y}%, rgba(255, 245, 220, ${sheen.opacity}) 0%, transparent 80%)`,
          }}
        />
      )}
    </div>
  );
}
