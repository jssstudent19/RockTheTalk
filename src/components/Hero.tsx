'use client';
import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className={styles.hero} id="hero" aria-label="Hero - Round the clock we rock the talk">
      {/* Background layer */}
      <div ref={bgRef} className={styles.heroBg}>
        <div className={styles.photoBg} />
        <div className={styles.overlay} />
      </div>

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

        <div className={styles.bottomBar}>
          <div className={styles.clubMeta}>
            <span className={styles.metaItem}>
              <span className={styles.metaDot} aria-hidden="true" />
              Club #05843628
            </span>
            <span className={styles.metaItem}>
              <span className={styles.metaDot} aria-hidden="true" />
              Division B2 · Area B2
            </span>
            <span className={styles.metaItem}>
              <span className={styles.metaDot} aria-hidden="true" />
              Every Thursday · 12:30 PM
            </span>
          </div>

          <div className={styles.heroActions}>
            <a href="#constellation" className={styles.btnPrimary}>
              Meet the Team
            </a>
          </div>
        </div>

        {/* TM Tagline */}
        <p className={styles.tmTagline}>Where Leaders Are Made</p>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
        <span className={styles.scrollText}>Scroll</span>
      </div>
    </section>
  );
}
