// 30 hand-crafted fragments across 4 chapters.
//
// Each level has a `solveAt` rotation index (0..3) that reveals the true
// sentence. Other rotations show evocative-but-wrong sentences — decoys.
//
// `glyphs` is the pool of stones floating in the chamber. Their `(x,y,z)` are
// rotated around the chamber centre by the camera angle. Words listed in any
// `sentenceByAngle` entry MUST exist in `glyphs`.

const CHAPTERS = [
  { n: 1, name: 'The Sunken Reliquary', verb: 'WAKE',   biome: 'cathedral', tag: 'A drowned cathedral. Bells ring in the silt.' },
  { n: 2, name: 'Moth Court',           verb: 'FOLLOW', biome: 'moth',      tag: 'Clockwork forest. Wings beat slowly.' },
  { n: 3, name: 'Ash Choir',            verb: 'SPEAK',  biome: 'ash',       tag: 'A library that learned to sing as it burned.' },
  { n: 4, name: 'The Hollow Sky',       verb: 'FORGET', biome: 'hollow',    tag: 'Where the last Reader laid down their lantern.' },
];

// Default glyph layout for a 4-word pool — positions tuned to look "scattered
// in 3D" yet land on a recognisable line at the solve angle.
const POS = {
  3: [ // 3-word pool layout
    { x: 1.2, y: 5.4, z: 1.8 },
    { x: 4.0, y: 4.0, z: 2.6 },
    { x: 6.4, y: 3.2, z: 1.4 },
  ],
  4: [
    { x: 1.2, y: 5.4, z: 1.8 },
    { x: 3.4, y: 3.6, z: 2.6 },
    { x: 5.6, y: 4.2, z: 1.4 },
    { x: 4.4, y: 6.4, z: 2.2 },
  ],
  5: [
    { x: 1.2, y: 5.4, z: 1.8 },
    { x: 3.0, y: 3.4, z: 2.6 },
    { x: 5.0, y: 3.0, z: 1.4 },
    { x: 6.6, y: 5.2, z: 2.2 },
    { x: 3.8, y: 6.4, z: 1.6 },
  ],
  6: [
    { x: 1.0, y: 5.6, z: 1.8 },
    { x: 2.6, y: 3.0, z: 2.4 },
    { x: 4.4, y: 2.4, z: 1.4 },
    { x: 6.4, y: 3.4, z: 2.2 },
    { x: 6.0, y: 6.0, z: 1.6 },
    { x: 3.0, y: 6.6, z: 2.8 },
  ],
};

// Build a level from a compact spec. Pool order is preserved.
function L(spec) {
  const pool = spec.pool;
  const positions = POS[pool.length] || POS[6];
  const glyphs = pool.map((rune, i) => ({ rune, ...positions[i] }));
  return {
    id: spec.id,
    chapter: spec.chapter,
    name: spec.name,
    biome: CHAPTERS[spec.chapter - 1].biome,
    ambient: spec.ambient || 'night',
    solveAt: spec.solveAt,
    sentenceByAngle: spec.sentenceByAngle,
    pool,
    glyphs,
    hint: spec.hint || null,
    fragment: spec.fragment || null,
    reward: spec.reward || null,
    requires: spec.requires || [],
    sceneTag: spec.sceneTag || null,
  };
}

// ---- Chapter I — The Sunken Reliquary — verb WAKE -------------------------

