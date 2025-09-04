import { useMemo, useState } from "react";
import {
  ChevronDown,
  CircleFadingArrowUp,
  Clock,
  Construction,
  Gem,
  GiftIcon,
  Hammer,
  HopIcon,
  Leaf,
  Package,
  Search,
  ShirtIcon,
  Star,
} from "lucide-react";
import { bazaarData, type BazaarItem } from "@/data/stalls";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { WindmillIcon } from "./Windmills";
import {
  SortableTable,
  type SortColumn,
  type SortDirection,
} from "@/components/ui/sortable-table";
import { CategoryFilter } from "@/components/ui/category-filter";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type FilterId = "all" | string;

function getStallIcon(stallId: string) {
  switch (stallId) {
    case "lloyd-s-stall":
      return <Gem className="h-5 w-5" />;
    case "isaac-s-stall":
      return <Package className="h-5 w-5" />;
    case "garon-s-stall":
      return <Hammer className="h-5 w-5" />;
    case "ramon-s-critters-stall":
      return <img src={assetPath("cow.svg")} alt="Cow" className="h-5 w-5" />;
    case "sprite-stall":
      return <Leaf className="h-5 w-5" />;
    case "felix-s-stall":
      return <CircleFadingArrowUp className="h-5 w-5" />;
    case "joy-s-stall":
      return <GiftIcon className="h-5 w-5" />;
    case "arata-s-stall":
      return <HopIcon className="h-5 w-5" />;
    case "karina-s-stall":
      return <ShirtIcon className="h-5 w-5" />;
    case "felipe-s-stall":
      return <WindmillIcon color="bg-secondary" className="h-5 w-5" />;
    default:
      return <Package className="h-5 w-5" />;
  }
}
function assetPath(name: string): string {
  const base = (import.meta as any).env?.BASE_URL ?? "/";
  return `${base}${name}`;
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function includesQuery(
  stall: { name: string; description: string },
  item: BazaarItem,
  q: string,
): boolean {
  const haystack = [
    stall.name,
    stall.description,
    item.name,
    String(item.price ?? ""),
    item.unit ?? "",
    item.category ?? "",
    item.notes ?? "",
    item.unlockWhen ?? "",
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

function toNumber(price: number | string | undefined): number {
  if (typeof price === "number") return price;
  if (!price) return NaN;
  const num = Number(String(price).replace(/[^0-9]/g, ""));
  return Number.isNaN(num) ? NaN : num;
}

function formatPrice(item: BazaarItem): { price: string; unit: string | null } {
  const num = toNumber(item.price);
  const formatted = Number.isNaN(num)
    ? String(item.price)
    : new Intl.NumberFormat().format(num);
  const unit = item.unit ?? "";
  return { price: formatted, unit: unit || null };
}

function truncateText(text: string, maxLength: number = 50): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

function RankBadge({ rank }: { rank: number }) {
  const getRankColors = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-slate-200 to-slate-300 text-slate-700";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800";
      case 3:
        return "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800";
      case 4:
        return "bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800";
      case 5:
        return "bg-gradient-to-r from-violet-100 to-violet-200 text-violet-800";
      default:
        return "bg-gradient-to-r from-slate-200 to-slate-300 text-slate-700";
    }
  };

  return (
    <Badge
      variant="default"
      className={cn(
        "flex items-center gap-1 border-0 shadow-md",
        getRankColors(rank),
      )}
    >
      <Star className="h-3 w-3 fill-current" />
      <span className="font-semibold">Rank {rank}</span>
    </Badge>
  );
}

function EmptyStallCard(
  { stall }: {
    stall: { name: string; description: string; rank: number; id: string };
  },
) {
  return (
    <section className="rounded-2xl border bg-card/70 backdrop-blur p-3 sm:p-4 md:p-6 opacity-75">
      <div className="flex items-start gap-2 sm:gap-3">
        <div className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 rounded-xl bg-muted/60 text-muted-foreground flex items-center justify-center ring-1 ring-border">
          <Construction className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-muted-foreground">
              {stall.name}
            </h2>
            <RankBadge rank={stall.rank} />
            <Badge
              variant="outline"
              className="flex items-center gap-1 text-xs border-amber-200 text-amber-700 bg-amber-50"
            >
              <Clock className="h-3 w-3" />
              Coming Soon
            </Badge>
          </div>
          {stall.description && (
            <p className="text-[13px] sm:text-sm text-muted-foreground/70 mt-1 max-w-2xl">
              {stall.description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function ItemDetailsDrawer({ item, stallName, children }: {
  item: BazaarItem;
  stallName: string;
  children: React.ReactNode;
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            {item.name}
            {item.category && (
              <Badge variant="secondary" className="text-xs">
                {item.category}
              </Badge>
            )}
          </DrawerTitle>
          <DrawerDescription>
            From {stallName}
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">
                Price
              </h4>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-semibold">
                  {formatPrice(item).price}
                </span>
                {formatPrice(item).unit && (
                  <span className="text-sm text-muted-foreground font-normal">
                    {formatPrice(item).unit}
                  </span>
                )}
              </div>
            </div>
            {item.unit && (
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-1">
                  Unit
                </h4>
                <p className="text-sm text-muted-foreground">{item.unit}</p>
              </div>
            )}
          </div>

          {item.unlockWhen && (
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">
                Unlock Condition
              </h4>
              <p className="text-sm">{item.unlockWhen}</p>
            </div>
          )}

          {item.notes && (
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">
                Notes
              </h4>
              <p className="text-sm leading-relaxed">{item.notes}</p>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

type ItemSortColumn = "name" | "category" | "price";

export default function BazaarStalls() {
  const [filter, _setFilter] = useState<FilterId>("all");
  const [query, setQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<ItemSortColumn>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
  const [stallCategories, setStallCategories] = useState<
    Record<string, string>
  >({});

  const stalls = useMemo(() =>
    bazaarData
      .map((s) => ({ ...s, id: slugify(s.name) }))
      .sort((a, b) => a.rank - b.rank), []);

  // Get unique categories for a specific stall
  const getStallCategories = (stallId: string) => {
    const stall = stalls.find((s) => s.id === stallId);
    if (!stall) return [];

    const uniqueCategories = new Set<string>();
    stall.items.forEach((item) => {
      if (item.category) {
        uniqueCategories.add(item.category);
      }
    });
    return Array.from(uniqueCategories).sort();
  };

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column as ItemSortColumn);
      setSortDirection("asc");
    }
  };

  const { visibleStalls, emptyStalls } = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = filter === "all"
      ? stalls
      : stalls.filter((s) => s.id === filter);

    // First, identify truly empty stalls (those with no items at all)
    const trulyEmptyStalls = base.filter((s) => s.items.length === 0);

    // Process stalls that have items
    const stallsWithItems = base.filter((s) => s.items.length > 0);
    const processed = stallsWithItems.map((s) => {
      let items = s.items;

      // Filter by stall-specific category
      const stallCategory = stallCategories[s.id] || "all";
      if (stallCategory !== "all") {
        items = items.filter((item) => item.category === stallCategory);
      }

      // Filter by search query
      if (q) {
        items = items.filter((it) => includesQuery(s, it, q));
      }

      return { ...s, items };
    });

    // Separate processed stalls: those with remaining items vs those filtered out
    const visibleStalls = processed.filter((s) => s.items.length > 0);

    // Only show empty stalls as "coming soon" if there's no search query
    // If there's a search query, don't show truly empty stalls
    const emptyStalls = q ? [] : trulyEmptyStalls;

    return { visibleStalls, emptyStalls };
  }, [filter, query, stalls, stallCategories]);

  function toggle(stallId: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(stallId)) next.delete(stallId);
      else next.add(stallId);
      return next;
    });
  }

  const handleStallCategoryChange = (stallId: string, category: string) => {
    setStallCategories((prev) => ({
      ...prev,
      [stallId]: category,
    }));
  };

  const sortItems = (items: BazaarItem[]) => {
    const sorted = [...items];
    const direction = sortDirection === "asc" ? 1 : -1;

    sorted.sort((a, b) => {
      let comparison = 0;

      switch (sortColumn) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "category":
          const aCategory = a.category ?? "";
          const bCategory = b.category ?? "";
          comparison = aCategory.localeCompare(bCategory);
          break;
        case "price":
          const aPrice = toNumber(a.price);
          const bPrice = toNumber(b.price);
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

  const itemColumns = (stallName: string) => [
    {
      key: "name",
      label: "Name",
      render: (item: BazaarItem) => (
        <ItemDetailsDrawer item={item} stallName={stallName}>
          <div
            className="space-y-1 cursor-pointer hover:bg-muted/50 rounded-md p-2 -m-2 transition-colors"
            onClick={(e) =>
              e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">{item.name}</span>
              {item.category && (
                <Badge variant="square" className="text-xs">
                  {item.category}
                </Badge>
              )}
            </div>
            {(item.notes || item.unlockWhen) && (
              <div className="text-xs text-muted-foreground space-y-1">
                {item.notes && (
                  <div className="flex items-center gap-1">
                    <span>{truncateText(item.notes, 60)}</span>
                  </div>
                )}
                {item.unlockWhen && (
                  <div>
                    <span className="text-foreground/70">Unlock:</span>{" "}
                    {truncateText(item.unlockWhen, 40)}
                  </div>
                )}
              </div>
            )}
          </div>
        </ItemDetailsDrawer>
      ),
    },
    {
      key: "price",
      label: "Price",
      render: (item: BazaarItem) => {
        const { price, unit } = formatPrice(item);
        return (
          <div className="flex items-baseline gap-1">
            <span className="font-medium">{price}</span>
            {unit && (
              <span className="text-xs text-muted-foreground font-normal">
                {unit}
              </span>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="px-1 md:px-6">
      {/* Toolbar */}
      <div className="mb-3 sm:mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-[360px]">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stalls and items..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border bg-background/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        <div className="sm:flex-1" />
      </div>

      <div className="space-y-5 sm:space-y-6 md:space-y-8 mt-4">
        {/* Regular stalls with items */}
        {visibleStalls.map((stall) => (
          <section
            key={stall.id}
            className="rounded-2xl border bg-card/70 backdrop-blur p-3 sm:p-4 md:p-6"
          >
            <button
              onClick={() => toggle(stall.id)}
              className="w-full text-left flex items-start justify-between gap-3 sm:gap-4"
              aria-expanded={expanded.has(stall.id) || !!query}
            >
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 rounded-xl bg-secondary/40 text-secondary-foreground flex items-center justify-center ring-1 ring-border">
                  {getStallIcon(stall.id)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                      {stall.name}
                    </h2>
                    <RankBadge rank={stall.rank} />
                  </div>
                  {stall.description && (
                    <p className="text-[13px] sm:text-sm text-muted-foreground mt-1 max-w-2xl">
                      {stall.description}
                    </p>
                  )}
                </div>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 sm:h-5 sm:w-5 mt-1 transition-transform",
                  expanded.has(stall.id) || !!query ? "rotate-180" : "",
                )}
              />
            </button>

            {(expanded.has(stall.id) || !!query) && (
              <div className="mt-3 sm:mt-4">
                {/* Stall-specific category filter */}
                {getStallCategories(stall.id).length > 0 && (
                  <div className="mb-4">
                    <CategoryFilter
                      categories={getStallCategories(stall.id)}
                      selectedCategory={stallCategories[stall.id] || "all"}
                      onCategoryChange={(category) =>
                        handleStallCategoryChange(stall.id, category)}
                    />
                  </div>
                )}

                <div className="overflow-x-auto">
                  <SortableTable
                    data={sortItems(stall.items)}
                    columns={itemColumns(stall.name)}
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                    getRowKey={(item) => item.name}
                  />
                </div>
              </div>
            )}
          </section>
        ))}

        {/* Empty stalls - coming soon */}
        {emptyStalls.map((stall) => (
          <EmptyStallCard key={stall.id} stall={stall} />
        ))}
      </div>
    </div>
  );
}
