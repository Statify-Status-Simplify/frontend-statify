import {
  LayoutDashboard,
  Radio,
  Zap,
  Settings,
} from 'lucide-react'
import { cn } from '../../lib/utils'

interface SidebarProps {
  activeItem: string
  onItemClick: (item: string) => void
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'monitors', label: 'Monitors', icon: Radio },
  { id: 'integrations', label: 'Integrations', icon: Zap },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export function Sidebar({ activeItem, onItemClick }: SidebarProps) {
  return (
    <aside className="w-72 border-r border-zinc-800 bg-zinc-950 p-8 flex flex-col h-screen">
      {/* Logo */}
      <div className="mb-12 px-2 flex items-center gap-4">
        <div className="h-10 w-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Radio className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Statify</h1>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 space-y-2">
        <div className="px-4 mb-6 mt-4">
          <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Main Menu</p>
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.id

          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={cn(
                'w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-all group relative',
                isActive
                  ? 'bg-zinc-800/80 text-white shadow-sm'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
              )}
            >
              <Icon className={cn(
                'h-5 w-5 transition-colors',
                isActive ? 'text-indigo-500' : 'text-zinc-400 group-hover:text-zinc-300'
              )} />
              <span className="text-[15px]">{item.label}</span>
              {isActive && (
                <div className="absolute left-0 w-1.5 h-6 bg-indigo-500 rounded-full" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-zinc-800/80 pt-8 mt-auto">
        <div className="flex items-center gap-4 px-2 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50">
          <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center text-[11px] font-bold text-zinc-300 border border-zinc-700">
            v1.2
          </div>
          <div>
            <p className="text-sm font-bold text-zinc-200">
              Enterprise
            </p>
            <p className="text-xs text-zinc-500 font-medium mt-0.5">
              All systems operational
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
