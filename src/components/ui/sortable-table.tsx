import { ArrowUp, ArrowDown } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export type SortColumn = string
export type SortDirection = 'asc' | 'desc'

export interface SortableTableColumn<T> {
  key: string
  label: string
  className?: string
  sortable?: boolean
  render: (item: T) => React.ReactNode
}

interface SortableTableProps<T> {
  data: T[]
  columns: SortableTableColumn<T>[]
  sortColumn: SortColumn
  sortDirection: SortDirection
  onSort: (column: SortColumn) => void
  getRowKey: (item: T) => string
}

export function SortableTable<T>({
  data,
  columns,
  sortColumn,
  sortDirection,
  onSort,
  getRowKey,
}: SortableTableProps<T>) {
  const SortableHeader = ({ column, children, className }: { 
    column: SortColumn; 
    children: React.ReactNode; 
    className?: string 
  }) => {
    const isActive = sortColumn === column
    const isAsc = sortDirection === 'asc'
    
    return (
      <TableHead 
        className={`cursor-pointer select-none hover:bg-muted/50 transition-colors ${className || ''}`}
        onClick={() => onSort(column)}
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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            column.sortable !== false ? (
              <SortableHeader key={column.key} column={column.key} className={column.className}>
                {column.label}
              </SortableHeader>
            ) : (
              <TableHead key={column.key} className={column.className}>
                {column.label}
              </TableHead>
            )
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={getRowKey(item)} className="hover:bg-muted/50">
            {columns.map((column) => (
              <TableCell key={column.key} className={column.className}>
                {column.render(item)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
