import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/cormorant-garamond';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/700.css';
import '@fontsource/lato';
import '@fontsource/lato/700.css';
import '@fontsource/noto-serif-devanagari';
import '@fontsource/noto-serif-devanagari/600.css';
import '@fontsource/noto-serif-devanagari/700.css';
import './styles/global.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
