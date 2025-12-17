import { CoffeeRecipe, IngredientType } from './types';

export const CATEGORIES = ["All", "Starbucks", "Third Wave Coffee", "Tim Hortons", "Classics", "Trending in India", "Cafe Coffee Day"];

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
  },
  // Starbucks Specific Colors
  COLD_BREW: {
    base: '#3b2f2f',
    gradient: 'linear-gradient(90deg, #2a1f1f 0%, #3b2f2f 50%, #2a1f1f 100%)'
  },
  NITRO: {
    base: '#261C1C',
    gradient: 'linear-gradient(90deg, #1a1212 0%, #261C1C 50%, #1a1212 100%)'
  },
  IRISH_CREAM: {
    base: '#f0e6d2',
    gradient: 'linear-gradient(90deg, #e6dcc3 0%, #f9f5e7 50%, #e6dcc3 100%)'
  },
  JAGGERY: {
    base: '#c68e17',
    gradient: 'linear-gradient(90deg, #a8760f 0%, #d4a32e 50%, #a8760f 100%)'
  },
  CHOCO_FOAM: {
    base: '#8b5a2b',
    gradient: 'linear-gradient(90deg, #6d421b 0%, #a67c52 50%, #6d421b 100%)'
  },
  SALTED_FOAM: {
    base: '#F5F5DC',
    gradient: 'linear-gradient(90deg, #EFEFE0 0%, #FFFFFF 50%, #EFEFE0 100%)'
  },
  COLA: {
    base: '#2c0a0a',
    gradient: 'linear-gradient(90deg, #1a0505 0%, #3d1414 50%, #1a0505 100%)'
  },
  MANGO: {
    base: '#C71585',
    gradient: 'linear-gradient(90deg, #B01070 0%, #DB2096 50%, #B01070 100%)'
  },
  STRAWBERRY: {
    base: '#FF69B4',
    gradient: 'linear-gradient(90deg, #FF1493 0%, #FFB6C1 50%, #FF1493 100%)'
  },
  KIWI: {
    base: '#9ACD32',
    gradient: 'linear-gradient(90deg, #6B8E23 0%, #ADFF2F 50%, #6B8E23 100%)'
  },
  LYCHEE: {
    base: '#FFC0CB',
    gradient: 'linear-gradient(90deg, #FFB6C1 0%, #FFF0F5 50%, #FFB6C1 100%)'
  },
  APPLE: {
    base: '#F4A460',
    gradient: 'linear-gradient(90deg, #DAA520 0%, #F4A460 50%, #DAA520 100%)'
  },
  ORANGE: {
    base: '#FFA500',
    gradient: 'linear-gradient(90deg, #FF8C00 0%, #FFD700 50%, #FF8C00 100%)'
  },
  COCONUT: {
    base: '#FFFAFA',
    gradient: 'linear-gradient(90deg, #F0FFFF 0%, #FFFFFF 50%, #F0FFFF 100%)'
  },
  TAMARIND: {
    base: '#654321',
    gradient: 'linear-gradient(90deg, #5D4037 0%, #8B4513 50%, #5D4037 100%)'
  },
  LEMON_JUICE: {
    base: '#FFFACD',
    gradient: 'linear-gradient(90deg, #FFFACD 0%, #FFF8DC 50%, #FFFACD 100%)'
  },
  FRAP_BLEND: {
    base: '#C8A27C',
    gradient: 'linear-gradient(90deg, #B08D69 0%, #D4B692 50%, #B08D69 100%)'
  },
  GINGER_ALE: {
    base: '#F4E4BC',
    gradient: 'linear-gradient(90deg, #E6D29E 0%, #FFF5D6 50%, #E6D29E 100%)'
  },
  WHITE_MOCHA: {
    base: '#F5DEB3',
    gradient: 'linear-gradient(90deg, #EEE8AA 0%, #F5DEB3 50%, #EEE8AA 100%)'
  },
  // Third Wave & Tim Hortons
  FRENCH_VANILLA: {
    base: '#FDF1D0',
    gradient: 'linear-gradient(90deg, #F9E4B7 0%, #FFF8E1 50%, #F9E4B7 100%)'
  },
  ROSE: {
    base: '#FFC0CB',
    gradient: 'linear-gradient(90deg, #FFB6C1 0%, #FFD1DC 50%, #FFB6C1 100%)'
  },
  LAVENDER: {
    base: '#E6E6FA',
    gradient: 'linear-gradient(90deg, #D8BFD8 0%, #E6E6FA 50%, #D8BFD8 100%)'
  },
  HAZELNUT: {
    base: '#B8860B',
    gradient: 'linear-gradient(90deg, #DAA520 0%, #CD853F 50%, #DAA520 100%)'
  },
  DARK_ROAST: {
    base: '#1a0d00',
    gradient: 'linear-gradient(90deg, #0d0600 0%, #261300 50%, #0d0600 100%)'
  },
  MASALA_CHAI: {
    base: '#C07848',
    gradient: 'linear-gradient(90deg, #A0522D 0%, #D2691E 50%, #A0522D 100%)'
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
  {
    id: 'picco-cappuccino',
    name: 'Picco Cappuccino',
    category: 'Classics',
    description: 'Dark, rich in flavour espresso lies in wait under a smoothed and stretched layer of thick milk foam.',
    layers: [
      { type: IngredientType.ESPRESSO, ratio: 40, color: COLORS.ESPRESSO.base, gradient: COLORS.ESPRESSO.gradient },
      { type: IngredientType.MILK_FOAM, ratio: 40, color: COLORS.MILK_FOAM.base, gradient: COLORS.MILK_FOAM.gradient }
    ]
  },

  // --- STARBUCKS COLD BREW ---
  {
    id: 'sb-irish-cold-brew',
    name: 'Signature Irish Cold Brew',
    category: 'Starbucks',
    description: 'Bold, smooth cold brew topped with a float of Irish Cream flavor.',
    layers: [
      { type: IngredientType.COLD_BREW, ratio: 55, color: COLORS.COLD_BREW.base, gradient: COLORS.COLD_BREW.gradient },
      { type: IngredientType.ICE, ratio: 20, color: COLORS.ICE.base, gradient: COLORS.ICE.gradient },
      { type: IngredientType.IRISH_CREAM, ratio: 25, color: COLORS.IRISH_CREAM.base, gradient: COLORS.IRISH_CREAM.gradient },
    ]
  },
  {
    id: 'sb-salted-caramel-cb',
    name: 'Salted Caramel Cold Brew',
    category: 'Starbucks',
    description: 'Signature Cold Brew with a touch of Salted Caramel syrup and topped with a salted cold foam.',
    layers: [
      { type: IngredientType.COLD_BREW, ratio: 50, color: COLORS.COLD_BREW.base, gradient: COLORS.COLD_BREW.gradient },
      { type: IngredientType.SYRUP, ratio: 5, color: COLORS.SYRUP.base, gradient: COLORS.SYRUP.gradient },
      { type: IngredientType.ICE, ratio: 15, color: COLORS.ICE.base, gradient: COLORS.ICE.gradient },
      { type: IngredientType.SALTED_FOAM, ratio: 30, color: COLORS.SALTED_FOAM.base, gradient: COLORS.SALTED_FOAM.gradient },
    ]
  },
  {
    id: 'sb-nitro-salted',
    name: 'Nitro Cold Brew With Salted Foam',
    category: 'Starbucks',
    description: 'Slow steeped cold brew infused with nitrogen served with salted foam.',
    layers: [
      { type: IngredientType.NITRO_BREW, ratio: 70, color: COLORS.NITRO.base, gradient: COLORS.NITRO.gradient },
      { type: IngredientType.SALTED_FOAM, ratio: 30, color: COLORS.SALTED_FOAM.base, gradient: COLORS.SALTED_FOAM.gradient },
    ]
  },
  {
    id: 'sb-nitro-iced',
    name: 'Nitro Cold Brew Iced',
    category: 'Starbucks',
    description: 'Our slow steeped cold brew infused with nitrogen served over ice.',
    layers: [
      { type: IngredientType.NITRO_BREW, ratio: 70, color: COLORS.NITRO.base, gradient: COLORS.NITRO.gradient },
      { type: IngredientType.ICE, ratio: 30, color: COLORS.ICE.base, gradient: COLORS.ICE.gradient },
    ]
  },
  {
    id: 'sb-vanilla-sweet-cb',
    name: 'Cold Brew with Vanilla Sweet Cream',
    category: 'Starbucks',
    description: 'Cold brew with Vanilla Sweet Cream is made with Starbucks coffee and a float of house-made vanilla sweet cream.',
    layers: [
      { type: IngredientType.COLD_BREW, ratio: 60, color: COLORS.COLD_BREW.base, gradient: COLORS.COLD_BREW.gradient },
      { type: IngredientType.ICE, ratio: 20, color: COLORS.ICE.base, gradient: COLORS.ICE.gradient },
      { type: IngredientType.STEAMED_MILK, ratio: 20, color: COLORS.STEAMED_MILK.base, gradient: COLORS.STEAMED_MILK.gradient },
    ]
  },
  {
    id: 'sb-choco-foam-cb',
    name: 'Chocolate Foam Cold Brew',
    category: 'Starbucks',
    description: 'Signature Cold Brew topped with a delicious layer of chocolate foam.',
    layers: [
      { type: IngredientType.SYRUP, ratio: 5, color: COLORS.SYRUP.base, gradient: COLORS.SYRUP.gradient },
      { type: IngredientType.COLD_BREW, ratio: 60, color: COLORS.COLD_BREW.base, gradient: COLORS.COLD_BREW.gradient },
      { type: IngredientType.CHOCO_FOAM, ratio: 35, color: COLORS.CHOCO_FOAM.base, gradient: COLORS.CHOCO_FOAM.gradient },
    ]
  },
  {
    id: 'sb-cola-float',
    name: 'Cola Float Cold Brew',
    category: 'Starbucks',
    description: 'A playful twist on classic indulgence - Signature Cold Brew meets Cola and Ice Cream.',
    layers: [
      { type: IngredientType.COLA, ratio: 30, color: COLORS.COLA.base, gradient: COLORS.COLA.gradient },
      { type: IngredientType.COLD_BREW, ratio: 30, color: COLORS.COLD_BREW.base, gradient: COLORS.COLD_BREW.gradient },
      { type: IngredientType.ICE, ratio: 10, color: COLORS.ICE.base, gradient: COLORS.ICE.gradient },
      { type: IngredientType.VANILLA_ICE_CREAM, ratio: 30, color: COLORS.STEAMED_MILK.base, gradient: COLORS.STEAMED_MILK.gradient },
    ]
  },
  {
    id: 'sb-ginger-ale-cb',
    name: 'Cold Brew with Ginger Ale',
    category: 'Starbucks',
    description: 'A delicious double layered cold brew beverage with sparkling ginger ale.',
    layers: [
      { type: IngredientType.GINGER_ALE, ratio: 40, color: COLORS.GINGER_ALE.base, gradient: COLORS.GINGER_ALE.gradient },
      { type: IngredientType.COLD_BREW, ratio: 40, color: COLORS.COLD_BREW.base, gradient: COLORS.COLD_BREW.gradient },
      { type: IngredientType.ICE, ratio: 20, color: COLORS.ICE.base, gradient: COLORS.ICE.gradient },
    ]
  },
  {
    id: 'sb-zesty-orange-cb',
    name: 'Zesty Orange Cold Brew',
    category: 'Starbucks',
    description: 'Experience the smooth intensity of our cold brew, perfectly paired with orange.',
    layers: [
      { type: IngredientType.ORANGE_JUICE, ratio: 20, color: COLORS.ORANGE.base, gradient: COLORS.ORANGE.gradient },
      { type: IngredientType.COLD_BREW, ratio: 60, color: COLORS.COLD_BREW.base, gradient: COLORS.COLD_BREW.gradient },
      { type: IngredientType.ICE, ratio: 20, color: COLORS.ICE.base, gradient: COLORS.ICE.gradient },
    ]
  },
  {
    id: 'sb-coconut-cb',
    name: 'Coconut Cold Brew',
    category: 'Starbucks',
    description: 'Experience the tropical delight of our Coconut Cold Brew.',
    layers: [
      { type: IngredientType.COCONUT_MILK, ratio: 30, color: COLORS.COCONUT.base, gradient: COLORS.COCONUT.gradient },
      { type: IngredientType.COLD_BREW, ratio: 50, color: COLORS.COLD_BREW.base, gradient: COLORS.COLD_BREW.gradient },
      { type: IngredientType.ICE, ratio: 20, color: COLORS.ICE.base, gradient: COLORS.ICE.gradient },
    ]
  },
  {
    id: 'sb-tamarind-cb',
    name: 'Tamrind Shikanji Cold Brew',
    category: 'Starbucks',
    description: 'A must try fusion — Starbucks Tamarind Shikanji Cold Brew pairs tangy tamarind with smooth coffee.',
    layers: [
      { type: IngredientType.TAMARIND, ratio: 30, color: COLORS.TAMARIND.base, gradient: COLORS.TAMARIND.gradient },
      { type: IngredientType.COLD_BREW, ratio: 50, color: COLORS.COLD_BREW.base, gradient: COLORS.COLD_BREW.gradient },
      { type: IngredientType.ICE, ratio: 20, color: COLORS.ICE.base, gradient: COLORS.ICE.gradient },
    ]
  },

  // --- STARBUCKS FRAPPUCCINO ---
  {
    id: 'sb-java-chip',
    name: 'Java Chip Frappuccino',
    category: 'Starbucks',
    description: 'Mocha sauce and Frappuccino chips blended with coffee and milk, topped with whip.',
    layers: [
      { type: IngredientType.CHOCOLATE, ratio: 10, color: COLORS.CHOCOLATE.base, gradient: COLORS.CHOCOLATE.gradient },
      { type: IngredientType.FRAP_BLEND, ratio: 60, color: COLORS.FRAP_BLEND.base, gradient: COLORS.FRAP_BLEND.gradient },
      { type: IngredientType.WHIPPED_CREAM, ratio: 30, color: COLORS.WHIPPED_CREAM.base, gradient: COLORS.WHIPPED_CREAM.gradient },
    ]
  },
  {
    id: 'sb-double-choco',
    name: 'Double Chocolate Chip Frappuccino',
    category: 'Starbucks',
    description: 'Rich mocha-flavored sauce meets up with chocolaty chips, milk and ice.',
    layers: [
      { type: IngredientType.CHOCOLATE, ratio: 15, color: COLORS.CHOCOLATE.base, gradient: COLORS.CHOCOLATE.gradient },
      { type: IngredientType.FRAP_BLEND, ratio: 55, color: COLORS.FRAP_BLEND.base, gradient: COLORS.FRAP_BLEND.gradient },
      { type: IngredientType.WHIPPED_CREAM, ratio: 30, color: COLORS.WHIPPED_CREAM.base, gradient: COLORS.WHIPPED_CREAM.gradient },
    ]
  },
  {
    id: 'sb-mocha-frap',
    name: 'Mocha Frappuccino',
    category: 'Starbucks',
    description: 'Coffee with rich mocha sauce blended with milk and ice. Topped with whipped cream.',
    layers: [
      { type: IngredientType.MOCHA_SAUCE, ratio: 10, color: COLORS.CHOCOLATE.base, gradient: COLORS.CHOCOLATE.gradient },
      { type: IngredientType.FRAP_BLEND, ratio: 60, color: COLORS.FRAP_BLEND.base, gradient: COLORS.FRAP_BLEND.gradient },
      { type: IngredientType.WHIPPED_CREAM, ratio: 30, color: COLORS.WHIPPED_CREAM.base, gradient: COLORS.WHIPPED_CREAM.gradient },
    ]
  },
  {
    id: 'sb-caramel-java-chip',
    name: 'Caramel Java Chip Frappuccino',
    category: 'Starbucks',
    description: 'Rich in flavour coffee blended with milk, chocolate chips, caramel syrup and ice.',
    layers: [
      { type: IngredientType.SYRUP, ratio: 10, color: COLORS.SYRUP.base, gradient: COLORS.SYRUP.gradient },
      { type: IngredientType.FRAP_BLEND, ratio: 60, color: COLORS.FRAP_BLEND.base, gradient: COLORS.FRAP_BLEND.gradient },
      { type: IngredientType.WHIPPED_CREAM, ratio: 30, color: COLORS.WHIPPED_CREAM.base, gradient: COLORS.WHIPPED_CREAM.gradient },
    ]
  },
  {
    id: 'sb-green-tea-frap',
    name: 'Green Tea Cream Frappuccino',
    category: 'Starbucks',
    description: 'We blend sweetened premium matcha green tea, milk and ice and top it with sweetened whipped cream.',
    layers: [
      { type: IngredientType.MATCHA_BLEND, ratio: 70, color: COLORS.MATCHA.base, gradient: COLORS.MATCHA.gradient },
      { type: IngredientType.WHIPPED_CREAM, ratio: 30, color: COLORS.WHIPPED_CREAM.base, gradient: COLORS.WHIPPED_CREAM.gradient },
    ]
  },
  {
    id: 'sb-strawberry-creme-frap',
    name: 'Strawberries and Crème Frappuccino',
    category: 'Starbucks',
    description: 'Strawberries and milk are blended with ice and topped with a swirl of whipped cream.',
    layers: [
      { type: IngredientType.STRAWBERRY_BLEND, ratio: 70, color: COLORS.STRAWBERRY.base, gradient: COLORS.STRAWBERRY.gradient },
      { type: IngredientType.WHIPPED_CREAM, ratio: 30, color: COLORS.WHIPPED_CREAM.base, gradient: COLORS.WHIPPED_CREAM.gradient },
    ]
  },
  {
    id: 'sb-coffee-frap',
    name: 'Coffee Frappuccino',
    category: 'Starbucks',
    description: 'Coffee meets milk and ice in a blender and together they create one of our most-beloved original Frappuccino beverages.',
    layers: [
      { type: IngredientType.FRAP_BLEND, ratio: 100, color: COLORS.FRAP_BLEND.base, gradient: COLORS.FRAP_BLEND.gradient },
    ]
  },
  {
    id: 'sb-vanilla-creme-frap',
    name: 'Vanilla Cream Frappuccino',
    category: 'Starbucks',
    description: 'An indulgent blend of vanilla, milk and ice topped with whipped cream.',
    layers: [
      { type: IngredientType.STEAMED_MILK, ratio: 70, color: COLORS.STEAMED_MILK.base, gradient: COLORS.STEAMED_MILK.gradient },
      { type: IngredientType.WHIPPED_CREAM, ratio: 30, color: COLORS.WHIPPED_CREAM.base, gradient: COLORS.WHIPPED_CREAM.gradient },
    ]
  },
  {
    id: 'sb-white-mocha-frap',
    name: 'White Mocha Frappuccino',
    category: 'Starbucks',
    description: 'White chocolate Cream Frappuccino is a blend of white chocolate sauce, milk and ice.',
    layers: [
      { type: IngredientType.WHITE_MOCHA, ratio: 20, color: COLORS.WHITE_MOCHA.base, gradient: COLORS.WHITE_MOCHA.gradient },
      { type: IngredientType.FRAP_BLEND, ratio: 50, color: COLORS.FRAP_BLEND.base, gradient: COLORS.FRAP_BLEND.gradient },
      { type: IngredientType.WHIPPED_CREAM, ratio: 30, color: COLORS.WHIPPED_CREAM.base, gradient: COLORS.WHIPPED_CREAM.gradient },
    ]
  },

  // --- STARBUCKS REFRESHERS ---
  {
    id: 'sb-mango-refresher',
    name: 'Mango Dragonfruit Refresher',
    category: 'Starbucks',
    description: 'A vibrant, tropical refresher made with mango and dragonfruit flavors.',
    layers: [
      { type: IngredientType.MANGO_REFRESHER, ratio: 60, color: COLORS.MANGO.base, gradient: COLORS.MANGO.gradient },
      { type: IngredientType.ICE, ratio: 30, color: COLORS.ICE.base, gradient: COLORS.ICE.gradient },
      { type: IngredientType.WATER, ratio: 10, color: COLORS.WATER.base, gradient: COLORS.WATER.gradient },
    ]
  },
  {
    id: 'sb-apple-grapefruit',
    name: 'Apple Grapefruit Refresher',
    category: 'Starbucks',
    description: 'A vibrant fusion of crisp apple and tangy grapefruit flavours.',
    layers: [
      { type: IngredientType.APPLE_JUICE, ratio: 30, color: COLORS.APPLE.base, gradient: COLORS.APPLE.gradient },
      { type: IngredientType.ORANGE_JUICE, ratio: 30, color: COLORS.ORANGE.base, gradient: COLORS.ORANGE.gradient },
      { type: IngredientType.ICE, ratio: 40, color: COLORS.ICE.base, gradient: COLORS.ICE.gradient },
    ]
  },
  {
    id: 'sb-strawberry-acai',
    name: 'Strawberry Acai Refresher',
    category: 'Starbucks',
    description: 'Sweet strawberry flavours accented by acai notes, shaken with ice.',
    layers: [
      { type: IngredientType.STRAWBERRY_REFRESHER, ratio: 60, color: COLORS.STRAWBERRY.base, gradient: COLORS.STRAWBERRY.gradient },
      { type: IngredientType.ICE, ratio: 40, color: COLORS.ICE.base, gradient: COLORS.ICE.gradient },
    ]
  },
  {
    id: 'sb-kiwi-calamansi',
    name: 'Kiwi Calamansi Refresher',
    category: 'Starbucks',
    description: 'Enjoy a burst of playfulness with our Kiwi Calamansi Refresher.',
    layers: [
      { type: IngredientType.KIWI_REFRESHER, ratio: 60, color: COLORS.KIWI.base, gradient: COLORS.KIWI.gradient },
      { type: IngredientType.ICE, ratio: 40, color: COLORS.ICE.base, gradient: COLORS.ICE.gradient },
    ]
  },
  {
    id: 'sb-lychee-raspberry',
    name: 'Lychee Raspberry Refresher',
    category: 'Starbucks',
    description: 'Enjoy a symphony of juicy lychee flavours and tart freeze dried raspberries.',
    layers: [
      { type: IngredientType.LYCHEE_REFRESHER, ratio: 60, color: COLORS.LYCHEE.base, gradient: COLORS.LYCHEE.gradient },
      { type: IngredientType.ICE, ratio: 40, color: COLORS.ICE.base, gradient: COLORS.ICE.gradient },
    ]
  },

  // --- STARBUCKS OTHERS ---
  {
    id: 'sb-jaggery-latte',
    name: 'Jaggery Cloud Latte',
    category: 'Starbucks',
    description: 'A coffee-forward latte topped with a cloud of luscious jaggery foam.',
    layers: [
      { type: IngredientType.ESPRESSO, ratio: 20, color: COLORS.ESPRESSO.base, gradient: COLORS.ESPRESSO.gradient },
      { type: IngredientType.STEAMED_MILK, ratio: 50, color: COLORS.STEAMED_MILK.base, gradient: COLORS.STEAMED_MILK.gradient },
      { type: IngredientType.JAGGERY_FOAM, ratio: 30, color: COLORS.JAGGERY.base, gradient: COLORS.JAGGERY.gradient },
    ]
  },
  {
    id: 'sb-toffee-nut-matcha',
    name: 'Iced Toffee Nut Matcha',
    category: 'Starbucks',
    description: 'Smooth matcha foam topped over iced toffee-nut latte.',
    layers: [
      { type: IngredientType.SYRUP, ratio: 10, color: COLORS.SYRUP.base, gradient: COLORS.SYRUP.gradient },
      { type: IngredientType.STEAMED_MILK, ratio: 40, color: COLORS.STEAMED_MILK.base, gradient: COLORS.STEAMED_MILK.gradient },
      { type: IngredientType.ICE, ratio: 20, color: COLORS.ICE.base, gradient: COLORS.ICE.gradient },
      { type: IngredientType.MATCHA, ratio: 30, color: COLORS.MATCHA.base, gradient: COLORS.MATCHA.gradient },
    ]
  },
  {
    id: 'sb-caramel-macchiato',
    name: 'Caramel Macchiato',
    category: 'Starbucks',
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
    category: 'Starbucks',
    description: 'Espresso and steamed milk with pumpkin, cinnamon, nutmeg and clove flavors.',
    layers: [
      { type: IngredientType.ESPRESSO, ratio: 20, color: COLORS.ESPRESSO.base, gradient: COLORS.ESPRESSO.gradient },
      { type: IngredientType.STEAMED_MILK, ratio: 50, color: COLORS.STEAMED_MILK.base, gradient: COLORS.STEAMED_MILK.gradient },
      { type: IngredientType.WHIPPED_CREAM, ratio: 20, color: COLORS.WHIPPED_CREAM.base, gradient: COLORS.WHIPPED_CREAM.gradient },
    ]
  },
  {
    id: 'sb-irish-latte',
    name: 'Signature Irish Latte',
    category: 'Starbucks',
    description: 'Starbucks Signature latte paired with Bailey’s Irish Cream flavour.',
    layers: [
      { type: IngredientType.ESPRESSO, ratio: 20, color: COLORS.ESPRESSO.base, gradient: COLORS.ESPRESSO.gradient },
      { type: IngredientType.STEAMED_MILK, ratio: 50, color: COLORS.STEAMED_MILK.base, gradient: COLORS.STEAMED_MILK.gradient },
      { type: IngredientType.IRISH_CREAM, ratio: 30, color: COLORS.IRISH_CREAM.base, gradient: COLORS.IRISH_CREAM.gradient },
    ]
  },
  {
    id: 'sb-hot-choc',
    name: 'Signature Hot Chocolate',
    category: 'Starbucks',
    description: 'Four Cocoas and fresh steamed milk with whipped cream and chocolate powder.',
    layers: [
      { type: IngredientType.CHOCOLATE, ratio: 80, color: COLORS.CHOCOLATE.base, gradient: COLORS.CHOCOLATE.gradient },
      { type: IngredientType.WHIPPED_CREAM, ratio: 20, color: COLORS.WHIPPED_CREAM.base, gradient: COLORS.WHIPPED_CREAM.gradient },
    ]
  },
  {
    id: 'sb-milkshake-vanilla',
    name: 'Vanilla Milkshake',
    category: 'Starbucks',
    description: 'Your favourite Vanilla milkshake is now at Starbucks. A perfect blend.',
    layers: [
      { type: IngredientType.VANILLA_ICE_CREAM, ratio: 90, color: COLORS.STEAMED_MILK.base, gradient: COLORS.STEAMED_MILK.gradient },
      { type: IngredientType.WHIPPED_CREAM, ratio: 10, color: COLORS.WHIPPED_CREAM.base, gradient: COLORS.WHIPPED_CREAM.gradient },
    ]
  },
  {
    id: 'sb-milkshake-choco',
    name: 'Chocolate Milkshake',
    category: 'Starbucks',
    description: 'Our Starbucks signature chocolate perfected for you as a smooth milkshake.',
    layers: [
      { type: IngredientType.CHOCOLATE, ratio: 90, color: COLORS.CHOCOLATE.base, gradient: COLORS.CHOCOLATE.gradient },
      { type: IngredientType.WHIPPED_CREAM, ratio: 10, color: COLORS.WHIPPED_CREAM.base, gradient: COLORS.WHIPPED_CREAM.gradient },
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
  {
    id: 'th-french-vanilla',
    name: 'French Vanilla',
    category: 'Tim Hortons',
    description: 'A smooth, rich, and creamy vanilla flavored coffee beverage that warms the soul.',
    layers: [
      { type: IngredientType.FRENCH_VANILLA, ratio: 90, color: COLORS.FRENCH_VANILLA.base, gradient: COLORS.FRENCH_VANILLA.gradient },
      { type: IngredientType.MILK_FOAM, ratio: 10, color: COLORS.MILK_FOAM.base, gradient: COLORS.MILK_FOAM.gradient },
    ]
  },
  {
    id: 'th-dark-roast',
    name: 'Dark Roast',
    category: 'Tim Hortons',
    description: 'Expertly roasted for a richer, fuller body and a smoother finish.',
    layers: [
      { type: IngredientType.DARK_ROAST, ratio: 90, color: COLORS.DARK_ROAST.base, gradient: COLORS.DARK_ROAST.gradient },
    ]
  },
  {
    id: 'th-hazelnut-cb',
    name: 'Roasted Hazelnut Cold Brew',
    category: 'Tim Hortons',
    description: 'Smooth Cold Brew topped with espresso-infused foam and hazelnut syrup.',
    layers: [
      { type: IngredientType.HAZELNUT_SYRUP, ratio: 10, color: COLORS.HAZELNUT.base, gradient: COLORS.HAZELNUT.gradient },
      { type: IngredientType.COLD_BREW, ratio: 50, color: COLORS.COLD_BREW.base, gradient: COLORS.COLD_BREW.gradient },
      { type: IngredientType.ICE, ratio: 20, color: COLORS.ICE.base, gradient: COLORS.ICE.gradient },
      { type: IngredientType.MILK_FOAM, ratio: 20, color: COLORS.MILK_FOAM.base, gradient: COLORS.MILK_FOAM.gradient },
    ]
  },

  // --- THIRD WAVE COFFEE ---
  {
    id: 'twc-sea-salt-mocha',
    name: 'Sea Salt Mocha',
    category: 'Third Wave Coffee',
    description: 'Rich mocha topped with sea salt for a perfect sweet and savory balance.',
    layers: [
      { type: IngredientType.CHOCOLATE, ratio: 10, color: COLORS.CHOCOLATE.base, gradient: COLORS.CHOCOLATE.gradient },
      { type: IngredientType.ESPRESSO, ratio: 20, color: COLORS.ESPRESSO.base, gradient: COLORS.ESPRESSO.gradient },
      { type: IngredientType.STEAMED_MILK, ratio: 50, color: COLORS.STEAMED_MILK.base, gradient: COLORS.STEAMED_MILK.gradient },
      { type: IngredientType.SEA_SALT, ratio: 20, color: COLORS.SALTED_FOAM.base, gradient: COLORS.SALTED_FOAM.gradient },
    ]
  },
  {
    id: 'twc-lavie-en-rose',
    name: 'La Vie En Rose',
    category: 'Third Wave Coffee',
    description: 'A romantic blend of rose water and aromatic coffee, served with dried rose petals.',
    layers: [
      { type: IngredientType.ROSE_SYRUP, ratio: 10, color: COLORS.ROSE.base, gradient: COLORS.ROSE.gradient },
      { type: IngredientType.ESPRESSO, ratio: 20, color: COLORS.ESPRESSO.base, gradient: COLORS.ESPRESSO.gradient },
      { type: IngredientType.STEAMED_MILK, ratio: 60, color: COLORS.STEAMED_MILK.base, gradient: COLORS.STEAMED_MILK.gradient },
      { type: IngredientType.MILK_FOAM, ratio: 10, color: COLORS.MILK_FOAM.base, gradient: COLORS.MILK_FOAM.gradient },
    ]
  },
  {
    id: 'twc-lavender-latte',
    name: 'Lavender Latte',
    category: 'Third Wave Coffee',
    description: 'A soothing latte infused with floral lavender notes.',
    layers: [
      { type: IngredientType.LAVENDER_SYRUP, ratio: 10, color: COLORS.LAVENDER.base, gradient: COLORS.LAVENDER.gradient },
      { type: IngredientType.ESPRESSO, ratio: 20, color: COLORS.ESPRESSO.base, gradient: COLORS.ESPRESSO.gradient },
      { type: IngredientType.STEAMED_MILK, ratio: 60, color: COLORS.STEAMED_MILK.base, gradient: COLORS.STEAMED_MILK.gradient },
      { type: IngredientType.MILK_FOAM, ratio: 10, color: COLORS.MILK_FOAM.base, gradient: COLORS.MILK_FOAM.gradient },
    ]
  },
  {
    id: 'twc-shakerato',
    name: 'Vietnamese Shakerato',
    category: 'Third Wave Coffee',
    description: 'Condensed milk and espresso shaken with ice for a frothy, sweet treat.',
    layers: [
      { type: IngredientType.CONDENSED_MILK, ratio: 20, color: COLORS.CONDENSED.base, gradient: COLORS.CONDENSED.gradient },
      { type: IngredientType.ESPRESSO, ratio: 40, color: COLORS.ESPRESSO.base, gradient: COLORS.ESPRESSO.gradient },
      { type: IngredientType.SHAKERATO_FOAM, ratio: 40, color: COLORS.NITRO.base, gradient: COLORS.NITRO.gradient },
    ]
  },
  {
    id: 'twc-classic-cold-brew',
    name: 'Classic Cold Brew',
    category: 'Third Wave Coffee',
    description: 'Steeped for over 18 hours to extract the smoothest flavor profile.',
    layers: [
      { type: IngredientType.COLD_BREW, ratio: 70, color: COLORS.COLD_BREW.base, gradient: COLORS.COLD_BREW.gradient },
      { type: IngredientType.ICE, ratio: 30, color: COLORS.ICE.base, gradient: COLORS.ICE.gradient },
    ]
  },
  {
    id: 'twc-dry-hazelnut',
    name: 'Dry Hazelnut Cappuccino',
    category: 'Third Wave Coffee',
    description: 'A cappuccino with extra foam and nutty hazelnut notes, served dry.',
    layers: [
      { type: IngredientType.HAZELNUT_SYRUP, ratio: 10, color: COLORS.HAZELNUT.base, gradient: COLORS.HAZELNUT.gradient },
      { type: IngredientType.ESPRESSO, ratio: 30, color: COLORS.ESPRESSO.base, gradient: COLORS.ESPRESSO.gradient },
      { type: IngredientType.MILK_FOAM, ratio: 60, color: COLORS.MILK_FOAM.base, gradient: COLORS.MILK_FOAM.gradient },
    ]
  },
  // New TWC Additions from Screenshots
  {
    id: 'twc-classic-cold-coffee',
    name: 'Classic Cold Coffee',
    category: 'Third Wave Coffee',
    description: 'A timeless blended cold coffee, creamy and refreshing.',
    layers: [
      { type: IngredientType.FRAP_BLEND, ratio: 90, color: COLORS.FRAP_BLEND.base, gradient: COLORS.FRAP_BLEND.gradient },
      { type: IngredientType.MILK_FOAM, ratio: 10, color: COLORS.MILK_FOAM.base, gradient: COLORS.MILK_FOAM.gradient },
    ]
  },
  {
    id: 'twc-caramel-frappe',
    name: 'Caramel Frappe',
    category: 'Third Wave Coffee',
    description: 'Blended coffee with rich caramel notes, topped with whipped cream.',
    layers: [
      { type: IngredientType.SYRUP, ratio: 10, color: COLORS.SYRUP.base, gradient: COLORS.SYRUP.gradient },
      { type: IngredientType.FRAP_BLEND, ratio: 70, color: COLORS.FRAP_BLEND.base, gradient: COLORS.FRAP_BLEND.gradient },
      { type: IngredientType.WHIPPED_CREAM, ratio: 20, color: COLORS.WHIPPED_CREAM.base, gradient: COLORS.WHIPPED_CREAM.gradient },
    ]
  },
  {
    id: 'twc-choco-hazelnut-frappe',
    name: 'Choco Hazelnut Frappe',
    category: 'Third Wave Coffee',
    description: 'A decadent blend of chocolate and hazelnut.',
    layers: [
      { type: IngredientType.CHOCOLATE, ratio: 10, color: COLORS.CHOCOLATE.base, gradient: COLORS.CHOCOLATE.gradient },
      { type: IngredientType.HAZELNUT_SYRUP, ratio: 10, color: COLORS.HAZELNUT.base, gradient: COLORS.HAZELNUT.gradient },
      { type: IngredientType.FRAP_BLEND, ratio: 60, color: COLORS.FRAP_BLEND.base, gradient: COLORS.FRAP_BLEND.gradient },
      { type: IngredientType.WHIPPED_CREAM, ratio: 20, color: COLORS.WHIPPED_CREAM.base, gradient: COLORS.WHIPPED_CREAM.gradient },
    ]
  },
  {
    id: 'twc-mocha-choco-chip-frappe',
    name: 'Mocha Choco Chip Frappe',
    category: 'Third Wave Coffee',
    description: 'Crunchy chocolate chips met with a rich mocha blend.',
    layers: [
      { type: IngredientType.CHOCOLATE, ratio: 15, color: COLORS.CHOCOLATE.base, gradient: COLORS.CHOCOLATE.gradient },
      { type: IngredientType.FRAP_BLEND, ratio: 65, color: COLORS.FRAP_BLEND.base, gradient: COLORS.FRAP_BLEND.gradient },
      { type: IngredientType.WHIPPED_CREAM, ratio: 20, color: COLORS.WHIPPED_CREAM.base, gradient: COLORS.WHIPPED_CREAM.gradient },
    ]
  },
  {
    id: 'twc-toffee-nut-frappe',
    name: 'Toffee Nut Frappe',
    category: 'Third Wave Coffee',
    description: 'Buttery toffee nut syrup blended with coffee and milk.',
    layers: [
      { type: IngredientType.TOFFEE_NUT, ratio: 15, color: COLORS.HAZELNUT.base, gradient: COLORS.HAZELNUT.gradient },
      { type: IngredientType.FRAP_BLEND, ratio: 65, color: COLORS.FRAP_BLEND.base, gradient: COLORS.FRAP_BLEND.gradient },
      { type: IngredientType.WHIPPED_CREAM, ratio: 20, color: COLORS.WHIPPED_CREAM.base, gradient: COLORS.WHIPPED_CREAM.gradient },
    ]
  },
  {
    id: 'twc-lemon-cold-brew',
    name: 'Lemon Cold Brew',
    category: 'Third Wave Coffee',
    description: 'Cold brew served with a zesty splash of lemon.',
    layers: [
      { type: IngredientType.LEMON_JUICE, ratio: 20, color: COLORS.LEMON_JUICE.base, gradient: COLORS.LEMON_JUICE.gradient },
      { type: IngredientType.COLD_BREW, ratio: 60, color: COLORS.COLD_BREW.base, gradient: COLORS.COLD_BREW.gradient },
      { type: IngredientType.ICE, ratio: 20, color: COLORS.ICE.base, gradient: COLORS.ICE.gradient },
    ]
  },
  {
    id: 'twc-citrus-orange-cold-brew',
    name: 'Citrus Orange Cold Brew',
    category: 'Third Wave Coffee',
    description: 'Refreshing cold brew infused with bright orange citrus notes.',
    layers: [
      { type: IngredientType.ORANGE_JUICE, ratio: 20, color: COLORS.ORANGE.base, gradient: COLORS.ORANGE.gradient },
      { type: IngredientType.COLD_BREW, ratio: 60, color: COLORS.COLD_BREW.base, gradient: COLORS.COLD_BREW.gradient },
      { type: IngredientType.ICE, ratio: 20, color: COLORS.ICE.base, gradient: COLORS.ICE.gradient },
    ]
  },
  {
    id: 'twc-masala-chai-latte',
    name: 'Masala Chai Latte',
    category: 'Third Wave Coffee',
    description: 'Spiced Indian tea brewed strong and topped with steamed milk.',
    layers: [
      { type: IngredientType.MASALA_CHAI, ratio: 30, color: COLORS.MASALA_CHAI.base, gradient: COLORS.MASALA_CHAI.gradient },
      { type: IngredientType.STEAMED_MILK, ratio: 50, color: COLORS.STEAMED_MILK.base, gradient: COLORS.STEAMED_MILK.gradient },
      { type: IngredientType.MILK_FOAM, ratio: 20, color: COLORS.MILK_FOAM.base, gradient: COLORS.MILK_FOAM.gradient },
    ]
  },
  {
    id: 'twc-japanese-matcha-latte',
    name: 'Japanese Matcha Latte',
    category: 'Third Wave Coffee',
    description: 'Premium Japanese matcha whisked with steamed milk.',
    layers: [
      { type: IngredientType.MATCHA, ratio: 30, color: COLORS.MATCHA.base, gradient: COLORS.MATCHA.gradient },
      { type: IngredientType.STEAMED_MILK, ratio: 50, color: COLORS.STEAMED_MILK.base, gradient: COLORS.STEAMED_MILK.gradient },
      { type: IngredientType.MILK_FOAM, ratio: 20, color: COLORS.MILK_FOAM.base, gradient: COLORS.MILK_FOAM.gradient },
    ]
  },
  {
    id: 'twc-orange-zest-mocha',
    name: 'Orange Zest Mocha',
    category: 'Third Wave Coffee',
    description: 'Rich chocolate and espresso livened up with orange zest.',
    layers: [
      { type: IngredientType.CHOCOLATE, ratio: 15, color: COLORS.CHOCOLATE.base, gradient: COLORS.CHOCOLATE.gradient },
      { type: IngredientType.ORANGE_JUICE, ratio: 10, color: COLORS.ORANGE.base, gradient: COLORS.ORANGE.gradient },
      { type: IngredientType.ESPRESSO, ratio: 20, color: COLORS.ESPRESSO.base, gradient: COLORS.ESPRESSO.gradient },
      { type: IngredientType.STEAMED_MILK, ratio: 45, color: COLORS.STEAMED_MILK.base, gradient: COLORS.STEAMED_MILK.gradient },
      { type: IngredientType.MILK_FOAM, ratio: 10, color: COLORS.MILK_FOAM.base, gradient: COLORS.MILK_FOAM.gradient },
    ]
  },
  {
    id: 'twc-french-vanilla-latte',
    name: 'French Vanilla Latte',
    category: 'Third Wave Coffee',
    description: 'Classic latte with sweet French Vanilla aromatics.',
    layers: [
      { type: IngredientType.FRENCH_VANILLA, ratio: 15, color: COLORS.FRENCH_VANILLA.base, gradient: COLORS.FRENCH_VANILLA.gradient },
      { type: IngredientType.ESPRESSO, ratio: 20, color: COLORS.ESPRESSO.base, gradient: COLORS.ESPRESSO.gradient },
      { type: IngredientType.STEAMED_MILK, ratio: 55, color: COLORS.STEAMED_MILK.base, gradient: COLORS.STEAMED_MILK.gradient },
      { type: IngredientType.MILK_FOAM, ratio: 10, color: COLORS.MILK_FOAM.base, gradient: COLORS.MILK_FOAM.gradient },
    ]
  },
  {
    id: 'twc-caramel-macchiato',
    name: 'Caramel Macchiato',
    category: 'Third Wave Coffee',
    description: 'Vanilla milk marked with espresso and caramel drizzle.',
    layers: [
      { type: IngredientType.SYRUP, ratio: 10, color: COLORS.SYRUP.base, gradient: COLORS.SYRUP.gradient },
      { type: IngredientType.STEAMED_MILK, ratio: 40, color: COLORS.STEAMED_MILK.base, gradient: COLORS.STEAMED_MILK.gradient },
      { type: IngredientType.ESPRESSO, ratio: 20, color: COLORS.ESPRESSO.base, gradient: COLORS.ESPRESSO.gradient },
      { type: IngredientType.MILK_FOAM, ratio: 20, color: COLORS.MILK_FOAM.base, gradient: COLORS.MILK_FOAM.gradient },
      { type: IngredientType.SYRUP, ratio: 10, color: COLORS.SYRUP.base, gradient: COLORS.SYRUP.gradient },
    ]
  },
  {
    id: 'twc-toffee-nut-latte',
    name: 'Toffee Nut Latte',
    category: 'Third Wave Coffee',
    description: 'Espresso and steamed milk with toffee nut sweetness.',
    layers: [
      { type: IngredientType.TOFFEE_NUT, ratio: 15, color: COLORS.HAZELNUT.base, gradient: COLORS.HAZELNUT.gradient },
      { type: IngredientType.ESPRESSO, ratio: 20, color: COLORS.ESPRESSO.base, gradient: COLORS.ESPRESSO.gradient },
      { type: IngredientType.STEAMED_MILK, ratio: 55, color: COLORS.STEAMED_MILK.base, gradient: COLORS.STEAMED_MILK.gradient },
      { type: IngredientType.MILK_FOAM, ratio: 10, color: COLORS.MILK_FOAM.base, gradient: COLORS.MILK_FOAM.gradient },
    ]
  },
  {
    id: 'twc-flat-white',
    name: 'Flat White',
    category: 'Third Wave Coffee',
    description: 'Double espresso with a thin layer of velvety microfoam.',
    layers: [
      { type: IngredientType.ESPRESSO, ratio: 30, color: COLORS.ESPRESSO.base, gradient: COLORS.ESPRESSO.gradient },
      { type: IngredientType.STEAMED_MILK, ratio: 60, color: COLORS.STEAMED_MILK.base, gradient: COLORS.STEAMED_MILK.gradient },
      { type: IngredientType.MILK_FOAM, ratio: 10, color: COLORS.MILK_FOAM.base, gradient: COLORS.MILK_FOAM.gradient },
    ]
  },
  {
    id: 'twc-affogato',
    name: 'Affogato',
    category: 'Third Wave Coffee',
    description: 'A scoop of vanilla ice cream drowned in hot espresso.',
    layers: [
      { type: IngredientType.VANILLA_ICE_CREAM, ratio: 60, color: COLORS.STEAMED_MILK.base, gradient: COLORS.STEAMED_MILK.gradient },
      { type: IngredientType.ESPRESSO, ratio: 40, color: COLORS.ESPRESSO.base, gradient: COLORS.ESPRESSO.gradient },
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