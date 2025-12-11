"""
Generate large-scale alert data (1M+ records) for advanced analytics.
Uses JSONL format for efficient generation and loading.
"""
import json
from datetime import datetime, timedelta
import random
import uuid
from collections import defaultdict

# Extended alert types with threat intelligence
ALERT_TYPES = [
    "UnauthorizedAccessAttempt", "SuspiciousAPICall", "DataExfiltration",
    "PrivilegeEscalation", "MaliciousIPConnection", "AnomalousTraffic",
    "FailedLoginAttempt", "ConfigurationChange", "SecurityGroupModification",
    "IAMPolicyChange", "CryptocurrencyMining", "RansomwareActivity",
    "LateralMovement", "CommandAndControl", "DataEncryption",
    "BruteForceAttack", "SQLInjection", "XSSAttack", "DDoSAttack",
    "ZeroDayExploit", "InsiderThreat", "ComplianceViolation",
    "DataBreach", "AccountTakeover", "APTSuspiciousActivity"
]

# Extended sources
SOURCES = [
    "AWS-CloudTrail", "AWS-GuardDuty", "AWS-SecurityHub", "AWS-VPCFlowLogs",
    "AWS-WAF", "AWS-Shield", "GCP-CloudLogging", "GCP-SecurityCommandCenter",
    "Azure-SecurityCenter", "Azure-Sentinel", "Cloudflare-Logs",
    "Datadog-Security", "Splunk-Enterprise", "Elastic-Security"
]

SEVERITIES = ["low", "medium", "high", "critical"]
STATUSES = ["open", "in_progress", "closed", "resolved"]

# Extended regions with countries
REGIONS = [
    {"code": "us-east-1", "country": "USA", "lat": 39.8283, "lon": -98.5795},
    {"code": "us-west-2", "country": "USA", "lat": 45.5152, "lon": -122.6784},
    {"code": "eu-west-1", "country": "Ireland", "lat": 53.4129, "lon": -8.2439},
    {"code": "ap-southeast-1", "country": "Singapore", "lat": 1.3521, "lon": 103.8198},
    {"code": "sa-east-1", "country": "Brazil", "lat": -23.5505, "lon": -46.6333},
    {"code": "ap-northeast-1", "country": "Japan", "lat": 35.6762, "lon": 139.6503},
    {"code": "eu-central-1", "country": "Germany", "lat": 50.1109, "lon": 8.6821},
    {"code": "ap-south-1", "country": "India", "lat": 19.0760, "lon": 72.8777},
    {"code": "ca-central-1", "country": "Canada", "lat": 45.5017, "lon": -73.5673},
    {"code": "eu-north-1", "country": "Sweden", "lat": 59.3293, "lon": 18.0686}
]

RESOURCE_TYPES = [
    "EC2-Instance", "S3-Bucket", "RDS-Database", "Lambda-Function",
    "IAM-Role", "VPC-Subnet", "CloudFront-Distribution", "ELB-LoadBalancer",
    "EKS-Cluster", "ECS-Service", "DynamoDB-Table", "ElastiCache-Cluster",
    "KMS-Key", "SecretsManager-Secret", "CloudWatch-LogGroup"
]

# Threat actor profiles
THREAT_ACTORS = [
    {"name": "APT28", "country": "Russia", "risk": "high"},
    {"name": "Lazarus", "country": "North Korea", "risk": "critical"},
    {"name": "FIN7", "country": "Unknown", "risk": "high"},
    {"name": "Scattered Spider", "country": "USA", "risk": "critical"},
    {"name": "Unknown", "country": "Unknown", "risk": "low"}
]

# Compliance frameworks
COMPLIANCE_FRAMEWORKS = ["SOC2", "PCI-DSS", "HIPAA", "GDPR", "ISO27001", "NIST", "CIS"]

def generate_ip_address():
    """Generate realistic IP address."""
    return f"{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}.{random.randint(1, 255)}"

def generate_risk_score(severity, confidence, threat_actor_risk):
    """Calculate risk score (0-100)."""
    base_scores = {"low": 20, "medium": 50, "high": 75, "critical": 95}
    risk_scores = {"low": 10, "high": 30, "critical": 40}
    return min(100, base_scores.get(severity, 50) + (confidence - 70) * 0.3 + risk_scores.get(threat_actor_risk, 0))

