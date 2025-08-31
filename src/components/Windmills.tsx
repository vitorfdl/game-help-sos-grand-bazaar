import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Wind, Leaf, Droplets, Sun, Search, ChevronDown } from 'lucide-react'
import { windmills } from '@/data/windmills'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

function windmillColorFor(id: string) {
  if (id === 'red') return '#ef4444' // rose-500
  if (id === 'blue') return '#0ea5e9' // sky-500
  return '#f59e0b' // amber-500
}

function WindmillIcon({ color, className }: { color: string; className?: string }) {
  // Inline SVG from public/windmill.svg with center fill controlled by `color`.
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="48" height="48" fill="white" fillOpacity="0.01" />
      <path d="M24 24C29.5228 24 34 19.5228 34 14C34 8.47715 29.5228 4 24 4V24Z" fill={color} stroke="#000" strokeWidth="4" strokeLinejoin="round" />
      <path d="M24 24C24 29.5228 28.4772 34 34 34C39.5228 34 44 29.5228 44 24H24Z" fill={color} stroke="#000" strokeWidth="4" strokeLinejoin="round" />
      <path d="M24 24C24 18.4772 19.5228 14 14 14C8.47715 14 4 18.4772 4 24H24Z" fill={color} stroke="#000" strokeWidth="4" strokeLinejoin="round" />
      <path d="M24 24C18.4772 24 14 28.4772 14 34C14 39.5228 18.4772 44 24 44V24Z" fill={color} stroke="#000" strokeWidth="4" strokeLinejoin="round" />
    </svg>
  )
}

type Filter = 'all' | 'red' | 'blue' | 'yellow'

