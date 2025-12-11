# Troubleshooting Guide

## Common Issues and Solutions

### 1. "Failed to load statistics" or "Cannot connect to backend server"

**Symptoms:**
- Error message appears on dashboard
- Red error box with connection error

**Solutions:**

1. **Check if backend is running:**
   ```bash
   # In the project root directory
   python main.py
   ```
   You should see: `INFO: Uvicorn running on http://127.0.0.1:8000`

2. **Verify backend is accessible:**
   - Open browser and go to: http://127.0.0.1:8000/docs
   - You should see the FastAPI documentation page

3. **Check API URL configuration:**
   - The frontend defaults to `http://127.0.0.1:8000`
   - If your backend runs on a different port, create a `.env` file in `frontend/`:
     ```
     VITE_API_URL=http://127.0.0.1:YOUR_PORT
     ```
   - Restart the frontend dev server after changing `.env`

4. **Check for CORS issues:**
   - The backend should have CORS enabled (it does by default)
   - If you see CORS errors in browser console, check `main.py` has:
     ```python
     app.add_middleware(CORSMiddleware, allow_origins=["*"])
     ```

### 2. Port Already in Use

**Symptoms:**
- Error: "Port 3000 is already in use"
- Or backend port 8000 is already in use

**Solutions:**

**Frontend (Port 3000):**
- Vite will automatically try the next port (3001, 3002, etc.)
- Or manually change port in `frontend/vite.config.ts`:
  ```typescript
  server: {
    port: 3001, // Change to available port
  }
  ```

**Backend (Port 8000):**
- Change port in `main.py`:
  ```python
  uvicorn.run("main:app", host="127.0.0.1", port=8001, reload=True)
  ```
- Update frontend `.env` to match new port

### 3. No Data Showing in Charts

**Symptoms:**
- Dashboard loads but charts are empty
- "No data available" messages

**Solutions:**

1. **Check if alert data file exists:**
   - Ensure `aws_like_alerts_10000.json` or `aws_like_alerts_10000.jsonl` is in the root directory
   - Backend should print: `Loaded X alerts from filename.json`

2. **Verify data format:**
   - Data should be valid JSON
   - Each alert should have fields like: `severity`, `status`, `source`, `timestamp`

3. **Check browser console:**
   - Open DevTools (F12)
   - Check Console tab for errors
   - Check Network tab to see if API calls are successful

### 4. npm install Fails

**Symptoms:**
- Errors during `npm install`
- Missing dependencies

**Solutions:**

1. **Clear cache and reinstall:**
   ```bash
   cd frontend
   rm -rf node_modules package-lock.json
   npm cache clean --force
   npm install
   ```

2. **Check Node.js version:**
   - Requires Node.js 18+
   - Check version: `node --version`
   - Update if needed: https://nodejs.org/

3. **Use different package manager:**
   ```bash
   # Try with yarn
   yarn install
   
   # Or with pnpm
   pnpm install
   ```

### 5. TypeScript Errors

**Symptoms:**
- Type errors in IDE
- Build fails

**Solutions:**

1. **Restart TypeScript server:**
   - In VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

2. **Check TypeScript version:**
   - Should match `package.json` version
   - Reinstall: `npm install typescript@latest --save-dev`

### 6. Charts Not Rendering

**Symptoms:**
- Charts appear blank
- No visual elements

**Solutions:**

1. **Check Recharts installation:**
   ```bash
   npm list recharts
   ```
   If missing: `npm install recharts`

2. **Verify data structure:**
   - Charts need arrays with `name` and `value` properties
   - Check browser console for data structure

3. **Check browser compatibility:**
   - Modern browsers required (Chrome, Firefox, Edge, Safari)

### 7. Styling Issues

**Symptoms:**
- UI looks broken
- No colors/styling applied

**Solutions:**

1. **Verify Tailwind CSS:**
   ```bash
   npm list tailwindcss
   ```

2. **Check PostCSS configuration:**
   - Ensure `postcss.config.js` exists
   - Should include `tailwindcss` and `autoprefixer`

3. **Rebuild:**
   ```bash
   # Stop dev server and restart
   npm run dev
   ```

## Debugging Tips

### Enable Detailed Logging

1. **Check browser console:**
   - Open DevTools (F12)
   - Look for errors in Console tab
   - Check Network tab for failed requests

2. **Backend logs:**
   - Check terminal where backend is running
   - Look for error messages or stack traces

3. **API testing:**
   - Use browser to test endpoints directly:
     - http://127.0.0.1:8000/stats
     - http://127.0.0.1:8000/alerts?limit=10

### Verify Setup

Run these checks:

```bash
# 1. Check Python version
python --version  # Should be 3.8+

# 2. Check Node version
node --version    # Should be 18+

# 3. Check if backend dependencies installed
pip list | grep fastapi

# 4. Check if frontend dependencies installed
cd frontend
npm list | grep react
```

## Still Having Issues?

1. **Check all requirements:**
   - Backend running on port 8000
   - Frontend running on port 3000
   - Data file exists in root directory
   - All dependencies installed

2. **Restart everything:**
   - Stop both servers (Ctrl+C)
   - Restart backend: `python main.py`
   - Restart frontend: `cd frontend && npm run dev`

3. **Clear browser cache:**
   - Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)

4. **Check firewall/antivirus:**
   - May block localhost connections
   - Temporarily disable to test

