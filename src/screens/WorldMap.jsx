import { Motes } from '../lib/iso';

function ChapterIcon({ kind, state }) {
  const c = state === 'locked' ? 'rgba(168,218,220,0.45)' : '#e8c468';
  if (kind === 'arch') return (
    <g>
      <path d="M -5 4 L -5 -1 Q -5 -5 0 -5 Q 5 -5 5 -1 L 5 4" fill="none" stroke={c} strokeWidth="0.9"/>
      <line x1="-7" y1="4" x2="7" y2="4" stroke={c} strokeWidth="0.9"/>
    </g>
  );
  if (kind === 'moth') return (
    <g>
      <ellipse cx="-3" cy="-1" rx="3" ry="4" fill="none" stroke={c} strokeWidth="0.7"/>
      <ellipse cx="3" cy="-1" rx="3" ry="4" fill="none" stroke={c} strokeWidth="0.7"/>
      <line x1="0" y1="-5" x2="0" y2="5" stroke={c} strokeWidth="0.9"/>
    </g>
  );
  if (kind === 'flame') return (
    <g>
      <path d="M 0 -6 Q 4 -2 3 2 Q 5 4 0 6 Q -5 4 -3 2 Q -4 -2 0 -6 Z" fill="none" stroke={c} strokeWidth="0.8"/>
      <circle r="1.2" fill={c}/>
    </g>
  );
  if (kind === 'eye') return (
    <g>
      <path d="M -6 0 Q 0 -5 6 0 Q 0 5 -6 0 Z" fill="none" stroke={c} strokeWidth="0.8"/>
      <circle r="1.6" fill={c}/>
    </g>
  );
  return null;
}

