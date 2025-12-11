"""
Generate sample alert data for testing the Cloud Security Alerts backend.
"""
import json
from datetime import datetime, timedelta
import random
import uuid

# Sample alert types
ALERT_TYPES = [
    "UnauthorizedAccessAttempt",
    "SuspiciousAPICall",
    "DataExfiltration",
    "PrivilegeEscalation",
    "MaliciousIPConnection",
    "AnomalousTraffic",
    "FailedLoginAttempt",
    "ConfigurationChange",
    "SecurityGroupModification",
    "IAMPolicyChange"
]

# Sample sources
SOURCES = [
    "AWS-CloudTrail",
    "AWS-GuardDuty",
    "AWS-SecurityHub",
    "GCP-CloudLogging",
    "Azure-SecurityCenter",
    "AWS-VPCFlowLogs"
]

# Sample severities
SEVERITIES = ["low", "medium", "high", "critical"]

# Sample statuses
STATUSES = ["open", "in_progress", "closed", "resolved"]

# Sample regions
REGIONS = ["us-east-1", "us-west-2", "eu-west-1", "ap-southeast-1", "sa-east-1"]

# Sample resource types
RESOURCE_TYPES = [
    "EC2-Instance",
    "S3-Bucket",
    "RDS-Database",
    "Lambda-Function",
    "IAM-Role",
    "VPC-Subnet"
]

def generate_alert(index):
    """Generate a single alert with realistic data."""
    alert_type = random.choice(ALERT_TYPES)
    severity = random.choice(SEVERITIES)
    status = random.choice(STATUSES)
    source = random.choice(SOURCES)
    region = random.choice(REGIONS)
    resource_type = random.choice(RESOURCE_TYPES)
    
    # Generate timestamp (within last 30 days)
    days_ago = random.randint(0, 30)
    hours_ago = random.randint(0, 23)
    timestamp = (datetime.now() - timedelta(days=days_ago, hours=hours_ago)).isoformat() + "Z"
    
    # Generate resource name
    resource_name = f"{resource_type.lower().replace('-', '_')}_{random.randint(1000, 9999)}"
    
    # Generate alert message
    messages = {
        "UnauthorizedAccessAttempt": f"Unauthorized access attempt detected from IP {random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}",
        "SuspiciousAPICall": f"Suspicious API call detected: {random.choice(['DeleteBucket', 'ModifySecurityGroup', 'ChangeIAMPolicy'])}",
        "DataExfiltration": f"Potential data exfiltration detected: {random.randint(100, 10000)} MB transferred",
        "PrivilegeEscalation": f"Privilege escalation attempt detected for user: user_{random.randint(1, 100)}",
        "MaliciousIPConnection": f"Connection from known malicious IP: {random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}",
        "AnomalousTraffic": f"Anomalous network traffic pattern detected: {random.randint(1000, 100000)} requests/minute",
        "FailedLoginAttempt": f"Multiple failed login attempts ({random.randint(5, 50)}) from IP {random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}",
        "ConfigurationChange": f"Critical configuration change detected: {random.choice(['Security Group', 'IAM Policy', 'Network ACL'])} modified",
        "SecurityGroupModification": f"Security group {random.choice(['sg-12345678', 'sg-87654321'])} modified",
        "IAMPolicyChange": f"IAM policy change detected for role: {random.choice(['admin-role', 'lambda-execution-role', 'ec2-instance-role'])}"
    }
    
    alert_id = str(uuid.uuid4())
    
    return {
        "id": alert_id,
        "alert_id": alert_id,
        "uuid": alert_id,
        "severity": severity,
        "status": status,
        "source": source,
        "type": alert_type,
        "message": messages.get(alert_type, f"Security alert: {alert_type}"),
        "timestamp": timestamp,
        "time": timestamp,
        "resource": {
            "name": resource_name,
            "type": resource_type,
            "id": f"{resource_type.lower()}-{random.randint(100000, 999999)}",
            "region": region
        },
        "metadata": {
            "detection_rule": f"rule_{random.randint(1, 100)}",
            "confidence": random.randint(70, 100),
            "affected_accounts": random.randint(1, 5)
        }
    }

def main():
    """Generate sample alert data."""
    print("Generating sample alert data...")
    
    # Generate 1000 alerts (you can change this number)
    num_alerts = 1000
    alerts = [generate_alert(i) for i in range(num_alerts)]
    
    # Save as JSON
    output_file = "aws_like_alerts_10000.json"
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(alerts, f, indent=2)
    
    print(f"✅ Generated {len(alerts)} alerts in {output_file}")
    print(f"📊 Statistics:")
    print(f"   - Severities: {dict((s, sum(1 for a in alerts if a['severity'] == s)) for s in SEVERITIES)}")
    print(f"   - Statuses: {dict((s, sum(1 for a in alerts if a['status'] == s)) for s in STATUSES)}")
    print(f"   - Sources: {dict((s, sum(1 for a in alerts if a['source'] == s)) for s in SOURCES)}")
    print(f"\n🚀 You can now run: python main.py")

if __name__ == "__main__":
    main()

