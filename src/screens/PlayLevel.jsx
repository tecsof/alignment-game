import { useState, useEffect, useRef } from 'react';
import { ISO, isoXY, IsoBlock, Reader, IsoDefs, Motes } from '../lib/iso';

// Biome palette — controls floor + sky + accent colours.
const BIOMES = {
  cathedral: {
    bg: '#0a0e18',
    skyId: 'sky-night',
    floor:    { top: '#1a2638', topAccent: '#2c3e54', left: '#0a0e18', right: '#101724' },
    pathTop:  '#2c3e54',
    pathAcc:  '#3a4d63',
    pillar:   { top: '#1a2638', left: '#070b14', right: '#0d1320' },
    accent: '#a8dadc',
    centerColor: '#3a4d63',
    successColor: '#e8c468',
  },
  moth: {
    bg: '#1a0f1f',
    skyId: 'sky-dusk',
    floor:    { top: '#3d2438', topAccent: '#5a3a52', left: '#1a0f1f', right: '#2a1430' },
    pathTop:  '#5a3a52',
    pathAcc:  '#7a4a72',
    pillar:   { top: '#2a1430', left: '#0f0612', right: '#1a0a20' },
    accent: '#cdb8ff',
    centerColor: '#5a3a52',
    successColor: '#e8c468',
  },
  ash: {
    bg: '#0a0608',
    skyId: 'ash-sky',
    floor:    { top: '#2a1410', topAccent: '#3a1f1c', left: '#0a0608', right: '#1a0a08' },
    pathTop:  '#3a1f1c',
    pathAcc:  '#5a1f10',
    pillar:   { top: '#1a0a08', left: '#040204', right: '#0a0608' },
    accent: '#c97a6a',
    centerColor: '#5a1f10',
    successColor: '#f4d98a',
  },
  hollow: {
    bg: '#070912',
    skyId: 'sky-night',
    floor:    { top: '#15182a', topAccent: '#22253a', left: '#070912', right: '#0d1020' },
    pathTop:  '#22253a',
    pathAcc:  '#3a3d52',
    pillar:   { top: '#0d1020', left: '#040510', right: '#080a18' },
    accent: '#cdb8ff',
    centerColor: '#3a3d52',
    successColor: '#cdb8ff',
  },
};

function FloatingGlyph({ x, y, z, rune, lit, resonating }) {
  const { sx, sy } = isoXY(x, y, z);
  const TW = ISO.TILE_W;
  return (
    <g transform={`translate(${sx} ${sy})`} className={resonating ? 'resonate' : ''}>
      <g transform={`translate(${TW / 2 - 24} -10)`}>
        <rect x="0" y="0" width="48" height="20" rx="1"
              fill={lit ? '#2a3a52' : '#141d2c'}
              stroke={lit ? 'rgba(232,196,104,0.7)' : 'rgba(168,218,220,0.2)'}
              strokeWidth="0.7" />
        <rect x="2" y="2" width="44" height="16" rx="0.5"
              fill="none" stroke={lit ? 'rgba(232,196,104,0.3)' : 'rgba(168,218,220,0.1)'} strokeWidth="0.4" />
        <text x="24" y="14" textAnchor="middle"
              fontFamily="Cinzel, serif"
              fontSize={rune.length > 6 ? 6.5 : rune.length > 4 ? 8 : 9}
              fontWeight="600" letterSpacing="1.1"
              fill={lit ? '#f4d98a' : 'rgba(168,218,220,0.55)'}
              style={{ filter: lit ? 'drop-shadow(0 0 6px rgba(232,196,104,0.7))' : 'none' }}>
          {rune}
        </text>
      </g>
    </g>
  );
}

const CX = 4, CY = 5;
function rotateAround(x, y, r) {
  const dx = x - CX, dy = y - CY;
  const a = (r * Math.PI) / 2;
  return {
    x: CX + dx * Math.cos(a) - dy * Math.sin(a),
    y: CY + dx * Math.sin(a) + dy * Math.cos(a),
  };
}

