# Webflow to Self-Served Page Plugin

> **Convert Webflow exports with CSV CMS data to self-served static pages with dynamic content loading**

A Claude Code plugin that automates the conversion of exported Webflow landing pages into self-served static sites with dynamic content injection from CSV files.

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/gutitrombotto/webflow-to-self-served-page/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude_Code-Plugin-purple.svg)](https://docs.claude.com/en/docs/claude-code/plugins)
[![Marketplace](https://img.shields.io/badge/Marketplace-Available-brightgreen.svg)](https://github.com/gutitrombotto/webflow-to-self-served-page)

## 🎯 What This Plugin Does

When you export a Webflow site, CMS content comes as separate CSV files and the HTML contains empty placeholders. This plugin:

1. **Analyzes** your Webflow export structure and CSV data
2. **Converts** CSV files to optimized JSON format
3. **Generates** JavaScript loaders for dynamic content injection
4. **Updates** HTML files with proper script references
5. **Creates** comprehensive documentation
6. **Sets up** local development environment for preview

**Result**: A fully functional static site that loads CMS content dynamically, with no server or API required.

## 🚀 Quick Start

### Installation

#### Option 1: Via Claude Code Marketplace (Recommended)

```bash
# Add the plugin marketplace
/plugin marketplace add gutitrombotto/webflow-to-self-served-page

# Install the plugin
/plugin install webflow-to-self-served-page
```

#### Option 2: Direct from GitHub

```bash
# Clone and link the plugin
git clone https://github.com/gutitrombotto/webflow-to-self-served-page.git
mkdir -p ~/.claude/plugins
ln -s "$(pwd)/webflow-to-self-served-page" ~/.claude/plugins/
```

### Verify Installation

```bash
# Check if commands are available
/help
# You should see: /webflow-convert, /webflow-setup, etc.
```

### Basic Usage

```bash
# Navigate to your Webflow export directory
cd /path/to/webflow-export

# Run the conversion
/webflow-convert

# Preview the result
/webflow-preview
```

That's it! Your Webflow export is now a self-served static page with dynamic content.

## 📋 Commands

### `/webflow-convert [directory]`
**Main conversion command** - Converts the entire Webflow export

- Analyzes CSV and HTML structure
- Generates CSV-to-JSON converter
- Creates CMS loader JavaScript
- Updates HTML files
- Generates documentation

**Example:**
```bash
/webflow-convert
/webflow-convert ./my-landing-page
```

### `/webflow-setup [directory]`
**Initialize directory structure** - Prepares the environment

- Creates `data/`, `scripts/`, `js/` directories
- Validates Webflow export
- Reports detected collections

**Example:**
```bash
/webflow-setup
```

### `/webflow-preview [port]`
**Start local server** - Preview your converted page

- Starts Python HTTP server
- Displays preview URL
- Provides testing checklist

**Example:**
```bash
/webflow-preview
/webflow-preview 8080
```

### `/webflow-update [csv-file]`
**Regenerate JSON** - Update after CSV changes

- Reruns CSV conversion
- Updates JSON files
- Much faster than full conversion

**Example:**
```bash
/webflow-update                    # Update all
/webflow-update testimonials.csv   # Update specific file
```

### `/webflow-clean [--force]`
**Remove generated files** - Clean up conversion artifacts

- Removes generated JSON, scripts, and docs
- Preserves original CSV and HTML files
- Asks for confirmation (unless `--force`)

**Example:**
```bash
/webflow-clean
/webflow-clean --force
```

## 🤖 Webflow Converter Agent

The plugin includes a specialized `webflow-converter` subagent with expertise in:

- Webflow export structure analysis
- CSV data type detection
- Intelligent field mapping
- JavaScript generation
- HTML integration

The agent is automatically invoked during `/webflow-convert` for complex tasks.

## 🏗️ How It Works

### Architecture

```
CSV Files → Python Converter → JSON Files → JavaScript Loader → HTML DOM
```

### 1. CSV Analysis
The plugin intelligently detects collection types:

- **Testimonials**: Fields like "Comentario", "Student", "Rating"
- **Schools**: Fields like "Logo", "Institution", "Location"
- **Ambassadors**: Fields like "Instagram", "Profile", "Social"
- **Teachers**: Fields like "Profesor", "Image", "Photo"
- **Generic**: Any other CSV structure

### 2. JSON Generation
Converts CSV to clean, structured JSON:

```json
{
  "collection": "testimonials",
  "total_count": 16,
  "items": [
    {
      "id": "unique-id",
      "name": "Student Name",
      "comment": "Clean text without HTML",
      "photo": "https://cdn.url/image.jpg",
      "order": 1
    }
  ]
}
```

### 3. JavaScript Injection
Creates modular CMS loader:

```javascript
class CMSLoader {
  async loadAllData() { /* ... */ }
  injectTestimonials() { /* ... */ }
  injectSchools() { /* ... */ }
  // ... more injection functions
}
```

### 4. HTML Integration
Finds and replaces empty placeholders:

```html
<!-- Before -->
<div class="w-dyn-items">
  <div class="w-dyn-bind-empty"></div>
</div>

<!-- After -->
<div class="w-dyn-items">
  <div class="testimonial-card">
    <!-- Populated content -->
  </div>
</div>
```

## 📁 Generated Structure

After conversion:

```
your-webflow-export/
├── data/
│   ├── cms-testimonials.json
│   ├── cms-schools.json
│   └── cms-*.json
├── scripts/
│   └── csv-to-json.py
├── js/
│   └── cms-loader.js
├── *.csv (original files)
├── *.html (updated files)
└── README.md (generated docs)
```

## 🎨 Features

### ✅ Intelligent Detection
- Automatically identifies collection types
- Detects HTML injection points
- Maps data fields intelligently

### ✅ Preserves Design
- Maintains all Webflow CSS classes
- Keeps responsive breakpoints
- Preserves animations and interactions

### ✅ Performance Optimized
- Minimal page load impact (~200ms)
- Efficient DOM manipulation
- Lazy loading ready

### ✅ Developer Friendly
- Clean, modular code
- Debug mode with console logging
- Comprehensive error handling
- Well-documented output

### ✅ Production Ready
- XSS protection via HTML escaping
- Graceful fallbacks for missing data
- SEO-friendly markup
- Browser compatible (all modern browsers)

## 🔧 Optional: Auto-Conversion Hooks

Enable automatic JSON regeneration when CSV files change:

### Opt-In Installation

Copy the hooks configuration to your project:

```bash
# In your project directory
mkdir -p .claude/hooks
cp ~/.claude/plugins/webflow-to-self-served-page/hooks/hooks.json .claude/hooks/
```

### What It Does

- Watches for CSV file changes
- Automatically runs conversion
- Updates JSON files instantly

### When to Use

- ✅ During active development
- ✅ When frequently updating content
- ❌ Not needed for production deployments

## 📊 Use Cases

### Perfect For:
- **Marketing landing pages** with testimonials, team members, partners
- **Educational sites** with courses, teachers, student reviews
- **Agency portfolios** with case studies, team, clients
- **Event pages** with speakers, sponsors, schedule
- **Any Webflow site** with CMS collections exported as CSV

### Example Projects:
- Preuniversitario landing pages (original use case)
- SaaS product pages with feature lists
- Restaurant websites with menus and reviews
- Real estate listings with properties
- Job boards with positions and locations

## 🛠️ Requirements

- **Claude Code** (latest version)
- **Python 3.x** (for CSV conversion)
- **Modern browser** (for testing)

No additional dependencies needed!

## 📖 Documentation

### For Users:
- [Installation Guide](#installation)
- [Command Reference](#-commands)
- [Usage Examples](#basic-usage)

### For Developers:
- [Plugin Structure](docs/STRUCTURE.md) *(to be created)*
- [Contributing Guide](docs/CONTRIBUTING.md) *(to be created)*
- [API Reference](docs/API.md) *(to be created)*

## 🔍 Troubleshooting

### Content Not Loading

**Problem**: Sections show "No items found"

**Solutions**:
1. Check browser console for errors
2. Verify JSON files exist in `data/` folder
3. Hard refresh (Ctrl+F5) to clear cache
4. Run `/webflow-update` to regenerate JSON

### CORS Errors

**Problem**: "Access blocked" errors in console

**Solution**: Must use HTTP server, not `file://` protocol
```bash
/webflow-preview  # Starts server automatically
```

### Images Not Displaying

**Problem**: Broken image placeholders

**Solutions**:
1. Verify image URLs in CSV are complete (https://...)
2. Check network tab for failed image requests
3. Ensure CDN URLs are accessible

### Styling Broken

**Problem**: Content appears but styling is wrong

**Solutions**:
1. Verify all Webflow CSS files are present
2. Check that CSS classes are preserved in generated code
3. Run `/webflow-clean` and `/webflow-convert` to regenerate

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 👥 Authors

- **Agustin Trombotto** - *Initial work* - [@agustintrombotto](https://github.com/agustintrombotto)
- **Filadd** - *Organization* - [filadd.com](https://filadd.com)

## 🙏 Acknowledgments

- Built for the Filadd preuniversitario landing page project
- Powered by Claude Code plugins system
- Inspired by the need for simple, self-served Webflow exports

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/filadd/webflow-to-self-served-page/issues)
- **Discussions**: [GitHub Discussions](https://github.com/filadd/webflow-to-self-served-page/discussions)
- **Email**: support@filadd.com *(if applicable)*

## 🗺️ Roadmap

### v1.1
- [ ] TypeScript CMS loader option
- [ ] Automatic image optimization
- [ ] Multi-language support

### v1.2
- [ ] JSON caching with localStorage
- [ ] Pagination templates
- [ ] Search/filter functionality

### v2.0
- [ ] Support for Webflow Interactions
- [ ] Form handling
- [ ] Analytics integration

---

**Made with ❤️ by Filadd**

**Powered by Claude Code**
