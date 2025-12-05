# Testing Checklist

Use this checklist to verify all features work correctly across different websites.

## Setup Test
- [ ] Extension loads without errors in `chrome://extensions/`
- [ ] Extension icon appears in toolbar
- [ ] Clicking icon opens popup
- [ ] Popup displays all controls correctly

## Feature Tests

### Enable/Disable
- [ ] Toggling "Enable Extension" on/off works
- [ ] When disabled, page returns to normal appearance
- [ ] Settings persist after closing popup

### Font Mode
- [ ] Switching to "Dyslexia-Friendly" changes font
- [ ] Switching back to "Default" restores original font
- [ ] Font change applies to all text on page

### Font Size
- [ ] Slider adjusts font size smoothly
- [ ] Value display updates correctly
- [ ] Text becomes larger/smaller as expected
- [ ] Works on different text elements (headings, paragraphs, lists)

### Line Spacing
- [ ] Slider adjusts line height
- [ ] Text becomes more/less spaced vertically
- [ ] Doesn't break page layout significantly

### Word Spacing
- [ ] Slider adds space between words
- [ ] Effect is visible and helpful
- [ ] Doesn't cause text overflow issues

### Themes
- [ ] Light theme applies correctly
- [ ] Dark theme applies correctly
- [ ] High Contrast theme applies correctly
- [ ] Links remain visible in all themes
- [ ] Switching themes updates page immediately

### Distraction-Free Mode
- [ ] Sidebars are hidden when enabled
- [ ] Ads are hidden when enabled
- [ ] Main content remains visible
- [ ] Doesn't hide important navigation
- [ ] Can be toggled on/off

### Line Highlighting
- [ ] Hovering over paragraphs highlights them
- [ ] Hovering over list items highlights them
- [ ] Highlight is visible but not overwhelming
- [ ] Works with different themes

## Cross-Site Testing

Test on these types of sites:

### News Site (e.g., CNN, BBC)
- [ ] All features work
- [ ] Distraction-free mode hides sidebars
- [ ] Reading experience improves

### Wikipedia
- [ ] Dense text becomes more readable
- [ ] Sidebar handling works
- [ ] Tables remain functional

### Blog Site
- [ ] Various layouts handled correctly
- [ ] Comments section works
- [ ] Images don't break

### Ad-Heavy Site
- [ ] Distraction-free mode removes ads
- [ ] Main content remains accessible
- [ ] Page remains usable

### Dark-Themed Site
- [ ] Theme overrides work
- [ ] Contrast themes apply correctly
- [ ] Text remains readable

## Performance Tests
- [ ] Page loads without significant delay
- [ ] Changing settings updates page quickly
- [ ] No console errors
- [ ] Memory usage is reasonable

## Edge Cases
- [ ] Works on pages with iframes
- [ ] Works on single-page applications
- [ ] Settings persist across browser restart
- [ ] Multiple tabs can have different settings (if desired)
- [ ] Works on pages loaded before extension was installed (after refresh)

## Notes
Record any issues or unexpected behavior here:
