import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Info, Search } from "lucide-react";
import { type RecipeItem, recipes as allRecipes } from "@/data/recipes";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  SortableTable,
  type SortColumn,
  type SortDirection,
} from "@/components/ui/sortable-table";
import { CategoryFilter } from "@/components/ui/category-filter";
import { useIsMobile } from "@/hooks/use-mobile";

type RecipeSortColumn =
  | "type"
  | "name"
  | "recipe"
  | "utensils"
  | "whereToGet"
  | "effect"
  | "adaptOptions"
  | "price";

function truncateText(text: string, maxLength: number = 50): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

function getTypeBadgeVariant(type: string) {
  switch (type?.toLowerCase()) {
    case "main dish":
      return "bg-blue-500/20 text-blue-300 border-blue-400/40 font-medium";
    case "dessert":
      return "bg-pink-500/20 text-pink-300 border-pink-400/40 font-medium";
    case "appetizer":
      return "bg-emerald-500/20 text-emerald-300 border-emerald-400/40 font-medium";
    case "beverage":
      return "bg-cyan-500/20 text-cyan-300 border-cyan-400/40 font-medium";
    case "soup":
      return "bg-orange-500/20 text-orange-300 border-orange-400/40 font-medium";
    case "salad":
      return "bg-lime-500/20 text-lime-300 border-lime-400/40 font-medium";
    case "side dish":
      return "bg-yellow-500/20 text-yellow-300 border-yellow-400/40 font-medium";
    case "snack":
      return "bg-violet-500/20 text-violet-300 border-violet-400/40 font-medium";
    default:
      return "bg-slate-500/20 text-slate-300 border-slate-400/40 font-medium";
  }
}

