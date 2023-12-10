import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SpeedInsights } from "@vercel/speed-insights/next"

document.title = 'X-Ticket';

ReactDOM.render(
  <React.StrictMode>
    <SpeedInsights />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);