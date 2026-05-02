import React from 'react'
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
      icon: <Activity className="h-5 w-5" />,
      color: 'text-indigo-500',
    },
    {
      title: 'Currently UP',
      value: '11',
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'text-emerald-500',
    },
    {
      title: 'Currently DOWN',
      value: '1',
      icon: <AlertCircle className="h-5 w-5" />,
      color: 'text-rose-500',
    },
    {
      title: 'Average Uptime',
      value: '99.8%',
      icon: <Zap className="h-5 w-5" />,
      color: 'text-amber-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 hover:bg-zinc-900/60 hover:border-indigo-500/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.05)] transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{stat.title}</p>
            <div className={cn('p-2 rounded-xl bg-zinc-950/50 border border-zinc-800/50 transition-colors group-hover:border-zinc-700', stat.color)}>
              {stat.icon}
            </div>
          </div>
          <p className="text-4xl font-semibold text-white tracking-tight">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  )
}
