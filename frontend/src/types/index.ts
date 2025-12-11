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

export interface AdvancedAnalyticsResponse {
  threat_intelligence: {
    top_threat_actors: Record<string, number>;
    threat_actor_countries: Record<string, number>;
    attack_stages: Record<string, number>;
    ioc_types: Record<string, number>;
    attack_chain_sequence: Record<string, number>;
  };
  risk_analysis: {
    average_risk_score: number;
    risk_distribution: Record<string, number>;
    risk_by_severity: Record<string, number>;
    exploitability_breakdown: Record<string, number>;
    average_confidence: number;
  };
  geographic: {
    countries: Record<string, number>;
    regions: Record<string, number>;
    heatmap_data: Array<{ lat: number; lon: number; severity: string }>;
  };
  compliance: {
    framework_violations: Record<string, number>;
    violation_severities: Record<string, number>;
    data_classifications: Record<string, number>;
    compliance_score: number;
  };
  cost_impact: {
    total_cost_usd: number;
    cost_by_severity: Record<string, number>;
    total_downtime_minutes: number;
    total_data_loss_mb: number;
    downtime_by_severity: Record<string, number>;
    data_loss_by_severity: Record<string, number>;
  };
  anomaly_detection: {
    correlated_alerts: number;
    top_correlations: Record<string, number>;
    high_confidence_alerts: number;
    low_confidence_alerts: number;
  };
  time_patterns: {
    by_hour: Record<string, number>;
    by_day_of_week: Record<string, number>;
  };
}

export interface PredictiveAnalyticsResponse {
  trend_analysis: {
    direction: string;
    change_percentage: number;
    recent_average: number;
    current_rate: number;
  };
  predictions: {
    predicted_alerts_next_7_days: number;
    predicted_daily_average: number;
    confidence: string;
  };
  daily_metrics: {
    alerts: Record<string, number>;
    average_risk: Record<string, number>;
    cost: Record<string, number>;
  };
}

