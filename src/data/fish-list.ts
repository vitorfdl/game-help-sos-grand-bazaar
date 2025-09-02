// fish-list.ts

// Enums for structured, typo-safe fields
export enum FishSize {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
  Guardian = "Guardian",
  Unknown = "Unknown",
}

export enum Season {
  Spring = "Spring",
  Summer = "Summer",
  Autumn = "Autumn",
  Winter = "Winter",
  AllYearRound = "All-Year Round",
}

export enum Weather {
  Any = "Any",
  Sunny = "Sunny",
  Cloudy = "Cloudy",
  NonSunny = "Non-sunny",
  NonCloudy = "Non-cloudy",
  NonStormy = "Non-Stormy Weather",
  Raining = "Raining",
  LightSnow = "Light Snow",
  Night = "Night",
  Unknown = "Unknown",
}

// Interface for a fish entry in the list JSON
export interface FishEntry {
  fish: string;
  size: FishSize;
  season: Season[]; // multiple seasons possible
  weather: Weather[]; // one or more weather conditions/modifiers
  locations: string[]; // one or more human-readable locations
  baseValue?: number | null; // null/undefined if unknown
}

// The fish list data, corrected for typos in the source table:
// - "Cloduy" -> "Cloudy"
// - Standardized bullets and separators
export const fishList: FishEntry[] = [
  {
    fish: "Amur Minnow",
    size: FishSize.Small,
    season: [Season.Spring, Season.Autumn, Season.Winter],
    weather: [Weather.NonCloudy],
    locations: ["Zephyr Town", "Mountains"],
    baseValue: 40,
  },
  {
    fish: "Basa",
    size: FishSize.Large,
    season: [Season.AllYearRound],
    weather: [Weather.Any],
    locations: ["Mountains"],
    baseValue: 250,
  },
  {
    fish: "Bighead Carp",
    size: FishSize.Large,
    season: [Season.AllYearRound],
    weather: [Weather.Any],
    locations: ["Zephyr Town"],
    baseValue: 350,
  },
  {
    fish: "Bitterling",
    size: FishSize.Small,
    season: [Season.Spring],
    weather: [Weather.Any],
    locations: ["Zephyr Town", "Mountains"],
    baseValue: 54,
  },
  {
    fish: "Black Bass",
    size: FishSize.Medium,
    season: [Season.Spring, Season.Summer, Season.Winter],
    weather: [Weather.NonSunny],
    locations: ["Mountains"],
    baseValue: 280,
  },
  {
    fish: "Bluegill",
    size: FishSize.Small,
    season: [Season.AllYearRound],
    weather: [Weather.NonSunny],
    locations: ["Zephyr Town"],
    baseValue: 90,
  },
  {
    fish: "Brown Trout",
    size: FishSize.Medium,
    season: [Season.Spring, Season.Summer, Season.Autumn],
    weather: [Weather.Any],
    locations: ["Pond by Kagetsu's House in the Mountains"],
    baseValue: 265,
  },
  {
    fish: "Dace",
    size: FishSize.Medium,
    season: [Season.AllYearRound],
    weather: [Weather.Any],
    locations: ["North Pond east of Mayor's House"],
    baseValue: 100,
  },
  {
    fish: "Dark Chub",
    size: FishSize.Small,
    season: [Season.Spring, Season.Summer],
    weather: [Weather.Any],
    locations: ["Zephyr Town"],
    baseValue: 50,
  },
  {
    fish: "Goldfish",
    size: FishSize.Small,
    season: [Season.Spring, Season.Winter],
    weather: [Weather.Any],
    locations: ["Southeast Zephyr Town Pond"],
    baseValue: 122,
  },
  {
    fish: "Grayling",
    size: FishSize.Medium,
    season: [Season.Spring, Season.Summer],
    weather: [Weather.NonStormy],
    locations: ["Pond by Kagetsu's House in the Mountains"],
    baseValue: 255,
  },
  {
    fish: "Killifish",
    size: FishSize.Small,
    season: [Season.Summer, Season.Autumn],
    weather: [Weather.Sunny, Weather.Cloudy],
    locations: ["Mountains"],
    baseValue: 102,
  },
  {
    fish: "Loach",
    size: FishSize.Small,
    season: [Season.Spring, Season.Summer],
    weather: [Weather.Any],
    locations: ["Mountains"],
    baseValue: 66,
  },
  {
    fish: "Yellow Perch",
    size: FishSize.Large,
    season: [Season.Summer, Season.Autumn],
    weather: [Weather.Any],
    locations: ["Pond by Kagetsu's House in the Mountains"],
    baseValue: 380,
  },
  {
    fish: "Nile Perch",
    size: FishSize.Large,
    season: [Season.Summer, Season.Autumn],
    weather: [Weather.Any],
    locations: ["Pond by Kagetsu's House in the Mountains"],
    baseValue: 380,
  },
  {
    fish: "Pale Chub",
    size: FishSize.Small,
    season: [Season.AllYearRound],
    weather: [Weather.Any],
    locations: ["Zephyr Town", "Mountains"],
    baseValue: 42,
  },
  {
    fish: "Rainbow Trout",
    size: FishSize.Medium,
    season: [Season.Spring, Season.Summer, Season.Autumn],
    weather: [Weather.Any],
    locations: [
      "Southeast Zephyr Town Pond",
      "Pond by Kagetsu's House in the Mountains",
    ],
    baseValue: 120,
  },
  {
    fish: "Sculpin",
    size: FishSize.Small,
    season: [Season.Summer, Season.Autumn, Season.Winter],
    weather: [Weather.Any],
    locations: ["Zephyr Town"],
    baseValue: 45,
  },
  {
    fish: "Silver Carp",
    size: FishSize.Large,
    season: [Season.AllYearRound],
    weather: [Weather.Any],
    locations: ["Zephyr Town", "Mountains"],
    baseValue: 200,
  },
  {
    fish: "Stone Moroko",
    size: FishSize.Small,
    season: [Season.Spring, Season.Autumn, Season.Winter],
    weather: [Weather.Any],
    locations: ["Bazaar Pond"],
    baseValue: 105,
  },
  {
    fish: "Sweetfish",
    size: FishSize.Small,
    season: [Season.Summer, Season.Autumn],
    weather: [Weather.Any],
    locations: ["Zephyr Town", "Mountains"],
    baseValue: 120,
  },
  {
    fish: "Tamoroko",
    size: FishSize.Small,
    season: [Season.Spring],
    weather: [Weather.Any],
    locations: ["Zephyr Town", "Bazaar Pond"],
    baseValue: 60,
  },
  {
    fish: "Three-Lips Carp",
    size: FishSize.Medium,
    season: [Season.Summer],
    weather: [Weather.Any],
    locations: ["Zephyr Town"],
    baseValue: 312,
  },
  {
    fish: "Grass Carp",
    size: FishSize.Guardian,
    season: [Season.Summer, Season.Autumn],
    weather: [Weather.Any],
    locations: ["Pond at middle of Zephyr Town"],
    baseValue: null,
  },
  {
    fish: "Koi",
    size: FishSize.Unknown,
    season: [Season.Winter],
    weather: [Weather.Sunny, Weather.LightSnow],
    locations: ["Zephyr Town"],
    baseValue: null,
  },
  {
    fish: "Snakehead",
    size: FishSize.Unknown,
    season: [Season.Spring, Season.Autumn, Season.Winter],
    weather: [Weather.Sunny, Weather.Cloudy],
    locations: ["Town"],
    baseValue: null,
  },
  {
    fish: "Dark Sleeper",
    size: FishSize.Unknown,
    season: [Season.Autumn, Season.Winter],
    weather: [Weather.Night],
    locations: ["Equestrian Park"],
    baseValue: null,
  },
];

// Example type for the JSON as a whole
export interface FishListJson {
  fish: FishEntry[];
}

// Example exported constant shaped like FishListJson
export const fishListJson: FishListJson = {
  fish: fishList,
};
