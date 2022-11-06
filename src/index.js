import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserContextProvider } from './components/context/userContext';
import { CartProvider } from 'react-use-cart';
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new QueryClient();
root.render(

  <React.StrictMode>
    <BrowserRouter>
    <UserContextProvider>
    <QueryClientProvider client={client}>
      <CartProvider>
        <App />
      </CartProvider>
    </QueryClientProvider>
    </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
