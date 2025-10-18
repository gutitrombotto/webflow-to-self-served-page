#!/bin/bash
# Setup directory structure for Webflow conversion

set -e

echo "📁 Creating directory structure..."

# Create directories
mkdir -p data
mkdir -p scripts
mkdir -p js

echo "✅ Directories created:"
echo "   - data/       (for JSON files)"
echo "   - scripts/    (for CSV converter)"
echo "   - js/         (for CMS loader)"

# Check if directories are empty
if [ -z "$(ls -A data 2>/dev/null)" ]; then
    echo "   ℹ️  data/ is empty (will be populated during conversion)"
fi

if [ -z "$(ls -A scripts 2>/dev/null)" ]; then
    echo "   ℹ️  scripts/ is empty (converter will be generated)"
fi

echo ""
echo "🚀 Setup complete! Run '/webflow-convert' to start conversion."
