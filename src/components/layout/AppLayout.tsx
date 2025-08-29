import { Outlet, NavLink } from 'react-router-dom'
import { Users, Wind, Calendar as CalendarIcon } from 'lucide-react'
import { SidebarProvider, Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

export default function AppLayout() {
  return (
    <SidebarProvider>
      <SidebarInset>
        <Sidebar className="hidden md:block">
          <SidebarHeader>Grand Bazaar</SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigate</SidebarGroupLabel>
              <SidebarGroupContent>
                <nav className="flex flex-col gap-1">
                  <NavItem to="/" label="Residents" icon={<Users className="h-4 w-4" />} end />
                  <NavItem to="/windmills" label="Windmills" icon={<Wind className="h-4 w-4" />} />
                  <NavItem to="/calendar" label="Calendar" icon={<CalendarIcon className="h-4 w-4" />} />
                </nav>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>© {new Date().getFullYear()}</SidebarFooter>
        </Sidebar>

        <div className="flex-1 min-w-0 flex flex-col">
 
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

function NavItem({ to, label, icon, end }: { to: string; label: string; icon: React.ReactNode; end?: boolean }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          'group inline-flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition',
          'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
          isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : undefined,
        )
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  )
}


