import React from 'react'
import ReactDOM from 'react-dom/client'
import{InvoiceApp} from "./InvoiceApp/InvoiceApp.jsx"
import {AuthProvider} from "./InvoiceApp/assets/Auth"
import App from './App.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
	<InvoiceApp />
  </React.StrictMode>,
)
