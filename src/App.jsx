import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import{InvoiceApp} from "./InvoiceApp/InvoiceApp.jsx"
import{SignUp} from "./InvoiceApp/SignUp/SignUp"
import{LoginPage} from "./InvoiceApp/LoginPage/LoginPage"
import {NewInvoiceModal} from "./InvoiceApp/NewInvoiceModal/NewInvoiceModal"
import {DisplayInvoiceData} from "./InvoiceApp/DisplayInvoiceData/DisplayInvoiceData"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
    	<Route path="*" element={<InvoiceApp />}>
    	</Route>
    	<Route exact path="/newInvoice" element={
				    			<NewInvoiceModal
				    		></NewInvoiceModal>
				    		}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
