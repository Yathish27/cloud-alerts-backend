import json

input_file = "alerts.jsonl"   # teammate's file
output_file = "alerts.json"   # FastAPI conversion

alerts = []

with open(input_file, "r") as f:
    for line in f:
        line = line.strip()
        if line:
            alerts.append(json.loads(line))

with open(output_file, "w") as f:
    json.dump(alerts, f, indent=2)

print(f"Converted {len(alerts)} alerts into {output_file}")
