
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

export const getShipPrompt = (name: string, fleet: string) => 
  `Cinematic shot from space of the Mothership ${name} from the ${fleet}. 
   Bioluminescent surfaces, crystalline structure, orbiting a blue star. 
   High tech, ethereal, 8k resolution, cosmic photography.`;

export const getProtectorPrompt = (name: string, order: string, seal: string) => 
  `Divine and radiant portrait of the Protector Entity ${name}. Cinematic, 8k.`;

export const getMasterPrompt = (name: string, ray: string) => 
  `Ascended Master ${name} in a halo of ${ray} energy. 8k, mystical.`;
