
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

export const getMasterPrompt = (name: string, ray: string) => 
  `Divine and majestic portrait of Ascended Master ${name}. Glowing with ${ray} energy. Sacred geometry, spiritual aura, mystical art, 8k.`;

export const getEntityPrompt = (origin: string, dna: string) => 
  `Advanced extraterrestrial guardian from ${origin}. Benevolent and wise, glowing skin, large expressive eyes, cinematic ufology style, 8k.`;

export const getSolarAngelPrompt = (ray: string) => 
  `A magnificent Solar Angel (Angel Solar), a being of pure golden and white light. Radiant, ethereal, cinematic lighting.`;

export const getMonadPrompt = (degree: number) => 
  `Abstract representation of the Monad (Divine Spark). A central point of infinite light radiating sacred geometric patterns, central sun aesthetic.`;

export const getSentinelPrompt = (name: string, origin: string, asteroid: string) => 
  `A powerful Akashic Sentinel named ${name} from ${origin}. The entity embodies the energy of the asteroid ${asteroid}. 
   Armor made of starlight, eyes containing galaxies, holding a staff of crystal light. 
   Akashic Records background with cosmic nebulae, hyper-detailed, spiritual realism, cinematic 8k, ethereal glow.`;
