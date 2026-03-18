"use client";

import { useEffect, useState } from "react";
import styles from "./MobilePopup.module.css";

const LS_KEY = "rtt_desktop_mode";

export default function MobilePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const isMobile = window.innerWidth < 1024;
      const isDesktopForced = localStorage.getItem(LS_KEY) === "true";
      // Only show if on a mobile viewport AND desktop mode hasn't been forced
      if (isMobile && !isDesktopForced) {
        setVisible(true);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const switchToDesktop = () => {
    // Persist the preference — the inline <head> script reads this before
    // the next page render and sets viewport width=1280 synchronously
    localStorage.setItem(LS_KEY, "true");
    window.location.reload();
  };

  const dismiss = () => setVisible(false);

  if (!visible) return null;


  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        {/* Icon */}
        <div className={styles.iconWrap}>
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <polyline points="8 21 12 17 16 21" />
          </svg>
        </div>

        <h2 className={styles.title}>Best Viewed on Desktop</h2>
        <p className={styles.body}>
          This site is designed for a full desktop experience. Switch to desktop
          mode for the best view of everything we have to offer.
        </p>

        <button className={styles.primaryBtn} onClick={switchToDesktop}>
          🖥&nbsp; View in Desktop Mode
        </button>

        <button className={styles.secondaryBtn} onClick={dismiss}>
          Continue on Mobile
        </button>
      </div>
    </div>
  );
}

