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
    up: { color: 'bg-success', label: 'UP', pulse: true },
    down: { color: 'bg-danger', label: 'DOWN', pulse: false },
    warning: { color: 'bg-warning', label: 'WARNING', pulse: false },
  }

  const config = statusConfig[status]

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/30 p-8 hover:bg-zinc-900/60 hover:border-zinc-700 hover:shadow-xl transition-all duration-300 group">
      <div className="flex items-start justify-between gap-6">
        {/* Left Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-bold text-zinc-100 truncate group-hover:text-white transition-colors">{name}</h3>
            <Badge variant={type === 'http' ? 'secondary' : 'default'} className="px-2.5 py-0.5 text-xs">
              {type === 'http' ? 'HTTP' : 'IoT'}
            </Badge>
          </div>

          <p className="mt-2 text-sm text-zinc-400 truncate font-mono bg-zinc-950/50 inline-block px-3 py-1 rounded-lg border border-zinc-800/50">{url}</p>

          {/* Status Indicator */}
          <div className="flex items-center gap-3 mt-8 mb-4">
            <div
              className={cn(
                'h-3 w-3 rounded-full',
                config.color,
                status === 'up' && 'animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]',
                status === 'down' && 'shadow-[0_0_15px_rgba(244,63,94,0.5)]',
                status === 'warning' && 'shadow-[0_0_15px_rgba(245,158,11,0.5)]'
              )}
            />
            <span className="text-sm font-bold text-zinc-300 uppercase tracking-widest">
              {config.label}
            </span>
            <span className="text-xs font-bold text-zinc-500 ml-auto uppercase tracking-widest bg-zinc-950/80 px-3 py-1 rounded-lg border border-zinc-800/50">
              {uptime}% UPTIME
            </span>
          </div>

          {/* History Sparkline */}
          <div className="flex items-center gap-[2px]">
            {history.map((value, index) => (
              <div
                key={index}
                className="h-8 flex-1 rounded-sm transition-all hover:opacity-80"
                style={{
                  backgroundColor:
                    value === 1
                      ? 'rgba(16, 185, 129, 0.4)' // Softened Emerald
                      : value === 0.5
                        ? 'rgba(245, 158, 11, 0.6)'
                        : 'rgba(244, 63, 94, 0.9)', // Rose
                }}
                title={
                  value === 1 ? 'Up' : value === 0.5 ? 'Partial' : 'Down'
                }
              />
            ))}
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="rounded-xl p-2.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-all border border-transparent hover:border-zinc-700"
          >
            <MoreVertical className="h-5 w-5" />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-zinc-800 bg-zinc-900/95 p-2 shadow-2xl z-10 backdrop-blur-xl">
              <button className="w-full px-4 py-2.5 text-left text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white flex items-center gap-3 transition-all rounded-xl font-medium">
                <Copy className="h-4 w-4 text-zinc-400" />
                Edit
              </button>
              <button className="w-full px-4 py-2.5 text-left text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white flex items-center gap-3 transition-all rounded-xl font-medium">
                <Pause className="h-4 w-4 text-zinc-400" />
                Pause
              </button>
              <button className="w-full px-4 py-2.5 text-left text-sm text-rose-400 hover:bg-rose-500/10 flex items-center gap-3 transition-all rounded-xl mt-1 font-medium">
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
