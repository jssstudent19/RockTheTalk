'use client';
import { useEffect, useRef } from 'react';
import styles from './GreenRoom.module.css';

// ── TOASTMASTERS INTERNATIONAL DATA ──
const tmValues = [
  { label: 'Integrity', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { label: 'Respect', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
  { label: 'Service', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { label: 'Excellence', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> },
];

const tmStats = [
  { value: '300,000+', label: 'Members Worldwide' },
  { value: '15,800+', label: 'Clubs Globally' },
  { value: '149',     label: 'Countries' },
  { value: '100+',    label: 'Years of Legacy' },
];

// ── ROCK THE TALK DATA ──
const clubStats = [
  { value: '9+', label: 'Years Strong' },
  { value: '30+', label: 'Active Members' },
  { value: '#05843628', label: 'Club Number' },
  { value: '2016', label: 'Chartered Year' },
];

function animateCounter(el: HTMLElement, target: number, duration = 2000) {
  const start = performance.now();
  const update = (now: number) => {
    const elapsed = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - elapsed, 3);
    el.textContent = Math.round(ease * target).toLocaleString();
    if (elapsed < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

export default function GreenRoom() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); }); },
      { threshold: 0.12 }
    );
    revealEls.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.section} id="green-room" ref={sectionRef} aria-label="A Safe Space To Fail – About">

      {/* ── ACT BADGE HEADER ─────────────────────── */}
      <div className={`container ${styles.actHeader}`}>
        <div className={styles.actBadge}>Act I</div>
        <div className="accent-line accent-line--center" />
        <h2 className={`headline-lg ${styles.heading} reveal`}>
          A Safe Space <span className={styles.headingAccent}>To Fail</span>
        </h2>
        <p className={`script-text ${styles.scriptSubhead} reveal reveal-delay-1`}>
          Where leaders are made
        </p>
      </div>

      {/* ════════════════════════════════════════════
          PANEL A — TOASTMASTERS INTERNATIONAL
          Dark blue background, global brand authority
      ════════════════════════════════════════════ */}
      <div className={styles.tmPanel}>
        <div className={styles.tmPanelBg} aria-hidden="true" />
        <div className={`container ${styles.tmInner}`}>

          {/* Left: TM Brand Block */}
          <div className={`${styles.tmBrandCol} reveal`}>
            <div className={styles.tmLogoWrap}>
              {/* Official Toastmasters International logo */}
              <img
                src="/images/ToastmastersLogo.png"
                alt="Toastmasters International"
                className={styles.tmLogoImg}
              />
              <div className={styles.tmBrandText}>
                <span className={styles.tmBrandLine1}>Toastmasters</span>
                <span className={styles.tmBrandLine2}>International</span>
              </div>
            </div>
            <p className={`body-lg ${styles.tmDesc}`}>
              A non-profit, educational world leader in <strong>communication and leadership development</strong> — empowering individuals to find their voice since 1924.
            </p>
            <div className={styles.tmMissionVision}>
              <div className={styles.mvCard}>
                <div className={styles.mvLabel}>Vision</div>
                <p className={styles.mvText}>To be the first-choice provider of dynamic, high-value, experiential communication and leadership skills development.</p>
              </div>
              <div className={styles.mvCard}>
                <div className={styles.mvLabel}>Mission</div>
                <p className={styles.mvText}>We empower individuals to become more effective communicators and leaders.</p>
              </div>
            </div>
          </div>

          {/* Right: TM Stats + Values */}
          <div className={`${styles.tmStatsCol} reveal reveal-delay-1`}>
            <div className={styles.tmStatsGrid}>
              {tmStats.map((s) => (
                <div key={s.label} className={styles.tmStatCard}>
                  <div className={styles.tmStatValue}>{s.value}</div>
                  <div className={styles.tmStatLabel}>{s.label}</div>
                </div>
              ))}
            </div>
            <div className={styles.tmValuesBlock}>
              <p className={styles.tmValuesTitle}>Core Values — R.I.S.E</p>
              <div className={styles.tmValuesGrid}>
                {tmValues.map((v) => (
                  <div key={v.label} className={styles.tmValueItem}>
                    <div className={styles.tmValueIcon}>{v.icon}</div>
                    <span className={styles.tmValueLabel}>{v.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ════════════════════════════════════════════
          PANEL B — ROCK THE TALK CLUB
          Light/warm background, club personality
      ════════════════════════════════════════════ */}
      <div className={styles.rttPanel}>
        <div className={`container ${styles.rttInner}`}>

          {/* Left: Club photo */}
          <div className={`${styles.rttPhotoCol} reveal`}>
            <div className={styles.rttImgFrame}>
              <img
                src="/images/celebrations/WhatsApp Image 2026-02-18 at 11.08.09.jpeg"
                alt="Rock The Talk club meeting"
                className={styles.rttImg}
              />
              <div className={styles.rttImgOverlay} aria-hidden="true" />
              <div className={styles.rttImgBadge}>
                <span className={styles.rttImgBadgeNum}>#05843628</span>
                <span className={styles.rttImgBadgeSub}>Chartered Oct 1, 2016</span>
              </div>
            </div>
            {/* Club quick stats row */}
            <div className={styles.rttStatsRow}>
              {clubStats.map((s) => (
                <div key={s.label} className={styles.rttStatItem}>
                  <div className={styles.rttStatValue}>{s.value}</div>
                  <div className={styles.rttStatLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Club narrative */}
          <div className={`${styles.rttTextCol} reveal reveal-delay-1`}>
            <div className={styles.rttChip}>Rock The Talk</div>
            <h3 className={`headline-md ${styles.rttHeading}`}>
              About <span className={styles.rttAccent}>Our Club</span>
            </h3>
            <p className={`body-lg ${styles.rttBody}`}>
              Rock The Talk was chartered on <strong>1st October 2016</strong> and has been going strong ever since — thanks to the passion and commitment of our members and Club officers.
            </p>

            {/* Three club pillars */}
            <div className={styles.rttPillars}>
              <div className={styles.rttPillar}>
                <div className={styles.rttPillarIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <div>
                  <div className={styles.rttPillarTitle}>What We Do</div>
                  <p className={styles.rttPillarDesc}>We provide a supportive and positive learning experience where members develop communication and leadership skills.</p>
                </div>
              </div>
              <div className={styles.rttPillar}>
                <div className={styles.rttPillarIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
                  </svg>
                </div>
                <div>
                  <div className={styles.rttPillarTitle}>Our Values</div>
                  <p className={styles.rttPillarDesc}>Guided by Toastmasters, we believe in integrity, excellence and learning through conscientious engagement and participation.</p>
                </div>
              </div>
              <div className={styles.rttPillar}>
                <div className={styles.rttPillarIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div>
                  <div className={styles.rttPillarTitle}>We Meet</div>
                  <p className={styles.rttPillarDesc}>Every <strong>Thursday, 12:30 – 2:00 PM</strong>. Every meeting is a carefully crafted arc of growth and connection.</p>
                </div>
              </div>
            </div>

            {/* Director quotes */}
            <blockquote className={styles.rttQuote}>
              <p className={styles.rttQuoteText}>&ldquo;What truly defines Rock The Talk is its ability to nurture confident communicators and thoughtful leaders.&rdquo;</p>
              <cite className={styles.rttQuoteCite}>— Shashank Bhat, Division B Director</cite>
            </blockquote>
          </div>

        </div>
      </div>

    </section>
  );
}
