export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter'


export type BazaarRank = 1 | 2 | 3 | 4

export type RecipeIngredientGroup = {
  options: string[]
  quantity?: number
}

export type RecipeItem = {
  dish: string
  type?: "Main Dish" | "Side Dish" | "Dessert" | "Drink" | "Other"
  bazaarRank: BazaarRank | null
  recipeDisplay: string
  ingredients?: RecipeIngredientGroup[]
  salesPrice: number | null
  effect?: string | null
  whereToGet?: string | null
  utensils?: string[] | null
  adaptOptions?: string[] | null
}


