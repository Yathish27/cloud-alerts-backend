from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from collections import Counter, defaultdict
from datetime import datetime
from pathlib import Path
from typing import Optional
import json

app = FastAPI(title="Cloud Alert API")

# Allow frontend / tools to call to API 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ALERTS = []
ALERTS_BY_ID = {}


def load_alerts() -> None:
    """
    Load alerts into memory.

    Tries aws_like_alerts_10000.json first (JSON array),
    then falls back to aws_like_alerts_10000.jsonl (JSONL, one object per line).
    """
    global ALERTS, ALERTS_BY_ID

    base = Path(__file__).parent
    json_path = base / "aws_like_alerts_10000.json"
    jsonl_path = base / "aws_like_alerts_10000.jsonl"

    ALERTS = []

    if jsonl_path.exists():
        # JSONL: one JSON object per line (preferred for large files)
        print(f"Loading alerts from {jsonl_path.name}...")
        with jsonl_path.open("r", encoding="utf-8") as f:
            count = 0
            for line in f:
                line = line.strip()
                if line:
                    ALERTS.append(json.loads(line))
                    count += 1
                    if count % 100000 == 0:
                        print(f"  Loaded {count:,} alerts...")
        source_name = jsonl_path.name

    elif json_path.exists():
        # Normal JSON array
        print(f"Loading alerts from {json_path.name}...")
        with json_path.open("r", encoding="utf-8") as f:
            ALERTS = json.load(f)
        source_name = json_path.name

    else:
        raise RuntimeError(
            f"Could not find aws_like_alerts_10000.json or aws_like_alerts_10000.jsonl in {base}"
        )

    # Build quick lookup by ID.
    print("Building alert index...")
    ALERTS_BY_ID = {}
    for alert in ALERTS:
        alert_id = alert.get("id") or alert.get("alert_id") or alert.get("uuid")
        if alert_id is not None:
            ALERTS_BY_ID[alert_id] = alert

    # Helpful debug print to see if it worked
    print(f"✅ Loaded {len(ALERTS):,} alerts from {source_name}")


# Load alerts when the app starts (import time)
load_alerts()


@app.get("/alerts")
def get_alerts(
    limit: int = 100,
    offset: int = 0,
    severity: Optional[str] = None,
    status: Optional[str] = None,
    source: Optional[str] = None,
    search: Optional[str] = None,
):
    """
    Return a list of alerts with optional filtering and pagination.

    Query params:
    - limit: max number of alerts to return (default 100)
    - offset: number of alerts to skip (for pagination)
    - severity: filter by severity (e.g. low|medium|high|critical)
    - status: filter by status (e.g. open|in_progress|closed)
    - source: filter by source (e.g. AWS-CloudTrail, GCP-CloudLogging)
    - search: simple text search in message/type/resource.name
    """
    filtered = ALERTS

    if severity:
        filtered = [a for a in filtered if a.get("severity") == severity]

    if status:
        filtered = [a for a in filtered if a.get("status") == status]

    if source:
        filtered = [a for a in filtered if a.get("source") == source]

    if search:
        needle = search.lower()
        def matches(a):
            msg = str(a.get("message", "")).lower()
            typ = str(a.get("type", "")).lower()
            res = a.get("resource") or {}
            res_name = str(res.get("name", "")).lower()
            return (needle in msg) or (needle in typ) or (needle in res_name)

        filtered = [a for a in filtered if matches(a)]

    paged = filtered[offset: offset + limit]

    return {
        "total": len(filtered),
        "limit": limit,
        "offset": offset,
        "items": paged,
    }


@app.get("/alerts/{alert_id}")
def get_alert(alert_id: str):
    """
    Return a single alert by its ID.
    """
    alert = ALERTS_BY_ID.get(alert_id)
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return alert


@app.get("/stats")
def get_stats():
    """
    Return statistics for the dashboard:
    - total alerts
    - counts by severity
    - counts by status
    - counts by source
    - alerts per day (for charts)
    """
    severity_counts = Counter(a.get("severity") for a in ALERTS)
    status_counts = Counter(a.get("status") for a in ALERTS)
    source_counts = Counter(a.get("source") for a in ALERTS)
    alerts_per_day = Counter()

    for alert in ALERTS:
        ts = alert.get("timestamp") or alert.get("time")
        if not ts:
            continue
        try:
            # Handle e.g. "2025-11-17T14:23:00Z"
            dt = datetime.fromisoformat(ts.replace("Z", "+00:00"))
            day = dt.date().isoformat()  # YYYY-MM-DD
            alerts_per_day[day] += 1
        except Exception:
            # If any timestamp is weird, just skip it
            continue

    return {
        "total_alerts": len(ALERTS),
        "by_severity": severity_counts,
        "by_status": status_counts,
        "by_source": source_counts,
        "by_day": alerts_per_day,
    }


