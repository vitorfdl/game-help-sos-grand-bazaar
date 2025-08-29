import * as React from 'react'
import { cn } from '@/lib/utils'

type SidebarContextValue = {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

export function SidebarProvider({ children, defaultOpen = true }: { children: React.ReactNode; defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)
  const value = React.useMemo(() => ({ isOpen, setIsOpen }), [isOpen])
  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

function useSidebar() {
  const ctx = React.useContext(SidebarContext)
  if (!ctx) throw new Error('Sidebar components must be used within <SidebarProvider>')
  return ctx
}

export function Sidebar({ className, children }: { className?: string; children: React.ReactNode }) {
  const { isOpen } = useSidebar()
  return (
    <aside
      className={cn(
        'border-r bg-sidebar text-sidebar-foreground transition-[width] duration-200',
        isOpen ? 'w-64' : 'w-16',
        className,
      )}
    >
      {children}
    </aside>
  )
}

export function SidebarTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { isOpen, setIsOpen } = useSidebar()
  return (
    <button
      aria-label="Toggle sidebar"
      className={cn('inline-flex items-center rounded-md border bg-background px-2 py-1 text-sm hover:bg-accent', className)}
      onClick={() => setIsOpen(!isOpen)}
      {...props}
    />
  )
}

export function SidebarInset({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex min-h-dvh', className)}>{children}</div>
}

export function SidebarContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-2 py-3', className)}>{children}</div>
}

export function SidebarHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-3 py-3 border-b text-sm font-medium', className)}>{children}</div>
}

export function SidebarFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mt-auto px-3 py-3 border-t text-xs text-muted-foreground', className)}>{children}</div>
}

export function SidebarGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('space-y-2', className)}>{children}</div>
}

export function SidebarGroupLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-2 text-[11px] uppercase tracking-wide text-muted-foreground', className)}>{children}</div>
}

export function SidebarGroupContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('space-y-1', className)}>{children}</div>
}

export function SidebarMenu({ children, className }: { children: React.ReactNode; className?: string }) {
  return <nav className={cn('flex flex-col gap-1', className)}>{children}</nav>
}

export function SidebarMenuItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('w-full', className)}>{children}</div>
}

export function SidebarMenuButton(
  {
    className,
    children,
    isActive,
    ...props
  }: React.ButtonHTMLAttributes<HTMLAnchorElement> & { isActive?: boolean; children: React.ReactNode },
) {
  return (
    <a
      className={cn(
        'group inline-flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : undefined,
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}
