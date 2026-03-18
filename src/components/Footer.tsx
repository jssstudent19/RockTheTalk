import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} aria-label="Footer">
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logoText}>
            ROCK <span className={styles.logoAccent}>THE TALK</span>
            <sup className={styles.logoTm}>®</sup>
          </div>
          <p className={styles.tagline}>Toastmasters International Club #05843628</p>
          <p className={styles.taglineSub}>Division B · Area B2 · Bangalore, India</p>
          <p className={styles.chartered}>Chartered: 1 October 2016</p>
        </div>

        {/* Nav */}
        <nav className={styles.nav} aria-label="Footer navigation">
          <h4 className={styles.navTitle}>Navigate</h4>
          <ul className={styles.navList}>
            {[
              { label: 'The Green Room', href: '#green-room' },
              { label: 'Our Constellations', href: '#constellation' },
              { label: 'The Spotlight', href: '#spotlight' },
              { label: 'The Script', href: '#the-script' },
              { label: 'The Ex-Com', href: '#excom' },
              { label: 'Gallery', href: '#gallery' },
              { label: 'The Encore', href: '#encore' },
            ].map(link => (
              <li key={link.href}>
                <a href={link.href} className={styles.navLink}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Meet */}
        <div className={styles.meetCol}>
          <h4 className={styles.navTitle}>We Meet</h4>
          <p className={styles.meetInfo}>Every Thursday</p>
          <p className={styles.meetTime}>12:30 PM – 2:00 PM IST</p>
          <p className={styles.meetNote}>Trellix, Bangalore</p>
          <a
            href="https://maps.google.com/maps?q=Trellix,+Embassy+Golf+Links+Business+Park,+Bangalore"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', marginTop: '1rem', marginBottom: '1.5rem', borderRadius: '8px', overflow: 'hidden', height: '150px', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}
            aria-label="View Trellix Bangalore Location on Google Maps"
            title="Open in Google Maps"
          >
            <iframe 
              src="https://maps.google.com/maps?q=Trellix,%20Embassy%20Golf%20Links%20Business%20Park,%20Bangalore&t=&z=14&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0, pointerEvents: 'none' }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Trellix Bangalore Location"
            ></iframe>
          </a>
          <a href="https://forms.gle/ZkBdkH44NVh4WKSp7" target="_blank" rel="noopener noreferrer" className={`btn-primary ${styles.contactBtn}`}>
            Get in Touch
          </a>
        </div>

        {/* Made with love */}
        <div className={styles.twilightCol}>
          <p className={styles.madeWithLove}>
            <span className={styles.heart}>♥</span>
            Made with love by
            <br />
            <strong>Preetham G</strong>
            <span style={{ fontSize: '0.8em', display: 'block', fontWeight: 'normal', opacity: 0.8 }}>Vice President-Public Relations</span>
          </p>
          <p className={styles.madeWithSub}>[Jan 2026-Present]<br />Rock The Talk Toastmasters Club</p>
        </div>
      </div>

      {/* Disclaimer (required by Brand Manual §34) */}
      <div className={styles.disclaimer}>
        <div className="container">
          <p>
            The information on this website is for the sole use of Toastmasters&apos; members, for Toastmasters business only.
            It is not to be used for solicitation and distribution of non-Toastmasters material or information.
          </p>
          <p className={styles.copyright}>
            © 2025–26 Rock The Talk Toastmasters · Club #05843628 · All trademarks and logos are the property of Toastmasters International.
          </p>
        </div>
      </div>
    </footer>
  );
}
