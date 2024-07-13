import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import Header from './Header.jsx'
import ScrollButton from './components/ScrollButton.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode> 
    <BrowserRouter>
      <Header />
      <App />
      <ScrollButton />
    </BrowserRouter>
  // </React.StrictMode>,
)