 import {useState, useEffect,useContext} from 'react'
import {RiMoonFill} from "react-icons/ri"
import {RiSunFill} from "react-icons/ri"
import {SideMenu} from "./SideMenu/SideMenu"
import {ThemeContextWrapper} from "./ThemeContextWrapper"
import {ThemeContext, themes} from "./ThemeContext.js"
import {ViewInvoiceCard} from "./viewInvoiceCard/ViewInvoiceCard"
import {NewInvoiceModal} from "./NewInvoiceModal/NewInvoiceModal"
import {HomePage} from "./HomePage/HomePage"
import{SignUp} from "./SignUp/SignUp"
import{LoginPage} from "./LoginPage/LoginPage"
import {RedirectToDashboard} from "./redirectToDashboard.jsx"
import {SessionTimer} from "./assets/SessionTimer/SessionTimer"
import {BrowserRouter, Routes, Route, NavLink, Outlet, useNavigate, useLocation,redirect} from "react-router-dom"
import {Auth} from "./assets/Auth" 
import {AuthProvider} from "./assets/Auth"
import {Test} from "./Test"
import './styles.scss';
import "./mainStyle.css"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


export function InvoiceApp (props) {
	const [darkMode, setDarkMode] = useState(false)
	const [openModal, setOpenModal] = useState(false)
	const [invoiceArr, setInvoiceArr] = useState([])
	const [editIndex, seteditIndex] = useState(0)
	const [displayIndex, setDisplayIndex] = useState("")
	const [editInvoice, setEditInvoice] = useState(false)
	const [showFilter, setShowFilter] = useState(true)
	const [authenticateUser, setAuthenticateUser] = useState(undefined)
	const [filterState, setFilterState] = useState([false,false, false])
	const [currentLocation, setCurrentLocation] = useState(null)

	useEffect(() =>{
		let user = localStorage.getItem("user")
		console.log({user})
		if (user) {
			console.log(JSON.parse(localStorage.getItem("invoices")))
			// setInvoiceArr(JSON.parse(localStorage.getItem("invoices")))
			fetch("https://invoice-api-production-b7bc.up.railway.app/api/v1/invoices/list",{
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
	const handleShowFilter = (e) =>{
		setShowFilter(true)	
	}
	function updateOpenModal(args){
		setOpenModal(!openModal)
	}
	function updateInvoiceArray (args) {
		// console.log({args})
		let invoiceArrClone = [...invoiceArr]
		invoiceArrClone.push(args)
		setInvoiceArr(invoiceArrClone)
		// ArrayInvoice.push(args)
	}
	function updateShowFilter (args) {
		setShowFilter(args)
	}
	// console.log({editIndex})
	// console.log({editInvoice})
	// console.log({displayIndex})

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
	// console.log({editIndex})
	const handleGoBack =() =>{
		seteditIndex(undefined)
		setEditInvoice(!editInvoice)
	}
	function updateInvoiceData (args){
		let invoiceArrClone = [...invoiceArr]
		console.log({args})
		console.log({editIndex})
			let index = invoiceArrClone.findIndex(obj => {
				console.log({obj})
				return obj.Id == args.Id
			})
			console.log({index})
			console.log(invoiceArr[index])
			invoiceArrClone.splice(index,1,args)
			setInvoiceArr(invoiceArrClone)
	}
	function updateInvoiceArr (args) {
		console.log({args})
		setInvoiceArr(args)
	}
	function updateDisplayIndex (args) {
		setDisplayIndex(args)
	}
	function updateEditInvoice (args) {
		setEditInvoice(args)
	}
	function updateFilterState (args) {
		setFilterState(args)
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
				    		editInvoice={editInvoice}
				    		displayIndex={displayIndex}
				    		filterState={filterState}
				    		showFilter={showFilter}
				    		authenticateUser={authenticateUser}
				    		updateShowFilter={updateShowFilter}
				    		updateEditIndex={updateEditIndex}
				    		updateDisplayIndex={updateDisplayIndex}
							updateEditInvoice={updateEditInvoice}
							updateFilterState={updateFilterState}
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
					    	children={<NewInvoiceModal 
					    	invoiceArr={invoiceArr}
					    	authenticateUser={authenticateUser}
					    	getData={updateInvoiceArray}
							setLastLocation={handleLocation}
					    	/>}
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
					editIndex={editIndex}
					updateInvoiceData={updateInvoiceData}
					invoiceArr={invoiceArr}
					updateInvoiceArr={updateInvoiceArr}
					updateOpenEditModal={updateOpenModal}
					updateEditIndex={updateEditIndex}
					darkMode={darkMode}
					updateDarkMode={updateDarkMode}
					SideMenu={<SideMenu darkMode={darkMode} updateDarkMode={updateDarkMode}/>}
					ResetEditIndex={ResetEditIndex}
					authenticateUser={authenticateUser}
					setLastLocation={handleLocation}
					/>
				}
			/>,
				children: [
				{
					path: "editInvoice/:Id",
					element: 
					<SessionTimer 
						children={
							<NewInvoiceModal 
								invoiceDetail ={invoiceArr[editIndex]}
				    			updateInvoiceData={updateInvoiceData}
				    			authenticateUser={authenticateUser}
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
	    },{
	    	path: "/test",
	    	element:<Test></Test>
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


