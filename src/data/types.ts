export type Season = "Spring" | "Summer" | "Autumn" | "Winter";

export type BazaarRank = 1 | 2 | 3 | 4;

export type RecipeIngredientGroup = {
	options: string[];
	quantity?: number;
};

export type RecipeItem = {
	dish: string;
	type?:
		| "Main Dish"
		| "Sides"
		| "Dessert"
		| "Soup"
		| "Salads"
		| "Other"
		| "Other (Juice)"
		| "Other (Tea)";
	recipe: string[];
	ingredients?: RecipeIngredientGroup[];
	salesPrice: number | null;
	effect?: string | null;
	whereToGet?: string | null;
	utensils?: ("Cooking Pot" | "Oven" | "Pan")[] | null;
	adaptOptions?: string[] | null;
};
