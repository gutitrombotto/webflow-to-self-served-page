# 🎯 How to Use the Plugin - Complete Guide

## 📥 Scenario: You Just Downloaded a New Webflow Page

### Step 1: Install the Plugin (One-Time Setup)

First, you need to install the plugin. Since it's not on GitHub yet, use the local installation:

```bash
# Option A: Link to your Claude plugins directory (recommended)
mkdir -p ~/.claude/plugins
ln -s /home/atrombotto/Documents/filadd/webflow-to-self-served-page \
      ~/.claude/plugins/webflow-to-self-served-page

# Option B: Copy the plugin
cp -r /home/atrombotto/Documents/filadd/webflow-to-self-served-page \
      ~/.claude/plugins/webflow-to-self-served-page
```

**Verify installation:**
```bash
# Check if commands are available
/help
# You should see: /webflow-convert, /webflow-setup, etc.
```

---

### Step 2: Download Your Webflow Site

1. **In Webflow Designer**:
   - Go to your project
   - Click "Export" (top right)
   - Download the ZIP file

2. **Extract the ZIP**:
   ```bash
   cd ~/Downloads
   unzip your-webflow-site.zip -d my-landing-page
   cd my-landing-page
   ```

3. **What you should see**:
   ```
   my-landing-page/
   ├── index.html
   ├── other-pages.html
   ├── css/
   ├── js/
   ├── images/
   ├── fonts/
   ├── testimonials.csv       ← CMS data
   ├── schools.csv            ← CMS data
   └── other-collections.csv  ← CMS data
   ```

---

### Step 3: Convert with One Command! 🚀

```bash
# Navigate to your Webflow export directory
cd ~/Downloads/my-landing-page

# Run the conversion
/webflow-convert
```

**That's it!** The plugin will:
1. ✅ Detect all CSV files
2. ✅ Analyze HTML structure
3. ✅ Generate CSV-to-JSON converter
4. ✅ Convert all CSVs to JSON
5. ✅ Generate CMS loader JavaScript
6. ✅ Update HTML files
7. ✅ Create documentation
8. ✅ Start local preview server

---

### Step 4: Preview Your Site

The conversion automatically starts a preview server. If not, run:

```bash
/webflow-preview
```

**Open your browser**: `http://localhost:8081`

**Check that**:
- ✅ Testimonials section shows real content (not "No items found")
- ✅ Schools/partners section displays logos
- ✅ All images load correctly
- ✅ "Ver más" buttons work (if applicable)

---

### Step 5: Make Updates (Optional)

If you need to update content:

#### Update CSV Content:

1. **Edit the CSV files** (in Excel, Google Sheets, or text editor)
2. **Regenerate JSON**:
   ```bash
   /webflow-update
   ```
3. **Refresh browser** (Ctrl+F5 to clear cache)

#### Clean and Reconvert:

```bash
# Remove all generated files
/webflow-clean

# Start over
/webflow-convert
```

---

## 🎬 Complete Workflow Example

### Real-World Example: New Landing Page for Filadd

```bash
# 1. Download Webflow export
cd ~/Projects/filadd
unzip landing-page-v2.zip -d landing-v2
cd landing-v2

# You see:
# - index.html
# - testimonials.csv (50 students)
# - schools.csv (100 schools)
# - teachers.csv (25 teachers)

# 2. Convert everything
/webflow-convert

# Output:
# 🎉 Webflow Conversion Complete!
#
# 📊 Results:
# - CSV Files Processed: 3
# - JSON Files Generated: 3
# - Total Items: 175
# - HTML Files Updated: 1
#
# 📁 Generated Files:
# - data/cms-testimonials.json
# - data/cms-schools.json
# - data/cms-teachers.json
# - scripts/csv-to-json.py
# - js/cms-loader.js
# - README.md
#
# 🚀 Preview: http://localhost:8081

# 3. Test in browser
# Open http://localhost:8081
# ✅ All sections working!

# 4. Client wants to add more testimonials
# Edit testimonials.csv, add 10 more rows

# 5. Update the site
/webflow-update

# Output:
# ♻️  CSV Update Complete
#
# 📊 Results:
# - CSV files processed: 3
# - JSON files updated: 3
# - Total items: 185 (+10)

# 6. Refresh browser - new testimonials appear!

# 7. Deploy to production
rsync -avz . user@server:/var/www/landing-v2/
# Done! Site is live with dynamic content
```

---

## 🔄 Different Use Cases

### Use Case 1: First Time Webflow Export

```bash
cd /path/to/webflow-export
/webflow-convert
/webflow-preview
```

### Use Case 2: Content Update Only

```bash
# Edit CSV files
/webflow-update
# Refresh browser
```

### Use Case 3: Starting Fresh

```bash
/webflow-clean --force
/webflow-convert
```

### Use Case 4: Just Want to Preview

```bash
# If already converted
/webflow-preview

# If not converted yet
/webflow-convert  # Includes preview
```

### Use Case 5: Testing Different Approaches

```bash
# Try conversion
/webflow-convert

# Not happy with it? Clean up
/webflow-clean

# Try again with modified CSV
/webflow-convert
```

---

## 🎨 Advanced: Enable Auto-Conversion (Optional)

If you want CSV changes to automatically regenerate JSON:

```bash
# One-time setup for this project
mkdir -p .claude/hooks
cp ~/.claude/plugins/webflow-to-self-served-page/hooks/hooks.json \
   .claude/hooks/

# Now whenever you edit a CSV file:
# Edit testimonials.csv → JSON auto-regenerates!
```

