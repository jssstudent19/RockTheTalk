'use client';
import { useEffect, useRef } from 'react';
import styles from './LingoSection.module.css';

export default function LingoSection() {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── Scroll reveal ──
    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); }); },
      { threshold: 0.12 }
    );
    revealEls.forEach(el => io.observe(el));

    // ── 3-D tilt on mouse move ──
    const frame = imgRef.current;
    if (!frame) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = frame.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);   // -1 … +1
      const dy = (e.clientY - cy) / (rect.height / 2);  // -1 … +1
      const rotX = (-dy * 6).toFixed(2);
      const rotY = (dx * 8).toFixed(2);
      frame.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`;
    };
    const handleMouseLeave = () => {
      frame.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    };

    frame.addEventListener('mousemove', handleMouseMove);
    frame.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      io.disconnect();
      frame.removeEventListener('mousemove', handleMouseMove);
      frame.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className={styles.section} id="lingo" aria-label="Decode the Toastmasters Lingo">

      {/* ── Decorative background sparks ── */}
      <div className={styles.bgSparks} aria-hidden="true">
        <span className={`${styles.spark} ${styles.spark1}`} />
        <span className={`${styles.spark} ${styles.spark2}`} />
        <span className={`${styles.spark} ${styles.spark3}`} />
        <span className={`${styles.spark} ${styles.spark4}`} />
      </div>

      <div className="container">

        {/* ── Section Header ── */}
        <div className={`${styles.header} reveal`}>
          <div className={styles.actBadge}>Decode</div>
          <div className="accent-line accent-line--center" />
          <h2 className={`headline-lg ${styles.heading}`}>
            Toastmasters{' '}
            <span className={styles.headingAccent}>Lingo</span>
          </h2>
          <p className={`body-lg ${styles.subhead}`}>
            New here? Every meeting has a cast. Here&rsquo;s your programme.
          </p>
        </div>

        {/* ── Framed Poster ── */}
        <div className={`${styles.posterWrap} reveal reveal-delay-1`}>

          {/* Corner stars */}
          <span className={`${styles.corner} ${styles.cornerTL}`} aria-hidden="true">✦</span>
          <span className={`${styles.corner} ${styles.cornerTR}`} aria-hidden="true">✦</span>
          <span className={`${styles.corner} ${styles.cornerBL}`} aria-hidden="true">✦</span>
          <span className={`${styles.corner} ${styles.cornerBR}`} aria-hidden="true">✦</span>

          {/* Tilt container */}
          <div className={styles.tiltFrame} ref={imgRef}>

            {/* Shimmer overlay */}
            <div className={styles.shimmer} aria-hidden="true" />

            <img
              src="/images/ToastmasterLingo.jpg"
              alt="Decode the Toastmasters Lingo — a visual guide to meeting roles"
              className={styles.lingoImg}
              draggable={false}
            />
          </div>
        </div>

        {/* ── Bottom caption ── */}
        <p className={`${styles.caption} reveal reveal-delay-2`}>
          From TMOD to Grammarian — every role powers the show.
        </p>

      </div>
    </section>
  );
}
