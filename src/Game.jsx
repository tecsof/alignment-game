import { useState, useCallback } from 'react';
import './tokens.css';

import TitleScreen from './screens/TitleScreen';
import WorldMap from './screens/WorldMap';
import ChapterMenu from './screens/ChapterMenu';
import PlayLevel from './screens/PlayLevel';
import PlayComplete from './screens/PlayComplete';
import Codex from './screens/Codex';
import { useSave } from './lib/gameState';
import { LEVELS, getLevel, chapterLevels } from './lib/levels';

export default function Game() {
  const { save, completeLevel, setLastLevel, isUnlocked, reset } = useSave();
  const [view, setView] = useState({ kind: 'title' });
  const [solveStats, setSolveStats] = useState({ turns: 0, whispers: 0 });

  const currentChapter = Math.min(4, 1
    + (save.verbs.includes('WAKE')   ? 1 : 0)
    + (save.verbs.includes('FOLLOW') ? 1 : 0)
    + (save.verbs.includes('SPEAK')  ? 1 : 0));

  const goAtlas = useCallback(() => setView({ kind: 'atlas' }), []);
  const goChapter = useCallback((n) => setView({ kind: 'chapter', chapter: n }), []);
  const goCodex = useCallback(() => setView({ kind: 'codex' }), []);

  const goLevel = useCallback((level) => {
    setLastLevel(level.id);
    setView({ kind: 'level', levelId: level.id });
  }, [setLastLevel]);

  const onSolve = useCallback((stats) => {
    setSolveStats(stats);
    setView((v) => ({ kind: 'complete', levelId: v.levelId }));
  }, []);

  const onContinue = useCallback(() => {
    const cur = getLevel(view.levelId);
    if (!cur) { setView({ kind: 'atlas' }); return; }
    completeLevel(cur, solveStats);

    // Find next level: same chapter first, else next chapter, else codex.
    const inCh = chapterLevels(cur.chapter)
      .filter((l) => l.sceneTag !== 'side-chamber');
    const idx = inCh.findIndex((l) => l.id === cur.id);
    const next = inCh[idx + 1];
    if (next) {
      setView({ kind: 'chapter', chapter: cur.chapter });
    } else {
      // Chapter complete — drop to atlas to celebrate the new opening.
      setView({ kind: 'atlas' });
    }
  }, [view.levelId, completeLevel, solveStats]);

  // Continue from save: jump to the chapter that holds the last-played level.
  const onPlayFromTitle = useCallback(() => {
    const last = getLevel(save.lastLevel) || LEVELS[0];
    setView({ kind: 'chapter', chapter: last.chapter });
  }, [save.lastLevel]);

  if (view.kind === 'title') {
    return (
      <TitleShell>
        <TitleScreen ambient="dusk" onPlay={onPlayFromTitle} />
        <TitleNav onAtlas={goAtlas} onCodex={goCodex} onReset={reset} />
      </TitleShell>
    );
  }
  if (view.kind === 'atlas') {
    return (
      <Shell>
        <WorldMap ambient="night" currentChapter={currentChapter} onSelect={goChapter} />
        <FooterReturn onClick={() => setView({ kind: 'title' })} />
      </Shell>
    );
  }
  if (view.kind === 'chapter') {
    return (
      <Shell>
        <ChapterMenu chapter={view.chapter}
          save={save} isUnlocked={isUnlocked}
          onPick={goLevel}
          onBack={goAtlas} />
      </Shell>
    );
  }
  if (view.kind === 'level') {
    const level = getLevel(view.levelId);
    return (
      <Shell>
        <PlayLevel level={level}
          codexVerbs={save.verbs}
          onSolve={onSolve}
          onExit={() => setView({ kind: 'chapter', chapter: level.chapter })} />
      </Shell>
    );
  }
  if (view.kind === 'complete') {
    const level = getLevel(view.levelId);
    return (
      <Shell>
        <PlayComplete level={level} stats={solveStats} onContinue={onContinue} />
      </Shell>
    );
  }
  if (view.kind === 'codex') {
    return (
      <Shell>
        <Codex save={save} onBack={() => setView({ kind: 'title' })} />
      </Shell>
    );
  }
  return null;
}

// Centred phone-shaped frame for the game. Fills viewport, dims the
// surrounding area, and renders the game canvas in a 9:19.5 frame.
function Shell({ children }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#07090f',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <div style={{
        width: 390, height: 844, position: 'relative',
        boxShadow: '0 30px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(232,196,104,0.18)',
      }}>{children}</div>
    </div>
  );
}

function TitleShell({ children }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#07090f',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <div style={{
        width: 390, height: 844, position: 'relative',
        boxShadow: '0 30px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(232,196,104,0.18)',
      }}>{children}</div>
    </div>
  );
}

function TitleNav({ onAtlas, onCodex, onReset }) {
  return (
    <div style={{
      position: 'absolute', left: 24, right: 24, bottom: 24,
      display: 'flex', justifyContent: 'space-between',
      color: 'rgba(232,196,104,0.55)', fontFamily: 'Cinzel, serif',
      fontSize: 9, letterSpacing: '0.35em', pointerEvents: 'none',
    }}>
      <button onClick={onAtlas} style={navStyle}>ATLAS</button>
      <button onClick={onCodex} style={navStyle}>CODEX</button>
      <button onClick={onReset} style={navStyle} title="Erase save">ERASE</button>
    </div>
  );
}

const navStyle = {
  background: 'transparent', border: 'none', cursor: 'pointer',
  color: 'rgba(232,196,104,0.55)', font: 'inherit',
  letterSpacing: '0.35em', padding: '6px 8px', pointerEvents: 'auto',
};

function FooterReturn({ onClick }) {
  return (
    <button onClick={onClick} style={{
      position: 'absolute', top: 14, left: 14,
      background: 'rgba(13,20,34,0.7)', backdropFilter: 'blur(6px)',
      border: '1px solid rgba(232,196,104,0.25)',
      color: 'rgba(232,196,104,0.7)',
      fontFamily: 'Cinzel, serif', fontSize: 8, letterSpacing: '0.35em',
      padding: '6px 10px', cursor: 'pointer', borderRadius: 1,
      zIndex: 10,
    }}>← TITLE</button>
  );
}
