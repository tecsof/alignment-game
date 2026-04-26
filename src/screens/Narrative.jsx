import { Motes } from '../lib/iso';

export function Narrative({ variant = 'opening' }) {
  const W = 390, H = 844;

  const content = {
    opening: {
      kicker: 'INVOCATION',
      title: 'A Reader',
      body: [
        'Once the world had grammar.',
        'Verbs lay sleeping in the stone',
        'and the stones dreamed of meaning.',
        '',
        'I carry a small light,',
        'and I am learning to look.',
      ],
      sign: '— from the Codex of Lit Things',
    },
    fragment: {
      kicker: 'FRAGMENT  RECOVERED',
      title: 'On Bridges',
      body: [
        'A bridge is not built.',
        'A bridge is named.',
        '',
        'When LANTERN remembers WAKE,',
        'and WAKE remembers BRIDGE,',
        'the river forgets its width.',
      ],
      sign: '— inscribed on a drowned bell',
    },
  }[variant];

  return (
    <div style={{ width: W, height: H, position: 'relative', background: '#070912', overflow: 'hidden' }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <radialGradient id="page-glow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#e8c468" stopOpacity="0.12"/>
            <stop offset="100%" stopColor="#e8c468" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill="#070912"/>
        <ellipse cx={W/2} cy={H/2} rx={W*0.7} ry={H*0.6} fill="url(#page-glow)"/>
        <Motes count={16} area={{ w: W, h: H }}/>

        {[
          { x: 40, y: 100, r: 0 }, { x: W-40, y: 100, r: 90 },
          { x: 40, y: H-100, r: 270 }, { x: W-40, y: H-100, r: 180 },
        ].map((p, i) => (
          <g key={i} transform={`translate(${p.x} ${p.y}) rotate(${p.r})`}>
            <path d="M 0 0 L 18 0 M 0 0 L 0 18 M 4 4 Q 10 6 14 4" fill="none" stroke="rgba(232,196,104,0.35)" strokeWidth="0.6"/>
            <circle r="1.5" fill="rgba(232,196,104,0.5)"/>
          </g>
        ))}

        <rect x="28" y="80" width={W-56} height={H-160} fill="none" stroke="rgba(232,196,104,0.18)" strokeWidth="0.5"/>
        <rect x="34" y="86" width={W-68} height={H-172} fill="none" stroke="rgba(232,196,104,0.10)" strokeWidth="0.4"/>
      </svg>

      <div style={{ position: 'absolute', inset: 0, padding: '120px 50px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', color: '#ebe1c9' }}>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.55em', color: 'rgba(232,196,104,0.55)' }}>
          {content.kicker}
        </div>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontStyle: 'italic', color: '#e8c468', marginTop: 14, marginBottom: 32, lineHeight: 1 }}>
          {content.title}
        </div>

        <svg width="80" height="14" viewBox="0 0 80 14" style={{ marginBottom: 32 }}>
          <line x1="0" y1="7" x2="30" y2="7" stroke="rgba(232,196,104,0.4)" strokeWidth="0.5"/>
          <line x1="50" y1="7" x2="80" y2="7" stroke="rgba(232,196,104,0.4)" strokeWidth="0.5"/>
          <circle cx="40" cy="7" r="3" fill="none" stroke="rgba(232,196,104,0.6)" strokeWidth="0.6"/>
          <circle cx="40" cy="7" r="0.8" fill="rgba(232,196,104,0.7)"/>
        </svg>

        <div style={{ fontFamily: 'EB Garamond, serif', fontStyle: 'italic', fontSize: 17, lineHeight: 1.7, color: 'rgba(235,225,201,0.85)', maxWidth: 280 }}>
          {content.body.map((l, i) => (
            <div key={i} style={{ minHeight: l ? 'auto' : 14 }}>{l}</div>
          ))}
        </div>

        <div style={{ flex: 1 }}/>

        <div style={{ fontFamily: 'Cinzel, serif', fontSize: 8, letterSpacing: '0.35em', color: 'rgba(232,196,104,0.5)', marginBottom: 18 }}>
          {content.sign}
        </div>
        <button style={{
          background: 'transparent', border: '1px solid rgba(232,196,104,0.4)',
          color: '#e8c468', fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: '0.4em',
          padding: '12px 32px', cursor: 'pointer', borderRadius: 1,
        }}>TURN  THE  PAGE  ›</button>
      </div>

      <div className="vignette"/>
    </div>
  );
}

