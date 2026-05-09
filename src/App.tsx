import { useState, useRef, useEffect, type ReactNode } from 'react'
import {
  Activity, Menu, X, LogOut, Plus, AlertCircle, CheckCircle2,
  Clock, MoreHorizontal, Search, Filter, Globe, Cpu, Copy, ChevronDown,
  Pause, FileText, Trash2, Edit3, Bell, Settings, LayoutDashboard,
  Radio, ArrowRight, Eye, EyeOff, ShieldCheck, Check, RefreshCw,
} from 'lucide-react'

/* ─────────────────────────────── types ─────────────────────────────── */
interface Monitor {
  id: string; name: string; url: string
  type: 'http' | 'heartbeat'; status: 'up' | 'down' | 'warning'
  uptime: number; history: number[]; interval?: string; lastPing?: number
}

/* ─────────────────────────────── data ──────────────────────────────── */
const sampleMonitors: Monitor[] = [
  { id: '1', name: 'API Server', url: 'https://api.example.com/health', type: 'http', status: 'up', uptime: 99.9, history: [1,1,1,0.5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], interval: '1m', lastPing: 42 },
  { id: '2', name: 'Website', url: 'https://example.com', type: 'http', status: 'down', uptime: 95.2, history: [1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1], interval: '5m', lastPing: 0 },
  { id: '3', name: 'IoT Sensor 001', url: 'webhook.iot.example.com', type: 'heartbeat', status: 'up', uptime: 99.5, history: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], lastPing: 18 },
  { id: '4', name: 'Database', url: 'db.example.com:5432', type: 'http', status: 'warning', uptime: 98.1, history: [1,1,1,1,1,1,1,1,0.8,0.9,1,1,1,1,1,1,1,1,1,1,1,1,1,1], interval: '30m', lastPing: 210 },
]

/* ─────────────────────────────── status config ──────────────────────── */
const STATUS = {
  up:      { dot: '#10b981', label: 'UP',      text: '#34d399', ring: 'rgba(16,185,129,0.15)',  bar: '#10b981' },
  down:    { dot: '#ef4444', label: 'DOWN',    text: '#f87171', ring: 'rgba(239,68,68,0.15)',   bar: '#ef4444' },
  warning: { dot: '#f59e0b', label: 'WARNING', text: '#fbbf24', ring: 'rgba(245,158,11,0.15)',  bar: '#f59e0b' },
}

/* ─────────────────────────────── StatCard ───────────────────────────── */
function StatCard({ label, value, icon, accent }: { label: string; value: string | number; icon: ReactNode; accent?: string }) {
  return (
    <div style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 20, padding: '1.5rem', transition: 'border-color 0.2s' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = '#3f3f46')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = '#27272a')}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <p style={{ fontSize: 11, letterSpacing: '0.18em', fontWeight: 600, textTransform: 'uppercase', color: '#71717a', margin: 0 }}>{label}</p>
        <div style={{ color: accent || '#6366f1', opacity: 0.8 }}>{icon}</div>
      </div>
      <p style={{ fontSize: 32, fontWeight: 600, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>{value}</p>
    </div>
  )
}

/* ─────────────────────────────── Sparkline Tooltip ─────────────────── */
function Sparkline({ history, status, lastPing }: { history: number[]; status: 'up' | 'down' | 'warning'; lastPing?: number }) {
  const [tooltip, setTooltip] = useState<{ idx: number; x: number; y: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const now = new Date()
  const barColor = STATUS[status].bar

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 52 }}>
        {history.map((val, idx) => {
          const h = Math.max(val * 44, 3)
          const color = val === 0 ? '#ef4444' : val < 1 ? '#f59e0b' : barColor
          return (
            <div key={idx} style={{ flex: 1, position: 'relative', height: 52, display: 'flex', alignItems: 'flex-end' }}
              onMouseEnter={e => { const r = e.currentTarget.getBoundingClientRect(); const cr = containerRef.current!.getBoundingClientRect(); setTooltip({ idx, x: r.left - cr.left + r.width / 2, y: 0 }) }}
              onMouseLeave={() => setTooltip(null)}>
              <div style={{ width: '100%', height: h, background: color, borderRadius: 3, opacity: tooltip?.idx === idx ? 1 : 0.75, transition: 'opacity 0.15s, height 0.2s', cursor: 'crosshair' }} />
            </div>
          )
        })}
      </div>
      {tooltip !== null && (() => {
        const val = history[tooltip.idx]
        const t = new Date(now.getTime() - (history.length - tooltip.idx) * 3600000)
        const ping = val === 1 ? (lastPing ?? 54) : 0
        const timeStr = t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        return (
          <div style={{ position: 'absolute', bottom: 58, left: tooltip.x, transform: 'translateX(-50%)', background: '#09090b', border: '1px solid #27272a', borderRadius: 8, padding: '6px 10px', fontSize: 12, color: '#e4e4e7', whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 50 }}>
            {val === 0 ? `❌ DOWN at ${timeStr}` : `${ping}ms at ${timeStr}`}
            <div style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', width: 8, height: 8, background: '#09090b', border: '1px solid #27272a', borderTop: 'none', borderLeft: 'none', rotate: '45deg' }} />
          </div>
        )
      })()}
    </div>
  )
}

