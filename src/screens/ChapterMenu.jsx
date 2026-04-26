import { Motes } from '../lib/iso';
import { CHAPTER_INFO, chapterLevels } from '../lib/levels';

export default function ChapterMenu({ chapter, save, isUnlocked, onPick, onBack }) {
  const W = 390, H = 844;
  const info = CHAPTER_INFO[chapter - 1];
  const levels = chapterLevels(chapter);
  const main = levels.filter((l) => l.sceneTag !== 'side-chamber');
  const hidden = levels.filter((l) => l.sceneTag === 'side-chamber');

  return (
    <div style={{
      width: W, height: H, position: 'relative', background: '#070912',
      overflow: 'hidden', fontFamily: 'var(--font-display)',
    }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <radialGradient id="cm-fog" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#1a2740" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#070912" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill="#070912" />
        <ellipse cx={W / 2} cy={H * 0.4} rx={W * 0.7} ry={H * 0.5} fill="url(#cm-fog)" />
        <Motes count={14} area={{ w: W, h: H }} />
      </svg>

      <div style={{ position: 'absolute', inset: 0, padding: '54px 24px 24px',
                    display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <button onClick={onBack} style={{
            background: 'transparent', border: 'none',
            color: 'rgba(232,196,104,0.6)', fontFamily: 'Cinzel, serif',
            fontSize: 9, letterSpacing: '0.3em', cursor: 'pointer',
          }}>← ATLAS</button>
          <div style={{
            fontFamily: 'Cinzel, serif', fontSize: 8, letterSpacing: '0.5em',
            color: 'rgba(232,196,104,0.5)',
          }}>CHAPTER · {romanize(info.n)}</div>
          <div style={{ width: 60 }} />
        </div>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic',
            fontSize: 28, color: '#e8c468', lineHeight: 1.1,
          }}>{info.name}</div>
          <div style={{
            fontFamily: 'EB Garamond, serif', fontStyle: 'italic',
            fontSize: 12, color: 'rgba(235,225,201,0.6)',
            marginTop: 6, padding: '0 12px', lineHeight: 1.5,
          }}>"{info.tag}"</div>
          <div style={{
            fontFamily: 'Cinzel, serif', fontSize: 8, letterSpacing: '0.4em',
            color: 'rgba(232,196,104,0.4)', marginTop: 10,
          }}>THE  VERB · {info.verb}</div>
        </div>

        <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {main.map((l, i) => (
            <LevelRow key={l.id} level={l}
              done={save.completed.includes(l.id)}
              unlocked={isUnlocked(l)}
              num={i + 1}
              onPick={onPick} />
          ))}

          {hidden.length > 0 && (
            <>
              <div style={{
                fontFamily: 'Cinzel, serif', fontSize: 8, letterSpacing: '0.4em',
                color: 'rgba(232,196,104,0.35)', marginTop: 14, marginBottom: 4,
                textAlign: 'center',
              }}>· SIDE  CHAMBERS ·</div>
              {hidden.map((l) => (
                <LevelRow key={l.id} level={l}
                  done={save.completed.includes(l.id)}
                  unlocked={isUnlocked(l)}
                  num="✦"
                  onPick={onPick} />
              ))}
            </>
          )}
        </div>
      </div>

      <div className="vignette" />
    </div>
  );
}

function LevelRow({ level, done, unlocked, num, onPick }) {
  const tone = !unlocked ? 'locked' : done ? 'done' : 'open';
  const border = tone === 'done' ? 'rgba(232,196,104,0.45)'
               : tone === 'open' ? 'rgba(232,196,104,0.25)'
               : 'rgba(168,218,220,0.1)';
  const titleColor = tone === 'done' ? '#f4d98a'
                   : tone === 'open' ? '#e8c468'
                   : 'rgba(168,218,220,0.4)';
  return (
    <button onClick={() => unlocked && onPick(level)}
      disabled={!unlocked}
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        width: '100%', padding: '12px 14px',
        background: tone === 'done' ? 'rgba(232,196,104,0.06)' : 'rgba(13,20,34,0.5)',
        border: `1px solid ${border}`,
        borderRadius: 1, cursor: unlocked ? 'pointer' : 'not-allowed',
        textAlign: 'left', fontFamily: 'inherit',
      }}>
      <div style={{
        width: 30, height: 30,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: `1px solid ${border}`,
        fontFamily: 'Cinzel, serif', fontSize: 11, fontWeight: 600,
        color: titleColor,
      }}>{tone === 'locked' ? '·' : num}</div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic',
          fontSize: 17, color: titleColor, lineHeight: 1.1,
        }}>{tone === 'locked' ? '— sealed —' : level.name}</div>
        <div style={{
          fontFamily: 'Cinzel, serif', fontSize: 7, letterSpacing: '0.35em',
          color: 'rgba(232,196,104,0.4)', marginTop: 4,
        }}>
          {tone === 'done' ? '★ READ' : tone === 'open' ? 'AWAITS' : '··· LOCKED'}
        </div>
      </div>
      {level.reward && tone !== 'locked' && (
        <div style={{
          fontFamily: 'Cinzel, serif', fontSize: 8, letterSpacing: '0.3em',
          color: tone === 'done' ? '#e8c468' : 'rgba(232,196,104,0.5)',
          padding: '2px 6px', border: '1px solid rgba(232,196,104,0.3)',
        }}>{level.reward.verb}</div>
      )}
    </button>
  );
}

function romanize(n) {
  return ['I', 'II', 'III', 'IV', 'V'][n - 1] || String(n);
}
