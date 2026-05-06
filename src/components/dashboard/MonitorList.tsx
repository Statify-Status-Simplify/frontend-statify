import { Pause, Trash2, Edit } from 'lucide-react'
import { Badge } from '../ui/Badge'
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
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/20 overflow-hidden shadow-xl">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/80">
            <th className="px-8 py-5 text-left font-bold text-zinc-500 uppercase tracking-widest text-[11px]">
              Monitor
            </th>
            <th className="px-8 py-5 text-left font-bold text-zinc-500 uppercase tracking-widest text-[11px]">
              Type
            </th>
            <th className="px-8 py-5 text-left font-bold text-zinc-500 uppercase tracking-widest text-[11px]">
              Status
            </th>
            <th className="px-8 py-5 text-left font-bold text-zinc-500 uppercase tracking-widest text-[11px]">
              Uptime
            </th>
            <th className="px-8 py-5 text-left font-bold text-zinc-500 uppercase tracking-widest text-[11px]">
              Last Check
            </th>
            <th className="px-8 py-5 text-right font-bold text-zinc-500 uppercase tracking-widest text-[11px]">
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
                className="group hover:bg-zinc-800/30 transition-all duration-300"
              >
                <td className="px-8 py-6">
                  <div>
                    <p className="font-bold text-zinc-200 group-hover:text-white transition-colors text-base">{monitor.name}</p>
                    <p className="text-sm text-zinc-400 font-mono mt-1">{monitor.url}</p>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <Badge variant={monitor.type === 'http' ? 'secondary' : 'default'} className="px-3 py-1">
                    {monitor.type === 'http' ? 'HTTP' : 'IoT'}
                  </Badge>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className={cn('h-2.5 w-2.5 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.1)]', config.color, monitor.status === 'up' && 'animate-pulse')} />
                    <span className="font-bold text-zinc-300 uppercase text-xs tracking-wider">
                      {config.label}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-zinc-200 font-bold bg-zinc-950/50 px-3 py-1.5 rounded-lg border border-zinc-800/50">
                    {monitor.uptime}%
                  </span>
                </td>
                <td className="px-8 py-6">
                  <span className="text-zinc-400 text-sm font-medium">{monitor.lastCheck}</span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="rounded-xl p-2.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-all border border-transparent hover:border-zinc-700">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="rounded-xl p-2.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-all border border-transparent hover:border-zinc-700">
                      <Pause className="h-4 w-4" />
                    </button>
                    <button className="rounded-xl p-2.5 text-zinc-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all border border-transparent hover:border-rose-500/20">
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
