import React from 'react';

import ReactDOM from 'react-dom/client';
import { Flip, ToastContainer } from 'react-toastify';

import { MetaMaskContextProvider } from '@hooks';
import App from '@root/App';
import reportWebVitals from '@root/reportWebVitals';

import 'react-toastify/dist/ReactToastify.css';
import '@styles/index.scss';
import 'antd/dist/reset.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <MetaMaskContextProvider>
      <App />
      <ToastContainer theme="colored" hideProgressBar transition={Flip} limit={5} />
    </MetaMaskContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
