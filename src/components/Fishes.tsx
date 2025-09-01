import { useMemo, useState } from 'react'
import { Search, ArrowUp, ArrowDown, Info } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { fishList, type FishEntry, FishSize } from '@/data/fish-list'

type SortColumn = 'name' | 'size' | 'seasons' | 'weather' | 'locations' | 'value'
type SortDirection = 'asc' | 'desc'

export default function Fishes() {
  const [query, setQuery] = useState('')
  const [sortColumn, setSortColumn] = useState<SortColumn>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const SortableHeader = ({ column, children, className }: { 
    column: SortColumn; 
    children: React.ReactNode; 
    className?: string 
  }) => {
    const isActive = sortColumn === column
    const isAsc = sortDirection === 'asc'
    
    return (
      <TableHead 
        className={`cursor-pointer select-none hover:bg-muted/50 transition-colors ${className}`}
        onClick={() => handleSort(column)}
      >
        <div className="flex items-center gap-1">
          {children}
          <div className="flex flex-col">
            <ArrowUp 
              className={`h-3 w-3 ${isActive && isAsc ? 'text-foreground' : 'text-muted-foreground/30'}`} 
            />
            <ArrowDown 
              className={`h-3 w-3 -mt-1 ${isActive && !isAsc ? 'text-foreground' : 'text-muted-foreground/30'}`} 
            />
          </div>
        </div>
      </TableHead>
    )
  }

  const filtered: FishEntry[] = useMemo(() => {
    const q = query.trim().toLowerCase()

    const base = !q
      ? fishList
      : fishList.filter((f) => {
          const haystack = [
            f.fish,
            f.size,
            ...(f.season ?? []),
            ...(f.weather ?? []),
            ...(f.locations ?? []),
            f.baseValue != null ? String(f.baseValue) : ''
          ]
            .join(' ')
            .toLowerCase()
          return haystack.includes(q)
        })

    const sorted = [...base]
    const direction = sortDirection === 'asc' ? 1 : -1

    const sizeOrder: Record<FishSize, number> = {
      [FishSize.Small]: 0,
      [FishSize.Medium]: 1,
      [FishSize.Large]: 2,
      [FishSize.Guardian]: 3,
      [FishSize.Unknown]: 4,
    }

    sorted.sort((a, b) => {
      let comparison = 0

      switch (sortColumn) {
        case 'name':
          comparison = a.fish.localeCompare(b.fish)
          break
        case 'size':
          comparison = (sizeOrder[a.size] ?? 99) - (sizeOrder[b.size] ?? 99)
          break
        case 'seasons': {
          const aS = (a.season ?? []).join(', ')
          const bS = (b.season ?? []).join(', ')
          comparison = aS.localeCompare(bS)
          break
        }
        case 'weather': {
          const aW = (a.weather ?? []).join(', ')
          const bW = (b.weather ?? []).join(', ')
          comparison = aW.localeCompare(bW)
          break
        }
        case 'locations': {
          const aL = (a.locations ?? []).join(', ')
          const bL = (b.locations ?? []).join(', ')
          comparison = aL.localeCompare(bL)
          break
        }
        case 'value': {
          const aV = a.baseValue ?? (sortDirection === 'asc' ? Infinity : -1)
          const bV = b.baseValue ?? (sortDirection === 'asc' ? Infinity : -1)
          comparison = aV - bV
          break
        }
      }

      return direction * comparison || a.fish.localeCompare(b.fish)
    })

    return sorted
  }, [query, sortColumn, sortDirection])

  return (
    <div className="px-1 md:px-6">
      {/* Toolbar: search only (header moved to layout) */}
      <div className="mb-4 flex items-center gap-3">
        <div className="relative w-full sm:w-[340px]">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, season, weather, or location..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border bg-background/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <div className="mb-4 inline-flex items-center gap-2 rounded-lg border bg-secondary/60 px-3 py-2 text-sm text-muted-foreground">
        <Info className="h-4 w-4" />
        <span>Fishing spots, times, and detailed conditions will be expanded over time.</span>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <SortableHeader column="name">Fish</SortableHeader>
            <SortableHeader column="size">Size</SortableHeader>
            <SortableHeader column="seasons">Seasons</SortableHeader>
            <SortableHeader column="weather">Weather</SortableHeader>
            <SortableHeader column="locations">Locations</SortableHeader>
            <SortableHeader column="value" className="text-right">Base Value</SortableHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((f) => (
            <TableRow key={f.fish}>
              <TableCell className="font-medium">{f.fish}</TableCell>
              <TableCell>{f.size}</TableCell>
              <TableCell>
                {f.season?.length ? f.season.join(', ') : <span className="text-muted-foreground">—</span>}
              </TableCell>
              <TableCell>
                {f.weather?.length ? f.weather.join(', ') : <span className="text-muted-foreground">—</span>}
              </TableCell>
              <TableCell>
                {f.locations?.length ? f.locations.join(', ') : <span className="text-muted-foreground">—</span>}
              </TableCell>
              <TableCell className="text-right tabular-nums">{f.baseValue != null ? `${f.baseValue} G` : '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


