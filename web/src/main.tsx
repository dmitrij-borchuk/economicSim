import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initAuthListener } from './libs/store/authSlice.ts';
import { Providers } from './Providers.tsx';
import { store } from './libs/store/index.ts';
import { App } from './App.tsx';
import './index.css';

// Initialize the Firebase Auth listener once globally
store.dispatch(initAuthListener());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);
