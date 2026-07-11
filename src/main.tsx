import { createRoot } from 'react-dom/client';

// Import polyfills first
import './lib/polyfills.ts';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import App from './App.tsx';
import './index.css';

// Fonts: Inter for body, Cormorant Garamond for display headings
import '@fontsource-variable/inter';
import '@fontsource-variable/cormorant-garamond';

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
