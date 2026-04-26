import { useState, useEffect, useCallback } from 'react';

const KEY = 'alignment.save.v1';

const EMPTY = {
  // ids of levels completed (in any order)
  completed: [],
  // verbs recovered (Codex)
  verbs: [],
  // last-active level (for the Atlas "continue" affordance)
  lastLevel: 1,
  // total turns and whispers seen — not strictly needed but flavour
  stats: { turns: 0, whispers: 0 },
};

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...EMPTY };
    const v = JSON.parse(raw);
    return { ...EMPTY, ...v };
  } catch {
    return { ...EMPTY };
  }
}

function write(s) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch { /* localStorage unavailable */ }
}

export function useSave() {
  const [save, setSave] = useState(read);

  useEffect(() => { write(save); }, [save]);

  const completeLevel = useCallback((level, extra = {}) => {
    setSave((s) => {
      const completed = s.completed.includes(level.id) ? s.completed : [...s.completed, level.id];
      const verbs = level.reward && !s.verbs.includes(level.reward.verb)
        ? [...s.verbs, level.reward.verb]
        : s.verbs;
      return {
        ...s,
        completed,
        verbs,
        lastLevel: level.id,
        stats: {
          turns: s.stats.turns + (extra.turns || 0),
          whispers: s.stats.whispers + (extra.whispers || 0),
        },
      };
    });
  }, []);

  const setLastLevel = useCallback((id) => {
    setSave((s) => ({ ...s, lastLevel: id }));
  }, []);

  const reset = useCallback(() => setSave({ ...EMPTY }), []);

  const isUnlocked = useCallback((level) => {
    // Chapter 1 always playable. Other chapters open when previous chapter's
    // verb is recovered. Within a chapter the first 6 (numbered) levels open
    // sequentially. Hidden levels (sceneTag === 'side-chamber') open once
    // their parent chapter is reached.
    if (level.requires && level.requires.length) {
      for (const v of level.requires) if (!save.verbs.includes(v)) return false;
    }
    if (level.chapter > 1) {
      const prevVerb = ['WAKE', 'FOLLOW', 'SPEAK'][level.chapter - 2];
      if (!save.verbs.includes(prevVerb)) return false;
    }
    return true;
  }, [save.verbs]);

  return { save, completeLevel, setLastLevel, reset, isUnlocked };
}

export { EMPTY };
