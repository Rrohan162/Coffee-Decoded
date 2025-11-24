import { GoogleGenAI, Type } from "@google/genai";
import { GeminiCoffeeInfo } from '../types';

// In-memory cache to store results and avoid hitting API rate limits
const infoCache: Record<string, GeminiCoffeeInfo> = {};

// Comprehensive fallback data for when API fails or is rate limited
// This ensures the UI always updates with relevant content
const FALLBACKS: Record<string, GeminiCoffeeInfo> = {
  "Espresso": {
    description: "",
    funFact: "Espresso creates a layer of crema, a reddish-brown foam, which traps the fine aromatics.",
    tasteProfile: "Intense, Bittersweet, Concentrated"
  },
  "Americano": {
    description: "",
    funFact: "Legend says American soldiers in WWII diluted Italian espresso with water to mimic the drip coffee back home.",
    tasteProfile: "Smooth, Rich, Watery"
  },
  "Cappuccino": {
    description: "",
    funFact: "The name 'Cappuccino' comes from the Capuchin friars, referring to the color of their hooded robes.",
    tasteProfile: "Creamy, Frothy, Balanced"
  },
  "Caffè Latte": {
    description: "",
    funFact: "In Italy, ordering a 'latte' will just get you a glass of milk; ask for 'caffè latte'!",
    tasteProfile: "Milky, Mild, Smooth"
  },
  "Dalgona Coffee": {
    description: "",
    funFact: "This whipped coffee trend originated in South Korea and went viral during the 2020 lockdowns.",
    tasteProfile: "Sweet, Fluffy, Bitter-sweet"
  },
  "Boba Coffee": {
    description: "",
    funFact: "Originating in Taiwan in the 1980s, the tapioca pearls are nicknamed 'boba' which is slang for breasts.",
    tasteProfile: "Chewy, Sweet, Icy"
  },
  "Matcha Latte": {
    description: "",
    funFact: "Matcha is made from shade-grown tea leaves that are stone-ground into a fine powder.",
    tasteProfile: "Earthy, Grassy, Creamy"
  },
  "South Indian Filter": {
    description: "",
    funFact: "Traditionally served in a 'davara' and 'tumbler' to cool and mix the coffee.",
    tasteProfile: "Strong, Sweet, Aromatic"
  },
  "Turmeric Latte": {
    description: "",
    funFact: "Also known as 'Golden Milk', turmeric has been used in Ayurvedic medicine for thousands of years.",
    tasteProfile: "Spiced, Warm, Peppery"
  },
  "Vietnamese Iced": {
    description: "",
    funFact: "Uses Robusta beans which are stronger and more bitter, balanced perfectly by sweet condensed milk.",
    tasteProfile: "Intense, Sweet, Strong"
  },
  "Caramel Macchiato": {
    description: "",
    funFact: "'Macchiato' means 'marked' or 'stained' in Italian, referring to the espresso marking the milk.",
    tasteProfile: "Sweet, Vanilla, Caramel"
  },
  "Pumpkin Spice Latte": {
    description: "",
    funFact: "Starbucks has sold over 500 million PSLs since its introduction in 2003.",
    tasteProfile: "Spiced, Sweet, Autumnal"
  },
  "Double Double": {
    description: "",
    funFact: "A Canadian icon, this term is so popular it was added to the Canadian Oxford Dictionary in 2004.",
    tasteProfile: "Creamy, Sweet, Mellow"
  },
  "Iced Capp": {
    description: "",
    funFact: "Tim Hortons' signature frozen coffee drink, a staple of Canadian summers.",
    tasteProfile: "Slushy, Sweet, Creamy"
  },
  "Devil's Own": {
    description: "",
    funFact: "A popular Indian cafe indulgence loaded with chocolate and cream.",
    tasteProfile: "Chocolaty, Decadent, Thick"
  },
  "Tropical Iceberg": {
    description: "",
    funFact: "Combines the kick of coffee with the crunch of ice and chocolate.",
    tasteProfile: "Icy, Chocolaty, Crunchy"
  },
  "Classic Cold Coffee": {
     description: "",
     funFact: "A staple in Indian households, often made by blending instant coffee, sugar, and cold milk.",
     tasteProfile: "Sweet, Creamy, Nostalgic"
  },
  "Nitro Cold Brew": {
      description: "",
      funFact: "Infused with nitrogen gas to create a creamy texture similar to stout beer.",
      tasteProfile: "Smooth, Creamy, Low-acid"
  },
  "Bella Kaapi (Jaggery)": {
      description: "",
      funFact: "Jaggery adds a distinct caramel-like sweetness and is considered healthier than white sugar.",
      tasteProfile: "Earthy, Sweet, Traditional"
  },
  "Rose Cardamom Latte": {
      description: "",
      funFact: "Cardamom is known as the queen of spices and pairs beautifully with floral rose notes.",
      tasteProfile: "Floral, Spiced, Aromatic"
  }
};

const DEFAULT_FALLBACK: GeminiCoffeeInfo = {
  description: "",
  funFact: "Coffee is the second most traded commodity in the world.",
  tasteProfile: "Rich, Robust, Classic"
};

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
        // console.error("Error fetching coffee info:", error);
    }

    // Return specific fallback data for the requested coffee
    const fallback = FALLBACKS[coffeeName] || DEFAULT_FALLBACK;
    return fallback;
  }
};