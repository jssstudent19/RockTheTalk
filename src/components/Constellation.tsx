'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './Constellation.module.css';
import { members, type Member } from '@/lib/data';

// ─── CONSTELLATION DEFINITIONS ───────────────────────────────────────────────
// ViewBox: 1200 × 640   —  node radius R = 42 (84px face photos at full width)

const R = 42; // photo node radius

const CONSTELLATIONS = [
  {
    id: 'ursa-minor',
    name: 'Ursa Minor',
    myth: 'The Little Dipper',
    desc: 'Seven stars curving like a ladle — with Polaris anchoring the tip.',
    color: '#006094',        // Brightened Loyal Blue for dark bg contrast
    memberIndices: [0, 1, 2, 3, 4, 5, 6],
    nodes: [
      { cx: 200, cy: 100 }, // 0 — Polaris (handle tip)
      { cx: 350, cy: 175 }, // 1 — δ UMi
      { cx: 510, cy: 215 }, // 2 — ε UMi
      { cx: 660, cy: 185 }, // 3 — ζ UMi
      { cx: 800, cy: 280 }, // 4 — η UMi (corner of bowl)
      { cx: 680, cy: 400 }, // 5 — β UMi Kochab
      { cx: 540, cy: 390 }, // 6 — γ UMi Pherkad
    ],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,4]],
  },
  {
    id: 'leo',
    name: 'Leo',
    myth: 'The Lion',
    desc: 'A bold sickle of stars forming the lion\'s mane, with a sweeping tail.',
    color: '#F2DF74',        // TM Happy Yellow
    memberIndices: [7, 8, 9, 10, 11, 12, 13, 14, 15],
    nodes: [
      { cx: 560, cy: 490 }, // 0 — Regulus (heart)
      { cx: 510, cy: 365 }, // 1 — η Leo
      { cx: 420, cy: 255 }, // 2 — Algieba top
      { cx: 290, cy: 215 }, // 3 — ζ Leo
      { cx: 185, cy: 290 }, // 4 — μ Leo
      { cx: 255, cy: 405 }, // 5 — ε Leo
      { cx: 405, cy: 460 }, // 6 — sickle close
      { cx: 740, cy: 445 }, // 7 — δ Zosma
      { cx: 930, cy: 355 }, // 8 — β Denebola (tail)
    ],
    lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,0],[0,7],[7,8]],
  },
  {
    id: 'orion',
    name: 'Orion',
    myth: 'The Hunter',
    desc: 'The iconic hunter — shoulders, belt, feet, and sword visible in the winter sky.',
    color: '#A23446',        // Brightened True Maroon for dark bg contrast
    memberIndices: [16, 17, 18, 19, 20, 21, 22, 23, 24],
    nodes: [
      { cx: 430, cy: 200 }, // 0 — Betelgeuse (left shoulder)
      { cx: 680, cy: 175 }, // 1 — Bellatrix  (right shoulder)
      { cx: 470, cy: 355 }, // 2 — ε Ori belt left
      { cx: 600, cy: 335 }, // 3 — δ Ori belt mid
      { cx: 730, cy: 355 }, // 4 — ζ belt right
      { cx: 790, cy: 510 }, // 5 — Rigel foot
      { cx: 360, cy: 520 }, // 6 — κ Ori foot left
      { cx: 560, cy:  70 }, // 7 — λ head
      { cx: 550, cy: 450 }, // 8 — sword
    ],
    lines: [[0,2],[1,4],[2,3],[3,4],[4,5],[2,6],[0,7],[1,7],[3,8]],
  },
  {
    id: 'cassiopeia',
    name: 'Cassiopeia',
    myth: 'The Queen',
    desc: 'The bright W-shape of a queen seated on her throne — never setting below the horizon.',
    color: '#A9B2B1',        // TM Cool Gray
    memberIndices: [25, 26, 27, 28, 29],
    nodes: [
      { cx: 200, cy: 320 }, // 0 — α Cas Schedar
      { cx: 420, cy: 185 }, // 1 — β Cas Caph
      { cx: 620, cy: 310 }, // 2 — γ Cas center
      { cx: 820, cy: 175 }, // 3 — δ Cas Ruchbah
      { cx: 1010,cy: 320 }, // 4 — ε Cas Segin
    ],
    lines: [[0,1],[1,2],[2,3],[3,4]],
  },
];

// Static background star seed (deterministic — no hydration issues)
const BG_STARS = Array.from({ length: 130 }, (_, i) => ({
  cx: (i * 137.508) % 1200,
  cy: (i * 71.31 + 43) % 640,
  r:  i % 9 === 0 ? 1.8 : i % 4 === 0 ? 1.1 : 0.5,
  op: 0.1 + (i % 6) * 0.06,
  delay: (i % 10) * 0.45,
}));

