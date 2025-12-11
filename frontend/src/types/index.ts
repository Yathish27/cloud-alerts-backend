export interface Alert {
  id?: string;
  alert_id?: string;
  uuid?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  status?: 'open' | 'in_progress' | 'closed' | 'resolved';
  source?: string;
  type?: string;
  message?: string;
  timestamp?: string;
  time?: string;
  resource?: {
    name?: string;
    type?: string;
    id?: string;
    region?: string;
  };
  [key: string]: any;
}

export interface AlertsResponse {
  total: number;
  limit: number;
  offset: number;
  items: Alert[];
}

export interface StatsResponse {
  total_alerts: number;
  by_severity: Record<string, number>;
  by_status: Record<string, number>;
  by_source: Record<string, number>;
  by_day: Record<string, number>;
}

