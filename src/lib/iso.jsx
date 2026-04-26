export const ISO = {
  TILE_W: 56,
  TILE_H: 28,
  STACK: 22,
};

export function isoXY(x, y, z = 0) {
  return {
    sx: (x - y) * (ISO.TILE_W / 2),
    sy: (x + y) * (ISO.TILE_H / 2) - z * ISO.STACK,
  };
}

export function IsoBlock({
  x, y, z = 0,
  d = 1,
  top = '#1f2d3e', left = '#0d1320', right = '#14202f',
  topAccent, glow = false,
  edge = 'rgba(0,0,0,0.55)',
  onClick, style = {},
  children,
}) {
  const { sx, sy } = isoXY(x, y, z);
  const TW = ISO.TILE_W, TH = ISO.TILE_H, ST = ISO.STACK;

  return (
    <g
      transform={`translate(${sx} ${sy})`}
      style={{ cursor: onClick ? 'pointer' : 'default', ...style }}
      onClick={onClick}
    >
      <polygon
        points={`0,${TH/2} ${TW/2},${TH} ${TW/2},${TH + ST*d} 0,${TH/2 + ST*d}`}
        fill={left}
        stroke={edge}
        strokeWidth="0.5"
      />
      <polygon
        points={`${TW},${TH/2} ${TW/2},${TH} ${TW/2},${TH + ST*d} ${TW},${TH/2 + ST*d}`}
        fill={right}
        stroke={edge}
        strokeWidth="0.5"
      />
      <polygon
        points={`${TW/2},0 ${TW},${TH/2} ${TW/2},${TH} 0,${TH/2}`}
        fill={topAccent || top}
        stroke={edge}
        strokeWidth="0.6"
      />
      <polyline
        points={`0,${TH/2} ${TW/2},0 ${TW},${TH/2}`}
        fill="none"
        stroke="rgba(232,196,104,0.18)"
        strokeWidth="0.6"
      />
      {glow && (
        <polygon
          points={`${TW/2},0 ${TW},${TH/2} ${TW/2},${TH} 0,${TH/2}`}
          fill="url(#lantern-grad)"
          opacity="0.45"
        />
      )}
      {children}
    </g>
  );
}

export function GlyphStone({ x, y, z = 0, rune, lit = false, resonating = false }) {
  const { sx, sy } = isoXY(x, y, z);
  const TW = ISO.TILE_W, TH = ISO.TILE_H;
  return (
    <g transform={`translate(${sx} ${sy})`} className={resonating ? 'resonate' : ''}>
      <polygon
        points={`${TW/2},2 ${TW-2},${TH/2} ${TW/2},${TH-2} 2,${TH/2}`}
        fill={lit ? '#3a4d63' : '#1a2638'}
        stroke="rgba(232,196,104,0.35)"
        strokeWidth="0.8"
      />
      <text
        x={TW/2} y={TH/2 + 4}
        textAnchor="middle"
        fontFamily="Cinzel, serif"
        fontWeight="600"
        fontSize={11}
        letterSpacing="1.2"
        fill={lit ? '#f4d98a' : '#7a6a4a'}
        style={{
          filter: lit ? 'drop-shadow(0 0 6px rgba(232,196,104,0.7))' : 'none',
          textTransform: 'uppercase',
        }}
      >{rune}</text>
    </g>
  );
}

export function Reader({ x, y, z = 0, scale = 1 }) {
  const { sx, sy } = isoXY(x, y, z);
  const TW = ISO.TILE_W, TH = ISO.TILE_H;
  const cx = TW / 2, cy = TH / 2;
  return (
    <g transform={`translate(${sx} ${sy})`}>
      <ellipse cx={cx} cy={cy + 6} rx={26 * scale} ry={12 * scale} fill="url(#lantern-glow)" opacity="0.85" />
      <ellipse cx={cx} cy={cy + 4} rx={7 * scale} ry={3 * scale} fill="rgba(0,0,0,0.55)" />
      <g transform={`translate(${cx} ${cy - 18 * scale}) scale(${scale})`}>
        <path
          d="M -8 18 Q -10 6 -7 -2 Q -5 -10 0 -12 Q 5 -10 7 -2 Q 10 6 8 18 Z"
          fill="#0d1320" stroke="#1f2d3e" strokeWidth="0.5"
        />
        <path d="M -6 -4 Q 0 -16 6 -4 L 5 0 L -5 0 Z" fill="#070b14" />
        <ellipse cx="0" cy="-1" rx="3" ry="3.2" fill="#0a0e18" />
        <circle cx="0" cy="-1.5" r="1" fill="rgba(232,196,104,0.6)" />
        <line x1="6" y1="2" x2="11" y2="0" stroke="#0a0e18" strokeWidth="1.2" />
        <g transform="translate(11,0)" className="lantern-flicker">
          <rect x="-2" y="-3" width="4" height="6" rx="0.5" fill="#e8c468" stroke="#8a6228" strokeWidth="0.4" />
          <rect x="-2.5" y="-3.5" width="5" height="1" fill="#4a3520" />
          <rect x="-2.5" y="2.5" width="5" height="1" fill="#4a3520" />
          <line x1="0" y1="-3.5" x2="0" y2="-6" stroke="#4a3520" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="6" fill="rgba(232,196,104,0.25)" />
        </g>
      </g>
    </g>
  );
}

export function IsoDefs() {
  return (
    <defs>
      <radialGradient id="lantern-grad" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#f4d98a" stopOpacity="0.9"/>
        <stop offset="60%" stopColor="#e8c468" stopOpacity="0.4"/>
        <stop offset="100%" stopColor="#e8c468" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="lantern-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f4d98a" stopOpacity="0.5"/>
        <stop offset="100%" stopColor="#f4d98a" stopOpacity="0"/>
      </radialGradient>
      <linearGradient id="sky-gradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0a0e18"/>
        <stop offset="60%" stopColor="#0d1320"/>
        <stop offset="100%" stopColor="#14202f"/>
      </linearGradient>
      <linearGradient id="dusk-gradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1a1428"/>
        <stop offset="50%" stopColor="#3d2438"/>
        <stop offset="100%" stopColor="#5e3a3a"/>
      </linearGradient>
      <linearGradient id="day-gradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3a4d63"/>
        <stop offset="100%" stopColor="#6a8a9a"/>
      </linearGradient>
      <filter id="soft-glow">
        <feGaussianBlur stdDeviation="2" />
      </filter>
      <pattern id="stone-tex" width="6" height="6" patternUnits="userSpaceOnUse">
        <rect width="6" height="6" fill="#1f2d3e"/>
        <circle cx="1" cy="2" r="0.4" fill="rgba(0,0,0,0.3)"/>
        <circle cx="4" cy="4" r="0.3" fill="rgba(232,196,104,0.08)"/>
      </pattern>
    </defs>
  );
}

export function Motes({ count = 12, area = { w: 400, h: 400 } }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const x = (i * 37 + 13) % area.w;
        const y = (i * 53 + 27) % area.h;
        const dx = ((i * 11) % 30) - 15;
        const dy = -20 - ((i * 7) % 30);
        const dur = 6 + (i % 5);
        const delay = (i * 0.7) % 5;
        return (
          <circle
            key={i}
            cx={x} cy={y} r={0.8 + (i % 3) * 0.3}
            fill="#e8c468"
            style={{
              animation: `mote-drift ${dur}s ease-in-out ${delay}s infinite`,
              '--mx': `${dx}px`,
              '--my': `${dy}px`,
            }}
          />
        );
      })}
    </>
  );
}
