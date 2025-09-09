import {
	ChefHat,
	Clock,
	DollarSign,
	Info,
	MapPin,
	Sparkles,
	Utensils,
	Zap,
} from "lucide-react";
import { useState } from "react";
import { type RecipeItem, recipes } from "@/data/recipes";
import { type WindmillItem, windmills } from "@/data/windmills";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "./ui/badge";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "./ui/drawer";
import { Separator } from "./ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { WindmillIcon } from "./Windmills";

type ItemData = RecipeItem | WindmillItem;
type ItemType = "recipe" | "windmill";

interface ItemDisplayProps {
	itemName: string;
	variant?: "favorite" | "love" | "like" | "dislike";
	className?: string;
	/** Optional small badge label shown before the item name */
	chipLabel?: string;
}

function findItemData(itemName: string): {
	data: ItemData | null;
	type: ItemType | null;
} {
	// Search in recipes
	const recipe = recipes.find((r) => r.dish === itemName);
	if (recipe) {
		return { data: recipe, type: "recipe" };
	}

	// Search in windmills
	for (const windmill of windmills) {
		for (const section of windmill.sections) {
			const windmillItem = section.items.find((item) => item.name === itemName);
			if (windmillItem) {
				return { data: windmillItem, type: "windmill" };
			}
		}
	}

	return { data: null, type: null };
}

function getVariantStyles(variant: "favorite" | "love" | "like" | "dislike") {
	switch (variant) {
		case "favorite":
			return "bg-emerald-500/15 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/25 shadow-sm";
		case "love":
			return "bg-purple-500/8 text-purple-200 border-purple-500/25 hover:bg-purple-500/15 shadow-sm";
		case "like":
			return "bg-blue-500/8 text-blue-200 border-blue-500/25 hover:bg-blue-500/15 shadow-sm";
		case "dislike":
			return "bg-rose-500/8 text-rose-200 border-rose-500/25 hover:bg-rose-500/15 shadow-sm";
		default:
			return "bg-secondary hover:bg-accent border-border shadow-sm";
	}
}

function formatPrice(price: number | string | null | undefined): string {
	if (price === null || price === undefined) return "N/A";
	if (typeof price === "number") return `${price}G`;
	return price;
}

