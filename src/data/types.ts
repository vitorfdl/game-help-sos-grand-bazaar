export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter'


export type BazaarRank = 1 | 2 | 3 | 4

export type RecipeIngredientGroup = {
  options: string[]
  quantity?: number
}

export type RecipeItem = {
  dish: string
  bazaarRank: BazaarRank | null
  recipeDisplay: string
  ingredients?: RecipeIngredientGroup[]
  salesPrice: number | null
  utensils?: string[] | null
  whereToGet?: string | null
  adaptOptions?: string[] | null
}


