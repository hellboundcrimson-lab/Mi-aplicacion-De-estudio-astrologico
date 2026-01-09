
import React, { useState } from 'react';
import { BirthData } from '../types';
import { MapPin, Globe, Clock, Calendar, User, Navigation, Target, Compass } from 'lucide-react';

interface Props {
  onSubmit: (data: BirthData) => void;
  isLoading: boolean;
}

const BirthForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<BirthData>({
    name: '',
    date: '',
    time: '',
    city: '',
    country: '',
    lat: '',
    lon: ''
  });
  const [locating, setLocating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDetectLocation = () => {
    setLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          const address = data.address;
          setFormData(prev => ({
            ...prev,
            city: address.city || address.town || address.village || '',
            country: address.country || '',
            lat: latitude.toFixed(6),
            lon: longitude.toFixed(6)
          }));
        } catch (error) {
          console.error("Error fetching location details", error);
        } finally {
          setLocating(false);
        }
      }, () => setLocating(false));
    } else {
      setLocating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.date) return;
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-lg mx-auto p-2">
      <div className="space-y-6">
        {/* Identidad */}
        <div className="relative group">
          <label className="flex items-center gap-2 text-[10px] font-bold text-purple-400 uppercase tracking-[0.2em] mb-2 px-1">
            <User size={12} /> Nombre de Encarnación
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Introduce tu nombre actual..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all hover:bg-white/[0.08]"
            required
          />
        </div>

        {/* Tiempo y Coordenadas Temporales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <label className="flex items-center gap-2 text-[10px] font-bold text-purple-400 uppercase tracking-[0.2em] mb-2 px-1">
              <Calendar size={12} /> Fecha de Apertura
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all hover:bg-white/[0.08]"
              required
            />
          </div>
          <div className="relative">
            <label className="flex items-center gap-2 text-[10px] font-bold text-purple-400 uppercase tracking-[0.2em] mb-2 px-1">
              <Clock size={12} /> Hora de Vibración (AM/PM)
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all hover:bg-white/[0.08] [color-scheme:dark]"
            />
          </div>
        </div>

        {/* Telemetría Geográfica */}
        <div className="space-y-4 p-6 rounded-[2.5rem] bg-white/[0.03] border border-white/5 shadow-inner">
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center gap-2 text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em] px-1">
              <Target size={14} /> Telemetría Geográfica
            </label>
            <button
              type="button"
              onClick={handleDetectLocation}
              disabled={locating}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-[9px] font-black text-blue-400 hover:bg-blue-500/20 transition-all uppercase tracking-widest disabled:opacity-50"
            >
              <Navigation size={10} className={locating ? "animate-spin" : ""} />
              {locating ? "Localizando..." : "Sincronizar GPS"}
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="País"
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-sm text-white placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                required
              />
              <Globe className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700" size={14} />
            </div>
            <div className="relative">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Ciudad"
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-sm text-white placeholder:text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                required
              />
              <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700" size={14} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-[8px] text-gray-500 uppercase tracking-widest mb-1.5 px-2">Latitud</label>
              <input
                type="text"
                name="lat"
                value={formData.lat}
                onChange={handleChange}
                placeholder="0.000000"
                className="w-full bg-black/60 border border-white/5 rounded-xl p-3 text-xs font-mono text-cyan-400 placeholder:text-gray-800 focus:outline-none focus:border-cyan-500/50"
              />
              <Compass className="absolute right-3 bottom-3 text-gray-800" size={12} />
            </div>
            <div className="relative">
              <label className="block text-[8px] text-gray-500 uppercase tracking-widest mb-1.5 px-2">Longitud</label>
              <input
                type="text"
                name="lon"
                value={formData.lon}
                onChange={handleChange}
                placeholder="0.000000"
                className="w-full bg-black/60 border border-white/5 rounded-xl p-3 text-xs font-mono text-cyan-400 placeholder:text-gray-800 focus:outline-none focus:border-cyan-500/50"
              />
              <Navigation className="absolute right-3 bottom-3 text-gray-800 rotate-45" size={12} />
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="group relative w-full py-6 overflow-hidden rounded-3xl bg-white text-black font-black uppercase tracking-[0.4em] text-xs shadow-[0_0_40px_rgba(168,85,247,0.2)] hover:shadow-[0_0_60px_rgba(168,85,247,0.4)] transition-all duration-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors">
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Calculando Vector de Alma...
            </>
          ) : (
            <>
              Establecer Enlace Cuántico
            </>
          )}
        </span>
      </button>
      
      <p className="text-center text-[9px] text-gray-600 uppercase tracking-[0.3em] font-bold">
        Protocolo Alice Bailey & Elohim v4.0
      </p>
    </form>
  );
};

export default BirthForm;