export default function CookingRecipes() {
  const [query, setQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<RecipeSortColumn>("type");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const isMobile = useIsMobile();

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column as RecipeSortColumn);
      setSortDirection("asc");
    }
  };

  // For mobile, we support sorting by name and price
  const mobileSortColumn = isMobile
    ? (sortColumn === "name" || sortColumn === "price" ? sortColumn : "name")
    : sortColumn;
  const mobileSortDirection = sortDirection;

  // Get unique categories from recipes
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    allRecipes.forEach((recipe) => {
      if (recipe.type) {
        uniqueCategories.add(recipe.type);
      }
    });
    return Array.from(uniqueCategories).sort();
  }, []);

  const filtered: RecipeItem[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    let base = allRecipes;

    // Filter by category
    if (selectedCategory !== "all") {
      base = base.filter((r) => r.type === selectedCategory);
    }

    // Filter by search query
    if (q) {
      base = base.filter((r) => {
        const haystack = [r.dish, r.recipe.join(", ")].join(" ").toLowerCase();
        return haystack.includes(q);
      });
    }

    const sorted = [...base];
    const direction = sortDirection === "asc" ? 1 : -1;

    sorted.sort((a, b) => {
      let comparison = 0;

      switch (sortColumn) {
        case "type":
          comparison = a.type?.localeCompare(b.type ?? "") ?? 0;
          break;
        case "name":
          comparison = a.dish.localeCompare(b.dish);
          break;
        case "recipe":
          comparison = a.recipe.join(", ").localeCompare(b.recipe.join(", "));
          break;
        case "utensils":
          const aUtensils = a.utensils?.join(", ") ?? "";
          const bUtensils = b.utensils?.join(", ") ?? "";
          comparison = aUtensils.localeCompare(bUtensils);
          break;
        case "whereToGet":
          const aWhere = a.whereToGet ?? "";
          const bWhere = b.whereToGet ?? "";
          comparison = aWhere.localeCompare(bWhere);
          break;
        case "effect":
          const aEffect = a.effect ?? "";
          const bEffect = b.effect ?? "";
          comparison = aEffect.localeCompare(bEffect);
          break;
        case "adaptOptions":
          const aAdapt = a.adaptOptions?.join(", ") ?? "";
          const bAdapt = b.adaptOptions?.join(", ") ?? "";
          comparison = aAdapt.localeCompare(bAdapt);
          break;
        case "price":
          const aPrice = a.salesPrice ??
            (sortDirection === "asc" ? Infinity : -1);
          const bPrice = b.salesPrice ??
            (sortDirection === "asc" ? Infinity : -1);
          comparison = aPrice - bPrice;
          break;
      }

      return direction * comparison || a.dish.localeCompare(b.dish);
    });

    return sorted;
  }, [query, sortColumn, sortDirection, selectedCategory]);

  const mobileColumns = [
    {
      key: "name",
      label: "Dish",
      className: "min-w-0", // Allow column to shrink
      render: (recipe: RecipeItem) => (
        <div className="space-y-2 min-w-0">
          {/* Header with name and type */}
          <div className="flex items-start gap-2">
            <span className="font-medium text-sm leading-tight">
              {recipe.dish}
            </span>
            {recipe.type && (
              <Badge
                variant="outline"
                className={`text-xs shrink-0 ${
                  getTypeBadgeVariant(recipe.type)
                }`}
              >
                {recipe.type}
              </Badge>
            )}
          </div>

          {/* Recipe ingredients - more compact with better wrapping */}
          <div className="flex flex-wrap gap-1">
            {recipe.recipe.map((ingredient, index) => (
              <Badge key={index} variant="square" className="text-xs">
                {ingredient}
              </Badge>
            ))}
          </div>

          {/* Additional details - more compact layout with better text wrapping */}
          <div className="text-xs text-muted-foreground space-y-1">
            {recipe.whereToGet && (
              <div className="break-words">
                <span className="text-foreground/70 font-medium">Source:</span>
                {" "}
                {truncateText(recipe.whereToGet, 35)}
              </div>
            )}
            {recipe.effect && (
              <div className="break-words">
                <span className="text-foreground/70 font-medium">Effect:</span>
                {" "}
                {truncateText(recipe.effect, 35)}
              </div>
            )}
            {recipe.utensils?.length && (
              <div className="break-words">
                <span className="text-foreground/70 font-medium">
                  Utensils:
                </span>{" "}
                {truncateText(recipe.utensils.join(", "), 40)}
              </div>
            )}
            {recipe.adaptOptions?.length && (
              <div className="break-words">
                <span className="text-foreground/70 font-medium">Adapt:</span>
                {" "}
                {truncateText(recipe.adaptOptions.join(", "), 35)}
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "price",
      label: "Price",
      className: "text-right w-20 shrink-0", // Fixed width for price column
      render: (recipe: RecipeItem) => (
        <div className="text-right">
          {recipe.salesPrice != null
            ? (
              <span className="text-sm font-semibold text-emerald-400 bg-emerald-900/20 px-2 py-1 rounded-md inline-block">
                {recipe.salesPrice} G
              </span>
            )
            : <span className="text-muted-foreground text-sm">—</span>}
        </div>
      ),
    },
  ];

  const desktopColumns = [
    {
      key: "type",
      label: "Type",
      render: (recipe: RecipeItem) => (
        recipe.type
          ? (
            <Badge
              variant="square"
              className={`text-xs ${getTypeBadgeVariant(recipe.type)}`}
            >
              {recipe.type}
            </Badge>
          )
          : <span className="tabular-nums text-muted-foreground">—</span>
      ),
    },
    {
      key: "name",
      label: "Dish",
      render: (recipe: RecipeItem) => (
        <span className="font-medium">{recipe.dish}</span>
      ),
    },
    {
      key: "recipe",
      label: "Recipe",
      render: (recipe: RecipeItem) => (
        <div className="flex flex-wrap gap-1">
          {recipe.recipe.map((ingredient, index) => (
            <Badge key={index} variant="square" className="text-xs">
              {ingredient}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: "utensils",
      label: "Utensils",
      render: (recipe: RecipeItem) => (
        <span>
          {recipe.utensils?.length
            ? recipe.utensils.join(", ")
            : <span className="text-muted-foreground">—</span>}
        </span>
      ),
    },
    {
      key: "whereToGet",
      label: "Where to get",
      render: (recipe: RecipeItem) => (
        <span>
          {recipe.whereToGet ?? (
            <span className="text-muted-foreground">
              —
            </span>
          )}
        </span>
      ),
    },
    {
      key: "effect",
      label: "Effect",
      render: (recipe: RecipeItem) => (
        <span>
          {recipe.effect ?? <span className="text-muted-foreground">—</span>}
        </span>
      ),
    },
    {
      key: "adaptOptions",
      label: "Adapt options",
      render: (recipe: RecipeItem) => (
        <span>
          {recipe.adaptOptions?.length
            ? recipe.adaptOptions.join(", ")
            : <span className="text-muted-foreground">—</span>}
        </span>
      ),
    },
    {
      key: "price",
      label: "Sales Price",
      className: "text-right",
      render: (recipe: RecipeItem) => (
        <span className="text-right tabular-nums">
          {recipe.salesPrice != null ? `${recipe.salesPrice} G` : "—"}
        </span>
      ),
    },
  ];

  const columns = isMobile ? mobileColumns : desktopColumns;

  return (
    <div className="px-1 md:px-6">
      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-[340px]">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or ingredient..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border bg-background/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <div className="mb-4 inline-flex items-center gap-2 rounded-lg border bg-secondary/60 px-3 py-2 text-sm text-muted-foreground">
        <Info className="h-4 w-4" />
        <span>
          Content under construction — utensils, source, and adaptation options
          will be added as we progress.
        </span>
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Table with mobile-optimized container */}
      <div className="w-full">
        {isMobile
          ? (
            <div className="space-y-3">
              {/* Mobile table headers for sorting */}
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg border">
                <button
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-1 text-sm font-medium hover:text-foreground transition-colors"
                >
                  Dish
                  <div className="flex flex-col">
                    <ArrowUp
                      className={`h-3 w-3 ${
                        mobileSortColumn === "name" &&
                          mobileSortDirection === "asc"
                          ? "text-foreground"
                          : "text-muted-foreground/30"
                      }`}
                    />
                    <ArrowDown
                      className={`h-3 w-3 -mt-1 ${
                        mobileSortColumn === "name" &&
                          mobileSortDirection === "desc"
                          ? "text-foreground"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  </div>
                </button>
                <button
                  onClick={() => handleSort("price")}
                  className="flex items-center gap-1 text-sm font-medium hover:text-foreground transition-colors"
                >
                  Price
                  <div className="flex flex-col">
                    <ArrowUp
                      className={`h-3 w-3 ${
                        mobileSortColumn === "price" &&
                          mobileSortDirection === "asc"
                          ? "text-foreground"
                          : "text-muted-foreground/30"
                      }`}
                    />
                    <ArrowDown
                      className={`h-3 w-3 -mt-1 ${
                        mobileSortColumn === "price" &&
                          mobileSortDirection === "desc"
                          ? "text-foreground"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  </div>
                </button>
              </div>

              {/* Mobile cards */}
              {filtered.map((recipe) => (
                <div
                  key={recipe.dish}
                  className="border rounded-lg p-4 bg-card/50 backdrop-blur-sm"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2 flex-wrap min-w-0 flex-1">
                      <span className="font-medium text-sm leading-tight">
                        {recipe.dish}
                      </span>
                      {recipe.type && (
                        <Badge
                          variant="outline"
                          className={`text-xs shrink-0 ${
                            getTypeBadgeVariant(recipe.type)
                          }`}
                        >
                          {recipe.type}
                        </Badge>
                      )}
                    </div>
                    <div className="text-right ml-2 shrink-0">
                      {recipe.salesPrice != null
                        ? (
                          <span className="text-sm font-semibold text-emerald-400 bg-emerald-900/20 px-2 py-1 rounded-md">
                            {recipe.salesPrice} G
                          </span>
                        )
                        : (
                          <span className="text-muted-foreground text-sm">
                            —
                          </span>
                        )}
                    </div>
                  </div>

                  {/* Recipe ingredients */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {recipe.recipe.map((ingredient, index) => (
                      <Badge key={index} variant="square" className="text-xs">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>

                  {/* Additional details */}
                  <div className="text-xs text-muted-foreground space-y-1">
                    {recipe.whereToGet && (
                      <div className="break-words">
                        <span className="text-foreground/70 font-medium">
                          Source:
                        </span>{" "}
                        {truncateText(recipe.whereToGet, 50)}
                      </div>
                    )}
                    {recipe.effect && (
                      <div className="break-words">
                        <span className="text-foreground/70 font-medium">
                          Effect:
                        </span>{" "}
                        {truncateText(recipe.effect, 50)}
                      </div>
                    )}
                    {recipe.utensils?.length && (
                      <div className="break-words">
                        <span className="text-foreground/70 font-medium">
                          Utensils:
                        </span>{" "}
                        {truncateText(recipe.utensils.join(", "), 50)}
                      </div>
                    )}
                    {recipe.adaptOptions?.length && (
                      <div className="break-words">
                        <span className="text-foreground/70 font-medium">
                          Adapt:
                        </span>{" "}
                        {truncateText(recipe.adaptOptions.join(", "), 50)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )
          : (
            <SortableTable
              data={filtered}
              columns={columns}
              sortColumn={mobileSortColumn}
              sortDirection={mobileSortDirection}
              onSort={handleSort}
              getRowKey={(recipe) => recipe.dish}
            />
          )}
      </div>
    </div>
  );
}
