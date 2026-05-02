import { useState } from 'react'
import { Badge } from '../ui/Badge'
import { MoreVertical, Copy, Pause, Trash2 } from 'lucide-react'
import { cn } from '../../lib/utils'

interface MonitorCardProps {
  id: string
  name: string
  url: string
  type: 'http' | 'heartbeat'
  status: 'up' | 'down' | 'warning'
  uptime: number
  history: number[]
}

export function MonitorCard({
  name,
  url,
  type,
  status,
  uptime,
  history,
}: MonitorCardProps) {
  const [showMenu, setShowMenu] = useState(false)

  const statusConfig = {
    up: { color: 'bg-emerald-500', label: 'Healthy', badge: 'success' as const },
    down: { color: 'bg-rose-500', label: 'Down', badge: 'destructive' as const },
    warning: { color: 'bg-amber-500', label: 'Degraded', badge: 'warning' as const },
  }

  const config = statusConfig[status]

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all group">
      <div className="flex items-start justify-between gap-4">
        {/* Left Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-zinc-100 truncate group-hover:text-white transition-colors">{name}</h3>
            <Badge variant={type === 'http' ? 'secondary' : 'default'}>
              {type === 'http' ? 'HTTP' : 'IoT'}
            </Badge>
          </div>

          <p className="mt-1 text-xs text-zinc-400 truncate font-mono">{url}</p>

          {/* Status Indicator */}
          <div className="flex items-center gap-2 mt-5">
            <div
              className={cn(
                'h-2 w-2 rounded-full',
                config.color,
                status === 'up' && 'animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.4)]',
                status === 'down' && 'shadow-[0_0_12px_rgba(244,63,94,0.4)]',
                status === 'warning' && 'shadow-[0_0_12px_rgba(245,158,11,0.4)]'
              )}
            />
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-wide">
              {config.label}
            </span>
            <span className="text-[10px] font-bold text-zinc-400 ml-auto uppercase tracking-wider">
              {uptime}% UPTIME
            </span>
          </div>

          {/* History Sparkline */}
          <div className="mt-4 flex items-center gap-[1.5px]">
            {history.map((value, index) => (
              <div
                key={index}
                className="h-6 flex-1 rounded-[0.5px] transition-all"
                style={{
                  backgroundColor:
                    value === 1
                      ? 'rgba(16, 185, 129, 0.3)' // Softened Emerald
                      : value === 0.5
                        ? 'rgba(245, 158, 11, 0.5)'
                        : 'rgba(244, 63, 94, 0.8)', // Rose
                }}
              />
            ))}
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-all border border-transparent hover:border-zinc-700"
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-zinc-800 bg-zinc-900 p-1.5 shadow-2xl z-10 backdrop-blur-xl">
              <button className="w-full px-3 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white flex items-center gap-2 transition-all rounded-lg">
                <Copy className="h-4 w-4 text-zinc-400" />
                Edit
              </button>
              <button className="w-full px-3 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white flex items-center gap-2 transition-all rounded-lg">
                <Pause className="h-4 w-4 text-zinc-400" />
                Pause
              </button>
              <button className="w-full px-3 py-2 text-left text-sm text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition-all rounded-lg">
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
