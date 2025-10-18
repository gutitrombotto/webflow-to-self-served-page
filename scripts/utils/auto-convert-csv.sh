#!/bin/bash
# Auto-convert CSV to JSON when CSV files are modified
# This is called by hooks (opt-in feature)

set -e

# Check if csv-to-json.py exists
if [ ! -f "scripts/csv-to-json.py" ]; then
    echo "⚠️  CSV converter not found. Run '/webflow-convert' first."
    exit 0
fi

echo "♻️  Auto-converting CSV to JSON..."

# Run the converter
python3 scripts/csv-to-json.py

echo "✅ JSON files updated"
