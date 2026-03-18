'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './Encore.module.css';
import { celebrationPhotos } from '@/lib/data';

const testimonials = [
  {
    quote: "Dive in — it's a game-changer for building confidence and lasting networks!",
    name: 'Rajkumar Gupta',
    title: 'Director, Technical Support',
    photo: '/images/members/Rajkumar.png',
  },
  {
    quote: "Many people stay away thinking there isn't much to gain, but the real journey begins the moment you step onto the stage.",
    name: 'Arogya Daniel J',
    title: 'Sr. Program Manager',
    photo: '/images/members/Arogya Das Daniel.jpg',
  },
  {
    quote: "A fearless environment where members are empowered to experiment, stumble, and succeed — proving we are far more than a workplace.",
    name: 'Kritika Sobti',
    title: 'Sr. Security Researcher',
    photo: '/images/members/Kritika.webp',
  },
  {
    quote: "I've become a much more confident speaker and storyteller. The club provides a supportive community where we encourage one another.",
    name: 'Satrajit Kar',
    title: 'Sr. Manager, Technical Support',
    photo: '/images/members/Satrajit.png',
  },
];

export default function Encore() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const t = testimonials[activeTestimonial];
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
  };

  const stopTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.section} id="encore" aria-label="The Encore – Join Rock The Talk">
      {/* Background Photo Mosaic */}
      <div className={styles.mosaicBg} aria-hidden="true">
        {celebrationPhotos.slice(0, 6).map((src, i) => (
          <div key={i} className={styles.mosaicCell}>
            <img src={src} alt="" loading="lazy" />
            <div className={styles.mosaicOverlay} />
          </div>
        ))}
      </div>

      <div className={`container ${styles.inner}`}>
        {/* Left: Join CTA */}
        <div className={styles.ctaCol}>
          <div className={styles.actBadge}>Act VII — Finale</div>
          <div className="accent-line" />
          <h2 className={`headline-lg ${styles.heading}`}>
            The <span className={styles.headingAccent}>Encore</span>
          </h2>
          <p className={`script-text ${styles.scriptLine}`}>Relax, speak confidently.</p>
          <p className={`body-lg ${styles.body}`}>
            The audience is asking for more — and so are we. Whether you&apos;re a seasoned professional or nervous first-timer, Rock The Talk is your stage.
          </p>
          <div className={styles.meetingInfo}>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>
                {/* Calendar icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <span>Every Thursday · 12:30 PM – 2:00 PM</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoIcon}>
                {/* Building icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="1" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                  <rect x="6" y="12" width="2" height="2" />
                  <rect x="11" y="12" width="2" height="2" />
                  <rect x="16" y="12" width="2" height="2" />
                  <rect x="6" y="16" width="2" height="2" />
                  <rect x="11" y="16" width="2" height="2" />
                  <rect x="16" y="16" width="2" height="2" />
                </svg>
              </span>
              <span>Trellix, Bangalore · Open to all employees</span>
            </div>
          </div>
          <div className={styles.joinActions}>
            <a
              href="https://forms.gle/ZkBdkH44NVh4WKSp7"
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-primary ${styles.joinBtn}`}
            >
              Fill Membership Form
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>

            {/* QR Code option */}
            <div className={styles.qrBlock}>
              <a
                href="https://forms.gle/ZkBdkH44NVh4WKSp7"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.qrLink}
                aria-label="Scan QR code to open membership registration form"
              >
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent('https://forms.gle/ZkBdkH44NVh4WKSp7')}&bgcolor=0d1b2a&color=F2DF74&margin=4`}
                  alt="QR code for membership registration form"
                  width={90}
                  height={90}
                />
              </a>
              <p className={styles.qrLabel}>
                {/* Scan icon */}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{display:'inline',marginRight:'4px',verticalAlign:'middle'}}>
                  <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                  <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                  <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                  <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                </svg>
                Scan to Join
              </p>
            </div>
          </div>

          <p className={styles.freeNote}>Attend as many sessions as a guest without any fee</p>
        </div>

        {/* Right: Testimonials */}
        <div
          className={styles.testimonialCol}
          onMouseEnter={stopTimer}
          onMouseLeave={startTimer}
        >
          <h3 className={`headline-sm ${styles.testimonialLabel}`}>What our members say</h3>
          <div className={styles.testimonialCard}>
            <div className={styles.quoteIcon} aria-hidden="true">&ldquo;</div>
            <p className={styles.quoteText}>{t.quote}</p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorPhoto}>
                <img
                  src={t.photo}
                  alt={t.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=004165&color=F2DF74&size=56&bold=true`;
                  }}
                />
              </div>
              <div>
                <p className={styles.authorName}>{t.name}</p>
                <p className={styles.authorTitle}>{t.title}</p>
              </div>
            </div>
          </div>
          {/* Dots */}
          <div className={styles.dots} role="tablist" aria-label="Testimonials">
            {testimonials.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === activeTestimonial}
                className={`${styles.dot} ${i === activeTestimonial ? styles.dotActive : ''}`}
                onClick={() => setActiveTestimonial(i)}
                aria-label={`Testimonial ${i + 1} from ${testimonials[i].name}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Resources & Links strip ── */}
      <div className={`container ${styles.resourcesStrip}`}>
        <div className={styles.resourcesHeader}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          Resources &amp; Links
        </div>
        <div className={styles.resourcesGrid}>

          {/* ── Club Content ── */}
          <div className={styles.resourceGroup}>
            <p className={styles.resourceGroupLabel}>Club Content</p>
            {[
              {
                label: 'Newsletters', desc: 'Monthly club newsletters',
                href: 'https://drive.google.com/drive/folders/1BXOU33_iOBpcMYzZGJkk8lToMmNm9agF',
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z"/><path d="M16 2v20"/><path d="M8 7h4"/><path d="M8 11h4"/><path d="M8 15h4"/></svg>,
              },
              {
                label: 'Guest Booklet', desc: "First-timer's welcome guide",
                href: 'https://drive.google.com/file/d/1bMxm0IjFRHLNp2hCqaNne2cGUpwwm77-/view?usp=sharing',
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
              },
              {
                label: 'Club Role Taker Reference', desc: 'Role guides & resources',
                href: 'https://drive.google.com/drive/folders/1IvVWGpaWqvLzo-m3ooT1gk0X-5F2eyMx?usp=sharing',
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
              },
            ].map(r => (
              <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer" className={styles.resourceCard}>
                <span className={styles.resourceIcon}>{r.icon}</span>
                <span className={styles.resourceText}>
                  <span className={styles.resourceLabel}>{r.label}</span>
                  <span className={styles.resourceDesc}>{r.desc}</span>
                </span>
                <svg className={styles.resourceArrow} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            ))}
          </div>

          {/* ── Follow Us ── */}
          <div className={styles.resourceGroup}>
            <p className={styles.resourceGroupLabel}>Follow Us</p>
            {[
              {
                label: 'LinkedIn', desc: 'Connect professionally',
                href: 'https://www.linkedin.com/search/results/all/?keywords=rock%20the%20talk%20toastmasters%20club&origin=RICH_QUERY_SUGGESTION&spellCorrectionEnabled=false&heroEntityKey=urn%3Ali%3Aorganization%3A87435437&position=0',
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
              },
              {
                label: 'Instagram', desc: 'Behind-the-scenes moments',
                href: 'https://www.instagram.com/rockthetalk.club/',
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
              },
            ].map(r => (
              <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer" className={styles.resourceCard}>
                <span className={styles.resourceIcon}>{r.icon}</span>
                <span className={styles.resourceText}>
                  <span className={styles.resourceLabel}>{r.label}</span>
                  <span className={styles.resourceDesc}>{r.desc}</span>
                </span>
                <svg className={styles.resourceArrow} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            ))}
          </div>

          {/* ── Toastmasters Intl. ── */}
          <div className={styles.resourceGroup}>
            <p className={styles.resourceGroupLabel}>Toastmasters Intl.</p>
            {[
              {
                label: 'Toastmasters Website', desc: 'Global HQ & resources',
                href: 'https://www.toastmasters.org/',
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
              },
              {
                label: 'Pathways Learning', desc: 'Education program overview',
                href: 'https://www.toastmasters.org/education/pathways',
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
              },
              {
                label: 'Club Meeting Experience', desc: 'What happens at meetings',
                href: 'https://www.toastmasters.org/membership/club-experience',
                icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
              },
            ].map(r => (
              <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer" className={styles.resourceCard}>
                <span className={styles.resourceIcon}>{r.icon}</span>
                <span className={styles.resourceText}>
                  <span className={styles.resourceLabel}>{r.label}</span>
                  <span className={styles.resourceDesc}>{r.desc}</span>
                </span>
                <svg className={styles.resourceArrow} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* The 5-to-9 Challenges strip */}
      <div className={`container ${styles.challengeStrip}`}>
        <h3 className={`headline-sm ${styles.challengeTitle}`}>The 5-to-9 Challenges</h3>
        {[
          { n: '1', label: '1-Minute Impromptu', desc: 'Pick any object and give a 60-second Table Topics speech about it' },
          { n: '2', label: 'New Podcast', desc: 'Sharpen active listening and observe different storytelling techniques' },
          { n: '3', label: 'Speech Idea Journal', desc: 'Spend 5 minutes writing a funny, inspiring, or challenging moment from your day' },
          { n: '4', label: 'Word of the Day', desc: 'Find a new word, learn its meaning, and use it in conversation before bed' },
        ].map((c) => (
          <div key={c.n} className={styles.challengeCard}>
            <div className={styles.challengeNum}>{c.n}</div>
            <p className={styles.challengeLabel}>{c.label}</p>
            <p className={styles.challengeDesc}>{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
