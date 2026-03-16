'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './Preloader.module.css';

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [lit, setLit] = useState(false);
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);

  // Pull-string drag state
  const stringRef = useRef<SVGLineElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const pullY = useRef(0); // extra pull amount (0‑60px)
  const [pull, setPull] = useState(0);
  const hasTriggered = useRef(false);

  const trigger = useCallback(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;
    setLit(true);
    setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setGone(true);
        onDone();
      }, 800);
    }, 500);
  }, [onDone]);

  /* ── Pointer events on the string knob ── */
  const onPointerDown = (e: React.PointerEvent) => {
    if (hasTriggered.current) return;
    isDragging.current = true;
    startY.current = e.clientY;
    (e.target as Element).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || hasTriggered.current) return;
    const delta = Math.max(0, e.clientY - startY.current);
    pullY.current = Math.min(delta, 70);
    setPull(pullY.current);
    if (pullY.current >= 55) trigger();
  };
  const onPointerUp = () => {
    if (!hasTriggered.current) setPull(0);
    isDragging.current = false;
  };

  /* Prevent body scroll while preloader is visible */
  useEffect(() => {
    document.body.style.overflow = gone ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [gone]);

  if (gone) return null;

  // SVG geometry
  const W = 220, H = 340;
  const cx = W / 2;
  // Cord: from top to bulb cap
  const cordTop = 0;
  const cordBot = 108 + pull;          // stretches as user pulls
  const knobY   = cordBot;
  const knobR   = 7;

  return (
    <div
      className={`${styles.overlay} ${fading ? styles.fadeOut : ''}`}
      role="dialog"
      aria-label="Pull the string to enter"
    >
      {/* Ambient glow backdrop when lit */}
      {lit && <div className={styles.glowBackdrop} />}

      <div className={styles.scene}>
        {/* Hint label */}
        {!lit && (
          <p className={styles.hint}>
            <span className={styles.hintArrow}>↓</span> Pull the string
          </p>
        )}

        <svg
          width={W}
          height={H + 80}
          viewBox={`0 0 ${W} ${H + 80}`}
          className={styles.bulbSvg}
          style={{ filter: lit ? `drop-shadow(0 0 60px rgba(255,215,0,0.9)) drop-shadow(0 0 120px rgba(255,180,0,0.6))` : 'none', transition: 'filter 0.4s ease' }}
        >
          <defs>
            {/* Glass gradient – unlit */}
            <radialGradient id="glassUnlit" cx="40%" cy="35%" r="60%">
              <stop offset="0%"   stopColor="#b0bec5" stopOpacity="0.9"/>
              <stop offset="60%"  stopColor="#546e7a" stopOpacity="0.7"/>
              <stop offset="100%" stopColor="#263238" stopOpacity="0.9"/>
            </radialGradient>
            {/* Glass gradient – lit */}
            <radialGradient id="glassLit" cx="40%" cy="35%" r="60%">
              <stop offset="0%"   stopColor="#fffde7" stopOpacity="1"/>
              <stop offset="40%"  stopColor="#ffd54f" stopOpacity="0.95"/>
              <stop offset="100%" stopColor="#ff8f00" stopOpacity="0.85"/>
            </radialGradient>
            {/* Inner filament glow */}
            <radialGradient id="filamentGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#fff9c4" stopOpacity="1"/>
              <stop offset="100%" stopColor="#ffc107" stopOpacity="0"/>
            </radialGradient>
            {/* Outer halo */}
            <radialGradient id="halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#ffe082" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#ffc107" stopOpacity="0"/>
            </radialGradient>
            <clipPath id="bulbClip">
              <ellipse cx={cx} cy="178" rx="74" ry="82"/>
            </clipPath>
          </defs>

          {/* ── Ceiling mount ── */}
          <rect x={cx - 18} y={cordTop} width={36} height={14} rx={4}
            fill="#37474f" stroke="#546e7a" strokeWidth="1.5"/>

          {/* ── Hanging cord (stretches on pull) ── */}
          <line
            ref={stringRef}
            x1={cx} y1={cordTop + 14}
            x2={cx} y2={cordBot}
            stroke={lit ? '#ffc107' : '#78909c'}
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{ transition: lit ? 'stroke 0.3s' : 'none' }}
          />

          {/* ── Pull knob ── */}
          <g
            style={{ cursor: hasTriggered.current ? 'default' : 'pointer', userSelect: 'none' }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onClick={() => trigger()}
          >
            {/* Invisible larger hit area */}
            <circle cx={cx} cy={knobY} r={22} fill="transparent"/>
            {/* Knob ring */}
            <circle cx={cx} cy={knobY} r={knobR + 3}
              fill="none"
              stroke={lit ? '#ffd54f' : '#546e7a'}
              strokeWidth="1.5"
              style={{ transition: 'stroke 0.3s' }}
            />
            {/* Knob fill */}
            <circle cx={cx} cy={knobY} r={knobR}
              fill={lit ? '#ffc107' : '#607d8b'}
              style={{ transition: 'fill 0.3s' }}
            />
          </g>

          {/* ── Outer halo (lit only) ── */}
          {lit && (
            <ellipse cx={cx} cy="178" rx="110" ry="110"
              fill="url(#halo)"
              className={styles.haloAnim}
            />
          )}

          {/* ── Bulb glass body ── */}
          {/* Main globe shape – two arcs forming a bulb */}
          <path
            d={`
              M ${cx - 74} 178
              C ${cx - 74} 128, ${cx - 55} 98, ${cx} 90
              C ${cx + 55} 98, ${cx + 74} 128, ${cx + 74} 178
              C ${cx + 74} 225, ${cx + 42} 252, ${cx + 32} 262
              L ${cx - 32} 262
              C ${cx - 42} 252, ${cx - 74} 225, ${cx - 74} 178
              Z
            `}
            fill={lit ? 'url(#glassLit)' : 'url(#glassUnlit)'}
            stroke={lit ? '#ffd54f' : '#455a64'}
            strokeWidth="1.5"
            style={{ transition: 'fill 0.35s ease, stroke 0.35s ease' }}
          />

          {/* ── Glass highlight (always) ── */}
          <ellipse cx={cx - 22} cy={148} rx={18} ry={26}
            fill="white"
            opacity={lit ? 0.35 : 0.18}
            style={{ transition: 'opacity 0.4s' }}
          />

          {/* ── Filament glow (lit only) ── */}
          {lit && (
            <ellipse cx={cx} cy="185" rx="55" ry="48"
              fill="url(#filamentGlow)"
              className={styles.filamentAnim}
            />
          )}

          {/* ── Filament wires ── */}
          <g stroke={lit ? '#fff9c4' : '#546e7a'} strokeWidth={lit ? '2' : '1.2'}
            fill="none" strokeLinecap="round"
            style={{ transition: 'stroke 0.35s, stroke-width 0.35s' }}>
            {/* Left wire */}
            <path d={`M ${cx - 10} 220 L ${cx - 18} 185 L ${cx - 8} 170 L ${cx} 180`}/>
            {/* Right wire */}
            <path d={`M ${cx + 10} 220 L ${cx + 18} 185 L ${cx + 8} 170 L ${cx} 180`}/>
            {/* Central coil loops */}
            <path d={`M ${cx - 8} 170 Q ${cx} 160 ${cx + 8} 170 Q ${cx} 180 ${cx - 8} 190 Q ${cx} 200 ${cx + 8} 190`}/>
          </g>

          {/* ── Cap / fixture ── */}
          {/* Top of cap connecting to cord */}
          <rect x={cx - 20} y={88} width={40} height={10} rx={3}
            fill={lit ? '#ffd54f' : '#37474f'}
            stroke={lit ? '#ffc107' : '#546e7a'}
            strokeWidth="1"
            style={{ transition: 'fill 0.35s, stroke 0.35s' }}
          />
          {/* Cap bands */}
          <rect x={cx - 22} y={262} width={44} height={12} rx={2}
            fill={lit ? '#ffc107' : '#37474f'}
            stroke={lit ? '#ffa000' : '#546e7a'}
            strokeWidth="1"
            style={{ transition: 'fill 0.35s, stroke 0.35s' }}
          />
          <rect x={cx - 20} y={274} width={40} height={11} rx={1}
            fill={lit ? '#ffb300' : '#455a64'}
            style={{ transition: 'fill 0.35s' }}
          />
          <rect x={cx - 18} y={285} width={36} height={10} rx={1}
            fill={lit ? '#ffa000' : '#37474f'}
            style={{ transition: 'fill 0.35s' }}
          />
          {/* Bottom screw tip */}
          <ellipse cx={cx} cy={297} rx={14} ry={6}
            fill={lit ? '#ff8f00' : '#263238'}
            style={{ transition: 'fill 0.35s' }}
          />

          {/* ── "LIT" spark rays ── */}
          {lit && (
            <g className={styles.sparkRays} stroke="#ffe082" strokeWidth="1.5" strokeLinecap="round">
              <line x1={cx - 85} y1={158} x2={cx - 100} y2={148}/>
              <line x1={cx + 85} y1={158} x2={cx + 100} y2={148}/>
              <line x1={cx - 78} y1={130} x2={cx - 92} y2={118}/>
              <line x1={cx + 78} y1={130} x2={cx + 92} y2={118}/>
              <line x1={cx}      y1={88}  x2={cx}      y2={72}/>
              <line x1={cx - 50} y1={98}  x2={cx - 60} y2={84}/>
              <line x1={cx + 50} y1={98}  x2={cx + 60} y2={84}/>
            </g>
          )}
        </svg>

        {lit && <p className={styles.litMsg}>Let there be light ✦</p>}
      </div>
    </div>
  );
}