const CH1 = [
  L({
    id: 1, chapter: 1,
    name: 'The First Light',
    ambient: 'night',
    pool: ['LANTERN', 'WAKES', 'BRIDGE', 'STONE', 'IS', 'SILENT'],
    solveAt: 0,
    sentenceByAngle: [
      ['LANTERN', 'WAKES', 'BRIDGE'],
      ['BRIDGE', 'IS', 'STONE'],
      ['STONE', 'IS', 'SILENT'],
      ['LANTERN', 'IS', 'SILENT'],
    ],
    hint: '"When the lantern stands behind the verb, and the verb behind the bridge — the world remembers itself."',
    fragment: { title: 'On Bridges', body: ['A bridge is not built.', 'A bridge is named.'] },
  }),
  L({
    id: 2, chapter: 1,
    name: 'The Drowned Bell',
    pool: ['BELL', 'WAKES', 'WATER', 'IS', 'STILL', 'SLEEPS'],
    solveAt: 2,
    sentenceByAngle: [
      ['WATER', 'IS', 'STILL'],
      ['BELL', 'IS', 'WATER'],
      ['BELL', 'WAKES', 'WATER'],
      ['WATER', 'SLEEPS', 'STILL'],
    ],
    hint: '"The bell remembers what the tide forgot."',
  }),
  L({
    id: 3, chapter: 1,
    name: 'The Sleeping Stair',
    pool: ['STAIR', 'WAKES', 'STONE', 'IS', 'COLD', 'BREATH'],
    solveAt: 1,
    sentenceByAngle: [
      ['STONE', 'IS', 'COLD'],
      ['STAIR', 'WAKES', 'STONE'],
      ['BREATH', 'IS', 'STONE'],
      ['STAIR', 'IS', 'COLD'],
    ],
  }),
  L({
    id: 4, chapter: 1,
    name: 'The First Reading',
    pool: ['READER', 'WAKES', 'STONE', 'LIGHT', 'IS', 'NAME'],
    solveAt: 3,
    sentenceByAngle: [
      ['LIGHT', 'IS', 'NAME'],
      ['STONE', 'IS', 'LIGHT'],
      ['NAME', 'IS', 'STONE'],
      ['READER', 'WAKES', 'STONE'],
    ],
  }),
  L({
    id: 5, chapter: 1,
    name: 'The Sunken Choir',
    pool: ['VOICE', 'WAKES', 'BELL', 'CHOIR', 'IS', 'SUNK'],
    solveAt: 0,
    sentenceByAngle: [
      ['VOICE', 'WAKES', 'BELL'],
      ['BELL', 'IS', 'SUNK'],
      ['CHOIR', 'IS', 'SUNK'],
      ['BELL', 'IS', 'CHOIR'],
    ],
  }),
  L({
    id: 6, chapter: 1,
    name: 'The Reliquary',
    pool: ['LANTERN', 'WAKES', 'GATE', 'KEY', 'IS', 'LOST'],
    solveAt: 2,
    sentenceByAngle: [
      ['KEY', 'IS', 'LOST'],
      ['GATE', 'IS', 'LOST'],
      ['LANTERN', 'WAKES', 'GATE'],
      ['LANTERN', 'IS', 'KEY'],
    ],
    fragment: { title: 'On Waking',
      body: ['What sleeps in stone may be called', 'gently — once, by name.'] },
    reward: { verb: 'WAKE', glyph: 'W' },
  }),
];

// ---- Chapter II — Moth Court — verb FOLLOW --------------------------------

const CH2 = [
  L({
    id: 7, chapter: 2,
    name: 'The First Wing',
    ambient: 'dusk',
    pool: ['MOTH', 'FOLLOWS', 'LANTERN', 'WING', 'IS', 'NIGHT'],
    solveAt: 1,
    sentenceByAngle: [
      ['WING', 'IS', 'NIGHT'],
      ['MOTH', 'FOLLOWS', 'LANTERN'],
      ['LANTERN', 'IS', 'WING'],
      ['NIGHT', 'IS', 'MOTH'],
    ],
    hint: '"What is drawn after the light forgets what it was."',
  }),
  L({
    id: 8, chapter: 2,
    name: 'The Glass Petal',
    ambient: 'dusk',
    pool: ['WING', 'FOLLOWS', 'LIGHT', 'GLASS', 'IS', 'BROKEN'],
    solveAt: 3,
    sentenceByAngle: [
      ['GLASS', 'IS', 'BROKEN'],
      ['LIGHT', 'IS', 'GLASS'],
      ['BROKEN', 'IS', 'WING'],
      ['WING', 'FOLLOWS', 'LIGHT'],
    ],
  }),
  L({
    id: 9, chapter: 2,
    name: 'The Court Bell',
    ambient: 'dusk',
    pool: ['COURT', 'FOLLOWS', 'BELL', 'TIME', 'IS', 'STILL'],
    solveAt: 0,
    sentenceByAngle: [
      ['COURT', 'FOLLOWS', 'BELL'],
      ['BELL', 'IS', 'STILL'],
      ['TIME', 'IS', 'STILL'],
      ['BELL', 'IS', 'COURT'],
    ],
  }),
  L({
    id: 10, chapter: 2,
    name: 'The Slow Dance',
    ambient: 'dusk',
    pool: ['SHADOW', 'FOLLOWS', 'MOTH', 'WING', 'IS', 'SLOW'],
    solveAt: 2,
    sentenceByAngle: [
      ['WING', 'IS', 'SLOW'],
      ['MOTH', 'IS', 'SHADOW'],
      ['SHADOW', 'FOLLOWS', 'MOTH'],
      ['SLOW', 'IS', 'WING'],
    ],
  }),
  L({
    id: 11, chapter: 2,
    name: 'The Hollow Wing',
    ambient: 'dusk',
    pool: ['DUST', 'FOLLOWS', 'WING', 'COURT', 'IS', 'HOLLOW'],
    solveAt: 1,
    sentenceByAngle: [
      ['COURT', 'IS', 'HOLLOW'],
      ['DUST', 'FOLLOWS', 'WING'],
      ['WING', 'IS', 'DUST'],
      ['HOLLOW', 'IS', 'COURT'],
    ],
  }),
  L({
    id: 12, chapter: 2,
    name: 'The Wakened Court',
    ambient: 'dusk',
    pool: ['MOTH', 'FOLLOWS', 'LANTERN', 'WAKES', 'GATE'],
    solveAt: 0,
    sentenceByAngle: [
      ['MOTH', 'FOLLOWS', 'LANTERN', 'WAKES', 'GATE'],
      ['GATE', 'WAKES', 'LANTERN'],
      ['LANTERN', 'FOLLOWS', 'MOTH'],
      ['MOTH', 'WAKES', 'GATE'],
    ],
    requires: ['WAKE'],
    hint: '"Two verbs in one sentence — what the moth follows, the lantern wakes."',
    fragment: { title: 'On Following',
      body: ['To follow is not to be led.', 'It is to remember the way.'] },
    reward: { verb: 'FOLLOW', glyph: 'F' },
  }),
];

