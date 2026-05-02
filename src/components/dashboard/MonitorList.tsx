import React from 'react'
import { Badge } from '../ui/Badge'
import { MoreVertical, Pause, Trash2, Edit } from 'lucide-react'
import { cn } from '../../lib/utils'

interface Monitor {
  id: string
  name: string
  url: string
  type: 'http' | 'heartbeat'
  status: 'up' | 'down' | 'warning'
  uptime: number
  lastCheck: string
}

interface MonitorListProps {
  monitors: Monitor[]
}

export function MonitorList({ monitors }: MonitorListProps) {
  const statusConfig = {
    up: { color: 'bg-success', label: 'UP' },
    down: { color: 'bg-danger', label: 'DOWN' },
    warning: { color: 'bg-warning', label: 'WARNING' },
  }

  return (
    <div className="rounded-lg border border-gray-700 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-700 bg-secondary/50">
            <th className="px-6 py-4 text-left font-semibold text-foreground">
              Monitor
            </th>
            <th className="px-6 py-4 text-left font-semibold text-foreground">
              Type
            </th>
            <th className="px-6 py-4 text-left font-semibold text-foreground">
              Status
            </th>
            <th className="px-6 py-4 text-left font-semibold text-foreground">
              Uptime
            </th>
            <th className="px-6 py-4 text-left font-semibold text-foreground">
              Last Check
            </th>
            <th className="px-6 py-4 text-right font-semibold text-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {monitors.map((monitor) => {
            const config = statusConfig[monitor.status]
            return (
              <tr
                key={monitor.id}
                className="border-b border-gray-700 hover:bg-secondary/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-foreground">{monitor.name}</p>
                    <p className="text-xs text-muted">{monitor.url}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={monitor.type === 'http' ? 'default' : 'secondary'}>
                    {monitor.type === 'http' ? 'HTTP Ping' : 'Heartbeat'}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={cn('h-3 w-3 rounded-full', config.color)} />
                    <span className="font-medium text-foreground">
                      {config.label}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-foreground font-medium">
                    {monitor.uptime}%
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-muted">{monitor.lastCheck}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-1">
                    <button className="rounded-lg p-2 text-muted hover:bg-background hover:text-foreground transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-2 text-muted hover:bg-background hover:text-foreground transition-colors">
                      <Pause className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-2 text-muted hover:bg-background hover:text-danger transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
