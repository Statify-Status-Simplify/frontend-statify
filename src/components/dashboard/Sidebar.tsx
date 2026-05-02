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
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950 p-6 flex flex-col h-screen">
      {/* Logo */}
      <div className="mb-10 px-2 flex items-center gap-3">
        <div className="h-8 w-8 bg-indigo-500 rounded-lg flex items-center justify-center">
          <Radio className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight">Statify</h1>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.id

          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group relative',
                isActive
                  ? 'bg-zinc-800/50 text-white shadow-sm'
                  : 'text-zinc-400 hover:bg-zinc-800/30 hover:text-zinc-300'
              )}
            >
              <Icon className={cn(
                'h-5 w-5 transition-colors',
                isActive ? 'text-indigo-500' : 'text-zinc-400 group-hover:text-zinc-300'
              )} />
              <span>{item.label}</span>
              {isActive && (
                <div className="absolute left-0 w-1 h-5 bg-indigo-500 rounded-full" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-zinc-800 pt-6">
        <div className="flex items-center gap-3 px-2">
          <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-400">
            v1.0
          </div>
          <p className="text-xs font-medium text-zinc-400">
            Enterprise Plan
          </p>
        </div>
      </div>
    </aside>
  )
}
