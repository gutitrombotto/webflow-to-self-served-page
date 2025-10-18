---
description: Start local server and preview the converted Webflow page
argument-hint: [port-number]
allowed-tools: Bash
---

Start a local HTTP server to preview the converted Webflow page.

**Port**: $ARGUMENTS (if provided, otherwise try 8080, 8081, 8082, etc.)

## Preview Tasks

### 1. Check for Conversion Files
Verify that conversion has been completed:
- `data/` directory exists with JSON files
- `js/cms-loader.js` exists
- HTML files exist

If not found, suggest running `/webflow-convert` first.

### 2. Start HTTP Server
Try to start Python HTTP server:
```bash
python3 -m http.server PORT
```

If port is in use, try the next port automatically.

### 3. Display Preview Information
```
🌐 Local Server Started

📍 Preview URL: http://localhost:PORT
📁 Serving from: /path/to/directory

🔍 Testing Checklist:
- [ ] Open the URL in your browser
- [ ] Check browser console for CMS loader logs
- [ ] Verify all sections display content
- [ ] Test "ver más" buttons (if applicable)
- [ ] Check mobile responsive design

💡 Tips:
- Hard refresh (Ctrl+F5) if content doesn't appear
- Check console for "[CMS Loader]" messages
- Images should load from CDN URLs

🛑 To stop the server: Press Ctrl+C in the terminal
```

### 4. Optional: Keep Server Running
The server will run in the background. User can check output with appropriate commands.

**Note**: This command assumes conversion is already complete. Run `/webflow-convert` first if needed.
