 import {useState, useEffect} from 'react'
 import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io"
import {HiOutlinePlusCircle} from "react-icons/hi"
import {RiMoonFill} from "react-icons/ri"
import {RiSunFill} from "react-icons/ri"
import {AiFillPlusCircle} from "react-icons/ai"
import {BiSolidChevronLeft} from "react-icons/bi"
import {ThemeContextWrapper} from "./ThemeContextWrapper"
import {ThemeContext, themes} from "./ThemeContext.js"
import {ViewInvoiceCard} from "./viewInvoiceCard/ViewInvoiceCard"
import {NewInvoiceModal} from "./NewInvoiceModal/NewInvoiceModal"
import {Input} from "./assets/Input"
import {HomePage} from "./HomePage/HomePage"
import{SignUp} from "./SignUp/SignUp"
import{LoginPage} from "./LoginPage/LoginPage"
import invoiceObj from "./assets/invoiceData.js"
import {BrowserRouter, Routes, Route, NavLink, Outlet, useNavigate, useLocation} from "react-router-dom"
import './styles.scss';
import "./mainStyle.css"
let acceptUser = false

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


export function InvoiceApp (props) {
	const [darkMode, setDarkMode] = useState(true)
	const [openModal, setOpenModal] = useState(false)
	const [invoiceArr, setInvoiceArr] = useState([])
	const [editIndex, seteditIndex] = useState(0)
	const [displayIndex, setDisplayIndex] = useState("")
	const [editInvoice, setEditInvoice] = useState(false)
	const [showFilter, setShowFilter] = useState(true)
	const [authenticateUser, setAuthenticateUser] = useState(undefined)
	const [filterState, setFilterState] = useState([false,false, false])
	const filterList =["Draft","Pending", "Paid"]


	console.log({authenticateUser})
	useEffect(() =>{
		fetch("https://invoice-api-production-b7bc.up.railway.app/api/v1/invoices/list",{
				method: 'GET',
	            headers: {
	                'content-type': 'application/json',
	                'authorization' : authenticateUser
	            }
		})
		.then((response) => response.json())
		.then((data) => {
				console.log({data})
				console.log("i am here")
				if(authenticateUser){
					setInvoiceArr(data.data)
				}
		})
		.catch((err) => {
			console.log(err.message);
		})
		console.log(localStorage.getItem("activeTime"))
		console.log(localStorage.getItem("lastActivity"))
	},[authenticateUser])

	const handleModal=() =>{
		setOpenModal(!openModal)
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
	function SideMenu (){
		return(
		  	<div className="sideMenu">
		    	<div className="avatarCtnr">
					<ThemeContext.Consumer>
						{({changeTheme}) =>(
							<i onClick={() => {
								updateDarkMode(!darkMode)
								changeTheme(darkMode ? themes.light : themes.dark)
							}}
							>{darkMode ? <RiSunFill className="themeIcon"> </RiSunFill> : <RiMoonFill className="themeIcon"></RiMoonFill>}
						</i>
						)}
					</ThemeContext.Consumer> 
					<div className="avatar">
					</div>
		    	</div>
			</div>
		)
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
	function updateFilterState (args) {
		let filterStateClone = [...filterState]
		filterStateClone[args[0]] = args[1]
		setFilterState(filterStateClone)
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
		setAuthenticateUser(args.token)
		console.log({args})
	}
	console.log({invoiceArr})
	// console.log({editIndex})

	const router = createBrowserRouter([
	  	{
		    path: "/dashboard",
		    element: <HomePage 
		    	invoiceArr={invoiceArr}
	    		editIndex={editIndex}
	    		editInvoice={editInvoice}
	    		displayIndex={displayIndex}
	    		filterState={filterState}
	    		showFilter={showFilter}
	    		darkMode={darkMode}
	    		authenticateUser={authenticateUser}
	    		updateShowFilter={updateShowFilter}
	    		updateEditIndex={updateEditIndex}
	    		updateDisplayIndex={updateDisplayIndex}
				updateEditInvoice={updateEditInvoice}
				updateFilterState={updateFilterState}
				updateDarkMode={updateDarkMode}
				updateInvoiceArr={updateInvoiceArr}
				SideMenu={<SideMenu />}
	    	 />,
		  	children:  [
		       {
			    	path: "newInvoice",
			    	element: <NewInvoiceModal 
			    	invoiceArr={invoiceArr}
			    	authenticateUser={authenticateUser}
			    	getData={updateInvoiceArray} />
			    },
		    ]
		},
	    {
	    	path:"/dashboard/invoice/:Id",
	    	element: <ViewInvoiceCard 		
	    		invoiceData={invoiceArr[editIndex]}
				editIndex={editIndex}
				updateInvoiceData={updateInvoiceData}
				invoiceArr={invoiceArr}
				updateInvoiceArr={updateInvoiceArr}
				updateOpenEditModal={updateOpenModal}
				updateEditIndex={updateEditIndex}
				SideMenu={<SideMenu />}
				ResetEditIndex={ResetEditIndex}
				updateDarkMode={updateDarkMode}
				authenticateUser={authenticateUser} />,
				children: [
				{
					path: "editInvoice/:Id",
					element: <NewInvoiceModal 
						invoiceDetail ={invoiceArr[editIndex]}
		    			updateInvoiceData={updateInvoiceData}
		    			authenticateUser={authenticateUser}
		    			invoiceArr={invoiceArr} />
				},
				]
	    },
	    {
	    	path: "signup",
	    	element  : <SignUp userData = {getUserData} />
	    },
	    {
	    	path: "login",
	    	element: <LoginPage  getUserData={getUserData}/>
	    }
	])
  return (
    	<ThemeContextWrapper>
	    	<RouterProvider router={router}>

	    	</RouterProvider>
    	</ThemeContextWrapper>
  )
}


