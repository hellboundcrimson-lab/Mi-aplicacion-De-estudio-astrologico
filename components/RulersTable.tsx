
import React from 'react';
import { PlanetPosition } from '../types';
import { Sparkles, Shield } from 'lucide-react';

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
            <span className="flex items-center gap-1.5 text-[9px] text-orange-400 uppercase font-black tracking-widest">
                <Sparkles size={10} /> Sagrado
            </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px]">
          <thead>
            <tr className="text-gray-500 uppercase tracking-[0.1em] border-b border-white/5 bg-black/20">
              <th className="px-8 py-4 font-bold">Jerarquía</th>
              <th className="px-8 py-4 font-bold">Signo/Grado</th>
              <th className="px-8 py-4 font-bold">Exotérico</th>
              <th className="px-8 py-4 font-bold">Esotérico</th>
              <th className="px-8 py-4 font-bold">Jerárquico</th>
              <th className="px-8 py-4 font-bold">Casa/Mutua</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {points.map((p, i) => (
              <tr key={i} className="hover:bg-white/[0.03] transition-all group">
                <td className="px-8 py-4 flex items-center gap-2">
                    {p.isSacred && <Sparkles size={12} className="text-orange-500" />}
                    <span className={`font-black tracking-tighter ${p.isSacred ? 'text-white' : 'text-slate-400'}`}>
                        {p.name.toUpperCase()}
                    </span>
                </td>
                <td className="px-8 py-4 text-slate-500 font-medium">
                    <span className="text-white">{p.sign}</span> {p.degree}°
                </td>
                <td className="px-8 py-4 text-orange-400/80 font-mono font-bold">{p.exotericRuler}</td>
                <td className="px-8 py-4 text-blue-400 font-mono font-bold">{p.esotericRuler}</td>
                <td className="px-8 py-4 text-purple-400 font-mono font-bold">{p.hierarchicalRuler}</td>
                <td className="px-8 py-4">
                    <div className="text-white font-bold mb-0.5">Casa {p.house}</div>
                    <div className="text-[9px] text-slate-500 uppercase font-medium">{p.mutualRegency}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RulersTable;
