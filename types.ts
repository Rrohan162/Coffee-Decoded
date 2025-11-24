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
  CONDENSED_MILK = 'Condensed Milk'
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