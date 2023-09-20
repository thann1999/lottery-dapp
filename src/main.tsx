import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom';
import { Flip, ToastContainer } from 'react-toastify';

import App from '@root/App';
import reportWebVitals from '@root/reportWebVitals';

import 'react-toastify/dist/ReactToastify.css';
import '@styles/index.scss';
import 'antd/dist/reset.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 0,
      cacheTime: 0,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer theme="colored" hideProgressBar transition={Flip} limit={5} />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