@app.get("/analytics/advanced")
def get_advanced_analytics():
    """
    Advanced analytics that AWS doesn't provide:
    - Threat intelligence correlations
    - Risk scoring analysis
    - Geographic heatmap data
    - Attack chain visualization
    - Compliance scoring
    - Cost impact analysis
    - Anomaly detection metrics
    """
    from collections import defaultdict
    
    # Threat Intelligence Analysis
    threat_actors = Counter()
    threat_countries = Counter()
    attack_stages = Counter()
    ioc_types = Counter()
    
    # Risk Analysis
    risk_scores = []
    risk_by_severity = defaultdict(list)
    exploitability_counts = Counter()
    
    # Geographic Analysis
    country_counts = Counter()
    region_counts = Counter()
    geo_coords = []
    
    # Compliance Analysis
    compliance_frameworks = Counter()
    violation_severities = Counter()
    data_classifications = Counter()
    
    # Cost Impact Analysis
    total_cost = 0
    cost_by_severity = defaultdict(float)
    downtime_by_severity = defaultdict(int)
    data_loss_by_severity = defaultdict(int)
    
    # Attack Chain Analysis
    attack_chain_sequence = defaultdict(int)
    
    # Anomaly Detection
    confidence_scores = []
    correlation_ids = defaultdict(int)
    
    # Time-based patterns
    alerts_by_hour = Counter()
    alerts_by_day_of_week = Counter()
    
    for alert in ALERTS:
        # Threat Intelligence
        threat_info = alert.get("threat_intelligence", {})
        if threat_info:
            threat_actors[threat_info.get("threat_actor")] += 1
            threat_countries[threat_info.get("threat_actor_country")] += 1
            attack_stages[threat_info.get("attack_stage")] += 1
            ioc_types[threat_info.get("ioc_type")] += 1
        
        # Risk Analysis
        risk_info = alert.get("risk_analysis", {})
        if risk_info:
            risk_score = risk_info.get("risk_score", 0)
            risk_scores.append(risk_score)
            severity = alert.get("severity", "low")
            risk_by_severity[severity].append(risk_score)
            exploitability_counts[risk_info.get("exploitability")] += 1
        
        # Geographic
        resource = alert.get("resource", {})
        if resource:
            country = resource.get("country")
            region = resource.get("region")
            if country:
                country_counts[country] += 1
            if region:
                region_counts[region] += 1
            lat = resource.get("latitude")
            lon = resource.get("longitude")
            if lat and lon:
                geo_coords.append({"lat": lat, "lon": lon, "severity": alert.get("severity")})
        
        # Compliance
        compliance = alert.get("compliance", {})
        if compliance:
            for framework in compliance.get("frameworks", []):
                compliance_frameworks[framework] += 1
            violation_severities[compliance.get("violation_severity")] += 1
            data_classifications[compliance.get("data_classification")] += 1
        
        # Cost Impact
        cost_info = alert.get("cost_impact", {})
        if cost_info:
            cost = cost_info.get("estimated_cost_usd", 0)
            total_cost += cost
            severity = alert.get("severity", "low")
            cost_by_severity[severity] += cost
            downtime_by_severity[severity] += cost_info.get("downtime_minutes", 0)
            data_loss_by_severity[severity] += cost_info.get("data_loss_mb", 0)
        
        # Attack Chain
        if threat_info:
            stage = threat_info.get("attack_stage")
            if stage:
                attack_chain_sequence[stage] += 1
        
        # Anomaly Detection
        metadata = alert.get("metadata", {})
        confidence = risk_info.get("confidence", 0) if risk_info else 0
        if confidence > 0:
            confidence_scores.append(confidence)
        
        corr_id = metadata.get("correlation_id")
        if corr_id:
            correlation_ids[corr_id] += 1
        
        # Time patterns
        ts = alert.get("timestamp") or alert.get("time")
        if ts:
            try:
                dt = datetime.fromisoformat(ts.replace("Z", "+00:00"))
                alerts_by_hour[dt.hour] += 1
                alerts_by_day_of_week[dt.strftime("%A")] += 1
            except:
                pass
    
    # Calculate statistics
    avg_risk_score = sum(risk_scores) / len(risk_scores) if risk_scores else 0
    avg_confidence = sum(confidence_scores) / len(confidence_scores) if confidence_scores else 0
    
    # Risk distribution
    risk_distribution = {
        "critical": len([r for r in risk_scores if r >= 80]),
        "high": len([r for r in risk_scores if 60 <= r < 80]),
        "medium": len([r for r in risk_scores if 40 <= r < 60]),
        "low": len([r for r in risk_scores if r < 40])
    }
    
    # Top correlated alerts (potential attack campaigns)
    top_correlations = dict(Counter(correlation_ids).most_common(10))
    
    return {
        "threat_intelligence": {
            "top_threat_actors": dict(threat_actors.most_common(10)),
            "threat_actor_countries": dict(threat_countries),
            "attack_stages": dict(attack_stages),
            "ioc_types": dict(ioc_types),
            "attack_chain_sequence": dict(attack_chain_sequence)
        },
        "risk_analysis": {
            "average_risk_score": round(avg_risk_score, 2),
            "risk_distribution": risk_distribution,
            "risk_by_severity": {k: round(sum(v)/len(v), 2) if v else 0 for k, v in risk_by_severity.items()},
            "exploitability_breakdown": dict(exploitability_counts),
            "average_confidence": round(avg_confidence, 2)
        },
        "geographic": {
            "countries": dict(country_counts),
            "regions": dict(region_counts),
            "heatmap_data": geo_coords[:10000]  # Limit for performance
        },
        "compliance": {
            "framework_violations": dict(compliance_frameworks),
            "violation_severities": dict(violation_severities),
            "data_classifications": dict(data_classifications),
            "compliance_score": round((1 - len([a for a in ALERTS if a.get("compliance", {}).get("frameworks")]) / len(ALERTS)) * 100, 2) if ALERTS else 0
        },
        "cost_impact": {
            "total_cost_usd": round(total_cost, 2),
            "cost_by_severity": {k: round(v, 2) for k, v in cost_by_severity.items()},
            "total_downtime_minutes": sum(downtime_by_severity.values()),
            "total_data_loss_mb": sum(data_loss_by_severity.values()),
            "downtime_by_severity": dict(downtime_by_severity),
            "data_loss_by_severity": dict(data_loss_by_severity)
        },
        "anomaly_detection": {
            "correlated_alerts": len([c for c in correlation_ids.values() if c > 1]),
            "top_correlations": top_correlations,
            "high_confidence_alerts": len([c for c in confidence_scores if c >= 90]),
            "low_confidence_alerts": len([c for c in confidence_scores if c < 80])
        },
        "time_patterns": {
            "by_hour": dict(alerts_by_hour),
            "by_day_of_week": dict(alerts_by_day_of_week)
        }
    }


