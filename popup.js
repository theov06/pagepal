// Default settings
const defaultSettings = {
  enabled: true,
  fontMode: 'default',
  lineSpacing: 1.5,
  wordSpacing: 0.1,
  theme: 'default',
  distractionFree: false,
  lineHighlight: false
};

// Get all UI elements
const elements = {
  enabled: document.getElementById('enabled'),
  fontMode: document.getElementById('fontMode'),
  lineSpacing: document.getElementById('lineSpacing'),
  lineSpacingValue: document.getElementById('lineSpacingValue'),
  wordSpacing: document.getElementById('wordSpacing'),
  wordSpacingValue: document.getElementById('wordSpacingValue'),
  theme: document.getElementById('theme'),
  distractionFree: document.getElementById('distractionFree'),
  lineHighlight: document.getElementById('lineHighlight')
};

// Load saved settings
function loadSettings() {
  chrome.storage.sync.get(defaultSettings, (settings) => {
    elements.enabled.checked = settings.enabled;
    elements.fontMode.value = settings.fontMode;
    elements.lineSpacing.value = settings.lineSpacing;
    elements.lineSpacingValue.textContent = settings.lineSpacing;
    elements.wordSpacing.value = settings.wordSpacing;
    elements.wordSpacingValue.textContent = settings.wordSpacing;
    elements.theme.value = settings.theme;
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
    theme: elements.theme.value,
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

// Add event listeners
elements.enabled.addEventListener('change', saveSettings);
elements.fontMode.addEventListener('change', saveSettings);
elements.theme.addEventListener('change', saveSettings);
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

// Load settings on popup open
document.addEventListener('DOMContentLoaded', loadSettings);
