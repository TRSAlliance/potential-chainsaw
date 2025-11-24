import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Eye, 
  EyeOff, 
  Volume2, 
  VolumeX, 
  MousePointer, 
  Keyboard,
  Contrast,
  Type,
  Pause,
  Play
} from 'lucide-react';

const AccessibilityContext = createContext();

const accessibilityReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_HIGH_CONTRAST':
      return { ...state, highContrast: !state.highContrast };
    case 'TOGGLE_REDUCED_MOTION':
      return { ...state, reducedMotion: !state.reducedMotion };
    case 'TOGGLE_SCREEN_READER':
      return { ...state, screenReaderMode: !state.screenReaderMode };
    case 'TOGGLE_AUDIO_DESCRIPTIONS':
      return { ...state, audioDescriptions: !state.audioDescriptions };
    case 'SET_FONT_SIZE':
      return { ...state, fontSize: action.payload };
    case 'TOGGLE_FOCUS_INDICATORS':
      return { ...state, enhancedFocus: !state.enhancedFocus };
    case 'TOGGLE_KEYBOARD_NAVIGATION':
      return { ...state, keyboardNavigation: !state.keyboardNavigation };
    default:
      return state;
  }
};

const useSpeechSynthesis = () => {
  const [speaking, setSpeaking] = React.useState(false);
  const [supported, setSupported] = React.useState(false);

  useEffect(() => {
    setSupported('speechSynthesis' in window);
  }, []);

  const speak = (text) => {
    if (!supported || !text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (!supported) return;
    speechSynthesis.cancel();
    setSpeaking(false);
  };

  return { speak, stop, speaking, supported };
};

const ScreenReaderAnnouncer = ({ message, priority = 'polite' }) => {
  return (
    <div
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
};

const useFocusManagement = () => {
  const [focusedElement, setFocusedElement] = React.useState(null);

  const setFocus = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.focus();
      setFocusedElement(elementId);
    }
  };

  const trapFocus = (containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    return () => container.removeEventListener('keydown', handleTabKey);
  };

  return { setFocus, trapFocus, focusedElement };
};

export const AccessibilityProvider = ({ children }) => {
  const [settings, dispatch] = useReducer(accessibilityReducer, {
    highContrast: false,
    reducedMotion: false,
    screenReaderMode: false,
    audioDescriptions: false,
    fontSize: 'medium',
    enhancedFocus: false,
    keyboardNavigation: true
  });

  const { speak, stop, speaking } = useSpeechSynthesis();
  const focusManagement = useFocusManagement();

  useEffect(() => {
    const root = document.documentElement;
    
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (settings.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    if (settings.enhancedFocus) {
      root.classList.add('enhanced-focus');
    } else {
      root.classList.remove('enhanced-focus');
    }

    root.style.setProperty('--accessibility-font-scale', 
      settings.fontSize === 'small' ? '0.875' :
      settings.fontSize === 'large' ? '1.125' :
      settings.fontSize === 'xlarge' ? '1.25' : '1'
    );
  }, [settings]);

  useEffect(() => {
    if (!settings.keyboardNavigation) return;

    const handleKeyboardNav = (e) => {
    
      if (e.key === 'm' && e.altKey) {
        const main = document.querySelector('main');
        if (main) main.focus();
      }
      
      if (e.key === 'a' && e.altKey && e.ctrlKey) {
        const accessibilityMenu = document.getElementById('accessibility-menu');
        if (accessibilityMenu) accessibilityMenu.focus();
      }
    };

    document.addEventListener('keydown', handleKeyboardNav);
    return () => document.removeEventListener('keydown', handleKeyboardNav);
  }, [settings.keyboardNavigation]);

  const value = {
    settings,
    dispatch,
    speak,
    stop,
    speaking,
    ...focusManagement
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
      <AccessibilityStyles />
    </AccessibilityContext.Provider>
  );
};

const AccessibilityStyles = () => (
  <style jsx global>{`
    .high-contrast {
      --bg-primary: #000000;
      --bg-secondary: #1a1a1a;
      --text-primary: #ffffff;
      --text-secondary: #cccccc;
      --border-color: #ffffff;
      --accent-color: #ffff00;
    }
    
    .reduce-motion * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    
    .enhanced-focus *:focus {
      outline: 3px solid #ffff00 !important;
      outline-offset: 2px !important;
      box-shadow: 0 0 0 6px rgba(255, 255, 0, 0.3) !important;
    }
    
    body {
      font-size: calc(1rem * var(--accessibility-font-scale, 1));
    }
    
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
  `}</style>
);

export const AccessibilityControlPanel = ({ onClose }) => {
  const { settings, dispatch, speak, stop, speaking } = useAccessibility();

  const controls = [
    {
      id: 'highContrast',
      label: 'High Contrast',
      icon: Contrast,
      active: settings.highContrast,
      action: () => dispatch({ type: 'TOGGLE_HIGH_CONTRAST' })
    },
    {
      id: 'reducedMotion',
      label: 'Reduce Motion',
      icon: Pause,
      active: settings.reducedMotion,
      action: () => dispatch({ type: 'TOGGLE_REDUCED_MOTION' })
    },
    {
      id: 'screenReader',
      label: 'Screen Reader',
      icon: Volume2,
      active: settings.screenReaderMode,
      action: () => dispatch({ type: 'TOGGLE_SCREEN_READER' })
    },
    {
      id: 'enhancedFocus',
      label: 'Enhanced Focus',
      icon: MousePointer,
      active: settings.enhancedFocus,
      action: () => dispatch({ type: 'TOGGLE_FOCUS_INDICATORS' })
    }
  ];

  return (
    <Card className="fixed top-4 right-4 z-50 bg-slate-800 border-slate-700 w-80">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white">Accessibility Options</h3>
          <Button size="sm" variant="ghost" onClick={onClose}>
            <EyeOff className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          {controls.map((control) => (
            <div key={control.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <control.icon className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300 text-sm">{control.label}</span>
              </div>
              <Button
                size="sm"
                variant={control.active ? "default" : "outline"}
                onClick={control.action}
                className="text-xs"
              >
                {control.active ? 'On' : 'Off'}
              </Button>
            </div>
          ))}
          
          <div className="pt-2 border-t border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 text-sm">Font Size</span>
              <select
                value={settings.fontSize}
                onChange={(e) => dispatch({ type: 'SET_FONT_SIZE', payload: e.target.value })}
                className="bg-slate-700 text-white text-xs rounded px-2 py-1"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="xlarge">X-Large</option>
              </select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

export { ScreenReaderAnnouncer, useSpeechSynthesis, useFocusManagement };