@app.get("/analytics/predictive")
def get_predictive_analytics():
    """
    Predictive analytics and trend analysis:
    - Alert trend prediction
    - Risk forecast
    - Attack pattern prediction
    """
    from datetime import timedelta
    
    # Get last 30 days of data
    end_date = datetime.now()
    start_date = end_date - timedelta(days=30)
    
    daily_counts = Counter()
    daily_risk = defaultdict(list)
    daily_cost = defaultdict(float)
    
    for alert in ALERTS:
        ts = alert.get("timestamp") or alert.get("time")
        if not ts:
            continue
        try:
            dt = datetime.fromisoformat(ts.replace("Z", "+00:00"))
            if start_date <= dt <= end_date:
                day = dt.date().isoformat()
                daily_counts[day] += 1
                
                risk_info = alert.get("risk_analysis", {})
                if risk_info:
                    daily_risk[day].append(risk_info.get("risk_score", 0))
                
                cost_info = alert.get("cost_impact", {})
                if cost_info:
                    daily_cost[day] += cost_info.get("estimated_cost_usd", 0)
        except:
            pass
    
    # Calculate trends
    sorted_days = sorted(daily_counts.keys())
    if len(sorted_days) >= 7:
        recent_avg = sum([daily_counts[d] for d in sorted_days[-7:]]) / 7
        previous_avg = sum([daily_counts[d] for d in sorted_days[-14:-7]]) / 7 if len(sorted_days) >= 14 else recent_avg
        trend_direction = "increasing" if recent_avg > previous_avg else "decreasing"
        trend_percentage = abs((recent_avg - previous_avg) / previous_avg * 100) if previous_avg > 0 else 0
    else:
        trend_direction = "stable"
        trend_percentage = 0
        recent_avg = sum(daily_counts.values()) / len(daily_counts) if daily_counts else 0
    
    # Predict next 7 days (simple linear projection)
    predicted_daily = round(recent_avg, 0)
    predicted_next_7_days = predicted_daily * 7
    
    return {
        "trend_analysis": {
            "direction": trend_direction,
            "change_percentage": round(trend_percentage, 2),
            "recent_average": round(recent_avg, 2),
            "current_rate": daily_counts.get(sorted_days[-1] if sorted_days else "", 0)
        },
        "predictions": {
            "predicted_alerts_next_7_days": int(predicted_next_7_days),
            "predicted_daily_average": int(predicted_daily),
            "confidence": "high" if len(sorted_days) >= 14 else "medium"
        },
        "daily_metrics": {
            "alerts": dict(daily_counts),
            "average_risk": {k: round(sum(v)/len(v), 2) if v else 0 for k, v in daily_risk.items()},
            "cost": {k: round(v, 2) for k, v in daily_cost.items()}
        }
    }


# run the server directly with "Run" in PyCharm
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