export default function WorldMap({ ambient = 'night', currentChapter = 1, onSelect }) {
  const W = 390, H = 844;

  const chapters = [
    { n: 'I',   name: 'The Sunken Reliquary', verb: 'WAKE',   tag: 'A drowned cathedral. Bells ring in the silt.', x: 0.22, y: 0.78, icon: 'arch',  color: '#a8dadc' },
    { n: 'II',  name: 'Moth Court',            verb: 'FOLLOW', tag: 'Clockwork forest. Wings beat slowly.',         x: 0.72, y: 0.62, icon: 'moth',  color: '#e8c468' },
    { n: 'III', name: 'Ash Choir',             verb: 'SPEAK',  tag: 'A library that learned to sing as it burned.', x: 0.30, y: 0.42, icon: 'flame', color: '#c97a6a' },
    { n: 'IV',  name: 'The Hollow Sky',        verb: 'FORGET', tag: 'Where the last Reader laid down their lantern.', x: 0.74, y: 0.20, icon: 'eye',   color: '#cdb8ff' },
  ];

  return (
    <div style={{ width: W, height: H, position: 'relative', background: '#070912', overflow: 'hidden', fontFamily: 'var(--font-display)' }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <radialGradient id="map-fog" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#1a2740" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#070912" stopOpacity="0"/>
          </radialGradient>
          <pattern id="parchment-tex" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect width="80" height="80" fill="#0d1422"/>
            {Array.from({length: 12}).map((_, i) => (
              <circle key={i} cx={(i*17)%80} cy={(i*23)%80} r={0.3} fill="rgba(232,196,104,0.06)"/>
            ))}
          </pattern>
          <radialGradient id="node-glow-active" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e8c468" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#e8c468" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="node-glow-locked" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a8dadc" stopOpacity="0.18"/>
            <stop offset="100%" stopColor="#a8dadc" stopOpacity="0"/>
          </radialGradient>
        </defs>

        <rect width={W} height={H} fill="url(#parchment-tex)"/>
        <rect width={W} height={H} fill="url(#map-fog)"/>

        {[0.15, 0.35, 0.55, 0.75, 0.92].map((y, i) => (
          <path key={i} d={`M 0 ${H*y} Q ${W/2} ${H*y - 8} ${W} ${H*y}`} fill="none" stroke="rgba(232,196,104,0.06)" strokeWidth="0.4" strokeDasharray="2 4"/>
        ))}

        <g transform={`translate(${W-55} 50)`} opacity="0.55">
          <circle r="22" fill="none" stroke="rgba(232,196,104,0.3)" strokeWidth="0.5"/>
          <circle r="14" fill="none" stroke="rgba(232,196,104,0.2)" strokeWidth="0.4"/>
          <polygon points="0,-22 3,0 0,22 -3,0" fill="rgba(232,196,104,0.45)"/>
          <polygon points="-22,0 0,-3 22,0 0,3" fill="rgba(232,196,104,0.25)"/>
          <text y="-26" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="7" fill="rgba(232,196,104,0.6)" letterSpacing="1">N</text>
        </g>

        {chapters.slice(0, -1).map((c, i) => {
          const next = chapters[i + 1];
          const x1 = W * c.x, y1 = H * c.y;
          const x2 = W * next.x, y2 = H * next.y;
          const cx = (x1 + x2) / 2 + (i % 2 ? 30 : -30);
          const cy = (y1 + y2) / 2;
          const unlocked = i + 1 < currentChapter;
          return (
            <path key={i}
              d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
              fill="none"
              stroke={unlocked ? 'rgba(232,196,104,0.5)' : 'rgba(232,196,104,0.18)'}
              strokeWidth="0.7"
              strokeDasharray={unlocked ? "0" : "1 4"}
            />
          );
        })}

        {[
          { x: 0.45, y: 0.70, sym: '✦' },
          { x: 0.55, y: 0.50, sym: '✧' },
          { x: 0.50, y: 0.30, sym: '✦' },
          { x: 0.18, y: 0.55, sym: '·' },
          { x: 0.85, y: 0.42, sym: '·' },
        ].map((s, i) => (
          <text key={i} x={W*s.x} y={H*s.y} fontSize="9" fill="rgba(232,196,104,0.25)" textAnchor="middle">{s.sym}</text>
        ))}

        {chapters.map((c, i) => {
          const cx = W * c.x, cy = H * c.y;
          const state = i + 1 < currentChapter ? 'done'
                      : i + 1 === currentChapter ? 'active'
                      : 'locked';
          const ringStroke = state === 'active' ? '#e8c468'
                           : state === 'done' ? 'rgba(232,196,104,0.5)'
                           : 'rgba(168,218,220,0.25)';
          const labelColor = state === 'locked' ? 'rgba(168,218,220,0.4)' : 'rgba(232,196,104,0.95)';

          return (
            <g key={i} transform={`translate(${cx} ${cy})`} onClick={() => onSelect && onSelect(i+1)} style={{ cursor: 'pointer' }}>
              {state === 'active' && <circle r="34" fill="url(#node-glow-active)"/>}
              {state === 'locked' && <circle r="22" fill="url(#node-glow-locked)"/>}
              <circle r="14" fill="#0a1220" stroke={ringStroke} strokeWidth="1.2"/>
              <circle r="10" fill="none" stroke={ringStroke} strokeWidth="0.5" strokeDasharray="1 2"/>
              <ChapterIcon kind={c.icon} state={state}/>
              <text y="-22" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="9" letterSpacing="1.5" fill={labelColor}>
                {c.n}
              </text>
              <g transform={`translate(${i % 2 === 0 ? 22 : -22} 4)`}>
                <text textAnchor={i % 2 === 0 ? 'start' : 'end'}
                      fontFamily="EB Garamond, serif" fontStyle="italic" fontSize="11" fill={labelColor}>
                  {c.name}
                </text>
                <text y="12" textAnchor={i % 2 === 0 ? 'start' : 'end'}
                      fontFamily="Cinzel, serif" fontSize="7" letterSpacing="2" fill="rgba(232,196,104,0.5)">
                  THE  VERB · {c.verb}
                </text>
              </g>
              {state === 'active' && (
                <circle r="14" fill="none" stroke="#e8c468" strokeWidth="0.6" opacity="0.7" style={{ animation: 'slow-pulse 2.4s ease-in-out infinite' }}/>
              )}
            </g>
          );
        })}

        <Motes count={14} area={{ w: W, h: H }}/>
      </svg>

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '54px 24px 0', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.5em', color: 'rgba(232,196,104,0.5)' }}>
          THE  ATLAS
        </div>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 14, color: 'rgba(232,196,104,0.85)', marginTop: 4 }}>
          a kingdom of broken sentences
        </div>
      </div>

      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 24,
                    background: 'linear-gradient(180deg, rgba(13,20,34,0) 0%, rgba(13,20,34,0.92) 35%, rgba(13,20,34,0.97) 100%)',
                    borderTop: '1px solid rgba(232,196,104,0.18)', padding: '20px 18px', borderRadius: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <div>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.4em', color: 'rgba(232,196,104,0.5)' }}>CHAPTER  {chapters[currentChapter-1].n}</div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: '#e8c468', marginTop: 2 }}>{chapters[currentChapter-1].name}</div>
          </div>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 8, color: 'rgba(232,196,104,0.4)', letterSpacing: '0.3em', textAlign: 'right', paddingTop: 4 }}>
            <div>3 / 12</div>
            <div style={{ marginTop: 2, color: 'rgba(168,218,220,0.4)' }}>FRAGMENTS</div>
          </div>
        </div>
        <div style={{ fontFamily: 'EB Garamond, serif', fontStyle: 'italic', fontSize: 13, color: 'rgba(235,225,201,0.7)', lineHeight: 1.5 }}>
          &ldquo;{chapters[currentChapter-1].tag}&rdquo;
        </div>
        <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
          <button style={{
            flex: 1, background: 'transparent', border: '1px solid rgba(232,196,104,0.5)',
            color: '#e8c468', fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: '0.35em',
            padding: '12px 0', cursor: 'pointer', borderRadius: 1,
          }}>DESCEND</button>
          <button style={{
            background: 'transparent', border: '1px solid rgba(168,218,220,0.25)',
            color: 'rgba(168,218,220,0.6)', fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: '0.3em',
            padding: '12px 16px', cursor: 'pointer', borderRadius: 1,
          }}>CODEX</button>
        </div>
      </div>

      <div className="vignette"/>
    </div>
  );
}