// ---- Chapter III — Ash Choir — verb SPEAK ---------------------------------

const CH3 = [
  L({
    id: 13, chapter: 3,
    name: 'The First Ember',
    ambient: 'dusk',
    pool: ['ASH', 'SPEAKS', 'TRUTH', 'EMBER', 'IS', 'WARM'],
    solveAt: 2,
    sentenceByAngle: [
      ['EMBER', 'IS', 'WARM'],
      ['TRUTH', 'IS', 'ASH'],
      ['ASH', 'SPEAKS', 'TRUTH'],
      ['WARM', 'IS', 'EMBER'],
    ],
    hint: '"The first thing a fire learns is its own name."',
  }),
  L({
    id: 14, chapter: 3,
    name: 'The Burning Page',
    ambient: 'dusk',
    pool: ['BOOK', 'SPEAKS', 'FIRE', 'PAGE', 'IS', 'GONE'],
    solveAt: 1,
    sentenceByAngle: [
      ['PAGE', 'IS', 'GONE'],
      ['BOOK', 'SPEAKS', 'FIRE'],
      ['FIRE', 'IS', 'PAGE'],
      ['GONE', 'IS', 'BOOK'],
    ],
  }),
  L({
    id: 15, chapter: 3,
    name: "The Choir's Tongue",
    ambient: 'dusk',
    pool: ['CHOIR', 'SPEAKS', 'NAME', 'TONGUE', 'IS', 'ASH'],
    solveAt: 3,
    sentenceByAngle: [
      ['TONGUE', 'IS', 'ASH'],
      ['NAME', 'IS', 'TONGUE'],
      ['ASH', 'IS', 'NAME'],
      ['CHOIR', 'SPEAKS', 'NAME'],
    ],
  }),
  L({
    id: 16, chapter: 3,
    name: 'The Loud Silence',
    ambient: 'dusk',
    pool: ['STONE', 'SPEAKS', 'SILENCE', 'WORD', 'IS', 'OLD'],
    solveAt: 0,
    sentenceByAngle: [
      ['STONE', 'SPEAKS', 'SILENCE'],
      ['WORD', 'IS', 'OLD'],
      ['SILENCE', 'IS', 'STONE'],
      ['OLD', 'IS', 'WORD'],
    ],
  }),
  L({
    id: 17, chapter: 3,
    name: 'Library of Smoke',
    ambient: 'dusk',
    pool: ['SMOKE', 'SPEAKS', 'MEMORY', 'BOOK', 'IS', 'GONE'],
    solveAt: 1,
    sentenceByAngle: [
      ['BOOK', 'IS', 'GONE'],
      ['SMOKE', 'SPEAKS', 'MEMORY'],
      ['MEMORY', 'IS', 'SMOKE'],
      ['GONE', 'IS', 'BOOK'],
    ],
  }),
  L({
    id: 18, chapter: 3,
    name: 'The Last Word',
    ambient: 'dusk',
    pool: ['ASH', 'SPEAKS', 'TRUTH', 'WAKES', 'DOOR'],
    solveAt: 2,
    sentenceByAngle: [
      ['DOOR', 'WAKES', 'ASH'],
      ['TRUTH', 'SPEAKS', 'DOOR'],
      ['ASH', 'SPEAKS', 'TRUTH', 'WAKES', 'DOOR'],
      ['WAKES', 'IS', 'ASH'],
    ],
    requires: ['WAKE'],
    fragment: { title: 'On Speaking',
      body: ['To speak a name is to remember', 'that the world was once listening.'] },
    reward: { verb: 'SPEAK', glyph: 'S' },
  }),
];

