import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CalendarDays, ChevronLeft, ChevronRight, Flag, Bell, Sun, Snowflake, Leaf, Flower2 } from 'lucide-react'
import { festivalsFor, type Season } from '@/data/calendar'
import { withBase } from '@/lib/utils'
import { residents as allResidents, avatarFileOverrides } from '@/data/residents'

const seasons: Season[] = ['Spring', 'Summer', 'Autumn', 'Winter']
const seasonAccent: Record<Season, string> = {
  Spring: 'from-rose-400 to-emerald-400',
  Summer: 'from-green-500 to-lime-500',
  Autumn: 'from-amber-500 to-orange-500',
  Winter: 'from-sky-500 to-indigo-500',
}
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function toAvatarFilename(name: string): string {
  const override = (avatarFileOverrides as any)[name]
  const base = override ?? name.toLowerCase()
  return withBase(`/avatars/${base}.webp`)
}

type CombinedEvent = { day: number; title: string; type: 'festival' | 'birthday'; residentName?: string }

export default function Calendar() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [year, setYear] = useState<number>(() => {
    const raw = Number(searchParams.get('year') ?? 1)
    return Number.isFinite(raw) && raw >= 1 ? raw : 1
  })
  const [season, setSeason] = useState<Season>(() => {
    const s = searchParams.get('season')
    const match = seasons.find((x) => x === s)
    return (match as Season) ?? 'Spring'
  })
  const [show, setShow] = useState<'all' | 'festival' | 'birthday'>('all')

  const model = useMemo(() => festivalsFor(year, season), [year, season])

  const birthdays = useMemo<CombinedEvent[]>(() => {
    return allResidents
      .filter((r) => r.birthday && r.birthday.season === season)
      .map((r) => ({ day: r.birthday!.day, title: `${r.name}'s Birthday`, type: 'birthday' as const, residentName: r.name }))
  }, [season])

  const eventsByDay = useMemo(() => {
    const combined: CombinedEvent[] = [
      ...model.events.map((e) => ({ ...e, type: 'festival' as const })),
      ...birthdays,
    ]
    const map: Record<number, CombinedEvent[]> = {}
    for (const ev of combined) {
      if (show !== 'all' && show !== ev.type) continue
      map[ev.day] ||= []
      map[ev.day].push(ev)
    }
    return map
  }, [model, birthdays, show])

  const startWeekday = useMemo(() => getStartWeekday(year, season), [year, season])

  const cells = useMemo(() => {
    const out: Array<{ day?: number }> = []
    for (let i = 0; i < startWeekday; i++) out.push({})
    for (let d = 1; d <= model.days; d++) out.push({ day: d })
    while (out.length % 7 !== 0) out.push({})
    return out
  }, [startWeekday, model.days])

  const canPrevSeason = !(year === 1 && season === 'Spring')
  const canNextSeason = true

  function prev() {
    if (!canPrevSeason) return
    const idx = seasons.indexOf(season)
    if (idx === 0) {
      setYear((y) => Math.max(1, y - 1))
      setSeason('Winter')
    } else {
      setSeason(seasons[idx - 1])
    }
  }

  function next() {
    const idx = seasons.indexOf(season)
    if (idx === seasons.length - 1) {
      setYear((y) => y + 1)
      setSeason('Spring')
    } else {
      setSeason(seasons[idx + 1])
    }
  }

  // Update URL when year/season change
  useEffect(() => {
    const next = new URLSearchParams(searchParams)
    const curYear = next.get('year')
    const curSeason = next.get('season')
    const y = String(year)
    const s = season
    if (curYear === y && curSeason === s) return
    next.set('year', y)
    next.set('season', s)
    setSearchParams(next)
  }, [year, season])

  // React to back/forward changing the URL
  useEffect(() => {
    const rawYear = Number(searchParams.get('year') ?? 1)
    const nextYear = Number.isFinite(rawYear) && rawYear >= 1 ? rawYear : 1
    const s = searchParams.get('season')
    const nextSeason = (seasons.find((x) => x === s) as Season) ?? 'Spring'
    if (nextYear !== year) setYear(nextYear)
    if (nextSeason !== season) setSeason(nextSeason)
  }, [searchParams])

  return (
    <div className="relative px-4 md:px-6 py-8">
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_45%_at_50%_0%,black,transparent)]">
        <div className={`absolute inset-x-0 -top-40 h-80 bg-gradient-to-b ${seasonAccent[season]} blur-2xl opacity-40`} />
        <div className="absolute right-6 top-10 opacity-20">
          {season === 'Spring' && <Flower2 className="h-40 w-40 text-rose-300" />}
          {season === 'Summer' && <Sun className="h-40 w-40 text-lime-300" />}
          {season === 'Autumn' && <Leaf className="h-40 w-40 text-amber-300" />}
          {season === 'Winter' && <Snowflake className="h-40 w-40 text-sky-300" />}
        </div>
      </div>
      <header className="mb-4 sm:mb-6 flex flex-col gap-3 sm:gap-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 inline-flex items-center justify-center rounded-xl border bg-background">
            <CalendarDays className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">Calendar</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Events and birthdays schedules</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2">
            <button
              className={`h-8 w-8 sm:h-10 sm:w-10 inline-flex items-center justify-center rounded-lg border bg-background ${canPrevSeason ? 'hover:bg-accent' : 'opacity-50 cursor-not-allowed'}`}
              onClick={prev}
              aria-label="Previous season"
              disabled={!canPrevSeason}
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <div className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border bg-background text-sm sm:text-base md:text-lg font-medium min-w-[180px] sm:min-w-[220px] text-center bg-gradient-to-r ${seasonAccent[season]} bg-clip-text text-transparent shadow-sm`}>
              Year {year} • {season}
            </div>
            <button
              className={`h-8 w-8 sm:h-10 sm:w-10 inline-flex items-center justify-center rounded-lg border bg-background ${canNextSeason ? 'hover:bg-accent' : 'opacity-50 cursor-not-allowed'}`}
              onClick={next}
              aria-label="Next season"
              disabled={!canNextSeason}
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          <div className="inline-flex rounded-full border bg-secondary p-0.5 sm:p-1">
            {(['all', 'festival', 'birthday'] as const).map((k) => (
              <button key={k} onClick={() => setShow(k)} className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm md:text-base ${show === k ? 'bg-background shadow-sm' : 'hover:bg-accent/60'}`}>
                {k === 'all' ? 'All' : k === 'festival' ? 'Festivals' : 'Birthdays'}
              </button>
            ))}
          </div>
        </div>
      </header>

      

      <div className="overflow-x-auto rounded-2xl border bg-card/70 p-2 sm:p-3 md:p-4 shadow-xl">
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {weekdays.map((w) => (
            <div key={w} className="text-center text-[11px] sm:text-sm font-medium text-muted-foreground py-0.5 sm:py-1">{w}</div>
          ))}
          {cells.map((cell, idx) => (
            <div key={idx} className={`min-h-[84px] sm:min-h-[96px] md:min-h-[116px] rounded-xl border p-1.5 sm:p-2 relative ${typeof cell.day === 'number' ? 'bg-background' : 'bg-muted/40'} ${((idx % 7) === 6) ? 'ring-0' : ''} ${typeof cell.day === 'number' ? 'hover:bg-accent/5 transition' : ''}`}>
              {typeof cell.day === 'number' && (
                <>
                  <div className="text-[12px] sm:text-[13px] font-semibold text-muted-foreground">{cell.day}</div>
                  <div className="mt-1 space-y-1">
                    {eventsByDay[cell.day]?.map((ev, i) => (
                      <div key={i} className="flex items-center gap-2">
                        {ev.type === 'festival' ? (
                          <>
                            <Flag className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                            <span className="text-xs sm:text-sm md:text-[15px] leading-tight">{ev.title}</span>
                          </>
                        ) : (
                          ev.residentName ? (
                            <Link
                              to={`/?resident=${encodeURIComponent(ev.residentName)}`}
                              aria-label={`View ${ev.residentName} in Residents`}
                              className="group flex items-center gap-2 transition-all duration-200"
                            >
                              <img
                                src={toAvatarFilename(ev.residentName)}
                                alt={ev.residentName}
                                className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full border object-cover shrink-0 transition-all duration-200 group-hover:ring-2 group-hover:ring-ring group-hover:ring-offset-1 group-hover:ring-offset-background group-hover:scale-105"
                                onError={(e) => { (e.currentTarget as HTMLImageElement).src = withBase('/vite.svg') }}
                              />
                              <span className="text-xs sm:text-sm md:text-[15px] leading-tight transition-all duration-200 group-hover:text-foreground group-hover:font-medium">{ev.title}</span>
                            </Link>
                          ) : (
                            <span className="text-xs sm:text-sm md:text-[15px] leading-tight">{ev.title}</span>
                          )
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
              {typeof cell.day === 'number' && ((idx % 7) === 6) && (
                <div className="absolute right-1 top-1 inline-flex items-center gap-1 rounded-md border bg-background/95 px-1.5 py-0.5 sm:px-2 sm:py-1 shadow-sm">
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-sky-500" />
                  <span className="text-[10px] sm:text-[12px] font-medium text-sky-500">Bazaar Day</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Legend />
    </div>
  )
}

function Legend() {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
      <div className="inline-flex items-center gap-2"><Flag className="h-5 w-5 text-green-600" /><span>Festival</span></div>
      <div className="inline-flex items-center gap-2"><Bell className="h-6 w-6 text-sky-500" /><span>Bazaar Day (Saturday)</span></div>
    </div>
  )
}

// Compute the weekday the 1st falls on for a given (year, season)
// Sunday:0 ... Saturday:6
function getStartWeekday(year: number, season: Season): number {
  // Base: Year 1 Spring starts on Saturday (6) from screenshots
  const base = 6
  const seasonIndex = seasons.indexOf(season)
  const seasonOffset = seasonIndex * 3 // 31 days per season => +3 weekday shift
  const yearOffset = ((year - 1) * ((4 * 31) % 7)) % 7 // each full year shifts 124 % 7 = 5
  return (base + seasonOffset + yearOffset) % 7
}


