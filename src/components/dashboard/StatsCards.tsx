import { Activity, TrendingUp, AlertCircle, Zap } from 'lucide-react'
import { cn } from '../../lib/utils'

interface StatCard {
  title: string
  value: string | number
  icon: React.ReactNode
  color: string
}

export function StatsCards() {
  const stats: StatCard[] = [
    {
      title: 'Total Monitors',
      value: '12',
      icon: <Activity className="h-6 w-6" />,
      color: 'text-indigo-500',
    },
    {
      title: 'Currently UP',
      value: '11',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'text-emerald-500',
    },
    {
      title: 'Currently DOWN',
      value: '1',
      icon: <AlertCircle className="h-6 w-6" />,
      color: 'text-rose-500',
    },
    {
      title: 'Average Uptime',
      value: '99.8%',
      icon: <Zap className="h-6 w-6" />,
      color: 'text-amber-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 hover:bg-zinc-900/80 hover:border-indigo-500/30 hover:shadow-[0_8px_30px_rgba(99,102,241,0.1)] transition-all duration-300 group hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{stat.title}</p>
            <div className={cn('p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800/50 transition-colors group-hover:border-zinc-700/80 shadow-inner', stat.color)}>
              {stat.icon}
            </div>
          </div>
          <p className="text-5xl font-extrabold text-white tracking-tight">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  )
}
