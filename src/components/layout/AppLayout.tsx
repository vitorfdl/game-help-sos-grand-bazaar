import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { Users, Wind, Calendar as CalendarIcon, Github, ChefHat, Store, History, Fish } from 'lucide-react'
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useRepoUpdate } from '@/hooks/use-repo-update'

// Helper function to get page title based on current route
function getPageTitle(pathname: string): string {
  switch (pathname) {
    case '/':
      return 'Residents'
    case '/windmills':
      return 'Windmills'
    case '/calendar':
      return 'Calendar'
    case '/recipes':
      return 'Cooking Recipes'
    case '/fishes':
      return 'Fishes'
    case '/bazaar':
      return 'Bazaar Stalls'
    default:
      return 'SoS: Grand Bazaar'
  }
}

export default function AppLayout() {
  const location = useLocation()
  const repo = useRepoUpdate()

  console.log("update");
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="flex aspect-square size-7 items-center justify-center">
              <img src="/favicon/favicon.svg" alt="SoS: Grand Bazaar" className="size-7" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">SoS: Grand Bazaar</span>
              <span className="truncate text-xs">Reference Sheets</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigate</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === '/'}>
                    <NavLink to="/" end>
                      <Users />
                      <span>Residents</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === '/windmills'}>
                    <NavLink to="/windmills">
                      <Wind />
                      <span>Windmills</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === '/calendar'}>
                    <NavLink to="/calendar">
                      <CalendarIcon />
                      <span>Calendar</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === '/recipes'}>
                    <NavLink to="/recipes">
                      <ChefHat />
                      <span>Cooking Recipes</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === '/fishes'}>
                    <NavLink to="/fishes">
                      <Fish />
                      <span>Fishes</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={location.pathname === '/bazaar'}>
                    <NavLink to="/bazaar">
                      <Store />
                      <span>Bazaar Stalls</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a
                  href="https://github.com/vitorfdl/game-help-sos-grand-bazaar"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github />
                  <span>Contribute on GitHub</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 px-4 border-b bg-background">
          <SidebarTrigger className="-ml-1" />
          <div className="h-6 w-px bg-border mx-2" />
          <h1 className="text-lg font-semibold">{getPageTitle(location.pathname)}</h1>
          <div className="ml-auto" />
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://github.com/vitorfdl/game-help-sos-grand-bazaar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Badge variant="outline" className="gap-1.5">
                  <span className="relative mr-1 inline-flex size-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500/40 animate-ping" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                  <History className="size-3 opacity-80" />
                  <span className="hidden sm:inline">{repo.loading ? 'Fetching latest update…' : repo.relativeLabel ? `Updated ${repo.relativeLabel}` : 'Update unavailable'}</span>
                  <span className="sm:hidden">{repo.loading ? '…' : repo.relativeLabel ?? '—'}</span>
                </Badge>
              </a>
            </TooltipTrigger>
            <TooltipContent sideOffset={8}>
              {repo.error ? (
                <span>Update unavailable: {repo.error}</span>
              ) : repo.isoTimestamp ? (
                <span>Last pushed at {new Date(repo.isoTimestamp).toLocaleString()}</span>
              ) : (
                <span>Fetching latest update…</span>
              )}
            </TooltipContent>
          </Tooltip>
        </header>
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}




