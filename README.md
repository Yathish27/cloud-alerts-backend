# 🔒 Cloud Security Alerts System

A comprehensive cloud security monitoring system with a FastAPI backend and a modern React frontend for visualizing and managing security alerts. This application provides real-time analytics, interactive dashboards, and powerful alert management capabilities.

![Cloud Security Alerts](https://img.shields.io/badge/Status-Active-success)
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![React](https://img.shields.io/badge/React-18-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
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

## 📖 Usage Guide

### Dashboard

The dashboard provides an overview of all security alerts:

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
4. Open an issue on the repository

---

**Made with ❤️ for cloud security teams**
