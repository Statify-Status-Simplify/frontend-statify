import React, { useState } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { StatsCards } from './StatsCards'
import { MonitorCard } from './MonitorCard'
import { MonitorList } from './MonitorList'
import { CreateMonitorDialog } from './CreateMonitorDialog'
import { Button } from '../ui/Button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs'
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
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar activeItem={activeNav} onItemClick={setActiveNav} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header onLogout={onLogout} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {activeNav === 'dashboard' && (
              <div>
                {/* Page Header */}
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">
                      Dashboard
                    </h1>
                    <p className="mt-1 text-sm text-muted">
                      Monitor your digital assets in real-time
                    </p>
                  </div>
                  <Button
                    onClick={() => setCreateMonitorOpen(true)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Create Monitor
                  </Button>
                </div>

                {/* Stats Cards */}
                <StatsCards />

                {/* Monitors Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground">
                      Monitors
                    </h2>
                    <Tabs
                      value={viewMode}
                      onValueChange={(value) =>
                        setViewMode(value as 'grid' | 'list')
                      }
                    >
                      <TabsList>
                        <TabsTrigger value="grid">Grid</TabsTrigger>
                        <TabsTrigger value="list">List</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  {/* Grid View */}
                  {viewMode === 'grid' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
