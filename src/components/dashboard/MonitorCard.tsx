import React, { useState } from 'react'
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
  id,
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
    <div className="rounded-lg border border-gray-700 bg-secondary p-6 hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between gap-4">
        {/* Left Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-foreground truncate">{name}</h3>
            <Badge variant={type === 'http' ? 'default' : 'secondary'}>
              {type === 'http' ? 'HTTP Ping' : 'Heartbeat'}
            </Badge>
          </div>

          <p className="mt-1 text-sm text-muted truncate">{url}</p>

          {/* Status Indicator */}
          <div className="flex items-center gap-2 mt-4">
            <div
              className={cn(
                'h-3 w-3 rounded-full',
                config.color,
                status === 'up' && 'animate-pulse'
              )}
            />
            <span className="text-sm font-medium text-foreground">
              {config.label}
            </span>
            <span className="text-xs text-muted">({uptime}% uptime)</span>
          </div>

          {/* History Sparkline */}
          <div className="mt-4 flex items-center gap-1">
            {history.map((value, index) => (
              <div
                key={index}
                className="h-8 w-1 rounded-sm"
                style={{
                  backgroundColor:
                    value === 1
                      ? '#10b981'
                      : value === 0.5
                        ? '#f59e0b'
                        : '#ef4444',
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
            className="rounded-lg p-2 text-muted hover:bg-background hover:text-foreground transition-colors"
          >
            <MoreVertical className="h-5 w-5" />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-gray-700 bg-secondary shadow-lg z-10">
              <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-background flex items-center gap-2 transition-colors">
                <Copy className="h-4 w-4" />
                Edit
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-background flex items-center gap-2 transition-colors">
                <Pause className="h-4 w-4" />
                Pause
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-danger hover:bg-background flex items-center gap-2 transition-colors rounded-b-lg">
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
