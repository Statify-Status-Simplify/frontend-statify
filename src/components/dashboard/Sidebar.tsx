import React from 'react'
import {
  LayoutDashboard,
  Radio,
  Zap,
  Settings,
  ChevronRight,
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
    <aside className="w-64 border-r border-gray-700 bg-secondary p-4 flex flex-col h-screen">
      {/* Logo */}
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-bold text-primary">Statify</h1>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.id

          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                isActive
                  ? 'bg-primary text-black'
                  : 'text-muted hover:bg-background hover:text-foreground'
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </div>
              {isActive && <ChevronRight className="h-4 w-4" />}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-700 pt-4">
        <p className="text-xs text-muted text-center">
          Statify v1.0
        </p>
      </div>
    </aside>
  )
}

export { Sidebar }
