import { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseColor: string;
  brightColor: string;
}

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const isVisibleRef = useRef(true);

  const createParticles = useCallback((canvas: HTMLCanvasElement): Particle[] => {
    const dpr = Math.min(window.devicePixelRatio, 2);
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    const isMobile = w < 768;
    const divisor = isMobile ? 24000 : 12000;
    const count = Math.floor((w * h) / divisor);
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const isTeal = Math.random() < 0.7;
      const opacity = 0.4 + Math.random() * 0.5;
      const baseColor = isTeal
        ? `rgba(45, 212, 191, ${opacity})`
        : `rgba(200, 150, 62, ${opacity})`;
      const brightColor = isTeal
        ? `rgba(45, 212, 191, ${Math.min(1, opacity + 0.3)})`
        : `rgba(200, 150, 62, ${Math.min(1, opacity + 0.3)})`;

      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: 1.5 + Math.random() * 1.5,
        baseColor,
        brightColor,
      });
    }

    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      particlesRef.current = createParticles(canvas);
    };

    resize();

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      if (touch) {
        mouseRef.current = {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top,
        };
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const CONNECTION_THRESHOLD = 150;
    const CURSOR_RADIUS = 200;
    const MAX_LINE_OPACITY = 0.3;

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Cursor influence
        const dx = p.x - mx;
        const dy = p.y - my;
        const distToCursor = Math.sqrt(dx * dx + dy * dy);

        let radius = p.radius;
        let color = p.baseColor;
        let connectionExt = 0;

        if (distToCursor < CURSOR_RADIUS) {
          const factor = 1 - distToCursor / CURSOR_RADIUS;
          radius = p.radius * (1 + factor * 0.5);
          color = p.brightColor;
          connectionExt = factor * 50;

          // Gentle repulsion
          const force = factor * 0.3;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 0.1;
          p.vy += Math.sin(angle) * force * 0.1;
        }

        // Apply velocity with damping
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.995;
        p.vy *= 0.995;

        // Wrap around edges
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Draw connections
        const threshold = CONNECTION_THRESHOLD + connectionExt;
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ddx = p.x - p2.x;
          const ddy = p.y - p2.y;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy);

          if (dist < threshold) {
            const opacity = (1 - dist / threshold) * MAX_LINE_OPACITY;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(45, 212, 191, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Cursor glow
      if (mx > -100) {
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 300);
        gradient.addColorStop(0, 'rgba(45, 212, 191, 0.05)');
        gradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(mx, my, 300, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    };

    animate();

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 200);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [createParticles]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      role="presentation"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
