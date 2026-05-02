import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '12:00', 'API Server': 45, 'Database': 120, 'CDN': 85, 'Auth': 78 },
  { time: '13:00', 'API Server': 52, 'Database': 115, 'CDN': 92, 'Auth': 81 },
  { time: '14:00', 'API Server': 48, 'Database': 125, 'CDN': 250, 'Auth': 76 },
  { time: '15:00', 'API Server': 61, 'Database': 118, 'CDN': 88, 'Auth': 84 },
  { time: '16:00', 'API Server': 55, 'Database': 130, 'CDN': 95, 'Auth': 79 },
  { time: '17:00', 'API Server': 67, 'Database': 122, 'CDN': 105, 'Auth': 82 },
  { time: '18:00', 'API Server': 72, 'Database': 128, 'CDN': 115, 'Auth': 88 },
  { time: '19:00', 'API Server': 58, 'Database': 121, 'CDN': 98, 'Auth': 85 },
];

export default function AnalyticsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1a1f2e" />
        <XAxis dataKey="time" stroke="#64748b" />
        <YAxis stroke="#64748b" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1a1f2e',
            border: '1px solid rgba(0, 212, 255, 0.2)',
            borderRadius: '8px',
          }}
          labelStyle={{ color: '#ffffff' }}
        />
        <Bar dataKey="API Server" fill="#00d4ff" />
        <Bar dataKey="Database" fill="#00a8cc" />
        <Bar dataKey="CDN" fill="#fbbf24" />
        <Bar dataKey="Auth" fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  );
}
