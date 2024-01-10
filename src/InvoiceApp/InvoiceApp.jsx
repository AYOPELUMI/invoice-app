/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/no-children-prop */
 import {useState, useEffect,useContext} from 'react'

import {SideMenu} from "./SideMenu/SideMenu"
import {ThemeContextWrapper} from "./ThemeContextWrapper"
import {ViewInvoiceCard} from "./viewInvoiceCard/ViewInvoiceCard"
import {NewInvoiceModal} from "./NewInvoiceModal/NewInvoiceModal"
import {HomePage} from "./HomePage/HomePage"
import{SignUp} from "./SignUp/SignUp"
import{LoginPage} from "./LoginPage/LoginPage"
import {RedirectToDashboard} from "./redirectToDashboard.jsx"
import {SessionTimer} from "./assets/SessionTimer/SessionTimer"

import {AuthProvider} from "./assets/Auth"
import apiFetch from '../apiFetch'

import "./fonts.css"
import './styles.scss';
import "./mainStyle.css"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


export function InvoiceApp (props) {
	const [darkMode, setDarkMode] = useState(false)
	const [invoiceArr, setInvoiceArr] = useState([])
	const [editIndex, seteditIndex] = useState(0)
	const [currentLocation, setCurrentLocation] = useState(null)

	useEffect(() =>{
		let user = localStorage.getItem("user")
		console.log({user})
		if (user) {
			console.log(JSON.parse(localStorage.getItem("invoices")))
			// setInvoiceArr(JSON.parse(localStorage.getItem("invoices")))
			apiFetch("/invoices/list",{
					method: 'GET',
		            headers: {
		                'content-type': 'application/json',
		                'authorization' : JSON.parse(localStorage.getItem("user")).token
		            }
			})
			.then((response) => response.json())
			.then((data) => {
					console.log({data})
					console.log("i am here")
						setInvoiceArr(data.data)
						localStorage.setItem("invoices", JSON.stringify(data.data))
			})
			.catch((err) => {
				console.log(err.message);
				console.log(localStorage.getItem("invoices"))
				setInvoiceArr(JSON.parse(localStorage.getItem("invoices")))
			})
		}
		// setAuthUser(user)
	},[])

	function handleLocation (args) {
		setCurrentLocation(args)
	}

	const updateEditIndex =(args) =>{
		// console.log({args})
		let index = invoiceArr.findIndex(obj => {
				// console.log({obj})
				return obj.id == args
			})
		// console.log({index})
		// console.log(invoiceArr[index])
		seteditIndex(index)
	}
	function ResetEditIndex(){
		seteditIndex(0)
		console.log("i pass through here")
	}


	function updateInvoiceArr (args) {
		console.log({args})
		setInvoiceArr(args)
	}
	function updateDarkMode (args) {
		setDarkMode(args)
	}

	function getUserData (args) {
		console.log({args})
		if (args.invoices) {
			setInvoiceArr(args.invoices)
		}
		// setAuthUser(args.token)
		console.log({args})
	}
	console.log({invoiceArr})
	// console.log({editIndex})

	const router = createBrowserRouter([
		{
			path:"/",
			element: <RedirectToDashboard />
		},
	  	{
		    path: "/dashboard",
		    element: 
			    <SessionTimer 
				    children={
				    	<HomePage 
					    	invoiceArr={invoiceArr}
				    		editIndex={editIndex}
				    		updateEditIndex={updateEditIndex}
							updateInvoiceArr={updateInvoiceArr}
							SideMenu={<SideMenu darkMode={darkMode} updateDarkMode={updateDarkMode}/>}
							setLastLocation={handleLocation} 
				    	 />
				    } 
				/>,
		  	children:  [
		       {
			    	path: "newInvoice",
			    	element: 
				    	<SessionTimer 
					    	children={
								<NewInvoiceModal 
									invoiceArr={invoiceArr}
									setLastLocation={handleLocation}
								/>
							}
					    />
			    },
		    ]
		},
	    {
	    	path:"dashboard/invoice/:Id",
	    	element: 
	    	<SessionTimer 
	    		children={ 
		    		<ViewInvoiceCard 		
		    		invoiceData={invoiceArr[editIndex]}
					SideMenu={<SideMenu darkMode={darkMode} updateDarkMode={updateDarkMode}/>}
					ResetEditIndex={ResetEditIndex}
					setLastLocation={handleLocation}
					/>
				}
			/>,
				children: [
				{
					path: "editInvoice/",
					element: 
					<SessionTimer 
						children={
							<NewInvoiceModal 
								invoiceDetail ={invoiceArr[editIndex]}
				    			invoiceArr={invoiceArr}
								setLastLocation={handleLocation}
				    		/>
				    	}
				    />
				},
				]
	    },
	    {
	    	path: "/signup",
	    	element  : <SignUp />
	    },
	    {
	    	path: "/login",
	    	element: <LoginPage  
	    				getUserData={getUserData}
	    				lastLocation={currentLocation}
	    			/>
	    }
	])
  return (
  		<AuthProvider>
    	<ThemeContextWrapper>
	    		<RouterProvider router={router}>
	    		</RouterProvider>
    	</ThemeContextWrapper>
    	</AuthProvider>
  )
}