// ─── MEMBER DETAIL PANEL ──────────────────────────────────────────────────────
function MemberPanel({ member, accentColor, onClose }: { member: Member; accentColor: string; onClose: () => void }) {
  return (
    <div className={styles.panel} role="dialog" aria-modal="true" aria-label={`${member.name}`}>
      <div className={styles.panelBackdrop} onClick={onClose} aria-hidden="true" />
      <div className={styles.panelContent} style={{ borderLeftColor: accentColor + '40' }}>
        <button className={styles.panelClose} onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <div className={styles.panelPhotoWrap}>
          <img src={member.photo} alt={member.name} className={styles.panelPhoto}
            onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=004165&color=F2DF74&size=300&bold=true`; }} />
          <div className={styles.panelPhotoOverlay} style={{ background: `linear-gradient(to top, ${accentColor}22, transparent)` }} />
        </div>
        <div className={styles.panelBody}>
          <h3 className={`headline-md ${styles.panelName}`}>{member.name}</h3>
          <blockquote className={styles.panelQuote} style={{ borderLeftColor: `${accentColor}50` }}>
            <p>{member.bio}</p>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

// ─── CONSTELLATION SVG ────────────────────────────────────────────────────────
function ConstellationSVG({
  constellation, constellationMembers, onSelect, hoveredIdx, setHoveredIdx, drawn,
}: {
  constellation: typeof CONSTELLATIONS[0];
  constellationMembers: Member[];
  onSelect: (m: Member) => void;
  hoveredIdx: number | null;
  setHoveredIdx: (i: number | null) => void;
  drawn: boolean;
}) {
  const { nodes, lines, color } = constellation;

  return (
    <svg
      viewBox="0 0 1200 640"
      width="100%"
      className={styles.starMap}
      aria-label={`${constellation.name} constellation`}
    >
      {/* Defs */}
      <defs>
        <radialGradient id={`bgGrad-${constellation.id}`} cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#0d1b3e" />
          <stop offset="100%" stopColor="#020810" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {nodes.map((n, i) => (
          <clipPath key={i} id={`clip-${constellation.id}-${i}`}>
            <circle cx={n.cx} cy={n.cy} r={R} />
          </clipPath>
        ))}
      </defs>

      {/* Background */}
      <rect width="1200" height="640" fill={`url(#bgGrad-${constellation.id})`} />

      {/* Ambient stars */}
      {BG_STARS.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity={s.op}
          className={styles.twinkle} style={{ animationDelay: `${s.delay}s` }} />
      ))}

      {/* Constellation watermark name */}
      <text x="600" y="600" textAnchor="middle"
        fill={`${color}14`} fontSize="72" fontWeight="900"
        fontFamily="Montserrat,sans-serif" letterSpacing="12">
        {constellation.name.toUpperCase()}
      </text>

      {/* Constellation lines with draw-on animation */}
      {lines.map(([a, b], li) => {
        const na = nodes[a], nb = nodes[b];
        const len = Math.hypot(nb.cx - na.cx, nb.cy - na.cy);
        return (
          <line key={li}
            x1={na.cx} y1={na.cy} x2={nb.cx} y2={nb.cy}
            stroke={color} strokeWidth="1.5" opacity="0.65"
            strokeDasharray={len}
            strokeDashoffset={drawn ? 0 : len}
            style={{ transition: `stroke-dashoffset 0.9s ease ${0.15 * li}s` }}
          />
        );
      })}

      {/* Member nodes */}
      {nodes.map((n, i) => {
        const m = constellationMembers[i];
        if (!m) return null;
        const isHov = hoveredIdx === i;
        const hasAward = !!(m.contestWin || m.award);
        const nodeR = R + 4; // same size for all

        return (
          <g key={i}
            className={styles.starNode}
            style={{ animationDelay: `${i * 0.4}s`, animationDuration: `${4 + (i % 3)}s` }}
          >
            {/* Outer glow */}
            <circle cx={n.cx} cy={n.cy} r={nodeR + 14}
              fill="none" stroke={color} strokeWidth="1"
              opacity={isHov ? 0.7 : 0.2}
              style={{ transition: 'opacity 0.3s' }}
            />
            {/* Spinning dashed orbit — all nodes */}
            <circle cx={n.cx} cy={n.cy} r={nodeR + 20}
              fill="none" stroke={color} strokeWidth="0.8"
              strokeDasharray="5 8" opacity="0.35"
              className={styles.rotateRing}
            />
            {/* Photo border */}
            <circle cx={n.cx} cy={n.cy} r={nodeR + 2}
              fill="#020810" stroke={color}
              strokeWidth={2}
              opacity={isHov ? 1 : 0.75}
              style={{ transition: 'opacity 0.3s' }}
            />
            {/* Photo */}
            <image
              href={m.photo}
              x={n.cx - nodeR} y={n.cy - nodeR}
              width={nodeR * 2} height={nodeR * 2}
              clipPath={`url(#clip-${constellation.id}-${i})`}
              preserveAspectRatio="xMidYMin slice"
              style={{ filter: isHov ? 'brightness(1.2) saturate(1.1)' : 'brightness(0.85) saturate(0.9)', transition: 'filter 0.3s' }}
            />
            {/* Star badge (for all members) */}
            <g>
              <circle cx={n.cx + nodeR - 2} cy={n.cy - nodeR + 2} r={9} fill="#020810" stroke={color} strokeWidth="1" />
              <text x={n.cx + nodeR - 2} y={n.cy - nodeR + 6}
                textAnchor="middle" fontSize="10" fill={color} filter="url(#glow)">★</text>
            </g>
            {/* Name tooltip on hover */}
            {isHov && (
              <g>
                <rect x={n.cx - 64} y={n.cy + nodeR + 8} width="128" height="24" rx="7"
                  fill="rgba(2,8,16,0.92)" stroke={`${color}50`} strokeWidth="1" />
                <text x={n.cx} y={n.cy + nodeR + 24} textAnchor="middle"
                  fill="white" fontSize="10" fontWeight="700" fontFamily="Montserrat,sans-serif" letterSpacing="0.04em">
                  {m.name}
                </text>
              </g>
            )}
            {/* Hitbox */}
            <circle cx={n.cx} cy={n.cy} r={nodeR + 16}
              fill="transparent"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => onSelect(m)}
              role="button"
              aria-label={`View ${m.name}'s profile`}
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && onSelect(m)}
            />
          </g>
        );
      })}
    </svg>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function Constellation() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [selected, setSelected]   = useState<Member | null>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [drawn, setDrawn] = useState(false);
  const prevTab = useRef(-1);

  // Trigger line draw-on whenever tab changes
  useEffect(() => {
    if (prevTab.current === activeIdx) return;
    prevTab.current = activeIdx;
    setDrawn(false);
    setHoveredNode(null);
    const t = setTimeout(() => setDrawn(true), 80);
    return () => clearTimeout(t);
  }, [activeIdx]);

  // Initial draw
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 600);
    return () => clearTimeout(t);
  }, []);

  const active = CONSTELLATIONS[activeIdx];
  const activeMembers = active.memberIndices.map(i => members[i]).filter(Boolean);

  return (
    <section className={styles.section} id="constellation" aria-label="The Constellation – Meet Our Members">

      {/* ── HEADER ── */}
      <div className={styles.header}>
        <div className={styles.actBadge}>Act II</div>
        <div className="accent-line accent-line--center" />
        <h2 className={`headline-lg ${styles.heading}`}>
          The <span className={styles.headingAccent}>Constellation</span>
        </h2>
        <p className={`body-lg ${styles.subhead}`}>
          30 members mapped across four real constellations. Pick a cluster — hover any star, click to meet them.
        </p>
      </div>

      {/* ── CONSTELLATION TABS ── */}
      <div className={styles.tabs} role="tablist" aria-label="Constellation selection">
        {CONSTELLATIONS.map((c, i) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={activeIdx === i}
            aria-controls={`panel-${c.id}`}
            className={`${styles.tab} ${activeIdx === i ? styles.tabActive : ''}`}
            style={activeIdx === i ? { borderColor: c.color, color: c.color } : {}}
            onClick={() => setActiveIdx(i)}
          >
            <span className={styles.tabDot} style={{ background: c.color }} />
            <span className={styles.tabName}>{c.name}</span>
            <span className={styles.tabMyth}>{c.myth}</span>
            <span className={styles.tabCount}>{c.memberIndices.length} stars</span>
          </button>
        ))}
      </div>

      {/* ── CONSTELLATION DESCRIPTION ── */}
      <div className={styles.constellationInfo}>
        <p className={styles.constellationDesc} style={{ color: active.color }}>
          {active.desc}
        </p>
      </div>

      {/* ── SVG CANVAS ── */}
      <div className={styles.svgWrap} id={`panel-${active.id}`} role="tabpanel">
        <ConstellationSVG
          key={active.id}
          constellation={active}
          constellationMembers={activeMembers}
          onSelect={setSelected}
          hoveredIdx={hoveredNode}
          setHoveredIdx={setHoveredNode}
          drawn={drawn}
        />
      </div>

      {/* ── LEGEND ── */}
      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={styles.legendRingInner} style={{ borderColor: active.color, opacity: 0.4 }} />
          Member (Spinning ring + ★ badge)
        </span>
        <span className={styles.legendItem} style={{ opacity: 0.5, marginLeft: 'auto' }}>
          Click any star to open profile
        </span>
      </div>

      {/* ── MEMBER PANEL ── */}
      {selected && (
        <MemberPanel
          member={selected}
          accentColor={active.color}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
