'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './Navbar.module.css';

/* ── Section navigation ─────────────────────────────── */
const navLinks = [
  { label: 'Green Room', href: '#green-room', desc: 'About the club', num: 'I' },
  { label: 'Constellations', href: '#constellation', desc: 'Meet our members', num: 'II' },
  { label: 'Spotlight', href: '#spotlight', desc: 'Member achievements', num: 'III' },
  { label: 'The Script', href: '#the-script', desc: 'Agenda & meeting flow', num: 'IV' },
  { label: 'The Ex-Com', href: '#excom', desc: 'Executive committee', num: 'V' },
  { label: 'Gallery', href: '#gallery', desc: 'Photos & memories', num: 'VI' },
  { label: 'Encore', href: '#encore', desc: 'Join Rock The Talk', num: 'VII' },
];

/* ── Resource links ─────────────────────────────────── */
const resourceLinks = [
  {
    category: 'Club Content',
    items: [
      {
        label: 'Newsletters',
        href: 'https://drive.google.com/drive/folders/1BXOU33_iOBpcMYzZGJkk8lToMmNm9agF',
        desc: 'Yearly club newsletters',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z" />
            <path d="M16 2v20" /><path d="M8 7h4" /><path d="M8 11h4" /><path d="M8 15h4" />
          </svg>
        ),
      },
      {
        label: 'Guest Booklet',
        href: 'https://drive.google.com/file/d/1Z1pnDu-Dhq37ZWlzfz5MK9RQKby9dfjo/view?usp=sharing',
        desc: "First-timer's welcome guide",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        ),
      },
      {
        label: 'Club Role Taker Reference',
        href: 'https://drive.google.com/drive/folders/1IvVWGpaWqvLzo-m3ooT1gk0X-5F2eyMx?usp=sharing',
        desc: 'Role guides & resources',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
      },
    ],
  },
  {
    category: 'Follow Us',
    items: [
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/search/results/all/?keywords=rock%20the%20talk%20toastmasters%20club&origin=RICH_QUERY_SUGGESTION&spellCorrectionEnabled=false&heroEntityKey=urn%3Ali%3Aorganization%3A87435437&position=0',
        desc: 'Connect professionally',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
          </svg>
        ),
      },
      {
        label: 'Instagram',
        href: 'https://www.instagram.com/rockthetalk.club/',
        desc: 'Behind-the-scenes moments',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        ),
      },
    ],
  },
  {
    category: 'Toastmasters Intl.',
    items: [
      {
        label: 'Toastmasters Website',
        href: 'https://www.toastmasters.org/',
        desc: 'Global HQ & resources',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        ),
      },
      {
        label: 'Pathways Learning',
        href: 'https://www.toastmasters.org/education/pathways',
        desc: 'Education program overview',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        ),
      },
      {
        label: 'Club Meeting Experience',
        href: 'https://www.toastmasters.org/membership/club-experience',
        desc: 'What happens at meetings',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
      },
    ],
  },
];

/* ── Component ──────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobResourcesOpen, setMobResourcesOpen] = useState(false);

  const resourcesRef = useRef<HTMLLIElement>(null);

  /* scroll listener */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close Resources dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node))
        setResourcesOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const closeAll = () => { setResourcesOpen(false); setMenuOpen(false); };

  const Chevron = ({ open }: { open: boolean }) => (
    <svg
      className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
      width="11" height="11" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.inner} container`}>

        {/* ── Logo ── */}
        <a href="#" className={styles.logo} aria-label="Rock The Talk – Home">
          {/* Toastmasters official logo */}
          <img
            src="/images/ToastmastersLogo.png"
            alt="Toastmasters International"
            className={styles.tmLogo}
          />
          {/* Club name */}
          <span className={styles.logoWords}>
            <span className={styles.logoRock}>ROCK THE</span>
            <span className={styles.logoTalk}>TALK CLUB</span>
          </span>
        </a>

        {/* ── Desktop nav ── */}
        <ul className={styles.links} role="list">

          {/* Section links — wrapped in a frosted pill group */}
          <div className={styles.navGroup}>
            {navLinks.map(link => (
              <li key={link.href}>
                <a href={link.href} className={styles.link} onClick={closeAll}>
                  {link.label}
                  <span className={styles.linkUnderline} />
                </a>
              </li>
            ))}
          </div>

          {/* Divider */}
          <li className={styles.divider} aria-hidden="true" />

          {/* Resources dropdown */}
          <li className={styles.dropdownItem} ref={resourcesRef}>
            <button
              className={`${styles.pillBtn} ${resourcesOpen ? styles.pillBtnActive : ''}`}
              onClick={() => setResourcesOpen(v => !v)}
              aria-expanded={resourcesOpen}
              aria-haspopup="true"
            >
              Resources
              <Chevron open={resourcesOpen} />
            </button>

            <div className={`${styles.megaMenu} ${resourcesOpen ? styles.panelOpen : ''}`} role="menu">
              <div className={styles.megaHeader}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                Resources &amp; Links
              </div>
              <div className={styles.megaGrid}>
                {resourceLinks.map(group => (
                  <div key={group.category} className={styles.megaGroup}>
                    <p className={styles.megaGroupLabel}>{group.category}</p>
                    {group.items.map(item => (
                      <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.megaLink}
                        onClick={() => setResourcesOpen(false)}
                        role="menuitem"
                      >
                        <span className={styles.megaLinkIcon}>{item.icon}</span>
                        <span className={styles.megaLinkText}>
                          <span className={styles.megaLinkLabel}>{item.label}</span>
                          <span className={styles.megaLinkDesc}>{item.desc}</span>
                        </span>
                        <svg className={styles.megaLinkArrow} width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </li>
        </ul>

        {/* ── CTA ── */}
        <a href="#encore" className={`btn-primary ${styles.cta}`}>
          Join Us
        </a>

        {/* ── Mobile hamburger ── */}
        <button
          className={styles.burger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`${styles.burgerLine} ${menuOpen ? styles.open : ''}`} />
          <span className={`${styles.burgerLine} ${menuOpen ? styles.open : ''}`} />
          <span className={`${styles.burgerLine} ${menuOpen ? styles.open : ''}`} />
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>

        {/* Individual section links */}
        {navLinks.map(link => (
          <a key={link.href} href={link.href} className={styles.mobileLink} onClick={closeAll}>
            {link.label}
          </a>
        ))}

        {/* Resources accordion */}
        <button
          className={`${styles.mobileLink} ${styles.mobileAccordion}`}
          onClick={() => setMobResourcesOpen(v => !v)}
          aria-expanded={mobResourcesOpen}
        >
          Resources &amp; Links
          <Chevron open={mobResourcesOpen} />
        </button>
        <div className={`${styles.mobileSubList} ${mobResourcesOpen ? styles.mobileSubListOpen : ''}`}>
          {resourceLinks.flatMap(g => g.items).map(item => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileSubLink}
              onClick={closeAll}
            >
              <span className={styles.mobileSubIcon}>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </div>

        <a href="#encore" className={`btn-primary ${styles.mobileCta}`} onClick={closeAll}>
          Join Us
        </a>
      </div>
    </nav>
  );
}
