import { useEffect, useState } from 'react';
import { alertsApi } from '../services/api';
import type { StatsResponse } from '../types';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import {
  AlertTriangle,
  Activity,
  Shield,
  TrendingUp,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Dashboard() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await alertsApi.getStats();
      setStats(data);
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to load statistics';
      setError(errorMessage);
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Security Dashboard</h2>
          <p className="text-slate-400">Overview of cloud security alerts and analytics</p>
        </div>
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="text-slate-400">Loading statistics...</p>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    const isConnectionError = error?.includes('Cannot connect to backend') || error?.includes('ECONNREFUSED') || error?.includes('Network Error');
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Security Dashboard
          </h2>
          <p className="text-slate-400">Overview of cloud security alerts and analytics</p>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-red-500/30 rounded-xl p-8 shadow-xl">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="p-3 bg-red-500/20 rounded-lg border border-red-500/30">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-red-400 mb-2">Error Loading Statistics</h3>
              <p className="text-red-300/90 mb-6 text-lg">{error || 'Failed to load statistics'}</p>
              {isConnectionError && (
                <div className="bg-slate-800/70 backdrop-blur-sm rounded-lg p-5 mb-6 border border-slate-700/50">
                  <p className="text-sm font-medium text-slate-300 mb-3 flex items-center">
                    <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                    To fix this issue:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-slate-400">
                    <li>Open a terminal in the project root directory</li>
                    <li>Install dependencies: <code className="bg-slate-900/80 px-2 py-1 rounded text-blue-400 font-mono text-xs">pip install -r requirements.txt</code></li>
                    <li>Start the backend: <code className="bg-slate-900/80 px-2 py-1 rounded text-blue-400 font-mono text-xs">python main.py</code></li>
                    <li>Verify it's running on <code className="bg-slate-900/80 px-2 py-1 rounded text-blue-400 font-mono text-xs">http://127.0.0.1:8000</code></li>
                    <li>Make sure you have the data file (<code className="bg-slate-900/80 px-2 py-1 rounded text-blue-400 font-mono text-xs">aws_like_alerts_10000.json</code>) in the root directory</li>
                  </ol>
                </div>
              )}
              <button
                onClick={loadStats}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-200 font-medium flex items-center space-x-2 shadow-lg shadow-blue-500/20"
              >
                <Activity className="h-4 w-4" />
                <span>Retry Connection</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Prepare chart data with null safety
  const severityData = Object.entries(stats.by_severity || {})
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: Number(value) || 0,
    }));

  const statusData = Object.entries(stats.by_status || {})
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' '),
      value: Number(value) || 0,
    }));

  const sourceData = Object.entries(stats.by_source || {})
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({
      name: name.length > 15 ? name.substring(0, 15) + '...' : name,
      fullName: name,
      value: Number(value) || 0,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  const timelineData = Object.entries(stats.by_day || {})
    .filter(([_, count]) => count > 0)
    .map(([date, count]) => {
      try {
        return {
          date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          count: Number(count) || 0,
          rawDate: date,
        };
      } catch {
        return null;
      }
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .sort((a, b) => new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime())
    .slice(-30); // Last 30 days

  const criticalCount = Number(stats.by_severity?.critical) || 0;
  const highCount = Number(stats.by_severity?.high) || 0;
  const openCount = Number(stats.by_status?.open) || 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white via-blue-100 to-slate-300 bg-clip-text text-transparent">
          Security Dashboard
        </h2>
        <p className="text-slate-400">Overview of cloud security alerts and analytics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Alerts"
          value={stats.total_alerts}
          icon={AlertTriangle}
          color="blue"
        />
        <StatCard
          title="Critical Alerts"
          value={criticalCount}
          icon={Shield}
          color="red"
        />
        <StatCard
          title="High Severity"
          value={highCount}
          icon={Activity}
          color="yellow"
        />
        <StatCard
          title="Open Alerts"
          value={openCount}
          icon={TrendingUp}
          color="purple"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Alerts by Severity">
          {severityData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#e2e8f0',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-slate-400">
              No severity data available
            </div>
          )}
        </ChartCard>

        <ChartCard title="Alerts by Status">
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#e2e8f0',
                  }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-slate-400">
              No status data available
            </div>
          )}
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Top Sources">
          {sourceData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sourceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" width={120} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#e2e8f0',
                  }}
                  formatter={(value: number, name: string, props: any) => [
                    value,
                    props.payload.fullName,
                  ]}
                />
                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-slate-400">
              No source data available
            </div>
          )}
        </ChartCard>

        <ChartCard title="Alerts Timeline (Last 30 Days)">
          {timelineData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                  dataKey="date"
                  stroke="#94a3b8"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#e2e8f0',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-slate-400">
              No timeline data available
            </div>
          )}
        </ChartCard>
      </div>
    </div>
  );
}

