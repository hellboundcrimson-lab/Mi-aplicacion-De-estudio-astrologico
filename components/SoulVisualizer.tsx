
import React from 'react';
import { SoulReading } from '../types';
import { Shield, Zap, Heart, Brain, Activity, User, Sun, Star, Compass, Command, Moon } from 'lucide-react';

interface Props {
  reading: SoulReading;
}

const COLORS = ['#A855F7', '#D946EF', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#6366F1'];

const SoulVisualizer: React.FC<Props> = ({ reading }) => {
  return (
    <div className="space-y-16">
      {/* TRINITARY TRIANGLE */}
      <div className="relative flex flex-col items-center justify-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.05)_0%,_transparent_70%)] pointer-events-none"></div>
        
        {/* The Triangle (Visual only) */}
        <div className="absolute w-[400px] h-[350px] border border-white/10 rotate-180 opacity-20" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-32 relative z-10 w-full max-w-5xl px-6">
          {/* Personality (Sun) */}
          <div className="flex flex-col items-center space-y-6 group">
            <div className="w-24 h-24 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-500 group-hover:scale-110 group-hover:bg-yellow-500/20 transition-all duration-500 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
              <Sun size={40} />
            </div>
            <div className="text-center">
              <div className="text-[10px] text-yellow-500 font-black uppercase tracking-[0.4em] mb-2">Personalidad</div>
              <div className="cinzel text-xl font-bold text-white mb-1">{reading.rayProfile.personality.split(':')[0]}</div>
              <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">{reading.rayProfile.personality.split(':')[1]}</div>
            </div>
          </div>

          {/* Soul (Ascendant) - Center Top */}
          <div className="flex flex-col items-center space-y-6 group -translate-y-12">
            <div className="w-32 h-32 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-500 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-500 shadow-[0_0_50px_rgba(168,85,247,0.3)]">
              <Star size={56} />
            </div>
            <div className="text-center">
              <div className="text-[10px] text-purple-400 font-black uppercase tracking-[0.4em] mb-2">Propósito del Alma</div>
              <div className="cinzel text-3xl font-black text-white mb-1">{reading.rayProfile.soul.split(':')[0]}</div>
              <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">{reading.rayProfile.soul.split(':')[1]}</div>
            </div>
          </div>

          {/* Form (Moon) */}
          <div className="flex flex-col items-center space-y-6 group">
            <div className="w-24 h-24 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-500 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
              <Moon size={40} />
            </div>
            <div className="text-center">
              <div className="text-[10px] text-blue-400 font-black uppercase tracking-[0.4em] mb-2">Cuerpo de la Forma</div>
              <div className="cinzel text-xl font-bold text-white mb-1">{reading.rayProfile.physicalBody.split(':')[0]}</div>
              <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">{reading.rayProfile.physicalBody.split(':')[1]}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ADDITIONAL DETAILS PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-panel p-10 rounded-[3.5rem] border-orange-500/20 bg-gradient-to-br from-orange-950/5 to-transparent relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12 group-hover:rotate-0 transition-transform duration-1000">
               <Command size={180} />
            </div>
            <h3 className="cinzel text-xl mb-8 text-orange-300 flex items-center gap-4">
                <div className="p-2 rounded-lg bg-orange-500/10"><Command size={20} className="text-orange-500" /></div>
                Síntesis del Maha Chohan
            </h3>
            <div className="space-y-6 relative z-10">
              <div className="p-6 rounded-3xl bg-black/40 border border-orange-500/10">
                  <div className="text-[10px] text-orange-400/60 uppercase tracking-[0.2em] mb-2 font-black">Rayo Coordinador de Turno</div>
                  <div className="text-2xl font-black text-white cinzel">{reading.rayProfile.mahaChohanSynthesis}</div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed italic border-l-2 border-orange-500/30 pl-6">
                  {reading.spiritualMastery.mahaChohanAdvice}
              </p>
            </div>
          </div>

          <div className="glass-panel p-10 rounded-[3.5rem] border-blue-500/20 bg-gradient-to-br from-blue-950/5 to-transparent relative group">
            <h3 className="cinzel text-xl mb-8 text-blue-300 flex items-center gap-4">
                <div className="p-2 rounded-lg bg-blue-500/10"><Compass size={20} className="text-blue-500" /></div>
                Alineación Estelar Activa
            </h3>
            <div className="space-y-4">
                <div className="px-6 py-3 rounded-2xl bg-blue-500/5 text-blue-200 text-[10px] font-black uppercase tracking-[0.2em] text-center border border-blue-500/10">
                    {reading.spiritualMastery.soulGroup}
                </div>
                {reading.fixedStarAlignments.map((star, i) => (
                    <div key={i} className="flex items-center gap-6 p-4 rounded-[2rem] bg-black/20 border border-white/5 hover:border-blue-500/30 transition-all group/star">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400 group-hover/star:bg-blue-500/10 transition-colors">
                            <Star size={20} />
                        </div>
                        <div>
                            <div className="text-xs font-black text-white uppercase tracking-widest mb-1">{star.starName}</div>
                            <div className="text-[10px] text-slate-500 leading-tight font-medium">{star.significance}</div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
      </div>
    </div>
  );
};

export default SoulVisualizer;