def generate_cost_impact(severity, resource_type):
    """Estimate cost impact in USD."""
    base_costs = {"low": 10, "medium": 100, "high": 1000, "critical": 10000}
    multipliers = {
        "S3-Bucket": 1.5, "RDS-Database": 2.0, "Lambda-Function": 0.5,
        "EC2-Instance": 1.0, "EKS-Cluster": 3.0
    }
    return base_costs.get(severity, 100) * multipliers.get(resource_type, 1.0) * random.uniform(0.5, 2.0)

def generate_alert(index, start_date, end_date):
    """Generate a single alert with rich metadata."""
    alert_type = random.choice(ALERT_TYPES)
    severity = random.choices(SEVERITIES, weights=[0.3, 0.3, 0.25, 0.15])[0]
    status = random.choices(STATUSES, weights=[0.3, 0.2, 0.3, 0.2])[0]
    source = random.choice(SOURCES)
    region_data = random.choice(REGIONS)
    resource_type = random.choice(RESOURCE_TYPES)
    threat_actor = random.choice(THREAT_ACTORS)
    
    # Generate timestamp within date range
    time_range = (end_date - start_date).total_seconds()
    random_seconds = random.randint(0, int(time_range))
    timestamp = (start_date + timedelta(seconds=random_seconds)).isoformat() + "Z"
    
    # Generate IP addresses
    source_ip = generate_ip_address()
    destination_ip = generate_ip_address()
    
    # Generate metadata
    confidence = random.randint(70, 100)
    risk_score = generate_risk_score(severity, confidence, threat_actor["risk"])
    cost_impact = generate_cost_impact(severity, resource_type)
    
    # Generate attack chain stage
    attack_stages = ["Reconnaissance", "Weaponization", "Delivery", "Exploitation", 
                     "Installation", "CommandControl", "ActionsOnObjectives"]
    attack_stage = random.choice(attack_stages)
    
    # Generate compliance violations
    compliance_violations = random.sample(COMPLIANCE_FRAMEWORKS, random.randint(0, 3))
    
    # Generate user/account info
    user_id = f"user_{random.randint(1, 10000)}"
    account_id = f"{random.randint(100000000000, 999999999999)}"
    
    # Generate resource info
    resource_name = f"{resource_type.lower().replace('-', '_')}_{random.randint(1000, 99999)}"
    resource_id = f"{resource_type.lower()}-{random.randint(100000, 999999)}"
    
    # Generate alert message
    messages = {
        "UnauthorizedAccessAttempt": f"Unauthorized access attempt from {source_ip} targeting {resource_name}",
        "SuspiciousAPICall": f"Suspicious API call: {random.choice(['DeleteBucket', 'ModifySecurityGroup', 'ChangeIAMPolicy'])} from {user_id}",
        "DataExfiltration": f"Potential data exfiltration: {random.randint(100, 100000)} MB transferred from {source_ip} to {destination_ip}",
        "PrivilegeEscalation": f"Privilege escalation attempt by {user_id} in account {account_id}",
        "MaliciousIPConnection": f"Connection from known malicious IP {source_ip} (Threat Actor: {threat_actor['name']})",
        "AnomalousTraffic": f"Anomalous network traffic: {random.randint(1000, 1000000)} requests/minute from {source_ip}",
        "CryptocurrencyMining": f"Cryptocurrency mining activity detected on {resource_name}",
        "RansomwareActivity": f"Potential ransomware activity: {random.randint(10, 1000)} files encrypted",
        "LateralMovement": f"Lateral movement detected: {user_id} accessing {random.randint(5, 50)} resources",
        "CommandAndControl": f"C2 communication detected from {source_ip} to {destination_ip}",
        "DataBreach": f"Potential data breach: {random.randint(100, 100000)} records potentially exposed",
        "AccountTakeover": f"Account takeover attempt on {user_id} from {source_ip}"
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
            "id": resource_id,
            "region": region_data["code"],
            "country": region_data["country"],
            "latitude": region_data["lat"],
            "longitude": region_data["lon"]
        },
        "network": {
            "source_ip": source_ip,
            "destination_ip": destination_ip,
            "protocol": random.choice(["TCP", "UDP", "HTTP", "HTTPS", "SSH"]),
            "port": random.choice([22, 80, 443, 3389, 5432, 3306, 8080])
        },
        "threat_intelligence": {
            "threat_actor": threat_actor["name"],
            "threat_actor_country": threat_actor["country"],
            "threat_actor_risk": threat_actor["risk"],
            "attack_stage": attack_stage,
            "ioc_type": random.choice(["IP", "Domain", "Hash", "URL"]),
            "ioc_value": f"{random.choice(['malicious', 'suspicious', 'compromised'])}.{random.choice(['com', 'net', 'org'])}"
        },
        "risk_analysis": {
            "risk_score": round(risk_score, 2),
            "confidence": confidence,
            "threat_level": "critical" if risk_score > 80 else "high" if risk_score > 60 else "medium" if risk_score > 40 else "low",
            "attack_complexity": random.choice(["low", "medium", "high"]),
            "exploitability": random.choice(["none", "low", "medium", "high", "critical"])
        },
        "compliance": {
            "frameworks": compliance_violations,
            "violation_severity": "high" if compliance_violations else "none",
            "data_classification": random.choice(["Public", "Internal", "Confidential", "Restricted"])
        },
        "cost_impact": {
            "estimated_cost_usd": round(cost_impact, 2),
            "downtime_minutes": random.randint(0, 1440) if severity in ["high", "critical"] else 0,
            "data_loss_mb": random.randint(0, 10000) if "Data" in alert_type else 0
        },
        "user_context": {
            "user_id": user_id,
            "account_id": account_id,
            "user_role": random.choice(["admin", "developer", "viewer", "operator"]),
            "is_privileged": random.choice([True, False])
        },
        "metadata": {
            "detection_rule": f"rule_{random.randint(1, 500)}",
            "rule_category": random.choice(["Network", "Identity", "Data", "Compliance", "Threat"]),
            "affected_accounts": random.randint(1, 10),
            "affected_resources": random.randint(1, 50),
            "correlation_id": str(uuid.uuid4()) if random.random() > 0.7 else None
        }
    }

