
import React, { useState } from 'react';
import BirthForm from './components/BirthForm';
import SoulVisualizer from './components/SoulVisualizer';
import NatalChart from './components/NatalChart';
import RulersTable from './components/RulersTable';
import { calculateEsotericChart } from './services/astrologyEngine';
import { getDeepAkashicReading, identifyAkashicSentinel } from './services/geminiService';
import { generateEsotericImage, getMasterPrompt, getEntityPrompt, getSolarAngelPrompt, getMonadPrompt, getSentinelPrompt, getElohimPrompt, getProtectorPrompt } from './services/imageService';
import { BirthData, SoulReading } from './types';
import { Loader2, RefreshCw, Command, Shield, Diamond, Crown, Orbit, History, Wand2, ShieldCheck, Star } from 'lucide-react';

type Tab = 'akashic' | 'magia' | 'protector' | 'elohim' | 'jerarquia' | 'interdimensional' | 'mandala' | 'akasha';

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
      const sentinelData = await identifyAkashicSentinel(localReading);
      localReading.sentinel = { ...localReading.sentinel, ...sentinelData };

      const [insight, masterImg, entityImg, solarImg, monadImg, sentinelImg, elohimImg, protectorImg] = await Promise.all([
        getDeepAkashicReading(localReading, data.name),
        generateEsotericImage(getMasterPrompt(localReading.spiritualMastery.masterName, localReading.rayProfile.soul)),
        generateEsotericImage(getEntityPrompt("Sirio", "Constructores")),
        generateEsotericImage(getSolarAngelPrompt(localReading.rayProfile.soul)),
        generateEsotericImage(getMonadPrompt(0)),
        generateEsotericImage(getSentinelPrompt("Guardián", "Sirio", "Vesta")),
        generateEsotericImage(getElohimPrompt(localReading.elohim.name, localReading.elohim.function, localReading.elohim.stellarEmbassy)),
        generateEsotericImage(getProtectorPrompt(localReading.protectorEntity.name, localReading.protectorEntity.order, localReading.protectorEntity.protectionSeal))
      ]);

      setReading({ 
        ...localReading, 
        akashicInsight: insight,
        masterImageUrl: masterImg,
        entityImageUrl: entityImg,
        solarAngelImageUrl: solarImg,
        monadImageUrl: monadImg,
        sentinelImageUrl: sentinelImg,
        elohimImageUrl: elohimImg,
        protectorImageUrl: protectorImg
      });
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen relative pb-20 bg-[#020205] text-slate-200">
      <header className="relative z-10 pt-16 pb-8 text-center">
        <h1 className="cinzel text-6xl md:text-8xl font-black mb-3 tracking-tighter">
          <span className="gradient-text">SoulOrigin</span>
        </h1>
        <p className="text-slate-500 text-[10px] uppercase tracking-[1em] font-black opacity-60">Logia Blanca & Rayos Sagrados</p>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[500px]">
            <Loader2 className="animate-spin text-cyan-500 mb-8" size={80} />
            <p className="cinzel text-xl text-cyan-200/70 tracking-[0.3em] animate-pulse">Invocando al Protector de la Logia...</p>
          </div>
        ) : !reading ? (
          <div className="glass-panel rounded-[4rem] p-10 shadow-2xl max-w-2xl mx-auto border-white/10">
            <BirthForm onSubmit={handleCalculate} isLoading={loading} />
          </div>
        ) : (
          <div className="space-y-12 animate-in fade-in duration-1000">
            <nav className="flex flex-wrap justify-center gap-2 p-1.5 bg-white/5 rounded-[2.5rem] sticky top-6 z-50 backdrop-blur-3xl border border-white/5 overflow-x-auto max-w-full">
                {[
                    { id: 'akashic', label: 'Síntesis', icon: <Command size={16} /> },
                    { id: 'magia', label: 'Magia VII', icon: <Wand2 size={16} /> },
                    { id: 'protector', label: 'Protector', icon: <ShieldCheck size={16} /> },
                    { id: 'elohim', label: 'Elohim', icon: <Diamond size={16} /> },
                    { id: 'jerarquia', label: 'Jerarquía', icon: <Crown size={16} /> },
                    { id: 'interdimensional', label: 'Ufología', icon: <Orbit size={16} /> },
                    { id: 'akasha', label: 'Akasha', icon: <History size={16} /> },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as Tab)}
                        className={`flex items-center gap-3 px-6 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                            activeTab === tab.id ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'
                        }`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </nav>

            <div className="min-h-[600px] space-y-16">
                {activeTab === 'akashic' && (
                  <div className="space-y-12">
                    <SoulVisualizer reading={reading} />
                    <div className="glass-panel p-10 md:p-20 rounded-[4rem] text-slate-300 text-xl font-light whitespace-pre-wrap leading-relaxed shadow-2xl border-cyan-500/20">
                        {reading.akashicInsight}
                    </div>
                  </div>
                )}

                {activeTab === 'magia' && (
                  <div className="space-y-12 animate-in zoom-in-95">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                       <div className="relative group p-10 flex items-center justify-center">
                          <div className="absolute inset-0 bg-cyan-500 blur-[150px] opacity-10"></div>
                          <div className="relative w-80 h-80 rounded-full border-[10px] border-double border-cyan-500/20 flex items-center justify-center animate-[spin_25s_linear_infinite]">
                              <Star size={120} className="text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]" />
                          </div>
                       </div>
                       <div className="space-y-8">
                          <h2 className="cinzel text-6xl font-black text-white">{reading.ceremonialSignature.magicalTitle}</h2>
                          <div className="p-6 rounded-[2.5rem] bg-black/40 border border-cyan-500/20">
                              <h4 className="cinzel text-white mb-4 text-sm">Estudio de Teoremas de Poder</h4>
                              <div className="space-y-3">
                                 {reading.ceremonialSignature.magicalAspects.map((asp, i) => (
                                    <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 text-[10px] text-slate-300">
                                       {asp}
                                    </div>
                                 ))}
                              </div>
                          </div>
                          <div className="p-5 rounded-3xl bg-cyan-950/10 border border-cyan-900/20 text-center">
                              <div className="text-[9px] text-cyan-700 uppercase mb-1">Herramienta Ritual</div>
                              <div className="text-sm font-bold text-white">{reading.ceremonialSignature.ritualTool}</div>
                          </div>
                       </div>
                    </div>
                  </div>
                )}

                {activeTab === 'protector' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-in slide-in-from-right-12">
                     <div className="relative group">
                        <div className="absolute inset-0 bg-blue-500 blur-[120px] opacity-20"></div>
                        <div className="relative z-10 aspect-square rounded-[3rem] overflow-hidden border-2 border-white/10 shadow-2xl bg-black">
                           {reading.protectorImageUrl ? (
                              <img src={reading.protectorImageUrl} className="w-full h-full object-cover" />
                           ) : (
                              <div className="w-full h-full flex items-center justify-center"><ShieldCheck size={60} className="text-blue-500 animate-pulse" /></div>
                           )}
                        </div>
                     </div>
                     <div className="space-y-8">
                        <div className="text-[10px] text-blue-400 font-black uppercase tracking-[0.5em]">{reading.protectorEntity.order}</div>
                        <h2 className="cinzel text-7xl font-black text-white">{reading.protectorEntity.name}</h2>
                        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10">
                           <div className="text-[9px] text-gray-500 uppercase mb-2 tracking-widest">Sello de Protección</div>
                           <div className="text-xl text-blue-200 font-mono font-bold uppercase">{reading.protectorEntity.protectionSeal}</div>
                        </div>
                        <p className="text-xl text-slate-300 font-light leading-relaxed border-l-4 border-blue-500 pl-6">
                           {reading.protectorEntity.description}
                        </p>
                        <div className="italic text-slate-500 text-sm">"{reading.protectorEntity.connectionToUser}"</div>
                     </div>
                  </div>
                )}

                {activeTab === 'mandala' && (
                  <div className="animate-in zoom-in-95 max-w-5xl mx-auto">
                    <NatalChart points={reading.geocentricPoints} angles={reading.angles} title={`Mandala Trinitario de ${userName}`} />
                  </div>
                )}

                {activeTab === 'akasha' && (
                  <div className="space-y-12">
                    <RulersTable points={reading.geocentricPoints.slice(0, 10)} title="Firma de Rayos de la Tríada" />
                  </div>
                )}
            </div>

            <div className="flex justify-center pt-24">
              <button onClick={() => setReading(null)} className="px-14 py-6 rounded-full bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-[0.5em] text-slate-500 hover:text-cyan-400 transition-all group">
                <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-700" /> Reiniciar Enlace
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
