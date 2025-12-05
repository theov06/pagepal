# PagePal

Your friendly reading companion for the web. PagePal is a Chrome extension that empowers users to customize their reading experience on any webpage. Built with accessibility in mind, PagePal helps people with dyslexia, visual impairments, or anyone who wants better control over web readability.

## What It Does

Many websites have fixed fonts, cramped spacing, and distracting elements that make reading difficult. PagePal gives you full control over how text appears, making the web more accessible for everyone.

## Features

- **Dyslexia-Friendly Font** - Switch to a heavier, more readable font style
- **Adjustable Font Size** - Scale text from 0.8x to 2.0x
- **Line Spacing Control** - Adjust line height for better readability (1.0 to 3.0)
- **Word Spacing Control** - Add space between words (0 to 0.5em)
- **High-Contrast Themes** - Choose from Light, Dark, or High Contrast modes
- **Distraction-Free Mode** - Automatically hide sidebars, ads, and popups
- **Line Highlighting** - Highlight text blocks on hover to maintain focus

## How to Install (Developer Mode)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the `universal-accessibility-extension` folder
6. The extension icon should appear in your toolbar

## How to Use

1. Click the extension icon in your Chrome toolbar
2. Adjust the settings using the sliders and toggles:
   - Toggle "Enable Extension" on/off
   - Choose your preferred font style
   - Adjust font size, line spacing, and word spacing
   - Select a contrast theme
   - Enable distraction-free mode to hide clutter
   - Enable line highlighting for better focus
3. Settings are saved automatically and persist across pages
4. Visit any website to see your customizations applied

## Testing Recommendations

Try the extension on different types of websites:
- News sites (long articles)
- Wikipedia (dense content)
- Blogs (varied layouts)
- Sites with ads (test distraction-free mode)
- Dark-themed sites (test contrast themes)

## Technical Details

- Built with Manifest V3
- Uses Chrome Storage API for persistent settings
- Content scripts inject CSS dynamically
- Popup UI for easy control

## Future Work

Potential features for future versions:
- Per-site profiles (save different settings for different websites)
- Keyboard shortcuts for quick toggling
- Export/import settings
- Custom color picker for themes
- Reading ruler (horizontal line that follows cursor)
- Text-to-speech integration
- Support for custom fonts (upload your own)
- Focus mode (dim everything except selected paragraph)

## Contributing

This is an open project built to help make the web more accessible. Contributions, suggestions, and feedback are welcome!

## License

MIT License - Feel free to use, modify, and distribute.

---

**Note**: You'll need to create a 128x128 PNG icon and place it at `icons/icon128.png` before the extension will load properly in Chrome.
