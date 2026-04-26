import { useState, useEffect } from 'react';
import './tokens.css';

import Game from './Game';
import { DesignCanvas, DCSection, DCArtboard } from './components/DesignCanvas';
// kept around so the design pitch stays accessible at ?design
import { TweaksPanel, TweakSection, TweakSlider, TweakToggle, TweakRadio, useTweaks } from './components/TweaksPanel';
import TitleScreen from './screens/TitleScreen';
import WorldMap from './screens/WorldMap';
import Level from './screens/Level';
import { Narrative, LevelComplete, CodexEntry } from './screens/Narrative';
import { MothCourtLevel, AshChoirLevel } from './screens/Variants';

function useDesignMode() {
  const [on, setOn] = useState(() =>
    typeof window !== 'undefined'
      && new URLSearchParams(window.location.search).has('design'));
  useEffect(() => {
    const onPop = () =>
      setOn(new URLSearchParams(window.location.search).has('design'));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  return on;
}

export default function App() {
  const designMode = useDesignMode();
  if (designMode) return <DesignPitch />;
  return <Game />;
}

// ---------------------------------------------------------------------------
// The original design pitch — kept intact, accessible at ?design
// ---------------------------------------------------------------------------

function Frame({ children }) {
  return (
    <div style={{
      width: 410, height: 864, padding: 10, borderRadius: 44,
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
        }} />
      </div>
    </div>
  );
}

const TWEAK_DEFAULTS = { ambient: 'dusk', rotation: 0, showHint: false, audioOn: true };

function DesignPitch() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [rot, setRot] = useState(tweaks.rotation || 0);
  useEffect(() => { setRot(tweaks.rotation); }, [tweaks.rotation]);

  return (
    <>
      <DesignCanvas>
        <DCSection id="overview" title="ALIGNMENT" subtitle="A game of sleeping verbs · mobile · web · 9:19.5">
          <DCArtboard id="title" label="01 · Title" width={410} height={864}>
            <Frame><TitleScreen ambient={tweaks.ambient} /></Frame>
          </DCArtboard>
          <DCArtboard id="atlas" label="02 · The Atlas" width={410} height={864}>
            <Frame><WorldMap ambient={tweaks.ambient} currentChapter={1} /></Frame>
          </DCArtboard>
          <DCArtboard id="opening" label="03 · Invocation" width={410} height={864}>
            <Frame><Narrative variant="opening" /></Frame>
          </DCArtboard>
        </DCSection>

        <DCSection id="play" title="The Reading"
          subtitle="The core mechanic — rotate the world, align the verb. Use the Tweaks panel to turn the rotation dial.">
          <DCArtboard id="ch1-unsolved" label="Ch I · The Reliquary — angle drifts" width={410} height={864}>
            <Frame><Level rotation={(rot + 1) % 4} ambient={tweaks.ambient} hint={tweaks.showHint} /></Frame>
          </DCArtboard>
          <DCArtboard id="ch1-solved" label="Ch I · The angle holds true" width={410} height={864}>
            <Frame><Level rotation={0} ambient={tweaks.ambient} hint={false} /></Frame>
          </DCArtboard>
          <DCArtboard id="ch1-live" label="Ch I · Live (rotation tweak)" width={410} height={864}>
            <Frame><Level rotation={rot} ambient={tweaks.ambient} hint={tweaks.showHint} /></Frame>
          </DCArtboard>
        </DCSection>

        <DCSection id="biomes" title="Biomes" subtitle="Same mechanic, different worlds.">
          <DCArtboard id="ch2" label="Ch II · Moth Court — FOLLOW" width={410} height={864}>
            <Frame><MothCourtLevel rotation={rot} /></Frame>
          </DCArtboard>
          <DCArtboard id="ch3" label="Ch III · Ash Choir — SPEAK" width={410} height={864}>
            <Frame><AshChoirLevel rotation={rot} /></Frame>
          </DCArtboard>
        </DCSection>

        <DCSection id="rewards" title="Rewards & Lore"
          subtitle="The aftermath of solving — and how recovered verbs accumulate in the Codex.">
          <DCArtboard id="complete" label="Verb Recovered" width={410} height={864}>
            <Frame><LevelComplete /></Frame>
          </DCArtboard>
          <DCArtboard id="fragment" label="Fragment · On Bridges" width={410} height={864}>
            <Frame><Narrative variant="fragment" /></Frame>
          </DCArtboard>
          <DCArtboard id="codex" label="The Codex" width={410} height={864}>
            <Frame><CodexEntry /></Frame>
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks" defaultOpen={true}>
        <TweakSection title="Ambient">
          <TweakRadio label="Time of day" value={tweaks.ambient}
            options={[
              { value: 'night', label: 'Night' },
              { value: 'dusk',  label: 'Dusk' },
              { value: 'dawn',  label: 'Dawn' },
            ]}
            onChange={(v) => setTweak('ambient', v)} />
        </TweakSection>
        <TweakSection title="Rotation">
          <TweakSlider label="Camera angle" min={0} max={3} step={1}
            value={tweaks.rotation}
            onChange={(v) => setTweak('rotation', v)} />
          <div style={{ fontSize: 11, color: '#a89a82', marginTop: 4 }}>
            Drag to turn the world. Angle 0 solves Chapter I.
          </div>
        </TweakSection>
        <TweakSection title="Difficulty">
          <TweakToggle label="Show whispers (hints)"
            value={tweaks.showHint}
            onChange={(v) => setTweak('showHint', v)} />
        </TweakSection>
        <TweakSection title="Audio (placeholder)">
          <TweakToggle label="Music & ambient"
            value={tweaks.audioOn}
            onChange={(v) => setTweak('audioOn', v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}