export function LevelComplete() {
  const W = 390, H = 844;
  return (
    <div style={{ width: W, height: H, position: 'relative', background: '#0a0e18', overflow: 'hidden' }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <radialGradient id="halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f4d98a" stopOpacity="0.6"/>
            <stop offset="40%" stopColor="#e8c468" stopOpacity="0.28"/>
            <stop offset="100%" stopColor="#e8c468" stopOpacity="0"/>
          </radialGradient>
          <linearGradient id="sky-gradient-lc" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0e18"/>
            <stop offset="60%" stopColor="#0d1320"/>
            <stop offset="100%" stopColor="#14202f"/>
          </linearGradient>
        </defs>
        <rect width={W} height={H} fill="url(#sky-gradient-lc)"/>
        <circle cx={W/2} cy={H*0.42} r={180} fill="url(#halo)"/>
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const x1 = W/2 + Math.cos(a) * 60;
          const y1 = H*0.42 + Math.sin(a) * 60;
          const x2 = W/2 + Math.cos(a) * 140;
          const y2 = H*0.42 + Math.sin(a) * 140;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(232,196,104,0.25)" strokeWidth="0.4" style={{ animation: `slow-pulse ${3 + (i%4)}s ease-in-out ${i*0.1}s infinite` }}/>;
        })}
        <Motes count={30} area={{ w: W, h: H }}/>
      </svg>

      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.55em', color: 'rgba(232,196,104,0.55)' }}>VERB  RECOVERED</div>
        <div style={{
          marginTop: 28, padding: '24px 40px',
          border: '1px solid rgba(232,196,104,0.6)',
          background: 'rgba(13,20,34,0.6)', backdropFilter: 'blur(6px)',
          fontFamily: 'Cinzel, serif', fontSize: 36, fontWeight: 600, letterSpacing: '0.2em',
          color: '#f4d98a', textShadow: '0 0 24px rgba(232,196,104,0.7)',
        }}>WAKE</div>
        <div style={{ fontFamily: 'EB Garamond, serif', fontStyle: 'italic', fontSize: 15, color: 'rgba(235,225,201,0.7)', marginTop: 24, lineHeight: 1.6, maxWidth: 260 }}>
          &ldquo;What sleeps in stone may be called gently — once, by name.&rdquo;
        </div>

        <div style={{ marginTop: 60, display: 'flex', gap: 20, color: 'rgba(232,196,104,0.6)', fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.4em' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, color: '#e8c468', fontFamily: 'Cormorant Garamond' }}>4</div>
            <div>TURNS</div>
          </div>
          <div style={{ width: 1, background: 'rgba(232,196,104,0.2)' }}/>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, color: '#e8c468', fontFamily: 'Cormorant Garamond' }}>0</div>
            <div>WHISPERS</div>
          </div>
          <div style={{ width: 1, background: 'rgba(232,196,104,0.2)' }}/>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, color: '#e8c468', fontFamily: 'Cormorant Garamond' }}>★</div>
            <div>SILENT</div>
          </div>
        </div>

        <button style={{
          marginTop: 60, background: 'transparent', border: '1px solid rgba(232,196,104,0.5)',
          color: '#e8c468', fontFamily: 'Cinzel, serif', fontSize: 11, letterSpacing: '0.4em',
          padding: '14px 36px', cursor: 'pointer', borderRadius: 1,
        }}>CONTINUE  THE  READING  ›</button>
      </div>

      <div className="vignette"/>
    </div>
  );
}

export function CodexEntry() {
  const W = 390, H = 844;
  return (
    <div style={{ width: W, height: H, position: 'relative', background: '#070912', overflow: 'hidden' }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0 }}>
        <rect width={W} height={H} fill="#070912"/>
        <Motes count={10} area={{ w: W, h: H }}/>
      </svg>

      <div style={{ position: 'absolute', inset: 0, padding: '54px 24px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
          <button style={{ background: 'transparent', border: 'none', color: 'rgba(232,196,104,0.6)', fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.3em' }}>← ATLAS</button>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 8, letterSpacing: '0.55em', color: 'rgba(232,196,104,0.5)' }}>THE  CODEX</div>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 9, color: 'rgba(232,196,104,0.5)', letterSpacing: '0.2em' }}>3 / 24</div>
        </div>

        <div style={{ display: 'flex', gap: 14, marginBottom: 20, borderBottom: '1px solid rgba(232,196,104,0.15)', paddingBottom: 10 }}>
          {['VERBS', 'NOUNS', 'WHISPERS', 'BESTIARY'].map((t, i) => (
            <span key={t} style={{
              fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.3em',
              color: i === 0 ? '#e8c468' : 'rgba(232,196,104,0.4)',
              borderBottom: i === 0 ? '1px solid #e8c468' : 'none', paddingBottom: 8,
            }}>{t}</span>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { name: 'WAKE',   desc: 'to stir what slept',          glyph: 'W', state: 'lit' },
            { name: 'FOLLOW', desc: 'to be drawn after',            glyph: 'F', state: 'lit' },
            { name: 'SPEAK',  desc: 'to give a thing its name',     glyph: 'S', state: 'lit' },
            { name: '— — —',  desc: '~ unrecovered ~',              glyph: '?', state: 'dim' },
            { name: '— — —',  desc: '~ unrecovered ~',              glyph: '?', state: 'dim' },
            { name: 'FORGET', desc: 'to release a name into mist',  glyph: '⚯', state: 'far' },
          ].map((v, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 16,
              padding: '14px 16px',
              background: v.state === 'lit' ? 'rgba(232,196,104,0.04)' : 'rgba(13,20,34,0.5)',
              border: v.state === 'lit' ? '1px solid rgba(232,196,104,0.25)' : '1px solid rgba(168,218,220,0.08)',
            }}>
              <div style={{
                width: 44, height: 44,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(232,196,104,0.4)',
                background: 'rgba(13,20,34,0.6)',
                fontFamily: 'Cinzel, serif', fontSize: 18, fontWeight: 600,
                color: v.state === 'lit' ? '#f4d98a' : 'rgba(168,218,220,0.4)',
                textShadow: v.state === 'lit' ? '0 0 8px rgba(232,196,104,0.6)' : 'none',
              }}>{v.glyph}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: 14, letterSpacing: '0.18em', color: v.state === 'lit' ? '#e8c468' : 'rgba(168,218,220,0.4)' }}>
                  {v.name}
                </div>
                <div style={{ fontFamily: 'EB Garamond, serif', fontStyle: 'italic', fontSize: 12, color: v.state === 'lit' ? 'rgba(235,225,201,0.7)' : 'rgba(168,218,220,0.3)', marginTop: 2 }}>
                  {v.desc}
                </div>
              </div>
              {v.state === 'lit' && <span style={{ color: 'rgba(232,196,104,0.6)', fontSize: 14 }}>›</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="vignette"/>
    </div>
  );
}
