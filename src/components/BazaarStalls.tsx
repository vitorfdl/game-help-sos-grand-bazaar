import { useMemo, useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { bazaarData, type BazaarItem } from '@/data/stalls'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type FilterId = 'all' | string

export default function BazaarStalls() {
  const [filter, setFilter] = useState<FilterId>('all')
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<'default' | 'priceAsc' | 'priceDesc'>('default')
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set())

  const stalls = useMemo(() => bazaarData.map((s) => ({ ...s, id: slugify(s.name) })), [])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const base = filter === 'all' ? stalls : stalls.filter((s) => s.id === filter)
    if (!q) return base
    return base
      .map((s) => {
        const items = s.items.filter((it) => includesQuery(s, it, q))
        return { ...s, items }
      })
      .filter((s) => s.items.length > 0)
  }, [filter, query, stalls])

  function toggle(stallId: string) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(stallId)) next.delete(stallId)
      else next.add(stallId)
      return next
    })
  }

  return (
    <div className="px-4 md:px-6 py-6">
      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-[360px]">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stalls and items..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border bg-background/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        <div className="sm:flex-1" />

        <div className="flex items-center gap-3">
          {/* Sort */}
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

        </div>

        {/* Mobile filter select */}
        <div className="sm:hidden">
          <Select value={filter} onValueChange={(v) => setFilter(v as FilterId)}>
            <SelectTrigger aria-label="Filter stalls">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stalls</SelectItem>
              {stalls.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="sticky top-16 z-20 bg-background/80 backdrop-blur border-b">
        <div className="px-1 py-2 text-sm text-muted-foreground">
          Viewing: <span className="font-medium text-foreground">{filter === 'all' ? 'All Stalls' : displayNameFor(stalls, filter)}</span>
        </div>
      </div>

      <div className="space-y-6 mt-4">
        {visible.map((stall) => (
          <section key={stall.id} className="rounded-2xl border bg-card/70 backdrop-blur p-6">
            <button
              onClick={() => toggle(stall.id)}
              className="w-full text-left flex items-start justify-between gap-4"
              aria-expanded={expanded.has(stall.id) || !!query}
            >
              <div>
                <h2 className="text-xl font-semibold tracking-tight">{stall.name}</h2>
                {stall.description && (
                  <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{stall.description}</p>
                )}
              </div>
              <ChevronDown
                className={cn(
                  'h-5 w-5 mt-1 transition-transform',
                  expanded.has(stall.id) || !!query ? 'rotate-180' : '',
                )}
              />
            </button>

            {(expanded.has(stall.id) || !!query) && (
              <div className="mt-4">
                <ul className="grid grid-cols-1 gap-4">
                  {sortedItems(stall.items, sortKey).map((item) => (
                    <li key={item.name} className="rounded-xl border bg-background/60 p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-[200px]">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.name}</span>
                            {item.category && (
                              <Badge variant="secondary" className="text-[11px]">
                                {item.category}
                              </Badge>
                            )}
                          </div>
                          {(item.notes || item.unlockWhen) && (
                            <div className="text-xs text-muted-foreground mt-1 max-w-2xl space-y-1">
                              {item.notes && <div>{item.notes}</div>}
                              {item.unlockWhen && (
                                <div>
                                  <span className="text-foreground/70">Unlock:</span> {item.unlockWhen}
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="text-right text-sm grid grid-cols-2 gap-x-6 gap-y-1">
                          <span className="text-muted-foreground">Price</span>
                          <span className="font-medium">{formatPrice(item)}</span>
                          {item.unit && (
                            <>
                              <span className="text-muted-foreground">Unit</span>
                              <span className="font-medium">{item.unit}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  )
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function includesQuery(stall: { name: string; description: string }, item: BazaarItem, q: string): boolean {
  const haystack = [
    stall.name,
    stall.description,
    item.name,
    String(item.price ?? ''),
    item.unit ?? '',
    item.category ?? '',
    item.notes ?? '',
    item.unlockWhen ?? '',
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
  return haystack.includes(q)
}

function toNumber(price: number | string | undefined): number {
  if (typeof price === 'number') return price
  if (!price) return NaN
  const num = Number(String(price).replace(/[^0-9]/g, ''))
  return Number.isNaN(num) ? NaN : num
}

function sortedItems(items: BazaarItem[], key: 'default' | 'priceAsc' | 'priceDesc'): BazaarItem[] {
  if (key === 'default') return items
  const withIndex = items.map((it, idx) => ({ it, idx, price: toNumber(it.price) }))
  withIndex.sort((a, b) => {
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

function formatPrice(item: BazaarItem): string {
  const num = toNumber(item.price)
  const formatted = Number.isNaN(num) ? String(item.price) : new Intl.NumberFormat().format(num)
  const unit = item.unit ?? ''
  if (!unit) return formatted
  if (unit === 'G') return `${formatted} G`
  return `${formatted} ${unit}`
}

function displayNameFor(stalls: Array<{ id: string; name: string }>, id: string): string {
  const s = stalls.find((x) => x.id === id)
  return s ? s.name : 'All Stalls'
}


