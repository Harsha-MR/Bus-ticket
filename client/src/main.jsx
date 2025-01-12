import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Ensure this file is correctly imported
import App from './App';
import { BrowserRouter } from 'react-router-dom'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// src/index.jsx
// import React from 'react';
// import ReactDOM from 'react-dom';
// Import BrowserRouter
// import './index.css';
// import App from './App';

// ReactDOM.render(
//   <BrowserRouter> {/* Wrap your app with BrowserRouter */}
//     <App />
//   </BrowserRouter>,
//   document.getElementById('root')
// );
