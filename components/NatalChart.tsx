
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.05)_0%,_transparent_70%)] pointer-events-none"></div>
      
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
                  className="opacity-60 cinzel font-bold"
                  transform={`rotate(${midDeg - 180 + rotation}, ${getPos(midDeg, radius + 20).x}, ${getPos(midDeg, radius + 20).y})`}
                >
                  {sign[0]}
                </text>
              </g>
            );
          })}

          {/* Aspect Lines */}
          <g className="opacity-40">
            {aspects.map((asp, idx) => {
              const pos1 = getPos(getPlanetAngle(asp.p1), radius - 60);
              const pos2 = getPos(getPlanetAngle(asp.p2), radius - 60);
              let color = "#3b82f6"; // Armoniosos
              if (asp.type === 'square' || asp.type === 'opposition') color = "#ef4444"; // Tension
              if (asp.type === 'conjunction') color = "#f59e0b";

              return (
                <line 
                  key={idx}
                  x1={pos1.x} y1={pos1.y} 
                  x2={pos2.x} y2={pos2.y} 
                  stroke={color} 
                  strokeWidth={asp.type === 'trine' ? "2" : "1"}
                  strokeDasharray={asp.type === 'square' ? "4 4" : "none"}
                />
              );
            })}
          </g>

          {/* Main Axes */}
          <g filter="url(#glow)">
            <line 
              x1={getPos(angles.asc, radius + 20).x} y1={getPos(angles.asc, radius + 20).y} 
              x2={getPos(angles.dc, radius + 20).x} y2={getPos(angles.dc, radius + 20).y} 
              stroke="#a855f7" strokeWidth="2" 
            />
            <line 
              x1={getPos(angles.mc, radius + 20).x} y1={getPos(angles.mc, radius + 20).y} 
              x2={getPos(angles.ic, radius + 20).x} y2={getPos(angles.ic, radius + 20).y} 
              stroke="#ec4899" strokeWidth="1" strokeOpacity="0.5"
            />
          </g>

          {/* Planet Points */}
          {points.map((p, i) => {
            const angle = ZODIAC_SIGNS.indexOf(p.sign) * 30 + p.degree;
            const dist = radius - 60;
            const pos = getPos(angle, dist);
            
            return (
              <g key={i} className="group cursor-help">
                <circle cx={pos.x} cy={pos.y} r="6" fill={p.isSacred ? "#f59e0b" : "white"} className="transition-all group-hover:r-8" />
                <text x={pos.x} y={pos.y - 12} fill="white" fontSize="9" textAnchor="middle" className="hidden group-hover:block font-bold">
                  {p.name}
                </text>
              </g>
            );
          })}
          
          <circle cx={center} cy={center} r="4" fill="white" className="opacity-20" />
        </svg>
      </div>
    </div>
  );
};

export default NatalChart;
