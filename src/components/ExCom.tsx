'use client';
import { useState } from 'react';
import styles from './ExCom.module.css';

const excomJulDec = [
  { role: 'President', name: 'Taksha Yadav', photo: '/images/members/Taksha.png' },
  { role: 'Immediate Past President', name: 'Arogya Das Daniel', photo: '/images/members/Arogya Das Daniel.jpg' },
  { role: 'VP – Education', name: 'Nandini NR', photo: '/images/members/Nandini.jpg' },
  { role: 'VP – Membership', name: 'Gowtham T', photo: '/images/members/Gowtham.jpeg' },
  { role: 'VP – Public Relations', name: 'Jatin Kumar', photo: '/images/members/Jatin.png' },
  { role: 'Secretary', name: 'Adithya Varma', photo: '/images/members/Adithya.jpg' },
  { role: 'Treasurer', name: 'Jaishankar U', photo: '/images/members/Jaishankar.jpg' },
  { role: 'Sergeant at Arms', name: 'Shoeb Ahmed', photo: '/images/members/Shoeb.png' },
];

const excomJanJul = [
  { role: 'President', name: 'Taksha Yadav', photo: '/images/members/Taksha.png' },
  { role: 'Immediate Past President', name: 'Arogya Das Daniel', photo: '/images/members/Arogya Das Daniel.jpg' },
  { role: 'VP – Education', name: 'Adithya Varma', photo: '/images/members/Adithya.jpg' },
  { role: 'VP – Membership', name: 'Nandini NR', photo: '/images/members/Nandini.jpg' },
  { role: 'Vice President-Public Relations', name: 'Preetham G', photo: '/images/members/Preetham.png' },
  { role: 'Secretary', name: 'Adarsh Anand', photo: '/images/members/Adarsh.webp' },
  { role: 'Treasurer', name: 'Nagashree NR', photo: '/images/members/Nagashree.jpg' },
  { role: 'Sergeant at Arms', name: 'Shoeb Ahmed', photo: '/images/members/Shoeb.png' },
];

function OfficerCard({ officer }: { officer: typeof excomJulDec[0] }) {
  return (
    <div className={styles.officerCard}>
      <div className={styles.officerPhoto}>
        <img
          src={officer.photo}
          alt={officer.name}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(officer.name)}&background=004165&color=F2DF74&size=80&bold=true`;
          }}
        />
      </div>
      <div className={styles.officerRole}>{officer.role}</div>
      <h4 className={styles.officerName}>{officer.name}</h4>
    </div>
  );
}

export default function ExCom() {
  const [activeTerm, setActiveTerm] = useState(0);
  const currentExcom = activeTerm === 0 ? excomJulDec : excomJanJul;

  return (
    <section className={styles.section} id="excom" aria-label="Act V – Executive Committee">
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.actBadge}>Act V</div>
          <div className="accent-line accent-line--center" />
          <h2 className={`headline-lg ${styles.heading}`}>
            Executive <span className={styles.headingAccent}>Committee</span> 2025–26
          </h2>
          <p className={`body-lg ${styles.subhead}`}>
            Together everyone achieves more — T.E.A.M
          </p>
        </div>

        {/* Animated Background Effects */}
        <div className={styles.gradientOrb} />
        <div className={styles.gradientOrb} />
        <div className={styles.gradientOrb} />
        
        {/* Shooting Stars */}
        <div className={styles.shootingStar} />
        <div className={styles.shootingStar} />
        <div className={styles.shootingStar} />
        
        {/* Floating Dust Particles */}
        <div className={styles.dust}>
          <span /><span /><span /><span />
          <span /><span /><span /><span />
        </div>
        
        {/* Glowing Ring */}
        <div className={styles.ring} />

        {/* React state tabs */}
        <div className={styles.termTabs}>
          <div className={styles.termTabBtns} role="tablist" aria-label="Select executive committee term">
            <button
              role="tab"
              aria-selected={activeTerm === 0}
              className={`${styles.termLabel} ${activeTerm === 0 ? styles.termLabelActive : ''}`}
              onClick={() => setActiveTerm(0)}
            >Jul–Dec 2025</button>
            <button
              role="tab"
              aria-selected={activeTerm === 1}
              className={`${styles.termLabel} ${activeTerm === 1 ? styles.termLabelActive : ''}`}
              onClick={() => setActiveTerm(1)}
            >Jan–Jul 2026</button>
          </div>

          <div className={styles.officersGrid} role="tabpanel">
            {currentExcom.map(o => (
              <OfficerCard key={o.name + o.role} officer={o} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
