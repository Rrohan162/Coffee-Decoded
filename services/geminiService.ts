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
  "Picco Cappuccino": {
      description: "",
      funFact: "A 'Piccolo' latte is often confused with a cortado, but the Picco here refers to a smaller, punchier cappuccino serving.",
      tasteProfile: "Strong, Frothy, Compact"
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
  "French Vanilla": {
      description: "",
      funFact: "While 'French Vanilla' usually refers to a custard base with egg yolks, here it describes the rich, creamy flavor profile.",
      tasteProfile: "Sweet, Custardy, Warm"
  },
  "Dark Roast": {
      description: "",
      funFact: "Tim Hortons Dark Roast is brewed from 100% Arabica beans, roasted longer for a bolder flavor.",
      tasteProfile: "Bold, Smoky, Earthy"
  },
  "Roasted Hazelnut Cold Brew": {
      description: "",
      funFact: "Cold brewing extracts fewer acidic compounds, making the hazelnut flavor shine through more clearly.",
      tasteProfile: "Nutty, Smooth, Sweet"
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
  // --- STARBUCKS ---
  "Signature Irish Cold Brew": {
    description: "",
    funFact: "The Irish Cream flavor is inspired by the classic Irish Coffee, typically a winter warmer, but reinvented here for cold brew.",
    tasteProfile: "Creamy, Chocolaty, Bold"
  },
  "Salted Caramel Cold Brew": {
      description: "",
      funFact: "Salted Caramel became a culinary phenomenon in the late 1990s in France before taking over the coffee world.",
      tasteProfile: "Salty, Sweet, Smooth"
  },
  "Nitro Cold Brew With Salted Foam": {
      description: "",
      funFact: "Nitro cold brew is infused with nitrogen gas, creating microbubbles that give it a cascading, Guinness-like texture.",
      tasteProfile: "Velvety, Savory, Sweet"
  },
  "Nitro Cold Brew Iced": {
      description: "",
      funFact: "Served without ice typically to preserve the cascade, but this iced version offers extra chill.",
      tasteProfile: "Smooth, Creamy, Cold"
  },
  "Cold Brew with Vanilla Sweet Cream": {
      description: "",
      funFact: "The sweet cream floats on top initially, creating a beautiful marble effect as it slowly sinks.",
      tasteProfile: "Sweet, Milky, Strong"
  },
  "Zesty Orange Cold Brew": {
      description: "",
      funFact: "Citrus and coffee share acidic compounds, making orange juice a surprisingly compatible partner for cold brew.",
      tasteProfile: "Citrusy, Bright, Bold"
  },
  "Coconut Cold Brew": {
      description: "",
      funFact: "Coconut milk adds natural sweetness and a creamy mouthfeel without dairy.",
      tasteProfile: "Tropical, Nutty, Smooth"
  },
  "Tamrind Shikanji Cold Brew": {
      description: "",
      funFact: "Shikanji is a traditional Indian lemonade; this fusion adds a caffeine kick to the tangy spice mix.",
      tasteProfile: "Tangy, Spicy, Refreshing"
  },
  "Jaggery Cloud Latte": {
    description: "",
    funFact: "Jaggery is a traditional unrefined sugar used in India, known for its minerals and distinct caramel-molasses flavor.",
    tasteProfile: "Caramel, Sweet, Airy"
  },
  "Signature Irish Latte": {
      description: "",
      funFact: "A non-alcoholic twist on the Irish Coffee, using flavored syrups to mimic the whiskey notes.",
      tasteProfile: "Creamy, Rich, Nutty"
  },
  "Java Chip Frappuccino": {
    description: "",
    funFact: "The 'chips' are actually chocolate confectionary designed to melt slightly when blended but retain some crunch.",
    tasteProfile: "Chocolaty, Crunchy, Sweet"
  },
  "Double Chocolate Chip Frappuccino": {
      description: "",
      funFact: "Essentially a Java Chip Frappuccino but without the coffee base, perfect for a caffeine-free treat.",
      tasteProfile: "Chocolaty, Milky, Sweet"
  },
  "Mocha Frappuccino": {
      description: "",
      funFact: "One of the original Frappuccino flavors launched in 1995.",
      tasteProfile: "Coffee, Chocolate, Icy"
  },
  "Caramel Java Chip Frappuccino": {
      description: "",
      funFact: "Combines the two most popular Frappuccino modifiers: caramel drizzle and chocolate chips.",
      tasteProfile: "Caramel, Chocolate, Crunchy"
  },
  "Green Tea Cream Frappuccino": {
      description: "",
      funFact: "Uses high-quality Matcha powder sourced from Japan for an authentic earthy flavor.",
      tasteProfile: "Earthy, Sweet, Creamy"
  },
  "Strawberries and Crème Frappuccino": {
      description: "",
      funFact: "Inspired by the classic strawberries and cream dessert, this drink contains no coffee.",
      tasteProfile: "Fruity, Creamy, Sweet"
  },
  "Coffee Frappuccino": {
      description: "",
      funFact: "The base of all coffee frappuccinos, consisting of a proprietary 'Frappuccino Roast'.",
      tasteProfile: "Sweet, Icy, Coffee"
  },
  "Vanilla Cream Frappuccino": {
      description: "",
      funFact: "A simple, caffeine-free blended beverage that tastes remarkably like melted vanilla ice cream.",
      tasteProfile: "Vanilla, Milky, Sweet"
  },
  "White Mocha Frappuccino": {
      description: "",
      funFact: "White chocolate sauce contains cocoa butter but no cocoa solids, giving it a mellower, sweeter taste.",
      tasteProfile: "Sweet, Buttery, Milky"
  },
  "Chocolate Foam Cold Brew": {
    description: "",
    funFact: "Cold foam is frothed without heat, creating a meringue-like texture that sits perfectly atop ice.",
    tasteProfile: "Smooth, Bitter-sweet, Creamy"
  },
  "Cola Float Cold Brew": {
    description: "",
    funFact: "Mixing coffee and cola mimics a nostalgic soda shop float, combining caffeine with fizzy effervescence.",
    tasteProfile: "Fizzy, Creamy, Bold"
  },
  "Mango Dragonfruit Refresher": {
    description: "",
    funFact: "This drink contains real freeze-dried dragonfruit pieces which give it the vibrant magenta color naturally.",
    tasteProfile: "Tropical, Fruity, Crisp"
  },
  "Apple Grapefruit Refresher": {
      description: "",
      funFact: "A complex balance of sweet apple juice and the slight bitterness of grapefruit.",
      tasteProfile: "Tart, Sweet, Citrusy"
  },
  "Strawberry Acai Refresher": {
      description: "",
      funFact: "Acai berries are a superfood from the Amazon, known for their high antioxidant content.",
      tasteProfile: "Berry, Sweet, Caffeinated"
  },
  "Kiwi Calamansi Refresher": {
      description: "",
      funFact: "Calamansi is a small citrus fruit from Southeast Asia, tasting like a cross between a lime and a tangerine.",
      tasteProfile: "Zesty, Tropical, Tart"
  },
  "Lychee Raspberry Refresher": {
      description: "",
      funFact: "Lychee adds a floral aroma that pairs unexpectedly well with the tartness of raspberry.",
      tasteProfile: "Floral, Berry, Sweet"
  },
  "Cold Brew with Ginger Ale": {
    description: "",
    funFact: "This pairing, sometimes called a 'Coffee Tonic' variant, highlights the citrus notes in the coffee beans.",
    tasteProfile: "Spicy, Bubbly, Refreshing"
  },
  "Iced Toffee Nut Matcha": {
    description: "",
    funFact: "Toffee Nut is one of Starbucks' most popular holiday syrups, usually paired with espresso, but surprisingly good with matcha.",
    tasteProfile: "Nutty, Earthy, Sweet"
  },
  "Signature Hot Chocolate": {
      description: "",
      funFact: "Starbucks steamed milk is heated to 160 degrees Fahrenheit to ensure the chocolate powder dissolves perfectly.",
      tasteProfile: "Warm, Rich, Chocolaty"
  },
  "Vanilla Milkshake": {
      description: "",
      funFact: "The word 'milkshake' first appeared in print in 1885, but it originally contained whiskey!",
      tasteProfile: "Classic, Creamy, Vanilla"
  },
  "Chocolate Milkshake": {
      description: "",
      funFact: "Chocolate milkshakes became popular in the early 1900s alongside the invention of the electric blender.",
      tasteProfile: "Rich, Thick, Sweet"
  },
  // --- THIRD WAVE COFFEE ---
  "Sea Salt Mocha": {
      description: "",
      funFact: "Adding salt to coffee suppresses bitterness and amplifies the perception of sweetness in the chocolate.",
      tasteProfile: "Savory, Sweet, Rich"
  },
  "La Vie En Rose": {
      description: "",
      funFact: "This drink uses edible rose water, a staple in Middle Eastern desserts, to add a fragrant floral note to the coffee.",
      tasteProfile: "Floral, Sweet, Aromatic"
  },
  "Lavender Latte": {
      description: "",
      funFact: "Lavender contains linalool, a terpene that provides a calming aroma, counteracting the jitters of caffeine.",
      tasteProfile: "Floral, Calming, Milky"
  },
  "Vietnamese Shakerato": {
      description: "",
      funFact: "Shaking the espresso with ice creates a dense, creamy foam layer known as 'la schiuma' without adding milk.",
      tasteProfile: "Sweet, Frothy, Intense"
  },
  "Dry Hazelnut Cappuccino": {
      description: "",
      funFact: "A 'dry' cappuccino has more foam and less liquid milk than a standard one, making it lighter and airier.",
      tasteProfile: "Nutty, Airy, Dry"
  },
  "Classic Cold Brew": {
      description: "",
      funFact: "Third Wave Coffee steeps their grounds for 18-24 hours in cold water to reduce acidity by up to 67%.",
      tasteProfile: "Smooth, Low-acid, Bold"
  },
  "Classic Cold Coffee": {
      description: "",
      funFact: "A staple in Indian cafes, often made by blending instant coffee or strong decoction with milk, sugar, and sometimes ice cream.",
      tasteProfile: "Sweet, Creamy, Nostalgic"
  },
  "Lemon Cold Brew": {
      description: "",
      funFact: "The citric acid in lemon can actually brighten the fruity notes inherent in certain light-roast coffee beans.",
      tasteProfile: "Zesty, Crisp, Refreshing"
  },
  "Citrus Orange Cold Brew": {
      description: "",
      funFact: "Orange peel oils express a distinct aroma that tricks the brain into perceiving sweetness without added sugar.",
      tasteProfile: "Citrusy, Bright, Aromatic"
  },
  "Masala Chai Latte": {
      description: "",
      funFact: "Masala Chai literally translates to 'mixed spice tea', typically containing cardamom, ginger, cloves, and cinnamon.",
      tasteProfile: "Spicy, Warm, Sweet"
  },
  "Japanese Matcha Latte": {
      description: "",
      funFact: "Zen Buddhist monks in Japan originally drank Matcha to remain alert during long hours of meditation.",
      tasteProfile: "Umami, Vegetal, Creamy"
  },
  "Orange Zest Mocha": {
      description: "",
      funFact: "The combination of chocolate and orange is a classic dessert pairing known as 'Jaffa', popularized by Jaffa cakes.",
      tasteProfile: "Chocolaty, Citrusy, Rich"
  },
  "Flat White": {
      description: "",
      funFact: "Originating in Australia/New Zealand, a flat white has a higher coffee-to-milk ratio than a latte and a velvety microfoam texture.",
      tasteProfile: "Strong, Velvety, Smooth"
  },
  "Affogato": {
      description: "",
      funFact: "Affogato means 'drowned' in Italian, referring to the scoop of gelato being drowned in hot espresso.",
      tasteProfile: "Hot-Cold, Sweet, Intense"
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