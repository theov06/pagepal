// Apply settings to the current page
function applySettingsToPage(settings) {
  const body = document.body;
  const root = document.documentElement;

  // Remove all existing classes
  body.classList.remove(
    'uae-active',
    'uae-dyslexia-font',
    'uae-dyslexia-light',
    'uae-dyslexia-dark',
    'uae-distraction-free'
  );

  // If extension is disabled, remove all modifications
  if (!settings.enabled) {
    removeLineHighlighting();
    root.style.removeProperty('--uae-line-height');
    root.style.removeProperty('--uae-word-spacing');
    return;
  }

  // Apply active state for spacing
  body.classList.add('uae-active');

  // Update CSS variables
  const lineSpacing = settings.lineSpacing;
  const wordSpacing = settings.wordSpacing;

  root.style.setProperty('--uae-line-height', lineSpacing);
  root.style.setProperty('--uae-word-spacing', wordSpacing + 'em');

  // Apply font mode
  if (settings.fontMode === 'dyslexia') {
    body.classList.add('uae-dyslexia-font');
  }

  // Apply dyslexia colors based on system preference
  if (settings.dyslexiaColors) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      body.classList.add('uae-dyslexia-dark');
      console.log('Dyslexia dark mode enabled (system preference)');
    } else {
      body.classList.add('uae-dyslexia-light');
      console.log('Dyslexia light mode enabled (system preference)');
    }
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

  console.log('PagePal settings applied:', settings);
}

// Add line highlighting to text elements
function applyLineHighlighting() {
  const textElements = document.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6, blockquote, td, div');
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
    sendResponse({success: true});
  }
});

// Load and apply settings on page load
console.log('PagePal content script loaded!');

chrome.storage.sync.get({
  enabled: true,
  fontMode: 'default',
  lineSpacing: 1.5,
  wordSpacing: 0.1,
  dyslexiaColors: false,
  distractionFree: false,
  lineHighlight: false
}, (settings) => {
  console.log('PagePal applying settings:', settings);
  applySettingsToPage(settings);
});
