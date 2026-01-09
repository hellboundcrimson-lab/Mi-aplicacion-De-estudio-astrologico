
import { GoogleGenAI, Type } from "@google/genai";
import { SoulReading } from "../types";

export const getDeepAkashicReading = async (reading: SoulReading, name: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Eres el Cónsul de la Federación Galáctica y Guardián de los Registros del Maha Chohan.
    Analiza la firma energética de ${name}.
    
    DATOS INTERDIMENSIONALES:
    - Origen Estelar: ${reading.sentinel.origin}
    - Asteroides Dominantes: ${reading.pastLifeAsteroids.map(a => `${a.name} en ${a.sign}`).join(', ')}
    - Rayo del Alma: ${reading.rayProfile.soul}

    ESTRUCTURA DEL REPORTE:
    1. DIAGNÓSTICO DE LA ENTIDAD ASTRAL: Describe su naturaleza etérica.
    2. PARALELISMO HISTÓRICO: Misión compartida con ${reading.historicalEcho.name}.
    3. ESTUDIO UFOLÓGICO: Intervención actual en la Tierra.
    4. SÍNTESIS DEL MAHA CHOHAN: Instrucciones de integración.
    5. CÓDIGO DE LUZ: Comando de voz mental.

    Tono: Profundo, técnico-ufológico, iniciático. Usa Markdown elegante.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: { temperature: 0.85, thinkingConfig: { thinkingBudget: 4000 } }
    });
    return response.text || "La transmisión ha sido interceptada.";
  } catch (error) {
    return "Error en la conexión con el Comando Galáctico.";
  }
};

export const identifyAkashicSentinel = async (reading: SoulReading): Promise<any> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Basado en el sistema de Alice Bailey y los asteroides kármicos, identifica a la ENTIDAD SENTINELA que protege a esta alma.
    - Origen: ${reading.sentinel.origin}
    - Asteroide Protector: ${reading.sentinel.asteroidDominant}
    - Rayo: ${reading.rayProfile.soul}

    Genera un JSON con:
    - name: Nombre sagrado (ej. 'Kaelen de las Nieves de Sirio')
    - vowOfProtection: Un juramento solemne de protección.
    - description: Por qué esta entidad protege a la persona basándote en el asteroide.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            vowOfProtection: { type: Type.STRING },
            description: { type: Type.STRING }
          },
          required: ["name", "vowOfProtection", "description"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (e) {
    return {
      name: "Guardián de los Registros",
      vowOfProtection: "Yo custodio tu luz hasta el fin del tiempo.",
      description: "Una entidad genérica de protección akáshica."
    };
  }
};
