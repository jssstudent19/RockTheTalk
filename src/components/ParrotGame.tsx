'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './ParrotGame.module.css';

/* ─────────────────────────────────────────────────────────────
   Parrot SVG — Toastmaster brand colours with glow & detail
───────────────────────────────────────────────────────────── */
const ParrotSVG = ({ glowing = false }: { glowing?: boolean }) => (
  <svg
    viewBox="0 0 80 80"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ filter: glowing ? 'drop-shadow(0 0 8px #F2DF74cc)' : 'drop-shadow(0 3px 6px rgba(0,0,0,0.4))' }}
  >
    {/* Tail feathers */}
    <ellipse cx="32" cy="66" rx="4" ry="12" fill="#002a42" transform="rotate(-10 32 66)" />
    <ellipse cx="40" cy="68" rx="4" ry="14" fill="#004165" transform="rotate(0 40 68)" />
    <ellipse cx="48" cy="66" rx="4" ry="12" fill="#002a42" transform="rotate(10 48 66)" />

    {/* Body */}
    <ellipse cx="40" cy="46" rx="18" ry="22" fill="#004165" />

    {/* Chest accent */}
    <ellipse cx="40" cy="50" rx="10" ry="13" fill="#00538a" opacity="0.6" />

    {/* Wing left */}
    <ellipse cx="22" cy="50" rx="9" ry="15" fill="#772432" transform="rotate(-18 22 50)" />
    <ellipse cx="22" cy="50" rx="5" ry="11" fill="#8b3040" transform="rotate(-18 22 50)" />

    {/* Wing right */}
    <ellipse cx="58" cy="50" rx="9" ry="15" fill="#772432" transform="rotate(18 58 50)" />
    <ellipse cx="58" cy="50" rx="5" ry="11" fill="#8b3040" transform="rotate(18 58 50)" />

    {/* Neck */}
    <ellipse cx="40" cy="26" rx="9" ry="7" fill="#004165" />

    {/* Head */}
    <circle cx="40" cy="20" r="14" fill="#004165" />

    {/* Crest feathers */}
    <ellipse cx="35" cy="7"  rx="3" ry="7" fill="#772432" transform="rotate(-15 35 7)" />
    <ellipse cx="40" cy="5"  rx="3" ry="8" fill="#A9B2B1" />
    <ellipse cx="45" cy="7"  rx="3" ry="7" fill="#772432" transform="rotate(15 45 7)" />

    {/* Face patch */}
    <ellipse cx="40" cy="22" rx="9" ry="8" fill="#F2DF74" />

    {/* Eye left */}
    <circle cx="33" cy="17" r="4" fill="#fff" />
    <circle cx="34" cy="17" r="2.2" fill="#111" />
    <circle cx="34.6" cy="16.2" r="0.8" fill="#fff" opacity="0.9" />

    {/* Eye right */}
    <circle cx="47" cy="17" r="4" fill="#fff" />
    <circle cx="46" cy="17" r="2.2" fill="#111" />
    <circle cx="46.6" cy="16.2" r="0.8" fill="#fff" opacity="0.9" />

    {/* Beak upper */}
    <path d="M36 25 Q40 32 44 25 Q40 28 36 25 Z" fill="#772432" />
    {/* Beak lower */}
    <path d="M37 27 Q40 31 43 27 Q40 30 37 27 Z" fill="#5a1a24" />

    {/* Brand badge on chest */}
    <circle cx="40" cy="43" r="5" fill="#F2DF74" opacity="0.85" />
    <text x="40" y="46.5" fontSize="6" fontWeight="900" fill="#004165" textAnchor="middle" fontFamily="Montserrat, sans-serif">TM</text>
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   Stick-figure mascot SVG (same as ScrollWalker)
───────────────────────────────────────────────────────────── */
const MascotSVG = ({ walking, facingUp }: { walking: boolean; facingUp: boolean }) => (
  <svg
    viewBox="0 0 60 120"
    xmlns="http://www.w3.org/2000/svg"
    className={`${styles.svg} ${walking ? styles.walking : styles.idle} ${facingUp ? styles.facingUp : ''}`}
  >
    {/* Shadow */}
    <ellipse cx="30" cy="115" rx="14" ry="4" fill="rgba(0,0,0,0.25)" />
    {/* Torso */}
    <rect x="22" y="42" width="16" height="28" rx="4" fill="#004165" className={styles.torso} />
    {/* Badge */}
    <circle cx="30" cy="52" r="4" fill="#F2DF74" opacity="0.9" />
    {/* Head */}
    <circle cx="30" cy="30" r="13" fill="#004165" stroke="#F2DF74" strokeWidth="2.5" className={styles.head} />
    {/* Eyes */}
    <circle cx="25.5" cy="28" r="2" fill="#F2DF74" />
    <circle cx="34.5" cy="28" r="2" fill="#F2DF74" />
    {/* Smile */}
    <path d="M26 34 Q30 38 34 34" fill="none" stroke="#F2DF74" strokeWidth="1.8" strokeLinecap="round" />
    {/* Arms */}
    <line x1="22" y1="48" x2="10" y2="65" stroke="#772432" strokeWidth="4" strokeLinecap="round" className={styles.armLeft} />
    <line x1="38" y1="48" x2="50" y2="65" stroke="#772432" strokeWidth="4" strokeLinecap="round" className={styles.armRight} />
    {/* Legs */}
    <line x1="26" y1="70" x2="20" y2="95" stroke="#004165" strokeWidth="4.5" strokeLinecap="round" className={styles.legLeft} />
    <line x1="20" y1="95" x2="12" y2="98" stroke="#004165" strokeWidth="3.5" strokeLinecap="round" className={styles.footLeft} />
    <line x1="34" y1="70" x2="40" y2="95" stroke="#004165" strokeWidth="4.5" strokeLinecap="round" className={styles.legRight} />
    <line x1="40" y1="95" x2="48" y2="98" stroke="#004165" strokeWidth="3.5" strokeLinecap="round" className={styles.footRight} />
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   Random position across full document dimensions
───────────────────────────────────────────────────────────── */
function randomPositions(count: number) {
  const scrollH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, window.innerHeight);
  const scrollW = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, window.innerWidth);
  const MARGIN = 90;
  // avoid bottom-right walker zone
  const walkerZone = { x: scrollW - 200, y: scrollH - 200 };

  return Array.from({ length: count }, (_, i) => {
    let top: number, left: number, attempts = 0;
    do {
      top  = MARGIN + Math.random() * (scrollH - MARGIN * 3);
      left = MARGIN + Math.random() * (scrollW - MARGIN * 3);
      attempts++;
    } while (left > walkerZone.x && top > walkerZone.y && attempts < 30);
    return { id: i, top, left, found: false };
  });
}

