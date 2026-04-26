import { useState, useEffect } from 'react';
import './tokens.css';

import { DesignCanvas, DCSection, DCArtboard } from './components/DesignCanvas';
import { TweaksPanel, TweakSection, TweakSlider, TweakToggle, TweakRadio, useTweaks } from './components/TweaksPanel';

import TitleScreen from './screens/TitleScreen';
import WorldMap from './screens/WorldMap';
import Level from './screens/Level';
import { Narrative, LevelComplete, CodexEntry } from './screens/Narrative';
import { MothCourtLevel, AshChoirLevel } from './screens/Variants';

function Frame({ children }) {
  return (
    <div style={{
      width: 410, height: 864,
      padding: 10, borderRadius: 44,
      background: 'linear-gradient(180deg, #2a1f14 0%, #1a1410 100%)',
      boxShadow: '0 30px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(232,196,104,0.18)',
      position: 'relative',
    }}>
      <div style={{
        width: '100%', height: '100%', borderRadius: 36, overflow: 'hidden',
        position: 'relative', boxShadow: 'inset 0 0 0 1px rgba(232,196,104,0.15)',
      }}>
        {children}
        <div style={{
          position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
          width: 100, height: 28, borderRadius: 16, background: '#000', zIndex: 100,
        }}/>
      </div>
    </div>
  );
}

