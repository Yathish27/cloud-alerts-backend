# 🚀 Quick Start Guide

## Step 1: Start the Backend

### Option A: Using the Helper Script (Easiest)

**Windows:**
```bash
start_backend.bat
```

**Mac/Linux:**
```bash
chmod +x start_backend.sh
./start_backend.sh
```

### Option B: Manual Start

1. **Install dependencies** (first time only):
   ```bash
   pip install -r requirements.txt
   ```

2. **Start the backend**:
   ```bash
   python main.py
   ```

   You should see:
   ```
   Loaded X alerts from aws_like_alerts_10000.json
   INFO:     Started server process
   INFO:     Uvicorn running on http://127.0.0.1:8000
   ```

3. **Verify it's working**:
   - Open http://127.0.0.1:8000/docs in your browser
   - You should see the API documentation

## Step 2: Start the Frontend

Open a **NEW terminal window** and run:

```bash
cd frontend
npm install    # First time only
npm run dev
```

You should see:
```
VITE v5.0.8  ready in 500 ms
➜  Local:   http://localhost:3000/
```

## Step 3: Open the Application

Open your browser and go to:
```
http://localhost:3000
```

You should now see the dashboard with statistics and charts! 🎉

---

## Troubleshooting

### Backend won't start?

1. **Check Python version**:
   ```bash
   python --version
   ```
   Should be Python 3.8 or higher

2. **Check if data file exists**:
   - Look for `aws_like_alerts_10000.json` or `aws_like_alerts_10000.jsonl` in the root directory
   - If missing, the backend will show an error

3. **Port 8000 already in use?**
   - Stop other services using port 8000
   - Or modify `main.py` line 177 to use a different port

### Frontend shows connection error?

1. Make sure backend is running (check Step 1)
2. Verify backend is on `http://127.0.0.1:8000`
3. Check browser console (F12) for detailed error messages

### Still having issues?

Check the `QUICKSTART.md` file for more detailed troubleshooting steps.