def main():
    """Generate large-scale alert data."""
    import sys
    
    # Configuration
    num_alerts = 1_200_000  # 1.2M records
    output_file = "aws_like_alerts_10000.jsonl"  # Use JSONL for large files
    
    print(f"🚀 Generating {num_alerts:,} alerts...")
    print("This may take several minutes. Please wait...")
    
    # Date range: Last 90 days
    end_date = datetime.now()
    start_date = end_date - timedelta(days=90)
    
    # Statistics tracking
    stats = {
        "severities": defaultdict(int),
        "statuses": defaultdict(int),
        "sources": defaultdict(int),
        "regions": defaultdict(int),
        "alert_types": defaultdict(int)
    }
    
    # Generate and write in batches
    batch_size = 10000
    written = 0
    
    with open(output_file, "w", encoding="utf-8") as f:
        for i in range(0, num_alerts, batch_size):
            batch_end = min(i + batch_size, num_alerts)
            batch = []
            
            for j in range(i, batch_end):
                alert = generate_alert(j, start_date, end_date)
                batch.append(alert)
                
                # Update statistics
                stats["severities"][alert["severity"]] += 1
                stats["statuses"][alert["status"]] += 1
                stats["sources"][alert["source"]] += 1
                stats["regions"][alert["resource"]["region"]] += 1
                stats["alert_types"][alert["type"]] += 1
            
            # Write batch to file
            for alert in batch:
                f.write(json.dumps(alert) + "\n")
            
            written = batch_end
            progress = (written / num_alerts) * 100
            print(f"Progress: {written:,}/{num_alerts:,} ({progress:.1f}%)", end="\r")
    
    print(f"\n✅ Generated {written:,} alerts in {output_file}")
    print(f"\n📊 Statistics:")
    print(f"   - Severities: {dict(stats['severities'])}")
    print(f"   - Statuses: {dict(stats['statuses'])}")
    print(f"   - Sources: {len(stats['sources'])} unique sources")
    print(f"   - Regions: {len(stats['regions'])} unique regions")
    print(f"   - Alert Types: {len(stats['alert_types'])} unique types")
    print(f"\n🚀 You can now run: python main.py")
    print(f"⚠️  Note: Loading {written:,} records may take 1-2 minutes on first startup")

if __name__ == "__main__":
    main()

