import { isoXY, IsoBlock, Reader, IsoDefs, Motes } from '../lib/iso';
import { FloatingGlyph } from './Level';

export function MothCourtLevel({ rotation = 0 }) {
  const W = 390, H = 844;
  const sentence = ['MOTH', 'FOLLOWS', 'LANTERN'];
  const sentenceTrue = rotation % 4 === 0;

  return (
    <div style={{ width: W, height: H, position: 'relative', background: '#1a0f1f', overflow: 'hidden', fontFamily: 'var(--font-display)' }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0 }}>
        <IsoDefs/>
        <defs>
          <linearGradient id="moth-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a0f1f"/>
            <stop offset="60%" stopColor="#3a1f3a"/>
            <stop offset="100%" stopColor="#6b3838"/>
          </linearGradient>
          <radialGradient id="moth-glow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#e8c468" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#e8c468" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill="url(#moth-sky)"/>

        {[{x:0.15,y:0.32,r:30},{x:0.85,y:0.28,r:24},{x:0.55,y:0.22,r:20}].map((g,i)=>(
          <g key={i} transform={`translate(${W*g.x} ${H*g.y})`} opacity="0.3">
            <circle r={g.r} fill="none" stroke="rgba(232,196,104,0.5)" strokeWidth="0.6"/>
            {Array.from({length:12}).map((_,j)=>{
              const a = (j/12)*Math.PI*2;
              return <line key={j} x1={Math.cos(a)*g.r} y1={Math.sin(a)*g.r} x2={Math.cos(a)*(g.r+5)} y2={Math.sin(a)*(g.r+5)} stroke="rgba(232,196,104,0.5)" strokeWidth="0.6"/>;
            })}
            <line x1="0" y1={g.r} x2="0" y2={H*0.4} stroke="rgba(232,196,104,0.3)" strokeWidth="0.7"/>
          </g>
        ))}

        <g transform={`translate(${W/2 - 80} ${H*0.32})`}>
          {Array.from({length:7}).flatMap((_,x)=>
            Array.from({length:7}).map((_,y)=>{
              if ((x-3)**2 + (y-3)**2 > 9) return null;
              return <IsoBlock key={`${x}-${y}`} x={x} y={y} z={0} d={0.4}
                top="#3d2438" left="#1a0f1f" right="#2a1430"/>;
            })
          )}
          {[{x:1,y:3},{x:5,y:3},{x:3,y:1},{x:3,y:5}].map((b,i)=>(
            <IsoBlock key={i} x={b.x} y={b.y} z={0.4} d={0.6}
              top="#8a6228" left="#4a3520" right="#6a4a20"/>
          ))}

          {[
            { rune: 'MOTH',    x: 1.5, y: 4,   z: 1.6 },
            { rune: 'FOLLOWS', x: 3,   y: 1.5, z: 2.4 },
            { rune: 'LANTERN', x: 5,   y: 4.5, z: 1.4 },
            { rune: 'COURT',   x: 4,   y: 3,   z: 2.0 },
          ].map((g,i)=>{
            const a = (rotation*Math.PI/2);
            const dx = g.x-3, dy = g.y-3;
            const rx = 3 + dx*Math.cos(a) - dy*Math.sin(a);
            const ry = 3 + dx*Math.sin(a) + dy*Math.cos(a);
            const lit = sentence.includes(g.rune);
            return <FloatingGlyph key={i} x={rx} y={ry} z={g.z} rune={g.rune} lit={lit} resonating={lit && sentenceTrue}/>;
          })}

          <g transform={`translate(${isoXY(3, 3, 3.2).sx + 28} ${isoXY(3, 3, 3.2).sy})`}>
            <g style={{ transformOrigin: 'center', animation: 'lantern-flicker 2s ease-in-out infinite' }}>
              <ellipse cx="-6" cy="0" rx="6" ry="9" fill="rgba(232,196,104,0.7)" opacity="0.85" transform="rotate(-25 -6 0)"/>
              <ellipse cx="6" cy="0" rx="6" ry="9" fill="rgba(232,196,104,0.7)" opacity="0.85" transform="rotate(25 6 0)"/>
              <ellipse cx="-6" cy="0" rx="3" ry="6" fill="rgba(168,218,220,0.5)" transform="rotate(-25 -6 0)"/>
              <ellipse cx="6" cy="0" rx="3" ry="6" fill="rgba(168,218,220,0.5)" transform="rotate(25 6 0)"/>
              <ellipse cx="0" cy="0" rx="1.4" ry="6" fill="#0a0e18"/>
            </g>
          </g>

          <Reader x={1} y={5} z={0.4} scale={1.0}/>
        </g>

        <Motes count={20} area={{ w: W, h: H }}/>
        {sentenceTrue && <ellipse cx={W/2} cy={H*0.45} rx={W*0.5} ry={H*0.2} fill="url(#moth-glow)"/>}
      </svg>

      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ color: 'rgba(232,196,104,0.55)', fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.3em' }}>← ATLAS</span>
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: 8, letterSpacing: '0.4em', color: 'rgba(232,196,104,0.4)' }}>FRAGMENT · II — I</span>
          <span style={{ color: 'rgba(232,196,104,0.55)', fontSize: 14 }}>◫</span>
        </div>
        <div style={{
          background: sentenceTrue ? 'rgba(232,196,104,0.10)' : 'rgba(26,15,31,0.6)',
          border: sentenceTrue ? '1px solid rgba(232,196,104,0.55)' : '1px solid rgba(232,196,104,0.18)',
          padding: '12px 14px', textAlign: 'center', backdropFilter: 'blur(4px)',
        }}>
          <div style={{ fontFamily: 'EB Garamond, serif', fontStyle: 'italic', fontSize: 9, letterSpacing: '0.3em', color: 'rgba(232,196,104,0.45)', marginBottom: 6 }}>
            {sentenceTrue ? '— the wing remembers —' : '— the angle reads —'}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
            {sentence.map((w, i) => (
              <span key={i} style={{
                fontFamily: 'Cinzel, serif', fontSize: 13, fontWeight: 600, letterSpacing: '0.18em',
                color: sentenceTrue ? '#f4d98a' : 'rgba(232,196,104,0.7)',
                textShadow: sentenceTrue ? '0 0 12px rgba(232,196,104,0.7)' : 'none',
              }}>{w}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 36, display: 'flex', justifyContent: 'center' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(26,15,31,0.7)', backdropFilter: 'blur(6px)',
          border: '1px solid rgba(232,196,104,0.3)', borderRadius: 999,
          padding: '6px 14px',
        }}>
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: 8, letterSpacing: '0.35em', color: 'rgba(232,196,104,0.55)' }}>WIND  THE  COURT</span>
          <button style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(232,196,104,0.08)', border: '1px solid rgba(232,196,104,0.4)', color: '#e8c468' }}>↺</button>
          <button style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(232,196,104,0.08)', border: '1px solid rgba(232,196,104,0.4)', color: '#e8c468' }}>↻</button>
        </div>
      </div>

      <div className="vignette"/>
    </div>
  );
}

