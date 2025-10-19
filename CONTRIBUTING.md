# Contributing to Webflow to Self-Served Page

Thank you for your interest in contributing to the Webflow to Self-Served Page plugin! We welcome contributions from the community.

## 🚀 Development Setup

### Prerequisites

- Claude Code installed and configured
- Python 3.x for testing CSV conversion
- Git for version control
- A Webflow export for testing (optional but recommended)

### Setup Steps

1. **Fork the repository**
   ```bash
   # Fork via GitHub UI, then clone your fork
   git clone https://github.com/YOUR-USERNAME/webflow-to-self-served-page.git
   cd webflow-to-self-served-page
   ```

2. **Link to Claude Code**
   ```bash
   # Create plugins directory if it doesn't exist
   mkdir -p ~/.claude/plugins

   # Link your development version
   ln -s "$(pwd)" ~/.claude/plugins/webflow-to-self-served-page
   ```

3. **Verify installation**
   ```bash
   # Check if commands are available in Claude Code
   /help
   # You should see: /webflow-convert, /webflow-setup, etc.
   ```

## 🧪 Testing Your Changes

### Manual Testing

Test your changes with real Webflow exports:

1. **Test with different structures**
   - Simple single-page exports
   - Multi-page exports
   - Different CSV collection types (testimonials, schools, teachers, etc.)
   - Edge cases (empty CSVs, missing fields, special characters)

2. **Test all commands**
   ```bash
   /webflow-setup      # Test directory setup
   /webflow-convert    # Test full conversion
   /webflow-preview    # Test preview server
   /webflow-update     # Test incremental updates
   /webflow-clean      # Test cleanup
   ```

3. **Verify output**
   - Check that JSON files are generated correctly
   - Verify HTML is updated properly
   - Test the preview in a browser
   - Check console for JavaScript errors

### Testing Checklist

Before submitting a PR, ensure:

- [ ] All commands work without errors
- [ ] Generated code is clean and follows best practices
- [ ] CSV to JSON conversion handles edge cases
- [ ] HTML injection preserves Webflow styling
- [ ] Documentation is updated if needed
- [ ] No breaking changes to existing functionality

## 📝 Making Changes

### Code Style

- **Python**: Follow PEP 8 guidelines
- **JavaScript**: Use ES6+ modern syntax
- **Markdown**: Use consistent formatting for documentation
- **Shell scripts**: Use shellcheck for validation

### File Organization

```
webflow-to-self-served-page/
├── .claude-plugin/          # Plugin metadata
│   ├── plugin.json
│   └── marketplace.json
├── commands/                # Slash command definitions
│   └── webflow-*.md
├── agents/                  # Custom agents
│   └── webflow-converter.md
├── hooks/                   # Optional hooks
│   └── hooks.json
├── scripts/                 # Scripts and templates
│   ├── templates/
│   └── utils/
└── docs/                    # Additional documentation
```

### Adding New Features

1. **Create a new command**
   - Add a new file in `commands/` directory
   - Follow the existing command format
   - Document parameters and usage

2. **Update the agent**
   - Modify `agents/webflow-converter.md` if needed
   - Keep the agent focused and specialized

3. **Update documentation**
   - Update README.md with new features
   - Update USAGE_INSTRUCTIONS.md with examples
   - Add examples to relevant sections

## 🔄 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clear, concise commit messages
   - Keep commits focused and atomic
   - Test thoroughly

3. **Update documentation**
   - Update README.md if adding features
   - Add/update command documentation in `commands/`
   - Update version in `plugin.json` and `marketplace.json` (semantic versioning)

4. **Submit the PR**
   - Write a clear PR description
   - Explain what changes you made and why
   - Reference any related issues
   - Include testing details

5. **PR Template**
   ```markdown
   ## Description
   Brief description of your changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Breaking change

   ## Testing
   How did you test these changes?

   ## Checklist
   - [ ] Code follows project style guidelines
   - [ ] Documentation updated
   - [ ] Tested with real Webflow exports
   - [ ] All commands work correctly
   ```

## 🐛 Reporting Bugs

When reporting bugs, please include:

- Claude Code version
- Plugin version
- Operating system
- Steps to reproduce
- Expected behavior
- Actual behavior
- Error messages or logs
- Sample CSV/HTML if possible (without sensitive data)

## 💡 Suggesting Enhancements

We love new ideas! When suggesting enhancements:

- Check if the feature already exists
- Explain the use case clearly
- Describe the expected behavior
- Consider backwards compatibility
- Provide examples if possible

## 📋 Code Review Process

- PRs require at least one review before merging
- Reviewers will check for:
  - Code quality and style
  - Test coverage
  - Documentation completeness
  - Backwards compatibility
  - Performance implications

## 🎯 Good First Issues

Look for issues tagged with `good first issue` - these are great starting points for new contributors!

## 📞 Getting Help

- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check README.md and USAGE_INSTRUCTIONS.md

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help create a welcoming environment for all contributors

## 🙏 Recognition

Contributors will be recognized in:
- GitHub contributors list
- Release notes
- Project documentation

Thank you for contributing to the Webflow to Self-Served Page plugin! 🎉

---

**Questions?** Open an issue or discussion on GitHub!