/* ─────────────────────────────── Options Dropdown ───────────────────── */
function OptionsMenu({ onDelete, onPause }: { onDelete: () => void; onPause: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const close = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const items = [
    { icon: <Edit3 size={14} />, label: 'Edit monitor', action: () => {} },
    { icon: <Pause size={14} />, label: 'Pause monitoring', action: onPause },
    { icon: <FileText size={14} />, label: 'View logs', action: () => {} },
    { icon: <Trash2 size={14} />, label: 'Delete', action: onDelete, danger: true },
  ]

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setOpen(!open)} style={{ background: open ? '#27272a' : 'transparent', border: '1px solid', borderColor: open ? '#3f3f46' : 'transparent', borderRadius: 8, padding: '5px 6px', cursor: 'pointer', color: '#71717a', display: 'flex', alignItems: 'center', transition: 'all 0.15s' }}
        onMouseEnter={e => { e.currentTarget.style.background = '#27272a'; e.currentTarget.style.borderColor = '#3f3f46'; e.currentTarget.style.color = '#e4e4e7' }}
        onMouseLeave={e => { if (!open) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.color = '#71717a' } }}>
        <MoreHorizontal size={16} />
      </button>
      {open && (
        <div style={{ position: 'absolute', right: 0, top: 36, background: '#18181b', border: '1px solid #27272a', borderRadius: 12, minWidth: 180, padding: '6px', zIndex: 100, boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
          {items.map(item => (
            <button key={item.label} onClick={() => { item.action(); setOpen(false) }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '8px 10px', background: 'transparent', border: 'none', borderRadius: 8, cursor: 'pointer', color: item.danger ? '#f87171' : '#a1a1aa', fontSize: 13, fontWeight: 500, textAlign: 'left', transition: 'all 0.12s' }}
              onMouseEnter={e => { e.currentTarget.style.background = item.danger ? 'rgba(239,68,68,0.08)' : '#27272a'; e.currentTarget.style.color = item.danger ? '#f87171' : '#e4e4e7' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = item.danger ? '#f87171' : '#a1a1aa' }}>
              {item.icon}{item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────── MonitorCard ────────────────────────── */
function MonitorCard({ monitor, onDelete }: { monitor: Monitor; onDelete: () => void }) {
  const cfg = STATUS[monitor.status]
  const [paused, setPaused] = useState(false)

  return (
    <div style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 20, padding: '1.5rem', transition: 'border-color 0.2s', position: 'relative', overflow: 'hidden' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = '#3f3f46')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = '#27272a')}>
      {/* top accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${cfg.dot}40, ${cfg.dot}90, ${cfg.dot}40)` }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{monitor.name}</h3>
            {paused && <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fbbf24', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 99, padding: '2px 7px' }}>Paused</span>}
          </div>
          <p style={{ fontSize: 13, color: '#52525b', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{monitor.url}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: monitor.type === 'http' ? '#818cf8' : '#34d399', background: monitor.type === 'http' ? 'rgba(99,102,241,0.1)' : 'rgba(16,185,129,0.1)', border: `1px solid ${monitor.type === 'http' ? 'rgba(99,102,241,0.2)' : 'rgba(16,185,129,0.2)'}`, borderRadius: 99, padding: '3px 9px' }}>
            {monitor.type === 'http' ? 'HTTP' : 'IoT'}
          </span>
          <OptionsMenu onDelete={onDelete} onPause={() => setPaused(!paused)} />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ position: 'relative', width: 10, height: 10 }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: cfg.dot, opacity: paused ? 0.3 : 1 }} />
            {!paused && <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', background: cfg.dot, opacity: 0.25, animation: 'pulse 2s infinite' }} />}
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: paused ? '#52525b' : cfg.text }}>{paused ? 'PAUSED' : cfg.label}</span>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {monitor.lastPing !== undefined && monitor.status !== 'down' && (
            <span style={{ fontSize: 12, color: '#52525b' }}><span style={{ color: '#a1a1aa', fontWeight: 500 }}>{monitor.lastPing}ms</span> last</span>
          )}
          <span style={{ fontSize: 12, color: '#52525b' }}><span style={{ color: '#a1a1aa', fontWeight: 500 }}>{monitor.uptime}%</span> uptime</span>
        </div>
      </div>

      <Sparkline history={monitor.history} status={monitor.status} lastPing={monitor.lastPing} />
      <p style={{ fontSize: 11, color: '#3f3f46', marginTop: 6, marginBottom: 0, textAlign: 'right' }}>Last 24 hours</p>
      <style>{`@keyframes pulse { 0%,100%{transform:scale(1);opacity:0.25} 50%{transform:scale(1.8);opacity:0} }`}</style>
    </div>
  )
}

/* ─────────────────────────────── Empty State ────────────────────────── */
function EmptyState({ onNew }: { onNew: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 2rem', textAlign: 'center' }}>
      <div style={{ position: 'relative', width: 120, height: 120, marginBottom: '2rem' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', inset: 20, borderRadius: '50%', background: '#1e1e2e', border: '1px solid #312e81', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Radio size={36} color="#6366f1" strokeWidth={1.5} />
        </div>
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <div key={i} style={{ position: 'absolute', top: '50%', left: '50%', width: 6, height: 6, marginTop: -3, marginLeft: -3, borderRadius: '50%', background: '#312e81', transform: `rotate(${deg}deg) translateX(55px)` }} />
        ))}
      </div>
      <h3 style={{ fontSize: 22, fontWeight: 600, color: '#e4e4e7', margin: '0 0 0.75rem', letterSpacing: '-0.02em' }}>No monitors yet</h3>
      <p style={{ fontSize: 15, color: '#52525b', maxWidth: 360, margin: '0 0 2rem', lineHeight: 1.6 }}>Add your first monitor to start tracking uptime for your websites, APIs, and IoT devices.</p>
      <button onClick={onNew} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#6366f1', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 0 0 0 rgba(99,102,241,0)' }}
        onMouseEnter={e => { e.currentTarget.style.background = '#818cf8'; e.currentTarget.style.boxShadow = '0 0 24px rgba(99,102,241,0.35)' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#6366f1'; e.currentTarget.style.boxShadow = '0 0 0 0 rgba(99,102,241,0)' }}>
        <Plus size={16} /> Create your first monitor
      </button>
    </div>
  )
}

/* ─────────────────────────────── Create Monitor Dialog ──────────────── */
type MonitorType = 'http' | 'heartbeat' | null
function CreateMonitorDialog({ onClose, onAdd }: { onClose: () => void; onAdd: (m: Monitor) => void }) {
  const [step, setStep] = useState<1 | 2>(1)
  const [type, setType] = useState<MonitorType>(null)
  const [name, setName] = useState(''); const [url, setUrl] = useState(''); const [email, setEmail] = useState(''); const [interval, setInterval] = useState('5m')
  const [copied, setCopied] = useState(false)
  const webhookUrl = `https://push.statify.io/ping/${Math.random().toString(36).slice(2, 10)}`

  const handleAdd = () => {
    if (!name || !type) return
    onAdd({ id: Date.now().toString(), name, url: type === 'http' ? url : webhookUrl, type, status: 'up', uptime: 100, history: Array(24).fill(1), interval, lastPing: 55 })
    onClose()
  }

  const copyWebhook = () => { navigator.clipboard.writeText(webhookUrl).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 24, width: '100%', maxWidth: 520, maxHeight: '90vh', overflow: 'auto', boxShadow: '0 40px 80px rgba(0,0,0,0.6)' }}>
        <div style={{ padding: '1.5rem 1.75rem', borderBottom: '1px solid #27272a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: '#fff', margin: '0 0 2px' }}>New Monitor</h2>
            <p style={{ fontSize: 13, color: '#52525b', margin: 0 }}>Step {step} of 2 — {step === 1 ? 'Choose type' : 'Configure'}</p>
          </div>
          <button onClick={onClose} style={{ background: '#27272a', border: 'none', borderRadius: 8, padding: '6px', cursor: 'pointer', color: '#71717a', display: 'flex', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#3f3f46'; e.currentTarget.style.color = '#e4e4e7' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#27272a'; e.currentTarget.style.color = '#71717a' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '1.75rem' }}>
          {step === 1 && (
            <div>
              <p style={{ fontSize: 14, color: '#71717a', margin: '0 0 1.25rem' }}>What kind of service do you want to monitor?</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {([
                  { t: 'http' as const, icon: <Globe size={28} strokeWidth={1.5} />, title: 'Website / API', sub: 'Active HTTP pull — we ping your endpoint on a schedule.', color: '#6366f1' },
                  { t: 'heartbeat' as const, icon: <Cpu size={28} strokeWidth={1.5} />, title: 'IoT / Cron', sub: 'Passive heartbeat push — your device pings us.', color: '#10b981' },
                ] as const).map(({ t, icon, title, sub, color }) => (
                  <button key={t} onClick={() => setType(t)}
                    style={{ background: type === t ? `${color}10` : '#09090b', border: `2px solid ${type === t ? color : '#27272a'}`, borderRadius: 16, padding: '1.5rem 1rem', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
                    onMouseEnter={e => { if (type !== t) { e.currentTarget.style.borderColor = '#3f3f46'; e.currentTarget.style.background = '#111111' } }}
                    onMouseLeave={e => { if (type !== t) { e.currentTarget.style.borderColor = '#27272a'; e.currentTarget.style.background = '#09090b' } }}>
                    <div style={{ color, marginBottom: '0.75rem' }}>{icon}</div>
                    <p style={{ fontSize: 15, fontWeight: 600, color: '#e4e4e7', margin: '0 0 6px' }}>{title}</p>
                    <p style={{ fontSize: 12, color: '#52525b', margin: 0, lineHeight: 1.5 }}>{sub}</p>
                    {type === t && <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 4, color, fontSize: 12, fontWeight: 600 }}><Check size={14} /> Selected</div>}
                  </button>
                ))}
              </div>
              <button onClick={() => type && setStep(2)} disabled={!type}
                style={{ marginTop: '1.5rem', width: '100%', background: type ? '#6366f1' : '#27272a', color: type ? '#fff' : '#52525b', border: 'none', borderRadius: 12, padding: '12px', fontSize: 14, fontWeight: 600, cursor: type ? 'pointer' : 'not-allowed', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                onMouseEnter={e => { if (type) e.currentTarget.style.background = '#818cf8' }}
                onMouseLeave={e => { if (type) e.currentTarget.style.background = '#6366f1' }}>
                Continue <ArrowRight size={16} />
              </button>
            </div>
          )}

          {step === 2 && type === 'http' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <FormField label="Monitor name" value={name} onChange={setName} placeholder="e.g. Production API" />
              <FormField label="URL to monitor" value={url} onChange={setUrl} placeholder="https://api.example.com/health" />
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#a1a1aa', marginBottom: 8 }}>Check interval</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['1m', '5m', '30m'].map(iv => (
                    <button key={iv} onClick={() => setInterval(iv)}
                      style={{ flex: 1, padding: '10px', background: interval === iv ? 'rgba(99,102,241,0.15)' : '#09090b', border: `1px solid ${interval === iv ? '#6366f1' : '#27272a'}`, borderRadius: 10, color: interval === iv ? '#818cf8' : '#71717a', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}>
                      {iv}
                    </button>
                  ))}
                </div>
              </div>
              <FormField label="Alert email" value={email} onChange={setEmail} placeholder="ops@yourcompany.com" type="email" />
              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, background: '#27272a', color: '#a1a1aa', border: 'none', borderRadius: 12, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Back</button>
                <button onClick={handleAdd} style={{ flex: 2, background: '#6366f1', color: '#fff', border: 'none', borderRadius: 12, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#818cf8')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#6366f1')}>
                  Create Monitor
                </button>
              </div>
            </div>
          )}

          {step === 2 && type === 'heartbeat' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <FormField label="Monitor name" value={name} onChange={setName} placeholder="e.g. IoT Sensor 002" />
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#a1a1aa', marginBottom: 8 }}>Webhook URL</label>
                <p style={{ fontSize: 13, color: '#52525b', margin: '0 0 10px', lineHeight: 1.5 }}>Have your device or cron job send a GET request to this URL to signal it's alive.</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1, background: '#09090b', border: '1px solid #27272a', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: '#71717a', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {webhookUrl}
                  </div>
                  <button onClick={copyWebhook} style={{ background: copied ? 'rgba(16,185,129,0.1)' : '#27272a', border: `1px solid ${copied ? '#10b981' : '#3f3f46'}`, borderRadius: 10, padding: '10px 14px', cursor: 'pointer', color: copied ? '#34d399' : '#a1a1aa', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
                    {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
              <div style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 12, padding: '1rem 1.125rem', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <ShieldCheck size={16} color="#818cf8" style={{ flexShrink: 0, marginTop: 2 }} />
                <p style={{ fontSize: 13, color: '#71717a', margin: 0, lineHeight: 1.5 }}>If we don't receive a ping within your expected interval, we'll send you an alert. Treat this URL as a secret.</p>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, background: '#27272a', color: '#a1a1aa', border: 'none', borderRadius: 12, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Back</button>
                <button onClick={handleAdd} style={{ flex: 2, background: '#6366f1', color: '#fff', border: 'none', borderRadius: 12, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#818cf8')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#6366f1')}>
                  Create Monitor
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FormField({ label, value, onChange, placeholder, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: focused ? '#818cf8' : '#a1a1aa', marginBottom: 8, transition: 'color 0.2s' }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ width: '100%', background: '#09090b', border: `1px solid ${focused ? '#6366f1' : '#27272a'}`, borderRadius: 10, padding: '10px 14px', fontSize: 14, color: '#e4e4e7', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box', boxShadow: focused ? '0 0 0 3px rgba(99,102,241,0.15)' : 'none' }}
      />
    </div>
  )
}

/* ─────────────────────────────── Auth View ──────────────────────────── */
type AuthMode = 'signin' | 'signup' | 'forgot'
function AuthView({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<AuthMode>('signin')
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [name, setName] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string }>({})
  const [forgotSent, setForgotSent] = useState(false)

  const validate = () => {
    const e: typeof errors = {}
    if (!email || !/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email address'
    if (mode !== 'forgot') {
      if (!password || password.length < 8) e.password = 'Password must be at least 8 characters'
      if (mode === 'signup' && !name.trim()) e.name = 'Full name is required'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = () => {
    if (mode === 'forgot') { if (!email || !/\S+@\S+\.\S+/.test(email)) { setErrors({ email: 'Enter a valid email address' }); return } setForgotSent(true); return }
    if (validate()) onLogin()
  }

  return (
    <div style={{ minHeight: '100vh', background: '#09090b', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem', position: 'relative', overflow: 'hidden' }}>
      {/* bg glow */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 700, background: 'radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '60%', left: '20%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', width: '100%', maxWidth: 440 }}>
        {/* logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: '0.75rem' }}>
            <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}>
              <Activity size={20} color="#fff" />
            </div>
            <span style={{ fontSize: 24, fontWeight: 700, color: '#fff', letterSpacing: '-0.03em' }}>Statify</span>
          </div>
          <p style={{ fontSize: 13, color: '#52525b', margin: 0 }}>The Unified Digital Asset Guardian</p>
        </div>

        {/* card */}
        <div style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 24, overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }}>
          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)' }} />
          <div style={{ padding: '2rem 2rem 2.25rem' }}>
            <h1 style={{ fontSize: 20, fontWeight: 600, color: '#fff', margin: '0 0 0.25rem', letterSpacing: '-0.02em' }}>
              {mode === 'signin' ? 'Sign in' : mode === 'signup' ? 'Create account' : 'Reset password'}
            </h1>
            <p style={{ fontSize: 14, color: '#52525b', margin: '0 0 1.75rem' }}>
              {mode === 'signin' ? 'Welcome back — enter your credentials to continue.' : mode === 'signup' ? 'Start monitoring in minutes.' : 'We\'ll send a reset link to your email.'}
            </p>

            {mode === 'forgot' && forgotSent ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ width: 56, height: 56, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <CheckCircle2 size={24} color="#34d399" />
                </div>
                <p style={{ fontSize: 15, fontWeight: 600, color: '#e4e4e7', margin: '0 0 0.5rem' }}>Check your email</p>
                <p style={{ fontSize: 14, color: '#52525b', margin: '0 0 1.5rem' }}>If <strong style={{ color: '#a1a1aa' }}>{email}</strong> is in our system, we've sent a reset link.</p>
                <button onClick={() => { setMode('signin'); setForgotSent(false) }} style={{ fontSize: 14, color: '#818cf8', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Back to sign in</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {mode === 'signup' && (
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#a1a1aa', marginBottom: 8 }}>Full name</label>
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="Alex Morgan" style={{ width: '100%', background: '#09090b', border: `1px solid ${errors.name ? '#ef4444' : '#27272a'}`, borderRadius: 10, padding: '10px 14px', fontSize: 14, color: '#e4e4e7', outline: 'none', boxSizing: 'border-box', boxShadow: errors.name ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none' }} />
                    {errors.name && <p style={{ fontSize: 12, color: '#f87171', margin: '6px 0 0', display: 'flex', alignItems: 'center', gap: 4 }}><AlertCircle size={12} />{errors.name}</p>}
                  </div>
                )}
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#a1a1aa', marginBottom: 8 }}>Email address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={{ width: '100%', background: '#09090b', border: `1px solid ${errors.email ? '#ef4444' : '#27272a'}`, borderRadius: 10, padding: '10px 14px', fontSize: 14, color: '#e4e4e7', outline: 'none', boxSizing: 'border-box', boxShadow: errors.email ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none' }} />
                  {errors.email && <p style={{ fontSize: 12, color: '#f87171', margin: '6px 0 0', display: 'flex', alignItems: 'center', gap: 4 }}><AlertCircle size={12} />{errors.email}</p>}
                </div>
                {mode !== 'forgot' && (
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 500, color: '#a1a1aa', marginBottom: 8, display: 'block' }}>Password</label>
                    <div style={{ position: 'relative', marginBottom: 8 }}>
                      <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', background: '#09090b', border: `1px solid ${errors.password ? '#ef4444' : '#27272a'}`, borderRadius: 10, padding: '10px 42px 10px 14px', fontSize: 14, color: '#e4e4e7', outline: 'none', boxSizing: 'border-box', boxShadow: errors.password ? '0 0 0 3px rgba(239,68,68,0.1)' : 'none' }} />
                      <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#52525b', padding: 0 }}>
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {mode === 'signin' && <button onClick={() => setMode('forgot')} style={{ fontSize: 13, color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, padding: 0, marginBottom: 8, display: 'block', textAlign: 'right', width: '100%' }}>Forgot password?</button>}
                    {errors.password && <p style={{ fontSize: 12, color: '#f87171', margin: '6px 0 0', display: 'flex', alignItems: 'center', gap: 4 }}><AlertCircle size={12} />{errors.password}</p>}
                  </div>
                )}
                <button onClick={submit} style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 12, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer', width: '100%', transition: 'all 0.2s', marginTop: 4 }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#818cf8'; e.currentTarget.style.boxShadow = '0 0 24px rgba(99,102,241,0.35)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#6366f1'; e.currentTarget.style.boxShadow = 'none' }}>
                  {mode === 'signin' ? 'Sign in' : mode === 'signup' ? 'Create account' : 'Send reset link'}
                </button>

                {mode !== 'forgot' && <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ flex: 1, height: 1, background: '#27272a' }} />
                    <span style={{ fontSize: 12, color: '#3f3f46', fontWeight: 500, letterSpacing: '0.05em' }}>OR CONTINUE WITH</span>
                    <div style={{ flex: 1, height: 1, background: '#27272a' }} />
                  </div>
                  <button onClick={onLogin} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: 'transparent', border: '1px solid #27272a', borderRadius: 12, padding: '11px', fontSize: 14, fontWeight: 500, color: '#a1a1aa', cursor: 'pointer', width: '100%', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#27272a'; e.currentTarget.style.color = '#e4e4e7'; e.currentTarget.style.borderColor = '#3f3f46' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#a1a1aa'; e.currentTarget.style.borderColor = '#27272a' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    Continue with GitHub
                  </button>
                </>}

                <p style={{ fontSize: 13, color: '#52525b', textAlign: 'center', margin: 0 }}>
                  {mode === 'signin' ? "Don't have an account? " : mode === 'signup' ? 'Already have an account? ' : ''}
                  {mode !== 'forgot' && <button onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setErrors({}) }} style={{ color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, padding: 0 }}>
                    {mode === 'signin' ? 'Sign up' : 'Sign in'}
                  </button>}
                </p>

                <button onClick={onLogin} style={{ fontSize: 12, color: '#3f3f46', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', margin: '0 auto', display: 'block' }}>
                  [Dev: Bypass to Dashboard]
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────── Dashboard ──────────────────────────── */
type FilterType = 'all' | 'up' | 'down' | 'http' | 'heartbeat'

function DashboardView({ onLogout }: { onLogout: () => void }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [monitors, setMonitors] = useState<Monitor[]>(sampleMonitors)
  const [showCreate, setShowCreate] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')
  const [filterOpen, setFilterOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('Dashboard')
  const filterRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => { const m = window.innerWidth < 1024; setIsMobile(m); if (m) setSidebarOpen(false) }
    check(); window.addEventListener('resize', check); return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const close = (e: MouseEvent) => { if (filterRef.current && !filterRef.current.contains(e.target as Node)) setFilterOpen(false) }
    document.addEventListener('mousedown', close); return () => document.removeEventListener('mousedown', close)
  }, [])

  const deleteMonitor = (id: string) => setMonitors(prev => prev.filter(m => m.id !== id))
  const addMonitor = (m: Monitor) => setMonitors(prev => [m, ...prev])

  const filtered = monitors.filter(m => {
    const q = search.toLowerCase()
    const matchSearch = !q || m.name.toLowerCase().includes(q) || m.url.toLowerCase().includes(q)
    const matchFilter = filter === 'all' || m.status === filter || m.type === filter
    return matchSearch && matchFilter
  })

  const total = monitors.length
  const up = monitors.filter(m => m.status === 'up').length
  const down = monitors.filter(m => m.status === 'down').length
  const avgUptime = total ? (monitors.reduce((s, m) => s + m.uptime, 0) / total).toFixed(1) : '—'

  const filterLabels: Record<FilterType, string> = { all: 'All monitors', up: 'Only UP', down: 'Only DOWN', http: 'HTTP only', heartbeat: 'IoT only' }

  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { label: 'Monitors', icon: <Radio size={16} /> },
    { label: 'Alerts', icon: <Bell size={16} /> },
    { label: 'Settings', icon: <Settings size={16} /> },
  ]

  const SIDEBAR_W = 256

  return (
    <div style={{ minHeight: '100vh', background: '#09090b', display: 'flex' }}>
      {/* overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 40, backdropFilter: 'blur(2px)' }} />
      )}

      {/* sidebar */}
      <aside style={{ position: 'fixed', top: 0, left: 0, height: '100%', width: sidebarOpen ? SIDEBAR_W : 0, background: '#18181b', borderRight: '1px solid #27272a', transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)', overflow: 'hidden', zIndex: 50, display: 'flex', flexDirection: 'column' }}>
        <div style={{ width: SIDEBAR_W, display: 'flex', flexDirection: 'column', height: '100%', padding: '1.5rem 1.25rem' }}>
          {/* logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2rem', paddingLeft: 4 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 0 16px rgba(99,102,241,0.25)' }}>
              <Activity size={18} color="#fff" />
            </div>
            <div>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>Statify</p>
              <p style={{ fontSize: 11, color: '#52525b', margin: 0 }}>Operations Console</p>
            </div>
          </div>

          {/* nav */}
          <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {navItems.map(item => {
              const active = activeNav === item.label
              return (
                <button key={item.label} onClick={() => { setActiveNav(item.label); if (isMobile) setSidebarOpen(false) }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 10, background: active ? 'rgba(99,102,241,0.12)' : 'transparent', border: `1px solid ${active ? 'rgba(99,102,241,0.2)' : 'transparent'}`, color: active ? '#818cf8' : '#71717a', fontSize: 14, fontWeight: active ? 600 : 500, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', width: '100%' }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.background = '#27272a'; e.currentTarget.style.color = '#e4e4e7' } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#71717a' } }}>
                  {item.icon}{item.label}
                </button>
              )
            })}
          </nav>

          {/* user + logout */}
          <div style={{ borderTop: '1px solid #27272a', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 10, background: '#0f0f11' }}>
              <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>A</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#e4e4e7', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Alex Morgan</p>
                <p style={{ fontSize: 11, color: '#52525b', margin: 0 }}>Pro plan</p>
              </div>
            </div>
            <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 10, background: 'transparent', border: '1px solid transparent', color: '#f87171', fontSize: 14, fontWeight: 500, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', width: '100%' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.15)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent' }}>
              <LogOut size={15} /> Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* main */}
      <div style={{ flex: 1, marginLeft: sidebarOpen && !isMobile ? SIDEBAR_W : 0, transition: 'margin-left 0.3s cubic-bezier(0.4,0,0.2,1)', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* header */}
        <header style={{ position: 'sticky', top: 0, zIndex: 30, background: 'rgba(9,9,11,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #1a1a1f' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', height: 64 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: '#27272a', border: '1px solid #3f3f46', borderRadius: 9, padding: '7px', cursor: 'pointer', color: '#a1a1aa', display: 'flex', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#3f3f46'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#27272a'; e.currentTarget.style.color = '#a1a1aa' }}>
                {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
              <div>
                <h2 style={{ fontSize: 17, fontWeight: 600, color: '#fff', margin: 0, letterSpacing: '-0.01em' }}>{activeNav}</h2>
                <p style={{ fontSize: 12, color: '#52525b', margin: 0 }}>Real-time availability & health</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button style={{ background: 'transparent', border: '1px solid #27272a', borderRadius: 9, padding: '7px', cursor: 'pointer', color: '#71717a', display: 'flex', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#27272a'; e.currentTarget.style.color = '#e4e4e7' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#71717a' }}>
                <RefreshCw size={15} />
              </button>
              <button onClick={() => setShowCreate(true)} style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#6366f1', color: '#fff', border: 'none', borderRadius: 10, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#818cf8'; e.currentTarget.style.boxShadow = '0 0 20px rgba(99,102,241,0.35)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#6366f1'; e.currentTarget.style.boxShadow = 'none' }}>
                <Plus size={15} /> New Monitor
              </button>
            </div>
          </div>
        </header>

        {/* body */}
        <main style={{ flex: 1, padding: '2rem 1.5rem', maxWidth: 1400, width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
          {/* stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <StatCard label="Monitors" value={total} icon={<Radio size={18} />} />
            <StatCard label="Operational" value={up} icon={<CheckCircle2 size={18} />} accent="#10b981" />
            <StatCard label="Incidents" value={down} icon={<AlertCircle size={18} />} accent="#ef4444" />
            <StatCard label="Avg Uptime" value={`${avgUptime}%`} icon={<Clock size={18} />} />
          </div>

          {/* section header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', margin: '0 0 3px', letterSpacing: '-0.01em' }}>Monitors</h3>
              <p style={{ fontSize: 13, color: '#52525b', margin: 0 }}>{filtered.length} of {total} shown</p>
            </div>

            {/* toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* search */}
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Search size={14} style={{ position: 'absolute', left: 12, color: '#52525b', pointerEvents: 'none' }} />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search monitors…"
                  style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: 10, padding: '8px 14px 8px 34px', fontSize: 13, color: '#e4e4e7', outline: 'none', width: 200, transition: 'all 0.2s' }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = '#27272a'; e.currentTarget.style.boxShadow = 'none' }} />
              </div>

              {/* filter */}
              <div ref={filterRef} style={{ position: 'relative' }}>
                <button onClick={() => setFilterOpen(!filterOpen)} style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#18181b', border: `1px solid ${filter !== 'all' ? '#6366f1' : '#27272a'}`, borderRadius: 10, padding: '8px 14px', fontSize: 13, fontWeight: 500, color: filter !== 'all' ? '#818cf8' : '#a1a1aa', cursor: 'pointer', transition: 'all 0.15s' }}>
                  <Filter size={14} />{filterLabels[filter]}<ChevronDown size={13} style={{ transform: filterOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>
                {filterOpen && (
                  <div style={{ position: 'absolute', right: 0, top: 40, background: '#18181b', border: '1px solid #27272a', borderRadius: 12, padding: '6px', zIndex: 60, boxShadow: '0 20px 40px rgba(0,0,0,0.6)', minWidth: 160 }}>
                    {(Object.entries(filterLabels) as [FilterType, string][]).map(([val, label]) => (
                      <button key={val} onClick={() => { setFilter(val); setFilterOpen(false) }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '8px 10px', background: filter === val ? 'rgba(99,102,241,0.1)' : 'transparent', border: 'none', borderRadius: 8, color: filter === val ? '#818cf8' : '#a1a1aa', fontSize: 13, fontWeight: filter === val ? 600 : 400, cursor: 'pointer', textAlign: 'left', transition: 'all 0.1s' }}
                        onMouseEnter={e => { if (filter !== val) { e.currentTarget.style.background = '#27272a'; e.currentTarget.style.color = '#e4e4e7' } }}
                        onMouseLeave={e => { if (filter !== val) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#a1a1aa' } }}>
                        {label}{filter === val && <Check size={13} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* grid */}
          {filtered.length === 0 && monitors.length === 0 ? (
            <EmptyState onNew={() => setShowCreate(true)} />
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#52525b' }}>
              <Search size={32} style={{ opacity: 0.3, marginBottom: 12 }} />
              <p style={{ fontSize: 15, fontWeight: 500, color: '#71717a', margin: '0 0 6px' }}>No results found</p>
              <p style={{ fontSize: 13, margin: 0 }}>Try adjusting your search or filter.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 440px), 1fr))', gap: '1rem' }}>
              {filtered.map(m => <MonitorCard key={m.id} monitor={m} onDelete={() => deleteMonitor(m.id)} />)}
            </div>
          )}
        </main>
      </div>

      {showCreate && <CreateMonitorDialog onClose={() => setShowCreate(false)} onAdd={addMonitor} />}
    </div>
  )
}

/* ─────────────────────────────── App ────────────────────────────────── */
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return isLoggedIn
    ? <DashboardView onLogout={() => setIsLoggedIn(false)} />
    : <AuthView onLogin={() => setIsLoggedIn(true)} />
}