import { useEffect, useState } from 'react';
import { alertsApi } from '../services/api';
import type { StatsResponse, AdvancedAnalyticsResponse, PredictiveAnalyticsResponse } from '../types';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import {
  AlertTriangle, Activity, Shield, TrendingUp, Globe, DollarSign,
  Target, Zap, BarChart3, MapPin, Clock, TrendingDown, Brain,
  Lock, AlertCircle, Users, Network, FileWarning
} from 'lucide-react';
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ScatterChart, Scatter, ZAxis
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];
const SEVERITY_COLORS = { critical: '#ef4444', high: '#f59e0b', medium: '#eab308', low: '#3b82f6' };

export default function EnhancedDashboard() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [advanced, setAdvanced] = useState<AdvancedAnalyticsResponse | null>(null);
  const [predictive, setPredictive] = useState<PredictiveAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'threat' | 'risk' | 'compliance' | 'cost'>('overview');

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [statsData, advancedData, predictiveData] = await Promise.all([
        alertsApi.getStats(),
        alertsApi.getAdvancedAnalytics(),
        alertsApi.getPredictiveAnalytics()
      ]);
      setStats(statsData);
      setAdvanced(advancedData);
      setPredictive(predictiveData);
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to load analytics';
      setError(errorMessage);
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-400 text-lg">Loading advanced analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-red-500/30 rounded-xl p-8 shadow-xl">
          <h3 className="text-xl font-semibold text-red-400 mb-2">Error Loading Analytics</h3>
          <p className="text-red-300/90">{error || 'Failed to load analytics'}</p>
          <button
            onClick={loadAllData}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-200 font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Prepare data for visualizations
  const threatActorsData = advanced ? Object.entries(advanced.threat_intelligence.top_threat_actors)
    .map(([name, value]) => ({ name, value })) : [];
  
  const attackStagesData = advanced ? Object.entries(advanced.threat_intelligence.attack_stages)
    .map(([name, value]) => ({ name, value })) : [];

  const riskDistributionData = advanced ? Object.entries(advanced.risk_analysis.risk_distribution)
    .map(([name, value]) => ({ name, value })) : [];

  const complianceData = advanced ? Object.entries(advanced.compliance.framework_violations)
    .map(([name, value]) => ({ name, violations: value })) : [];

  const costBySeverityData = advanced ? Object.entries(advanced.cost_impact.cost_by_severity)
    .map(([severity, cost]) => ({ severity: severity.toUpperCase(), cost: Math.round(cost) })) : [];

  const timePatternData = advanced ? Object.entries(advanced.time_patterns.by_hour)
    .map(([hour, count]) => ({ hour: `${hour.padStart(2, '0')}:00`, count, hourNum: parseInt(hour) }))
    .sort((a, b) => a.hourNum - b.hourNum)
    .map(({ hour, count }) => ({ hour, count })) : [];

  const countryData = advanced ? Object.entries(advanced.geographic.countries)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10) : [];

  const attackChainData = advanced ? Object.entries(advanced.threat_intelligence.attack_chain_sequence)
    .map(([stage, count]) => ({ stage, count })) : [];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Advanced Security Analytics Dashboard
          </h1>
          <p className="text-slate-400">Enterprise-grade threat intelligence and risk analysis</p>
        </div>
        <div className="flex items-center space-x-2 bg-slate-800/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700/50">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-slate-300">Live Data</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 bg-slate-800/60 backdrop-blur-sm rounded-lg p-1 border border-slate-700/50">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'threat', label: 'Threat Intel', icon: Target },
          { id: 'risk', label: 'Risk Analysis', icon: Shield },
          { id: 'compliance', label: 'Compliance', icon: Lock },
          { id: 'cost', label: 'Cost Impact', icon: DollarSign }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Alerts"
              value={stats.total_alerts.toLocaleString()}
              icon={AlertTriangle}
              color="blue"
            />
            <StatCard
              title="Avg Risk Score"
              value={advanced ? advanced.risk_analysis.average_risk_score.toFixed(1) : '0'}
              icon={Shield}
              color="red"
            />
            <StatCard
              title="Total Cost Impact"
              value={`$${advanced ? (advanced.cost_impact.total_cost_usd / 1000).toFixed(1) : '0'}K`}
              icon={DollarSign}
              color="yellow"
            />
            <StatCard
              title="Compliance Score"
              value={`${advanced ? advanced.compliance.compliance_score.toFixed(0) : '0'}%`}
              icon={Lock}
              color="green"
            />
          </div>

          {/* Predictive Analytics */}
          {predictive && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ChartCard title="Trend Analysis" className="lg:col-span-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {predictive.trend_analysis.direction === 'increasing' ? '↑' : '↓'} {predictive.trend_analysis.change_percentage.toFixed(1)}%
                      </p>
                      <p className="text-sm text-slate-400">Trend Change</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">{predictive.predictions.predicted_alerts_next_7_days.toLocaleString()}</p>
                      <p className="text-sm text-slate-400">Predicted (7 days)</p>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={Object.entries(predictive.daily_metrics.alerts).map(([date, count]) => ({ date, count })).slice(-14)}>
                      <defs>
                        <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="count" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTrend)" />
                      <XAxis dataKey="date" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </ChartCard>

              <ChartCard title="Risk Forecast">
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white mb-2">
                      {predictive.predictions.confidence === 'high' ? '🎯' : '📊'}
                    </p>
                    <p className="text-sm text-slate-400 mb-4">{predictive.predictions.confidence.toUpperCase()} Confidence</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Daily Avg</span>
                        <span className="text-white font-semibold">{predictive.predictions.predicted_daily_average}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Next 7 Days</span>
                        <span className="text-white font-semibold">{predictive.predictions.predicted_alerts_next_7_days}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ChartCard>
            </div>
          )}

          {/* Main Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Threat Actors Analysis">
              {threatActorsData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={threatActorsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" angle={-45} textAnchor="end" height={80} />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                    <Bar dataKey="value" fill="#ef4444" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-slate-400">No data available</div>
              )}
            </ChartCard>

            <ChartCard title="Attack Chain Sequence">
              {attackChainData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={attackChainData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis type="number" stroke="#94a3b8" />
                    <YAxis dataKey="stage" type="category" stroke="#94a3b8" width={150} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                    <Bar dataKey="count" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-slate-400">No data available</div>
              )}
            </ChartCard>
          </div>

          {/* Geographic and Time Patterns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Top Countries by Alert Volume">
              {countryData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={countryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="country" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                    <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-slate-400">No data available</div>
              )}
            </ChartCard>

            <ChartCard title="Hourly Alert Pattern">
              {timePatternData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={timePatternData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="hour" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                    <Line type="monotone" dataKey="count" stroke="#ec4899" strokeWidth={3} dot={{ fill: '#ec4899', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-slate-400">No data available</div>
              )}
            </ChartCard>
          </div>
        </>
      )}

      {/* Threat Intelligence Tab */}
      {activeTab === 'threat' && advanced && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StatCard
              title="Active Threat Actors"
              value={Object.keys(advanced.threat_intelligence.top_threat_actors).length}
              icon={Target}
              color="red"
            />
            <StatCard
              title="Attack Stages Detected"
              value={Object.keys(advanced.threat_intelligence.attack_stages).length}
              icon={Zap}
              color="yellow"
            />
            <StatCard
              title="IOC Types"
              value={Object.keys(advanced.threat_intelligence.ioc_types).length}
              icon={Network}
              color="purple"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Threat Actor Countries">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={Object.entries(advanced.threat_intelligence.threat_actor_countries).map(([name, value]) => ({ name, value }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {Object.entries(advanced.threat_intelligence.threat_actor_countries).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="IOC Types Distribution">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={Object.entries(advanced.threat_intelligence.ioc_types).map(([name, value]) => ({ name, value }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                  <Bar dataKey="value" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>
      )}

      {/* Risk Analysis Tab */}
      {activeTab === 'risk' && advanced && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <StatCard
              title="Average Risk Score"
              value={advanced.risk_analysis.average_risk_score.toFixed(1)}
              icon={Shield}
              color="red"
            />
            <StatCard
              title="High Risk Alerts"
              value={advanced.risk_analysis.risk_distribution.high + advanced.risk_analysis.risk_distribution.critical}
              icon={AlertCircle}
              color="orange"
            />
            <StatCard
              title="Avg Confidence"
              value={`${advanced.risk_analysis.average_confidence.toFixed(0)}%`}
              icon={Brain}
              color="blue"
            />
            <StatCard
              title="Exploitable"
              value={Object.entries(advanced.risk_analysis.exploitability_breakdown)
                .filter(([k]) => k !== 'none').reduce((sum, [_, v]) => sum + v, 0)}
              icon={Zap}
              color="yellow"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Risk Distribution">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={riskDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {riskDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Risk by Severity">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={Object.entries(advanced.risk_analysis.risk_by_severity).map(([severity, risk]) => ({ severity: severity.toUpperCase(), risk }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="severity" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                  <Bar dataKey="risk" fill="#ef4444" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          <ChartCard title="Exploitability Breakdown">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={Object.entries(advanced.risk_analysis.exploitability_breakdown).map(([name, value]) => ({ exploitability: name, count: value }))}>
                <PolarGrid />
                <PolarAngleAxis dataKey="exploitability" stroke="#94a3b8" />
                <PolarRadiusAxis stroke="#94a3b8" />
                <Radar name="Alerts" dataKey="count" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}

      {/* Compliance Tab */}
      {activeTab === 'compliance' && advanced && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StatCard
              title="Compliance Score"
              value={`${advanced.compliance.compliance_score.toFixed(1)}%`}
              icon={Lock}
              color={advanced.compliance.compliance_score > 80 ? 'green' : advanced.compliance.compliance_score > 60 ? 'yellow' : 'red'}
            />
            <StatCard
              title="Framework Violations"
              value={Object.keys(advanced.compliance.framework_violations).length}
              icon={FileWarning}
              color="red"
            />
            <StatCard
              title="Data Classifications"
              value={Object.keys(advanced.compliance.data_classifications).length}
              icon={Shield}
              color="blue"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Framework Violations">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={complianceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis type="number" stroke="#94a3b8" />
                  <YAxis dataKey="name" type="category" stroke="#94a3b8" width={120} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                  <Bar dataKey="violations" fill="#ef4444" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Data Classifications">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={Object.entries(advanced.compliance.data_classifications).map(([name, value]) => ({ name, value }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {Object.entries(advanced.compliance.data_classifications).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>
      )}

      {/* Cost Impact Tab */}
      {activeTab === 'cost' && advanced && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Cost Impact"
              value={`$${(advanced.cost_impact.total_cost_usd / 1000000).toFixed(2)}M`}
              icon={DollarSign}
              color="red"
            />
            <StatCard
              title="Total Downtime"
              value={`${(advanced.cost_impact.total_downtime_minutes / 60).toFixed(1)} hrs`}
              icon={Clock}
              color="yellow"
            />
            <StatCard
              title="Data Loss"
              value={`${(advanced.cost_impact.total_data_loss_mb / 1000).toFixed(1)} GB`}
              icon={FileWarning}
              color="orange"
            />
            <StatCard
              title="Avg Cost/Alert"
              value={`$${(advanced.cost_impact.total_cost_usd / stats.total_alerts).toFixed(2)}`}
              icon={TrendingUp}
              color="blue"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Cost by Severity">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={costBySeverityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="severity" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} formatter={(value: number) => `$${value.toLocaleString()}`} />
                  <Bar dataKey="cost" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Downtime by Severity">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={Object.entries(advanced.cost_impact.downtime_by_severity).map(([severity, minutes]) => ({ severity: severity.toUpperCase(), minutes: minutes / 60 }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="severity" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} formatter={(value: number) => `${value.toFixed(1)} hours`} />
                  <Bar dataKey="minutes" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </div>
      )}
    </div>
  );
}

