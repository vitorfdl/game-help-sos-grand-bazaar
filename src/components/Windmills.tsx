import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  Droplets,
  Leaf,
  Search,
  Sun,
  Wind,
} from "lucide-react";
import { type WindmillItem, windmills } from "@/data/windmills";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  SortableTable,
  type SortColumn,
  type SortDirection,
} from "@/components/ui/sortable-table";
import { CategoryFilter } from "@/components/ui/category-filter";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAtom } from "jotai";
import { footerExpandedAtom } from "@/store/atoms";

function windmillColorFor(id: string) {
  if (id === "red") return "#ef4444"; // rose-500
  if (id === "blue") return "#0ea5e9"; // sky-500
  return "#f59e0b"; // amber-500
}

export function WindmillIcon(
  { color, className }: { color: string; className?: string },
) {
  // Inline SVG from public/windmill.svg with center fill controlled by `color`.
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="48" height="48" fill="white" fillOpacity="0.01" />
      <path
        d="M24 24C29.5228 24 34 19.5228 34 14C34 8.47715 29.5228 4 24 4V24Z"
        fill={color}
        stroke="#000"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M24 24C24 29.5228 28.4772 34 34 34C39.5228 34 44 29.5228 44 24H24Z"
        fill={color}
        stroke="#000"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M24 24C24 18.4772 19.5228 14 14 14C8.47715 14 4 18.4772 4 24H24Z"
        fill={color}
        stroke="#000"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M24 24C18.4772 24 14 28.4772 14 34C14 39.5228 18.4772 44 24 44V24Z"
        fill={color}
        stroke="#000"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Filter = "all" | "red" | "blue" | "yellow";

const filters: Array<{ id: Filter; label: string; icon: ReactNode }> = [
  { id: "all", label: "All", icon: <Leaf className="h-4 w-4" /> },
  { id: "red", label: "Red", icon: <Sun className="h-4 w-4" /> },
  { id: "blue", label: "Blue", icon: <Droplets className="h-4 w-4" /> },
  { id: "yellow", label: "Yellow", icon: <Wind className="h-4 w-4" /> },
];

function titleFor(id: Filter): string {
  if (id === "all") return "All Windmills";
  if (id === "red") return "Red Windmill";
  if (id === "blue") return "Blue Windmill";
  return "Yellow Windmill";
}

function toNumber(price: number | string | undefined): number {
  if (typeof price === "number") return price;
  if (!price) return NaN;
  const num = Number(String(price).replace(/[^0-9]/g, ""));
  return Number.isNaN(num) ? NaN : num;
}

function formatPrice(
  item: WindmillItem,
): { price: string; unit: string | null } {
  const num = toNumber(item.sellPrice);
  const formatted = Number.isNaN(num)
    ? String(item.sellPrice)
    : new Intl.NumberFormat().format(num);
  return { price: formatted, unit: null };
}

function truncateText(text: string, maxLength: number = 50): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

function isRecipeOneOf(
  ingredient: string | { oneOf: string[] },
): ingredient is { oneOf: string[] } {
  return typeof ingredient === "object" && "oneOf" in ingredient;
}

function RecipeIngredients(
  { recipe }: {
    recipe: (string | { oneOf: string[] })[];
  },
) {
  return (
    <div className="flex flex-wrap gap-1">
      {recipe.map((ingredient, index) => {
        if (isRecipeOneOf(ingredient)) {
          return (
            <div
              key={index}
              className={cn(
                "group relative mt-1 flex flex-wrap items-center gap-1 rounded-xl border",
                "border-amber-300/50 dark:border-amber-700/50 bg-amber-500/5",
                "px-2 py-1",
              )}
            >
              <span className="pointer-events-none absolute -top-2 left-2 select-none rounded-full bg-amber-500/90 px-2 py-0.5 text-[10px] font-semibold leading-none text-amber-50 shadow-sm">
                one of
              </span>
              {ingredient.oneOf.map((choice, choiceIndex) => (
                <div key={choiceIndex} className="flex items-center gap-1">
                  <Badge
                    variant="square"
                    className={cn(
                      "text-xs",
                      "bg-amber-500/10 text-amber-900 dark:text-amber-200",
                      "border border-amber-300/60 dark:border-amber-700/60",
                    )}
                  >
                    {choice}
                  </Badge>
                  {choiceIndex < ingredient.oneOf.length - 1 && (
                    <span className="mx-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-600/80 dark:text-amber-300/70">
                      or
                    </span>
                  )}
                </div>
              ))}
            </div>
          );
        } else {
          return (
            <Badge key={index} variant="square" className="text-xs">
              {ingredient}
            </Badge>
          );
        }
      })}
    </div>
  );
}

function includesQuery(
  windmill: { name: string; description?: string },
  section: { title: string },
  item: WindmillItem,
  q: string,
): boolean {
  // Flatten recipe to include oneOf choices
  const recipeTerms = item.recipe?.flatMap((ingredient) => {
    if (isRecipeOneOf(ingredient)) {
      return ingredient.oneOf;
    }
    return [ingredient];
  }) ?? [];

  const haystack = [
    windmill.name,
    windmill.description,
    section.title,
    item.name,
    item.info,
    item.sellPrice,
    item.processTime,
    item.harvestTime,
    ...recipeTerms,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

type ItemSortColumn =
  | "name"
  | "section"
  | "recipe"
  | "info"
  | "processTime"
  | "harvestTime"
  | "price";

export default function Windmills() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<ItemSortColumn>("section");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeWindmill, setActiveWindmill] = useState<Filter>("red");
  const [globalSectionFilter, setGlobalSectionFilter] = useState<string>("all");
  const isMobile = useIsMobile();
  const [footerExpanded, setFooterExpanded] = useAtom(footerExpandedAtom);

  // Get all unique sections across all windmills
  const getAllSections = () => {
    const sections = new Set<string>();
    windmills.forEach((windmill) => {
      windmill.sections.forEach((section) => {
        sections.add(section.title);
      });
    });
    return Array.from(sections).sort();
  };

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column as ItemSortColumn);
      setSortDirection("asc");
    }
  };

  // For mobile, we support sorting by name and price only
  const mobileSortColumn = isMobile
    ? (sortColumn === "name" || sortColumn === "price" ? sortColumn : "name")
    : sortColumn;
  const mobileSortDirection = sortDirection;

  const visible = useMemo(() => {
    const wmFiltered = filter === "all"
      ? windmills
      : windmills.filter((w) => w.id === filter);
    const q = query.trim().toLowerCase();

    return wmFiltered.map((wm) => {
      let sections = wm.sections;

      // Filter by global section filter
      if (globalSectionFilter !== "all") {
        sections = sections.filter((section) =>
          section.title === globalSectionFilter
        );
      }

      // Flatten all items from all sections
      const allItems = sections.flatMap((section) =>
        section.items.map((item) => ({
          ...item,
          sectionTitle: section.title,
        }))
      );

      // Filter by search query
      const filteredItems = q
        ? allItems.filter((item) => {
          const section = { title: item.sectionTitle };
          return includesQuery(wm, section, item, q);
        })
        : allItems;

      return { ...wm, items: filteredItems };
    });
  }, [filter, query, globalSectionFilter]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const first = visibleEntries[0];
        if (first) {
          const id = first.target.getAttribute("data-windmill-id") as
            | Filter
            | null;
          if (id) setActiveWindmill(id);
        }
      },
      {
        root: null,
        rootMargin: "-25% 0px -65% 0px",
        threshold: [0, 0.25, 0.5, 1],
      },
    );
    const nodes = Object.values(sectionRefs.current).filter(
      Boolean,
    ) as HTMLElement[];
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [visible]);

  const sortItems = (items: (WindmillItem & { sectionTitle: string })[]) => {
    const sorted = [...items];
    const direction = sortDirection === "asc" ? 1 : -1;

    sorted.sort((a, b) => {
      let comparison = 0;

      switch (sortColumn) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "section":
          comparison = a.sectionTitle.localeCompare(b.sectionTitle);
          break;
        case "recipe":
          const aRecipe = a.recipe?.flatMap((ingredient) => {
            if (isRecipeOneOf(ingredient)) {
              return ingredient.oneOf.join("/");
            }
            return [ingredient];
          }).join(", ") ?? "";
          const bRecipe = b.recipe?.flatMap((ingredient) => {
            if (isRecipeOneOf(ingredient)) {
              return ingredient.oneOf.join("/");
            }
            return [ingredient];
          }).join(", ") ?? "";
          comparison = aRecipe.localeCompare(bRecipe);
          break;
        case "info":
          const aInfo = a.info ?? "";
          const bInfo = b.info ?? "";
          comparison = aInfo.localeCompare(bInfo);
          break;
        case "processTime":
          const aProcess = a.processTime ?? "";
          const bProcess = b.processTime ?? "";
          comparison = aProcess.localeCompare(bProcess);
          break;
        case "harvestTime":
          const aHarvest = a.harvestTime ?? "";
          const bHarvest = b.harvestTime ?? "";
          comparison = aHarvest.localeCompare(bHarvest);
          break;
        case "price":
          const aPrice = toNumber(a.sellPrice);
          const bPrice = toNumber(b.sellPrice);
          const aMissing = Number.isNaN(aPrice);
          const bMissing = Number.isNaN(bPrice);
          if (aMissing && bMissing) return 0;
          if (aMissing) return 1;
          if (bMissing) return -1;
          comparison = aPrice - bPrice;
          break;
      }

      return direction * comparison || a.name.localeCompare(b.name);
    });

    return sorted;
  };

  const desktopColumns = () => [
    {
      key: "section",
      label: "Section",
      render: (item: WindmillItem & { sectionTitle: string }) => (
        <Badge variant="outline" className="text-xs">
          {item.sectionTitle}
        </Badge>
      ),
    },
    {
      key: "name",
      label: "Name",
      render: (item: WindmillItem & { sectionTitle: string }) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{item.name}</span>
          {item.unique && (
            <Badge variant="square" className="text-xs bg-secondary">
              Unique
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: "recipe",
      label: "Recipe",
      render: (item: WindmillItem) => (
        item.recipe?.length
          ? <RecipeIngredients recipe={item.recipe} />
          : <span className="text-muted-foreground">—</span>
      ),
    },
    {
      key: "info",
      label: "Info",
      render: (item: WindmillItem) => (
        <span className="text-sm">
          {item.info
            ? truncateText(item.info, 60)
            : <span className="text-muted-foreground">—</span>}
        </span>
      ),
    },
    {
      key: "processTime",
      label: "Process Time",
      render: (item: WindmillItem) => (
        <span className="text-sm">
          {item.processTime || <span className="text-muted-foreground">—</span>}
        </span>
      ),
    },
    {
      key: "price",
      label: "Sell Price",
      className: "text-right",
      render: (item: WindmillItem) => {
        if (!item.sellPrice) {
          return <span className="text-muted-foreground">—</span>;
        }
        const { price } = formatPrice(item);
        return (
          <span className="text-right font-medium tabular-nums">
            {price} G
          </span>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col relative min-h-0">
      <main className={`flex-1 ${isMobile && !footerExpanded ? "pb-12" : ""}`}>
        <div className="px-1">
          {/* Desktop Toolbar */}
          <div className="hidden sm:block mb-3 sm:mb-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative w-full sm:w-[340px]">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search across all windmills..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg border bg-background/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-ring text-base"
                />
                <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>

              <div className="sm:flex-1" />

              {/* Desktop filter pills */}
              <div className="inline-flex rounded-full border bg-secondary p-1">
                {filters.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm transition flex items-center gap-2",
                      filter === f.id
                        ? "bg-background shadow-sm"
                        : "hover:bg-accent/60",
                    )}
                  >
                    {f.icon}
                    <span className="hidden md:inline">{f.label}</span>
                  </button>
                ))}
              </div>

              {/* Desktop Global Section Filter */}
              <div className="w-full sm:w-auto">
                <CategoryFilter
                  categories={[...getAllSections()]}
                  selectedCategory={globalSectionFilter}
                  onCategoryChange={setGlobalSectionFilter}
                />
              </div>
            </div>
          </div>

          <div className="sticky top-16 z-20 bg-background/80 backdrop-blur border-b">
            <div className="px-1 py-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <WindmillIcon
                  color={windmillColorFor(activeWindmill)}
                  className="h-4 w-4"
                />
                <span>
                  Viewing:{" "}
                  <span className="font-medium text-foreground">
                    {titleFor(activeWindmill)}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-5 sm:space-y-6 md:space-y-8 mt-4">
            {visible.map((wm) => (
              <section
                key={wm.id}
                data-windmill-id={wm.id}
                ref={(el) => {
                  sectionRefs.current[wm.id] = el;
                }}
                className="rounded-2xl border bg-card/70 backdrop-blur p-3 sm:p-4 md:p-6"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight">
                      {wm.name}
                    </h2>
                    {wm.description && (
                      <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                        {wm.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center">
                    <WindmillIcon
                      color={windmillColorFor(wm.id)}
                      className="h-8 w-8"
                    />
                  </div>
                </div>

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
                            Item
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
                            Sell
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
                        {sortItems(wm.items).map((item) => (
                          <div
                            key={`${item.name}-${item.sectionTitle}-${
                              item.recipe?.join(",") || "no-recipe"
                            }`}
                            className="border rounded-lg p-4 bg-card/50 backdrop-blur-sm"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-center gap-2 flex-wrap min-w-0 flex-1">
                                <span className="font-medium text-sm leading-tight">
                                  {item.name}
                                </span>
                                {item.unique && (
                                  <Badge
                                    variant="outline"
                                    className="text-xs shrink-0 bg-secondary"
                                  >
                                    Unique
                                  </Badge>
                                )}
                                <Badge
                                  variant="outline"
                                  className="text-xs shrink-0"
                                >
                                  {item.sectionTitle}
                                </Badge>
                              </div>
                              <div className="text-right ml-2 shrink-0">
                                {item.sellPrice
                                  ? (
                                    <span className="text-sm font-semibold text-emerald-400 bg-emerald-900/20 px-2 py-1 rounded-md">
                                      {formatPrice(item).price} G
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
                            {item.recipe && item.recipe.length > 0 && (
                              <div className="mb-3">
                                <RecipeIngredients
                                  recipe={item.recipe}
                                />
                              </div>
                            )}

                            {/* Additional details */}
                            <div className="text-xs text-muted-foreground space-y-1">
                              {item.info && (
                                <div className="break-words">
                                  <span className="text-foreground/70 font-medium">
                                    Info:
                                  </span>{" "}
                                  {truncateText(item.info, 50)}
                                </div>
                              )}
                              {item.processTime && (
                                <div className="break-words">
                                  <span className="text-foreground/70 font-medium">
                                    Process:
                                  </span>{" "}
                                  {item.processTime}
                                </div>
                              )}
                              {item.harvestTime && (
                                <div className="break-words">
                                  <span className="text-foreground/70 font-medium">
                                    Harvest:
                                  </span>{" "}
                                  {item.harvestTime}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                    : (
                      <div className="overflow-x-auto">
                        <SortableTable
                          data={sortItems(wm.items)}
                          columns={desktopColumns()}
                          sortColumn={mobileSortColumn}
                          sortDirection={mobileSortDirection}
                          onSort={handleSort}
                          getRowKey={(item) =>
                            `${item.name}-${item.sectionTitle}-${
                              item.recipe?.join(",") || "no-recipe"
                            }`}
                        />
                      </div>
                    )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      {/* Mobile Footer with Filters */}
      <footer
        className={`${
          isMobile ? "fixed left-0 right-0 bottom-0 z-40" : "hidden"
        } bg-background/90 backdrop-blur border-t`}
      >
        {/* Mobile Expandable Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <div className="text-sm font-medium text-muted-foreground">
            {visible.reduce((total, wm) => total + wm.items.length, 0)} items
            {filter !== "all" && ` (${titleFor(filter)})`}
            {globalSectionFilter !== "all" && ` - ${globalSectionFilter}`}
          </div>
          <button
            onClick={() => setFooterExpanded(!footerExpanded)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-accent transition-colors"
          >
            <span className="text-sm">
              {footerExpanded ? "Collapse" : "Open Filter"}
            </span>
            {footerExpanded
              ? <ChevronDown className="h-4 w-4" />
              : <ChevronUp className="h-4 w-4" />}
          </button>
        </div>

        {/* Footer Content */}
        <div
          className={`mx-auto px-4 transition-all duration-300 ${
            footerExpanded
              ? "py-3 max-h-[70vh] opacity-100"
              : "py-0 max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="space-y-3">
            {/* Search */}
            <div className="relative">
              <Input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (isMobile) {
                    setFooterExpanded(false);
                  }
                }}
                placeholder="Search across all windmills..."
                className="w-full pl-9 pr-3 py-2 rounded-lg border bg-background/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-ring text-base"
              />
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>

            {/* Windmill Filter */}
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setFilter(f.id);
                    if (isMobile) {
                      setFooterExpanded(false);
                    }
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm transition flex items-center gap-2 border",
                    filter === f.id
                      ? "bg-background shadow-sm border-primary"
                      : "bg-secondary hover:bg-accent/60 border-border",
                  )}
                >
                  {f.icon}
                  <span>{f.label}</span>
                </button>
              ))}
            </div>

            {/* Section Filter */}
            <div>
              <CategoryFilter
                categories={[...getAllSections()]}
                selectedCategory={globalSectionFilter}
                onCategoryChange={(category) => {
                  setGlobalSectionFilter(category);
                  if (isMobile) {
                    setFooterExpanded(false);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
