'use client';
import { useEffect, useRef } from 'react';
import styles from './Gallery.module.css';

// Only images NOT used in Spotlight or Hero
const galleryPhotos = [
  { src: '/images/celebrations/WhatsApp Image 2026-02-18 at 11.08.10.jpeg',    caption: 'Club Energy',       tilt: '-4deg' },
  { src: '/images/celebrations/WhatsApp Image 2026-02-18 at 11.08.11 (1).jpeg', caption: 'Together We Rise',  tilt: '3deg'  },
  { src: '/images/celebrations/WhatsApp Image 2026-02-18 at 11.08.11.jpeg',     caption: 'RTT Moments',      tilt: '-2deg' },
  { src: '/images/celebrations/WhatsApp Image 2026-03-13 at 20.31.08.jpeg',     caption: 'Stage & Smiles',   tilt: '5deg'  },
  { src: '/images/celebrations/WhatsApp Image 2026-03-13 at 20.31.09 (1).jpeg', caption: 'Victory Lap',      tilt: '-3deg' },
  { src: '/images/celebrations/WhatsApp Image 2026-03-13 at 20.31.09.jpeg',     caption: 'Season Highlights', tilt: '2deg' },
  { src: '/images/celebrations/WhatsApp Image 2026-03-14 at 04.58.27.jpeg',     caption: 'The Grand Finale', tilt: '-5deg' },
];

// Predefined shooting star configs to avoid SSR/hydration random mismatch
const SHOOTING_STARS = [
  { top: '8%',  left: '10%', delay: '0s',    duration: '3.2s', size: 120 },
  { top: '22%', left: '55%', delay: '4.5s',  duration: '2.8s', size: 90  },
  { top: '5%',  left: '75%', delay: '8s',    duration: '3.5s', size: 150 },
  { top: '40%', left: '20%', delay: '12s',   duration: '2.5s', size: 80  },
  { top: '15%', left: '38%', delay: '16s',   duration: '4s',   size: 110 },
  { top: '60%', left: '65%', delay: '20s',   duration: '3s',   size: 95  },
  { top: '30%', left: '85%', delay: '24s',   duration: '2.8s', size: 130 },
];

// Predefined star positions for 3 layers (avoid random on each render)
const STARS_S = Array.from({ length: 80 },  (_, i) => ({ x: (i * 137.508) % 100, y: (i * 97.654) % 100, d: i * 0.18 % 3 }));
const STARS_M = Array.from({ length: 45 },  (_, i) => ({ x: (i * 211.34)  % 100, y: (i * 173.21) % 100, d: i * 0.25 % 4 }));
const STARS_L = Array.from({ length: 20 },  (_, i) => ({ x: (i * 317.77)  % 100, y: (i * 249.83) % 100, d: i * 0.35 % 5 }));

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(`.${styles.polaroid}`);
    if (!cards) return;
    const io = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add(styles.visible); }); },
      { threshold: 0.12 }
    );
    cards.forEach((card) => io.observe(card));
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.section} id="gallery" ref={sectionRef} aria-label="Club 2025-26 Gallery">

      {/* ══ NIGHT SKY CANVAS ══════════════════════════════ */}
      <div className={styles.nightSky} aria-hidden="true">

        {/* Deep space gradient base */}
        <div className={styles.spaceBase} />

        {/* Milky Way diagonal band */}
        <div className={styles.milkyWay} />

        {/* Nebula clouds — brand colors */}
        <div className={styles.nebula1} />
        <div className={styles.nebula2} />
        <div className={styles.nebula3} />
        <div className={styles.nebula4} />

        {/* Star field — small */}
        {STARS_S.map((s, i) => (
          <div key={`ss-${i}`} className={styles.starS}
            style={{ left: `${s.x}%`, top: `${s.y}%`, animationDelay: `${s.d}s` }} />
        ))}

        {/* Star field — medium */}
        {STARS_M.map((s, i) => (
          <div key={`sm-${i}`} className={styles.starM}
            style={{ left: `${s.x}%`, top: `${s.y}%`, animationDelay: `${s.d}s` }} />
        ))}

        {/* Star field — large (golden brand tint) */}
        {STARS_L.map((s, i) => (
          <div key={`sl-${i}`} className={styles.starL}
            style={{ left: `${s.x}%`, top: `${s.y}%`, animationDelay: `${s.d}s` }} />
        ))}

        {/* Shooting stars */}
        {SHOOTING_STARS.map((ss, i) => (
          <div key={`shoot-${i}`} className={styles.shootingStarWrap}
            style={{ top: ss.top, left: ss.left, animationDelay: ss.delay, animationDuration: ss.duration }}>
            <div className={styles.shootingStar} style={{ width: `${ss.size}px` }} />
          </div>
        ))}

        {/* Horizon atmospheric glow */}
        <div className={styles.horizon} />

        {/* Subtle scan-line grain overlay */}
        <div className={styles.spaceGrain} />
      </div>

      {/* ══ SECTION HEADER ════════════════════════════════ */}
      <div className={`container ${styles.header}`}>
        <div className={styles.actBadge}>Act VI</div>
        <div className={styles.badge}>
          <span className={styles.badgeStar}>✦</span>
          Moments
          <span className={styles.badgeStar}>✦</span>
        </div>
        <h2 className={styles.heading}>
          Club&nbsp;<span className={styles.headingYear}>2025–26</span>
          <br />
          <span className={styles.headingAccent}>Gallery</span>
        </h2>
        <p className={styles.subhead}>
          Frames from our finest season — every meeting, every win, every laugh.
        </p>
        <div className={styles.constellationLine} aria-hidden="true">
          {Array.from({ length: 7 }).map((_, i) => (
            <span key={i} className={styles.constellationDot} style={{ animationDelay: `${i * 0.4}s` }} />
          ))}
        </div>
      </div>

      {/* ══ POLAROID SCATTER GRID ═════════════════════════ */}
      <div className={`container ${styles.scatterWrap}`}>
        <div className={styles.scatterGrid}>
          {galleryPhotos.map((photo, index) => (
            <div key={index} className={styles.polaroid}
              style={{ '--tilt': photo.tilt, '--delay': `${index * 0.13}s` } as React.CSSProperties}>
              <div className={styles.polaroidInner}>
                <div className={styles.photoFrame}>
                  <img src={photo.src} alt={`Club moment — ${photo.caption}`}
                    className={styles.photo} loading="lazy" />
                  <div className={styles.photoSheen} aria-hidden="true" />
                </div>
                <div className={styles.captionStrip}>
                  <span className={styles.captionText}>{photo.caption}</span>
                  <span className={styles.captionStar}>✦</span>
                </div>
              </div>
              <div className={styles.polaroidShadow} aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>

      {/* ══ BOTTOM FILM-HOLE BAR ══════════════════════════ */}
      <div className={styles.filmStrip} aria-hidden="true">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className={styles.filmHole} />
        ))}
      </div>

    </section>
  );
}
