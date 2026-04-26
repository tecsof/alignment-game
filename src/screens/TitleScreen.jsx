import { Motes } from '../lib/iso';

export default function TitleScreen({ ambient = 'night', onPlay }) {
  const W = 390, H = 844;
  const skyId = ambient === 'dusk' ? 'sky-dusk' : ambient === 'dawn' ? 'sky-dawn' : 'sky-night';

  return (
    <div style={{ width: W, height: H, position: 'relative', background: '#07090f', overflow: 'hidden', fontFamily: 'var(--font-display)' }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <linearGradient id="sky-night" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#070912"/>
            <stop offset="40%" stopColor="#0c1422"/>
            <stop offset="100%" stopColor="#1a2740"/>
          </linearGradient>
          <linearGradient id="sky-dusk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a0f1f"/>
            <stop offset="50%" stopColor="#3a1f2a"/>
            <stop offset="100%" stopColor="#6b3838"/>
          </linearGradient>
          <linearGradient id="sky-dawn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a2438"/>
            <stop offset="60%" stopColor="#5a6878"/>
            <stop offset="100%" stopColor="#a8a08a"/>
          </linearGradient>
          <radialGradient id="moon-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e8dcc4" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#e8dcc4" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="title-lamp" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e8c468" stopOpacity="0.45"/>
            <stop offset="100%" stopColor="#e8c468" stopOpacity="0"/>
          </radialGradient>
          <linearGradient id="arch-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0e18"/>
            <stop offset="100%" stopColor="#14202f"/>
          </linearGradient>
        </defs>

        <rect width={W} height={H} fill={`url(#${skyId})`}/>

        <circle cx={W*0.72} cy={H*0.18} r="44" fill="url(#moon-glow)"/>
        <circle cx={W*0.72} cy={H*0.18} r="22" fill="#e8dcc4" opacity="0.85"/>
        <circle cx={W*0.72 - 7} cy={H*0.18 - 4} r="3" fill="#0a0e18" opacity="0.18"/>
        <circle cx={W*0.72 + 5} cy={H*0.18 + 6} r="2" fill="#0a0e18" opacity="0.15"/>

        {Array.from({ length: 35 }).map((_, i) => {
          const x = (i * 53 + 17) % W;
          const y = ((i * 31) % (H * 0.55));
          const r = 0.4 + (i % 3) * 0.3;
          return <circle key={i} cx={x} cy={y} r={r} fill="#e8dcc4" opacity={0.3 + (i%4)*0.15} style={{ animation: `slow-pulse ${4 + i%5}s ease-in-out ${i*0.3}s infinite` }}/>;
        })}

        <path d={`M 0 ${H*0.62} L 60 ${H*0.55} L 130 ${H*0.6} L 200 ${H*0.5} L 270 ${H*0.58} L 340 ${H*0.52} L ${W} ${H*0.6} L ${W} ${H} L 0 ${H} Z`}
              fill="#0a1220" opacity="0.85"/>

        <g opacity="0.95">
          <path d={`
            M ${W*0.18} ${H*0.95}
            L ${W*0.18} ${H*0.55}
            Q ${W*0.18} ${H*0.4} ${W*0.32} ${H*0.4}
            L ${W*0.34} ${H*0.4}
            L ${W*0.34} ${H*0.95} Z
          `} fill="url(#arch-grad)"/>
          <path d={`
            M ${W*0.66} ${H*0.95}
            L ${W*0.66} ${H*0.4}
            L ${W*0.68} ${H*0.4}
            Q ${W*0.82} ${H*0.4} ${W*0.82} ${H*0.55}
            L ${W*0.82} ${H*0.95} Z
          `} fill="url(#arch-grad)"/>
          <polygon points={`${W*0.42},${H*0.42} ${W*0.5},${H*0.32} ${W*0.58},${H*0.42} ${W*0.55},${H*0.46} ${W*0.5},${H*0.4} ${W*0.45},${H*0.46}`} fill="#0a0e18" opacity="0.7"/>
          <circle cx={W*0.5} cy={H*0.5} r="34" fill="none" stroke="rgba(232,196,104,0.25)" strokeWidth="0.6"/>
          <circle cx={W*0.5} cy={H*0.5} r="22" fill="none" stroke="rgba(232,196,104,0.18)" strokeWidth="0.5"/>
          {[0,60,120,180,240,300].map(deg => {
            const rad = deg * Math.PI / 180;
            return <line key={deg} x1={W*0.5} y1={H*0.5} x2={W*0.5 + Math.cos(rad)*34} y2={H*0.5 + Math.sin(rad)*34} stroke="rgba(232,196,104,0.18)" strokeWidth="0.5"/>;
          })}
          <circle cx={W*0.5} cy={H*0.5} r="2" fill="#e8c468" opacity="0.9" style={{ animation: 'slow-pulse 5s ease-in-out infinite' }}/>
        </g>

        <g>
          {[
            { ch: 'A', x: 0.16, y: 0.22 },
            { ch: 'L', x: 0.27, y: 0.20 },
            { ch: 'I', x: 0.36, y: 0.21 },
            { ch: 'G', x: 0.44, y: 0.22 },
            { ch: 'N', x: 0.53, y: 0.20 },
            { ch: 'M', x: 0.63, y: 0.22 },
            { ch: 'E', x: 0.74, y: 0.21 },
            { ch: 'N', x: 0.83, y: 0.22 },
            { ch: 'T', x: 0.92, y: 0.20 },
          ].map((g, i) => (
            <g key={i} transform={`translate(${W*g.x - 14} ${H*g.y - 16})`}
               style={{ animation: `slow-pulse ${6 + i%4}s ease-in-out ${i*0.2}s infinite` }}>
              <rect x="0" y="0" width="28" height="32" rx="1" fill="#1a2638" stroke="rgba(232,196,104,0.5)" strokeWidth="0.8"/>
              <rect x="2" y="2" width="24" height="28" rx="0.5" fill="none" stroke="rgba(232,196,104,0.2)" strokeWidth="0.4"/>
              <text x="14" y="22" textAnchor="middle"
                    fontFamily="Cinzel, serif" fontSize="15" fontWeight="600"
                    fill="#f4d98a"
                    style={{ filter: 'drop-shadow(0 0 4px rgba(232,196,104,0.7))' }}>
                {g.ch}
              </text>
            </g>
          ))}
        </g>

        <text x={W/2} y={H*0.30} textAnchor="middle"
              fontFamily="EB Garamond, serif" fontStyle="italic"
              fontSize="12" letterSpacing="3" fill="rgba(232,196,104,0.55)">
          A   GAME   OF   SLEEPING   VERBS
        </text>

        <g>
          <polygon points={`0,${H*0.92} 90,${H*0.88} 130,${H*0.95} 130,${H} 0,${H}`} fill="#070912"/>
          <polygon points={`${W-110},${H*0.93} ${W-40},${H*0.89} ${W},${H*0.91} ${W},${H} ${W-110},${H}`} fill="#070912"/>
        </g>

        <ellipse cx={W*0.5} cy={H*0.86} rx="80" ry="30" fill="url(#title-lamp)"/>

        <g transform={`translate(${W*0.5 - 14} ${H*0.78})`}>
          <ellipse cx="14" cy="32" rx="14" ry="4" fill="rgba(0,0,0,0.6)"/>
          <path d="M 4 30 Q 0 12 4 0 Q 10 -8 14 -10 Q 18 -8 24 0 Q 28 12 24 30 Z" fill="#0a0e18" stroke="#1f2d3e" strokeWidth="0.6"/>
          <path d="M 6 -2 Q 14 -16 22 -2 L 20 4 L 8 4 Z" fill="#04060c"/>
          <circle cx="14" cy="0" r="1.4" fill="rgba(232,196,104,0.7)"/>
          <line x1="22" y1="6" x2="32" y2="2" stroke="#04060c" strokeWidth="1.6"/>
          <g transform="translate(32 2)" className="lantern-flicker">
            <rect x="-3" y="-4" width="6" height="8" rx="0.6" fill="#e8c468" stroke="#8a6228" strokeWidth="0.5"/>
            <rect x="-3.5" y="-5" width="7" height="1.2" fill="#4a3520"/>
            <rect x="-3.5" y="3.5" width="7" height="1.2" fill="#4a3520"/>
            <line x1="0" y1="-5" x2="0" y2="-9" stroke="#4a3520" strokeWidth="0.7"/>
            <circle cx="0" cy="0" r="14" fill="rgba(232,196,104,0.18)"/>
          </g>
        </g>

        <g><Motes count={18} area={{ w: W, h: H }}/></g>
      </svg>

      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 24px 56px' }}>
        <button onClick={onPlay}
          style={{
            background: 'transparent',
            border: '1px solid rgba(232,196,104,0.45)',
            color: '#e8c468',
            fontFamily: 'Cinzel, serif',
            fontSize: 13,
            letterSpacing: '0.45em',
            padding: '18px 0',
            borderRadius: 1,
            cursor: 'pointer',
            backdropFilter: 'blur(2px)',
            position: 'relative',
            overflow: 'hidden',
          }}>
          <span style={{ position: 'relative', zIndex: 1 }}>BEGIN  THE  READING</span>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(232,196,104,0.12), transparent 70%)' }}/>
        </button>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, color: 'rgba(232,196,104,0.4)', fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.35em' }}>
          <span>CONTINUE</span>
          <span>ATLAS</span>
          <span>CODEX</span>
          <span>SETTINGS</span>
        </div>
      </div>

      <div className="vignette"/>
    </div>
  );
}
