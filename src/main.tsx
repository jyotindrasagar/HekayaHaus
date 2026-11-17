import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/instrument-serif/latin-400.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
import '@fontsource-variable/manrope/wght.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/home.css';
import './styles/pages.css';
import { App } from './App';

document.documentElement.classList.add('js');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

// Vercel toolbar: only on preview deployments / local dev, loaded lazily so it never ships to visitors' critical path.
if (import.meta.env.DEV || location.hostname.endsWith('.vercel.app')) {
  import('@vercel/toolbar').then((m) => m.mountVercelToolbar()).catch(() => {});
}