function PitchCard() {
  return (
    <div style={{
      width: '100%', height: '100%', padding: 40, boxSizing: 'border-box',
      background: '#0d1320', color: '#ebe1c9', fontFamily: 'EB Garamond, serif',
      overflow: 'auto', position: 'relative',
    }}>
      <div style={{ fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.5em', color: 'rgba(232,196,104,0.55)' }}>THE  PITCH</div>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 44, color: '#e8c468', margin: '8px 0 24px', fontWeight: 400, lineHeight: 1 }}>
        ALIGNMENT
      </h1>
      <p style={{ fontStyle: 'italic', fontSize: 16, lineHeight: 1.6, color: '#c9b88a' }}>
        <em>A game of sleeping verbs.</em>
      </p>
      <p style={{ fontSize: 14, lineHeight: 1.7, marginTop: 16 }}>
        Once the world had grammar. <strong style={{color:'#e8c468'}}>VERBS</strong> were carved into stone — the bound rules of how things behave. Then the verbs fell asleep, and the world forgot how to be.
      </p>
      <p style={{ fontSize: 14, lineHeight: 1.7 }}>
        You are a <strong style={{color:'#e8c468'}}>Reader</strong>, a small lantern-bearing pilgrim. Each chamber is a fragment — scattered glyph-stones suspended in 3D space. You can&apos;t push them. You can&apos;t pick them up. But you can <strong style={{color:'#a8dadc'}}>rotate the world</strong>.
      </p>
      <p style={{ fontSize: 14, lineHeight: 1.7 }}>
        From the right angle, glyphs visually align into a sentence — <span className="glyph-rune" style={{fontSize:12}}>LANTERN · WAKES · BRIDGE</span>. The moment it reads true, the rule fires. The bridge wakes. Walk it before the angle drifts.
      </p>
      <hr style={{ margin: '28px 0', border: 'none', borderTop: '1px solid rgba(232,196,104,0.2)' }}/>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, fontSize: 13 }}>
        <div>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 8, letterSpacing: '0.35em', color: 'rgba(232,196,104,0.55)' }}>INHERITANCE</div>
          <ul style={{ paddingLeft: 14, margin: '6px 0', lineHeight: 1.5 }}>
            <li>Rules-as-objects (<em>Baba is You</em>)</li>
            <li>Camera-as-mechanic (<em>Monument Valley</em>)</li>
            <li>Hand-curated melancholy (<em>Hollow Knight</em>)</li>
          </ul>
        </div>
        <div>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 8, letterSpacing: '0.35em', color: 'rgba(232,196,104,0.55)' }}>STRUCTURE</div>
          <ul style={{ paddingLeft: 14, margin: '6px 0', lineHeight: 1.5 }}>
            <li>4 chapters · 12 fragments each</li>
            <li>One verb recovered per chapter</li>
            <li>Linear spine, hidden side-chambers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function SystemCard() {
  return (
    <div style={{
      width: '100%', height: '100%', padding: 36, boxSizing: 'border-box',
      background: '#0d1320', color: '#ebe1c9', fontFamily: 'EB Garamond, serif',
      overflow: 'auto',
    }}>
      <div style={{ fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.5em', color: 'rgba(232,196,104,0.55)' }}>VISUAL  SYSTEM</div>
      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 28, color: '#e8c468', margin: '6px 0 24px', fontWeight: 400 }}>
        Inks, Lights, &amp; Stone
      </h2>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, color: '#a89a82', marginBottom: 8, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Inks</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[{c:'#07090f',n:'Void'},{c:'#0d1320',n:'Deep'},{c:'#14202f',n:'Night'},{c:'#1f2d3e',n:'Stone'},{c:'#3a4d63',n:'Mist'}].map(s => (
            <div key={s.n} style={{ flex: 1 }}>
              <div style={{ height: 56, background: s.c, border: '1px solid rgba(232,196,104,0.15)' }}/>
              <div style={{ fontSize: 9, color: '#a89a82', marginTop: 4, fontFamily: 'Cinzel', letterSpacing: '0.2em' }}>{s.n}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, color: '#a89a82', marginBottom: 8, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Lights</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[{c:'#e8c468',n:'Lantern'},{c:'#a8dadc',n:'Cathedral'},{c:'#c97a6a',n:'Relic'},{c:'#cdb8ff',n:'Hollow'}].map(s => (
            <div key={s.n} style={{ flex: 1 }}>
              <div style={{ height: 56, background: s.c, boxShadow: `0 0 24px ${s.c}55` }}/>
              <div style={{ fontSize: 9, color: '#a89a82', marginTop: 4, fontFamily: 'Cinzel', letterSpacing: '0.2em' }}>{s.n}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, color: '#a89a82', marginBottom: 8, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Type</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: 22, letterSpacing: '0.2em', color: '#f4d98a', textShadow: '0 0 8px rgba(232,196,104,0.5)' }}>LANTERN · WAKES</div>
            <div style={{ fontSize: 9, color: '#a89a82', marginTop: 4 }}>Cinzel — glyph-runes (the engraved sentence)</div>
          </div>
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 28, color: '#e8c468' }}>Once the world had grammar.</div>
            <div style={{ fontSize: 9, color: '#a89a82', marginTop: 4 }}>Cormorant Garamond — display &amp; narrative voice</div>
          </div>
          <div>
            <div style={{ fontFamily: 'EB Garamond, serif', fontSize: 14, color: '#ebe1c9', lineHeight: 1.5 }}>A bridge is not built. A bridge is named.</div>
            <div style={{ fontSize: 9, color: '#a89a82', marginTop: 4 }}>EB Garamond — body &amp; whispers</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MechanicCard() {
  return (
    <div style={{
      width: '100%', height: '100%', padding: 36, boxSizing: 'border-box',
      background: '#0d1320', color: '#ebe1c9', fontFamily: 'EB Garamond, serif',
      overflow: 'auto', position: 'relative',
    }}>
      <div style={{ fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.5em', color: 'rgba(232,196,104,0.55)' }}>THE  CORE  LOOP</div>
      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 28, color: '#e8c468', margin: '6px 0 24px', fontWeight: 400 }}>
        Rotate. Align. Walk.
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {[
          { n: 'I.',   t: 'Enter the chamber',  d: 'Glyph-stones float in 3D, scattered — at this angle they read nothing, or nonsense like BRIDGE · IS · STONE.' },
          { n: 'II.',  t: 'Turn the world',      d: 'A 4-cardinal rotation crown sits at the bottom of the screen. Each tap pivots the camera 90°. Glyphs swim through space.' },
          { n: 'III.', t: 'Find the angle',      d: 'From one perspective, the suspended glyphs visually align: LANTERN · WAKES · BRIDGE. The HUD readout illuminates.' },
          { n: 'IV.',  t: 'The world remembers', d: "The rule fires. A bridge of stone wakes from the void. Walk it. The angle holds for as long as you don't turn." },
          { n: 'V.',   t: 'Recover the verb',    d: "On exit, the verb (WAKE) joins your Codex. It can be invoked in later chambers — even when its glyph isn't present." },
        ].map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: 18, color: '#e8c468', minWidth: 28, letterSpacing: '0.1em' }}>{s.n}</div>
            <div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 18, color: '#ebe1c9' }}>{s.t}</div>
              <div style={{ fontSize: 13, color: 'rgba(235,225,201,0.65)', lineHeight: 1.55, marginTop: 3 }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 28, padding: '14px 16px', border: '1px solid rgba(168,218,220,0.25)', background: 'rgba(168,218,220,0.04)', fontSize: 12, lineHeight: 1.6, color: '#a8dadc', fontStyle: 'italic' }}>
        The twist on Baba is You: rules aren&apos;t arranged on the floor — they&apos;re suspended in space, and <em>only one viewpoint</em> reveals them. The puzzle is the camera.
      </div>
    </div>
  );
}

const TWEAK_DEFAULTS = { ambient: 'dusk', rotation: 0, showHint: false, audioOn: true };

