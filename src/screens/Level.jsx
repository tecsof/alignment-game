import { ISO, isoXY, IsoBlock, Reader, IsoDefs, Motes } from '../lib/iso';

function FloatingGlyph({ x, y, z, rune, lit = false, resonating = false }) {
  const { sx, sy } = isoXY(x, y, z);
  const TW = ISO.TILE_W;
  return (
    <g transform={`translate(${sx} ${sy})`} className={resonating ? 'resonate' : ''}>
      <g transform={`translate(${TW/2 - 22} -10)`}>
        <rect x="0" y="0" width="44" height="20" rx="1"
              fill={lit ? '#2a3a52' : '#141d2c'}
              stroke={lit ? 'rgba(232,196,104,0.7)' : 'rgba(168,218,220,0.2)'}
              strokeWidth="0.7"/>
        <rect x="2" y="2" width="40" height="16" rx="0.5"
              fill="none" stroke={lit ? 'rgba(232,196,104,0.3)' : 'rgba(168,218,220,0.1)'} strokeWidth="0.4"/>
        <text x="22" y="14" textAnchor="middle"
              fontFamily="Cinzel, serif" fontSize={rune.length > 5 ? 7 : 9}
              fontWeight="600" letterSpacing="1.2"
              fill={lit ? '#f4d98a' : 'rgba(168,218,220,0.55)'}
              style={{ filter: lit ? 'drop-shadow(0 0 6px rgba(232,196,104,0.7))' : 'none' }}>
          {rune}
        </text>
      </g>
    </g>
  );
}

export { FloatingGlyph };

