import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  className?: string
}

export function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  className 
}: CategoryFilterProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <Badge
        variant={selectedCategory === 'all' ? 'default' : 'secondary'}
        className="cursor-pointer hover:bg-primary/80 transition-colors"
        onClick={() => onCategoryChange('all')}
      >
        All
      </Badge>
      {categories.map((category) => (
        <Badge
          key={category}
          variant={selectedCategory === category ? 'default' : 'secondary'}
          className="cursor-pointer hover:bg-primary/80 transition-colors"
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  )
}
