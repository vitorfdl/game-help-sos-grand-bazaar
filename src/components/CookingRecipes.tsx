import { useMemo, useState } from 'react'
import { Search, Info } from 'lucide-react'
import { recipes as allRecipes, type RecipeItem } from '@/data/recipes'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { SortableTable, type SortColumn, type SortDirection } from '@/components/ui/sortable-table'
import { CategoryFilter } from '@/components/ui/category-filter'

type RecipeSortColumn = 'type' | 'name' | 'recipe' | 'utensils' | 'whereToGet' | 'effect' | 'adaptOptions' | 'price'

export default function CookingRecipes() {
  const [query, setQuery] = useState('')
  const [sortColumn, setSortColumn] = useState<RecipeSortColumn>('type')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column as RecipeSortColumn)
      setSortDirection('asc')
    }
  }

  // Get unique categories from recipes
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>()
    allRecipes.forEach(recipe => {
      if (recipe.type) {
        uniqueCategories.add(recipe.type)
      }
    })
    return Array.from(uniqueCategories).sort()
  }, [])

  const filtered: RecipeItem[] = useMemo(() => {
    const q = query.trim().toLowerCase()
    let base = allRecipes
    
    // Filter by category
    if (selectedCategory !== 'all') {
      base = base.filter(r => r.type === selectedCategory)
    }
    
    // Filter by search query
    if (q) {
      base = base.filter((r) => {
        const haystack = [r.dish, r.recipe.join(', ')].join(' ').toLowerCase()
        return haystack.includes(q)
      })
    }
    
    const sorted = [...base]
    const direction = sortDirection === 'asc' ? 1 : -1
    
    sorted.sort((a, b) => {
      let comparison = 0
      
      switch (sortColumn) {
        case 'type':
          comparison = a.type?.localeCompare(b.type ?? '') ?? 0
          break
        case 'name':
          comparison = a.dish.localeCompare(b.dish)
          break
        case 'recipe':
          comparison = a.recipe.join(', ').localeCompare(b.recipe.join(', '))
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
  }, [query, sortColumn, sortDirection, selectedCategory])

  const columns = [
    {
      key: 'type',
      label: 'Type',
      render: (recipe: RecipeItem) => (
        <span className="tabular-nums">{recipe.type ?? '?'}</span>
      )
    },
    {
      key: 'name',
      label: 'Dish',
      render: (recipe: RecipeItem) => (
        <span className="font-medium">{recipe.dish}</span>
      )
    },
    {
      key: 'recipe',
      label: 'Recipe',
      render: (recipe: RecipeItem) => (
        <div className="flex flex-wrap gap-1">
          {recipe.recipe.map((ingredient, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {ingredient}
            </Badge>
          ))}
        </div>
      )
    },
    {
      key: 'utensils',
      label: 'Utensils',
      render: (recipe: RecipeItem) => (
        <span>
          {recipe.utensils?.length ? recipe.utensils.join(', ') : <span className="text-muted-foreground">—</span>}
        </span>
      )
    },
    {
      key: 'whereToGet',
      label: 'Where to get',
      render: (recipe: RecipeItem) => (
        <span>{recipe.whereToGet ?? <span className="text-muted-foreground">—</span>}</span>
      )
    },
    {
      key: 'effect',
      label: 'Effect',
      render: (recipe: RecipeItem) => (
        <span>{recipe.effect ?? <span className="text-muted-foreground">—</span>}</span>
      )
    },
    {
      key: 'adaptOptions',
      label: 'Adapt options',
      render: (recipe: RecipeItem) => (
        <span>
          {recipe.adaptOptions?.length ? recipe.adaptOptions.join(', ') : <span className="text-muted-foreground">—</span>}
        </span>
      )
    },
    {
      key: 'price',
      label: 'Sales Price',
      className: 'text-right',
      render: (recipe: RecipeItem) => (
        <span className="text-right tabular-nums">
          {recipe.salesPrice != null ? `${recipe.salesPrice} G` : '—'}
        </span>
      )
    }
  ]

  return (
    <div className="px-1 md:px-6">
      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
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

      {/* Category Filter */}
      <div className="mb-4">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      <div className="mb-4 inline-flex items-center gap-2 rounded-lg border bg-secondary/60 px-3 py-2 text-sm text-muted-foreground">
        <Info className="h-4 w-4" />
        <span>Content under construction — utensils, source, and adaptation options will be added as we progress.</span>
      </div>

      <SortableTable
        data={filtered}
        columns={columns}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
        getRowKey={(recipe) => recipe.dish}
      />
    </div>
  )
}


