'use client';
import styles from './Spotlight.module.css';

const winners = [
  {
    name: 'Rajkumar Gupta',
    contest: 'International Speech Contest',
    achievement: 'Won at Area level and represented the club at Division level',
    photo: '/images/members/Rajkumar.png',
  },
  {
    name: 'Taksha Yadav',
    contest: 'Evaluations Contest',
    achievement: 'Won at Area level and represented the club at Division level',
    photo: '/images/members/Taksha.png',
  },
  {
    name: 'Satrajit Kar',
    contest: 'Humorous Speech Contest',
    achievement: 'Won at Club level and represented the club at Area level',
    photo: '/images/members/Satrajit.png',
  },
  {
    name: 'Mrinalini Sarabada',
    contest: 'Table Topics Contest',
    achievement: 'Won at Club level, represented the club, and achieved 3rd place at Area level',
    photo: '/images/members/Mrinalini.jpg',
  },
];

const clubAwards = [
  {
    name: 'Spirit of 92',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    )
  },
  {
    name: 'PR - Essence Award',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="7" strokeOpacity="0.5" />
        <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontSize="8" fontWeight="bold" fill="currentColor" stroke="none">PR</text>
      </svg>
    )
  },
  {
    name: 'R.E.E.L Award',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="17" x2="22" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    )
  },
  {
    name: 'Echos Award',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2" />
        <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
      </svg>
    )
  },
];

const individualAwards = [
  { name: 'Bhanuvishwa Batchu', photo: '/images/members/Bhanuvishwa.png', awards: ['Pathbreaker', 'Triple Crown'] },
  { name: 'Rajkumar Gupta', photo: '/images/members/Rajkumar.png', awards: ['Pathbreaker'] },
  { name: 'Arogya Daniel J', photo: '/images/members/Arogya Das Daniel.jpg', awards: ['Pathbreaker', 'Triple Crown', 'Master-Mentor'] },
  { name: 'Mrinalini Sarabada', photo: '/images/members/Mrinalini.jpg', awards: ['Triple Crown'] },
];

const marqueeItems = [
  "President's Distinguished Club", 'Golden Gavel', 'Division-Level Contest Representatives',
  'Triple Crown Winners', 'Pathbreaker Awards', 'R.E.E.L Award', 'Echos Award',
  'PR–Essence Award', 'Spirit of 92', 'Master-Mentor', 'Area Contest Champions',
];

export default function Spotlight() {
  return (
    <section className={styles.section} id="spotlight" aria-label="The Spotlight – Achievements">

      {/* ── STAGE LIGHTING RIG BACKGROUND ── */}
      <div className={styles.stageRig} aria-hidden="true">
        {/* Crossing spotlight beams — like stage lighting */}
        <div className={`${styles.beam} ${styles.beam1}`} />
        <div className={`${styles.beam} ${styles.beam2}`} />
        <div className={`${styles.beam} ${styles.beam3}`} />
        <div className={`${styles.beam} ${styles.beam4}`} />
        {/* Halo pool at the top — the light source */}
        <div className={styles.rigHalo} />
        {/* Stage floor warm glow at the bottom */}
        <div className={styles.stageFloor} />
        {/* Subtle horizontal gradient lines — stage curtain ribs */}
        <div className={styles.curtainRibs} />
      </div>

      <div className="container">

        {/* ── HEADER ── */}
        <div className={styles.header}>
          <div className={styles.actBadge}>Act III</div>
          <div className="accent-line accent-line--center" />
          <h2 className={`headline-xl ${styles.heading}`}>
            The<br /><span className={styles.headingGold}>Spotlight</span>
          </h2>
          <p className={`body-lg ${styles.subhead}`}>
            2025–26 Season — our voices echoed across<br />
            club, area, and division stages.
          </p>
        </div>

        {/* ── AWARD TICKER ── */}
        <div className={styles.ticker} aria-label="Award highlights">
          <div className={styles.tickerTrack}>
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className={styles.tickerItem}>{item}</span>
            ))}
          </div>
        </div>

        {/* ── CONTEST CHAMPIONS ── */}
        <div className={styles.podiumSection}>
          <p className={`headline-sm ${styles.sectionLabel}`}> Contest Champions</p>

          <div className={styles.winnersGrid}>
            {winners.map((w) => (
              <div key={w.name} className={styles.winnerCard}>
                <div className={styles.winnerPhoto}>
                  <img
                    src={w.photo}
                    alt={w.name}
                    loading="lazy"
                    onError={e => {
                      (e.target as HTMLImageElement).src =
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(w.name)}&background=004165&color=F2DF74&size=300&bold=true`;
                    }}
                  />
                </div>
                <div className={styles.winnerOverlay} aria-hidden="true" />
                <div className={styles.winnerBody}>
                  <h3 className={styles.winnerName}>{w.name}</h3>
                  <p className={styles.winnerContest}>{w.contest}</p>
                  <p className={styles.winnerAchievement}>{w.achievement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CLUB AWARDS ── */}
        <div className={styles.clubAwardsSection}>
          <p className={`headline-sm ${styles.sectionLabel}`}>Club Awards</p>
          <div className={styles.clubAwardGrid}>
            {clubAwards.map((ca, idx) => (
              <div key={ca.name} className={styles.clubAwardCard} style={{ animationDelay: `${idx * 0.15}s` }}>
                <div className={styles.clubAwardIconWrap}>
                  <div className={styles.clubAwardGlow} aria-hidden="true" />
                  <div className={styles.clubAwardSvgOuter}>
                    {ca.svg}
                  </div>
                  <div className={styles.clubAwardRing} aria-hidden="true" />
                </div>
                <h4 className={styles.clubAwardName}>{ca.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* ── INDIVIDUAL AWARDS ── */}
        <div className={styles.individualAwardsSection}>
          <p className={`headline-sm ${styles.sectionLabel}`}>Individual Awards</p>
          <div className={styles.individualGrid}>
            {individualAwards.map((person, idx) => (
              <div key={person.name} className={styles.indivCard} style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className={styles.indivPhotoWrap}>
                  <img src={person.photo} alt={person.name} loading="lazy"
                    onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=004165&color=F2DF74&size=150&bold=true`; }} />
                  <div className={styles.indivFrame} aria-hidden="true" />
                </div>
                <h4 className={styles.indivName}>{person.name}</h4>
                <div className={styles.indivDivider} aria-hidden="true" />
                <ul className={styles.indivAwardsList}>
                  {person.awards.map((awardName, i) => (
                    <li key={i} className={styles.indivAwardItem}>
                      <svg className={styles.starBullet} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      {awardName}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── PHOTO IMMERSIVE STRIP ── */}
        <div className={styles.immersiveStrip}>
          {[
            '/images/celebrations/WhatsApp Image 2026-02-18 at 11.08.09.jpeg',
            '/images/celebrations/WhatsApp Image 2026-03-13 at 20.31.09 (2).jpeg',
            '/images/celebrations/WhatsApp Image 2026-03-13 at 20.31.09 (3).jpeg',
            '/images/celebrations/WhatsApp Image 2026-03-13 at 20.31.09 (4).jpeg',
            '/images/celebrations/WhatsApp Image 2026-02-18 at 11.08.12.jpeg',
          ].map((src, i) => (
            <div key={i} className={styles.stripItem}>
              <img src={src} alt="Club celebration" loading="lazy" />
              <div className={styles.stripGradient} aria-hidden="true" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
