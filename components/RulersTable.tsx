
import React from 'react';
import { PlanetPosition } from '../types';

interface Props {
  points: PlanetPosition[];
  title: string;
}

const RulersTable: React.FC<Props> = ({ points, title }) => {
  return (
    <div className="glass-panel rounded-3xl overflow-hidden border-white/5">
      <div className="bg-white/5 px-6 py-4 border-b border-white/5">
        <h3 className="cinzel text-sm font-bold text-white tracking-widest">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px]">
          <thead>
            <tr className="text-gray-500 uppercase tracking-tighter border-b border-white/5">
              <th className="px-6 py-3 font-bold">Punto</th>
              <th className="px-6 py-3 font-bold">Signo</th>
              <th className="px-6 py-3 font-bold">Reg. Esotérico</th>
              <th className="px-6 py-3 font-bold">Reg. Exotérico</th>
              <th className="px-6 py-3 font-bold">Casa</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {points.map((p, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-3 text-white font-bold group-hover:text-purple-400">{p.name}</td>
                <td className="px-6 py-3 text-gray-400 italic">{p.sign} {p.degree}°</td>
                <td className="px-6 py-3 text-blue-400 font-mono">{p.esotericRuler}</td>
                <td className="px-6 py-3 text-orange-400 font-mono">{p.exotericRuler}</td>
                <td className="px-6 py-3 text-gray-500">{p.house}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RulersTable;
