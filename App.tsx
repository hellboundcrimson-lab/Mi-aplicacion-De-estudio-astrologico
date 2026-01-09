
import React, { useState, useEffect } from 'react';
import BirthForm from './components/BirthForm';
import SoulVisualizer from './components/SoulVisualizer';
import NatalChart from './components/NatalChart';
import SpiritualMasteryCard from './components/SpiritualMasteryCard';
import RulersTable from './components/RulersTable';
import { calculateEsotericChart } from './services/astrologyEngine';
import { getDeepAkashicReading, identifyAkashicSentinel } from './services/geminiService';
import { generateEsotericImage, getMasterPrompt, getEntityPrompt, getSolarAngelPrompt, getMonadPrompt, getSentinelPrompt } from './services/imageService';
import { BirthData, SoulReading } from './types';
import { Sparkles, RefreshCw, Globe, Loader2, Target, History, Command, Ghost, Orbit, Users, Shield, Zap, Crown, Eye, Lock } from 'lucide-react';

type Tab = 'akashic' | 'sentinela' | 'jerarquia' | 'interdimensional' | 'mandala' | 'akasha';

const App: React.FC = () => {
  const [reading, setReading] = useState<SoulReading | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('akashic');
  const [userName, setUserName] = useState('');

  const handleCalculate = async (data: BirthData) => {
    setLoading(true);
    setUserName(data.name);
    try {
      let localReading = calculateEsotericChart(data);
      
      // 1. Identificar Sentinela por IA
      const sentinelData = await identifyAkashicSentinel(localReading);
      localReading.sentinel = { ...localReading.sentinel, ...sentinelData };

      // 2. Paralelizar Generaciones de Imágenes y Texto
      const [insight, masterImg, entityImg, solarAngelImg, monadImg, sentinelImg] = await Promise.all([
        getDeepAkashicReading(localReading, data.name),
        generateEsotericImage(getMasterPrompt(localReading.spiritualMastery.masterName, localReading.rayProfile.soul)),
        generateEsotericImage(getEntityPrompt(localReading.sentinel.origin, localReading.ufologicalAnalysis.dnaResonance)),
        generateEsotericImage(getSolarAngelPrompt(localReading.rayProfile.soul)),
        generateEsotericImage(getMonadPrompt(localReading.geocentricPoints[0].degree)),
        generateEsotericImage(getSentinelPrompt(localReading.sentinel.name, localReading.sentinel.origin, localReading.sentinel.asteroidDominant))
      ]);

      setReading({ 
        ...localReading, 
        akashicInsight: insight,
        masterImageUrl: masterImg,
        entityImageUrl: entityImg,
        solarAngelImageUrl: solarAngelImg,
        monadImageUrl: monadImg,
        sentinel: { ...localReading.sentinel, imageUrl: sentinelImg }
      });
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen relative pb-20 bg-[#020205] text-slate-200">
      <header className="relative z-10 pt-16 pb-8 text-center">
        <h1 className="cinzel text-6xl md:text-8xl font-black mb-3 tracking-tighter">
          <span className="gradient-text">SoulOrigin</span>
        </h1>
        <p className="text-slate-500 text-[11px] uppercase tracking-[0.8em] font-black opacity-60">Sintonía de Asteroides & Sentinelas Akáshicos</p>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[500px]">
            <Loader2 className="animate-spin text-cyan-500 mb-8" size={80} />
            <p className="cinzel text-xl text-cyan-200/70 tracking-[0.3em] animate-pulse">Abriendo el Portal de los Asteroides...</p>
          </div>
        ) : !reading ? (
          <div className="glass-panel rounded-[4rem] p-10 shadow-2xl max-w-2xl mx-auto border-white/10">
            <BirthForm onSubmit={handleCalculate} isLoading={loading} />
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in duration-1000">
            <nav className="flex flex-wrap justify-center gap-2 p-1.5 bg-white/5 rounded-[2.5rem] sticky top-6 z-50 backdrop-blur-3xl border border-white/5">
                {[
                    { id: 'akashic', label: 'Síntesis', icon: <Command size={16} /> },
                    { id: 'sentinela', label: 'Sentinela', icon: <Shield size={16} /> },
                    { id: 'jerarquia', label: 'Jerarquía', icon: <Crown size={16} /> },
                    { id: 'interdimensional', label: 'Ufología', icon: <Orbit size={16} /> },
                    { id: 'mandala', label: 'Mandala', icon: <Globe size={16} /> },
                    { id: 'akasha', label: 'Akasha', icon: <History size={16} /> },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as Tab)}
                        className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                            activeTab === tab.id ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'text-slate-500'
                        }`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </nav>

            <div className="min-h-[700px] space-y-16">
                {activeTab === 'akashic' && (
                  <div className="space-y-12">
                    <SoulVisualizer reading={reading} />
                    <div className="glass-panel p-10 md:p-20 rounded-[4rem] text-slate-300 text-2xl font-light whitespace-pre-wrap leading-relaxed shadow-2xl">
                        {reading.akashicInsight}
                    </div>
                  </div>
                )}

                {activeTab === 'sentinela' && (
                  <div className="animate-in slide-in-from-bottom-12 duration-700">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <div className="relative group">
                         <div className="absolute inset-0 bg-blue-500 blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                         <div className="relative z-10 w-full aspect-square rounded-[3rem] overflow-hidden border-2 border-blue-500/30 bg-black shadow-2xl">
                           {reading.sentinel.imageUrl ? (
                             <img src={reading.sentinel.imageUrl} alt="Akashic Sentinel" className="w-full h-full object-cover" />
                           ) : (
                             <div className="w-full h-full flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" /></div>
                           )}
                         </div>
                      </div>
                      <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
                           <Lock size={12} /> Guardián del Asteroide {reading.sentinel.asteroidDominant}
                        </div>
                        <h2 className="cinzel text-6xl font-black text-white">{reading.sentinel.name}</h2>
                        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 italic text-blue-200/80 leading-relaxed text-xl">
                          "{reading.sentinel.vowOfProtection}"
                        </div>
                        <p className="text-lg text-slate-400 leading-relaxed font-light">
                          {reading.sentinel.description}
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                              <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Origen Sentinela</div>
                              <div className="text-sm font-bold text-white">{reading.sentinel.origin}</div>
                           </div>
                           <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                              <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Rango Akáshico</div>
                              <div className="text-sm font-bold text-white">Vigilante de Grado 7</div>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'jerarquia' && (
                  <div className="space-y-12 animate-in zoom-in-95 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="glass-panel p-6 rounded-[2.5rem] border-purple-500/20 text-center">
                        <div className="w-full aspect-square rounded-[1.5rem] overflow-hidden mb-4 bg-black border border-purple-500/30">
                          {reading.monadImageUrl && <img src={reading.monadImageUrl} className="w-full h-full object-cover" />}
                        </div>
                        <h4 className="cinzel text-purple-400 font-bold mb-1">Mónada</h4>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">{reading.hierarchy.monad.name}</p>
                      </div>
                      <div className="glass-panel p-6 rounded-[2.5rem] border-yellow-500/20 text-center">
                        <div className="w-full aspect-square rounded-[1.5rem] overflow-hidden mb-4 bg-black border border-yellow-500/30">
                          {reading.solarAngelImageUrl && <img src={reading.solarAngelImageUrl} className="w-full h-full object-cover" />}
                        </div>
                        <h4 className="cinzel text-yellow-400 font-bold mb-1">Ángel Solar</h4>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">{reading.hierarchy.solarAngel.energy}</p>
                      </div>
                      <div className="glass-panel p-6 rounded-[2.5rem] border-cyan-500/20 text-center">
                        <div className="w-full aspect-square rounded-[1.5rem] overflow-hidden mb-4 bg-black border border-cyan-500/30">
                          {reading.masterImageUrl && <img src={reading.masterImageUrl} className="w-full h-full object-cover" />}
                        </div>
                        <h4 className="cinzel text-cyan-400 font-bold mb-1">Chohan {reading.hierarchy.chohan.name}</h4>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">{reading.hierarchy.chohan.energy}</p>
                      </div>
                      <div className="glass-panel p-6 rounded-[2.5rem] border-blue-500/20 text-center">
                        <div className="w-full aspect-square rounded-[1.5rem] overflow-hidden mb-4 bg-black border border-blue-500/30">
                           <div className="w-full h-full flex items-center justify-center"><Users size={40} className="text-blue-500/30" /></div>
                        </div>
                        <h4 className="cinzel text-blue-400 font-bold mb-1">Arcángel {reading.hierarchy.archangel.name}</h4>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">{reading.hierarchy.archangel.energy}</p>
                      </div>
                    </div>
                    <SpiritualMasteryCard mastery={reading.spiritualMastery} ascSign={reading.angles.ascSign} imageUrl={reading.masterImageUrl} />
                  </div>
                )}

                {activeTab === 'interdimensional' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in zoom-in-95">
                    <div className="glass-panel p-8 rounded-[3rem] border-cyan-500/20 flex flex-col items-center">
                      <h3 className="cinzel text-2xl text-cyan-300 mb-6 flex items-center gap-3"><Shield /> Guardián Ufológico</h3>
                      <div className="w-full aspect-square rounded-[2rem] overflow-hidden border-2 border-cyan-500/30 mb-8 bg-black shadow-2xl">
                        {reading.entityImageUrl && <img src={reading.entityImageUrl} className="w-full h-full object-cover" />}
                      </div>
                      <div className="w-full space-y-4 text-center">
                        <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                          <div className="text-[10px] text-cyan-400 uppercase tracking-widest mb-1">Nombre Galáctico</div>
                          <div className="text-2xl font-black text-white">{reading.ufologicalAnalysis.guardianName}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'mandala' && (
                  <div className="animate-in zoom-in-95 max-w-5xl mx-auto py-10">
                    <NatalChart points={reading.geocentricPoints} angles={reading.angles} title={`Mandala de ${userName}`} />
                  </div>
                )}

                {activeTab === 'akasha' && (
                  <div className="space-y-12 animate-in slide-in-from-bottom-12 duration-700">
                    <RulersTable points={reading.pastLifeAsteroids} title="Configuración de Asteroides Akáshicos" />
                    <RulersTable points={reading.geocentricPoints.slice(0, 10)} title="Firma Planetaria" />
                  </div>
                )}
            </div>

            <div className="flex justify-center pt-24">
              <button onClick={() => setReading(null)} className="px-14 py-6 rounded-full bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-[0.5em] text-slate-500 hover:text-cyan-400 transition-all group">
                <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-700" /> Reiniciar Portal
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
