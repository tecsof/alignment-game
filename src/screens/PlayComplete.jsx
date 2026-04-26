import { Motes } from '../lib/iso';

export default function PlayComplete({ level, stats, onContinue }) {
  const W = 390, H = 844;
  const reward = level.reward;
  const fragment = level.fragment;

  return (
    <div style={{
      width: W, height: H, position: 'relative',
      background: '#0a0e18', overflow: 'hidden',
      fontFamily: 'var(--font-display)',
    }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <radialGradient id="pc-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f4d98a" stopOpacity="0.6" />
            <stop offset="40%" stopColor="#e8c468" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#e8c468" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="pc-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0e18" />
            <stop offset="60%" stopColor="#0d1320" />
            <stop offset="100%" stopColor="#14202f" />
          </linearGradient>
        </defs>
        <rect width={W} height={H} fill="url(#pc-sky)" />
        <circle cx={W / 2} cy={H * 0.36} r={180} fill="url(#pc-halo)" />
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const x1 = W / 2 + Math.cos(a) * 60;
          const y1 = H * 0.36 + Math.sin(a) * 60;
          const x2 = W / 2 + Math.cos(a) * 140;
          const y2 = H * 0.36 + Math.sin(a) * 140;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="rgba(232,196,104,0.25)" strokeWidth="0.4"
            style={{ animation: `slow-pulse ${3 + (i % 4)}s ease-in-out ${i * 0.1}s infinite` }} />;
        })}
        <Motes count={26} area={{ w: W, h: H }} />
      </svg>

      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '40px 32px', textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.55em',
          color: 'rgba(232,196,104,0.55)',
        }}>{reward ? 'VERB  RECOVERED' : 'FRAGMENT  HELD'}</div>

        <div style={{
          marginTop: 20, fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic', fontSize: 28, color: '#e8c468', lineHeight: 1.1,
        }}>{level.name}</div>

        {reward && (
          <div style={{
            marginTop: 28, padding: '20px 38px',
            border: '1px solid rgba(232,196,104,0.6)',
            background: 'rgba(13,20,34,0.6)', backdropFilter: 'blur(6px)',
            fontFamily: 'Cinzel, serif', fontSize: 32, fontWeight: 600,
            letterSpacing: '0.2em', color: '#f4d98a',
            textShadow: '0 0 24px rgba(232,196,104,0.7)',
          }}>{reward.verb}</div>
        )}

        {fragment && (
          <div style={{ marginTop: reward ? 28 : 22, maxWidth: 280 }}>
            <div style={{
              fontFamily: 'Cinzel, serif', fontSize: 8, letterSpacing: '0.35em',
              color: 'rgba(232,196,104,0.5)',
            }}>FRAGMENT · {fragment.title.toUpperCase()}</div>
            <div style={{
              fontFamily: 'EB Garamond, serif', fontStyle: 'italic',
              fontSize: 14, color: 'rgba(235,225,201,0.85)',
              marginTop: 10, lineHeight: 1.6,
            }}>
              {fragment.body.map((l, i) => <div key={i}>{l}</div>)}
            </div>
          </div>
        )}

        {!fragment && !reward && (
          <div style={{
            fontFamily: 'EB Garamond, serif', fontStyle: 'italic',
            fontSize: 14, color: 'rgba(235,225,201,0.7)', marginTop: 20,
            maxWidth: 260, lineHeight: 1.5,
          }}>"the chamber holds its breath, and remembers"</div>
        )}

        <div style={{
          marginTop: 40, display: 'flex', gap: 18,
          color: 'rgba(232,196,104,0.6)',
          fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.4em',
        }}>
          <Stat n={stats.turns} label="TURNS" />
          <div style={{ width: 1, background: 'rgba(232,196,104,0.2)' }} />
          <Stat n={stats.whispers} label="WHISPERS" />
          <div style={{ width: 1, background: 'rgba(232,196,104,0.2)' }} />
          <Stat n="★" label={stats.whispers === 0 ? 'SILENT' : 'HEARD'} />
        </div>

        <button onClick={onContinue} style={{
          marginTop: 44, background: 'transparent',
          border: '1px solid rgba(232,196,104,0.5)',
          color: '#e8c468', fontFamily: 'Cinzel, serif',
          fontSize: 11, letterSpacing: '0.4em',
          padding: '14px 36px', cursor: 'pointer', borderRadius: 1,
        }}>CONTINUE  THE  READING  ›</button>
      </div>

      <div className="vignette" />
    </div>
  );
}

function Stat({ n, label }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 22, color: '#e8c468', fontFamily: 'Cormorant Garamond' }}>{n}</div>
      <div>{label}</div>
    </div>
  );
}