---

## 📋 Quick Reference Card

| Task | Command |
|------|---------|
| **First-time conversion** | `/webflow-convert` |
| **Update after CSV changes** | `/webflow-update` |
| **Preview in browser** | `/webflow-preview` |
| **Start fresh** | `/webflow-clean` then `/webflow-convert` |
| **Just setup structure** | `/webflow-setup` |

---

## 🔍 What the Plugin Creates

After `/webflow-convert`, your directory looks like:

```
your-webflow-export/
├── data/                          ← NEW! Generated JSON
│   ├── cms-testimonials.json
│   ├── cms-schools.json
│   └── cms-*.json
├── scripts/                       ← NEW! Converter script
│   └── csv-to-json.py
├── js/
│   ├── webflow.js                (original)
│   └── cms-loader.js             ← NEW! Dynamic loader
├── *.csv                          (original, unchanged)
├── *.html                         (updated with <script> tags)
├── css/                           (original, unchanged)
├── images/                        (original, unchanged)
└── README.md                      ← NEW! Documentation
```

**Original files are NEVER deleted**, only new files are added and HTML files are updated with script tags.

---

## ⚠️ Important Notes

### DO:
✅ Keep original CSV files (they're your source of truth)
✅ Edit CSV files to update content
✅ Run `/webflow-update` after CSV changes
✅ Use version control (git) for your project

### DON'T:
❌ Edit JSON files directly (they're auto-generated)
❌ Edit `cms-loader.js` manually (regenerate if needed)
❌ Delete original CSV files
❌ Forget to refresh browser after updates (Ctrl+F5)

---

## 🚀 Deployment to Production

Once you've tested locally:

```bash
# Your site is ready to deploy!
# Upload everything to your web server:

# Option 1: FTP/SFTP
# Upload entire directory to your hosting

# Option 2: rsync
rsync -avz --exclude='.git' --exclude='node_modules' \
  . user@yourserver.com:/var/www/html/

# Option 3: Static hosting (Netlify, Vercel, etc.)
# Just drag and drop the entire folder
# Or connect to GitHub and auto-deploy
```

**No build process needed!** It's all static files.

---

## 💡 Pro Tips

### Tip 1: Keep a Backup
```bash
# Before first conversion
cp -r my-landing-page my-landing-page-backup
```

### Tip 2: Use Git
```bash
cd my-landing-page
git init
git add .
git commit -m "Original Webflow export"
/webflow-convert
git add .
git commit -m "After plugin conversion"
```

### Tip 3: Test Before Deploying
```bash
# Always preview locally first
/webflow-preview
# Check all sections, test all links
# Then deploy
```

### Tip 4: Update Workflow
```bash
# When client wants content changes:
# 1. Edit CSV in Google Sheets
# 2. Download as CSV
# 3. Replace old CSV file
# 4. Run: /webflow-update
# 5. Refresh browser to verify
# 6. Deploy updated files
```

---

## 🎯 TL;DR - Simplest Workflow

```bash
# 1. Extract Webflow export
cd ~/Downloads/my-webflow-site

# 2. Convert it
/webflow-convert

# 3. Open browser → http://localhost:8081
# Done! ✅
```

That's it! The plugin handles everything else automatically. 🚀

---

## 🆘 Troubleshooting

### Problem: Commands Not Found

**Symptom**: `/webflow-convert` shows "command not found"

**Solution**:
```bash
# Reinstall plugin
ln -sf /home/atrombotto/Documents/filadd/webflow-to-self-served-page \
       ~/.claude/plugins/webflow-to-self-served-page

# Restart Claude Code
```

### Problem: "No CSV files found"

**Symptom**: Plugin says no CSV files detected

**Solution**:
- Verify you're in the correct directory
- Check that CSV files are in the root (not in subdirectories)
- Ensure files have `.csv` extension (not `.CSV` or `.txt`)

### Problem: Content Not Loading

**Symptom**: Browser shows "No items found"

**Solution**:
```bash
# Check console for errors (F12 in browser)
# Verify JSON files exist
ls data/

# Regenerate if needed
/webflow-update

# Hard refresh browser
Ctrl+F5 (Windows/Linux) or Cmd+Shift+R (Mac)
```

### Problem: CORS Errors

**Symptom**: Console shows "Access blocked" or CORS error

**Solution**:
```bash
# Must use HTTP server, not file:// protocol
/webflow-preview
# Then use http://localhost:8081
```

### Problem: Port Already in Use

**Symptom**: "Address already in use" when starting preview

**Solution**:
```bash
# Try different port
/webflow-preview 8082

# Or kill existing server
lsof -ti:8081 | xargs kill -9
```

### Problem: Images Not Loading

**Symptom**: Broken image placeholders

**Solution**:
- Check that CSV contains full image URLs (starting with `https://`)
- Verify CDN URLs are accessible
- Check browser network tab for failed requests

### Problem: Styling Broken

**Symptom**: Content appears but looks wrong

**Solution**:
```bash
# Clean and reconvert
/webflow-clean
/webflow-convert

# Verify all CSS files are present
ls css/
```

---

## 📞 Getting Help

If you encounter issues:

1. **Check this guide** - Most common issues covered above
2. **Check browser console** - Press F12, look for errors
3. **Verify file structure** - Ensure Webflow export is complete
4. **Try clean conversion** - Run `/webflow-clean` then `/webflow-convert`
5. **Check README** - More detailed documentation available

---

**Last Updated**: October 2025
**Plugin Version**: 1.0.0
**Author**: Agustin Trombotto (Filadd)
