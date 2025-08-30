import { useMemo, useState } from 'react'
import { Search, ChefHat, ArrowDownZA, ArrowDown01, Info } from 'lucide-react'
import { recipes as allRecipes, type RecipeItem } from '@/data/recipes'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

type SortKey = 'rank' | 'priceAsc' | 'priceDesc' | 'name'

export default function CookingRecipes() {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortKey>('rank')

  const filtered: RecipeItem[] = useMemo(() => {
    const q = query.trim().toLowerCase()
    const base = !q
      ? allRecipes
      : allRecipes.filter((r) => {
          const haystack = [r.dish, r.recipeDisplay].join(' ').toLowerCase()
          return haystack.includes(q)
        })
    const sorted = [...base]
    if (sort === 'rank') {
      sorted.sort((a, b) => (a.bazaarRank ?? 99) - (b.bazaarRank ?? 99) || a.dish.localeCompare(b.dish))
    } else if (sort === 'priceAsc') {
      sorted.sort((a, b) => (a.salesPrice ?? Infinity) - (b.salesPrice ?? Infinity) || a.dish.localeCompare(b.dish))
    } else if (sort === 'priceDesc') {
      sorted.sort((a, b) => (b.salesPrice ?? -1) - (a.salesPrice ?? -1) || a.dish.localeCompare(b.dish))
    } else if (sort === 'name') {
      sorted.sort((a, b) => a.dish.localeCompare(b.dish))
    }
    return sorted
  }, [query, sort])

  return (
    <div className="px-4 md:px-6 py-8">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 inline-flex items-center justify-center rounded-xl border bg-background">
            <ChefHat className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Cooking Recipes</h1>
            <p className="text-sm text-muted-foreground">Dishes, ranks, and prices</p>
          </div>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-3">
          <div className="relative">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or ingredient..."
              className="w-[260px] md:w-[340px] pl-9 pr-3 py-2 rounded-lg border bg-background/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger aria-label="Sort by">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rank">
                <span className="inline-flex items-center gap-2"><ArrowDownZA className="h-4 w-4" /> Bazaar Rank</span>
              </SelectItem>
              <SelectItem value="priceDesc">Price: High → Low</SelectItem>
              <SelectItem value="priceAsc">Price: Low → High</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="mb-4 inline-flex items-center gap-2 rounded-lg border bg-secondary/60 px-3 py-2 text-sm text-muted-foreground">
        <Info className="h-4 w-4" />
        <span>Content under construction — utensils, source, and adaptation options will be added as we progress.</span>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Dish</TableHead>
            <TableHead>Recipe</TableHead>
            <TableHead>Utensils</TableHead>
            <TableHead>Where to get</TableHead>
            <TableHead>Adapt options</TableHead>
            <TableHead className="text-right">Sales Price</TableHead>
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


