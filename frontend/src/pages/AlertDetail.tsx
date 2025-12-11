import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { alertsApi } from '../services/api';
import type { Alert } from '../types';
import { ArrowLeft, Calendar, Shield, AlertTriangle, MapPin } from 'lucide-react';
import { format } from 'date-fns';

const SEVERITY_COLORS = {
  critical: 'bg-red-500/20 text-red-400 border-red-500/30',
  high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  low: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

const STATUS_COLORS = {
  open: 'bg-red-500/20 text-red-400',
  in_progress: 'bg-yellow-500/20 text-yellow-400',
  closed: 'bg-green-500/20 text-green-400',
  resolved: 'bg-green-500/20 text-green-400',
};

export default function AlertDetail() {
  const { id } = useParams<{ id: string }>();
  const [alert, setAlert] = useState<Alert | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadAlert(id);
    }
  }, [id]);

  const loadAlert = async (alertId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await alertsApi.getAlert(alertId);
      setAlert(data);
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to load alert details';
      setError(errorMessage);
      console.error('Alert detail error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'PPpp');
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Link
          to="/alerts"
          className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Alerts</span>
        </Link>
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="text-slate-400">Loading alert details...</p>
        </div>
      </div>
    );
  }

  if (error || !alert) {
    return (
      <div className="space-y-4">
        <Link
          to="/alerts"
          className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Alerts</span>
        </Link>
        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-red-500/30 rounded-xl p-6 shadow-xl">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="h-6 w-6 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-400 mb-2">Error Loading Alert</h3>
              <p className="text-red-300 mb-4">{error || 'Alert not found'}</p>
              <button
                onClick={() => id && loadAlert(id)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const alertId = alert.id || alert.alert_id || alert.uuid || 'unknown';
  const severity = alert.severity || 'low';
  const status = alert.status || 'open';

  return (
    <div className="space-y-6 animate-fade-in">
      <Link
        to="/alerts"
        className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Alerts</span>
      </Link>

      {/* Header */}
      <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-lg">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Alert Details
            </h2>
            <p className="text-sm font-mono text-slate-400">{alertId}</p>
          </div>
          <div className="flex items-center space-x-3">
            <span
              className={`px-3 py-1 text-sm font-semibold rounded border ${
                SEVERITY_COLORS[severity as keyof typeof SEVERITY_COLORS] ||
                SEVERITY_COLORS.low
              }`}
            >
              {severity.toUpperCase()}
            </span>
            <span
              className={`px-3 py-1 text-sm font-semibold rounded ${
                STATUS_COLORS[status as keyof typeof STATUS_COLORS] || STATUS_COLORS.open
              }`}
            >
              {status.replace('_', ' ').toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <span className="h-1 w-1 bg-blue-500 rounded-full"></span>
              <AlertTriangle className="h-5 w-5" />
              <span>Alert Information</span>
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-400">Message</label>
                <p className="mt-1 text-white">{alert.message || 'No message available'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-400">Type</label>
                <p className="mt-1 text-white">{alert.type || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-400">Source</label>
                <p className="mt-1 text-white">{alert.source || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Resource Information */}
          {alert.resource && (
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <span className="h-1 w-1 bg-blue-500 rounded-full"></span>
                <Shield className="h-5 w-5" />
                <span>Resource Information</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-400">Resource Name</label>
                  <p className="mt-1 text-white">{alert.resource.name || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-400">Resource Type</label>
                  <p className="mt-1 text-white">{alert.resource.type || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-400">Resource ID</label>
                  <p className="mt-1 text-white font-mono text-sm">
                    {alert.resource.id || 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-400">Region</label>
                  <p className="mt-1 text-white flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{alert.resource.region || 'N/A'}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Raw JSON */}
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="h-1 w-1 bg-blue-500 rounded-full mr-2"></span>
              Raw Data
            </h3>
            <pre className="bg-slate-900 rounded-lg p-4 overflow-x-auto text-sm text-slate-300">
              {JSON.stringify(alert, null, 2)}
            </pre>
          </div>
        </div>

        {/* Right Column - Metadata */}
        <div className="space-y-6">
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <span className="h-1 w-1 bg-blue-500 rounded-full"></span>
              <Calendar className="h-5 w-5" />
              <span>Timestamps</span>
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-400">Timestamp</label>
                <p className="mt-1 text-white text-sm">
                  {formatDate(alert.timestamp || alert.time)}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Metadata */}
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="h-1 w-1 bg-blue-500 rounded-full mr-2"></span>
              Metadata
            </h3>
            <div className="space-y-3">
              {Object.entries(alert)
                .filter(
                  ([key]) =>
                    !['id', 'alert_id', 'uuid', 'severity', 'status', 'source', 'type', 'message', 'timestamp', 'time', 'resource'].includes(
                      key
                    )
                )
                .map(([key, value]) => (
                  <div key={key}>
                    <label className="text-sm font-medium text-slate-400 capitalize">
                      {key.replace(/_/g, ' ')}
                    </label>
                    <p className="mt-1 text-white text-sm">
                      {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