export default function PlayLevel({ level, codexVerbs = [], onSolve, onExit }) {
  const W = 390, H = 844;
  const biome = BIOMES[level.biome] || BIOMES.cathedral;

  const [rotation, setRotation] = useState(level.solveAt === 0 ? 1 : 0);
  const [turns, setTurns] = useState(0);
  const [whispers, setWhispers] = useState(0);
  const [hint, setHint] = useState(false);
  const [phase, setPhase] = useState('reading'); // reading | solved | drifting
  const [drift, setDrift] = useState(0);  // brief shake when invoke fails
  const driftTimer = useRef(null);

  const sentence = level.sentenceByAngle[rotation % 4];
  const sentenceTrue = rotation % 4 === level.solveAt;

  // Validate that the player has the required verbs in their codex.
  const missingVerbs = (level.requires || []).filter((v) => !codexVerbs.includes(v));
  const canInvoke = sentenceTrue && missingVerbs.length === 0;

  const turnBy = (delta) => {
    if (phase !== 'reading') return;
    setRotation((r) => ((r + delta) % 4 + 4) % 4);
    setTurns((t) => t + 1);
  };

  const invoke = () => {
    if (phase !== 'reading') return;
    if (canInvoke) {
      setPhase('solved');
      // brief reveal, then bubble up
      setTimeout(() => {
        onSolve && onSolve({ turns, whispers });
      }, 1800);
    } else {
      setPhase('drifting');
      setDrift((d) => d + 1);
      clearTimeout(driftTimer.current);
      driftTimer.current = setTimeout(() => setPhase('reading'), 700);
    }
  };

  useEffect(() => () => clearTimeout(driftTimer.current), []);

  const toggleHint = () => {
    if (!hint) setWhispers((w) => w + 1);
    setHint((h) => !h);
  };

  // Render the floor as a small chamber (8x8 with corners trimmed). Some tiles
  // are marked "path" (lighter). When solved, we add bridge tiles connecting
  // the reader to the gate.
  const floorTiles = [];
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (x + y < 2 || x + y > 13) continue;
      if (x === 0 && y > 6) continue;
      if (x === 8 && y < 2) continue;
      const onPath = (y === 5 && x >= 1 && x <= 4)
        || (x === 4 && y >= 3 && y <= 5)
        || (x >= 4 && x <= 6 && y === 3);
      floorTiles.push({ x, y, onPath });
    }
  }
  const bridgeTiles = [{ x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 }];

  return (
    <div style={{
      width: W, height: H, position: 'relative', background: biome.bg,
      overflow: 'hidden', fontFamily: 'var(--font-display)',
    }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0 }}>
        <IsoDefs />
        <defs>
          <radialGradient id="pl-pool" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={biome.centerColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={biome.bg} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="pl-success" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={biome.successColor} stopOpacity="0.45" />
            <stop offset="100%" stopColor={biome.successColor} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ash-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0608" />
            <stop offset="50%" stopColor="#2a0a0c" />
            <stop offset="100%" stopColor="#5a1f10" />
          </linearGradient>
          <linearGradient id="hollow-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#040510" />
            <stop offset="60%" stopColor="#0a0e1a" />
            <stop offset="100%" stopColor="#15182a" />
          </linearGradient>
        </defs>

        <rect width={W} height={H} fill={`url(#${biome.skyId})`} />
        <ellipse cx={W / 2} cy={H * 0.62} rx={W * 0.55} ry={H * 0.18} fill="url(#pl-pool)" />

        <g transform={`translate(${W / 2 - 110} ${H * 0.30})`}
           style={{
             transform: phase === 'drifting'
               ? `translate(${W / 2 - 110}px, ${H * 0.30}px) rotate(${(drift % 2 ? 1.2 : -1.2)}deg)`
               : undefined,
             transformOrigin: 'center',
             transition: 'transform 120ms',
           }}>
          {floorTiles.map((t) => (
            <IsoBlock key={`${t.x}-${t.y}`} x={t.x} y={t.y} z={0} d={0.4}
              top={t.onPath ? biome.pathTop : biome.floor.top}
              topAccent={t.onPath ? biome.pathAcc : biome.floor.topAccent}
              left={biome.floor.left} right={biome.floor.right} />
          ))}

          {/* Pillars at the corners */}
          {[{ x: 1, y: 1 }, { x: 1, y: 7 }, { x: 7, y: 2 }, { x: 7, y: 6 }].map((p, i) => (
            <g key={i}>
              <IsoBlock x={p.x} y={p.y} z={0} d={3.2}
                top={biome.pillar.top} left={biome.pillar.left} right={biome.pillar.right} />
              <IsoBlock x={p.x} y={p.y} z={3.2} d={0.3}
                top={biome.floor.topAccent || biome.pathTop}
                left={biome.pillar.top} right={biome.pillar.right} />
            </g>
          ))}

          {/* Bridge stones — appear when solved */}
          {phase === 'solved' && bridgeTiles.map((b, i) => (
            <g key={i} style={{ animation: `slow-pulse ${1.6 + i * 0.2}s ease-in-out infinite` }}>
              <IsoBlock x={b.x} y={b.y} z={0.4} d={0.35}
                top={biome.pathAcc} topAccent={biome.successColor}
                left={biome.floor.left} right={biome.pathTop} glow />
            </g>
          ))}

          {/* Floating glyph stones */}
          {level.glyphs.map((g) => {
            const r = rotateAround(g.x, g.y, rotation);
            const inSentence = sentence.includes(g.rune);
            return (
              <g key={g.rune}>
                <line
                  x1={isoXY(r.x, r.y, 0).sx + ISO.TILE_W / 2}
                  y1={isoXY(r.x, r.y, 0).sy + ISO.TILE_H / 2}
                  x2={isoXY(r.x, r.y, g.z).sx + ISO.TILE_W / 2}
                  y2={isoXY(r.x, r.y, g.z).sy + 4}
                  stroke="rgba(232,196,104,0.18)" strokeWidth="0.4" strokeDasharray="1 2" />
                <FloatingGlyph
                  x={r.x} y={r.y} z={g.z} rune={g.rune}
                  lit={inSentence}
                  resonating={inSentence && sentenceTrue} />
              </g>
            );
          })}

          <Reader x={2} y={5} z={0.4} scale={1.0} />
        </g>

        <Motes count={22} area={{ w: W, h: H }} />
        {(sentenceTrue || phase === 'solved') && (
          <ellipse cx={W / 2} cy={H * 0.45} rx={W * 0.5} ry={H * 0.22} fill="url(#pl-success)" />
        )}
      </svg>

      {/* Header / HUD */}
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <button onClick={onExit} style={{
            background: 'transparent', border: 'none',
            color: 'rgba(232,196,104,0.6)', fontFamily: 'Cinzel, serif',
            fontSize: 9, letterSpacing: '0.3em', padding: 0, cursor: 'pointer',
          }}>← ATLAS</button>
          <div style={{
            fontFamily: 'Cinzel, serif', fontSize: 8, letterSpacing: '0.4em',
            color: 'rgba(232,196,104,0.4)',
          }}>FRAGMENT · {romanize(level.chapter)} — {level.id}</div>
          <button onClick={toggleHint} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: hint ? '#e8c468' : 'rgba(232,196,104,0.45)', fontSize: 14,
          }}>◫</button>
        </div>

        <div style={{
          background: sentenceTrue
            ? 'linear-gradient(180deg, rgba(232,196,104,0.10), rgba(232,196,104,0.03))'
            : 'rgba(13,20,34,0.5)',
          border: sentenceTrue
            ? '1px solid rgba(232,196,104,0.55)'
            : '1px solid rgba(168,218,220,0.12)',
          padding: '12px 14px', borderRadius: 1, backdropFilter: 'blur(4px)',
          textAlign: 'center', transition: 'all 0.4s',
          animation: phase === 'drifting' ? 'pl-shake 0.5s ease-in-out' : undefined,
        }}>
          <div style={{
            fontFamily: 'EB Garamond, serif', fontStyle: 'italic',
            fontSize: 9, letterSpacing: '0.3em',
            color: 'rgba(232,196,104,0.45)', marginBottom: 6,
          }}>
            {phase === 'solved' ? '— the world remembers —'
              : phase === 'drifting' ? '— the angle drifts —'
              : sentenceTrue ? '— the angle holds true —'
              : '— the angle reads —'}
          </div>
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            gap: 10, flexWrap: 'wrap',
          }}>
            {sentence.map((word, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: sentence.length > 4 ? 11 : 13,
                  letterSpacing: '0.18em', fontWeight: 600,
                  color: sentenceTrue ? '#f4d98a' : 'rgba(168,218,220,0.7)',
                  textShadow: sentenceTrue ? '0 0 12px rgba(232,196,104,0.7)' : 'none',
                  transition: 'all 0.4s',
                }}>{word}</span>
                {i < sentence.length - 1 && (
                  <span style={{ color: 'rgba(232,196,104,0.3)', fontSize: 8 }}>·</span>
                )}
              </span>
            ))}
          </div>
          {missingVerbs.length > 0 && (
            <div style={{
              fontFamily: 'EB Garamond, serif', fontStyle: 'italic',
              fontSize: 10, color: 'rgba(201,122,106,0.85)', marginTop: 6,
            }}>
              you must first recover {missingVerbs.join(', ')}
            </div>
          )}
        </div>
      </div>

      {/* Hint whisper */}
      {hint && level.hint && (
        <div style={{
          position: 'absolute', top: 196, left: 20, right: 20,
          background: 'rgba(13,20,34,0.88)', border: '1px solid rgba(168,218,220,0.3)',
          padding: '11px 13px', fontFamily: 'EB Garamond, serif',
          fontStyle: 'italic', fontSize: 12, color: 'rgba(168,218,220,0.85)',
          backdropFilter: 'blur(6px)', lineHeight: 1.45,
        }}>
          <div style={{
            fontFamily: 'Cinzel, serif', fontStyle: 'normal',
            fontSize: 7, letterSpacing: '0.4em',
            color: 'rgba(168,218,220,0.5)', marginBottom: 4,
          }}>WHISPER</div>
          {level.hint}
        </div>
      )}

      {/* Footer rotation crown */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 24, padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 14 }}>
          <div style={{
            display: 'flex', alignItems: 'center',
            background: 'rgba(13,20,34,0.7)', backdropFilter: 'blur(6px)',
            border: '1px solid rgba(232,196,104,0.25)', borderRadius: 999,
            padding: '6px 6px 6px 12px',
          }}>
            <span style={{
              fontFamily: 'Cinzel, serif', fontSize: 8, letterSpacing: '0.35em',
              color: 'rgba(232,196,104,0.55)', marginRight: 14,
            }}>TURN  THE  WORLD</span>
            <button onClick={() => turnBy(-1)} disabled={phase !== 'reading'} style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'rgba(232,196,104,0.08)', border: '1px solid rgba(232,196,104,0.4)',
              color: '#e8c468', fontSize: 16, cursor: 'pointer', marginRight: 6,
            }}>↺</button>
            <div style={{ display: 'flex', gap: 4, marginRight: 6 }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: i === rotation ? '#e8c468' : 'rgba(232,196,104,0.2)',
                  boxShadow: i === rotation ? '0 0 6px rgba(232,196,104,0.7)' : 'none',
                }} />
              ))}
            </div>
            <button onClick={() => turnBy(1)} disabled={phase !== 'reading'} style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'rgba(232,196,104,0.08)', border: '1px solid rgba(232,196,104,0.4)',
              color: '#e8c468', fontSize: 16, cursor: 'pointer',
            }}>↻</button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{
            fontFamily: 'Cinzel, serif', fontSize: 7, letterSpacing: '0.35em',
            color: 'rgba(168,218,220,0.4)',
          }}>
            TURNS · {turns}
          </div>
          <button onClick={invoke} disabled={phase !== 'reading'}
            style={{
              background: canInvoke ? 'rgba(232,196,104,0.15)' : 'rgba(13,20,34,0.7)',
              border: canInvoke ? '1px solid #e8c468' : '1px solid rgba(168,218,220,0.18)',
              color: canInvoke ? '#f4d98a' : 'rgba(168,218,220,0.6)',
              fontFamily: 'Cinzel, serif', fontSize: 11, letterSpacing: '0.4em',
              padding: '12px 24px', borderRadius: 1,
              cursor: phase === 'reading' ? 'pointer' : 'default',
              textShadow: canInvoke ? '0 0 12px rgba(232,196,104,0.6)' : 'none',
              transition: 'all 0.3s',
            }}>INVOKE</button>
          <div style={{
            fontFamily: 'Cinzel, serif', fontSize: 7, letterSpacing: '0.35em',
            color: 'rgba(168,218,220,0.4)',
          }}>
            ⌖ READ
          </div>
        </div>
      </div>

      <div className="vignette" />

      {phase === 'solved' && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(circle at 50% 45%, ${biome.successColor}30, transparent 60%)`,
          animation: 'pl-fadein 1.6s ease-out forwards',
        }} />
      )}

      <style>{`
        @keyframes pl-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
        @keyframes pl-fadein {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function romanize(n) {
  return ['I', 'II', 'III', 'IV', 'V'][n - 1] || String(n);
}