interface ParrotState { id: number; top: number; left: number; found: boolean; }

const TOTAL_PARROTS = 4;
const GAME_SECONDS  = 30;

/* ─────────────────────────────────────────────────────────────
   Main component — owns both the walking mascot and the game
───────────────────────────────────────────────────────────── */
export default function ParrotGame() {
  /* ── Scroll tracking ── */
  const [scrollPct, setScrollPct]   = useState(0);
  const [walking,  setWalking]      = useState(false);
  const [facingUp, setFacingUp]     = useState(false);
  const lastY   = useRef(0);
  const walkRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef  = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        setScrollPct(docH > 0 ? Math.min(100, (y / docH) * 100) : 0);
        setFacingUp(y < lastY.current);
        lastY.current = y;
        setWalking(true);
        if (walkRef.current) clearTimeout(walkRef.current);
        walkRef.current = setTimeout(() => setWalking(false), 350);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (walkRef.current) clearTimeout(walkRef.current);
      if (rafRef.current)  cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── Game state ── */
  const [phase, setPhase]         = useState<'idle' | 'preview' | 'active' | 'won' | 'lost'>('idle');
  const [parrots, setParrots]     = useState<ParrotState[]>([]);
  const [timeLeft, setTimeLeft]   = useState(GAME_SECONDS);
  const [found, setFound]         = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const showPreview = useCallback(() => setPhase('preview'), []);

  const startGame = useCallback(() => {
    setParrots(randomPositions(TOTAL_PARROTS));
    setFound(0);
    setTimeLeft(GAME_SECONDS);
    setPhase('active');
  }, []);

  useEffect(() => {
    if (phase !== 'active') return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current!); setPhase('lost'); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [phase]);

  const handleParrotClick = useCallback((id: number) => {
    if (phase !== 'active') return;
    setParrots(prev => prev.map(p => p.id === id ? { ...p, found: true } : p));
    setFound(prev => {
      const next = prev + 1;
      if (next === TOTAL_PARROTS) {
        clearInterval(timerRef.current!);
        setTimeout(() => setPhase('won'), 600);
      }
      return next;
    });
  }, [phase]);

  /* ── Timer colour ── */
  const timerCls = timeLeft <= 10 ? styles.timerDanger : timeLeft <= 20 ? styles.timerWarn : styles.timerOk;

  /* ── Walker position: clamp so it stays fully on screen ── */
  const walkerTop = `calc(${scrollPct}vh - 0px)`;

  return (
    <>
      {/* ── Walking mascot + attached game UI ── */}
      <div
        className={styles.walkerContainer}
        style={{ top: walkerTop }}
        aria-label="Toastmasters mascot"
      >
        {/* Speech bubble — always visible, context-aware */}
        <div className={`${styles.bubble} ${walking ? styles.bubbleHidden : ''}`}>
          {phase === 'idle' && (
            <span>Help me find my 4 parrots!</span>
          )}
          {phase === 'active' && (
            <span>
              Find <strong>{TOTAL_PARROTS - found}</strong> more!&nbsp;
              <span className={timerCls}>{timeLeft}s</span>
            </span>
          )}
          {phase === 'won'  && <span>Thank you! 🎉 You're awesome!</span>}
          {phase === 'lost' && <span>Oh no, time's up! 😢</span>}
        </div>

        {/* The mascot figure */}
        <MascotSVG walking={walking} facingUp={facingUp} />

        {/* Dust puff while walking */}
        {walking && <span className={styles.dust} aria-hidden="true" />}

        {/* Help / Retry button — attached below mascot */}
        {phase === 'idle' && (
          <button className={styles.helpBtn} onClick={showPreview} aria-label="Start parrot hunt">
            Start
          </button>
        )}
        {phase === 'lost' && (
          <button className={styles.helpBtn} onClick={startGame} aria-label="Try again">
            Try Again
          </button>
        )}
      </div>

      {/* ── Preview modal ── */}
      {phase === 'preview' && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-label="Parrot preview">
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>Find the Hidden Parrots!</h2>
            <p className={styles.modalBody}>
              4 parrots are hiding across the page. You have <strong>30 seconds</strong> to find them all!
            </p>
            <p className={styles.modalBodySmall}>Here is who you are looking for:</p>
            <div className={styles.previewParrot}>
              <ParrotSVG glowing />
            </div>
            <button
              className={styles.modalBtn}
              onClick={startGame}
              aria-label="Let's go – start the game"
            >
              Let&apos;s Go!
            </button>
          </div>
        </div>
      )}

      {/* ── Parrots scattered across full page ── */}
      {phase === 'active' &&
        parrots.map(p =>
          !p.found ? (
            <button
              key={p.id}
              className={`${styles.parrot} ${styles.parrotIdle}`}
              style={{ top: p.top, left: p.left }}
              onClick={() => handleParrotClick(p.id)}
              aria-label={`Parrot ${p.id + 1} – click to catch`}
            >
              <ParrotSVG />
            </button>
          ) : (
            <div
              key={p.id}
              className={`${styles.parrot} ${styles.parrotFound}`}
              style={{ top: p.top, left: p.left }}
              aria-hidden="true"
            >
              <ParrotSVG glowing />
            </div>
          )
        )}

      {/* ── Win modal ── */}
      {phase === 'won' && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-label="You won">
          <div className={styles.modal}>
            <div className={styles.modalParrots}>
              {[0, 1, 2, 3].map(i => (
                <div key={i} className={styles.modalParrot} style={{ animationDelay: `${i * 0.12}s` }}>
                  <ParrotSVG glowing />
                </div>
              ))}
            </div>
            <h2 className={styles.modalTitle}>All Parrots Found! 🎉</h2>
            <p className={styles.modalBody}>
              Amazing! You reunited all four parrots in record time. The flock thanks you!
            </p>
            <button
              className={styles.modalBtn}
              onClick={() => setPhase('idle')}
              aria-label="Close thank you message"
            >
              You&apos;re Welcome
            </button>
          </div>
        </div>
      )}
    </>
  );
}