export default function Level({ rotation = 0, ambient = 'night', hint = false, onRotate }) {
  const W = 390, H = 844;

  const sentenceByAngle = [
    ['LANTERN', 'WAKES', 'BRIDGE'],
    ['BRIDGE', 'IS', 'STONE'],
    ['STONE', 'IS', 'SILENT'],
    ['LANTERN', 'IS', 'SILENT'],
  ];
  const sentence = sentenceByAngle[rotation % 4];
  const sentenceTrue = rotation % 4 === 0;

  const baseGlyphs = [
    { id: 'lantern', rune: 'LANTERN', x: 1, y: 5, z: 1.8 },
    { id: 'wakes',   rune: 'WAKES',   x: 3, y: 4, z: 2.4 },
    { id: 'bridge',  rune: 'BRIDGE',  x: 6, y: 3, z: 1.4 },
    { id: 'is',      rune: 'IS',      x: 4, y: 6, z: 3.0 },
    { id: 'silent',  rune: 'SILENT',  x: 2, y: 7, z: 1.6 },
    { id: 'stone',   rune: 'STONE',   x: 5, y: 5, z: 2.2 },
  ];

  const cx = 4, cy = 5;
  function rotateAround(x, y, r) {
    const dx = x - cx, dy = y - cy;
    const a = (r * Math.PI) / 2;
    return {
      x: cx + dx * Math.cos(a) - dy * Math.sin(a),
      y: cy + dx * Math.sin(a) + dy * Math.cos(a),
    };
  }

  return (
    <div style={{ width: W, height: H, position: 'relative', background: '#0a0e18', overflow: 'hidden', fontFamily: 'var(--font-display)' }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0 }}>
        <IsoDefs/>
        <defs>
          <radialGradient id="chamber-pool" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3a4d63" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#0a0e18" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="success-glow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#e8c468" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="#e8c468" stopOpacity="0"/>
          </radialGradient>
        </defs>

        <rect width={W} height={H} fill="url(#sky-gradient)"/>

        <g opacity="0.35">
          <path d={`M 30 ${H*0.32} L 30 ${H*0.16} Q 30 ${H*0.08} 50 ${H*0.08} L 70 ${H*0.08} L 70 ${H*0.32} Z`} fill="#0a1220"/>
          <path d={`M ${W-70} ${H*0.32} L ${W-70} ${H*0.10} Q ${W-70} ${H*0.04} ${W-50} ${H*0.04} L ${W-30} ${H*0.04} L ${W-30} ${H*0.32} Z`} fill="#0a1220"/>
          <line x1="0" y1={H*0.32} x2={W} y2={H*0.32} stroke="rgba(168,218,220,0.08)" strokeWidth="0.5"/>
        </g>

        <ellipse cx={W/2} cy={H*0.62} rx={W*0.55} ry={H*0.18} fill="url(#chamber-pool)"/>

        <g transform={`translate(${W/2 - 110} ${H*0.30})`}>
          {Array.from({ length: 9 }).flatMap((_, x) =>
            Array.from({ length: 9 }).map((_, y) => {
              if (x + y < 2 || x + y > 13) return null;
              if (x === 0 && y > 6) return null;
              if (x === 8 && y < 2) return null;
              const onPath = (y === 5 && x >= 1 && x <= 4) || (x === 4 && y >= 3 && y <= 5) || (x >= 4 && x <= 6 && y === 3);
              return (
                <IsoBlock key={`${x}-${y}`} x={x} y={y} z={0} d={0.4}
                  top={onPath ? '#2c3e54' : '#1a2638'}
                  topAccent={onPath ? '#3a4d63' : undefined}
                  left="#0a0e18" right="#101724"
                />
              );
            })
          )}

          <IsoBlock x={1} y={1} z={0} d={3.2} top="#1a2638" left="#070b14" right="#0d1320"/>
          <IsoBlock x={1} y={7} z={0} d={3.2} top="#1a2638" left="#070b14" right="#0d1320"/>
          <IsoBlock x={7} y={2} z={0} d={3.2} top="#1a2638" left="#070b14" right="#0d1320"/>
          <IsoBlock x={7} y={6} z={0} d={3.2} top="#1a2638" left="#070b14" right="#0d1320"/>
          <IsoBlock x={1} y={1} z={3.2} d={0.3} top="#2c3e54" left="#1a2638" right="#243246"/>
          <IsoBlock x={1} y={7} z={3.2} d={0.3} top="#2c3e54" left="#1a2638" right="#243246"/>
          <IsoBlock x={7} y={2} z={3.2} d={0.3} top="#2c3e54" left="#1a2638" right="#243246"/>
          <IsoBlock x={7} y={6} z={3.2} d={0.3} top="#2c3e54" left="#1a2638" right="#243246"/>

          {sentenceTrue && [
            { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 }
          ].map((b, i) => (
            <g key={i} style={{ animation: `slow-pulse ${2 + i*0.2}s ease-in-out infinite` }}>
              <IsoBlock x={b.x} y={b.y} z={0.4} d={0.35}
                top="#3d4a64" topAccent="#5a6e90" left="#1f2d3e" right="#2c3e54" glow/>
            </g>
          ))}

          {baseGlyphs.map((g) => {
            const r = rotateAround(g.x, g.y, rotation);
            const isInSentence = sentence.includes(g.rune);
            return (
              <g key={g.id}>
                <line
                  x1={isoXY(r.x, r.y, 0).sx + 28} y1={isoXY(r.x, r.y, 0).sy + 12}
                  x2={isoXY(r.x, r.y, g.z).sx + 28} y2={isoXY(r.x, r.y, g.z).sy + 4}
                  stroke="rgba(232,196,104,0.18)" strokeWidth="0.4" strokeDasharray="1 2"
                />
                <FloatingGlyph x={r.x} y={r.y} z={g.z} rune={g.rune} lit={isInSentence} resonating={isInSentence && sentenceTrue}/>
              </g>
            );
          })}

          <Reader x={2} y={5} z={0.4} scale={1.0}/>
        </g>

        <Motes count={22} area={{ w: W, h: H }}/>

        {sentenceTrue && <ellipse cx={W/2} cy={H*0.45} rx={W*0.5} ry={H*0.22} fill="url(#success-glow)"/>}
      </svg>

      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <button style={{ background: 'transparent', border: 'none', color: 'rgba(232,196,104,0.55)', fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.3em', padding: 0, cursor: 'pointer' }}>← ATLAS</button>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 8, letterSpacing: '0.4em', color: 'rgba(232,196,104,0.4)' }}>FRAGMENT · I — III</div>
          <button style={{ background: 'transparent', border: 'none', color: 'rgba(232,196,104,0.55)', fontFamily: 'Cinzel, serif', fontSize: 14 }}>◫</button>
        </div>

        <div style={{
          background: sentenceTrue ? 'linear-gradient(180deg, rgba(232,196,104,0.10), rgba(232,196,104,0.03))' : 'rgba(13,20,34,0.5)',
          border: sentenceTrue ? '1px solid rgba(232,196,104,0.55)' : '1px solid rgba(168,218,220,0.12)',
          padding: '12px 14px', borderRadius: 1, backdropFilter: 'blur(4px)',
          textAlign: 'center', transition: 'all 0.4s',
        }}>
          <div style={{ fontFamily: 'EB Garamond, serif', fontStyle: 'italic', fontSize: 9, letterSpacing: '0.3em', color: 'rgba(232,196,104,0.45)', marginBottom: 6 }}>
            {sentenceTrue ? '— the angle holds true —' : '— the angle reads —'}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
            {sentence.map((word, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  fontFamily: 'Cinzel, serif', fontSize: 13, letterSpacing: '0.18em', fontWeight: 600,
                  color: sentenceTrue ? '#f4d98a' : 'rgba(168,218,220,0.7)',
                  textShadow: sentenceTrue ? '0 0 12px rgba(232,196,104,0.7)' : 'none',
                  transition: 'all 0.4s',
                }}>{word}</span>
                {i < sentence.length - 1 && <span style={{ color: 'rgba(232,196,104,0.3)', fontSize: 8 }}>·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {hint && (
        <div style={{
          position: 'absolute', top: 196, left: 20, right: 20,
          background: 'rgba(13,20,34,0.88)', border: '1px solid rgba(168,218,220,0.3)',
          padding: '11px 13px', fontFamily: 'EB Garamond, serif', fontStyle: 'italic',
          fontSize: 12, color: 'rgba(168,218,220,0.85)', backdropFilter: 'blur(6px)', lineHeight: 1.45,
        }}>
          <div style={{ fontFamily: 'Cinzel, serif', fontStyle: 'normal', fontSize: 7, letterSpacing: '0.4em', color: 'rgba(168,218,220,0.5)', marginBottom: 4 }}>WHISPER</div>
          &ldquo;When the lantern stands behind the verb, and the verb behind the bridge — the world remembers itself.&rdquo;
        </div>
      )}

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 24, padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0, marginBottom: 14 }}>
          <div style={{
            display: 'flex', alignItems: 'center',
            background: 'rgba(13,20,34,0.7)', backdropFilter: 'blur(6px)',
            border: '1px solid rgba(232,196,104,0.25)', borderRadius: 999,
            padding: '6px 6px 6px 12px',
          }}>
            <span style={{ fontFamily: 'Cinzel, serif', fontSize: 8, letterSpacing: '0.35em', color: 'rgba(232,196,104,0.55)', marginRight: 14 }}>TURN  THE  WORLD</span>
            <button onClick={() => onRotate && onRotate(-1)} style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'rgba(232,196,104,0.08)', border: '1px solid rgba(232,196,104,0.4)',
              color: '#e8c468', fontSize: 16, cursor: 'pointer', marginRight: 6,
            }}>↺</button>
            <div style={{ display: 'flex', gap: 4, marginRight: 6 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: i === rotation % 4 ? '#e8c468' : 'rgba(232,196,104,0.2)',
                  boxShadow: i === rotation % 4 ? '0 0 6px rgba(232,196,104,0.7)' : 'none',
                }}/>
              ))}
            </div>
            <button onClick={() => onRotate && onRotate(1)} style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'rgba(232,196,104,0.08)', border: '1px solid rgba(232,196,104,0.4)',
              color: '#e8c468', fontSize: 16, cursor: 'pointer',
            }}>↻</button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 7, letterSpacing: '0.35em', color: 'rgba(168,218,220,0.4)' }}>
            STEPS · 4
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {['◀', '▼', '▲', '▶'].map((c, i) => (
              <button key={i} style={{
                width: 32, height: 32, borderRadius: 1,
                background: 'rgba(13,20,34,0.7)', border: '1px solid rgba(168,218,220,0.18)',
                color: 'rgba(168,218,220,0.6)', fontSize: 10, cursor: 'pointer',
              }}>{c}</button>
            ))}
          </div>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 7, letterSpacing: '0.35em', color: 'rgba(168,218,220,0.4)' }}>
            ⌖ FOCUS
          </div>
        </div>
      </div>

      <div className="vignette"/>
    </div>
  );
}
