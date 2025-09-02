// You can paste this into a .ts/.tsx file. The types are provided for convenience.

export type BazaarItem = {
  name: string;
  price: number | string; // Some stalls use currency (G), others use Energy
  unlockWhen?: string; // Optional: not all items list an explicit unlock
  notes?: string; // Optional: extra info like time to complete or requirements
  unit?: "G" | "Energy"; // Optional: clarify the unit
  category?: string; // Optional: e.g., "Ore", "Expansion", "Upgrade", "Animal", "Warp", "Decoration", etc.
};

export type BazaarItems = {
  name: string;
  description: string;
  items: BazaarItem[];
}[];

// JSON data for the requested Bazaar shops
export const bazaarData: BazaarItems = [
  {
    name: "Felix's Stall",
    description: "Sells techniques, cooking ingredients and cooking recipes.",
    items: [
      {
        "name": "Double Jump",
        "price": 10000,
        "unit": "G",
        "category": "Technique",
        "notes":
          "Reach new heights and increase the range of your tools by jumping a second time in mid-air.",
      },
      {
        "name": "Reel Power",
        "price": 30000,
        "unit": "G",
        "category": "Technique",
        "notes":
          "Drastically weaken your catch while fishing with one pull of your rod.",
      },
      {
        "name": "Ultra Sow Technique +",
        "price": "50,000",
        "unit": "G",
        "category": "Technique",
        "notes":
          "Sow while double jumping to scatter up to 9 plots of seeds or fertilizer at once",
      },
      {
        "name": "Ultra Harvest Technique +",
        "price": "50,000",
        "unit": "G",
        "category": "Technique",
        "notes":
          "Harvest while double jumping to collect up to 9 plots of crops at once",
      },
      {
        "name": "Fertilizer",
        "price": 28,
        "unit": "G",
        "category": "Supply",
      },
      {
        "name": "Miso",
        "price": 182,
        "unit": "G",
        "category": "Seasonings",
        "notes":
          "Sales price shown elsewhere as 130G (item quality affects price)",
      },
      {
        "name": "Soy Sauce",
        "price": 182,
        "unit": "G",
        "category": "Seasonings",
      },
      {
        "name": "Vinegar",
        "price": 196,
        "unit": "G",
        "category": "Seasonings",
      },
      {
        "name": "Wheat Flour",
        "price": 210,
        "unit": "G",
        "category": "Foodstuffs",
        "notes": "Stock: 30",
      },
      {
        "name": "Rice Flour",
        "price": 196,
        "unit": "G",
        "category": "Foodstuffs",
        "notes": "Stock: 30",
      },
      {
        "name": "Buckwheat Flour",
        "price": 588,
        "unit": "G",
        "category": "Foodstuffs",
        "notes": "Stock: 30",
      },
      {
        "name": "Refined Rice Flour",
        "price": 588,
        "unit": "G",
        "category": "Foodstuffs",
        "notes": "Stock: 30",
      },
      {
        "name": "Soybean Flour",
        "price": 182,
        "unit": "G",
        "category": "Foodstuffs",
        "notes": "Stock: 30",
      },
      {
        "name": "Breadcrumbs",
        "price": 361,
        "unit": "G",
        "category": "Foodstuffs",
        "notes": "Stock: 30",
      },
      {
        "name": "White Breadcrumbs",
        "price": 383,
        "unit": "G",
        "category": "Foodstuffs",
        "notes": "Stock: 30",
      },
    ],
  },
  {
    name: "Lloyd's Stall",
    description: "Sells ores.",
    items: [
      {
        "name": "Rock",
        "price": 20,
        "unit": "G",
        "category": "Ore",
      },
      {
        name: "Iron",
        price: 210,
        unit: "G",
        category: "Ore",
        unlockWhen: "Bazaar Rank 3",
      },
      {
        name: "Copper",
        price: 700,
        unit: "G",
        category: "Ore",
        unlockWhen: "Bazaar Rank 3",
      },
      {
        name: "Silver",
        price: 1120,
        unit: "G",
        category: "Ore",
        unlockWhen: "Bazaar Rank 3",
      },
      {
        name: "Gold",
        price: 2800,
        unit: "G",
        category: "Ore",
        unlockWhen: "Bazaar Rank 4",
      },
      {
        "name": "Moonstone",
        "price": 1000,
        "unit": "G",
        "category": "Gemstones",
      },
      {
        "name": "Peridot",
        "price": 1500,
        "unit": "G",
        "category": "Gemstones",
      },
      {
        "name": "Amethyst",
        "price": 2000,
        "unit": "G",
        "category": "Gemstones",
      },
      {
        "name": "Topaz",
        "price": 2500,
        "unit": "G",
        "category": "Gemstones",
      },
      {
        "name": "Emerald",
        "price": 3000,
        "unit": "G",
        "category": "Gemstones",
      },
      {
        "name": "Ruby",
        "price": 4000,
        "unit": "G",
        "category": "Gemstones",
      },
    ],
  },
  {
    name: "Isaac's Stall",
    description: "Sells bag, storage, field, pasture, and bed expansions.",
    items: [
      {
        name: "Bag Expansion",
        price: 5000,
        unit: "G",
        category: "Bag Expansion",
        notes: "Increases bag to 24 items. Completed instantly.",
      },
      {
        name: "Bigger Bag Expansion",
        price: 30000,
        unit: "G",
        category: "Bag Expansion",
        notes: "Increases bag to 32 items. Completed instantly.",
      },
      {
        name: "Field Expansion",
        price: 20000,
        unit: "G",
        category: "Field Expansion",
        notes: "Creates a second field. Takes 2 days.",
      },
      {
        name: "Extra Field Expansion",
        price: 100000,
        unit: "G",
        category: "Field Expansion",
        notes: "Creates a third field. Takes 2 days.",
      },
      {
        name: "Pasture Expansion",
        price: 50000,
        unit: "G",
        category: "Expansion",
        notes:
          "Clears east side of pasture; room for another barn. Takes 3 days.",
      },
      {
        name: "Storage Expansion",
        price: 5000,
        unit: "G",
        category: "Storage Expansion",
        notes: "Increases storage to 48 items. Takes 1 day.",
      },
      {
        name: "Minor Storage Expansion",
        price: 20000,
        unit: "G",
        category: "Storage Expansion",
        notes: "Increases storage to 72 items. Takes 1 day.",
      },
      {
        name: "Small Storage Expansion",
        price: 40000,
        unit: "G",
        category: "Storage Expansion",
        notes: "Increases storage to 96 items. Takes 1 day.",
      },
      {
        name: "Modest Storage Expansion",
        price: 80000,
        unit: "G",
        category: "Storage Expansion",
        notes: "Increases storage to 120 items. Takes 1 day.",
      },
      {
        name: "Moderate Storage Expansion",
        price: 100000,
        unit: "G",
        category: "Storage Expansion",
        notes: "Increases storage to 144 items. Takes 1 day.",
      },
      {
        name: "Double Bed Upgrade",
        price: 10000,
        unit: "G",
        category: "Upgrade",
        notes: "Upgrades to a bed for two; required to propose. Takes 1 day.",
      },
    ],
  },
  {
    name: "Garon's Stall",
    description:
      "Sells soil upgrades, storage freshness power-ups, cooking tools, bath upgrade, and barn construction.",
    items: [
      {
        name: "Good-Quality Soil",
        price: 50000,
        unit: "G",
        category: "Soil Upgrade",
        notes: "Improves soil for slightly higher quality crops. Takes 2 days.",
      },
      {
        name: "High-Quality Soil",
        price: 100000,
        unit: "G",
        category: "Soil Upgrade",
        notes:
          "Improves soil for significantly higher quality crops. Takes 2 days.",
      },
      {
        name: "Minor Storage Power-Up",
        price: 50000,
        unit: "G",
        category: "Storage Power-up",
        notes: "Keeps items fresher for longer. Takes 1 day.",
      },
      {
        name: "Decent Storage Power-Up",
        price: 100000,
        unit: "G",
        category: "Storage Power-up",
        notes: "Keeps items fresher for significantly longer. Takes 1 day.",
      },
      {
        name: "Frying Pan",
        price: 10000,
        unit: "G",
        category: "Cooking Tool",
        notes: "Opens up cooking options. Instant.",
      },
      {
        name: "Cooking Pot",
        price: 30000,
        unit: "G",
        category: "Cooking Tool",
        notes: "Opens up soup recipes. Instant.",
      },
      {
        name: "Oven",
        price: 50000,
        unit: "G",
        category: "Cooking Tool",
        notes: "Opens up dessert recipes. Instant.",
      },
      {
        name: "Bathtub Power-Up",
        price: 112600,
        unit: "G",
        category: "Bath Power-up",
        notes: "More stamina from baths. Takes 1 day.",
      },
      {
        name: "Extra Barn",
        price: 100000,
        unit: "G",
        category: "Barn Construction",
        notes: "Adds another barn in NE farm area. Takes 3 days.",
      },
    ],
  },
  {
    name: "Ramon's Critters Stall",
    description: "Sells livestock, poultry, and pets.",
    items: [
      { name: "Chick", price: 2000, unit: "G", category: "Animal" },
      { name: "Chicken", price: 4000, unit: "G", category: "Animal" },
      { name: "Alpaca", price: 4000, unit: "G", category: "Animal" },
      { name: "Brown Alpaca", price: 10000, unit: "G", category: "Animal" },
      { name: "Lamb", price: 4000, unit: "G", category: "Animal" },
      { name: "Suffolk Lamb", price: 4000, unit: "G", category: "Animal" },
      { name: "Calf", price: 4000, unit: "G", category: "Animal" },
      {
        name: "Common Cat",
        price: 5000,
        unit: "G",
        category: "Pet",
        notes: "Herds Chickens (up to 5). Unlock: Summer 5, Year 1.",
      },
      {
        name: "Rare Cat",
        price: 10000,
        unit: "G",
        category: "Pet",
        notes: "Herds Chickens (up to 5). Unlock: Summer 5, Year 1.",
      },
      {
        name: "Small Dog",
        price: 6000,
        unit: "G",
        category: "Pet",
        notes: "Herds Cows & Sheep (up to 5). Unlock: Summer 5, Year 1.",
      },
      {
        name: "Big Dog",
        price: 8000,
        unit: "G",
        category: "Pet",
        notes: "Herds Cows & Sheep (up to 5). Unlock: Summer 5, Year 1.",
      },
      {
        name: "Horse",
        price: 10000,
        unit: "G",
        category: "Pet",
        notes:
          "Fast travel, racing. Limit: 1. Unlock: Autumn 2, Year 1 (free from Ramón).",
      },
    ],
  },
  {
    name: "Sprite Stall",
    description:
      "Trades Energy for warp boxes, power berries, decorations, recipes, and basic resources/seeds.",
    items: [
      {
        name: "Spirit Box: Bazaar",
        price: 5000,
        unit: "Energy",
        category: "Storage Box",
        notes: "Warp Storage Box",
      },
      {
        name: "Spirit Box: Zephyr Town",
        price: 20000,
        unit: "Energy",
        category: "Storage Box",
        notes: "Warp Storage Box",
      },
      {
        name: "Spirit Box: Red Windmill",
        price: 5000,
        unit: "Energy",
        category: "Storage Box",
        notes: "Warp Storage Box",
      },
      {
        name: "Spirit Box: Blue Windmill",
        price: 20000,
        unit: "Energy",
        category: "Storage Box",
        notes: "Warp Storage Box",
      },
      {
        name: "Spirit Box: Mountains",
        price: 50000,
        unit: "Energy",
        category: "Storage Box",
        notes: "Warp Storage Box",
      },
      {
        "name": "Happy Box: Bazaar",
        "price": 30000,
        "unit": "G",
        "category": "Warp",
        "notes":
          "Makes the Sprite Box by your bazaar stall more powerful. If you jump inside, you can warp yourself home.",
      },
      {
        "name": "Happy Box: Zephyr Town",
        "price": 60000,
        "unit": "G",
        "category": "Warp",
        "notes":
          "Makes the Sprite Box by your bazaar stall more powerful. If you jump inside, you can warp yourself home.",
      },
      {
        "name": "Happy Box: Red Windmill",
        "price": 30000,
        "unit": "G",
        "category": "Warp",
        "notes":
          "Makes the Sprite Box by your bazaar stall more powerful. If you jump inside, you can warp yourself home.",
      },
      {
        "name": "Happy Box: Blue Windmill",
        "price": 50000,
        "unit": "G",
        "category": "Warp",
        "notes":
          "Makes the Sprite Box by your bazaar stall more powerful. If you jump inside, you can warp yourself home.",
      },
      {
        "name": "Happy Box: Yellow Windmill",
        "price": 90000,
        "unit": "G",
        "category": "Warp",
        "notes":
          "Makes the Sprite Box by your bazaar stall more powerful. If you jump inside, you can warp yourself home.",
      },
      {
        "name": "Happy Box: Mountains",
        "price": 150000,
        "unit": "G",
        "category": "Warp",
        "notes":
          "Makes the Sprite Box by your bazaar stall more powerful. If you jump inside, you can warp yourself home.",
      },
      {
        name: "Power Berry",
        price: 10000,
        unit: "Energy",
        category: "Power Berries",
      },
      {
        name: "Leaf Tent",
        price: 6000,
        unit: "Energy",
        category: "Decoration",
      },
      {
        name: "Leaf Counter",
        price: 5000,
        unit: "Energy",
        category: "Decoration",
      },
      {
        name: "Nature Sprite Gift",
        price: 4500,
        unit: "Energy",
        category: "Decoration",
      },
      {
        name: "Happy Forest Mix",
        price: 1000,
        unit: "Energy",
        category: "Recipe",
      },
      { name: "Weeds", price: 300, unit: "Energy", category: "Wild Grass" },
      { name: "Wood", price: 300, unit: "Energy", category: "Resource" },
      { name: "Rock", price: 300, unit: "Energy", category: "Resource" },
      {
        name: "Turnip Seed",
        price: 1000,
        unit: "Energy",
        category: "Crop Seeds",
      },
      {
        name: "Strawberry Seed",
        price: 1000,
        unit: "Energy",
        category: "Crop Seeds",
      },
      {
        name: "Rice Seed",
        price: 1000,
        unit: "Energy",
        category: "Crop Seeds",
      },
      {
        name: "Soybean Seed",
        price: 1000,
        unit: "Energy",
        category: "Crop Seeds",
      },
      {
        name: "Wheat Seed",
        price: 1000,
        unit: "Energy",
        category: "Crop Seeds",
      },
      { name: "Tea Seed", price: 1000, unit: "Energy", category: "Crop Seeds" },
    ],
  },
  {
    name: "Ronaldo's Stall",
    description: "Sell seeds and cooking ingredients.",
    items: [
      {
        "name": "Carrot Seed",
        "price": 170,
        "unit": "G",
        "category": "Crop Seeds",
      },
      {
        "name": "Common Spores",
        "price": 200,
        "unit": "G",
        "category": "Mushroom Spores",
      },
      {
        "name": "Shimeji Spores",
        "price": 120,
        "unit": "G",
        "category": "Mushroom Spores",
      },
      {
        "name": "Shiitake Spores",
        "price": 160,
        "unit": "G",
        "category": "Mushroom Spores",
      },
      {
        "name": "Chrysanthemum Seeds",
        "price": 160,
        "unit": "G",
        "category": "Flower Seeds",
      },
      {
        "name": "Eggplant Seeds",
        "price": 240,
        "unit": "G",
        "category": "Crop Seeds",
      },
      {
        "name": "Bok Choy Seeds",
        "price": 160,
        "unit": "G",
        "category": "Crop Seeds",
      },
      {
        "name": "Porcini Spores",
        "price": 240,
        "unit": "G",
        "category": "Mushroom Spores",
      },
      { "name": "Salt", "price": 300, "unit": "G", "category": "Seasonings" },
      { "name": "Sugar", "price": 300, "unit": "G", "category": "Seasonings" },
      { "name": "Pepper", "price": 300, "unit": "G", "category": "Seasonings" },
      {
        "name": "Chocolate",
        "price": 300,
        "unit": "G",
        "category": "Foodstuffs",
      },
      { "name": "Mochi", "price": 300, "unit": "G", "category": "Foodstuffs" },
      { "name": "Urchin", "price": 500, "unit": "G", "category": "Foodstuffs" },
      {
        "name": "Seaweed",
        "price": 180,
        "unit": "G",
        "category": "Foodstuffs",
      },
      {
        "name": "Curry Powder",
        "price": 300,
        "unit": "G",
        "category": "Seasonings",
      },
      { "name": "Spice", "price": 200, "unit": "G", "category": "Seasonings" },
      { "name": "Oil", "price": 200, "unit": "G", "category": "Oils" },
    ],
  },
  {
    name: "Arata's Stall",
    description: "Sell upgrades for beekeeping and mushroom logs.",
    items: [
      {
        name: "Beekeeping House",
        price: 10000,
        unit: "G",
        category: "Beekeeping Upgrade",
        notes: "Install Beekping House at the Mountains",
      },
      {
        name: "Expanded Beekeeping House",
        price: 50000,
        unit: "G",
        category: "Beekeeping Upgrade",
        notes:
          "Expands the flower bed and increases the amount of honey you can collect",
      },
      {
        name: "Bigger Beekeeping House",
        price: 100000,
        unit: "G",
        category: "Beekeeping Upgrade",
        notes:
          "Expands the flower bed and increases the amount of honey you can collect",
      },
      {
        name: "Mushroom Log",
        price: 10000,
        unit: "G",
        category: "Mushroom Log",
        notes: "Install Mushroom Log at the Mountain.",
      },
      {
        name: "Second Mushroom Log",
        price: 50000,
        unit: "G",
        category: "Mushroom Log",
        notes: "Install Mushroom Log at the Mountain.",
      },
      {
        name: "Third Mushroom Log",
        price: 100000,
        unit: "G",
        category: "Mushroom Log",
        notes: "Install Mushroom Log at the Mountain.",
      },
    ],
  },
  {
    "name": "Karina's Stall",
    "description": "Sell clothes and wearables.",
    items: [
      {
        "name": "Flat Cap (Black)",
        "price": 2000,
        "unit": "G",
        "category": "Headwear",
        "notes": "Materials: Alpaca Yarn x1, Noble Dye (Black) x1",
      },
      {
        "name": "Flat Cap (Red)",
        "price": 2000,
        "unit": "G",
        "category": "Headwear",
        "notes": "Materials: Alpaca Yarn x1, Warm Dye (Red/Pink) x1",
      },
      {
        "name": "Flat Cap (Green)",
        "price": 2000,
        "unit": "G",
        "category": "Headwear",
        "notes": "Materials: Alpaca Yarn x1, Natural Dye (Green) x1",
      },
      {
        "name": "Ribbon Headband (Black)",
        "price": 2000,
        "unit": "G",
        "category": "Headwear",
        "notes": "Materials: Alpaca Yarn x1, Noble Dye (Black) x1",
      },
      {
        "name": "Ribbon Headband (Pink)",
        "price": 2000,
        "unit": "G",
        "category": "Headwear",
        "notes": "Materials: Alpaca Yarn x1, Warm Dye (Red/Pink) x1",
      },
      {
        "name": "Ribbon Headband (Yellow)",
        "price": 2000,
        "unit": "G",
        "category": "Headwear",
        "notes":
          "Materials: Alpaca Yarn x1, Warm Dye + Natural Dye (Yellow) x1",
      },
      {
        "name": "Straw Boater Hat (Red)",
        "price": 5000,
        "unit": "G",
        "category": "Headwear",
        "notes": "Materials: Wheat x3, Warm Dye (Red/Pink) x1",
      },
      {
        "name": "Straw Boater Hat (Blue)",
        "price": 5000,
        "unit": "G",
        "category": "Headwear",
        "notes": "Materials: Wheat x3, Cool Dye (Blue) x1",
      },
      {
        "name": "Straw Boater Hat (Black)",
        "price": 5000,
        "unit": "G",
        "category": "Headwear",
        "notes": "Materials: Wheat x3, Noble Dye (Black) x1",
      },
      {
        "name": "Knit Hat (Red)",
        "price": 2000,
        "unit": "G",
        "category": "Headwear",
        "notes": "Materials: Woolen Yarn (Sheep) x1, Warm Dye (Red/Pink) x1",
      },
      {
        "name": "Knit Hat (Yellow)",
        "price": 2000,
        "unit": "G",
        "category": "Headwear",
        "notes":
          "Materials: Woolen Yarn (Sheep) x1, Warm Dye + Natural Dye (Yellow) x1",
      },
      {
        "name": "Knit Hat (Black)",
        "price": 2000,
        "unit": "G",
        "category": "Headwear",
        "notes": "Materials: Woolen Yarn (Sheep) x1, Noble Dye (Black) x1",
      },
      {
        "name": "Mini-Hat (Purple)",
        "price": 10000,
        "unit": "G",
        "category": "Headwear",
        "notes": "Materials: Brown Alpaca Yarn x2, Noble Dye (Purple) x1",
      },
      {
        "name": "Mini-Hat (Green)",
        "price": 10000,
        "unit": "G",
        "category": "Headwear",
        "notes": "Materials: Brown Alpaca Yarn x2, Natural Dye (Green) x1",
      },
      {
        "name": "Mini-Hat (Blue)",
        "price": 10000,
        "unit": "G",
        "category": "Headwear",
        "notes": "Materials: Brown Alpaca Yarn x2, Cool Dye (Blue) x1",
      },
      {
        "name": "Casual Shirt (Teal)",
        "price": 3000,
        "unit": "G",
        "category": "Clothes",
        "notes":
          "Ingredients: 1 Alpaca Yarn (gold coin icon shown), 1 Natural Dye (green), 1 Elegant Dye (white/gray)",
      },
      {
        "name": "Casual Shirt (Orange)",
        "price": 3000,
        "unit": "G",
        "category": "Clothes",
        "notes":
          "Ingredients: 1 Alpaca Yarn (gold coin icon shown), 1 Warm Dye (red/pink), 1 Natural Dye (green), 1 Cool Dye (blue)",
      },
      {
        "name": "Casual Shirt (Black)",
        "price": 3000,
        "unit": "G",
        "category": "Clothes",
        "notes":
          "Ingredients: 1 Alpaca Yarn (gold coin icon shown), 1 Elegant Dye (white/gray), 1 Noble Dye (purple/black)",
      },
      {
        "name": "Casual Shirt (Yellow)",
        "price": 15000,
        "unit": "G",
        "category": "Clothes",
        "notes":
          "Ingredients: 2 Alpaca Yarn+ (gold alpaca coin), 2 Elegant Dye (white/gray), 2 Noble Dye (purple)",
      },
      {
        "name": "Stylish Casual Shirt",
        "price": 3000,
        "unit": "G",
        "category": "Clothes",
        "notes":
          "Ingredients: 1 Alpaca Yarn (gold coin icon shown), 1 Warm Dye (red/pink), 1 Natural Dye (green)",
      },
      {
        "name": "Overalls (Red)",
        "price": 3000,
        "unit": "G",
        "category": "Clothes",
        "notes":
          "Ingredients: 1 Alpaca Yarn (gold coin icon shown), 1 Noble Dye (purple), 1 Warm Dye (red/pink)",
      },
      {
        "name": "Overalls (Green)",
        "price": 3000,
        "unit": "G",
        "category": "Clothes",
        "notes":
          "Ingredients: 1 Alpaca Yarn (gold coin icon shown), 1 Warm Dye (red/pink), 1 Natural Dye (green)",
      },
      {
        "name": "Overalls (Yellow)",
        "price": 15000,
        "unit": "G",
        "category": "Clothes",
        "notes":
          "Ingredients: 2 Alpaca Yarn+ (gold alpaca coin), 2 Noble Dye (purple), 2 Elegant Dye (white/gray), 2 Natural Dye (green)",
      },
      {
        "name": "Stylish Overalls",
        "price": 3000,
        "unit": "G",
        "category": "Clothes",
        "notes":
          "Ingredients: 1 Alpaca Yarn (gold coin icon shown), 1 Warm Dye (red/pink), 1 Natural Dye (green)",
      },
      {
        "name": "Apron Dress (Blue)",
        "price": "6,000",
        "unit": "G",
        "category": "Clothing",
        "notes":
          "Requires 2 Alpaca Yarn (or Brown Alpaca Yarn icon) and 2 Cool Dye (blue)",
      },
      {
        "name": "Apron Dress (Yellow)",
        "price": "6,000",
        "unit": "G",
        "category": "Clothing",
        "notes":
          "Same materials as Apron Dress (Blue) — 2 Alpaca Yarn and 2 Cool Dye (blue) shown",
      },
      {
        "name": "Apron Dress (Green)",
        "price": "6,000",
        "unit": "G",
        "category": "Clothing",
        "notes":
          "Same materials as Apron Dress (Blue) — 2 Alpaca Yarn and 2 Cool Dye (blue) shown",
      },
      {
        "name": "Apron Dress (Pink)",
        "price": "6,000",
        "unit": "G",
        "category": "Clothing",
        "notes":
          "Same materials as Apron Dress (Blue) — 2 Alpaca Yarn and 2 Cool Dye (blue) shown",
      },
      {
        "name": "Stylish Apron Dress",
        "price": "30,000",
        "unit": "G",
        "category": "Clothing",
        "notes":
          "Requires 4 Alpaca Yarn+, 4 Brown Alpaca Yarn+ (gold yarn icons), 4 Natural Dye (green), and 4 Cool Dye (blue)",
      },
      {
        "name": "Mini Chiffon Skirt (Yellow)",
        "price": "3,000",
        "unit": "G",
        "category": "Clothing",
        "notes":
          "Requires 1 Alpaca Yarn (gold coin-yarn icon) and 1 Cool Dye (blue), 1 Warm Dye (red/orange), and 1 Natural Dye (green) — shown as 1 each",
      },
      {
        "name": "Mini Chiffon Skirt (Blue)",
        "price": "3,000",
        "unit": "G",
        "category": "Clothing",
        "notes":
          "Same materials as Mini Chiffon Skirt (Yellow): 1 Alpaca Yarn and 1 each of Cool, Warm, and Natural dyes",
      },
      {
        "name": "Mini Chiffon Skirt (Purple)",
        "price": "3,000",
        "unit": "G",
        "category": "Clothing",
        "notes":
          "Same materials as Mini Chiffon Skirt (Yellow): 1 Alpaca Yarn and 1 each of Cool, Warm, and Natural dyes",
      },
      {
        "name": "Mini Chiffon Skirt (Brown)",
        "price": "3,000",
        "unit": "G",
        "category": "Clothing",
        "notes":
          "Same materials as Mini Chiffon Skirt (Yellow): 1 Alpaca Yarn and 1 each of Cool, Warm, and Natural dyes",
      },
      {
        "name": "Stylish Mini Chiffon Skirt",
        "price": "15,000",
        "unit": "G",
        "category": "Clothing",
        "notes":
          "Requires 2 Alpaca Yarn+ (gold yarn icon) and 2 Noble Dye (purple), 2 Warm Dye (red), and 2 Warm/Natural mixed dye (yellow/brown) — icons show purple, orange, and yellow dye bottles",
      },
      {
        "name": "Casual Sweater (Red)",
        "price": 10000,
        "unit": "G",
        "category": "Clothes",
        "notes": "Requires 3 Alpaca Yarn and 3 Warm Dye (Red)",
      },
      {
        "name": "Casual Sweater (Blue)",
        "price": 10000,
        "unit": "G",
        "category": "Clothes",
        "notes": "Requires 3 Alpaca Yarn and 3 Cool Dye (Blue)",
      },
      {
        "name": "Casual Sweater (Black)",
        "price": 10000,
        "unit": "G",
        "category": "Clothes",
        "notes": "Requires 3 Alpaca Yarn and 3 Noble Dye (Black)",
      },
      {
        "name": "Casual Sweater (White)",
        "price": 10000,
        "unit": "G",
        "category": "Clothes",
        "notes": "Requires 3 Alpaca Yarn and 3 Elegant Dye (White)",
      },
      {
        "name": "Stylish Casual Sweater",
        "price": 50000,
        "unit": "G",
        "category": "Clothes",
        "notes":
          "Requires 6 Alpaca Yarn+ (Gold Alpaca) and 6 Elegant Dye (White) and 6 Noble Dye (Purple) and 6 Cool Dye (Blue) (four items shown)",
      },
      {
        "name": "Festival Attire (Red)",
        "price": 6000,
        "unit": "G",
        "category": "Clothes",
        "notes": "Requires 2 Alpaca Yarn and 2 Warm Dye (Red)",
      },
      {
        "name": "Festival Attire (Yellow)",
        "price": 6000,
        "unit": "G",
        "category": "Clothes",
        "notes":
          "Requires 2 Alpaca Yarn and 2 Warm Dye and Natural Dye (Yellow/Brown) (yellow variant shown)",
      },
      {
        "name": "Festival Attire (Green)",
        "price": 6000,
        "unit": "G",
        "category": "Clothes",
        "notes": "Requires 2 Alpaca Yarn and 2 Natural Dye (Green)",
      },
      {
        "name": "Festival Attire (Blue)",
        "price": 6000,
        "unit": "G",
        "category": "Clothes",
        "notes": "Requires 2 Alpaca Yarn and 2 Cool Dye (Blue)",
      },
      {
        "name": "Stylish Festival Attire",
        "price": 30000,
        "unit": "G",
        "category": "Clothes",
        "notes":
          "Requires 4 Alpaca Yarn+ (Gold Alpaca), 4 Alpaca Yarn (or Gold Brown variation), 4 Noble Dye (Purple) and 4 Elegant Dye (White) — four items shown",
      },
      {
        "name": "Zephyr Town Attire (Blue)",
        "price": 6000,
        "unit": "G",
        "category": "Clothes",
        "notes": "Requires 2 Brown Alpaca Yarn and 2 Cool Dye (Blue)",
      },
      {
        "name": "Zephyr Town Attire (Purple)",
        "price": 6000,
        "unit": "G",
        "category": "Clothes",
        "notes": "Requires 2 Brown Alpaca Yarn and 2 Noble Dye (Purple)",
      },
      {
        "name": "Zephyr Town Attire (Yellow)",
        "price": 6000,
        "unit": "G",
        "category": "Clothes",
        "notes":
          "Requires 2 Brown Alpaca Yarn and 2 Warm Dye and Natural Dye (Yellow/Brown)",
      },
      {
        "name": "Stylish Zephyr Town Attire",
        "price": 30000,
        "unit": "G",
        "category": "Clothes",
        "notes":
          "Requires 4 Brown Alpaca Yarn+ (Gold Brown Alpaca), 4 Alpaca Yarn+ (Gold Alpaca), 4 Natural Dye (Green) and 4 Noble Dye (Purple) (four items shown)",
      },
      {
        "name": "Glossy Jacket (Brown)",
        "price": 10000,
        "unit": "G",
        "category": "Clothes",
        "notes":
          "Items: Brown Alpaca Yarn x3, Warm Dye (Red/Pink) x3, Natural Dye (Green) x3",
      },
      {
        "name": "Glossy Jacket (Blue)",
        "price": 10000,
        "unit": "G",
        "category": "Clothes",
        "notes":
          "Items: Alpaca Yarn x3, Alpaca Yarn+ (Gold Alpaca) x3, Cool Dye (Blue) x3",
      },
      {
        "name": "Glossy Jacket (Red)",
        "price": 10000,
        "unit": "G",
        "category": "Clothes",
        "notes":
          "Items: Alpaca Yarn x3, Alpaca Yarn+ (Gold Alpaca) x3, Warm Dye (Red/Pink) x3",
      },
      {
        "name": "Glossy Jacket (Black)",
        "price": 10000,
        "unit": "G",
        "category": "Clothes",
        "notes":
          "Items: Alpaca Yarn x3, Alpaca Yarn+ (Gold Alpaca) x3, Noble Dye (Purple/Black) x3",
      },
      {
        "name": "Stylish Glossy Jacket",
        "price": 50000,
        "unit": "G",
        "category": "Clothes",
        "notes":
          "Items: Brown Alpaca Yarn+ (Gold Brown Alpaca) x6, Alpaca Yarn+ (Gold Alpaca) x6, Elegant Dye (White/Gray) x6, Cool Dye (Blue) x6",
      },
      {
        "name": "Peacoat (Blue)",
        "price": 10000,
        "unit": "G",
        "category": "Clothes",
        "notes": "Items: Alpaca Yarn x3, Cool Dye (Blue) x3",
      },
      {
        "name": "Peacoat (Green)",
        "price": 10000,
        "unit": "G",
        "category": "Clothes",
        "notes": "Items: Alpaca Yarn x3, Natural Dye (Green) x3",
      },
      {
        "name": "Peacoat (White)",
        "price": 10000,
        "unit": "G",
        "category": "Clothes",
        "notes": "Items: Alpaca Yarn x3, Elegant Dye (White/Gray) x3",
      },
      {
        "name": "Stylish Peacoat",
        "price": 50000,
        "unit": "G",
        "category": "Clothes",
        "notes":
          "Items: Alpaca Yarn+ (Gold Alpaca) x6, Brown Alpaca Yarn+ (Gold Brown Alpaca) x6, Noble Dye (Purple/Black) x6",
      },
      {
        "name": "Sweater & Tights (Gray)",
        "price": 10000,
        "unit": "G",
        "category": "Clothes",
        "notes": "Items: Woolen Yarn x3, Elegant Dye (White/Gray) x3",
      },
      {
        "name": "Sweater & Tights (Blue)",
        "price": 10000,
        "unit": "G",
        "category": "Clothes",
        "notes": "Items: Woolen Yarn x3, Cool Dye (Blue) x3",
      },
      {
        "name": "Sweater & Tights (Pink)",
        "price": 10000,
        "unit": "G",
        "category": "Clothes",
        "notes": "Items: Woolen Yarn x3, Warm Dye (Red/Pink) x3",
      },
      {
        "name": "Sweater & Tights (Green)",
        "price": 10000,
        "unit": "G",
        "category": "Clothes",
        "notes": "Items: Woolen Yarn x3, Natural Dye (Green) x3",
      },
      {
        "name": "Stylish Sweater & Tights",
        "price": 50000,
        "unit": "G",
        "category": "Clothes",
        "notes":
          "Items: Woolen Yarn+ (Gold Sheep) x6, Alpaca Yarn+ (Gold Alpaca) x6, Elegant Dye (White/Gray) x6, Noble Dye (Purple/Black) x6",
      },
    ],
  },
  {
    name: "Joy's Stall",
    description: "Sell giftboxes.",
    items: [
      {
        "name": "Blue Giftbox",
        "price": 140,
        "unit": "G",
        "category": "Decoration",
      },
      {
        "name": "Red Giftbox",
        "price": 140,
        "unit": "G",
        "category": "Decoration",
      },
      {
        "name": "Yellow Giftbox",
        "price": 140,
        "unit": "G",
        "category": "Decoration",
      },
    ],
  },
];