export default function Windmills() {
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<'default' | 'priceAsc' | 'priceDesc'>('default')
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set())
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const [activeWindmill, setActiveWindmill] = useState<Filter>('red')

  const visible = useMemo(() => {
    const wmFiltered = filter === 'all' ? windmills : windmills.filter((w) => w.id === filter)
    const q = query.trim().toLowerCase()
    if (!q) return wmFiltered
    return wmFiltered
      .map((wm) => {
        const sections = wm.sections
          .map((sec) => {
            const items = sec.items.filter((it) => {
              const hay = [
                wm.name,
                sec.title,
                it.name,
                it.info,
                it.sellPrice,
                it.processTime,
                it.harvestTime,
                ...(it.recipe ?? []),
              ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase()
              return hay.includes(q)
            })
            return { ...sec, items }
          })
          .filter((s) => s.items.length > 0)
        return { ...wm, sections }
      })
      .filter((wm) => wm.sections.length > 0)
  }, [filter, query])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        const first = visibleEntries[0]
        if (first) {
          const id = first.target.getAttribute('data-windmill-id') as Filter | null
          if (id) setActiveWindmill(id)
        }
      },
      { root: null, rootMargin: '-25% 0px -65% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    const nodes = Object.values(sectionRefs.current).filter(Boolean) as HTMLElement[]
    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [visible])

  function toggleSection(wmId: string, secId: string) {
    const key = `${wmId}:${secId}`
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <div className="px-4 md:px-6 py-6">
      {/* Toolbar: search, sort and filters (responsive) */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-[340px]">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across all windmills..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border bg-background/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        <div className="sm:flex-1" />

        {/* Sort select */}
        <div className="flex items-center gap-3">
          <Select value={sortKey} onValueChange={(v) => setSortKey(v as any)}>
            <SelectTrigger aria-label="Sort items">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default order</SelectItem>
              <SelectItem value="priceDesc">Price: High → Low</SelectItem>
              <SelectItem value="priceAsc">Price: Low → High</SelectItem>
            </SelectContent>
          </Select>

          {/* Desktop filter pills */}
          <div className="hidden sm:inline-flex rounded-full border bg-secondary p-1">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-sm transition flex items-center gap-2',
                  filter === f.id ? 'bg-background shadow-sm' : 'hover:bg-accent/60',
                )}
              >
                {f.icon}
                <span className="hidden md:inline">{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile filter select */}
        <div className="sm:hidden">
          <Select value={filter} onValueChange={(v) => setFilter(v as Filter)}>
            <SelectTrigger aria-label="Filter windmills">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="red">Red</SelectItem>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="yellow">Yellow</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="sticky top-16 z-20 bg-background/80 backdrop-blur border-b">
        <div className="px-1 py-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <WindmillIcon color={windmillColorFor(activeWindmill)} className="h-4 w-4" />
            <span>
              Viewing: <span className="font-medium text-foreground">{titleFor(activeWindmill)}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-8 mt-4">
        {visible.map((wm) => (
          <section
            key={wm.id}
            data-windmill-id={wm.id}
            ref={(el) => {
              sectionRefs.current[wm.id] = el
            }}
            className="rounded-2xl border bg-card/70 backdrop-blur p-6"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">{wm.name}</h2>
                {wm.description && (
                  <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{wm.description}</p>
                )}
              </div>
              <div className="flex items-center">
                <WindmillIcon color={windmillColorFor(wm.id)} className="h-8 w-8" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {wm.sections.map((section) => (
                <div key={section.id} className="rounded-xl border bg-background/60 overflow-hidden">
                  <button
                    onClick={() => toggleSection(wm.id, section.id)}
                    className="w-full px-4 py-3 border-b flex items-center justify-between text-left hover:bg-accent/40"
                    aria-expanded={expanded.has(`${wm.id}:${section.id}`) || !!query}
                  >
                    <h3 className="text-sm font-medium">{section.title}</h3>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform',
                        expanded.has(`${wm.id}:${section.id}`) || !!query ? 'rotate-180' : '',
                      )}
                    />
                  </button>
                  {(expanded.has(`${wm.id}:${section.id}`) || !!query) && (
                    <div className="p-4">
                      <ul className="space-y-4">
                        {sortedBy(section.items, sortKey).map((item) => (
                          <li key={item.name} className="rounded-lg border bg-card p-4">
                            <div className="flex flex-wrap items-start gap-3 justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{item.name}</span>
                                  {item.unique && (
                                    <span className="text-[11px] rounded px-1.5 py-0.5 bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">Unique</span>
                                  )}
                                </div>
                                {item.info && (
                                  <div className="text-xs text-muted-foreground mt-1 max-w-xl">{item.info}</div>
                                )}
                              </div>
                              <div className="text-xs grid grid-cols-2 gap-x-6 gap-y-1 text-right">
                                {item.sellPrice && (
                                  <>
                                    <span className="text-muted-foreground">Sell Price</span>
                                    <span className="font-medium">{item.sellPrice}</span>
                                  </>
                                )}
                                {item.processTime && (
                                  <>
                                    <span className="text-muted-foreground">Process Time</span>
                                    <span className="font-medium">{item.processTime}</span>
                                  </>
                                )}
                                {item.harvestTime && (
                                  <>
                                    <span className="text-muted-foreground">Harvest Time</span>
                                    <span className="font-medium">{item.harvestTime}</span>
                                  </>
                                )}
                              </div>
                            </div>
                            {item.recipe && item.recipe.length > 0 && (
                              <div className="mt-3 text-[13px]">
                                <span className="text-muted-foreground">Recipe:</span>{' '}
                                <span>{item.recipe.join(' • ')}</span>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

const filters: Array<{ id: Filter; label: string; icon: ReactNode }> = [
  { id: 'all', label: 'All', icon: <Leaf className="h-4 w-4" /> },
  { id: 'red', label: 'Red', icon: <Sun className="h-4 w-4" /> },
  { id: 'blue', label: 'Blue', icon: <Droplets className="h-4 w-4" /> },
  { id: 'yellow', label: 'Yellow', icon: <Wind className="h-4 w-4" /> },
]

function titleFor(id: Filter): string {
  if (id === 'all') return 'All Windmills'
  if (id === 'red') return 'Red Windmill'
  if (id === 'blue') return 'Blue Windmill'
  return 'Yellow Windmill'
}

function sortedBy<T extends { sellPrice?: string }>(items: T[], key: 'default' | 'priceAsc' | 'priceDesc'): T[] {
  if (key === 'default') return items
  const toPrice = (p?: string) => {
    if (!p) return NaN
    const num = Number((p || '').replace(/[^0-9]/g, ''))
    return Number.isNaN(num) ? NaN : num
  }
  const withIndex = items.map((it, idx) => ({ it, idx, price: toPrice(it.sellPrice) }))
  withIndex.sort((a, b) => {
    // Keep original order when price missing
    const aMissing = Number.isNaN(a.price)
    const bMissing = Number.isNaN(b.price)
    if (aMissing && bMissing) return a.idx - b.idx
    if (aMissing) return 1
    if (bMissing) return -1
    if (key === 'priceAsc') return (a.price as number) - (b.price as number)
    return (b.price as number) - (a.price as number)
  })
  return withIndex.map((x) => x.it)
}



