import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Bell,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  Flower2,
  Leaf,
  Snowflake,
  Sparkles,
  Sun,
} from "lucide-react";
import { type Festival, festivalsFor, type Season } from "@/data/calendar";
import { withBase } from "@/lib/utils";
import {
  avatarFileOverrides,
  residents as allResidents,
} from "@/data/residents";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const seasons: Season[] = ["Spring", "Summer", "Autumn", "Winter"];
const seasonAccent: Record<Season, string> = {
  Spring: "from-rose-400 to-emerald-400",
  Summer: "from-green-500 to-lime-500",
  Autumn: "from-amber-500 to-orange-500",
  Winter: "from-sky-500 to-indigo-500",
};
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function toAvatarFilename(name: string): string {
  const override = (avatarFileOverrides as any)[name];
  const base = override ?? name.toLowerCase();
  return withBase(`/avatars/${base}.webp`);
}

type CombinedEvent = {
  day: number;
  title: string;
  type: "festival" | "birthday";
  residentName?: string;
  festival?: Festival;
};

function FestivalDetails({ festival }: { festival: Festival }) {
  return (
    <div className="space-y-4 w-full">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-teal-500/20 flex-shrink-0">
          <Flag className="h-5 w-5 text-green-600" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-lg text-foreground">
            {festival.title}
          </h3>
          <div className="text-sm text-muted-foreground">Festival</div>
        </div>
      </div>

      {/* Time Information */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span className="font-medium text-sm text-foreground">Time:</span>
          <span className="text-sm text-foreground">
            {festival.openAt}
            {festival.closeAt && ` - ${festival.closeAt}`}
          </span>
        </div>

        {festival.endAt && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="font-medium text-sm text-foreground">
              Ends at:
            </span>
            <span className="text-sm text-foreground">{festival.endAt}</span>
          </div>
        )}
      </div>

      {/* Notes/Description */}
      {festival.notes && (
        <div className="flex items-start gap-2">
          <Sparkles className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <span className="font-medium text-sm text-foreground">
              Details:
            </span>
            <p className="text-sm text-foreground mt-1 leading-relaxed">
              {festival.notes}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Calendar() {
  const [searchParams, setSearchParams] = useSearchParams();
  // LocalStorage key for persisting calendar state
  const STORAGE_KEY = "sos_gbz_calendar_state";

  // Read any previously stored state (safe/validated)
  const stored = (() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null as null | { year?: number; season?: Season };
      const obj = JSON.parse(raw);
      const y = Number(obj?.year);
      const s = obj?.season as Season | undefined;
      const validYear = Number.isFinite(y) && y >= 1 ? y : undefined;
      const validSeason = (seasons.find((x) =>
        x === s
      ) as Season | undefined) ?? undefined;
      return { year: validYear, season: validSeason };
    } catch {
      return null as null | { year?: number; season?: Season };
    }
  })();

  const hasUrlYear = searchParams.has("year");
  const hasUrlSeason = searchParams.has("season");

  const [year, setYear] = useState<number>(() => {
    if (hasUrlYear) {
      const raw = Number(searchParams.get("year") ?? 1);
      return Number.isFinite(raw) && raw >= 1 ? raw : 1;
    }
    const fromStorage = stored?.year;
    return typeof fromStorage === "number" ? fromStorage : 1;
  });
  const [season, setSeason] = useState<Season>(() => {
    if (hasUrlSeason) {
      const s = searchParams.get("season");
      const match = seasons.find((x) => x === s);
      return (match as Season) ?? "Spring";
    }
    const fromStorage = stored?.season;
    return (fromStorage as Season) ?? "Spring";
  });
  const [show, setShow] = useState<"all" | "festival" | "birthday">("all");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useIsMobile();

  const model = useMemo(() => festivalsFor(year, season), [year, season]);

  const birthdays = useMemo<CombinedEvent[]>(() => {
    return allResidents
      .filter((r) => r.birthday && r.birthday.season === season)
      .map((r) => ({
        day: r.birthday!.day,
        title: `${r.name}'s Birthday`,
        type: "birthday" as const,
        residentName: r.name,
      }));
  }, [season]);

  const eventsByDay = useMemo(() => {
    const combined: CombinedEvent[] = [
      ...model.events.map((e) => ({
        ...e,
        type: "festival" as const,
        festival: e,
      })),
      ...birthdays,
    ];
    const map: Record<number, CombinedEvent[]> = {};
    for (const ev of combined) {
      if (show !== "all" && show !== ev.type) continue;
      map[ev.day] ||= [];
      map[ev.day].push(ev);
    }
    return map;
  }, [model, birthdays, show]);

  const startWeekday = useMemo(() => getStartWeekday(year, season), [
    year,
    season,
  ]);

  const cells = useMemo(() => {
    const out: Array<{ day?: number }> = [];
    for (let i = 0; i < startWeekday; i++) out.push({});
    for (let d = 1; d <= model.days; d++) out.push({ day: d });
    while (out.length % 7 !== 0) out.push({});
    return out;
  }, [startWeekday, model.days]);

  const canPrevSeason = !(year === 1 && season === "Spring");
  const canNextSeason = true;

  function prev() {
    if (!canPrevSeason) return;
    const idx = seasons.indexOf(season);
    if (idx === 0) {
      setYear((y) => Math.max(1, y - 1));
      setSeason("Winter");
    } else {
      setSeason(seasons[idx - 1]);
    }
  }

  function next() {
    const idx = seasons.indexOf(season);
    if (idx === seasons.length - 1) {
      setYear((y) => y + 1);
      setSeason("Spring");
    } else {
      setSeason(seasons[idx + 1]);
    }
  }

  function handleDayClick(day: number) {
    if (isMobile) {
      setSelectedDay(day);
      setDrawerOpen(true);
    }
  }

  // Update URL when year/season change
  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    const curYear = next.get("year");
    const curSeason = next.get("season");
    const y = String(year);
    const s = season;
    if (curYear === y && curSeason === s) return;
    next.set("year", y);
    next.set("season", s);
    setSearchParams(next);
  }, [year, season]);

  // Persist latest state to localStorage regardless of URL sync outcome
  useEffect(() => {
    try {
      console.log("Persisting state to localStorage:", { year, season });
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ year, season }));
    } catch {
      console.error("Error persisting state to localStorage:", {
        year,
        season,
      });
    }
  }, [year, season]);

  // React to back/forward changing the URL
  // Only apply when the URL actually carries calendar params, otherwise
  // we keep the current (possibly hydrated-from-storage) state.
  useEffect(() => {
    const hasYearParam = searchParams.has("year");
    const hasSeasonParam = searchParams.has("season");
    if (!hasYearParam && !hasSeasonParam) return;

    const rawYear = Number(searchParams.get("year") ?? year);
    const nextYear = Number.isFinite(rawYear) && rawYear >= 1 ? rawYear : year;
    const s = (searchParams.get("season") as Season | null) ?? season;
    const nextSeason = (seasons.find((x) => x === s) as Season) ?? season;
    if (nextYear !== year) setYear(nextYear);
    if (nextSeason !== season) setSeason(nextSeason);
  }, [searchParams]);

  return (
    <div className="relative px-1">
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_45%_at_50%_0%,black,transparent)]">
        <div
          className={`absolute inset-x-0 -top-40 h-80 bg-gradient-to-b ${
            seasonAccent[season]
          } blur-2xl opacity-40`}
        />
        <div className="absolute right-6 top-10 opacity-20">
          {season === "Spring" && (
            <Flower2 className="h-40 w-40 text-rose-300" />
          )}
          {season === "Summer" && <Sun className="h-40 w-40 text-lime-300" />}
          {season === "Autumn" && <Leaf className="h-40 w-40 text-amber-300" />}
          {season === "Winter" && (
            <Snowflake className="h-40 w-40 text-sky-300" />
          )}
        </div>
      </div>
      {/* Toolbar: navigation and filters; header moved to layout */}
      <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2">
          <button
            className={`h-8 w-8 sm:h-10 sm:w-10 inline-flex items-center justify-center rounded-lg border bg-background ${
              canPrevSeason
                ? "hover:bg-accent"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={prev}
            aria-label="Previous season"
            disabled={!canPrevSeason}
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <div
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border bg-background text-sm sm:text-base md:text-lg font-medium min-w-[180px] sm:min-w-[220px] text-center bg-gradient-to-r ${
              seasonAccent[season]
            } bg-clip-text text-transparent shadow-sm`}
          >
            Year {year} • {season}
          </div>
          <button
            className={`h-8 w-8 sm:h-10 sm:w-10 inline-flex items-center justify-center rounded-lg border bg-background ${
              canNextSeason
                ? "hover:bg-accent"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={next}
            aria-label="Next season"
            disabled={!canNextSeason}
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        <div
          className={`inline-flex rounded-full border bg-secondary p-0.5 sm:p-1 ${
            isMobile ? "text-xs" : ""
          }`}
        >
          {(["all", "festival", "birthday"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setShow(k)}
              className={`px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full text-xs sm:text-sm md:text-base ${
                show === k ? "bg-background shadow-sm" : "hover:bg-accent/60"
              }`}
            >
              {k === "all"
                ? "All"
                : k === "festival"
                ? (isMobile ? "Fest." : "Festivals")
                : (isMobile ? "Birth." : "Birthdays")}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border bg-card/70 p-2 sm:p-3 md:p-4 shadow-xl">
        <div
          className={`grid grid-cols-7 ${
            isMobile ? "gap-1" : "gap-1.5 sm:gap-2"
          }`}
        >
          {weekdays.map((w) => (
            <div
              key={w}
              className="text-center text-[11px] sm:text-sm font-medium text-muted-foreground py-0.5 sm:py-1"
            >
              {isMobile ? w.slice(0, 3) : w}
            </div>
          ))}
          {cells.map((cell, idx) => {
            if (isMobile) {
              // Mobile view: compact layout with small avatars/icons
              return (
                <div
                  key={idx}
                  className={`min-h-[52px] rounded-lg border p-1.5 relative cursor-pointer transition-all touch-manipulation ${
                    typeof cell.day === "number"
                      ? "bg-background hover:bg-accent/20 active:bg-accent/30 active:scale-95"
                      : "bg-muted/40"
                  } ${
                    typeof cell.day === "number" && ((idx % 7) === 6)
                      ? " bg-sky-500/10 border-sky-500/30"
                      : ""
                  } ${
                    typeof cell.day === "number" && ((idx % 7) === 0)
                      ? " bg-rose-500/10 border-rose-500/30"
                      : ""
                  }`}
                  onClick={() =>
                    typeof cell.day === "number" && handleDayClick(cell.day)}
                >
                  {typeof cell.day === "number" && (
                    <>
                      <div className="text-sm font-semibold text-foreground mb-1">
                        {cell.day}
                      </div>
                      <div className="flex flex-wrap gap-0.5 justify-center">
                        {eventsByDay[cell.day]?.slice(0, 3).map((ev, i) => (
                          <div key={i} className="flex-shrink-0">
                            {ev.type === "festival"
                              ? <Flag className="h-3 w-3 text-green-600" />
                              : ev.residentName
                              ? (
                                <img
                                  src={toAvatarFilename(ev.residentName)}
                                  alt={ev.residentName}
                                  className="h-4 w-4 rounded-full border object-cover"
                                  onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src =
                                      withBase("/vite.svg");
                                  }}
                                />
                              )
                              : <Bell className="h-3 w-3 text-purple-600" />}
                          </div>
                        ))}
                        {eventsByDay[cell.day] &&
                          eventsByDay[cell.day].length > 3 && (
                          <div className="h-3 w-3 bg-muted-foreground/50 rounded-full flex items-center justify-center">
                            <span className="text-[8px] text-background font-bold">
                              +
                            </span>
                          </div>
                        )}
                      </div>
                      {typeof cell.day === "number" && ((idx % 7) === 6) && (
                        <div className="absolute -top-1 -right-1 h-2 w-2 bg-sky-500 rounded-full">
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            } else {
              // Desktop view: original layout
              return (
                <div
                  key={idx}
                  className={`min-h-[84px] sm:min-h-[96px] md:min-h-[116px] rounded-xl border p-1.5 sm:p-2 relative ${
                    typeof cell.day === "number"
                      ? "bg-background"
                      : "bg-muted/40"
                  } ${((idx % 7) === 6) ? "ring-0" : ""} ${
                    typeof cell.day === "number"
                      ? "hover:bg-accent/5 transition"
                      : ""
                  } ${
                    typeof cell.day === "number" && ((idx % 7) === 6)
                      ? " bg-sky-500/10 border-sky-500/30"
                      : ""
                  } ${
                    typeof cell.day === "number" && ((idx % 7) === 0)
                      ? " bg-rose-500/10 border-rose-500/30"
                      : ""
                  }`}
                >
                  {typeof cell.day === "number" && (
                    <>
                      <div className="text-[12px] sm:text-[13px] font-semibold text-muted-foreground">
                        {cell.day}
                      </div>
                      <div className="mt-1 space-y-1">
                        {eventsByDay[cell.day]?.map((ev, i) => (
                          <div key={i} className="flex items-center gap-2">
                            {ev.type === "festival"
                              ? (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="flex items-center gap-2 cursor-pointer group">
                                      <Flag className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                                      <span className="text-xs sm:text-sm md:text-[15px] leading-tight group-hover:text-foreground group-hover:font-medium transition-all duration-200">
                                        {ev.title}
                                      </span>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent
                                    side="top"
                                    className="max-w-md w-80 p-0 bg-background border shadow-xl"
                                    sideOffset={8}
                                  >
                                    <div className="p-4 text-foreground">
                                      <FestivalDetails
                                        festival={ev.festival!}
                                      />
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              )
                              : (
                                ev.residentName
                                  ? (
                                    <Link
                                      to={`/?resident=${
                                        encodeURIComponent(ev.residentName)
                                      }`}
                                      aria-label={`View ${ev.residentName} in Residents`}
                                      className="group flex items-center gap-2 transition-all duration-200"
                                    >
                                      <img
                                        src={toAvatarFilename(ev.residentName)}
                                        alt={ev.residentName}
                                        className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full border object-cover shrink-0 transition-all duration-200 group-hover:ring-2 group-hover:ring-ring group-hover:ring-offset-1 group-hover:ring-offset-background group-hover:scale-105"
                                        onError={(e) => {
                                          (e.currentTarget as HTMLImageElement)
                                            .src = withBase("/vite.svg");
                                        }}
                                      />
                                      <span className="text-xs sm:text-sm md:text-[15px] leading-tight transition-all duration-200 group-hover:text-foreground group-hover:font-medium">
                                        {ev.title}
                                      </span>
                                    </Link>
                                  )
                                  : (
                                    <span className="text-xs sm:text-sm md:text-[15px] leading-tight">
                                      {ev.title}
                                    </span>
                                  )
                              )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {typeof cell.day === "number" && ((idx % 7) === 6) && (
                    <div className="absolute right-1 top-1 inline-flex items-center gap-1 rounded-md border bg-background/95 px-1.5 py-0.5 sm:px-2 sm:py-1 shadow-sm">
                      <Bell className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-sky-500" />
                      <span className="text-[10px] sm:text-[12px] font-medium text-sky-500">
                        Bazaar Day
                      </span>
                    </div>
                  )}
                </div>
              );
            }
          })}
        </div>
      </div>

      <Legend />

      {/* Mobile Day Details Drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-center">
              {season} {selectedDay}, Year {year}
              {selectedDay !== null &&
                (((startWeekday + selectedDay - 1) % 7) === 6) && (
                <span className="ml-2 inline-flex items-center gap-1 text-sm text-sky-600">
                  <Bell className="h-4 w-4" />
                  Bazaar Day
                </span>
              )}
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-8">
            {selectedDay && eventsByDay[selectedDay] &&
                eventsByDay[selectedDay].length > 0
              ? (
                <div className="space-y-4">
                  {eventsByDay[selectedDay].map((ev, i) => (
                    <div key={i} className="p-4 rounded-lg border bg-card">
                      {ev.type === "festival"
                        ? <FestivalDetails festival={ev.festival!} />
                        : ev.residentName
                        ? (
                          <Link
                            to={`/?resident=${
                              encodeURIComponent(ev.residentName)
                            }`}
                            className="flex items-center gap-4 w-full group"
                            onClick={() => setDrawerOpen(false)}
                          >
                            <img
                              src={toAvatarFilename(ev.residentName)}
                              alt={ev.residentName}
                              className="h-12 w-12 rounded-full border object-cover flex-shrink-0 transition-all duration-200 group-hover:ring-2 group-hover:ring-ring group-hover:ring-offset-2"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src =
                                  withBase("/vite.svg");
                              }}
                            />
                            <div>
                              <div className="font-semibold text-lg group-hover:text-primary transition-colors">
                                {ev.title}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Birthday • Tap to view resident
                              </div>
                            </div>
                          </Link>
                        )
                        : (
                          <>
                            <Bell className="h-8 w-8 text-purple-600 flex-shrink-0" />
                            <div>
                              <div className="font-semibold text-lg">
                                {ev.title}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Event
                              </div>
                            </div>
                          </>
                        )}
                    </div>
                  ))}
                </div>
              )
              : (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarDays className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-lg">No events this day</p>
                  <p className="text-sm">
                    Enjoy your peaceful day in the valley!
                  </p>
                </div>
              )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function Legend() {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
      <div className="inline-flex items-center gap-2">
        <Flag className="h-5 w-5 text-green-600" />
        <span>Festival</span>
      </div>
      <div className="inline-flex items-center gap-2">
        <Bell className="h-6 w-6 text-sky-500" />
        <span>Bazaar Day (Saturday)</span>
      </div>
    </div>
  );
}

// Compute the weekday the 1st falls on for a given (year, season)
// Sunday:0 ... Saturday:6
function getStartWeekday(year: number, season: Season): number {
  // Base: Year 1 Spring starts on Saturday (6) from screenshots
  const base = 6;
  const seasonIndex = seasons.indexOf(season);
  const seasonOffset = seasonIndex * 3; // 31 days per season => +3 weekday shift
  const yearOffset = ((year - 1) * ((4 * 31) % 7)) % 7; // each full year shifts 124 % 7 = 5
  return (base + seasonOffset + yearOffset) % 7;
}
