import { useMemo, useState } from 'react'
import { Search, ArrowUp, ArrowDown, Info } from 'lucide-react'
import { recipes as allRecipes, type RecipeItem } from '@/data/recipes'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type SortColumn = 'rank' | 'name' | 'recipe' | 'utensils' | 'whereToGet' | 'effect' | 'adaptOptions' | 'price'
type SortDirection = 'asc' | 'desc'

export default function CookingRecipes() {
  const [query, setQuery] = useState('')
  const [sortColumn, setSortColumn] = useState<SortColumn>('rank')
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

  const filtered: RecipeItem[] = useMemo(() => {
    const q = query.trim().toLowerCase()
    const base = !q
      ? allRecipes
      : allRecipes.filter((r) => {
          const haystack = [r.dish, r.recipeDisplay].join(' ').toLowerCase()
          return haystack.includes(q)
        })
    
    const sorted = [...base]
    const direction = sortDirection === 'asc' ? 1 : -1
    
    sorted.sort((a, b) => {
      let comparison = 0
      
      switch (sortColumn) {
        case 'rank':
          const aRank = a.bazaarRank ?? 99
          const bRank = b.bazaarRank ?? 99
          comparison = aRank - bRank
          break
        case 'name':
          comparison = a.dish.localeCompare(b.dish)
          break
        case 'recipe':
          comparison = a.recipeDisplay.localeCompare(b.recipeDisplay)
          break
        case 'utensils':
          const aUtensils = a.utensils?.join(', ') ?? ''
          const bUtensils = b.utensils?.join(', ') ?? ''
          comparison = aUtensils.localeCompare(bUtensils)
          break
        case 'whereToGet':
          const aWhere = a.whereToGet ?? ''
          const bWhere = b.whereToGet ?? ''
          comparison = aWhere.localeCompare(bWhere)
          break
        case 'effect':
          const aEffect = a.effect ?? ''
          const bEffect = b.effect ?? ''
          comparison = aEffect.localeCompare(bEffect)
          break
        case 'adaptOptions':
          const aAdapt = a.adaptOptions?.join(', ') ?? ''
          const bAdapt = b.adaptOptions?.join(', ') ?? ''
          comparison = aAdapt.localeCompare(bAdapt)
          break
        case 'price':
          const aPrice = a.salesPrice ?? (sortDirection === 'asc' ? Infinity : -1)
          const bPrice = b.salesPrice ?? (sortDirection === 'asc' ? Infinity : -1)
          comparison = aPrice - bPrice
          break
      }
      
      return direction * comparison || a.dish.localeCompare(b.dish)
    })
    
    return sorted
  }, [query, sortColumn, sortDirection])

  return (
    <div className="px-4 md:px-6 py-6">
      {/* Toolbar: search only (header moved to layout) */}
      <div className="mb-4 flex items-center gap-3">
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
        <span>Content under construction — utensils, source, and adaptation options will be added as we progress.</span>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <SortableHeader column="rank">Rank</SortableHeader>
            <SortableHeader column="name">Dish</SortableHeader>
            <SortableHeader column="recipe">Recipe</SortableHeader>
            <SortableHeader column="utensils">Utensils</SortableHeader>
            <SortableHeader column="whereToGet">Where to get</SortableHeader>
            <SortableHeader column="effect">Effect</SortableHeader>
            <SortableHeader column="adaptOptions">Adapt options</SortableHeader>
            <SortableHeader column="price" className="text-right">Sales Price</SortableHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((r) => (
            <TableRow key={r.dish}>
              <TableCell className="tabular-nums">{r.bazaarRank ?? '?'}</TableCell>
              <TableCell className="font-medium">{r.dish}</TableCell>
              <TableCell>
                <span className="text-muted-foreground">{r.recipeDisplay}</span>
              </TableCell>
              <TableCell>
                {r.utensils?.length ? r.utensils.join(', ') : <span className="text-muted-foreground">—</span>}
              </TableCell>
              <TableCell>{r.whereToGet ?? <span className="text-muted-foreground">—</span>}</TableCell>
              <TableCell>{r.effect ?? <span className="text-muted-foreground">—</span>}</TableCell>
              <TableCell>
                {r.adaptOptions?.length ? r.adaptOptions.join(', ') : <span className="text-muted-foreground">—</span>}
              </TableCell>
              <TableCell className="text-right tabular-nums">{r.salesPrice != null ? `${r.salesPrice} G` : '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


