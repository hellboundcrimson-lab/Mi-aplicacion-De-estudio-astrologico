
import { GoogleGenAI, Type } from "@google/genai";
import { SoulReading } from "../types";

export const getDeepAkashicReading = async (reading: SoulReading, name: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Actúa como Gran Maestro de la Logia de Sirio. Realiza un análisis esotérico para ${name}.
    
    1. **LA TRÍADA DEL ALMA**: Explica la síntesis entre su Rayo de Propósito (${reading.rayProfile.soul}), su Rayo de Personalidad (${reading.rayProfile.personality}) y su Rayo Físico Lunar (${reading.rayProfile.physicalBody}).
    2. **ESTUDIO DE MAGIA CEREMONIAL (CASA VIII)**: Analiza los aspectos de poder: ${reading.ceremonialSignature.magicalAspects.join(', ')}. ¿Cómo usar su "${reading.ceremonialSignature.ritualTool}"?
    3. **ENTIDAD PROTECTORA**: Describe al "${reading.protectorEntity.name}" y su sello de protección "${reading.protectorEntity.protectionSeal}".
    4. **CONEXIÓN ELOHIM**: Influencia del Elohim ${reading.elohim.name}.

    Tono: Ceremonial, sagrado, profundo.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: { temperature: 0.85, thinkingConfig: { thinkingBudget: 15000 } }
    });
    return response.text || "La frecuencia ha sido interferida.";
  } catch (error) {
    return "Error en la telemetría sagrada.";
  }
};

export const identifyAkashicSentinel = async (reading: SoulReading): Promise<any> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Define el juramento de protección del ${reading.protectorEntity.name}.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { responseMimeType: "application/json", 
      responseSchema: { type: Type.OBJECT, properties: { vow: { type: Type.STRING } } } }
    });
    return JSON.parse(response.text);
  } catch (e) { return { vow: "Protegemos tu ADN." }; }
};
