# Data Setup Guide

## ✅ Sample Data Generated!

I've created a sample data file (`aws_like_alerts_10000.json`) with **1000 realistic security alerts** for testing.

## What's Included

The sample data includes:
- **1000 alerts** with various severities, statuses, and sources
- **Realistic timestamps** (within the last 30 days)
- **Multiple alert types**: UnauthorizedAccessAttempt, SuspiciousAPICall, DataExfiltration, etc.
- **Various sources**: AWS-CloudTrail, AWS-GuardDuty, GCP-CloudLogging, Azure-SecurityCenter, etc.
- **Resource information**: EC2 instances, S3 buckets, RDS databases, etc.

## Statistics

- **Severities**: Low, Medium, High, Critical (distributed)
- **Statuses**: Open, In Progress, Closed, Resolved
- **Sources**: Multiple cloud providers and services

## Regenerating Data

If you want to generate more or different data, run:

```bash
python generate_sample_data.py
```

You can modify `generate_sample_data.py` to:
- Change the number of alerts (currently 1000)
- Add more alert types
- Adjust the date range
- Customize the data structure

## Using Your Own Data

If you have your own alert data file:

1. **JSON format**: Save as `aws_like_alerts_10000.json` in the root directory
2. **JSONL format**: Save as `aws_like_alerts_10000.jsonl` in the root directory

The backend will automatically detect and load either format.

## Next Steps

Now that the data file exists, you can:

1. **Start the backend**:
   ```bash
   python main.py
   ```

2. **Start the frontend** (in a new terminal):
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open the dashboard**: http://localhost:3000

The dashboard should now display all the statistics and charts! 🎉

