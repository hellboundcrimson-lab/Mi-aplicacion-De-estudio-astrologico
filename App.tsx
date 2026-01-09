
import React, { useState } from 'react';
import BirthForm from './components/BirthForm';
import SoulVisualizer from './components/SoulVisualizer';
import NatalChart from './components/NatalChart';
import { calculateEsotericChart, ELEMENT_MAP } from './services/astrologyEngine';
import { getDeepAkashicReading } from './services/geminiService';
import { generateEsotericImage, getMasterPrompt, getProtectorPrompt, getShipPrompt } from './services/imageService';
import { BirthData, SoulReading } from './types';
import { 
  Loader2, RefreshCw, Command, Shield, Diamond, Crown, Orbit, 
  Wand2, ShieldCheck, Zap, Eye, Flame, Hexagon, ShieldAlert, 
  Sword, Ghost, Activity, Rocket, Radio, Radar, Telescope, 
  Dna, Globe, Satellite, Star, Info, ChevronRight, ZapOff, Sparkles
} from 'lucide-react';

type Tab = 'starseed' | 'ufologia' | 'anubis' | 'magia' | 'jerarquia' | 'mandala';

const App: React.FC = () => {
  const [reading, setReading] = useState<SoulReading | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('starseed');
  const [shipImg, setShipImg] = useState('');

  const handleCalculate = async (data: BirthData) => {
    setLoading(true);
    try {
      const localReading = calculateEsotericChart(data);
      const [insight, ship] = await Promise.all([
        getDeepAkashicReading(localReading, data.name),
        generateEsotericImage(getShipPrompt(localReading.ufologicalReport[0].stationName, localReading.ufologicalReport[0].fleet))
      ]);
      setShipImg(ship);
      setReading({ ...localReading, akashicInsight: insight });
    } catch (e) { 
      console.error(e); 
    } finally { 
      setLoading(false); 
    }
  };

  const dnaAsteroid = reading?.geocentricPoints.find(p => p.name === "DNA");
  const astreaAsteroid = reading?.geocentricPoints.find(p => p.name === "Astrea");

  return (
    <div className="min-h-screen relative pb-20 bg-[#020308] text-cyan-50 selection:bg-cyan-500/30 font-sans">
      {/* Background FX - Starfield and Scanning Lines */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(6,182,212,0.05)_0%,_transparent_70%)]"></div>
      </div>

      <header className="relative z-10 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-4 mb-6 p-2 px-6 rounded-full bg-cyan-950/30 border border-cyan-500/20 backdrop-blur-xl">
          <Satellite size={14} className="text-cyan-400 animate-bounce" />
          <span className="text-[9px] font-black uppercase tracking-[0.6em] text-cyan-300">Starseed Intelligence Unit v10.0</span>
        </div>
        <h1 className="cinzel text-6xl md:text-8xl font-black mb-2 tracking-tighter">
          <span className="bg-gradient-to-b from-cyan-300 via-blue-500 to-indigo-700 bg-clip-text text-fill-transparent drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]">SoulOrigin</span>
        </h1>
        <div className="flex justify-center items-center gap-10 opacity-40">
           <div className="h-[1px] w-20 bg-cyan-500/50"></div>
           <p className="text-[10px] uppercase tracking-[1em] font-bold text-cyan-400">Escáner Astrea & DNA Galáctico</p>
           <div className="h-[1px] w-20 bg-cyan-500/50"></div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[550px] space-y-12">
            <div className="relative">
               <Radar size={120} className="text-cyan-500/20 animate-spin" strokeWidth={0.5} />
               <Activity size={40} className="absolute inset-0 m-auto text-cyan-400 animate-pulse" />
            </div>
            <div className="text-center space-y-2">
              <p className="cinzel text-xl text-cyan-300 tracking-[0.5em] animate-pulse">Decodificando Asteroide Astrea...</p>
              <p className="text-[8px] text-cyan-700 uppercase tracking-widest font-mono">Verificando pureza del DNA estelar en sector {dnaAsteroid?.sign}</p>
            </div>
          </div>
        ) : !reading ? (
          <div className="glass-panel rounded-[3rem] p-12 shadow-2xl max-w-xl mx-auto border-cyan-500/20 bg-black/60 relative overflow-hidden group">
            <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <BirthForm onSubmit={handleCalculate} isLoading={loading} />
          </div>
        ) : (
          <div className="space-y-16 animate-in fade-in duration-1000">
            <nav className="flex justify-center sticky top-8 z-50">
              <div className="flex p-1.5 bg-black/90 backdrop-blur-3xl rounded-[2rem] border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.15)] overflow-x-auto no-scrollbar">
                {[
                  { id: 'starseed', label: 'DNA & Astrea', icon: <Dna size={14} /> },
                  { id: 'ufologia', label: 'Nave Nodriza', icon: <Rocket size={14} /> },
                  { id: 'anubis', label: 'Protección', icon: <ShieldAlert size={14} /> },
                  { id: 'magia', label: 'Sello VIII', icon: <Wand2 size={14} /> },
                  { id: 'jerarquia', label: 'Ashram', icon: <Crown size={14} /> },
                  { id: 'mandala', label: 'Mapa Estelar', icon: <Orbit size={14} /> },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as Tab)}
                    className={`flex items-center gap-2.5 px-6 py-4 rounded-[1.5rem] text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                      activeTab === tab.id 
                      ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]' 
                      : 'text-cyan-900 hover:text-cyan-400'
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>
            </nav>

            <div className="min-h-[700px]">
              {activeTab === 'starseed' && (
                <div className="space-y-12 animate-in zoom-in-95 duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-8">
                       <div className="p-10 rounded-[3rem] bg-cyan-500/5 border border-cyan-500/20 space-y-8 relative overflow-hidden group shadow-2xl">
                          <div className="absolute -top-10 -right-10 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
                             <Dna size={260} />
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
                               <Sparkles size={24} className="text-cyan-400 animate-pulse" />
                            </div>
                            <div className="space-y-1">
                               <div className="text-[10px] text-cyan-500 font-black tracking-[0.4em] uppercase">Linaje Astrea Detectado</div>
                               <h2 className="cinzel text-5xl text-white font-black tracking-tighter">{reading.starseedOrigin.name}</h2>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                             <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                                <div className="text-[8px] text-slate-500 uppercase tracking-widest flex items-center gap-1"><Sparkles size={8} /> Astrea en {astreaAsteroid?.sign}</div>
                                <div className="text-lg font-bold text-cyan-300">Grado {astreaAsteroid?.degree}°</div>
                             </div>
                             <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                                <div className="text-[8px] text-slate-500 uppercase tracking-widest flex items-center gap-1"><Dna size={8} /> DNA en {dnaAsteroid?.sign}</div>
                                <div className="text-lg font-bold text-indigo-300">{reading.starseedOrigin.frequency}</div>
                             </div>
                          </div>

                          <div className="space-y-4">
                            <div className="text-[10px] text-cyan-600 font-black uppercase tracking-widest">Resonancia del Marcador Astrea</div>
                            <p className="text-xl text-slate-300 leading-relaxed font-light italic">
                               "La posición de Astrea confirma un flujo de ADN de pureza galáctica originario de {reading.starseedOrigin.origin}. Tu misión: {reading.starseedOrigin.mission}"
                            </p>
                          </div>

                          <div className="pt-6 border-t border-white/5">
                             <div className="text-[10px] text-slate-600 uppercase tracking-widest mb-4">Secuencia de Alta Frecuencia</div>
                             <div className="flex flex-wrap gap-2">
                                {reading.starseedOrigin.traits.map((trait, i) => (
                                  <span key={i} className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[9px] font-bold text-cyan-400 uppercase tracking-widest">
                                     {trait}
                                  </span>
                                ))}
                             </div>
                          </div>
                       </div>
                    </div>
                    
                    <div className="space-y-8">
                       <div className="glass-panel p-10 md:p-12 rounded-[3rem] border-cyan-500/10 bg-black/40 relative overflow-hidden">
                          <div className="absolute top-4 right-6 text-cyan-900 font-mono text-[8px] tracking-[1em] uppercase">Astrea DNA Protocol Log</div>
                          <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-p:text-lg prose-p:leading-relaxed prose-p:font-light">
                            {reading.akashicInsight.split('\n').map((para, i) => (
                              <p key={i} className="mb-4">{para}</p>
                            ))}
                          </div>
                       </div>
                    </div>
                  </div>
                  <SoulVisualizer reading={reading} />
                </div>
              )}

              {activeTab === 'ufologia' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center animate-in zoom-in-95 duration-700">
                   <div className="relative group">
                      <div className="absolute inset-0 bg-cyan-500 blur-[120px] opacity-10"></div>
                      <div className="relative z-10 aspect-square rounded-[3rem] overflow-hidden border border-cyan-500/30 shadow-2xl bg-[#0a0a0f]">
                         {shipImg ? (
                           <img src={shipImg} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-[20s]" />
                         ) : (
                           <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                              <Radar size={80} className="text-cyan-900 animate-spin" />
                              <span className="text-[10px] text-cyan-800 font-black uppercase tracking-widest">Localizando Nave Madre...</span>
                           </div>
                         )}
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                         <div className="absolute bottom-10 left-10 space-y-2">
                            <div className="flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></div>
                               <div className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Enlace Galáctico por Astrea</div>
                            </div>
                            <div className="cinzel text-5xl font-black text-white">{reading.ufologicalReport[0].stationName}</div>
                            <div className="text-[10px] text-cyan-600 font-bold uppercase tracking-[0.2em]">{reading.ufologicalReport[0].fleet}</div>
                         </div>
                      </div>
                   </div>
                   
                   <div className="space-y-12">
                      <div className="space-y-6">
                         <div className="flex items-center gap-4">
                            <div className="p-4 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                               <Radar className="text-cyan-400" size={32} />
                            </div>
                            <h3 className="cinzel text-4xl text-white">Telemetría Asteroide Astrea</h3>
                         </div>
                         <p className="text-xl text-slate-400 leading-relaxed font-light border-l-2 border-cyan-500/20 pl-8">
                            Se ha validado una frecuencia de origen <strong>{reading.starseedOrigin.name}</strong> mediante el marcador de pureza Astrea. 
                            La integridad del canal con la flota es del <strong>{reading.ufologicalReport[0].proximity}%</strong>.
                         </p>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                         <div className="p-8 rounded-[2rem] bg-cyan-950/20 border border-cyan-500/20 space-y-4 shadow-lg group hover:bg-cyan-500/10 transition-all">
                            <Telescope size={32} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                            <div className="text-[9px] font-black uppercase tracking-widest text-cyan-500">Protocolo de Contacto</div>
                            <div className="text-2xl text-white font-bold tracking-tight">{reading.ufologicalReport[0].contactType}</div>
                         </div>
                         <div className="p-8 rounded-[2rem] bg-black/40 border border-white/5 space-y-4">
                            <Sparkles size={32} className="text-slate-600" />
                            <div className="text-[9px] font-black uppercase tracking-widest text-slate-600">ADN Astrea Verificado</div>
                            <div className="text-2xl text-white font-bold">{reading.starseedOrigin.name}</div>
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'anubis' && (
                <div className="space-y-16 animate-in slide-in-from-bottom-5 duration-700">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div className="space-y-8">
                        <div className="relative group">
                          <div className="absolute inset-0 bg-blue-500 blur-[150px] opacity-10"></div>
                          <div className="relative z-10 p-12 bg-black/60 border border-blue-500/30 rounded-[3rem] text-center space-y-8">
                            <div className="relative inline-block">
                               <ShieldAlert className="text-cyan-400 mx-auto group-hover:scale-110 transition-transform" size={100} />
                               {reading.anubisProtection.isAtMC && (
                                 <div className="absolute -top-2 -right-2 bg-cyan-500 p-2 rounded-full border-4 border-black animate-pulse">
                                    <Crown size={16} className="text-black" />
                                 </div>
                               )}
                            </div>
                            <div className="space-y-2">
                              <div className="text-[10px] text-cyan-500 font-black uppercase tracking-widest">Protocolo de Escudo Astral</div>
                              <h3 className="cinzel text-5xl text-white font-black uppercase tracking-tighter">{reading.anubisProtection.astralStatus}</h3>
                              <div className="text-sm text-cyan-200/40 font-medium">Vector Centinela: {reading.anubisProtection.sign} • Casa {reading.anubisProtection.house}</div>
                            </div>
                            <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                               <Activity size={14} className="animate-pulse" /> Nivel de Blindaje: {reading.anubisProtection.protectionLevel}%
                            </div>
                          </div>
                        </div>
                        <div className="p-10 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/20 space-y-4 shadow-inner">
                           <div className="flex items-center gap-3 text-indigo-300 font-black text-[10px] uppercase tracking-widest">
                              <Sword size={16} /> Decreto de Anclaje de Luz
                           </div>
                           <p className="text-3xl text-indigo-100 font-light italic leading-relaxed">"{reading.anubisProtection.moryaDecree}"</p>
                        </div>
                    </div>
                    
                    <div className="space-y-10">
                       <h4 className="cinzel text-3xl text-white flex items-center gap-4">
                          <Ghost size={32} className="text-cyan-800" /> Guardianes del Umbral Escaneados
                       </h4>
                       <div className="grid grid-cols-1 gap-6">
                          {reading.anubisProtection.guardians.map((g, i) => (
                            <div key={i} className="glass-panel p-8 rounded-3xl border-white/5 hover:border-cyan-500/30 transition-all bg-white/[0.01] flex items-center gap-8 group">
                               <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                                  <Shield size={32} />
                               </div>
                               <div className="flex-1">
                                  <div className="text-2xl font-bold text-white cinzel mb-1">{g.name}</div>
                                  <div className="text-[9px] text-cyan-600 uppercase tracking-[0.2em] font-black">{g.type}</div>
                                  <div className="text-[10px] text-slate-400 mt-2 font-medium">Capacidad: <span className="text-cyan-200">{g.power}</span></div>
                               </div>
                               <div className="hidden sm:block text-[10px] text-slate-700 font-mono rotate-90">{g.sigil}</div>
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'mandala' && (
                <div className="animate-in zoom-in-95 duration-700 flex flex-col items-center">
                  <NatalChart 
                    points={reading.geocentricPoints} 
                    angles={reading.angles} 
                    aspects={reading.aspects} 
                    title={`Navegación Táctica Estelar`} 
                  />
                  <div className="mt-12 p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 max-w-2xl w-full">
                     <div className="text-[10px] text-cyan-600 font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Orbit size={14} /> Interpretación de Telemetría
                     </div>
                     <p className="text-sm text-slate-400 leading-relaxed">
                        Este mapa es un escaneo de alta resolución. Busca los marcadores <strong>Astrea</strong> y <strong>DNA</strong> para validar tu origen galáctico. Las alineaciones rojas indican áreas de entrenamiento evolutivo, mientras que las azules son canales de gracia galáctica.
                     </p>
                  </div>
                </div>
              )}

              {activeTab === 'jerarquia' && (
                <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500">
                  <div className="text-center space-y-4 mb-16">
                    <h2 className="cinzel text-5xl font-black text-white">Jerarquía Espiritual Galáctica</h2>
                    <p className="text-cyan-600 uppercase tracking-[0.5em] text-[10px] font-bold">Oficiales de Enlace de la Logia Blanca</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {[
                       { label: 'Núcleo Monádico', value: reading.hierarchy.monad.name, icon: <Diamond />, color: 'text-purple-400' },
                       { label: 'Ángel Solar de Sirio', value: reading.hierarchy.solarAngel.name, icon: <Shield />, color: 'text-cyan-400' },
                       { label: 'Chohan Regente', value: reading.hierarchy.chohan.name, icon: <Crown />, color: 'text-yellow-400' },
                       { label: 'Arcángel de Protección', value: reading.hierarchy.archangel.name, icon: <Zap />, color: 'text-blue-400' },
                     ].map((item, i) => (
                       <div key={i} className="flex items-center gap-6 p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all group">
                          <div className={`w-16 h-16 rounded-2xl bg-black/40 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                             {item.icon}
                          </div>
                          <div className="space-y-1">
                             <div className="text-[9px] text-slate-600 uppercase tracking-[0.3em] font-black">{item.label}</div>
                             <div className="text-2xl font-bold text-white cinzel">{item.value}</div>
                          </div>
                       </div>
                     ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'magia' && (
                <div className="max-w-4xl mx-auto space-y-12 animate-in slide-in-from-right-5 duration-500">
                   <div className="p-12 rounded-[4rem] bg-gradient-to-br from-indigo-950/30 to-black border border-indigo-500/20 space-y-10 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12">
                         <Wand2 size={300} />
                      </div>
                      <div className="space-y-4">
                         <div className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.5em]">Signatura Ceremonial</div>
                         <h2 className="cinzel text-5xl text-white font-black">{reading.ceremonialSignature.magicalTitle}</h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-2">
                            <div className="text-[9px] text-slate-600 uppercase font-black">Herramienta de Poder</div>
                            <div className="text-lg text-indigo-200 font-bold">{reading.ceremonialSignature.ritualTool}</div>
                         </div>
                         <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-2">
                            <div className="text-[9px] text-slate-600 uppercase font-black">Foco Alquímico</div>
                            <div className="text-lg text-indigo-200 font-bold">{reading.ceremonialSignature.magicalFocus}</div>
                         </div>
                         <div className="p-6 rounded-3xl bg-black/40 border border-white/5 space-y-2">
                            <div className="text-[9px] text-slate-600 uppercase font-black">Dominancia VII</div>
                            <div className="text-lg text-indigo-200 font-bold">{reading.ceremonialSignature.dominantPlanet}</div>
                         </div>
                      </div>
                   </div>
                </div>
              )}
            </div>

            <div className="flex justify-center pt-24">
              <button 
                onClick={() => setReading(null)} 
                className="px-14 py-6 rounded-full bg-cyan-500/5 border border-cyan-500/20 text-[10px] font-black uppercase tracking-[1em] text-cyan-700 hover:text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all group flex items-center gap-6 shadow-xl"
              >
                <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-1000" /> Nueva Sincronización Galáctica
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-40 py-10 text-center border-t border-cyan-500/10 opacity-20">
        <p className="cinzel text-[9px] tracking-[1.5em] text-cyan-600 font-black">© 2025 SoulOrigin • Legado de la Confederación de Sirio</p>
      </footer>
    </div>
  );
};

export default App;
