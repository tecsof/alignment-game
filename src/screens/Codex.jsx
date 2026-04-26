import { Motes } from '../lib/iso';

const ALL_VERBS = [
  { name: 'WAKE',   glyph: 'W', desc: 'to stir what slept',           chapter: 1 },
  { name: 'FOLLOW', glyph: 'F', desc: 'to be drawn after',             chapter: 2 },
  { name: 'SPEAK',  glyph: 'S', desc: 'to give a thing its name',      chapter: 3 },
  { name: 'FORGET', glyph: '⚯', desc: 'to release a name into mist',   chapter: 4 },
];

export default function Codex({ save, onBack }) {
  const W = 390, H = 844;

  return (
    <div style={{
      width: W, height: H, position: 'relative',
      background: '#070912', overflow: 'hidden',
      fontFamily: 'var(--font-display)',
    }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0 }}>
        <rect width={W} height={H} fill="#070912" />
        <Motes count={10} area={{ w: W, h: H }} />
      </svg>

      <div style={{ position: 'absolute', inset: 0, padding: '54px 24px 24px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: 22,
        }}>
          <button onClick={onBack} style={{
            background: 'transparent', border: 'none',
            color: 'rgba(232,196,104,0.6)', fontFamily: 'Cinzel, serif',
            fontSize: 9, letterSpacing: '0.3em', cursor: 'pointer',
          }}>← BACK</button>
          <div style={{
            fontFamily: 'Cinzel, serif', fontSize: 8, letterSpacing: '0.55em',
            color: 'rgba(232,196,104,0.5)',
          }}>THE  CODEX</div>
          <div style={{
            fontFamily: 'Cinzel, serif', fontSize: 9,
            color: 'rgba(232,196,104,0.5)', letterSpacing: '0.2em',
          }}>{save.verbs.length} / 4</div>
        </div>

        <div style={{
          fontFamily: 'Cinzel, serif', fontSize: 9,
          letterSpacing: '0.4em', color: 'rgba(232,196,104,0.5)',
          marginBottom: 14, paddingBottom: 10,
          borderBottom: '1px solid rgba(232,196,104,0.15)',
        }}>VERBS  RECOVERED</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {ALL_VERBS.map((v) => {
            const lit = save.verbs.includes(v.name);
            return (
              <div key={v.name} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '14px 16px',
                background: lit ? 'rgba(232,196,104,0.04)' : 'rgba(13,20,34,0.5)',
                border: lit ? '1px solid rgba(232,196,104,0.25)' : '1px solid rgba(168,218,220,0.08)',
              }}>
                <div style={{
                  width: 44, height: 44,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(232,196,104,0.4)',
                  background: 'rgba(13,20,34,0.6)',
                  fontFamily: 'Cinzel, serif', fontSize: 18, fontWeight: 600,
                  color: lit ? '#f4d98a' : 'rgba(168,218,220,0.4)',
                  textShadow: lit ? '0 0 8px rgba(232,196,104,0.6)' : 'none',
                }}>{lit ? v.glyph : '?'}</div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: 'Cinzel, serif', fontSize: 14,
                    letterSpacing: '0.18em',
                    color: lit ? '#e8c468' : 'rgba(168,218,220,0.4)',
                  }}>{lit ? v.name : '— — —'}</div>
                  <div style={{
                    fontFamily: 'EB Garamond, serif', fontStyle: 'italic',
                    fontSize: 12,
                    color: lit ? 'rgba(235,225,201,0.7)' : 'rgba(168,218,220,0.3)',
                    marginTop: 2,
                  }}>{lit ? v.desc : '~ unrecovered ~'}</div>
                </div>
                <div style={{
                  fontFamily: 'Cinzel, serif', fontSize: 8, letterSpacing: '0.3em',
                  color: 'rgba(232,196,104,0.45)',
                }}>CH  {romanize(v.chapter)}</div>
              </div>
            );
          })}
        </div>

        <div style={{
          marginTop: 28, padding: '14px 16px',
          border: '1px solid rgba(168,218,220,0.18)',
          background: 'rgba(13,20,34,0.4)',
        }}>
          <div style={{
            fontFamily: 'Cinzel, serif', fontSize: 8, letterSpacing: '0.4em',
            color: 'rgba(168,218,220,0.5)', marginBottom: 6,
          }}>FRAGMENTS  READ</div>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic',
            fontSize: 22, color: '#e8c468',
          }}>{save.completed.length}<span style={{
            fontSize: 14, color: 'rgba(232,196,104,0.5)',
          }}> / 30</span></div>
        </div>
      </div>

      <div className="vignette" />
    </div>
  );
}

function romanize(n) {
  return ['I', 'II', 'III', 'IV', 'V'][n - 1] || String(n);
}
