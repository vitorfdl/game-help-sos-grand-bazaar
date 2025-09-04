export type Season = "Spring" | "Summer" | "Autumn" | "Winter";

// Omitting both closeAt and endAt is considered an all-day event
export interface Festival {
  day: number;
  title: string;
  notes?: string;

  // Time which the event can be started
  openAt: string;

  // Time which the events ends and is no longer available
  closeAt?: string;

  // Time which the events ends after being started
  endAt?: string;
}

export interface SeasonFestivals {
  season: Season;
  days: number;
  base: Festival[];
  extraFromYear2?: Festival[];
}

const DAYS = 31;

// Centralized festival definitions with all details
const FESTIVAL_DEFINITIONS: { [key: string]: Omit<Festival, "day"> } = {
  "Flower Festival": {
    title: "Flower Festival",
    openAt: "12:00 PM until the next day",
    notes:
      "Give flowers to as many townsfolk as possible. Winner gets a trophy. Festival ends at noon on Wednesday.",
  },
  "Honey Day": {
    title: "Honey Day",
    openAt: "12:00 PM",
    notes:
      "Give honey or honey cake to villagers for friendship points. Honey counts as unique gift, allowing additional gifts.",
  },
  "Tea Party": {
    title: "Tea Party",
    openAt: "12:00 PM",
    closeAt: "4:00 PM",
    notes:
      "Bring any type of tea (leaves, cans, or cooked tea) to receive a gift in return. Skips time to 4pm.",
  },
  "Crops Show": {
    title: "Crops Show",
    openAt: "12:00 PM",
    closeAt: "4:00 PM",
    notes:
      "Enter your best harvested crop. Giant crops of highest quality win. Fresh crops only. Three tiers per crop type.",
  },
  "Pet Show": {
    title: "Pet Show",
    openAt: "12:00 PM",
    closeAt: "4:00 PM",
    notes:
      "Press command buttons in order to direct your pet. Success depends on pet bond level. Trophy for first place.",
  },
  "Animal Show": {
    title: "Animal Show",
    openAt: "12:00 PM",
    closeAt: "4:00 PM",
    notes:
      "Enter your barn animal with highest bond. Winning buffs all animals of that type and unlocks higher quality items.",
  },
  "Horse Derby": {
    title: "Horse Derby",
    openAt: "12:00 PM",
    closeAt: "4:00 PM",
    notes:
      "Race your horse through obstacles while collecting carrots for stamina. High bond required for higher tiers.",
  },
  "Cook off": {
    title: "Cook off",
    openAt: "12:00 PM",
    closeAt: "4:00 PM",
    notes:
      "Make the most complicated dish with multiple ingredients and cooking tiers. Add unique ingredients for victory.",
  },
  "Bake off": {
    title: "Bake off",
    openAt: "12:00 PM",
    closeAt: "4:00 PM",
    notes:
      "Make the most complicated baked dish with multiple ingredients and cooking tiers. Add unique ingredients for victory.",
  },
  "Juice Festival": {
    title: "Juice Festival",
    openAt: "12:00 PM",
    closeAt: "4:00 PM",
    notes:
      "Bring any type of juice to receive a gift in return. Free friendship points with all town members.",
  },
  "Pumpkin Festival": {
    title: "Pumpkin Festival",
    openAt: "12:00 PM",
    closeAt: "4:00 PM",
    notes:
      "Give treats to children visiting your home. Cookies (Egg + Wheat Flour) are simple treats. Stay at farm in afternoon.",
  },
  "Hearth Day": {
    title: "Hearth Day",
    openAt: "9:00 AM",
    closeAt: "4:00 PM",
    notes:
      "Give warm recipes to any person in town. Acts as special gift allowing additional normal gifts. Herb Soup recommended.",
  },
  "Starlight Night": {
    title: "Starlight Night",
    openAt: "6:00 PM",
    closeAt: "11:59 PM",
    notes:
      "Go on a date with romanceable character. Accept invitation day before. Cutscene brings you closer and gives heart points.",
  },
  "New Year Countdown": {
    title: "New Year Countdown",
    openAt: "10:00 PM",
    closeAt: "12:00 AM",
    notes:
      "Meet everyone at town plaza for countdown cutscene. Starts the next year. Goes straight to bed after.",
  },
};

// Helper function to create a festival with a specific day
function createFestival(day: number, festivalKey: string): Festival {
  const definition = FESTIVAL_DEFINITIONS[festivalKey];
  if (!definition) {
    throw new Error(`Festival definition not found for: ${festivalKey}`);
  }
  return {
    day,
    ...definition,
  };
}

export const seasonsFestivals: SeasonFestivals[] = [
  {
    season: "Spring",
    days: DAYS,
    base: [
      createFestival(11, "Flower Festival"),
      createFestival(12, "Flower Festival"),
      createFestival(21, "Honey Day"),
      createFestival(27, "Tea Party"),
    ],
    extraFromYear2: [
      createFestival(26, "Crops Show"),
    ],
  },
  {
    season: "Summer",
    days: DAYS,
    base: [
      createFestival(3, "Pet Show"),
      createFestival(11, "Animal Show"),
      createFestival(16, "Horse Derby"),
      createFestival(21, "Crops Show"),
    ],
  },
  {
    season: "Autumn",
    days: DAYS,
    base: [
      createFestival(4, "Cook off"),
      createFestival(5, "Bake off"),
      createFestival(15, "Animal Show"),
      createFestival(21, "Juice Festival"),
      createFestival(25, "Crops Show"),
      createFestival(28, "Pumpkin Festival"),
    ],
  },
  {
    season: "Winter",
    days: DAYS,
    base: [
      createFestival(4, "Pet Show"),
      createFestival(9, "Hearth Day"),
      createFestival(12, "Animal Show"),
      createFestival(17, "Horse Derby"),
      createFestival(22, "Crops Show"),
      createFestival(25, "Starlight Night"),
      createFestival(31, "New Year Countdown"),
    ],
  },
];

export function festivalsFor(
  year: number,
  season: Season,
): { days: number; events: Festival[] } {
  const def = seasonsFestivals.find((s) => s.season === season)!;
  const wrap = (day: number) => {
    let d = day;
    while (d > def.days) d -= def.days;
    while (d < 1) d += def.days;
    return d;
  };

  // Weekday shift per year: each year adds 5 weekdays forward
  const yearShift = ((year - 1) * ((4 * 31) % 7)) % 7; // 5 per full year
  const deltaFromYear1 = (7 - yearShift) % 7; // how many days to add to keep same weekday as Year 1

  // For extras that start in Year 2, compute delta relative to Year 2's delta
  const year2Shift = ((2 - 1) * ((4 * 31) % 7)) % 7; // =5
  const deltaFromYear2 = (7 - year2Shift) % 7; // =2

  const shiftedBase = def.base.map((f) => ({
    ...f,
    day: wrap(f.day + deltaFromYear1),
  }));
  const shiftedExtra = year >= 2 && def.extraFromYear2
    ? def.extraFromYear2.map((f) => ({
      ...f,
      day: wrap(f.day + ((deltaFromYear1 - deltaFromYear2 + 7) % 7)),
    }))
    : [];

  return { days: def.days, events: [...shiftedBase, ...shiftedExtra] };
}

// Birthdays are defined in residents data and joined in the Calendar component.
