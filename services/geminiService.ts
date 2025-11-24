import { GoogleGenAI, Type } from "@google/genai";
import { GeminiCoffeeInfo } from '../types';

// In-memory cache to store results and avoid hitting API rate limits
const infoCache: Record<string, GeminiCoffeeInfo> = {};

export const fetchCoffeeInfo = async (coffeeName: string): Promise<GeminiCoffeeInfo> => {
  // 1. Check if we already have data for this coffee in cache
  if (infoCache[coffeeName]) {
    return infoCache[coffeeName];
  }

  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      // If no key is present, throw immediately to use fallback
      throw new Error("API Key not found");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Provide a structured fact sheet for ${coffeeName}. I need a fun fact and a brief taste profile.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            funFact: {
              type: Type.STRING,
              description: "One short, interesting historical or technical fact about this drink. Ensure the sentence is grammatically complete and ends with a period."
            },
            tasteProfile: {
              type: Type.STRING,
              description: "3-4 keywords describing the taste (e.g. 'Bold, Creamy, Nutty')."
            }
          },
          required: ["funFact", "tasteProfile"]
        }
      }
    });

    const text = response.text;
    if (!text) {
        throw new Error("No response from Gemini");
    }
    
    const result = JSON.parse(text) as GeminiCoffeeInfo;
    
    // 2. Store result in cache
    infoCache[coffeeName] = result;
    
    return result;

  } catch (error: any) {
    // Handle 429 Resource Exhausted or other errors gracefully
    const isQuotaError = error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('RESOURCE_EXHAUSTED');
    
    if (isQuotaError) {
        console.warn("Gemini API quota exceeded. Serving fallback content.");
    } else {
        console.error("Error fetching coffee info:", error);
    }

    // Return fallback data so the UI doesn't break
    // We return a safe default so the user experience is uninterrupted
    return {
      description: "", 
      funFact: "Did you know? Coffee is the second most traded commodity in the world, surpassed only by crude oil.",
      tasteProfile: "Rich, Robust, Classic"
    };
  }
};