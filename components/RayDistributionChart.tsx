
import React from 'react';
import { RayScore } from '../types';

interface Props {
  data: RayScore[];
  title: string;
  color: string;
}

const RayDistributionChart: React.FC<Props> = ({ data, title, color }) => {
  const maxScore = Math.max(...data.map(d => d.score), 1);

  return (
    <div className="bg-black/40 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all">
      <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-6 flex justify-between">
        {title}
        <span className="text-white/20">Esoteric Weight</span>
      </h4>
      <div className="space-y-4">
        {data.map((d) => (
          <div key={d.ray} className="group">
            <div className="flex justify-between text-[10px] text-gray-400 mb-1 group-hover:text-white transition-colors">
              <span>RAYO {d.ray}</span>
              <span className="font-mono">{d.score}</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: `${(d.score / maxScore) * 100}%`,
                  backgroundColor: color,
                  boxShadow: `0 0 10px ${color}44`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RayDistributionChart;
