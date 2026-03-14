'use client';

import { useEffect, useRef } from 'react';

// Brand colors from Toastmasters brand manual
const COLORS = [
  '#F2DF74', // happy-yellow
  '#F2DF74', // happy-yellow (weighted)
  '#004165', // loyal-blue
  '#772432', // true-maroon
];

interface Butterfly {
  x: number;
  y: number;
  size: number;
  alpha: number;
  color: string;
  angle: number;       // direction of drift
  speed: number;
  wingPhase: number;   // current wing-beat phase (radians)
  wingSpeed: number;   // radians per frame
  rotation: number;    // body tilt
}

function hexAlpha(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function drawButterfly(ctx: CanvasRenderingContext2D, b: Butterfly) {
  ctx.save();
  ctx.translate(b.x, b.y);
  ctx.rotate(b.rotation);

  const w = b.size;          // half-wingspan
  const wingOpen = Math.abs(Math.sin(b.wingPhase)); // 0 = closed, 1 = fully open

  // ── Upper wings ──────────────────────────────────────────────
  // Left upper wing
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(
    -w * wingOpen, -w * 0.9,
    -w * 1.4 * wingOpen, -w * 0.3,
    -w * 0.6 * wingOpen, w * 0.25
  );
  ctx.closePath();
  ctx.fillStyle = hexAlpha(b.color, b.alpha * 0.85);
  ctx.fill();

  // Right upper wing
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(
    w * wingOpen, -w * 0.9,
    w * 1.4 * wingOpen, -w * 0.3,
    w * 0.6 * wingOpen, w * 0.25
  );
  ctx.closePath();
  ctx.fillStyle = hexAlpha(b.color, b.alpha * 0.85);
  ctx.fill();

  // ── Lower wings ───────────────────────────────────────────────
  // Left lower wing
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(
    -w * 0.9 * wingOpen, w * 0.3,
    -w * 0.9 * wingOpen, w * 0.9,
    -w * 0.15 * wingOpen, w * 0.6
  );
  ctx.closePath();
  ctx.fillStyle = hexAlpha(b.color, b.alpha * 0.65);
  ctx.fill();

  // Right lower wing
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(
    w * 0.9 * wingOpen, w * 0.3,
    w * 0.9 * wingOpen, w * 0.9,
    w * 0.15 * wingOpen, w * 0.6
  );
  ctx.closePath();
  ctx.fillStyle = hexAlpha(b.color, b.alpha * 0.65);
  ctx.fill();

  // ── Body ──────────────────────────────────────────────────────
  ctx.beginPath();
  ctx.ellipse(0, w * 0.25, w * 0.07, w * 0.45, 0, 0, Math.PI * 2);
  ctx.fillStyle = hexAlpha(b.color, b.alpha);
  ctx.fill();

  ctx.restore();
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const butterflies = useRef<Butterfly[]>([]);
  const lastMouse = useRef({ x: -999, y: -999 });
  const animFrame = useRef<number>(0);
  const colorIdx = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Only spawn when moved a bit, 1-2 butterflies
      if (dist < 8) return;

      const count = dist > 25 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        colorIdx.current = (colorIdx.current + 1) % COLORS.length;
        butterflies.current.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          size: Math.random() * 8 + 7,       // 7–15 px
          alpha: 0.9,
          color: COLORS[colorIdx.current],
          angle: -Math.PI / 2 + (Math.random() - 0.5) * Math.PI, // mostly upward
          speed: Math.random() * 0.8 + 0.4,
          wingPhase: Math.random() * Math.PI * 2,
          wingSpeed: Math.random() * 0.18 + 0.14,
          rotation: Math.random() * 0.4 - 0.2,
        });
      }

      lastMouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      butterflies.current = butterflies.current.filter((b) => b.alpha > 0.02);

      for (const b of butterflies.current) {
        b.x += Math.cos(b.angle) * b.speed;
        b.y += Math.sin(b.angle) * b.speed;
        b.wingPhase += b.wingSpeed;
        b.alpha *= 0.95;           // gentle fade
        b.size *= 0.993;           // very slight shrink
        b.angle += (Math.random() - 0.5) * 0.08; // gentle flutter drift
      }

      for (const b of butterflies.current) {
        drawButterfly(ctx, b);
      }

      animFrame.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animFrame.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
      aria-hidden="true"
    />
  );
}