function ItemDetails({ item, type }: { item: ItemData; type: ItemType }) {
	const isRecipe = type === "recipe";
	const recipe = isRecipe ? (item as RecipeItem) : null;
	const windmillItem = !isRecipe ? (item as WindmillItem) : null;

	return (
		<div className="space-y-4">
			{/* Header */}
			<div className="flex items-center gap-3">
				<div className="p-2 rounded-lg bg-gradient-to-br from-[var(--chart-2)]/20 via-[var(--chart-1)]/20 to-[var(--chart-3)]/20">
					{isRecipe ? (
						<ChefHat className="h-5 w-5 text-[var(--chart-2)]" />
					) : (
						<WindmillIcon color="var(--chart-2)" className="h-5 w-5" />
					)}
				</div>
				<div>
					<h3 className="font-semibold text-lg text-foreground">
						{isRecipe ? recipe?.dish : windmillItem?.name}
					</h3>
					{recipe?.type && (
						<Badge variant="secondary" className="text-xs">
							{recipe.type}
						</Badge>
					)}
				</div>
			</div>

			<Separator />

			{/* Recipe Details */}
			{isRecipe && recipe && (
				<div className="space-y-3">
					{recipe.recipe && recipe.recipe.length > 0 && (
						<div>
							<div className="flex items-center gap-2 mb-2">
								<Utensils className="h-4 w-4 text-muted-foreground" />
								<span className="font-medium text-sm text-foreground">
									Recipe
								</span>
							</div>
							<div className="space-y-1">
								{recipe.recipe.map((ingredient) => (
									<p
										key={
											typeof ingredient === "string"
												? ingredient
												: JSON.stringify(ingredient)
										}
										className="text-sm text-foreground bg-muted/50 p-2 rounded"
									>
										{ingredient}
									</p>
								))}
							</div>
						</div>
					)}

					{recipe.salesPrice && (
						<div className="flex items-center gap-2">
							<DollarSign className="h-4 w-4 text-muted-foreground" />
							<span className="font-medium text-sm text-foreground">
								Price:
							</span>
							<span className="text-sm font-mono text-foreground">
								{formatPrice(recipe.salesPrice)}
							</span>
						</div>
					)}

					{recipe.whereToGet && (
						<div className="flex items-center gap-2">
							<MapPin className="h-4 w-4 text-muted-foreground" />
							<span className="font-medium text-sm text-foreground">
								Where to get:
							</span>
							<span className="text-sm text-foreground">
								{recipe.whereToGet}
							</span>
						</div>
					)}

					{recipe.utensils && recipe.utensils.length > 0 && (
						<div>
							<div className="flex items-center gap-2 mb-2">
								<Utensils className="h-4 w-4 text-muted-foreground" />
								<span className="font-medium text-sm text-foreground">
									Utensils
								</span>
							</div>
							<div className="flex flex-wrap gap-1">
								{recipe.utensils.map((utensil) => (
									<Badge key={utensil} variant="outline" className="text-xs">
										{utensil}
									</Badge>
								))}
							</div>
						</div>
					)}

					{recipe.effect && (
						<div className="flex items-center gap-2">
							<Sparkles className="h-4 w-4 text-muted-foreground" />
							<span className="font-medium text-sm text-foreground">
								Effect:
							</span>
							<span className="text-sm text-foreground">{recipe.effect}</span>
						</div>
					)}

					{recipe.adaptOptions && recipe.adaptOptions.length > 0 && (
						<div>
							<div className="flex items-center gap-2 mb-2">
								<Zap className="h-4 w-4 text-muted-foreground" />
								<span className="font-medium text-sm text-foreground">
									Adapt Options
								</span>
							</div>
							<div className="flex flex-wrap gap-1">
								{recipe.adaptOptions.map((option) => (
									<Badge key={option} variant="secondary" className="text-xs">
										{option}
									</Badge>
								))}
							</div>
						</div>
					)}
				</div>
			)}

			{/* Windmill Item Details */}
			{!isRecipe && windmillItem && (
				<div className="space-y-3">
					{windmillItem.recipe && windmillItem.recipe.length > 0 && (
						<div>
							<div className="flex items-center gap-2 mb-2">
								<Utensils className="h-4 w-4 text-muted-foreground" />
								<span className="font-medium text-sm text-foreground">
									Recipe
								</span>
							</div>
							<div className="space-y-1">
								{windmillItem.recipe.map((ingredient) => (
									<p
										key={
											typeof ingredient === "string"
												? ingredient
												: JSON.stringify(ingredient)
										}
										className="text-sm text-foreground bg-muted/50 p-2 rounded"
									>
										{typeof ingredient === "string"
											? ingredient
											: `${ingredient.oneOf.join(" OR ")}`}
									</p>
								))}
							</div>
						</div>
					)}

					{windmillItem.sellPrice && (
						<div className="flex items-center gap-2">
							<DollarSign className="h-4 w-4 text-muted-foreground" />
							<span className="font-medium text-sm text-foreground">
								Price:
							</span>
							<span className="text-sm font-mono text-foreground">
								{windmillItem.sellPrice}
							</span>
						</div>
					)}

					{windmillItem.processTime && (
						<div className="flex items-center gap-2">
							<Clock className="h-4 w-4 text-muted-foreground" />
							<span className="font-medium text-sm text-foreground">
								Process Time:
							</span>
							<span className="text-sm text-foreground">
								{windmillItem.processTime}
							</span>
						</div>
					)}

					{windmillItem.harvestTime && (
						<div className="flex items-center gap-2">
							<Clock className="h-4 w-4 text-muted-foreground" />
							<span className="font-medium text-sm text-foreground">
								Harvest Time:
							</span>
							<span className="text-sm text-foreground">
								{windmillItem.harvestTime}
							</span>
						</div>
					)}

					{windmillItem.info && (
						<div className="flex items-start gap-2">
							<Info className="h-4 w-4 text-muted-foreground mt-0.5" />
							<div>
								<span className="font-medium text-sm text-foreground">
									Info:
								</span>
								<p className="text-sm text-foreground mt-1">
									{windmillItem.info}
								</p>
							</div>
						</div>
					)}

					{windmillItem.unique && (
						<Badge variant="secondary" className="text-xs">
							<Sparkles className="h-3 w-3 mr-1" />
							Unique Item
						</Badge>
					)}
				</div>
			)}
		</div>
	);
}

