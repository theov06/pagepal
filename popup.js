// Default settings
const defaultSettings = {
  enabled: true,
  fontMode: 'default',
  lineSpacing: 1.5,
  wordSpacing: 0.1,
  dyslexiaColors: false,
  distractionFree: false,
  lineHighlight: false
};

// Get all UI elements (will be populated on DOMContentLoaded)
let elements = {};

// Load saved settings
function loadSettings() {
  chrome.storage.sync.get(defaultSettings, (settings) => {
    elements.enabled.checked = settings.enabled;
    elements.fontMode.value = settings.fontMode;
    elements.lineSpacing.value = settings.lineSpacing;
    elements.lineSpacingValue.textContent = settings.lineSpacing;
    elements.wordSpacing.value = settings.wordSpacing;
    elements.wordSpacingValue.textContent = settings.wordSpacing;
    elements.dyslexiaColors.checked = settings.dyslexiaColors;
    elements.distractionFree.checked = settings.distractionFree;
    elements.lineHighlight.checked = settings.lineHighlight;
  });
}

// Save settings and notify content script
function saveSettings() {
  const settings = {
    enabled: elements.enabled.checked,
    fontMode: elements.fontMode.value,
    lineSpacing: parseFloat(elements.lineSpacing.value),
    wordSpacing: parseFloat(elements.wordSpacing.value),
    dyslexiaColors: elements.dyslexiaColors.checked,
    distractionFree: elements.distractionFree.checked,
    lineHighlight: elements.lineHighlight.checked
  };

  chrome.storage.sync.set(settings, () => {
    // Send message to active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: 'UPDATE_SETTINGS',
          settings: settings
        }, (response) => {
          // Ignore errors - content script may not be loaded yet
          if (chrome.runtime.lastError) {
            console.log('Content script not ready:', chrome.runtime.lastError.message);
          }
        });
      }
    });
  });
}

// Load settings on popup open
document.addEventListener('DOMContentLoaded', () => {
  // Get all UI elements
  elements = {
    enabled: document.getElementById('enabled'),
    fontMode: document.getElementById('fontMode'),
    lineSpacing: document.getElementById('lineSpacing'),
    lineSpacingValue: document.getElementById('lineSpacingValue'),
    wordSpacing: document.getElementById('wordSpacing'),
    wordSpacingValue: document.getElementById('wordSpacingValue'),
    dyslexiaColors: document.getElementById('dyslexiaColors'),
    distractionFree: document.getElementById('distractionFree'),
    lineHighlight: document.getElementById('lineHighlight')
  };
  
  loadSettings();
  
  // Add event listeners
  elements.enabled.addEventListener('change', saveSettings);
  elements.fontMode.addEventListener('change', saveSettings);
  elements.dyslexiaColors.addEventListener('change', saveSettings);
  elements.distractionFree.addEventListener('change', saveSettings);
  elements.lineHighlight.addEventListener('change', saveSettings);

  elements.lineSpacing.addEventListener('input', () => {
    elements.lineSpacingValue.textContent = elements.lineSpacing.value;
    saveSettings();
  });

  elements.wordSpacing.addEventListener('input', () => {
    elements.wordSpacingValue.textContent = elements.wordSpacing.value;
    saveSettings();
  });
});
