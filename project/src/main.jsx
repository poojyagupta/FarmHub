import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Import our main App component
import App from './App';
// Import our internationalization configuration
import './i18n/i18n';
// Import our global styles
import './index.css';

// Create a root element and render our app
createRoot(document.getElementById('root')).render(
  // StrictMode helps identify potential problems
  <StrictMode>
    <App />
  </StrictMode>
);