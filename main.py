from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from collections import Counter
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

    if json_path.exists():
        # Normal JSON array
        with json_path.open("r", encoding="utf-8") as f:
            ALERTS = json.load(f)
        source_name = json_path.name

    elif jsonl_path.exists():
        # JSONL: one JSON object per line
        with jsonl_path.open("r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line:
                    ALERTS.append(json.loads(line))
        source_name = jsonl_path.name

    else:
        raise RuntimeError(
            f"Could not find aws_like_alerts_10000.json or aws_like_alerts_10000.jsonl in {base}"
        )

    # Build quick lookup by ID.
    ALERTS_BY_ID = {}
    for alert in ALERTS:
        alert_id = alert.get("id") or alert.get("alert_id") or alert.get("uuid")
        if alert_id is not None:
            ALERTS_BY_ID[alert_id] = alert

    # Helpful debug print to see if it worked
    print(f"Loaded {len(ALERTS)} alerts from {source_name}")


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


# run the server directly with "Run" in PyCharm
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
