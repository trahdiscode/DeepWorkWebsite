import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useTheme } from '../context/ThemeContext';

export function CognitiveShield3D({ className = '' }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const { isLight } = useTheme();

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 24;

    // Renderer with Alpha
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch {
      // Fallback if WebGL fails
      return;
    }

    // Geometry Group
    const group = new THREE.Group();
    scene.add(group);

    // Color definitions based on monastic palette
    const goldColor = new THREE.Color(isLight ? 0x99582a : 0xbb9457);
    const apricotColor = new THREE.Color(isLight ? 0xbb9457 : 0xffe6a7);
    const wineColor = new THREE.Color(isLight ? 0x6f1d1b : 0x432818);

    // 1. Monastic Concentric Wireframe Rings (Atmospheric Focus Halo)
    const ringGeo1 = new THREE.RingGeometry(7.5, 7.54, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: goldColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: isLight ? 0.25 : 0.4,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    group.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(9.8, 9.84, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: apricotColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: isLight ? 0.18 : 0.28,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 6;
    ring2.rotation.y = Math.PI / 12;
    group.add(ring2);

    const ringGeo3 = new THREE.RingGeometry(12.2, 12.24, 64);
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: wineColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: isLight ? 0.15 : 0.25,
    });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.x = -Math.PI / 4;
    group.add(ring3);

    // 2. Wide Halo Icosahedron Geometry
    const icoGeo = new THREE.IcosahedronGeometry(8.5, 1);
    const icoWire = new THREE.WireframeGeometry(icoGeo);
    const icoLine = new THREE.LineSegments(
      icoWire,
      new THREE.LineBasicMaterial({
        color: goldColor,
        transparent: true,
        opacity: isLight ? 0.12 : 0.22,
        linewidth: 1,
      })
    );
    group.add(icoLine);

    // 3. Floating Focus Particles in Wide Ambient Halo
    const particleCount = 75;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 8.0 + Math.random() * 6.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.8;

      positions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      positions[i * 3 + 1] = radius * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

      const c = Math.random() > 0.5 ? goldColor : apricotColor;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.5, 'rgba(255,230,167,0.8)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const particleTex = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.35,
      map: particleTex,
      transparent: true,
      opacity: isLight ? 0.6 : 0.85,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // Mouse Tracking with smooth Damping (lerp)
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      targetRotY = x * 0.35;
      targetRotX = y * 0.25;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth || 500;
      height = container.clientHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Pause rendering when element is not visible
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Animation loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible || !renderer) return;

      const elapsed = clock.getElapsedTime();

      if (!reducedMotion) {
        // Continuous smooth rotation
        ring1.rotation.z = elapsed * 0.08;
        ring2.rotation.z = -elapsed * 0.06;
        ring2.rotation.x = Math.PI / 6 + Math.sin(elapsed * 0.2) * 0.1;
        ring3.rotation.z = elapsed * 0.04;
        icoLine.rotation.y = elapsed * 0.04;
        icoLine.rotation.x = elapsed * 0.03;
        particles.rotation.y = elapsed * 0.02;

        // Smooth cursor tracking interpolation
        currentRotX += (targetRotX - currentRotX) * 0.05;
        currentRotY += (targetRotY - currentRotY) * 0.05;

        group.rotation.x = currentRotX;
        group.rotation.y = currentRotY;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      ringGeo3.dispose();
      ringMat3.dispose();
      icoGeo.dispose();
      icoWire.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      particleTex.dispose();

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, [reducedMotion, isLight]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    />
  );
}
