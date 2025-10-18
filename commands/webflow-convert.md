---
description: Convert Webflow export to self-served page with dynamic CSV content loading
argument-hint: [optional-directory-path]
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Task
---

You are running the Webflow to Self-Served Page conversion workflow.

**Task**: Convert a Webflow landing page export (with CSV CMS data) into a self-served static page with dynamic content loading.

**Target Directory**: $ARGUMENTS (if provided, otherwise current directory)

## Conversion Workflow

### Step 1: Analyze the Webflow Export
1. Scan for CSV files in the target directory
2. Identify all HTML files
3. Validate this is a Webflow export (check for .w-dyn-list, .w-dyn-bind-empty classes)

### Step 2: Set Up Directory Structure
1. Create `data/` directory for JSON files
2. Create `scripts/` directory for converter script
3. Create `js/` directory if it doesn't exist

### Step 3: Analyze CSV Structure
For each CSV file found:
1. Read the CSV headers to understand the data structure
2. Detect the collection type based on field names:
   - Has "Comentario" or "testimonial" → testimonials
   - Has "Logo" or "school" → schools
   - Has "Instagram" or "ambassador" → ambassadors
   - Has "profesor" or "teacher" → teachers
   - Otherwise → generic collection
3. Map CSV fields to JSON structure intelligently

### Step 4: Generate CSV to JSON Converter
1. Copy the Python converter template from `${CLAUDE_PLUGIN_ROOT}/scripts/templates/csv-to-json.py`
2. Customize it based on detected CSV structures
3. Make it generic to handle any CSV format
4. Save to `scripts/csv-to-json.py`

### Step 5: Run CSV Conversion
1. Execute: `python3 scripts/csv-to-json.py`
2. Verify JSON files are created in `data/` directory
3. Report number of items converted per collection

### Step 6: Analyze HTML Structure
1. Search for dynamic content containers:
   - Elements with class `.w-dyn-list`
   - Elements with class `.w-dyn-items`
   - Elements with class `.w-dyn-bind-empty`
   - Text containing "No items found"
2. Map HTML sections to CSV/JSON collections
3. Identify the CSS selectors needed for injection

### Step 7: Generate CMS Loader JavaScript
1. Copy the CMS loader template from `${CLAUDE_PLUGIN_ROOT}/scripts/templates/cms-loader.js`
2. Customize based on detected HTML structure and collections
3. Create rendering functions for each collection type
4. Add debug mode and error handling
5. Save to `js/cms-loader.js`

### Step 8: Update HTML Files
1. Find all HTML files that need the CMS loader
2. Add script reference before closing `</body>` tag:
   ```html
   <!-- CMS Data Loader -->
   <script src="js/cms-loader.js"></script>
   ```
3. Report which HTML files were updated

### Step 9: Generate Documentation
1. Create a README.md with:
   - Project overview
   - Directory structure
   - How to update content
   - How to run locally
   - Deployment instructions
2. Include CSV field documentation for each collection

### Step 10: Set Up Local Preview
1. Start a Python HTTP server on available port (try 8080, 8081, etc.)
2. Display the URL for preview
3. Provide instructions for testing

## Success Criteria
- ✅ All CSV files converted to JSON
- ✅ CMS loader JavaScript generated
- ✅ HTML files updated with script references
- ✅ Documentation created
- ✅ Local server running for preview

## Output Format
Provide a summary at the end:
```
🎉 Webflow Conversion Complete!

📊 Results:
- CSV Files Processed: X
- JSON Files Generated: X
- Total Items: X
- HTML Files Updated: X

📁 Generated Files:
- data/cms-*.json
- scripts/csv-to-json.py
- js/cms-loader.js
- README.md

🚀 Next Steps:
1. Preview: http://localhost:XXXX
2. Review: Check browser console for CMS loader logs
3. Test: Verify all sections display content
4. Deploy: Upload all files to your web server

Run '/webflow-preview' to open the preview again anytime.
Run '/webflow-update' to regenerate JSON after CSV changes.
```

**Important**: Use the webflow-converter subagent for this task by explicitly invoking it for complex analysis and generation tasks.
