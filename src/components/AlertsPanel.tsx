import { AlertTriangle, AlertCircle, Clock } from 'lucide-react';

interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  service: string;
  message: string;
  time: string;
}

interface AlertsPanelProps {
  alerts: Alert[];
}

const severityConfig = {
  critical: {
    color: 'text-red-400',
    bgColor: 'bg-red-400 bg-opacity-10',
    borderColor: 'border-red-400',
    icon: AlertCircle,
  },
  warning: {
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400 bg-opacity-10',
    borderColor: 'border-yellow-400',
    icon: AlertTriangle,
  },
  info: {
    color: 'text-blue-400',
    bgColor: 'bg-blue-400 bg-opacity-10',
    borderColor: 'border-blue-400',
    icon: AlertTriangle,
  },
};

export default function AlertsPanel({ alerts }: AlertsPanelProps) {
  return (
    <div className="bg-secondary rounded-lg border border-accent border-opacity-20 overflow-hidden flex flex-col">
      <div className="p-4 border-b border-accent border-opacity-20">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          Recent Alerts
        </h2>
      </div>

      <div className="flex-1 overflow-auto">
        {alerts.length === 0 ? (
          <div className="p-6 text-center text-muted">
            <p className="text-sm">No alerts at this time</p>
          </div>
        ) : (
          <div className="divide-y divide-accent divide-opacity-20">
            {alerts.map((alert) => {
              const config = severityConfig[alert.severity];
              const AlertIcon = config.icon;

              return (
                <div
                  key={alert.id}
                  className={`p-4 border-l-4 ${config.borderColor} ${config.bgColor}`}
                >
                  <div className="flex gap-3">
                    <AlertIcon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.color}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{alert.service}</p>
                      <p className="text-xs text-muted mt-1 line-clamp-2">{alert.message}</p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted">
                        <Clock className="w-3 h-3" />
                        {alert.time}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
