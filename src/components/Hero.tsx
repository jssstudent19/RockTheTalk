'use client';
import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

/* ─── Types ─────────────────────────────────────────── */
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  baseX: number; baseY: number;
  phase: number;   // for organic drift
  speed: number;
}

/* ─── Canvas animation ───────────────────────────────── */
function initCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!;
  let raf: number;
  let W = 0, H = 0;
  let particles: Particle[] = [];
  const COUNT = 70;
  const CONNECTION_DIST = 160;

  // Brand palette (dark bg tones + accent)
  const ACCENT   = 'rgba(255, 208, 0,';    // happy-yellow
  const NODE_CLR = 'rgba(255, 255, 255,';   // white dots
  const LINE_CLR = 'rgba(170, 200, 255,';   // icy-blue lines

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    spawn();
  }

  function spawn() {
    particles = Array.from({ length: COUNT }, () => {
      const x = Math.random() * W;
      const y = Math.random() * H;
      return {
        x, y,
        baseX: x, baseY: y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.004 + 0.002,
      };
    });
  }

  function dist(a: Particle, b: Particle) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  let t = 0;
  function draw() {
    t++;
    ctx.clearRect(0, 0, W, H);

    /* ── Background gradient ── */
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0,   '#000f1f');
    grad.addColorStop(0.5, '#001a35');
    grad.addColorStop(1,   '#0a0010');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    /* ── Moving aurora blob (subtle) ── */
    const cx1 = W * 0.25 + Math.sin(t * 0.005) * W * 0.12;
    const cy1 = H * 0.4  + Math.cos(t * 0.004) * H * 0.12;
    const blob1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, W * 0.35);
    blob1.addColorStop(0,   'rgba(0, 65, 140, 0.18)');
    blob1.addColorStop(1,   'rgba(0, 65, 140, 0)');
    ctx.fillStyle = blob1;
    ctx.fillRect(0, 0, W, H);

    const cx2 = W * 0.75 + Math.cos(t * 0.006) * W * 0.1;
    const cy2 = H * 0.55 + Math.sin(t * 0.005) * H * 0.1;
    const blob2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, W * 0.28);
    blob2.addColorStop(0,   'rgba(140, 10, 20, 0.14)');
    blob2.addColorStop(1,   'rgba(140, 10, 20, 0)');
    ctx.fillStyle = blob2;
    ctx.fillRect(0, 0, W, H);

    /* ── Accent glow near top-left ── */
    const cx3 = W * 0.15 + Math.sin(t * 0.003) * W * 0.07;
    const cy3 = H * 0.2  + Math.cos(t * 0.004) * H * 0.07;
    const blob3 = ctx.createRadialGradient(cx3, cy3, 0, cx3, cy3, W * 0.22);
    blob3.addColorStop(0,   'rgba(255, 208, 0, 0.07)');
    blob3.addColorStop(1,   'rgba(255, 208, 0, 0)');
    ctx.fillStyle = blob3;
    ctx.fillRect(0, 0, W, H);

    /* ── Update & draw particles ── */
    for (const p of particles) {
      // Organic drift: sine wave on top of linear motion
      p.x += p.vx + Math.sin(t * p.speed + p.phase) * 0.35;
      p.y += p.vy + Math.cos(t * p.speed + p.phase) * 0.35;

      // Wrap edges softly
      if (p.x < -20) p.x = W + 20;
      if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20;
      if (p.y > H + 20) p.y = -20;
    }

    /* ── Connection lines ── */
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const d = dist(particles[i], particles[j]);
        if (d < CONNECTION_DIST) {
          const alpha = (1 - d / CONNECTION_DIST) * 0.45;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `${LINE_CLR}${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    /* ── Draw dots ── */
    for (const p of particles) {
      // Some special accent dots (every ~7th)
      const isAccent = particles.indexOf(p) % 7 === 0;
      const pulse = 0.6 + 0.4 * Math.sin(t * 0.04 + p.phase);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * (isAccent ? 1.6 : 1), 0, Math.PI * 2);
      ctx.fillStyle = isAccent
        ? `${ACCENT}${0.7 * pulse})`
        : `${NODE_CLR}${0.55 * pulse})`;

      if (isAccent) {
        // Glow halo for accent dots
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 10);
        glow.addColorStop(0, `${ACCENT}0.15)`);
        glow.addColorStop(1, `${ACCENT}0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 10, 0, Math.PI * 2);
        ctx.fill();
        // Re-draw core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `${ACCENT}${0.85 * pulse})`;
      }
      ctx.fill();
    }

    raf = requestAnimationFrame(draw);
  }

  const ro = new ResizeObserver(resize);
  ro.observe(canvas.parentElement!);
  resize();
  draw();

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
  };
}

/* ─── Component ──────────────────────────────────────── */
export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    return initCanvas(canvasRef.current);
  }, []);

  return (
    <section className={styles.hero} id="hero" aria-label="Hero - Round the clock we rock the talk">
      {/* Animated canvas background */}
      <canvas ref={canvasRef} className={styles.heroBg} aria-hidden="true" />

      {/* Floating brand elements */}
      <div className={styles.ambientShapes}>
        <div className={styles.shape1} />
        <div className={styles.shape2} />
      </div>

      {/* Main typographic content */}
      <div className={`${styles.content} container`}>
        
        <div className={styles.quoteWrapper}>
          <h1 className={styles.dynamicQuote}>
            <span className={styles.line1}>
              <span className={styles.word}>Round</span>
              <span className={styles.word}>the</span>
              <span className={styles.word}>clock</span>
            </span>
            <span className={styles.line2}>
              <span className={styles.word}>we</span>
            </span>
            <span className={styles.line3}>
              <span className={styles.highlightText} data-text="ROCK THE">
                ROCK THE
              </span>
            </span>
            <span className={styles.line4}>
              <span className={styles.filledTalk} data-text="TALK">TALK</span>
            </span>
          </h1>
        </div>




      </div>


    </section>
  );
}
