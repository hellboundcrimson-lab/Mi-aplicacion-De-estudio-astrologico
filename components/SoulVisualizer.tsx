
import React from 'react';
import { SoulReading } from '../types';
import { Shield, Zap, Heart, Brain, Activity, User, Sun, Star, Compass, Command } from 'lucide-react';

interface Props {
  reading: SoulReading;
}

const COLORS = ['#A855F7', '#D946EF', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#6366F1'];

const RayIconMap: Record<string, React.ReactNode> = {
  soul: <Sun size={18} className="text-yellow-400" />,
  personality: <User size={18} className="text-blue-400" />,
  mentalBody: <Brain size={18} className="text-purple-400" />,
  astralBody: <Heart size={18} className="text-pink-400" />,
  physicalBody: <Activity size={18} className="text-green-400" />,
  mahaChohanSynthesis: <Command size={18} className="text-orange-400" />,
};

const SoulVisualizer: React.FC<Props> = ({ reading }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mt-8">
      {/* Maha Chohan & Starseed Panel */}
      <div className="space-y-6">
          <div className="glass-panel p-8 rounded-[3rem] border-orange-500/30 bg-gradient-to-br from-orange-900/10 to-transparent shadow-[0_0_40px_rgba(245,158,11,0.1)]">
            <h3 className="cinzel text-xl mb-4 text-orange-300 flex items-center gap-3">
                <Command size={24} className="text-orange-500" />
                Síntesis del Maha Chohan
            </h3>
            <div className="p-5 rounded-2xl bg-black/40 border border-orange-500/20 mb-4">
                <div className="text-[10px] text-orange-400 uppercase tracking-[0.2em] mb-2 font-black">Rayo Coordinador</div>
                <div className="text-xl font-black text-white cinzel">{reading.rayProfile.mahaChohanSynthesis}</div>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed italic">
                {reading.spiritualMastery.mahaChohanAdvice}
            </p>
          </div>

          <div className="glass-panel p-8 rounded-[3rem] border-purple-500/20 bg-gradient-to-br from-purple-900/5 to-transparent">
            <h3 className="cinzel text-xl mb-6 text-purple-300 flex items-center gap-3">
                <Star size={24} className="text-purple-500" />
                Alineación Galáctica
            </h3>
            <div className="space-y-3">
                <div className="px-4 py-2 rounded-xl bg-purple-500/10 text-purple-200 text-[10px] font-bold text-center border border-purple-500/20">
                    {reading.spiritualMastery.soulGroup}
                </div>
                {reading.fixedStarAlignments.map((star, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
                        <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-400">
                            <Compass size={18} />
                        </div>
                        <div>
                            <div className="text-xs font-bold text-white uppercase tracking-tighter">{star.starName}</div>
                            <div className="text-[9px] text-gray-500 leading-none">{star.significance}</div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
      </div>

      {/* Esoteric Ray Structure */}
      <div className="glass-panel p-8 rounded-[3rem] border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
        <h3 className="cinzel text-xl mb-8 text-white flex items-center gap-3">
            <Shield size={24} className="text-blue-500" />
            Estructura de Rayos
        </h3>
        <div className="space-y-3">
            {Object.entries(reading.rayProfile).map(([key, value]) => {
                if (key === 'distributions') return null;
                const rayString = value as string;
                const rayIndex = parseInt(rayString.split(' ')[1]) - 1;
                return (
                    <div key={key} className="group relative flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] transition-all cursor-default overflow-hidden">
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-transparent to-white transition-opacity"></div>
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="p-3 rounded-xl bg-black/50 border border-white/10 shadow-inner">
                                {RayIconMap[key]}
                            </div>
                            <div>
                                <div className="text-[9px] uppercase text-slate-500 tracking-widest font-black">{key.replace('Body', '').replace('Synthesis', ' Síntesis')}</div>
                                <div className="text-xs font-bold text-slate-200">{rayString}</div>
                            </div>
                        </div>
                        <div 
                          className="w-1.5 h-8 rounded-full shadow-[0_0_15px]" 
                          style={{ backgroundColor: COLORS[rayIndex], boxShadow: `0 0 15px ${COLORS[rayIndex]}` }}
                        ></div>
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
};

export default SoulVisualizer;