export default function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [rot, setRot] = useState(tweaks.rotation || 0);
  useEffect(() => { setRot(tweaks.rotation); }, [tweaks.rotation]);

  return (
    <>
      <DesignCanvas>
        <DCSection id="overview" title="ALIGNMENT" subtitle="A game of sleeping verbs · mobile · web · 9:19.5">
          <DCArtboard id="title" label="01 · Title" width={410} height={864}>
            <Frame><TitleScreen ambient={tweaks.ambient}/></Frame>
          </DCArtboard>
          <DCArtboard id="atlas" label="02 · The Atlas" width={410} height={864}>
            <Frame><WorldMap ambient={tweaks.ambient} currentChapter={1}/></Frame>
          </DCArtboard>
          <DCArtboard id="opening" label="03 · Invocation" width={410} height={864}>
            <Frame><Narrative variant="opening"/></Frame>
          </DCArtboard>
        </DCSection>

        <DCSection id="play" title="The Reading" subtitle="The core mechanic — rotate the world, align the verb. Use the Tweaks panel to turn the rotation dial.">
          <DCArtboard id="ch1-unsolved" label="Ch I · The Reliquary — angle drifts" width={410} height={864}>
            <Frame><Level rotation={(rot + 1) % 4} ambient={tweaks.ambient} hint={tweaks.showHint}/></Frame>
          </DCArtboard>
          <DCArtboard id="ch1-solved" label="Ch I · The angle holds true" width={410} height={864}>
            <Frame><Level rotation={0} ambient={tweaks.ambient} hint={false}/></Frame>
          </DCArtboard>
          <DCArtboard id="ch1-live" label="Ch I · Live (rotation tweak)" width={410} height={864}>
            <Frame><Level rotation={rot} ambient={tweaks.ambient} hint={tweaks.showHint}/></Frame>
          </DCArtboard>
        </DCSection>

        <DCSection id="biomes" title="Biomes" subtitle="Same mechanic, different worlds. Each chapter introduces a new verb.">
          <DCArtboard id="ch2" label="Ch II · Moth Court — FOLLOW" width={410} height={864}>
            <Frame><MothCourtLevel rotation={rot}/></Frame>
          </DCArtboard>
          <DCArtboard id="ch3" label="Ch III · Ash Choir — SPEAK" width={410} height={864}>
            <Frame><AshChoirLevel rotation={rot}/></Frame>
          </DCArtboard>
        </DCSection>

        <DCSection id="rewards" title="Rewards & Lore" subtitle="The aftermath of solving — and how recovered verbs accumulate in the Codex.">
          <DCArtboard id="complete" label="Verb Recovered" width={410} height={864}>
            <Frame><LevelComplete/></Frame>
          </DCArtboard>
          <DCArtboard id="fragment" label="Fragment · On Bridges" width={410} height={864}>
            <Frame><Narrative variant="fragment"/></Frame>
          </DCArtboard>
          <DCArtboard id="codex" label="The Codex" width={410} height={864}>
            <Frame><CodexEntry/></Frame>
          </DCArtboard>
        </DCSection>

        <DCSection id="notes" title="Design Notes" subtitle="">
          <DCArtboard id="pitch" label="The Pitch" width={520} height={760}>
            <PitchCard/>
          </DCArtboard>
          <DCArtboard id="system" label="Visual System" width={520} height={760}>
            <SystemCard/>
          </DCArtboard>
          <DCArtboard id="mech" label="Mechanic Diagram" width={520} height={760}>
            <MechanicCard/>
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks" defaultOpen={true}>
        <TweakSection title="Ambient">
          <TweakRadio
            label="Time of day"
            value={tweaks.ambient}
            options={[
              { value: 'night', label: 'Night' },
              { value: 'dusk',  label: 'Dusk'  },
              { value: 'dawn',  label: 'Dawn'  },
            ]}
            onChange={(v) => setTweak('ambient', v)}
          />
        </TweakSection>
        <TweakSection title="Rotation">
          <TweakSlider
            label="Camera angle"
            min={0} max={3} step={1}
            value={tweaks.rotation}
            onChange={(v) => setTweak('rotation', v)}
          />
          <div style={{ fontSize: 11, color: '#a89a82', marginTop: 4 }}>
            Drag to turn the world. Angle 0 solves Chapter I.
          </div>
        </TweakSection>
        <TweakSection title="Difficulty">
          <TweakToggle
            label="Show whispers (hints)"
            value={tweaks.showHint}
            onChange={(v) => setTweak('showHint', v)}
          />
        </TweakSection>
        <TweakSection title="Audio (placeholder)">
          <TweakToggle
            label="Music & ambient"
            value={tweaks.audioOn}
            onChange={(v) => setTweak('audioOn', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}
