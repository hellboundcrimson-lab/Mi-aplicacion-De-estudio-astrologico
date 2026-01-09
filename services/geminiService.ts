
import { GoogleGenAI, Type } from "@google/genai";
import { SoulReading } from "../types";

export const getDeepAkashicReading = async (reading: SoulReading, name: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Actúa como Comandante de Enlace de la Federación Galáctica y Maestro de los Registros Akáshicos.
    Analiza a ${name} con estos datos Starseed:
    
    1. **RAZA DE ORIGEN**: ${reading.starseedOrigin.name}. Explica su descripción: "${reading.starseedOrigin.description}".
    2. **MISIÓN ESTELAR**: "${reading.starseedOrigin.mission}". ¿Cómo debe usar su frecuencia de ${reading.starseedOrigin.frequency}?
    3. **STATUS DE ANUBIS**: Su posición en el MC es ${reading.anubisProtection.isAtMC}. Si es Soberano del Umbral, explica su autoridad sobre las sombras.
    4. **TELEMETRÍA DE FLOTA**: Su proximidad a la nave "${reading.ufologicalReport[0].stationName}" (${reading.ufologicalReport[0].proximity}%).
    5. **RAYO DEL ALMA**: Su propósito bajo el Maestro ${reading.spiritualMastery.masterName}.

    Tono: Elevado, técnico-espiritual, revelador, digno de una transmisión de la Confederación.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: { temperature: 0.9, thinkingConfig: { thinkingBudget: 18000 } }
    });
    return response.text || "Frecuencia interrumpida por interferencia reptiliana.";
  } catch (error) {
    return "Error en la telemetría cuántica.";
  }
};
