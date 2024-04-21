import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <div style={{paddingTop: '20px', paddingLeft: '40px', paddingRight: '40px', paddingBottom: '20px'}}>
      <App />
    </div>
  </React.StrictMode>
);

