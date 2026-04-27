import React from 'react';
import ReactDOM from 'react-dom';
import { Analytics } from '@vercel/analytics/react';
import './index.css';
import App from './App';

ReactDOM.render(
  <>
    <App />
    <Analytics />
  </>,
  document.getElementById('root')
);
