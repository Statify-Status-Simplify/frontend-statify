import { Badge } from '../ui/Badge'
import { Pause, Trash2, Edit } from 'lucide-react'
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
    up: { color: 'bg-emerald-500', label: 'Healthy' },
    down: { color: 'bg-rose-500', label: 'Down' },
    warning: { color: 'bg-amber-500', label: 'Degraded' },
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/20 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/50">
            <th className="px-6 py-4 text-left font-bold text-zinc-400 uppercase tracking-widest text-[10px]">
              Monitor
            </th>
            <th className="px-6 py-4 text-left font-bold text-zinc-400 uppercase tracking-widest text-[10px]">
              Type
            </th>
            <th className="px-6 py-4 text-left font-bold text-zinc-400 uppercase tracking-widest text-[10px]">
              Status
            </th>
            <th className="px-6 py-4 text-left font-bold text-zinc-400 uppercase tracking-widest text-[10px]">
              Uptime
            </th>
            <th className="px-6 py-4 text-left font-bold text-zinc-400 uppercase tracking-widest text-[10px]">
              Last Check
            </th>
            <th className="px-6 py-4 text-right font-bold text-zinc-400 uppercase tracking-widest text-[10px]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/50">
          {monitors.map((monitor) => {
            const config = statusConfig[monitor.status]
            return (
              <tr
                key={monitor.id}
                className="group hover:bg-indigo-500/5 transition-all"
              >
                <td className="px-6 py-5">
                  <div>
                    <p className="font-semibold text-zinc-200 group-hover:text-white transition-colors">{monitor.name}</p>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">{monitor.url}</p>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <Badge variant={monitor.type === 'http' ? 'secondary' : 'default'}>
                    {monitor.type === 'http' ? 'HTTP' : 'IoT'}
                  </Badge>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div className={cn('h-2 w-2 rounded-full', config.color)} />
                    <span className="font-bold text-zinc-300 uppercase text-[11px] tracking-wide">
                      {config.label}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-zinc-200 font-medium">
                    {monitor.uptime}%
                  </span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-zinc-400 text-xs">{monitor.lastCheck}</span>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-1">
                    <button className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-all border border-transparent hover:border-zinc-700">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-all border border-transparent hover:border-zinc-700">
                      <Pause className="h-4 w-4" />
                    </button>
                    <button className="rounded-xl p-2 text-zinc-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all border border-transparent hover:border-rose-500/20">
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
