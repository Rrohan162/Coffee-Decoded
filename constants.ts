import { CoffeeRecipe, IngredientType } from './types';

// Helper colors for consistent visuals
const COLORS = {
  ESPRESSO: {
    base: '#3C2A21',
    gradient: 'linear-gradient(90deg, #3C2A21 0%, #4E342E 50%, #3C2A21 100%)'
  },
  WATER: {
    base: '#B3E5FC',
    gradient: 'linear-gradient(90deg, rgba(179,229,252,0.4) 0%, rgba(225,245,254,0.6) 50%, rgba(179,229,252,0.4) 100%)'
  },
  STEAMED_MILK: {
    base: '#FDFBF7',
    gradient: 'linear-gradient(90deg, #F5F5F5 0%, #FFFFFF 50%, #F5F5F5 100%)'
  },
  MILK_FOAM: {
    base: '#FFFDD0',
    gradient: 'linear-gradient(90deg, #FFF8E1 0%, #FFFFFF 50%, #FFF8E1 100%)'
  },
  CHOCOLATE: {
    base: '#5D4037',
    gradient: 'linear-gradient(90deg, #4E342E 0%, #5D4037 50%, #4E342E 100%)'
  },
  WHIPPED_CREAM: {
    base: '#FFFDE7',
    gradient: 'linear-gradient(90deg, #FFF9C4 0%, #FFFFEE 50%, #FFF9C4 100%)'
  },
  WHISKEY: {
    base: '#D89000',
    gradient: 'linear-gradient(90deg, #B5651D 0%, #DAA520 50%, #B5651D 100%)'
  },
  SYRUP: {
    base: '#CCA01D',
    gradient: 'linear-gradient(90deg, #CCA01D 0%, #FFD700 50%, #CCA01D 100%)'
  },
  CREAM: {
    base: '#F3E5AB',
    gradient: 'linear-gradient(90deg, #F3E5AB 0%, #FFF8DC 50%, #F3E5AB 100%)'
  },
  ICE: {
    base: '#E0F7FA',
    gradient: 'linear-gradient(90deg, rgba(224,247,250,0.6) 0%, rgba(255,255,255,0.8) 50%, rgba(224,247,250,0.6) 100%)'
  },
  // New Ingredients
  MATCHA: {
    base: '#88B04B',
    gradient: 'linear-gradient(90deg, #6B8E23 0%, #88B04B 50%, #6B8E23 100%)'
  },
  BOBA: {
    base: '#2C1B18',
    gradient: 'linear-gradient(90deg, #1a0f0d 0%, #2C1B18 50%, #1a0f0d 100%)'
  },
  DALGONA: {
    base: '#D4A373',
    gradient: 'linear-gradient(90deg, #C68E17 0%, #E1B382 50%, #C68E17 100%)'
  },
  TURMERIC: {
    base: '#FFC107',
    gradient: 'linear-gradient(90deg, #FFB300 0%, #FFD54F 50%, #FFB300 100%)'
  },
  DECOCTION: {
    base: '#221100',
    gradient: 'linear-gradient(90deg, #1a0d00 0%, #331a00 50%, #1a0d00 100%)'
  },
  CONDENSED: {
    base: '#FFF8E1',
    gradient: 'linear-gradient(90deg, #FFF8E1 0%, #FFFDE7 50%, #FFF8E1 100%)'
  }
};

