import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from './Context/CartContext.jsx';
import { LoadingProvider } from './Context/LoadingContext.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <LoadingProvider>   
     <BrowserRouter>
    <App />
    </BrowserRouter>
    </LoadingProvider>
    </CartProvider>    
  </React.StrictMode>,
)
