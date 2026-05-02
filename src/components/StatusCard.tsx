import { CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'down';
  uptime: number;
  responseTime: number;
  lastChecked: string;
}

interface StatusCardProps {
  service: Service;
  isSelected: boolean;
  onSelect: () => void;
}

const statusConfig = {
  operational: {
    color: 'text-green-400',
    bgColor: 'bg-green-400 bg-opacity-10',
    borderColor: 'border-green-400',
    icon: CheckCircle,
    label: 'Operational',
  },
  degraded: {
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400 bg-opacity-10',
    borderColor: 'border-yellow-400',
    icon: AlertTriangle,
    label: 'Degraded',
  },
  down: {
    color: 'text-red-400',
    bgColor: 'bg-red-400 bg-opacity-10',
    borderColor: 'border-red-400',
    icon: AlertCircle,
    label: 'Down',
  },
};

export default function StatusCard({ service, isSelected, onSelect }: StatusCardProps) {
  const config = statusConfig[service.status];
  const StatusIcon = config.icon;

  return (
    <button
      onClick={onSelect}
      className={`w-full p-4 text-left transition-all ${
        isSelected ? 'bg-primary bg-opacity-10 border-l-2 border-primary' : 'hover:bg-accent hover:bg-opacity-5'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-base font-semibold text-foreground">{service.name}</h3>
            <div className={`flex items-center gap-1 px-2 py-1 rounded ${config.bgColor} border ${config.borderColor} border-opacity-50`}>
              <StatusIcon className={`w-4 h-4 ${config.color}`} />
              <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted text-xs mb-1">Uptime</p>
              <p className="font-semibold text-foreground">{service.uptime}%</p>
            </div>
            <div>
              <p className="text-muted text-xs mb-1">Response Time</p>
              <p className="font-semibold text-foreground">{service.responseTime}ms</p>
            </div>
            <div>
              <p className="text-muted text-xs mb-1">Last Checked</p>
              <p className="font-semibold text-foreground text-xs">{service.lastChecked}</p>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
