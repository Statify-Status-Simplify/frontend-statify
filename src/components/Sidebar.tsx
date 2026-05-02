import { LayoutDashboard, BarChart3, AlertTriangle, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: BarChart3, label: 'Analytics' },
  { icon: AlertTriangle, label: 'Incidents' },
  { icon: Settings, label: 'Settings' },
];

export default function Sidebar({ open }: SidebarProps) {
  return (
    <aside
      className={`${
        open ? 'w-64' : 'w-0'
      } bg-secondary border-r border-accent border-opacity-20 transition-all duration-300 overflow-hidden flex flex-col`}
    >
      <div className="p-6 border-b border-accent border-opacity-20">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-secondary font-bold text-sm">S</span>
          </div>
          <span className="text-lg font-bold text-primary">Statify</span>
        </div>
        <p className="text-xs text-muted">Status & Analytics</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              item.active
                ? 'bg-primary bg-opacity-10 text-primary border border-primary border-opacity-30'
                : 'text-foreground hover:bg-accent hover:bg-opacity-5'
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="px-4 py-6 border-t border-accent border-opacity-20">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted hover:text-foreground hover:bg-accent hover:bg-opacity-5 transition-colors">
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
