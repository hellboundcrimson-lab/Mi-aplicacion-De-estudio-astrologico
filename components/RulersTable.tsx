
import React from 'react';
import { PlanetPosition } from '../types';
import { Sparkles, Dna, ShieldCheck } from 'lucide-react';

interface Props {
  points: PlanetPosition[];
  title: string;
}

const RulersTable: React.FC<Props> = ({ points, title }) => {
  return (
    <div className="glass-panel rounded-[3rem] overflow-hidden border-white/5 shadow-2xl">
      <div className="bg-white/5 px-8 py-6 border-b border-white/10 flex justify-between items-center">
        <h3 className="cinzel text-lg font-bold text-white tracking-[0.2em]">{title}</h3>
        <div className="flex gap-4">
            <span className="flex items-center gap-1.5 text-[9px] text-cyan-400 uppercase font-black tracking-widest">
                <Dna size={10} /> Marcadores Galácticos
            </span>
            <span className="flex items-center gap-1.5 text-[9px] text-orange-400 uppercase font-black tracking-widest">
                <Sparkles size={10} /> Sagrado
            </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px]">
          <thead>
            <tr className="text-gray-500 uppercase tracking-[0.1em] border-b border-white/5 bg-black/20">
              <th className="px-8 py-4 font-bold">Punto Estelar</th>
              <th className="px-8 py-4 font-bold">Signo/Grado</th>
              <th className="px-8 py-4 font-bold">Exotérico</th>
              <th className="px-8 py-4 font-bold">Esotérico</th>
              <th className="px-8 py-4 font-bold">Jerárquico</th>
              <th className="px-8 py-4 font-bold">Ubicación / Linaje</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {points.map((p, i) => {
              const isSpecial = p.name === "Astrea" || p.name === "DNA";
              return (
                <tr key={i} className={`transition-all group ${isSpecial ? 'bg-cyan-500/5 hover:bg-cyan-500/10' : 'hover:bg-white/[0.03]'}`}>
                  <td className="px-8 py-4 flex items-center gap-2">
                      {isSpecial && <Dna size={12} className="text-cyan-400 animate-pulse" />}
                      {!isSpecial && p.isSacred && <Sparkles size={12} className="text-orange-500" />}
                      <span className={`font-black tracking-tighter ${isSpecial ? 'text-cyan-400' : p.isSacred ? 'text-white' : 'text-slate-400'}`}>
                          {p.name.toUpperCase()}
                      </span>
                  </td>
                  <td className="px-8 py-4 text-slate-500 font-medium">
                      <span className={isSpecial ? 'text-cyan-200' : 'text-white'}>{p.sign}</span> {p.degree}°
                  </td>
                  <td className="px-8 py-4 text-orange-400/80 font-mono font-bold">{p.exotericRuler}</td>
                  <td className="px-8 py-4 text-blue-400 font-mono font-bold">{p.esotericRuler}</td>
                  <td className="px-8 py-4 text-purple-400 font-mono font-bold">{p.hierarchicalRuler}</td>
                  <td className="px-8 py-4">
                      <div className={`font-bold mb-0.5 ${isSpecial ? 'text-cyan-400' : 'text-white'}`}>Casa {p.house}</div>
                      <div className={`text-[9px] uppercase font-medium ${isSpecial ? 'text-cyan-300' : 'text-slate-500'}`}>
                          {p.mutualRegency}
                      </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="bg-cyan-500/5 px-8 py-4 text-[9px] text-cyan-700 font-bold uppercase tracking-widest flex items-center gap-3">
         <ShieldCheck size={14} className="text-cyan-500" />
         El asteroide Astrea en su casa específica valida la pureza del ADN para la misión actual.
      </div>
    </div>
  );
};

export default RulersTable;
