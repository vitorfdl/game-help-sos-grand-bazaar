export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter'

export interface Festival { day: number; title: string }

export interface SeasonFestivals {
  season: Season
  days: number
  base: Festival[]
  extraFromYear2?: Festival[]
}

const DAYS = 31

export const seasonsFestivals: SeasonFestivals[] = [
  {
    season: 'Spring',
    days: DAYS,
    base: [
      { day: 11, title: 'Flower Festival' },
      { day: 12, title: 'Flower Festival' },
      { day: 21, title: 'Honey Day' },
      { day: 27, title: 'Tea Party' },
    ],
    extraFromYear2: [
      { day: 26, title: 'Crops Show' },
    ],
  },
  {
    season: 'Summer',
    days: DAYS,
    base: [
      { day: 3, title: 'Pet Show' },
      { day: 11, title: 'Animal Show' },
      { day: 16, title: 'Horse Derby' },
      { day: 21, title: 'Crops Show' },
      { day: 28, title: 'Horse Race' },
    ],
  },
  {
    season: 'Autumn',
    days: DAYS,
    base: [
      { day: 4, title: 'Cook off' },
      { day: 5, title: 'Bake off' },
      { day: 15, title: 'Animal Show' },
      { day: 21, title: 'Juice Festival' },
      { day: 25, title: 'Crops Show' },
      { day: 28, title: 'Pumpkin Festival' },
    ],
  },
  {
    season: 'Winter',
    days: DAYS,
    base: [
      { day: 4, title: 'Pet Show' },
      { day: 9, title: 'Hearth Day' },
      { day: 12, title: 'Animal Show' },
      { day: 17, title: 'Horse Derby' },
      { day: 22, title: 'Crops Show' },
      { day: 25, title: 'Starlight Night' },
      { day: 31, title: 'New Year Countdown' },
    ],
  },
]

export function festivalsFor(year: number, season: Season): { days: number; events: Festival[] } {
  const def = seasonsFestivals.find((s) => s.season === season)!
  const wrap = (day: number) => {
    let d = day
    while (d > def.days) d -= def.days
    while (d < 1) d += def.days
    return d
  }

  // Weekday shift per year: each year adds 5 weekdays forward
  const yearShift = ((year - 1) * ((4 * 31) % 7)) % 7 // 5 per full year
  const deltaFromYear1 = (7 - yearShift) % 7 // how many days to add to keep same weekday as Year 1

  // For extras that start in Year 2, compute delta relative to Year 2's delta
  const year2Shift = ((2 - 1) * ((4 * 31) % 7)) % 7 // =5
  const deltaFromYear2 = (7 - year2Shift) % 7 // =2

  const shiftedBase = def.base.map((f) => ({ day: wrap(f.day + deltaFromYear1), title: f.title }))
  const shiftedExtra = year >= 2 && def.extraFromYear2
    ? def.extraFromYear2.map((f) => ({ day: wrap(f.day + ((deltaFromYear1 - deltaFromYear2 + 7) % 7)), title: f.title }))
    : []

  return { days: def.days, events: [...shiftedBase, ...shiftedExtra] }
}

// Birthdays are defined in residents data and joined in the Calendar component.


