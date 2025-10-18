#!/bin/bash
# Validate that directory contains a Webflow export

set -e

TARGET_DIR="${1:-.}"

echo "🔍 Validating Webflow export in: $TARGET_DIR"
echo ""

# Check for HTML files
HTML_COUNT=$(find "$TARGET_DIR" -maxdepth 1 -name "*.html" -type f | wc -l)
if [ "$HTML_COUNT" -eq 0 ]; then
    echo "❌ No HTML files found"
    echo "   This doesn't appear to be a Webflow export"
    exit 1
fi
echo "✅ Found $HTML_COUNT HTML file(s)"

# Check for CSV files
CSV_COUNT=$(find "$TARGET_DIR" -maxdepth 1 -name "*.csv" -type f | wc -l)
if [ "$CSV_COUNT" -eq 0 ]; then
    echo "⚠️  No CSV files found"
    echo "   This export may not have CMS data"
    exit 1
fi
echo "✅ Found $CSV_COUNT CSV file(s)"

# Check for Webflow classes in HTML
WEBFLOW_CLASSES=$(grep -l "w-dyn-list\|w-dyn-items\|w-dyn-bind-empty" "$TARGET_DIR"/*.html 2>/dev/null | wc -l)
if [ "$WEBFLOW_CLASSES" -eq 0 ]; then
    echo "⚠️  No Webflow dynamic classes found in HTML"
    echo "   This may not be a Webflow CMS export"
else
    echo "✅ Found Webflow CMS markers in HTML"
fi

# List CSV files
echo ""
echo "📊 CSV Collections:"
for csv in "$TARGET_DIR"/*.csv; do
    if [ -f "$csv" ]; then
        FILENAME=$(basename "$csv" .csv)
        LINE_COUNT=$(($(wc -l < "$csv") - 1))  # Subtract header
        echo "   - $FILENAME ($LINE_COUNT items)"
    fi
done

echo ""
echo "✅ Validation complete - This appears to be a valid Webflow export"
exit 0
