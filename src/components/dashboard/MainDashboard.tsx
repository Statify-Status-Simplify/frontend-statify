import { useState } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { StatsCards } from './StatsCards'
import { MonitorCard } from './MonitorCard'
import { MonitorList } from './MonitorList'
import { CreateMonitorDialog } from './CreateMonitorDialog'
import { Button } from '../ui/Button'
import { Tabs, TabsList, TabsTrigger } from '../ui/Tabs'
import { Plus } from 'lucide-react'

interface MainDashboardProps {
  onLogout: () => void
}

const sampleMonitors = [
  {
    id: '1',
    name: 'API Server',
    url: 'https://api.example.com/health',
    type: 'http' as const,
    status: 'up' as const,
    uptime: 99.9,
    history: [1, 1, 1, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  },
  {
    id: '2',
    name: 'Website',
    url: 'https://example.com',
    type: 'http' as const,
    status: 'down' as const,
    uptime: 95.2,
    history: [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  },
  {
    id: '3',
    name: 'IoT Sensor 001',
    url: 'webhook.iot.example.com',
    type: 'heartbeat' as const,
    status: 'up' as const,
    uptime: 99.5,
    history: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  },
  {
    id: '4',
    name: 'Database',
    url: 'db.example.com:5432',
    type: 'http' as const,
    status: 'warning' as const,
    uptime: 98.1,
    history: [1, 1, 1, 1, 0.5, 0.5, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  },
  {
    id: '5',
    name: 'CDN Edge',
    url: 'cdn.example.com',
    type: 'http' as const,
    status: 'up' as const,
    uptime: 99.99,
    history: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  },
  {
    id: '6',
    name: 'Mobile App Server',
    url: 'app-api.example.com',
    type: 'http' as const,
    status: 'up' as const,
    uptime: 99.7,
    history: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  },
]

const tableMonitors = [
  {
    id: '1',
    name: 'API Server',
    url: 'https://api.example.com/health',
    type: 'http' as const,
    status: 'up' as const,
    uptime: 99.9,
    lastCheck: '2 minutes ago',
  },
  {
    id: '2',
    name: 'Website',
    url: 'https://example.com',
    type: 'http' as const,
    status: 'down' as const,
    uptime: 95.2,
    lastCheck: '15 seconds ago',
  },
  {
    id: '3',
    name: 'IoT Sensor 001',
    url: 'webhook.iot.example.com',
    type: 'heartbeat' as const,
    status: 'up' as const,
    uptime: 99.5,
    lastCheck: '1 minute ago',
  },
  {
    id: '4',
    name: 'Database',
    url: 'db.example.com:5432',
    type: 'http' as const,
    status: 'warning' as const,
    uptime: 98.1,
    lastCheck: '30 seconds ago',
  },
]

export function MainDashboard({ onLogout }: MainDashboardProps) {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [createMonitorOpen, setCreateMonitorOpen] = useState(false)

  return (
    <div className="flex h-screen bg-zinc-950 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 relative overflow-hidden">
      {/* Subtle Gradient Overlay */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Sidebar */}
      <Sidebar activeItem={activeNav} onItemClick={setActiveNav} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Header */}
        <Header onLogout={onLogout} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-(--container-2xl) mx-auto px-8 pt-10 pb-20">
            {activeNav === 'dashboard' && (
              <div className="space-y-16">
                {/* Page Header */}
                <div className="flex items-end justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h1 className="text-4xl font-extrabold tracking-tight text-white">
                        Dashboard
                      </h1>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-emerald-500 tracking-widest">LIVE</span>
                      </div>
                    </div>
                    <p className="text-zinc-400 font-medium">
                      Real-time status of your global digital infrastructure.
                    </p>
                  </div>
                  <Button
                    onClick={() => setCreateMonitorOpen(true)}
                    size="lg"
                    className="gap-2 shadow-lg shadow-indigo-500/10"
                  >
                    <Plus className="h-4 w-4" />
                    New Monitor
                  </Button>
                </div>

                {/* Stats Cards */}
                <StatsCards />

                {/* Monitors Section */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-bold text-white tracking-tight">
                        Active Monitors
                      </h2>
                      <div className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-zinc-400 uppercase">
                        {sampleMonitors.length} Total
                      </div>
                    </div>
                    <Tabs
                      value={viewMode}
                      onValueChange={(value) =>
                        setViewMode(value as 'grid' | 'list')
                      }
                    >
                      <TabsList className="bg-zinc-900 border border-zinc-800 p-1">
                        <TabsTrigger value="grid" className="rounded-md">Grid</TabsTrigger>
                        <TabsTrigger value="list" className="rounded-md">List</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  {/* Grid View */}
                  {viewMode === 'grid' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {sampleMonitors.map((monitor) => (
                        <MonitorCard key={monitor.id} {...monitor} />
                      ))}
                    </div>
                  )}

                  {/* List View */}
                  {viewMode === 'list' && (
                    <MonitorList monitors={tableMonitors} />
                  )}
                </div>
              </div>
            )}

            {activeNav === 'monitors' && (
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-6">
                  All Monitors
                </h1>
                <div className="grid grid-cols-1 gap-4">
                  {sampleMonitors.map((monitor) => (
                    <MonitorCard key={monitor.id} {...monitor} />
                  ))}
                </div>
              </div>
            )}

            {activeNav === 'integrations' && (
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-4">
                  Integrations
                </h1>
                <div className="rounded-lg border border-gray-700 bg-secondary p-8 text-center">
                  <p className="text-muted">Integration settings coming soon...</p>
                </div>
              </div>
            )}

            {activeNav === 'settings' && (
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-4">
                  Settings
                </h1>
                <div className="rounded-lg border border-gray-700 bg-secondary p-8 text-center">
                  <p className="text-muted">Settings page coming soon...</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Create Monitor Dialog */}
      <CreateMonitorDialog
        open={createMonitorOpen}
        onOpenChange={setCreateMonitorOpen}
      />
    </div>
  )
}
