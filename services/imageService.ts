
import { GoogleGenAI } from "@google/genai";

export const generateEsotericImage = async (prompt: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: { imageConfig: { aspectRatio: "1:1" } }
    });
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return "";
  } catch (error) {
    console.error("Image generation failed", error);
    return "";
  }
};

export const getProtectorPrompt = (name: string, order: string, seal: string) => 
  `Divine and radiant portrait of the Protector Entity ${name} from the ${order}. 
   A being of pure celestial light, eyes like golden stars, wearing robes of energy. 
   Holding the ${seal}. Background is a temple of light in space. Cinematic, 8k, spiritual realism.`;

export const getMasterPrompt = (name: string, ray: string) => 
  `Ascended Master ${name} in a halo of ${ray} energy. 8k, mystical.`;

export const getElohimPrompt = (name: string, function_name: string, embassy: string) => 
  `Cosmic manifestation of Elohim ${name}. 8k, majestic.`;

export const getSentinelPrompt = (name: string, origin: string, asteroid: string) => 
  `Akashic Guardian ${name} from ${origin}. 8k.`;

export const getEntityPrompt = (origin: string, dna: string) => 
  `Galactic guardian from ${origin}. 8k.`;

export const getSolarAngelPrompt = (ray: string) => 
  `Magnificent Solar Angel of pure white light. 8k.`;

export const getMonadPrompt = (degree: number) => 
  `Sacred geometry point of light. 8k.`;