// ---- Chapter IV — The Hollow Sky — verb FORGET ----------------------------

const CH4 = [
  L({
    id: 19, chapter: 4,
    name: 'The Empty Lamp',
    ambient: 'night',
    pool: ['LAMP', 'FORGETS', 'FLAME', 'WICK', 'IS', 'COLD'],
    solveAt: 3,
    sentenceByAngle: [
      ['WICK', 'IS', 'COLD'],
      ['FLAME', 'IS', 'LAMP'],
      ['COLD', 'IS', 'WICK'],
      ['LAMP', 'FORGETS', 'FLAME'],
    ],
    hint: '"To forget is the last verb a Reader learns."',
  }),
  L({
    id: 20, chapter: 4,
    name: 'The Quiet Star',
    pool: ['STAR', 'FORGETS', 'NORTH', 'SKY', 'IS', 'WIDE'],
    solveAt: 0,
    sentenceByAngle: [
      ['STAR', 'FORGETS', 'NORTH'],
      ['SKY', 'IS', 'WIDE'],
      ['NORTH', 'IS', 'SKY'],
      ['WIDE', 'IS', 'STAR'],
    ],
  }),
  L({
    id: 21, chapter: 4,
    name: 'The Last Reader',
    pool: ['READER', 'FORGETS', 'NAME', 'SELF', 'IS', 'GONE'],
    solveAt: 1,
    sentenceByAngle: [
      ['SELF', 'IS', 'GONE'],
      ['READER', 'FORGETS', 'NAME'],
      ['NAME', 'IS', 'SELF'],
      ['GONE', 'IS', 'READER'],
    ],
  }),
  L({
    id: 22, chapter: 4,
    name: 'The Hollow Path',
    pool: ['PATH', 'FORGETS', 'WAY', 'STEP', 'IS', 'HOLLOW'],
    solveAt: 2,
    sentenceByAngle: [
      ['STEP', 'IS', 'HOLLOW'],
      ['WAY', 'IS', 'STEP'],
      ['PATH', 'FORGETS', 'WAY'],
      ['HOLLOW', 'IS', 'PATH'],
    ],
  }),
  L({
    id: 23, chapter: 4,
    name: 'Beneath the Sky',
    pool: ['SKY', 'FORGETS', 'LIGHT', 'CLOUD', 'IS', 'ASH'],
    solveAt: 0,
    sentenceByAngle: [
      ['SKY', 'FORGETS', 'LIGHT'],
      ['CLOUD', 'IS', 'ASH'],
      ['LIGHT', 'IS', 'CLOUD'],
      ['ASH', 'IS', 'SKY'],
    ],
    requires: ['SPEAK'],
  }),
  L({
    id: 24, chapter: 4,
    name: 'The Final Reading',
    pool: ['READER', 'FORGETS', 'LANTERN', 'SPEAKS', 'END'],
    solveAt: 3,
    sentenceByAngle: [
      ['END', 'SPEAKS', 'READER'],
      ['LANTERN', 'FORGETS', 'END'],
      ['SPEAKS', 'IS', 'LANTERN'],
      ['READER', 'FORGETS', 'LANTERN', 'SPEAKS', 'END'],
    ],
    requires: ['WAKE', 'FOLLOW', 'SPEAK'],
    fragment: { title: 'On Forgetting',
      body: ['To forget is to release a name', 'gently, into the mist between worlds.'] },
    reward: { verb: 'FORGET', glyph: '⚯' },
  }),
];

