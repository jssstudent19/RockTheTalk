'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ScrollWalker.module.css';

export default function ScrollWalker() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDir, setScrollDir] = useState<'down' | 'up'>('down');
  const [walking, setWalking] = useState(false);
  const lastScrollY = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const dir = currentY >= lastScrollY.current ? 'down' : 'up';
        lastScrollY.current = currentY;
        setScrollY(currentY);
        setScrollDir(dir);
        setWalking(true);

        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setWalking(false), 300);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Map scroll position to vertical percentage (0–100) along the page
  const docHeight =
    typeof document !== 'undefined'
      ? document.documentElement.scrollHeight - window.innerHeight
      : 1;
  const pct = docHeight > 0 ? Math.min(100, (scrollY / docHeight) * 100) : 0;

  return (
    <div
      className={styles.walkerContainer}
      style={{ top: `calc(${pct}% - 0px)` }}
      aria-hidden="true"
    >
      <div
        className={`${styles.figure} ${walking ? styles.walking : styles.idle} ${
          scrollDir === 'up' ? styles.facingUp : styles.facingDown
        }`}
      >
        {/* Inline SVG stick figure in brand colors */}
        <svg
          viewBox="0 0 60 120"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.svg}
        >
          {/* Shadow */}
          <ellipse cx="30" cy="115" rx="14" ry="4" fill="rgba(0,0,0,0.25)" />

          {/* Body (torso) */}
          <rect
            x="22" y="42" width="16" height="28"
            rx="4"
            fill="#004165"
            className={styles.torso}
          />

          {/* Badge / logo accent on chest */}
          <circle cx="30" cy="52" r="4" fill="#F2DF74" opacity="0.9" />

          {/* Head */}
          <circle
            cx="30" cy="30" r="13"
            fill="#004165"
            stroke="#F2DF74"
            strokeWidth="2.5"
            className={styles.head}
          />

          {/* Face – simple expression */}
          {/* Eyes */}
          <circle cx="25.5" cy="28" r="2" fill="#F2DF74" />
          <circle cx="34.5" cy="28" r="2" fill="#F2DF74" />
          {/* Smile */}
          <path
            d="M26 34 Q30 38 34 34"
            fill="none"
            stroke="#F2DF74"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Left arm */}
          <line
            x1="22" y1="48"
            x2="10" y2="65"
            stroke="#772432"
            strokeWidth="4"
            strokeLinecap="round"
            className={styles.armLeft}
          />

          {/* Right arm */}
          <line
            x1="38" y1="48"
            x2="50" y2="65"
            stroke="#772432"
            strokeWidth="4"
            strokeLinecap="round"
            className={styles.armRight}
          />

          {/* Left leg */}
          <line
            x1="26" y1="70"
            x2="20" y2="95"
            stroke="#004165"
            strokeWidth="4.5"
            strokeLinecap="round"
            className={styles.legLeft}
          />
          {/* Left foot */}
          <line
            x1="20" y1="95"
            x2="12" y2="98"
            stroke="#004165"
            strokeWidth="3.5"
            strokeLinecap="round"
            className={styles.footLeft}
          />

          {/* Right leg */}
          <line
            x1="34" y1="70"
            x2="40" y2="95"
            stroke="#004165"
            strokeWidth="4.5"
            strokeLinecap="round"
            className={styles.legRight}
          />
          {/* Right foot */}
          <line
            x1="40" y1="95"
            x2="48" y2="98"
            stroke="#004165"
            strokeWidth="3.5"
            strokeLinecap="round"
            className={styles.footRight}
          />


        </svg>

        {/* Walking dust puff */}
        {walking && (
          <span className={styles.dust} aria-hidden="true" />
        )}
      </div>
    </div>
  );
}
