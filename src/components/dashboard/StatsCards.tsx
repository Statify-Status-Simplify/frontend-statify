import React from 'react'
import { Activity, TrendingUp, AlertCircle, Zap } from 'lucide-react'

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
      color: 'text-primary',
    },
    {
      title: 'Currently UP',
      value: '11',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'text-success',
    },
    {
      title: 'Currently DOWN',
      value: '1',
      icon: <AlertCircle className="h-6 w-6" />,
      color: 'text-danger',
    },
    {
      title: 'Average Uptime',
      value: '99.8%',
      icon: <Zap className="h-6 w-6" />,
      color: 'text-warning',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="rounded-lg border border-gray-700 bg-secondary p-6 hover:border-primary/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">{stat.title}</p>
              <p className="mt-2 text-3xl font-bold text-foreground">
                {stat.value}
              </p>
            </div>
            <div className={`${stat.color} opacity-80`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export { StatsCards }