export default function ItemDisplay({
	itemName,
	variant = "like",
	className = "",
	chipLabel,
}: ItemDisplayProps) {
	const isMobile = useIsMobile();
	const [drawerOpen, setDrawerOpen] = useState(false);

	const { data: item, type } = findItemData(itemName);

	if (!item || !type) {
		// Fallback for items not found in data
		if (chipLabel) {
			return (
				<div className="group relative mt-1 flex items-center gap-2 rounded-md border border-emerald-300/50 dark:border-emerald-700/50 bg-emerald-500/10 px-3 py-2">
					<span className="pointer-events-none absolute -top-2 left-2 select-none rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-semibold leading-none text-emerald-50 shadow-sm uppercase tracking-wide">
						{chipLabel}
					</span>
					<span className="text-sm font-medium text-emerald-300">
						{itemName}
					</span>
				</div>
			);
		}
		return (
			<span
				className={`inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm border ${getVariantStyles(
					variant,
				)} ${className}`}
			>
				{itemName}
			</span>
		);
	}

	if (isMobile) {
		return (
			<Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
				<DrawerTrigger asChild>
					{chipLabel ? (
						<button
							type="button"
							className="group relative mt-1 flex items-center gap-2 rounded-md border border-emerald-300/50 dark:border-emerald-700/50 bg-emerald-500/10 px-3 py-2 hover:bg-emerald-500/15 transition-colors"
						>
							<span className="pointer-events-none absolute -top-2 left-2 select-none rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-semibold leading-none text-emerald-50 shadow-sm uppercase tracking-wide">
								{chipLabel}
							</span>
							{type === "windmill" ? (
								<WindmillIcon
									color="currentColor"
									className="h-4 w-4 text-emerald-300"
								/>
							) : (
								<ChefHat className="h-4 w-4 text-emerald-300" />
							)}
							<span className="text-sm font-medium text-emerald-300">
								{itemName}
							</span>
						</button>
					) : (
						<button
							type="button"
							className={`inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm border transition-colors ${getVariantStyles(
								variant,
							)} ${className}`}
						>
							{type === "windmill" ? (
								<WindmillIcon color="currentColor" className="h-4 w-4" />
							) : (
								<ChefHat className="h-4 w-4" />
							)}
							{itemName}
						</button>
					)}
				</DrawerTrigger>
				<DrawerContent className="max-h-[80vh]">
					<DrawerHeader>
						<DrawerTitle>Item Details</DrawerTitle>
					</DrawerHeader>
					<div className="px-4 pb-4 overflow-y-auto">
						<ItemDetails item={item} type={type} />
					</div>
				</DrawerContent>
			</Drawer>
		);
	}

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				{chipLabel ? (
					<button
						type="button"
						className="group relative mt-1 flex items-center gap-2 rounded-md border border-emerald-300/50 dark:border-emerald-700/50 bg-emerald-500/10 px-3 py-2 hover:bg-emerald-500/15 transition-colors"
					>
						<span className="pointer-events-none absolute -top-2 left-2 select-none rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-semibold leading-none text-emerald-50 shadow-sm uppercase tracking-wide">
							{chipLabel}
						</span>
						{type === "windmill" ? (
							<WindmillIcon
								color="currentColor"
								className="h-4 w-4 text-emerald-300"
							/>
						) : (
							<ChefHat className="h-4 w-4 text-emerald-300" />
						)}
						<span className="text-sm font-medium text-emerald-300">
							{itemName}
						</span>
					</button>
				) : (
					<button
						type="button"
						className={`inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm border transition-colors ${getVariantStyles(
							variant,
						)} ${className}`}
					>
						{type === "windmill" ? (
							<WindmillIcon color="currentColor" className="h-4 w-4" />
						) : (
							<ChefHat className="h-4 w-4" />
						)}
						{itemName}
					</button>
				)}
			</TooltipTrigger>
			<TooltipContent
				side="top"
				className="max-w-sm p-0 bg-background border shadow-xl"
				sideOffset={8}
			>
				<div className="p-4 text-foreground">
					<ItemDetails item={item} type={type} />
				</div>
			</TooltipContent>
		</Tooltip>
	);
}
