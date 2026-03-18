"use client";

import { useEffect, useState } from "react";
import styles from "./MobilePopup.module.css";

export default function MobilePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show popup on every visit if the viewport is mobile-sized
    const timer = setTimeout(() => {
      if (window.innerWidth < 1024) {
        setVisible(true);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const switchToDesktop = () => {
    // Override viewport meta to force desktop width, then reload
    let viewportMeta = document.querySelector<HTMLMetaElement>(
      'meta[name="viewport"]'
    );
    if (!viewportMeta) {
      viewportMeta = document.createElement("meta");
      viewportMeta.name = "viewport";
      document.head.appendChild(viewportMeta);
    }
    viewportMeta.content = "width=1280";
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

