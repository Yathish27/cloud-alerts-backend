# Quick Start Guide

Follow these steps to run the Cloud Security Alerts application.

## Prerequisites

- **Python 3.8+** installed
- **Node.js 18+** and **npm** installed
- Alert data file (`aws_like_alerts_10000.json` or `aws_like_alerts_10000.jsonl`) in the root directory

## Step-by-Step Instructions

### Step 1: Install Backend Dependencies

Open a terminal in the project root directory and run:

```bash
pip install -r requirements.txt
```

Or install manually:
```bash
pip install fastapi uvicorn
```

### Step 2: Start the Backend Server

In the same terminal (project root), run:

```bash
python main.py
```

You should see output like:
```
Loaded 10000 alerts from aws_like_alerts_10000.json
INFO:     Started server process
INFO:     Uvicorn running on http://127.0.0.1:8000
```

✅ **Backend is now running on http://127.0.0.1:8000**

**Keep this terminal window open!**

### Step 3: Install Frontend Dependencies

Open a **NEW terminal window** and navigate to the frontend directory:

```bash
cd frontend
npm install
```

This will install all React dependencies (may take a few minutes).

### Step 4: Start the Frontend Development Server

In the same terminal (frontend directory), run:

```bash
npm run dev
```

You should see output like:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

✅ **Frontend is now running on http://localhost:3000**

### Step 5: Open the Application

Open your web browser and navigate to:
```
http://localhost:3000
```

You should see the Cloud Security Alerts Dashboard!

## Troubleshooting

### Backend Issues

**Problem**: `ModuleNotFoundError: No module named 'fastapi'`
- **Solution**: Make sure you installed the requirements: `pip install -r requirements.txt`

**Problem**: `RuntimeError: Could not find aws_like_alerts_10000.json`
- **Solution**: Ensure you have the alert data file (`aws_like_alerts_10000.json` or `aws_like_alerts_10000.jsonl`) in the root directory

**Problem**: Port 8000 is already in use
- **Solution**: Stop the process using port 8000, or modify `main.py` to use a different port

### Frontend Issues

**Problem**: `npm: command not found`
- **Solution**: Install Node.js from https://nodejs.org/

**Problem**: `npm install` fails
- **Solution**: Try deleting `node_modules` folder and `package-lock.json`, then run `npm install` again

**Problem**: Frontend can't connect to backend
- **Solution**: Make sure the backend is running on `http://127.0.0.1:8000`. Check the backend terminal for errors.

**Problem**: Port 3000 is already in use
- **Solution**: Vite will automatically use the next available port (3001, 3002, etc.)

## Running Both Servers

You need **TWO terminal windows** running simultaneously:

1. **Terminal 1** (Backend): `python main.py` - Keep running
2. **Terminal 2** (Frontend): `cd frontend && npm run dev` - Keep running

## Stopping the Servers

- **Backend**: Press `Ctrl+C` in the backend terminal
- **Frontend**: Press `Ctrl+C` in the frontend terminal

## API Documentation

Once the backend is running, you can view the interactive API documentation at:
- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

## Next Steps

- Explore the Dashboard at http://localhost:3000
- View alerts at http://localhost:3000/alerts
- Click on any alert to see detailed information

