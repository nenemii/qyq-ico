import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css';
import 'github-markdown-css/github-markdown-dark.css'; 
import 'highlight.js/styles/atom-one-dark-reasonable.css'; 
import './index.css'; 
import {  HashRouter } from 'react-router-dom';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
