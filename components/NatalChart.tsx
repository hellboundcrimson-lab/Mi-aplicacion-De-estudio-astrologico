
import React from 'react';
import { PlanetPosition, Aspect } from '../types';
import { ZODIAC_SIGNS, ZODIAC_COLORS } from '../constants';

interface Props {
  points: PlanetPosition[];
  angles: { asc: number; mc: number; ic: number; dc: number };
  aspects?: Aspect[];
  title: string;
  rotation?: number;
}

const NatalChart: React.FC<Props> = ({ points, angles, aspects = [], title, rotation = 0 }) => {
  const size = 600;
  const center = size / 2;
  const radius = 230;
  const ringWidth = 40;

  const getPos = (deg: number, r: number) => {
    const rad = ((deg - 180 + rotation) * Math.PI) / 180;
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad)
    };
  };

  const getPlanetAngle = (pName: string) => {
    const p = points.find(pt => pt.name === pName);
    if (!p) return 0;
    return ZODIAC_SIGNS.indexOf(p.sign) * 30 + p.degree;
  };

  return (
    <div className="flex flex-col items-center glass-panel p-8 rounded-[3rem] border-white/10 shadow-2xl relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.05)_0%,_transparent_70%)] pointer-events-none"></div>
      
      <h3 className="cinzel text-xl text-white mb-6 font-bold tracking-[0.3em] uppercase text-center">
        {title}
      </h3>

      <div className="relative w-full max-w-[550px] aspect-square">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <radialGradient id="astreaGradient">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </radialGradient>
          </defs>

          {/* Zodiac Ring */}
          {ZODIAC_SIGNS.map((sign, i) => {
            const startDeg = i * 30;
            const endDeg = (i + 1) * 30;
            const midDeg = startDeg + 15;
            
            return (
              <g key={sign}>
                <path
                  d={`M ${getPos(startDeg, radius + ringWidth).x} ${getPos(startDeg, radius + ringWidth).y} 
                     A ${radius + ringWidth} ${radius + ringWidth} 0 0 1 ${getPos(endDeg, radius + ringWidth).x} ${getPos(endDeg, radius + ringWidth).y}
                     L ${getPos(endDeg, radius).x} ${getPos(endDeg, radius).y}
                     A ${radius} ${radius} 0 0 0 ${getPos(startDeg, radius).x} ${getPos(startDeg, radius).y} Z`}
                  fill={ZODIAC_COLORS[i]}
                  fillOpacity="0.1"
                  stroke="rgba(255,255,255,0.1)"
                />
                <text
                  {...getPos(midDeg, radius + 20)}
                  fill="white"
                  fontSize="10"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  className="opacity-40 cinzel font-bold"
                  transform={`rotate(${midDeg - 180 + rotation}, ${getPos(midDeg, radius + 20).x}, ${getPos(midDeg, radius + 20).y})`}
                >
                  {sign[0]}
                </text>
              </g>
            );
          })}

          {/* Planet Points */}
          {points.map((p, i) => {
            const angle = ZODIAC_SIGNS.indexOf(p.sign) * 30 + p.degree;
            const dist = radius - 60;
            const pos = getPos(angle, dist);
            
            const isSpecial = p.name === "Astrea" || p.name === "DNA";
            
            return (
              <g key={i} className="group cursor-help">
                {isSpecial && (
                  <circle 
                    cx={pos.x} cy={pos.y} r="14" 
                    fill="url(#astreaGradient)" 
                    className="animate-pulse opacity-20"
                  />
                )}
                <circle 
                  cx={pos.x} cy={pos.y} 
                  r={isSpecial ? "8" : "6"} 
                  fill={p.name === "Astrea" ? "#06b6d4" : p.name === "DNA" ? "#a855f7" : p.isSacred ? "#f59e0b" : "white"} 
                  className="transition-all group-hover:r-10" 
                  filter={isSpecial ? "url(#glow)" : ""}
                />
                <text x={pos.x} y={pos.y - 18} fill="white" fontSize="9" textAnchor="middle" className="hidden group-hover:block font-black uppercase tracking-tighter shadow-black drop-shadow-md">
                  {p.name}
                </text>
              </g>
            );
          })}
          
          <circle cx={center} cy={center} r="4" fill="white" className="opacity-20" />
        </svg>
      </div>
      <div className="mt-4 flex gap-6 text-[9px] font-black uppercase tracking-widest text-cyan-500/60">
         <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-cyan-400"></div> Astrea</div>
         <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500"></div> DNA</div>
         <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-400"></div> Sagrado</div>
      </div>
    </div>
  );
};

export default NatalChart;
