import { useState } from 'react'
import { Activity, Menu, X, LogOut, Plus, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import { Button } from './components/ui/Button'
import { Input } from './components/ui/Input'

interface Monitor {
  id: string
  name: string
  url: string
  type: 'http' | 'heartbeat'
  status: 'up' | 'down' | 'warning'
  uptime: number
  history: number[]
}

const sampleMonitors: Monitor[] = [
  {
    id: '1',
    name: 'API Server',
    url: 'https://api.example.com/health',
    type: 'http',
    status: 'up',
    uptime: 99.9,
    history: [1, 1, 1, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  },
  {
    id: '2',
    name: 'Website',
    url: 'https://example.com',
    type: 'http',
    status: 'down',
    uptime: 95.2,
    history: [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  },
  {
    id: '3',
    name: 'IoT Sensor 001',
    url: 'webhook.iot.example.com',
    type: 'heartbeat',
    status: 'up',
    uptime: 99.5,
    history: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  },
  {
    id: '4',
    name: 'Database',
    url: 'db.example.com:5432',
    type: 'http',
    status: 'warning',
    uptime: 98.1,
    history: [1, 1, 1, 1, 1, 1, 1, 1, 0.8, 0.9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  },
]

function StatCard({ label, value, icon: Icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm font-medium text-zinc-400">{label}</p>
        <div className="text-zinc-500">{Icon}</div>
      </div>
      <p className="text-4xl font-semibold text-white">{value}</p>
    </div>
  )
}

function MonitorCard({ monitor }: { monitor: Monitor }) {
  const statusConfig = {
    up: { color: 'bg-emerald-500', label: 'UP', textColor: 'text-emerald-400' },
    down: { color: 'bg-red-500', label: 'DOWN', textColor: 'text-red-400' },
    warning: { color: 'bg-amber-500', label: 'WARNING', textColor: 'text-amber-400' },
  }

  const config = statusConfig[monitor.status]
  const maxHeight = 48

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 hover:border-zinc-700 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">{monitor.name}</h3>
          <p className="text-sm text-zinc-500">{monitor.url}</p>
        </div>
        <span className="inline-block bg-zinc-800 text-zinc-200 text-xs font-medium px-3 py-1.5 rounded">
          {monitor.type === 'http' ? 'HTTP' : 'IoT'}
        </span>
      </div>

      {/* Status and Metrics */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${config.color}`}></div>
          <span className={`text-sm font-medium ${config.textColor}`}>{config.label}</span>
        </div>
        <p className="text-sm font-medium text-white">{monitor.uptime}% uptime</p>
      </div>

      {/* Sparkline */}
      <div className="flex items-end gap-1 h-16">
        {monitor.history.map((value, idx) => (
          <div
            key={idx}
            className="flex-1 bg-zinc-700 rounded-sm opacity-80 hover:opacity-100 transition-opacity"
            style={{ height: `${Math.max(value * maxHeight, 2)}px` }}
            title={`${(value * 100).toFixed(0)}%`}
          ></div>
        ))}
      </div>
    </div>
  )
}

function AuthView({ onLogin }: { onLogin: () => void }) {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-indigo-950/15 overflow-hidden">
        <div className="p-8 sm:p-10">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-2 text-indigo-500">
              <Activity className="h-5 w-5" />
              <span className="text-xl font-bold tracking-tight text-white">Statify</span>
            </div>
            <h1 className="text-2xl font-semibold text-white">Sign in to continue</h1>
            <p className="mx-auto max-w-xs text-sm leading-6 text-zinc-400">
              Monitor uptime, track performance, and get alerts from a unified enterprise dashboard.
            </p>
          </div>

          <div className="mt-10 space-y-6">
            {isSignup && (
              <div>
                <label className="block mb-2 text-sm font-medium text-zinc-300">Full name</label>
                <Input
                  type="text"
                  placeholder="Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 rounded-md border-zinc-800 bg-zinc-950/50"
                />
              </div>
            )}

            <div>
              <label className="block mb-2 text-sm font-medium text-zinc-300">Email address</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 rounded-md border-zinc-800 bg-zinc-950/50"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-zinc-300">Password</label>
                <button type="button" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">
                  Forgot password?
                </button>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 rounded-md border-zinc-800 bg-zinc-950/50"
              />
            </div>

            <Button
              onClick={onLogin}
              variant="default"
              className="w-full h-10 rounded-md bg-indigo-600 hover:bg-indigo-500 font-medium mt-4"
            >
              {isSignup ? 'Create account' : 'Sign in'}
            </Button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-zinc-400">
            <p>{isSignup ? 'Already have an account?' : "Don't have an account?"}</p>
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-indigo-400 hover:text-indigo-300 font-medium"
            >
              {isSignup ? 'Sign in' : 'Sign up'}
            </button>
          </div>

          <div className="mt-6 border-t border-zinc-800 pt-4 text-center text-sm">
            <button onClick={onLogin} className="text-indigo-400 hover:text-indigo-300 font-medium underline">
              [Dev: Bypass to Dashboard]
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardView({ onLogout }: { onLogout: () => void }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const stats = [
    { label: 'Running', value: '3', icon: <CheckCircle2 className="w-5 h-5" /> },
    { label: 'Issues', value: '1', icon: <AlertCircle className="w-5 h-5" /> },
    { label: 'Uptime', value: '99.2%', icon: <Clock className="w-5 h-5" /> },
    { label: 'Total Monitors', value: '4', icon: <Clock className="w-5 h-5" /> },
  ]

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-zinc-900 border-r border-zinc-800 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0'} overflow-hidden z-30`}>
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-lg">
              <div className="text-white font-bold text-lg">S</div>
            </div>
            <h1 className="text-lg font-bold text-white">Statify</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {[
              { label: 'Dashboard', icon: '📊' },
              { label: 'Monitors', icon: '📡' },
              { label: 'Alerts', icon: '🔔' },
              { label: 'Settings', icon: '⚙️' },
              { label: 'Help', icon: '❓' },
            ].map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors text-left text-sm font-medium"
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="pt-6 border-t border-zinc-800">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-950 transition-colors text-left text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Header */}
        <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-20">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-zinc-400 hover:text-white p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <h2 className="text-xl font-semibold text-white">Dashboard</h2>
            </div>
            <div className="flex items-center gap-3">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
                <Plus className="w-4 h-4" />
                New Monitor
              </Button>
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-10">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          {/* Monitors Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-8">Monitors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {sampleMonitors.map((monitor) => (
                <MonitorCard key={monitor.id} monitor={monitor} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      {!isLoggedIn ? (
        <AuthView onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <DashboardView onLogout={() => setIsLoggedIn(false)} />
      )}
    </>
  )
}
