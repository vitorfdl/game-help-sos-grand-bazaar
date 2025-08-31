import { useMemo, useState } from 'react'
import { Search, ChevronDown, Gem, Package, Hammer, Leaf } from 'lucide-react'
import { bazaarData, type BazaarItem } from '@/data/stalls'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type FilterId = 'all' | string

function getStallIcon(stallId: string) {
  switch (stallId) {
    case 'lloyd-s-stall':
      return <Gem className="h-5 w-5" />
    case 'isaac-s-stall':
      return <Package className="h-5 w-5" />
    case 'garon-s-stall':
      return <Hammer className="h-5 w-5" />
    case 'ramon-s-critters-stall':
      return <img src={assetPath('cow.svg')} alt="Cow" className="h-5 w-5" />
    case 'sprite-stall':
      return <Leaf className="h-5 w-5" />
    default:
      return <Package className="h-5 w-5" />
  }
}
function assetPath(name: string): string {
  const base = (import.meta as any).env?.BASE_URL ?? '/'
  return `${base}${name}`
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
    <div className="px-2 md:px-6 py-4 md:py-6">
      {/* Toolbar */}
      <div className="mb-3 sm:mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
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
      </div>

      <div className="space-y-5 sm:space-y-6 md:space-y-8 mt-4">
        {visible.map((stall) => (
          <section key={stall.id} className="rounded-2xl border bg-card/70 backdrop-blur p-3 sm:p-4 md:p-6">
            <button
              onClick={() => toggle(stall.id)}
              className="w-full text-left flex items-start justify-between gap-3 sm:gap-4"
              aria-expanded={expanded.has(stall.id) || !!query}
            >
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 rounded-xl bg-secondary/40 text-secondary-foreground flex items-center justify-center ring-1 ring-border">
                  {getStallIcon(stall.id)}
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold tracking-tight">{stall.name}</h2>
                  {stall.description && (
                    <p className="text-[13px] sm:text-sm text-muted-foreground mt-1 max-w-2xl">{stall.description}</p>
                  )}
                </div>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 sm:h-5 sm:w-5 mt-1 transition-transform',
                  expanded.has(stall.id) || !!query ? 'rotate-180' : '',
                )}
              />
            </button>

            {(expanded.has(stall.id) || !!query) && (
              <div className="mt-3 sm:mt-4">
                <ul className="grid grid-cols-1 gap-3 sm:gap-4">
                  {sortedItems(stall.items, sortKey).map((item) => (
                    <li key={item.name} className="rounded-xl border bg-background/60 p-3 sm:p-4">
                      <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-3">
                        <div className="min-w-[200px] text-[13px] sm:text-sm">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.name}</span>
                            {item.category && (
                              <Badge variant="secondary" className="text-[11px]">
                                {item.category}
                              </Badge>
                            )}
                          </div>
                          {(item.notes || item.unlockWhen) && (
                            <div className="text-[12px] sm:text-xs text-muted-foreground mt-1 max-w-2xl space-y-1">
                              {item.notes && <div>{item.notes}</div>}
                              {item.unlockWhen && (
                                <div>
                                  <span className="text-foreground/70">Unlock:</span> {item.unlockWhen}
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="text-right text-xs sm:text-sm grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-1">
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