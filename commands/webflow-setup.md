---
description: Initialize directory structure for Webflow to self-served page conversion
argument-hint: [optional-directory-path]
allowed-tools: Bash, Write, Read
---

Initialize the directory structure for Webflow conversion.

**Target Directory**: $ARGUMENTS (if provided, otherwise current directory)

## Setup Tasks

### 1. Create Directory Structure
```bash
mkdir -p data scripts js
```

### 2. Validate Webflow Export
Check for:
- At least one `.html` file
- At least one `.csv` file
- Webflow classes (`.w-dyn-list`, `.w-dyn-bind-empty`)

If validation fails, warn the user that this might not be a valid Webflow export.

### 3. Report Findings
Display:
```
✅ Webflow Export Setup Complete

📁 Directory Structure:
- data/       (for generated JSON files)
- scripts/    (for CSV converter)
- js/         (for CMS loader)

📊 Detected Files:
- HTML files: X
- CSV files: X
- Collections detected: [list names]

🚀 Next Steps:
Run '/webflow-convert' to start the conversion process.
```

### 4. Optional: Copy Templates
If the user confirms, copy template files:
- `csv-to-json.py` → `scripts/`
- `cms-loader.js` → `js/`

**Note**: This command just sets up the structure. Use `/webflow-convert` for the full conversion workflow.
