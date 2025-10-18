---
description: Regenerate JSON files after CSV changes
argument-hint: [optional-csv-filename]
allowed-tools: Bash, Read, Glob
---

Regenerate JSON files after CSV content has been updated.

**Target CSV**: $ARGUMENTS (if provided, otherwise process all CSV files)

## Update Workflow

### 1. Verify CSV Files
Check that CSV files exist:
- If specific file provided: verify it exists
- If no file specified: find all `.csv` files

### 2. Verify Converter Exists
Check that `scripts/csv-to-json.py` exists.
If not found, suggest running `/webflow-convert` first for initial setup.

### 3. Run Conversion
Execute the CSV to JSON converter:
```bash
python3 scripts/csv-to-json.py
```

### 4. Report Results
```
♻️  CSV Update Complete

📊 Results:
- CSV files processed: X
- JSON files updated: X
- Total items: X

📁 Updated Files:
- data/cms-collection1.json (X items)
- data/cms-collection2.json (X items)
...

✅ Changes Applied:
Your static page will now display the updated content.

🌐 Preview Changes:
Run '/webflow-preview' to see the updates in your browser.

💡 Tip: Hard refresh (Ctrl+F5) to clear browser cache.
```

### 5. Optional: Auto-Preview
Ask user if they want to start/restart the preview server to see changes immediately.

## Update Scenarios

### Scenario 1: Single CSV Updated
```bash
/webflow-update testimonials.csv
```
Only regenerates `cms-testimonials.json`

### Scenario 2: All CSVs Updated
```bash
/webflow-update
```
Regenerates all JSON files

### Scenario 3: New CSV Added
If a new CSV file is detected that doesn't have a corresponding JSON:
```
🆕 New Collection Detected: new-collection.csv

This CSV wasn't in the original conversion.
Would you like to:
1. Run full conversion (/webflow-convert) to integrate it
2. Just generate JSON for now
3. Skip this file

Recommendation: Run /webflow-convert to ensure CMS loader supports this collection.
```

**Performance Note**: This is much faster than `/webflow-convert` since it only regenerates JSON, not the entire conversion.
