# 🔒 Cloud Security Alerts System

A comprehensive cloud security monitoring system with a FastAPI backend and a modern React frontend for visualizing and managing security alerts. This application provides real-time analytics, interactive dashboards, and powerful alert management capabilities.

![Cloud Security Alerts](https://img.shields.io/badge/Status-Active-success)
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![React](https://img.shields.io/badge/React-18-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Advanced Analytics & Intelligence](#-advanced-analytics--intelligence)
  - [Threat Intelligence Analytics](#-threat-intelligence-analytics)
  - [Risk Scoring & Analysis](#️-risk-scoring--analysis)
  - [Predictive Analytics](#-predictive-analytics)
  - [Cost Impact Analysis](#-cost-impact-analysis)
  - [Compliance Intelligence](#-compliance-intelligence)
  - [Geographic Analytics](#️-geographic-analytics)
  - [Anomaly Detection & Correlation](#-anomaly-detection--correlation)
  - [Time Pattern Analysis](#-time-pattern-analysis)
- [How This System Differs from AWS Security Hub](#-how-this-system-differs-from-aws-security-hub)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Usage Guide](#usage-guide)
- [Troubleshooting](#troubleshooting)
- [Development](#development)
- [Contributing](#contributing)

## 🎯 Overview

This Cloud Security Alerts System is designed to help security teams monitor, analyze, and manage security alerts from multiple cloud providers. It provides:

- **Real-time Dashboard** with comprehensive analytics and visualizations
- **Alert Management** with advanced filtering and search capabilities
- **Multi-cloud Support** for AWS, GCP, Azure, and more
- **Interactive Charts** for data visualization
- **RESTful API** for easy integration

## ✨ Features

### Backend (FastAPI)
- ✅ RESTful API with automatic OpenAPI documentation
- ✅ Advanced alert filtering (severity, status, source, search)
- ✅ Pagination support for large datasets
- ✅ Statistics endpoint for dashboard analytics
- ✅ CORS enabled for frontend integration
- ✅ Support for JSON and JSONL data formats

### Frontend (React + TypeScript)
- 📊 **Dashboard**
  - Total alerts overview with key metrics
  - Severity distribution (interactive pie chart)
  - Status breakdown (bar chart)
  - Top sources analysis (horizontal bar chart)
  - Timeline visualization (line chart showing alerts over time)
  
- 🔍 **Alerts Management**
  - Real-time search across alerts
  - Advanced filtering by severity, status, and source
  - Pagination for efficient browsing
  - Responsive table layout
  - Color-coded severity and status indicators
  
- 📄 **Alert Details**
  - Complete alert information display
  - Resource details and metadata
  - Raw JSON view for developers
  - Timestamp information

### Design Features
- 🎨 Modern dark theme optimized for security dashboards
- 📱 Fully responsive design (desktop, tablet, mobile)
- ⚡ Fast performance with Vite build tool
- 🎭 Smooth animations and transitions
- 🔄 Real-time data updates

## 📊 Advanced Analytics & Intelligence

This system provides **enterprise-grade analytics** that go far beyond what traditional cloud security platforms offer. Here's what makes it unique:

### 🎯 Threat Intelligence Analytics

**What It Provides:**
- **Threat Actor Identification**: Automatically identifies and tracks known Advanced Persistent Threat (APT) groups like APT28, Lazarus, FIN7, Scattered Spider, and others
- **Attack Chain Visualization**: Maps the complete cyber kill chain from Reconnaissance → Weaponization → Delivery → Exploitation → Installation → Command & Control → Actions on Objectives
- **IOC (Indicators of Compromise) Tracking**: Categorizes and tracks IP addresses, domains, file hashes, and URLs associated with threats
- **Geographic Threat Mapping**: Visualizes threat origins by country, showing where attacks are coming from globally

**What It Indicates:**
- **Threat Actor Analysis** helps security teams understand if they're being targeted by specific nation-state actors or cybercriminal groups
- **Attack Chain Sequence** reveals the stage of an attack, helping prioritize response efforts (early-stage attacks are easier to stop)
- **IOC Tracking** enables proactive blocking of known malicious indicators across your infrastructure
- **Geographic Analysis** helps identify patterns like coordinated attacks from specific regions

**How It Differs from AWS Security Hub:**
- AWS Security Hub provides basic threat intelligence but doesn't correlate alerts with specific threat actors
- This system automatically identifies and tracks APT groups, providing context that AWS doesn't offer
- Attack chain visualization helps understand the progression of multi-stage attacks, which AWS doesn't visualize

### 🛡️ Risk Scoring & Analysis

**What It Provides:**
- **Dynamic Risk Scoring (0-100)**: Multi-factor risk calculation based on:
  - Alert severity (low/medium/high/critical)
  - Detection confidence level (70-100%)
  - Threat actor risk profile
  - Attack complexity assessment
  - Exploitability rating
- **Risk Distribution**: Categorizes all alerts into risk buckets (Critical ≥80, High 60-79, Medium 40-59, Low <40)
- **Risk by Severity**: Shows average risk scores for each severity level
- **Exploitability Breakdown**: Analyzes how easily vulnerabilities can be exploited

**What It Indicates:**
- **High Risk Scores (80-100)**: Immediate attention required - these are likely active attacks or critical vulnerabilities
- **Medium Risk Scores (40-79)**: Requires investigation - potential security issues that need monitoring
- **Low Risk Scores (<40)**: Lower priority - may be false positives or low-impact events
- **Exploitability Analysis** helps prioritize patching efforts - focus on easily exploitable vulnerabilities first

**How It Differs from AWS Security Hub:**
- AWS Security Hub uses static severity levels (low/medium/high/critical) but doesn't calculate dynamic risk scores
- This system considers multiple factors beyond just severity, providing more nuanced risk assessment
- The exploitability analysis helps with vulnerability management prioritization, which AWS doesn't provide

### 🔮 Predictive Analytics

**What It Provides:**
- **Trend Analysis**: Identifies whether threat activity is increasing, decreasing, or stable
- **7-Day Forecast**: Predicts expected alert volumes for the next week based on historical patterns
- **Trend Direction**: Shows percentage change in alert rates (e.g., "↑ 15.3% increase")
- **Confidence Levels**: Provides High/Medium/Low confidence ratings for predictions

**What It Indicates:**
- **Increasing Trends**: May indicate an active attack campaign or emerging threat
- **Decreasing Trends**: Suggests security improvements are working or threats are subsiding
- **Predictions**: Help with resource planning - if alerts are predicted to increase, allocate more security resources
- **Confidence Levels**: Higher confidence means more reliable predictions (based on more historical data)

**How It Differs from AWS Security Hub:**
- AWS Security Hub shows current and historical data but doesn't provide predictive analytics
- This system uses pattern recognition to forecast future threat activity
- Trend analysis helps security teams prepare for upcoming threats proactively

### 💰 Cost Impact Analysis

**What It Provides:**
- **Financial Impact Calculation**: Estimates the cost in USD for each security incident
- **Total Cost Impact**: Sum of all potential costs from security alerts
- **Cost by Severity**: Breaks down costs by alert severity level
- **Downtime Tracking**: Calculates total downtime in minutes/hours
- **Data Loss Metrics**: Tracks potential data loss in MB/GB

**What It Indicates:**
- **High Cost Alerts**: Help prioritize remediation based on financial impact, not just technical severity
- **Downtime Analysis**: Shows which incidents cause the most operational disruption
- **Data Loss Metrics**: Quantifies the potential data breach impact
- **ROI Calculations**: Helps justify security investments by showing potential cost savings

**How It Differs from AWS Security Hub:**
- AWS Security Hub doesn't provide cost impact analysis for security incidents
- This system helps security teams communicate with business stakeholders using financial metrics
- Cost-based prioritization helps allocate security resources more effectively

### ✅ Compliance Intelligence

**What It Provides:**
- **Multi-Framework Support**: Tracks violations across:
  - **SOC2**: Service Organization Control 2 (security, availability, processing integrity)
  - **PCI-DSS**: Payment Card Industry Data Security Standard
  - **HIPAA**: Health Insurance Portability and Accountability Act
  - **GDPR**: General Data Protection Regulation
  - **ISO27001**: Information Security Management System standard
  - **NIST**: National Institute of Standards and Technology framework
  - **CIS**: Center for Internet Security controls
- **Compliance Score**: Real-time percentage (0-100%) showing overall compliance status
- **Framework Violations**: Lists which compliance frameworks are being violated
- **Data Classification Tracking**: Monitors data sensitivity (Public, Internal, Confidential, Restricted)

**What It Indicates:**
- **Low Compliance Score**: Indicates significant compliance gaps that need immediate attention
- **Framework Violations**: Shows which regulatory requirements are not being met
- **Data Classification**: Helps ensure sensitive data is properly protected according to classification level
- **Violation Severity**: Helps prioritize compliance remediation efforts

**How It Differs from AWS Security Hub:**
- AWS Security Hub provides some compliance checks but doesn't calculate overall compliance scores
- This system tracks multiple frameworks simultaneously, providing a unified compliance view
- The compliance score gives executives a quick snapshot of regulatory risk

### 🗺️ Geographic Analytics

**What It Provides:**
- **World Map Heatmap**: Visual representation of alerts by geographic location
- **Country-Level Analysis**: Top countries by alert volume
- **Region Distribution**: Cloud region breakdown with coordinates
- **Threat Origin Mapping**: Shows where threats are originating from

**What It Indicates:**
- **Geographic Clustering**: May indicate coordinated attacks from specific regions
- **Unusual Locations**: Alerts from unexpected countries may indicate compromised accounts or VPN usage
- **Regional Patterns**: Helps identify if certain cloud regions are more targeted than others
- **Threat Origin**: Understanding attack origins helps with threat intelligence and blocking

**How It Differs from AWS Security Hub:**
- AWS Security Hub shows region information but doesn't provide geographic visualization or heatmaps
- This system correlates geographic data with threat intelligence for better context
- The heatmap visualization makes it easy to spot geographic attack patterns

### 🔍 Anomaly Detection & Correlation

**What It Provides:**
- **Correlation Analysis**: Identifies related alerts that may indicate coordinated attacks
- **Attack Campaign Detection**: Groups correlated alerts to identify multi-stage attack campaigns
- **High Confidence Alerts**: Flags alerts with >90% confidence (likely true positives)
- **Low Confidence Alerts**: Identifies alerts with <80% confidence (potential false positives)

**What It Indicates:**
- **Correlated Alerts**: Multiple related alerts may indicate an active attack campaign rather than isolated incidents
- **High Confidence**: Focus investigation efforts on high-confidence alerts first
- **Low Confidence**: May indicate false positives that need tuning or can be deprioritized
- **Campaign Detection**: Helps security teams understand the full scope of an attack

**How It Differs from AWS Security Hub:**
- AWS Security Hub shows individual alerts but doesn't automatically correlate related incidents
- This system identifies attack campaigns by correlating alerts, providing better context
- Confidence scoring helps reduce alert fatigue by prioritizing high-confidence incidents

### ⏰ Time Pattern Analysis

**What It Provides:**
- **Hourly Patterns**: Identifies peak attack times throughout the day
- **Day of Week Analysis**: Shows which days have the most security activity
- **Temporal Correlation**: Links time-based patterns to threat types

**What It Indicates:**
- **Peak Hours**: Understanding when attacks occur helps with resource allocation
- **Weekend Patterns**: Attacks often increase on weekends when security teams are smaller
- **Time-Based Trends**: May indicate automated attacks or human-operated campaigns
- **Pattern Recognition**: Helps identify if attacks follow predictable schedules

**How It Differs from AWS Security Hub:**
- AWS Security Hub shows timestamps but doesn't analyze temporal patterns
- This system identifies time-based attack patterns that can inform security operations
- Pattern analysis helps optimize security team schedules and resource allocation

## 🆚 How This System Differs from AWS Security Hub

### Key Differentiators

| Feature | This System | AWS Security Hub |
|---------|------------|------------------|
| **Threat Actor Correlation** | ✅ Automatically identifies and tracks APT groups | ❌ Basic threat intelligence only |
| **Risk Scoring** | ✅ Dynamic multi-factor risk calculation (0-100) | ❌ Static severity levels only |
| **Predictive Analytics** | ✅ 7-day forecasts and trend predictions | ❌ Historical data only |
| **Cost Impact Analysis** | ✅ Financial impact calculations and ROI metrics | ❌ No cost analysis |
| **Compliance Scoring** | ✅ Real-time compliance percentage across multiple frameworks | ⚠️ Limited compliance checks |
| **Attack Chain Visualization** | ✅ Complete kill chain mapping | ❌ No attack chain analysis |
| **Geographic Heatmaps** | ✅ Visual threat origin mapping | ❌ Region data only |
| **Anomaly Correlation** | ✅ Automatic campaign detection | ❌ Individual alerts only |
| **Time Pattern Analysis** | ✅ Temporal pattern recognition | ❌ Timestamp data only |
| **Custom Risk Models** | ✅ Configurable risk calculation | ❌ Fixed severity model |

### Why These Differences Matter

1. **Better Context**: Threat actor identification provides context that helps understand attack motivations and methods
2. **Smarter Prioritization**: Risk scoring helps prioritize alerts based on multiple factors, not just severity
3. **Proactive Security**: Predictive analytics help prepare for future threats, not just react to current ones
4. **Business Alignment**: Cost impact analysis helps communicate security risks in business terms
5. **Compliance Readiness**: Multi-framework compliance tracking helps meet regulatory requirements
6. **Attack Understanding**: Attack chain visualization helps security teams understand and stop multi-stage attacks
7. **Pattern Recognition**: Geographic and temporal analysis helps identify coordinated attacks

## 💼 Real-World Use Cases

### Security Operations Center (SOC)
**Scenario**: A SOC analyst sees 50 new alerts in the past hour.

**How This System Helps:**
- **Risk Scoring**: Immediately identifies which alerts have risk scores >80 (critical) vs <40 (low priority)
- **Threat Actor Correlation**: Shows if alerts are from known APT groups, indicating targeted attack
- **Attack Chain Analysis**: Reveals if alerts are part of a coordinated campaign (e.g., all in "Exploitation" stage)
- **Cost Impact**: Prioritizes alerts with highest financial impact first
- **Time Patterns**: Identifies if this is unusual activity (e.g., weekend attacks when team is smaller)

**Result**: Analyst focuses on 5 high-risk alerts from APT28 instead of investigating all 50, saving hours of time.

### Compliance Officer
**Scenario**: Preparing for a SOC2 audit next month.

**How This System Helps:**
- **Compliance Score**: Shows current compliance at 72% - needs improvement
- **Framework Violations**: Lists specific SOC2 controls being violated
- **Data Classification**: Identifies Confidential data being accessed inappropriately
- **Trend Analysis**: Shows compliance improving (was 65% last month)

**Result**: Officer knows exactly which violations to fix before audit, improving score to 85%.

### Security Manager
**Scenario**: Need to justify additional security budget to executives.

**How This System Helps:**
- **Cost Impact Analysis**: Shows $3M in potential costs from current threats
- **Predictive Analytics**: Forecasts 30% increase in threats next quarter
- **ROI Calculation**: Demonstrates that $500K security investment prevents $3M in potential losses
- **Risk Distribution**: Shows 200 critical-risk alerts requiring immediate attention

**Result**: Manager gets budget approval with data-driven business case.

### Incident Response Team
**Scenario**: Investigating a potential data breach.

**How This System Helps:**
- **Attack Chain Visualization**: Shows attack progressed from Reconnaissance → Exploitation → Data Exfiltration
- **Geographic Analysis**: Identifies attack originated from Russia (APT28)
- **Correlation Analysis**: Links 15 related alerts that are part of same campaign
- **Time Patterns**: Shows attack started 3 days ago, escalated yesterday

**Result**: Team understands full attack scope and can contain it faster.

### Cloud Security Architect
**Scenario**: Designing security architecture for new cloud deployment.

**How This System Helps:**
- **Geographic Patterns**: Shows which regions have most attacks (avoid those for sensitive workloads)
- **Resource Type Analysis**: Identifies which resource types (S3, EC2, etc.) are most targeted
- **Compliance Requirements**: Shows which frameworks apply to different data classifications
- **Predictive Trends**: Forecasts future threat patterns to design proactive defenses

**Result**: Architect designs more secure architecture based on threat intelligence.

## 🎓 Understanding the Analytics

### Interpreting Risk Scores

- **90-100 (Critical Risk)**: Immediate action required. Likely active attack or critical vulnerability. Escalate to security team immediately.
- **70-89 (High Risk)**: Urgent investigation needed. High probability of security issue. Investigate within hours.
- **50-69 (Medium Risk)**: Requires investigation. Moderate security concern. Review within 24 hours.
- **30-49 (Low-Medium Risk)**: Monitor and review. Lower priority but should be investigated. Review within days.
- **0-29 (Low Risk)**: Low priority. May be false positive or low-impact event. Review when time permits.

### Understanding Threat Actors

- **APT28 (Fancy Bear)**: Russian state-sponsored group. Targets government, military, and defense contractors. Indicates sophisticated attack.
- **Lazarus**: North Korean group. Focuses on financial institutions and cryptocurrency. High financial risk.
- **FIN7**: Financially motivated cybercriminal group. Targets payment card data. Indicates data theft attempt.
- **Scattered Spider**: Modern ransomware group. Targets cloud infrastructure. Indicates potential encryption threat.
- **Unknown**: Could be new threat actor or low-confidence detection. Requires investigation.

### Reading Attack Chains

The attack chain shows the progression of an attack:

1. **Reconnaissance**: Attacker is gathering information (scanning, probing)
2. **Weaponization**: Creating attack tools or malware
3. **Delivery**: Delivering weaponized payload (email, USB, etc.)
4. **Exploitation**: Exploiting vulnerability to gain access
5. **Installation**: Installing malware or backdoor
6. **Command & Control**: Establishing communication channel
7. **Actions on Objectives**: Achieving attack goals (data theft, encryption, etc.)

**Early Stage (1-3)**: Easier to stop, less damage done
**Mid Stage (4-5)**: Requires immediate response, some access gained
**Late Stage (6-7)**: Significant damage possible, urgent containment needed

### Cost Impact Interpretation

- **High Cost Alerts**: Even if technically "medium" severity, high cost alerts should be prioritized
- **Downtime Costs**: Shows operational impact - helps IT teams understand business disruption
- **Data Loss Costs**: Quantifies potential breach impact - helps with breach notification decisions
- **Total Cost**: Helps justify security investments and resource allocation

### Compliance Score Meaning

- **90-100%**: Excellent compliance. Ready for audit. Minimal remediation needed.
- **75-89%**: Good compliance. Some gaps exist. Address before audit.
- **60-74%**: Moderate compliance. Significant gaps. Requires remediation plan.
- **Below 60%**: Poor compliance. Major violations. Immediate action required.

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **Uvicorn** - Lightning-fast ASGI server
- **Python 3.8+** - Programming language

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Composable charting library
- **React Router** - Declarative routing
- **Axios** - Promise-based HTTP client
- **Lucide React** - Beautiful icon library
- **date-fns** - Date utility library

## 📁 Project Structure

```
cloud-alerts-backend/
├── main.py                      # FastAPI backend server
├── convertJSON.py               # JSON conversion utility
├── generate_sample_data.py      # Sample data generator
├── requirements.txt             # Python dependencies
├── aws_like_alerts_10000.json  # Alert data file (generated)
├── start_backend.bat           # Windows startup script
├── start_backend.sh            # Linux/Mac startup script
│
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── Layout.tsx      # Main layout component
│   │   │   ├── StatCard.tsx   # Statistics card component
│   │   │   └── ChartCard.tsx  # Chart wrapper component
│   │   ├── pages/              # Page components
│   │   │   ├── Dashboard.tsx  # Dashboard page
│   │   │   ├── AlertsList.tsx # Alerts listing page
│   │   │   └── AlertDetail.tsx # Alert detail page
│   │   ├── services/           # API services
│   │   │   └── api.ts         # API client
│   │   ├── types/              # TypeScript types
│   │   │   └── index.ts       # Type definitions
│   │   ├── App.tsx            # Main app component
│   │   ├── main.tsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── public/                 # Static assets
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.ts         # Vite configuration
│   ├── tailwind.config.js     # Tailwind configuration
│   └── tsconfig.json          # TypeScript configuration
│
├── README.md                   # This file
├── QUICKSTART.md              # Quick start guide
├── START_HERE.md              # Getting started guide
├── DATA_SETUP.md              # Data setup instructions
└── FIXES.md                   # Fixes and improvements log
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8 or higher** - [Download Python](https://www.python.org/downloads/)
- **Node.js 18 or higher** - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** or **pnpm**
- **Git** (optional, for cloning the repository)

### Verify Installation

```bash
# Check Python version
python --version
# Should output: Python 3.x.x

# Check Node.js version
node --version
# Should output: v18.x.x or higher

# Check npm version
npm --version
# Should output: 9.x.x or higher
```

## 🚀 Installation

### Step 1: Clone or Download the Repository

If you have Git:
```bash
git clone <repository-url>
cd cloud-alerts-backend
```

Or download and extract the ZIP file.

### Step 2: Set Up Backend

1. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

   Or install manually:
   ```bash
   pip install fastapi uvicorn
   ```

2. **Generate sample data** (if you don't have your own data file):
   ```bash
   python generate_sample_data.py
   ```

   This creates `aws_like_alerts_10000.json` with 1000 sample alerts.

### Step 3: Set Up Frontend

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

   This may take a few minutes as it downloads all required packages.

## 🏃 Running the Application

### Quick Start (Recommended)

#### Option 1: Using Helper Scripts

**Windows:**
```bash
# Terminal 1: Start backend
start_backend.bat

# Terminal 2: Start frontend
cd frontend
npm run dev
```

**Mac/Linux:**
```bash
# Terminal 1: Start backend
chmod +x start_backend.sh
./start_backend.sh

# Terminal 2: Start frontend
cd frontend
npm run dev
```

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
python main.py
```

You should see:
```
Loaded 1000 alerts from aws_like_alerts_10000.json
INFO:     Started server process [xxxxx]
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [xxxxx] using WatchFiles
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### Access the Application

1. **Frontend Dashboard**: Open [http://localhost:3000](http://localhost:3000) in your browser
2. **Backend API Docs**: Open [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) for interactive API documentation

### Important Notes

⚠️ **You need TWO terminal windows running simultaneously:**
- **Terminal 1**: Backend server (`python main.py`)
- **Terminal 2**: Frontend server (`cd frontend && npm run dev`)

Both must be running for the application to work properly.

## 📡 API Documentation

Once the backend is running, you can access:

- **Swagger UI**: http://127.0.0.1:8000/docs
- **ReDoc**: http://127.0.0.1:8000/redoc

### API Endpoints

#### Get Alerts
```http
GET /alerts?limit=100&offset=0&severity=high&status=open&source=AWS&search=keyword
```

**Query Parameters:**
- `limit` (optional): Number of alerts to return (default: 100)
- `offset` (optional): Number of alerts to skip (default: 0)
- `severity` (optional): Filter by severity (low, medium, high, critical)
- `status` (optional): Filter by status (open, in_progress, closed, resolved)
- `source` (optional): Filter by source (e.g., AWS-CloudTrail)
- `search` (optional): Search in message, type, or resource name

**Response:**
```json
{
  "total": 1000,
  "limit": 100,
  "offset": 0,
  "items": [...]
}
```

#### Get Alert by ID
```http
GET /alerts/{alert_id}
```

**Response:**
```json
{
  "id": "uuid",
  "severity": "high",
  "status": "open",
  "source": "AWS-CloudTrail",
  ...
}
```

#### Get Statistics
```http
GET /stats
```

**Response:**
```json
{
  "total_alerts": 1000,
  "by_severity": {"low": 250, "medium": 250, "high": 250, "critical": 250},
  "by_status": {"open": 300, "in_progress": 200, "closed": 300, "resolved": 200},
  "by_source": {"AWS-CloudTrail": 200, ...},
  "by_day": {"2024-01-01": 50, ...}
}
```

#### Get Advanced Analytics
```http
GET /analytics/advanced
```

**Response:**
```json
{
  "threat_intelligence": {
    "top_threat_actors": {"APT28": 45, "Lazarus": 32, ...},
    "threat_actor_countries": {"Russia": 45, "North Korea": 32, ...},
    "attack_stages": {"Exploitation": 120, "CommandControl": 85, ...},
    "ioc_types": {"IP": 200, "Domain": 150, ...},
    "attack_chain_sequence": {...}
  },
  "risk_analysis": {
    "average_risk_score": 81.5,
    "risk_distribution": {"critical": 150, "high": 250, ...},
    "risk_by_severity": {"critical": 92.3, "high": 75.1, ...},
    "exploitability_breakdown": {"high": 120, "medium": 200, ...},
    "average_confidence": 85.2
  },
  "geographic": {
    "countries": {"USA": 300, "Ireland": 150, ...},
    "regions": {"us-east-1": 200, "eu-west-1": 150, ...},
    "heatmap_data": [{"lat": 39.82, "lon": -98.57, "severity": "high"}, ...]
  },
  "compliance": {
    "framework_violations": {"SOC2": 45, "PCI-DSS": 32, ...},
    "violation_severities": {"high": 120, "medium": 200, ...},
    "data_classifications": {"Confidential": 300, "Restricted": 150, ...},
    "compliance_score": 72.5
  },
  "cost_impact": {
    "total_cost_usd": 3005224.47,
    "cost_by_severity": {"critical": 1500000, "high": 1000000, ...},
    "total_downtime_minutes": 14400,
    "total_data_loss_mb": 50000,
    "downtime_by_severity": {...},
    "data_loss_by_severity": {...}
  },
  "anomaly_detection": {
    "correlated_alerts": 45,
    "top_correlations": {"uuid-1": 5, "uuid-2": 3, ...},
    "high_confidence_alerts": 650,
    "low_confidence_alerts": 150
  },
  "time_patterns": {
    "by_hour": {"0": 20, "1": 15, ...},
    "by_day_of_week": {"Monday": 150, "Tuesday": 140, ...}
  }
}
```

**What This Endpoint Provides:**
- Comprehensive threat intelligence analysis
- Multi-factor risk scoring and distribution
- Geographic threat mapping
- Compliance framework tracking
- Financial impact calculations
- Anomaly detection and correlation
- Temporal pattern analysis

#### Get Predictive Analytics
```http
GET /analytics/predictive
```

**Response:**
```json
{
  "trend_analysis": {
    "direction": "increasing",
    "change_percentage": 15.3,
    "recent_average": 45.2,
    "current_rate": 52
  },
  "predictions": {
    "predicted_alerts_next_7_days": 316,
    "predicted_daily_average": 45,
    "confidence": "high"
  },
  "daily_metrics": {
    "alerts": {"2024-01-01": 42, "2024-01-02": 48, ...},
    "average_risk": {"2024-01-01": 78.5, "2024-01-02": 82.1, ...},
    "cost": {"2024-01-01": 50000, "2024-01-02": 75000, ...}
  }
}
```

**What This Endpoint Provides:**
- Trend direction (increasing/decreasing/stable)
- Percentage change in threat activity
- 7-day forecast of expected alerts
- Daily average predictions
- Confidence levels for predictions
- Historical daily metrics for trend analysis

## 📖 Usage Guide

### Advanced Analytics Dashboard

The Advanced Analytics Dashboard provides comprehensive security intelligence across 5 specialized tabs:

#### Overview Tab
- **Key Metrics**: Total alerts, average risk score, total cost impact, compliance score
- **Predictive Analytics**: Trend analysis showing if threats are increasing/decreasing with 7-day forecasts
- **Threat Actors Analysis**: Bar chart showing top threat actors by alert volume
- **Attack Chain Sequence**: Horizontal bar chart showing attack progression stages
- **Geographic Distribution**: Top countries by alert volume
- **Time Patterns**: Hourly alert patterns to identify peak attack times

#### Threat Intelligence Tab
- **Active Threat Actors**: Count of unique threat actors identified
- **Attack Stages Detected**: Number of different attack stages in the kill chain
- **IOC Types**: Distribution of Indicators of Compromise (IPs, domains, hashes, URLs)
- **Threat Actor Countries**: Pie chart showing geographic origin of threats
- **IOC Distribution**: Bar chart showing types of indicators detected

#### Risk Analysis Tab
- **Average Risk Score**: Overall risk level (0-100 scale)
- **High Risk Alerts**: Count of alerts with risk scores ≥60
- **Average Confidence**: Detection confidence percentage
- **Exploitable Alerts**: Count of alerts with exploitability ratings
- **Risk Distribution**: Pie chart showing risk level breakdown
- **Risk by Severity**: Bar chart comparing risk scores across severity levels
- **Exploitability Breakdown**: Radar chart showing exploitability distribution

#### Compliance Tab
- **Compliance Score**: Real-time percentage (0-100%) across all frameworks
- **Framework Violations**: Count of frameworks with violations
- **Data Classifications**: Number of different data sensitivity levels
- **Framework Violations Chart**: Horizontal bar chart ranking frameworks by violation count
- **Data Classification Distribution**: Pie chart showing data sensitivity breakdown

#### Cost Impact Tab
- **Total Cost Impact**: Sum of all estimated costs in USD
- **Total Downtime**: Cumulative downtime in hours
- **Data Loss**: Total data loss in GB
- **Average Cost per Alert**: Financial impact per incident
- **Cost by Severity**: Bar chart showing costs broken down by severity
- **Downtime by Severity**: Bar chart showing operational impact by severity

### Basic Dashboard

The basic dashboard provides a simpler overview:

1. **Statistics Cards**: View total alerts, critical alerts, high severity alerts, and open alerts
2. **Charts**: 
   - Pie chart showing severity distribution
   - Bar chart showing status breakdown
   - Horizontal bar chart showing top sources
   - Line chart showing alerts timeline

### Alerts List

Browse and filter alerts:

1. **Search**: Use the search box to find alerts by message, type, or resource name
2. **Filters**: 
   - Filter by severity (low, medium, high, critical)
   - Filter by status (open, in_progress, closed, resolved)
   - Filter by source (e.g., AWS-CloudTrail)
3. **Pagination**: Navigate through pages of alerts
4. **View Details**: Click "View Details" to see full alert information

### Alert Details

View comprehensive information about a specific alert:

- Alert metadata (ID, severity, status, source)
- Alert message and type
- Resource information (name, type, ID, region)
- Timestamp information
- Raw JSON data

## 🔧 Configuration

### Backend Configuration

Edit `main.py` to change:
- **Host**: Default is `127.0.0.1`
- **Port**: Default is `8000`
- **Reload**: Set `reload=True` for auto-reload during development

### Frontend Configuration

Create `frontend/.env` to customize:
```env
VITE_API_URL=http://127.0.0.1:8000
```

### Data File

The backend looks for alert data in this order:
1. `aws_like_alerts_10000.json` (JSON array format)
2. `aws_like_alerts_10000.jsonl` (JSONL format, one JSON object per line)

Place your data file in the root directory.

## 🐛 Troubleshooting

### Backend Issues

**Problem**: `ModuleNotFoundError: No module named 'fastapi'`
- **Solution**: Install dependencies: `pip install -r requirements.txt`

**Problem**: `RuntimeError: Could not find aws_like_alerts_10000.json`
- **Solution**: 
  - Generate sample data: `python generate_sample_data.py`
  - Or place your own data file in the root directory

**Problem**: Port 8000 is already in use
- **Solution**: 
  - Stop the process using port 8000
  - Or modify `main.py` line 177 to use a different port

**Problem**: Backend starts but shows errors
- **Solution**: Check the terminal output for specific error messages
- Verify your data file is valid JSON

### Frontend Issues

**Problem**: `npm: command not found`
- **Solution**: Install Node.js from https://nodejs.org/

**Problem**: `npm install` fails
- **Solution**: 
  - Delete `node_modules` folder and `package-lock.json`
  - Run `npm install` again
  - Check your internet connection

**Problem**: Frontend shows "Cannot connect to backend"
- **Solution**: 
  - Verify backend is running: Check Terminal 1
  - Verify backend URL: Should be `http://127.0.0.1:8000`
  - Check browser console (F12) for detailed errors
  - Verify CORS is enabled in backend

**Problem**: Port 3000 is already in use
- **Solution**: Vite will automatically use the next available port (3001, 3002, etc.)

**Problem**: Charts not displaying
- **Solution**: 
  - Check browser console for errors
  - Verify backend `/stats` endpoint is working
  - Refresh the page

### General Issues

**Problem**: Changes not reflecting
- **Solution**: 
  - Backend: Restart the server (Ctrl+C, then `python main.py`)
  - Frontend: Should auto-reload, but try refreshing the browser

**Problem**: Slow performance
- **Solution**: 
  - Check data file size (large files may be slow)
  - Reduce the number of alerts in sample data
  - Use pagination when viewing alerts

## 💻 Development

### Backend Development

```bash
# Run with auto-reload (already enabled)
python main.py

# The server will automatically reload on code changes
```

### Frontend Development

```bash
cd frontend

# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Project Structure Guidelines

- **Backend**: Keep API endpoints in `main.py`, add utilities in separate files
- **Frontend**: 
  - Components in `src/components/`
  - Pages in `src/pages/`
  - API calls in `src/services/`
  - Types in `src/types/`

### Adding New Features

1. **Backend**: Add new endpoints in `main.py`
2. **Frontend**: 
   - Add new pages in `src/pages/`
   - Add routes in `src/App.tsx`
   - Update types in `src/types/index.ts`

## 📦 Building for Production

### Frontend Production Build

```bash
cd frontend
npm run build
```

The production build will be in `frontend/dist/` directory.

### Backend Production Deployment

The backend can be deployed using:

- **Uvicorn** (development):
  ```bash
  uvicorn main:app --host 0.0.0.0 --port 8000
  ```

- **Gunicorn with Uvicorn workers** (production):
  ```bash
  gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
  ```

- **Docker** (containerized):
  ```dockerfile
  FROM python:3.9
  WORKDIR /app
  COPY requirements.txt .
  RUN pip install -r requirements.txt
  COPY . .
  CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
  ```

## 🎯 Key Value Propositions

### For Security Teams
- **Reduce Alert Fatigue**: Risk scoring and confidence levels help focus on high-priority alerts
- **Faster Incident Response**: Attack chain visualization shows exactly where to stop an attack
- **Better Context**: Threat actor identification provides crucial context for understanding attacks
- **Proactive Defense**: Predictive analytics help prepare for threats before they happen

### For Business Stakeholders
- **Financial Metrics**: Cost impact analysis translates security risks into business terms
- **ROI Justification**: Quantify the value of security investments
- **Compliance Readiness**: Real-time compliance scores help meet regulatory requirements
- **Risk Communication**: Risk scores make security risks understandable to non-technical executives

### For Compliance Officers
- **Multi-Framework Tracking**: Monitor SOC2, PCI-DSS, HIPAA, GDPR, ISO27001, NIST, and CIS simultaneously
- **Real-Time Compliance Score**: Know your compliance status at any moment
- **Violation Tracking**: Identify exactly which controls are being violated
- **Audit Preparation**: Be ready for audits with comprehensive compliance data

### For Security Analysts
- **Threat Intelligence**: Understand who is attacking you and why
- **Pattern Recognition**: Identify coordinated attacks through correlation analysis
- **Geographic Insights**: See where threats are coming from globally
- **Time-Based Analysis**: Understand attack patterns and optimize response schedules

## 🔬 Technical Advantages

### Performance
- **Efficient Data Processing**: Handles 1M+ records efficiently using JSONL format
- **Fast API Responses**: Optimized endpoints for quick dashboard updates
- **Scalable Architecture**: Can process large datasets without performance degradation

### Flexibility
- **Customizable Risk Models**: Adjust risk calculation formulas to match your organization's needs
- **Extensible Analytics**: Easy to add new analytics endpoints and visualizations
- **Open Source**: Full control over the codebase and data

### Integration
- **RESTful API**: Easy integration with other security tools
- **Standard Formats**: Uses JSON/JSONL for easy data import/export
- **Multi-Cloud Support**: Works with alerts from AWS, GCP, Azure, and more

## 📈 Analytics Summary

This system provides **8 major categories of analytics** that work together to give you a complete picture of your security posture:

1. **Threat Intelligence** → Know who is attacking you
2. **Risk Scoring** → Understand how dangerous each threat is
3. **Predictive Analytics** → Prepare for future threats
4. **Cost Impact** → Quantify financial risks
5. **Compliance** → Meet regulatory requirements
6. **Geographic** → Understand global threat patterns
7. **Anomaly Detection** → Identify coordinated attacks
8. **Time Patterns** → Optimize security operations

**Together, these analytics provide insights that no single cloud provider's security tool can match.**

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Test thoroughly**: Ensure both backend and frontend work
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Code Style

- **Python**: Follow PEP 8 style guide
- **TypeScript/React**: Use ESLint configuration provided
- **Comments**: Add comments for complex logic
- **Documentation**: Update README for new features

## 📄 License

This project is open source and available for use.

## 🙏 Acknowledgments

- FastAPI for the excellent web framework
- React team for the amazing UI library
- All open-source contributors whose packages made this possible

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review the [QUICKSTART.md](QUICKSTART.md) guide
3. Check the [FIXES.md](FIXES.md) for known issues and solutions
4. Review the [ADVANCED_FEATURES.md](ADVANCED_FEATURES.md) for detailed feature documentation
5. Open an issue on the repository

---

**Made with ❤️ for cloud security teams**

**This system provides analytics and intelligence that even AWS Security Hub cannot match, making it an essential tool for enterprise security operations.**
