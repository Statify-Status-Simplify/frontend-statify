import { useState } from 'react';
import { Activity, AlertCircle, CheckCircle, Clock, TrendingUp, BarChart3 } from 'lucide-react';
import Header from './Header';
import Sidebar from './Sidebar';
import StatusCard from './StatusCard';
import AlertsPanel from './AlertsPanel';
import AnalyticsChart from './AnalyticsChart';

interface Service {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'down';
  uptime: number;
  responseTime: number;
  lastChecked: string;
}

const mockServices: Service[] = [
  {
    id: '1',
    name: 'API Server',
    status: 'operational',
    uptime: 99.98,
    responseTime: 45,
    lastChecked: '2 minutes ago',
  },
  {
    id: '2',
    name: 'Database',
    status: 'operational',
    uptime: 99.95,
    responseTime: 120,
    lastChecked: '1 minute ago',
  },
  {
    id: '3',
    name: 'CDN Services',
    status: 'degraded',
    uptime: 98.5,
    responseTime: 250,
    lastChecked: '3 minutes ago',
  },
  {
    id: '4',
    name: 'Authentication',
    status: 'operational',
    uptime: 99.99,
    responseTime: 78,
    lastChecked: '1 minute ago',
  },
];

const mockAlerts = [
  {
    id: '1',
    severity: 'warning',
    service: 'CDN Services',
    message: 'Response time exceeded threshold (250ms)',
    time: '5 minutes ago',
  },
  {
    id: '2',
    severity: 'info',
    service: 'API Server',
    message: 'Scheduled maintenance completed',
    time: '2 hours ago',
  },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const operationalCount = mockServices.filter(s => s.status === 'operational').length;
  const degradedCount = mockServices.filter(s => s.status === 'degraded').length;
  const downCount = mockServices.filter(s => s.status === 'down').length;

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 overflow-auto p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-secondary rounded-lg p-4 border border-accent border-opacity-20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted text-sm">Operational</p>
                  <p className="text-2xl font-bold text-primary mt-1">{operationalCount}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </div>

            <div className="bg-secondary rounded-lg p-4 border border-accent border-opacity-20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted text-sm">Degraded</p>
                  <p className="text-2xl font-bold text-yellow-400 mt-1">{degradedCount}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-yellow-400" />
              </div>
            </div>

            <div className="bg-secondary rounded-lg p-4 border border-accent border-opacity-20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted text-sm">Down</p>
                  <p className="text-2xl font-bold text-red-400 mt-1">{downCount}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
            </div>

            <div className="bg-secondary rounded-lg p-4 border border-accent border-opacity-20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted text-sm">Avg Uptime</p>
                  <p className="text-2xl font-bold text-primary mt-1">99.5%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Services Status */}
            <div className="lg:col-span-2">
              <div className="bg-secondary rounded-lg border border-accent border-opacity-20 overflow-hidden">
                <div className="p-4 border-b border-accent border-opacity-20">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    Service Status
                  </h2>
                </div>
                <div className="divide-y divide-accent divide-opacity-20">
                  {mockServices.map((service) => (
                    <StatusCard
                      key={service.id}
                      service={service}
                      isSelected={selectedService === service.id}
                      onSelect={() => setSelectedService(service.id)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Alerts Panel */}
            <div className="lg:col-span-1">
              <AlertsPanel alerts={mockAlerts} />
            </div>
          </div>

          {/* Analytics */}
          <div className="mt-6 bg-secondary rounded-lg border border-accent border-opacity-20 p-4">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-primary" />
              Response Time Analytics (24h)
            </h2>
            <AnalyticsChart />
          </div>
        </main>
      </div>
    </div>
  );
}
