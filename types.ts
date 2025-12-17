export enum IngredientType {
  ESPRESSO = 'Espresso',
  WATER = 'Water',
  STEAMED_MILK = 'Steamed Milk',
  MILK_FOAM = 'Milk Foam',
  CHOCOLATE = 'Chocolate Syrup',
  WHIPPED_CREAM = 'Whipped Cream',
  ICE = 'Ice',
  WHISKEY = 'Whiskey',
  SYRUP = 'Syrup',
  CREAM = 'Rich Cream',
  
  // New Trending Ingredients
  MATCHA = 'Matcha Green Tea',
  BOBA = 'Tapioca Pearls',
  DALGONA_FOAM = 'Whipped Coffee',
  TURMERIC_MILK = 'Turmeric Milk',
  DECOCTION = 'Coffee Decoction',
  CONDENSED_MILK = 'Condensed Milk',

  // Starbucks & New Ingredients
  COLD_BREW = 'Cold Brew',
  NITRO_BREW = 'Nitro Cold Brew',
  IRISH_CREAM = 'Irish Cream',
  JAGGERY_FOAM = 'Jaggery Foam',
  CHOCO_FOAM = 'Chocolate Foam',
  SALTED_FOAM = 'Salted Foam',
  COLA = 'Cola',
  VANILLA_ICE_CREAM = 'Vanilla Ice Cream',
  
  // Refreshers & Fruits
  MANGO_REFRESHER = 'Mango Refresher',
  STRAWBERRY_REFRESHER = 'Strawberry Refresher',
  KIWI_REFRESHER = 'Kiwi Refresher',
  LYCHEE_REFRESHER = 'Lychee Refresher',
  APPLE_JUICE = 'Apple Juice',
  ORANGE_JUICE = 'Orange Juice',
  COCONUT_MILK = 'Coconut Milk',
  TAMARIND = 'Tamarind Shikanji',
  LEMON_JUICE = 'Lemon Juice',
  
  // Blends
  FRAP_BLEND = 'Frappuccino Blend',
  STRAWBERRY_BLEND = 'Strawberry Blend',
  MATCHA_BLEND = 'Matcha Blend',
  
  // Syrups/Mixers
  TOFFEE_NUT = 'Toffee Nut',
  GINGER_ALE = 'Ginger Ale',
  MOCHA_SAUCE = 'Mocha Sauce',
  WHITE_MOCHA = 'White Mocha',
  
  // Third Wave & Tim Hortons Specials
  FRENCH_VANILLA = 'French Vanilla',
  ROSE_SYRUP = 'Rose Syrup',
  LAVENDER_SYRUP = 'Lavender Syrup',
  SEA_SALT = 'Sea Salt Infusion',
  HAZELNUT_SYRUP = 'Hazelnut Syrup',
  DARK_ROAST = 'Dark Roast Coffee',
  SHAKERATO_FOAM = 'Shaken Coffee Foam',
  MASALA_CHAI = 'Masala Chai Decoction'
}

export interface CoffeeLayer {
  type: IngredientType;
  ratio: number; // Percentage of the cup height (0-100)
  color: string;
  gradient: string;
}

export interface CoffeeRecipe {
  id: string;
  name: string;
  description: string; // Short default description
  layers: CoffeeLayer[];
  category: string;
}

export interface GeminiCoffeeInfo {
  description: string;
  funFact: string;
  tasteProfile: string;
}