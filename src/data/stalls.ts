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
    name: "Lloyd's Stall",
    description: "Sells ores.",
    items: [
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
        category: "Expansion",
        notes: "Increases bag to 24 items. Completed instantly.",
      },
      {
        name: "Storage Expansion",
        price: 5000,
        unit: "G",
        category: "Expansion",
        notes: "Increases storage to 48 items. Takes 1 day.",
      },
      {
        name: "Field Expansion",
        price: 20000,
        unit: "G",
        category: "Expansion",
        notes: "Creates a second field. Takes 2 days.",
      },
      {
        name: "Extra Field Expansion",
        price: 100000,
        unit: "G",
        category: "Expansion",
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
        name: "Bigger Bag Expansion",
        price: 30000,
        unit: "G",
        category: "Expansion",
        notes: "Increases bag to 32 items. Completed instantly.",
      },
      {
        name: "Minor Storage Expansion",
        price: 20000,
        unit: "G",
        category: "Expansion",
        notes: "Increases storage to 72 items. Takes 1 day.",
      },
      {
        name: "Small Storage Expansion",
        price: 40000,
        unit: "G",
        category: "Expansion",
        notes: "Increases storage to 96 items. Takes 1 day.",
      },
      {
        name: "Modest Storage Expansion",
        price: 80000,
        unit: "G",
        category: "Expansion",
        notes: "Increases storage to 120 items. Takes 1 day.",
      },
      {
        name: "Moderate Storage Expansion",
        price: 100000,
        unit: "G",
        category: "Expansion",
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
        category: "Upgrade",
        notes: "Improves soil for slightly higher quality crops. Takes 2 days.",
      },
      {
        name: "High-Quality Soil",
        price: 100000,
        unit: "G",
        category: "Upgrade",
        notes:
          "Improves soil for significantly higher quality crops. Takes 2 days.",
      },
      {
        name: "Minor Storage Power-Up",
        price: 50000,
        unit: "G",
        category: "Upgrade",
        notes: "Keeps items fresher for longer. Takes 1 day.",
      },
      {
        name: "Decent Storage Power-Up",
        price: 100000,
        unit: "G",
        category: "Upgrade",
        notes: "Keeps items fresher for significantly longer. Takes 1 day.",
      },
      {
        name: "Frying Pan",
        price: 10000,
        unit: "G",
        category: "Tool",
        notes: "Opens up cooking options. Instant.",
      },
      {
        name: "Cooking Pot",
        price: 30000,
        unit: "G",
        category: "Tool",
        notes: "Opens up soup recipes. Instant.",
      },
      {
        name: "Oven",
        price: 50000,
        unit: "G",
        category: "Tool",
        notes: "Opens up dessert recipes. Instant.",
      },
      {
        name: "Bathtub Power-Up",
        price: 112600,
        unit: "G",
        category: "Upgrade",
        notes: "More stamina from baths. Takes 1 day.",
      },
      {
        name: "Extra Barn",
        price: 100000,
        unit: "G",
        category: "Construction",
        notes: "Adds another barn in NE farm area. Takes 3 days.",
      },
    ],
  },
  {
    name: "Ramon's Critters Stall",
    description: "Sells livestock, poultry, and pets.",
    items: [
      { name: "Chick", price: 2000, unit: "G", category: "Animal" },
      { name: "Alpaca", price: 4000, unit: "G", category: "Animal" },
      { name: "Lamb", price: 4000, unit: "G", category: "Animal" },
      { name: "Calf", price: 4000, unit: "G", category: "Animal" },
      {
        name: "Cat",
        price: 6000,
        unit: "G",
        category: "Pet",
        notes: "Herds Chickens (up to 5). Unlock: Summer 5, Year 1.",
      },
      {
        name: "Dog",
        price: 6000,
        unit: "G",
        category: "Pet",
        notes: "Herds Cows & Sheep (up to 5). Unlock: Summer 5, Year 1.",
      },
      {
        name: "Horse",
        price: 0,
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
        category: "Warp",
        notes: "Warp Storage Box",
      },
      {
        name: "Spirit Box: Zephyr Town",
        price: 20000,
        unit: "Energy",
        category: "Warp",
        notes: "Warp Storage Box",
      },
      {
        name: "Spirit Box: Red Windmill",
        price: 5000,
        unit: "Energy",
        category: "Warp",
        notes: "Warp Storage Box",
      },
      {
        name: "Spirit Box: Mountains",
        price: 50000,
        unit: "Energy",
        category: "Warp",
        notes: "Warp Storage Box",
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
];
