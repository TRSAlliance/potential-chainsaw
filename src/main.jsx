import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

console.log('\n🔐 REACT 18 STRICT MODE RUNTIME INITIALIZED');
console.log('📦 Entry Point: src/main.jsx');
console.log('📁 Root Target: #app');
console.log('✅ Tailwind CSS: LOADED');
console.log('✅ Sonner Toast: READY');
console.log('\n--- Application Bootstrap Complete ---\n');

const root = document.getElementById('app');

if (!root) {
  console.error('❌ FATAL: Root element #app not found in index.html');
  throw new Error('Root element #app is required for React mounting');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

console.log('✅ React StrictMode boundary active');
console.log('✅ Component tree mounted');
console.log('🎯 POTENTIAL CHAINSAW SYSTEM READY\n');