export function AshChoirLevel({ rotation = 0 }) {
  const W = 390, H = 844;
  const sentence = ['ASH', 'SPEAKS', 'TRUTH'];
  const sentenceTrue = rotation % 4 === 0;

  return (
    <div style={{ width: W, height: H, position: 'relative', background: '#0a0608', overflow: 'hidden', fontFamily: 'var(--font-display)' }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0 }}>
        <IsoDefs/>
        <defs>
          <linearGradient id="ash-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0608"/>
            <stop offset="50%" stopColor="#2a0a0c"/>
            <stop offset="100%" stopColor="#5a1f10"/>
          </linearGradient>
          <radialGradient id="ember-glow" cx="50%" cy="80%" r="60%">
            <stop offset="0%" stopColor="#c97a6a" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#c97a6a" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill="url(#ash-sky)"/>
        <ellipse cx={W/2} cy={H*0.95} rx={W*0.7} ry={H*0.3} fill="url(#ember-glow)"/>

        {Array.from({length:25}).map((_,i)=>{
          const x = (i*47+13)%W;
          const y = (i*31)%H;
          return <circle key={i} cx={x} cy={y} r={0.6+(i%3)*0.3} fill="rgba(232,196,104,0.5)"
            style={{ animation: `mote-drift ${8+i%4}s linear ${i*0.3}s infinite`, '--mx': '5px', '--my': '60px' }}/>;
        })}

        <g transform={`translate(${W/2 - 110} ${H*0.30})`}>
          {Array.from({length:9}).flatMap((_,x)=>
            Array.from({length:9}).map((_,y)=>{
              if (x+y<2 || x+y>13) return null;
              return <IsoBlock key={`${x}-${y}`} x={x} y={y} z={0} d={0.4}
                top="#2a1410" left="#0a0608" right="#1a0a08"/>;
            })
          )}
          {[
            {x:1,y:4,h:2.4},{x:1,y:5,h:1.8},{x:7,y:3,h:2.6},{x:7,y:4,h:2.0},
            {x:3,y:7,h:1.4},{x:5,y:1,h:1.8},
          ].map((b,i)=>(
            <g key={i}>
              <IsoBlock x={b.x} y={b.y} z={0} d={b.h}
                top="#3a1f1c" left="#1a0a08" right="#2a1410"/>
              <g>
                {Array.from({length:Math.floor(b.h*3)}).map((_,j)=>(
                  <IsoBlock key={j} x={b.x} y={b.y} z={j*0.3 + 0.1} d={0.05}
                    top="#e8c468" left="#8a6228" right="#c97a6a"/>
                ))}
              </g>
            </g>
          ))}

          <IsoBlock x={4} y={4} z={0.4} d={0.6} top="#5a1f10" left="#2a0a0c" right="#3a1410"/>
          <g transform={`translate(${isoXY(4, 4, 1).sx + 28} ${isoXY(4, 4, 1).sy})`}>
            <path d="M 0 -12 Q 6 -4 4 4 Q 8 6 0 10 Q -8 6 -4 4 Q -6 -4 0 -12"
                  fill="#e8c468" opacity="0.85" style={{ animation: 'lantern-flicker 1.5s ease-in-out infinite' }}/>
            <path d="M 0 -8 Q 3 -2 2 2 Q 4 4 0 6 Q -4 4 -2 2 Q -3 -2 0 -8"
                  fill="#f4d98a" style={{ animation: 'lantern-flicker 1.2s ease-in-out infinite' }}/>
          </g>

          {[
            { rune: 'ASH',    x: 2, y: 3, z: 2.0 },
            { rune: 'SPEAKS', x: 4, y: 2, z: 2.6 },
            { rune: 'TRUTH',  x: 6, y: 4, z: 2.2 },
            { rune: 'BURNS',  x: 5, y: 6, z: 1.8 },
          ].map((g,i)=>{
            const a = (rotation*Math.PI/2);
            const dx = g.x-4, dy = g.y-4;
            const rx = 4 + dx*Math.cos(a) - dy*Math.sin(a);
            const ry = 4 + dx*Math.sin(a) + dy*Math.cos(a);
            const lit = sentence.includes(g.rune);
            return <FloatingGlyph key={i} x={rx} y={ry} z={g.z} rune={g.rune} lit={lit} resonating={lit && sentenceTrue}/>;
          })}

          <Reader x={1} y={6} z={0.4} scale={1.0}/>
        </g>

        <Motes count={20} area={{ w: W, h: H }}/>
      </svg>

      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ color: 'rgba(201,122,106,0.65)', fontFamily: 'Cinzel, serif', fontSize: 9, letterSpacing: '0.3em' }}>← ATLAS</span>
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: 8, letterSpacing: '0.4em', color: 'rgba(201,122,106,0.5)' }}>FRAGMENT · III — IV</span>
          <span style={{ color: 'rgba(201,122,106,0.65)', fontSize: 14 }}>◫</span>
        </div>
        <div style={{
          background: sentenceTrue ? 'rgba(232,196,104,0.10)' : 'rgba(42,10,12,0.6)',
          border: sentenceTrue ? '1px solid rgba(232,196,104,0.55)' : '1px solid rgba(201,122,106,0.25)',
          padding: '12px 14px', textAlign: 'center', backdropFilter: 'blur(4px)',
        }}>
          <div style={{ fontFamily: 'EB Garamond, serif', fontStyle: 'italic', fontSize: 9, letterSpacing: '0.3em', color: 'rgba(232,196,104,0.45)', marginBottom: 6 }}>
            {sentenceTrue ? '— the choir holds true —' : '— the angle reads —'}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
            {sentence.map((w, i) => (
              <span key={i} style={{
                fontFamily: 'Cinzel, serif', fontSize: 13, fontWeight: 600, letterSpacing: '0.18em',
                color: sentenceTrue ? '#f4d98a' : 'rgba(201,122,106,0.8)',
                textShadow: sentenceTrue ? '0 0 12px rgba(232,196,104,0.7)' : 'none',
              }}>{w}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 36, display: 'flex', justifyContent: 'center' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(42,10,12,0.7)', backdropFilter: 'blur(6px)',
          border: '1px solid rgba(232,196,104,0.3)', borderRadius: 999, padding: '6px 14px',
        }}>
          <span style={{ fontFamily: 'Cinzel, serif', fontSize: 8, letterSpacing: '0.35em', color: 'rgba(232,196,104,0.55)' }}>STIR  THE  ASHES</span>
          <button style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(232,196,104,0.08)', border: '1px solid rgba(232,196,104,0.4)', color: '#e8c468' }}>↺</button>
          <button style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(232,196,104,0.08)', border: '1px solid rgba(232,196,104,0.4)', color: '#e8c468' }}>↻</button>
        </div>
      </div>

      <div className="vignette"/>
    </div>
  );
}
