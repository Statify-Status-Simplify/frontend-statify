import { useState, type ReactNode } from 'react'
import { Activity, LogIn, Menu, X, LogOut, Plus, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
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

function StatCard({ label, value, icon }: { label: string; value: string | number; icon: ReactNode }) {
  return (
    <div className="h-full bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-sm shadow-black/10 transition hover:border-zinc-700 hover:bg-zinc-900/95">
      <div className="flex items-start justify-between gap-4 mb-4">
        <p className="text-xs uppercase tracking-[0.24em] font-semibold text-zinc-400">{label}</p>
        <div className="text-zinc-500">{icon}</div>
      </div>
      <p className="text-3xl font-semibold text-white">{value}</p>
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
    <div className="h-full bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-sm shadow-black/10 transition hover:border-zinc-700 hover:bg-zinc-900/95">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white mb-1.5 truncate">{monitor.name}</h3>
          <p className="text-sm text-zinc-500 truncate">{monitor.url}</p>
        </div>
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.08em] uppercase ${config.color} bg-opacity-15 ${config.textColor}`}>
          {monitor.type === 'http' ? 'HTTP' : 'IoT'}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className={`w-3.5 h-3.5 rounded-full ${config.color}`}></div>
          <span className={`text-sm font-semibold ${config.textColor}`}>{config.label}</span>
        </div>
        <p className="text-sm font-semibold text-white">{monitor.uptime}% uptime</p>
      </div>

      <div className="flex items-end gap-2 h-16">
        {monitor.history.map((value, idx) => (
          <div
            key={idx}
            className="flex-1 rounded-full bg-zinc-800 transition-all duration-200"
            style={{ height: `${Math.max(value * maxHeight, 3)}px` }}
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
    <div className="relative min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12 selection:bg-indigo-500/30 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      <div className="relative w-full max-w-md rounded-2xl border border-zinc-800/60 bg-zinc-900/80 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden transition-all duration-500 hover:border-zinc-700/80 hover:shadow-indigo-900/20">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

        <div className="px-8 py-10 sm:px-10 w-full">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-2 text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)] transition-transform duration-500 hover:scale-105">
              <Activity className="h-6 w-6" />
              <span className="text-2xl font-bold tracking-tight text-white">Statify</span>
            </div>
            <h1 className="text-2xl font-semibold text-white tracking-tight">Sign in to continue</h1>
            <p className="mx-auto max-w-xs text-sm leading-relaxed text-zinc-400">
              Monitor uptime, track performance, and get alerts from a unified enterprise dashboard.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-5">
            {isSignup && (
              <div className="flex flex-col gap-2 group">
                <label className="block text-sm font-medium text-zinc-300 group-focus-within:text-indigo-400 transition-colors">Full name</label>
                <Input
                  type="text"
                  placeholder="Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 rounded-lg border-zinc-800 bg-zinc-950/50 text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                />
              </div>
            )}

            <div className="flex flex-col gap-2 group">
              <label className="block text-sm font-medium text-zinc-300 group-focus-within:text-indigo-400 transition-colors">Email address</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 rounded-lg border-zinc-800 bg-zinc-950/50 text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
              />
            </div>

            <div className="flex flex-col gap-2 group">
              <label className="block text-sm font-medium text-zinc-300 group-focus-within:text-indigo-400 transition-colors">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 rounded-lg border-zinc-800 bg-zinc-950/50 text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
              />
              <div className="flex justify-end mt-1">
                <a href="#" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
                  Forgot password?
                </a>
              </div>
            </div>

            <Button
              onClick={onLogin}
              className="w-full h-11 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium mt-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] active:scale-[0.98]"
            >
              {isSignup ? 'Create account' : 'Sign in'}
            </Button>
          </div>

          <div className="relative flex items-center my-8 opacity-80">
            <div className="flex-grow border-t border-zinc-800" />
            <span className="shrink-0 px-4 text-xs font-medium uppercase tracking-wider text-zinc-500">Or continue with</span>
            <div className="flex-grow border-t border-zinc-800" />
          </div>

          <Button
            variant="outline"
            className="w-full h-11 flex items-center justify-center gap-2 rounded-lg border border-zinc-700/80 bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-600 transition-all duration-300 active:scale-[0.98]"
          >
            <LogIn className="h-5 w-5" />
            Sign in with GitHub
          </Button>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-zinc-400">
            <p>{isSignup ? 'Already have an account?' : "Don't have an account?"}</p>
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              {isSignup ? 'Sign in' : 'Sign up'}
            </button>
          </div>

          <div className="mt-6 text-center text-xs">
            <button onClick={onLogin} className="text-zinc-600 hover:text-zinc-400 font-medium underline transition-colors">
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
      <aside className={`fixed left-0 top-0 h-full bg-zinc-900 border-r border-zinc-800 transition-all duration-300 ${sidebarOpen ? 'w-72' : 'w-0'} overflow-hidden z-30`}>
        <div className="flex flex-col h-full p-6 gap-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-3xl shadow-lg shadow-indigo-950/20">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">Statify</h1>
              <p className="text-sm text-zinc-500">Operations Console</p>
            </div>
          </div>

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
                className="w-full flex items-center gap-3 px-4 py-3 rounded-3xl text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors text-left text-sm font-semibold"
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="pt-4 border-t border-zinc-800">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-3xl text-red-400 hover:bg-red-950 transition-colors text-left text-sm font-semibold"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-0'}`}>
        <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-20 shadow-sm shadow-black/10">
          <div className="flex items-center justify-between h-16 px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-zinc-400 hover:text-white p-2 hover:bg-zinc-800 rounded-2xl transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div>
                <h2 className="text-xl font-semibold text-white">Dashboard</h2>
                <p className="text-sm text-zinc-500">Real-time availability and monitor health</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button className="h-11 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white gap-2 px-4">
                <Plus className="w-4 h-4" />
                New Monitor
              </Button>
              <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full shadow-lg shadow-indigo-950/20" />
            </div>
          </div>
        </header>

        <main className="px-6 py-8 lg:px-8 lg:py-10">
          <div className="max-w-screen-2xl mx-auto space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>

            <section className="space-y-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-white">Monitors</h3>
                  <p className="text-sm text-zinc-500">Track the status and uptime of your active services.</p>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/70 px-3 py-2">HTTP</span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/70 px-3 py-2">IoT</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {sampleMonitors.map((monitor) => (
                  <MonitorCard key={monitor.id} monitor={monitor} />
                ))}
              </div>
            </section>
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