// ---- Hidden side-chambers (one per chapter, plus 2 extras in Ch I & IV) ---

const HIDDEN = [
  L({
    id: 25, chapter: 1,
    name: 'The Tide Below',
    pool: ['TIDE', 'WAKES', 'DEEP', 'MOON', 'IS', 'COLD'],
    solveAt: 1,
    sentenceByAngle: [
      ['MOON', 'IS', 'COLD'],
      ['TIDE', 'WAKES', 'DEEP'],
      ['DEEP', 'IS', 'TIDE'],
      ['COLD', 'IS', 'MOON'],
    ],
    sceneTag: 'side-chamber',
  }),
  L({
    id: 26, chapter: 1,
    name: 'The Reading Pool',
    pool: ['POOL', 'WAKES', 'MOON', 'SILT', 'IS', 'STILL'],
    solveAt: 0,
    sentenceByAngle: [
      ['POOL', 'WAKES', 'MOON'],
      ['SILT', 'IS', 'STILL'],
      ['MOON', 'IS', 'SILT'],
      ['STILL', 'IS', 'POOL'],
    ],
    sceneTag: 'side-chamber',
  }),
  L({
    id: 27, chapter: 2,
    name: 'The Glass Wing',
    ambient: 'dusk',
    pool: ['WING', 'FOLLOWS', 'WIND', 'GLASS', 'IS', 'CLEAR'],
    solveAt: 2,
    sentenceByAngle: [
      ['GLASS', 'IS', 'CLEAR'],
      ['WIND', 'IS', 'GLASS'],
      ['WING', 'FOLLOWS', 'WIND'],
      ['CLEAR', 'IS', 'WING'],
    ],
    sceneTag: 'side-chamber',
  }),
  L({
    id: 28, chapter: 3,
    name: 'The Last Verse',
    ambient: 'dusk',
    pool: ['VERSE', 'SPEAKS', 'ASHES', 'PEN', 'IS', 'BURNT'],
    solveAt: 3,
    sentenceByAngle: [
      ['PEN', 'IS', 'BURNT'],
      ['ASHES', 'IS', 'PEN'],
      ['BURNT', 'IS', 'VERSE'],
      ['VERSE', 'SPEAKS', 'ASHES'],
    ],
    sceneTag: 'side-chamber',
  }),
  L({
    id: 29, chapter: 4,
    name: 'The Forgetting',
    pool: ['DUST', 'FORGETS', 'DUST', 'WIND', 'IS', 'EMPTY'],
    // Note: pool repeats DUST intentionally — render layer must dedupe.
    solveAt: 0,
    sentenceByAngle: [
      ['DUST', 'FORGETS', 'WIND'],
      ['WIND', 'IS', 'EMPTY'],
      ['EMPTY', 'IS', 'DUST'],
      ['DUST', 'IS', 'WIND'],
    ],
    sceneTag: 'side-chamber',
  }),
  L({
    id: 30, chapter: 4,
    name: 'The Hollow Sky',
    pool: ['STAR', 'FORGETS', 'STAR', 'SKY', 'IS', 'EMPTY'],
    solveAt: 2,
    sentenceByAngle: [
      ['SKY', 'IS', 'EMPTY'],
      ['EMPTY', 'IS', 'STAR'],
      ['STAR', 'FORGETS', 'SKY'],
      ['STAR', 'IS', 'EMPTY'],
    ],
    sceneTag: 'side-chamber',
    requires: ['FORGET'],
  }),
];

// Dedupe pool words (level 29 has DUST twice — drop the duplicate).
for (const lvl of [...CH1, ...CH2, ...CH3, ...CH4, ...HIDDEN]) {
  const seen = new Set();
  lvl.pool = lvl.pool.filter((r) => (seen.has(r) ? false : (seen.add(r), true)));
  const positions = POS[lvl.pool.length] || POS[6];
  lvl.glyphs = lvl.pool.map((rune, i) => ({ rune, ...positions[i] }));
}

export const LEVELS = [...CH1, ...CH2, ...CH3, ...CH4, ...HIDDEN];

export const CHAPTER_INFO = CHAPTERS;

export function getLevel(id) {
  return LEVELS.find((l) => l.id === id);
}

export function chapterLevels(chapter) {
  return LEVELS.filter((l) => l.chapter === chapter);
}
