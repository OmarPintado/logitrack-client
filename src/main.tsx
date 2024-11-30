import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import LogiTrackApp from './LogiTrackApp.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <LogiTrackApp />
    </StrictMode>,
);