export const COFFEE_RECIPES: CoffeeRecipe[] = [
  // --- CLASSICS ---
  {
    id: 'espresso',
    name: 'Espresso',
    category: 'Classics',
    description: 'A concentrated form of coffee served in small, strong shots.',
    layers: [
      { type: IngredientType.ESPRESSO, ratio: 25, color: COLORS.ESPRESSO.base, gradient: COLORS.ESPRESSO.gradient }
    ]
  },
  {
    id: 'americano',
    name: 'Americano',
    category: 'Classics',
    description: 'Espresso diluted with hot water.',
    layers: [
      { type: IngredientType.WATER, ratio: 60, color: COLORS.WATER.base, gradient: COLORS.WATER.gradient },
      { type: IngredientType.ESPRESSO, ratio: 20, color: COLORS.ESPRESSO.base, gradient: COLORS.ESPRESSO.gradient }
    ]
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    category: 'Classics',
    description: 'Equal parts espresso, steamed milk, and milk foam.',
    layers: [
      { type: IngredientType.ESPRESSO, ratio: 30, color: COLORS.ESPRESSO.base, gradient: COLORS.ESPRESSO.gradient },
      { type: IngredientType.STEAMED_MILK, ratio: 30, color: COLORS.STEAMED_MILK.base, gradient: COLORS.STEAMED_MILK.gradient },
      { type: IngredientType.MILK_FOAM, ratio: 30, color: COLORS.MILK_FOAM.base, gradient: COLORS.MILK_FOAM.gradient }
    ]
  },
  {
    id: 'latte',
    name: 'Caffè Latte',
    category: 'Classics',
    description: 'Espresso with a large amount of steamed milk.',
    layers: [
      { type: IngredientType.ESPRESSO, ratio: 15, color: COLORS.ESPRESSO.base, gradient: COLORS.ESPRESSO.gradient },
      { type: IngredientType.STEAMED_MILK, ratio: 65, color: COLORS.STEAMED_MILK.base, gradient: COLORS.STEAMED_MILK.gradient },
      { type: IngredientType.MILK_FOAM, ratio: 10, color: COLORS.MILK_FOAM.base, gradient: COLORS.MILK_FOAM.gradient }
    ]
  },

  // --- TRENDING IN INDIA ---
  {
    id: 'dalgona',
    name: 'Dalgona Coffee',
    category: 'Trending in India',
    description: 'A viral sensation featuring frothy whipped coffee cream over cold milk.',
    layers: [
      { type: IngredientType.STEAMED_MILK, ratio: 60, color: COLORS.STEAMED_MILK.base, gradient: COLORS.STEAMED_MILK.gradient },
      { type: IngredientType.DALGONA_FOAM, ratio: 30, color: COLORS.DALGONA.base, gradient: COLORS.DALGONA.gradient },
    ]
  },
  {
    id: 'boba-coffee',
    name: 'Boba Coffee',
    category: 'Trending in India',
    description: 'A fun twist on bubble tea, combining chewy tapioca pearls with rich iced coffee.',
    layers: [
      { type: IngredientType.BOBA, ratio: 15, color: COLORS.BOBA.base, gradient: COLORS.BOBA.gradient },
      { type: IngredientType.ICE, ratio: 15, color: COLORS.ICE.base, gradient: COLORS.ICE.gradient },
      { type: IngredientType.STEAMED_MILK, ratio: 40, color: COLORS.STEAMED_MILK.base, gradient: COLORS.STEAMED_MILK.gradient },
      { type: IngredientType.ESPRESSO, ratio: 20, color: COLORS.ESPRESSO.base, gradient: COLORS.ESPRESSO.gradient },
    ]
  },
  {
    id: 'matcha-latte',
    name: 'Matcha Latte',
    category: 'Trending in India',
    description: 'A vibrant green tea latte that is creamy, earthy, and antioxidant-rich.',
    layers: [
      { type: IngredientType.MATCHA, ratio: 30, color: COLORS.MATCHA.base, gradient: COLORS.MATCHA.gradient },
      { type: IngredientType.STEAMED_MILK, ratio: 50, color: COLORS.STEAMED_MILK.base, gradient: COLORS.STEAMED_MILK.gradient },
      { type: IngredientType.MILK_FOAM, ratio: 15, color: COLORS.MILK_FOAM.base, gradient: COLORS.MILK_FOAM.gradient },
    ]
  },
  {
    id: 'filter-coffee',
    name: 'South Indian Filter',
    category: 'Trending in India',
    description: 'Traditional "Kaapi" made with a potent decoction and frothy hot milk.',
    layers: [
      { type: IngredientType.DECOCTION, ratio: 20, color: COLORS.DECOCTION.base, gradient: COLORS.DECOCTION.gradient },
      { type: IngredientType.STEAMED_MILK, ratio: 70, color: COLORS.STEAMED_MILK.base, gradient: COLORS.STEAMED_MILK.gradient },
      { type: IngredientType.MILK_FOAM, ratio: 10, color: COLORS.MILK_FOAM.base, gradient: COLORS.MILK_FOAM.gradient },
    ]
  },
  {
    id: 'turmeric-latte',
    name: 'Turmeric Latte',
    category: 'Trending in India',
    description: 'Known as "Haldi Doodh", this golden milk is a warm, spiced immunity booster.',
    layers: [
      { type: IngredientType.TURMERIC_MILK, ratio: 80, color: COLORS.TURMERIC.base, gradient: COLORS.TURMERIC.gradient },
      { type: IngredientType.MILK_FOAM, ratio: 15, color: COLORS.MILK_FOAM.base, gradient: COLORS.MILK_FOAM.gradient },
    ]
  },
  {
    id: 'viet-cold',
    name: 'Vietnamese Iced',
    category: 'Trending in India',
    description: 'Strong drip coffee sweetened with rich condensed milk and poured over ice.',
    layers: [
      { type: IngredientType.CONDENSED_MILK, ratio: 20, color: COLORS.CONDENSED.base, gradient: COLORS.CONDENSED.gradient },
      { type: IngredientType.ESPRESSO, ratio: 40, color: COLORS.ESPRESSO.base, gradient: COLORS.ESPRESSO.gradient },
      { type: IngredientType.ICE, ratio: 30, color: COLORS.ICE.base, gradient: COLORS.ICE.gradient },
    ]
  },

  // --- STARBUCKS FAVORITES ---
  {
    id: 'sb-caramel-macchiato',
    name: 'Caramel Macchiato',
    category: 'Starbucks Favorites',
    description: 'Freshly steamed milk with vanilla-flavored syrup marked with espresso and topped with a caramel drizzle.',
    layers: [
      { type: IngredientType.SYRUP, ratio: 10, color: COLORS.SYRUP.base, gradient: COLORS.SYRUP.gradient },
      { type: IngredientType.STEAMED_MILK, ratio: 40, color: COLORS.STEAMED_MILK.base, gradient: COLORS.STEAMED_MILK.gradient },
      { type: IngredientType.ESPRESSO, ratio: 20, color: COLORS.ESPRESSO.base, gradient: COLORS.ESPRESSO.gradient },
      { type: IngredientType.MILK_FOAM, ratio: 15, color: COLORS.MILK_FOAM.base, gradient: COLORS.MILK_FOAM.gradient },
      { type: IngredientType.SYRUP, ratio: 5, color: COLORS.SYRUP.base, gradient: COLORS.SYRUP.gradient },
    ]
  },
  {
    id: 'sb-psl',
    name: 'Pumpkin Spice Latte',
    category: 'Starbucks Favorites',
    description: 'Espresso and steamed milk with pumpkin, cinnamon, nutmeg and clove flavors.',
    layers: [
      { type: IngredientType.ESPRESSO, ratio: 20, color: COLORS.ESPRESSO.base, gradient: COLORS.ESPRESSO.gradient },
      { type: IngredientType.STEAMED_MILK, ratio: 50, color: COLORS.STEAMED_MILK.base, gradient: COLORS.STEAMED_MILK.gradient },
      { type: IngredientType.WHIPPED_CREAM, ratio: 20, color: COLORS.WHIPPED_CREAM.base, gradient: COLORS.WHIPPED_CREAM.gradient },
    ]
  },

  // --- TIM HORTONS ---
  {
    id: 'th-double-double',
    name: 'Double Double',
    category: 'Tim Hortons',
    description: 'A Canadian classic. Original blend coffee with two creams and two sugars.',
    layers: [
      { type: IngredientType.ESPRESSO, ratio: 60, color: COLORS.ESPRESSO.base, gradient: COLORS.ESPRESSO.gradient },
      { type: IngredientType.CREAM, ratio: 30, color: COLORS.CREAM.base, gradient: COLORS.CREAM.gradient },
    ]
  },
  {
    id: 'th-iced-capp',
    name: 'Iced Capp',
    category: 'Tim Hortons',
    description: 'A creamy, blended frozen coffee beverage.',
    layers: [
      { type: IngredientType.CHOCOLATE, ratio: 10, color: COLORS.CHOCOLATE.base, gradient: COLORS.CHOCOLATE.gradient },
      { type: IngredientType.ESPRESSO, ratio: 40, color: COLORS.ESPRESSO.base, gradient: COLORS.ESPRESSO.gradient },
      { type: IngredientType.ICE, ratio: 20, color: COLORS.ICE.base, gradient: COLORS.ICE.gradient },
      { type: IngredientType.CREAM, ratio: 20, color: COLORS.CREAM.base, gradient: COLORS.CREAM.gradient },
    ]
  },

  // --- CAFE COFFEE DAY ---
  {
    id: 'ccd-devils-own',
    name: "Devil's Own",
    category: 'Cafe Coffee Day',
    description: 'A sinfully thick and creamy cold coffee with chocolate sauce and whipped cream.',
    layers: [
      { type: IngredientType.CHOCOLATE, ratio: 15, color: COLORS.CHOCOLATE.base, gradient: COLORS.CHOCOLATE.gradient },
      { type: IngredientType.ESPRESSO, ratio: 35, color: COLORS.ESPRESSO.base, gradient: COLORS.ESPRESSO.gradient },
      { type: IngredientType.ICE, ratio: 15, color: COLORS.ICE.base, gradient: COLORS.ICE.gradient },
      { type: IngredientType.WHIPPED_CREAM, ratio: 25, color: COLORS.WHIPPED_CREAM.base, gradient: COLORS.WHIPPED_CREAM.gradient },
    ]
  },
  {
    id: 'ccd-tropical-iceberg',
    name: 'Tropical Iceberg',
    category: 'Cafe Coffee Day',
    description: 'A cool and crunchy delight. Coffee blended with ice and chocolate.',
    layers: [
      { type: IngredientType.ESPRESSO, ratio: 40, color: COLORS.ESPRESSO.base, gradient: COLORS.ESPRESSO.gradient },
      { type: IngredientType.ICE, ratio: 40, color: COLORS.ICE.base, gradient: COLORS.ICE.gradient },
      { type: IngredientType.CHOCOLATE, ratio: 10, color: COLORS.CHOCOLATE.base, gradient: COLORS.CHOCOLATE.gradient },
    ]
  }
];