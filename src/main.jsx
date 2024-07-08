import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Header from './Header.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode> 
    <BrowserRouter>
      <Header />
      <App />
    </BrowserRouter>
  // </React.StrictMode>,
)
