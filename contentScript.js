// Apply settings to the current page
function applySettingsToPage(settings) {
  const body = document.body;
  
  // Remove all existing classes
  body.classList.remove(
    'uae-active',
    'uae-dyslexia-font',
    'uae-theme-light',
    'uae-theme-dark',
    'uae-theme-high-contrast',
    'uae-distraction-free'
  );
  
  // If extension is disabled, remove all modifications
  if (!settings.enabled) {
    removeLineHighlighting();
    return;
  }
  
  // Apply active state for spacing
  body.classList.add('uae-active');
  
  // Update CSS variables
  document.documentElement.style.setProperty('--uae-font-size', settings.fontSize + 'rem');
  document.documentElement.style.setProperty('--uae-line-height', settings.lineSpacing);
  document.documentElement.style.setProperty('--uae-word-spacing', settings.wordSpacing + 'em');
  
  // Apply font mode
  if (settings.fontMode === 'dyslexia') {
    body.classList.add('uae-dyslexia-font');
  }
  
  // Apply theme
  if (settings.theme !== 'default') {
    body.classList.add('uae-theme-' + settings.theme);
  }
  
  // Apply distraction-free mode
  if (settings.distractionFree) {
    body.classList.add('uae-distraction-free');
  }
  
  // Apply line highlighting
  if (settings.lineHighlight) {
    applyLineHighlighting();
  } else {
    removeLineHighlighting();
  }
}

// Add line highlighting to text elements
function applyLineHighlighting() {
  const textElements = document.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6, blockquote, td');
  textElements.forEach(el => {
    if (!el.classList.contains('uae-highlight-hover')) {
      el.classList.add('uae-highlight-hover');
    }
  });
}

// Remove line highlighting
function removeLineHighlighting() {
  const highlightedElements = document.querySelectorAll('.uae-highlight-hover');
  highlightedElements.forEach(el => {
    el.classList.remove('uae-highlight-hover');
  });
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'UPDATE_SETTINGS') {
    applySettingsToPage(message.settings);
  }
});

// Load and apply settings on page load
chrome.storage.sync.get({
  enabled: true,
  fontMode: 'default',
  fontSize: 1.0,
  lineSpacing: 1.5,
  wordSpacing: 0.1,
  theme: 'default',
  distractionFree: false,
  lineHighlight: false
}, (settings) => {
  applySettingsToPage(settings);
});
