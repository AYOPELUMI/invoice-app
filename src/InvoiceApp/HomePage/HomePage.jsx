 import {useState, useEffect, useContext} from 'react'
 import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io"
import {AiFillPlusCircle} from "react-icons/ai"
import {DisplayInvoiceData} from "../DisplayInvoiceData/DisplayInvoiceData"
import { Outlet } from "react-router-dom";
import {Input} from "../assets/Input"
import invoiceObj from "../assets/InvoiceData.js"
import {Auth} from "../assets/Auth"
import {BrowserRouter, Routes, Route, NavLink, useNavigate,useLocation} from "react-router-dom"
import './styles.scss';
import "../mainStyle.css"

 export const HomePage = props => {
 	const{
 		invoiceArr,
 		editIndex,
 		editInvoice,
 		displayIndex,
 		filterState,
 		showFilter,
 		darkMode,
 		updateShowFilter,
 		updateEditIndex,
 		updateDisplayIndex,
 		updateEditInvoice,
 		updateFilterState,
 		updateDarkMode,
 		SideMenu,
 		updateInvoiceArr,
 		setLastLocation,
 		authenticateUser
 	} =props

	const filterList =["Draft","Pending", "Paid"]
	const navigate = useNavigate()
	const location = useLocation()
    const {user} = useContext(Auth)

	console.log({user})

	useEffect(() =>{
			console.log({user})
			let localUser = localStorage.getItem("user")
		if (location.pathname=="/dashboard") {
			if (user == null & localUser == null) {
				navigate("/login")
			}
			else{
				console.log(localStorage.getItem("user"))
				fetch("https://invoice-api-production-b7bc.up.railway.app/api/v1/invoices/list",{
						method: 'GET',
			            headers: {
			                'content-type': 'application/json',
			                'authorization' : JSON.parse(localStorage.getItem("user")).token ? JSON.parse(localStorage.getItem("user")).token : user.token
			            }
				})
				.then((response) => response.json())
				.then((data) => {
						console.log({data})
						console.log("i am here")
						if(user){
							updateInvoiceArr(data.data)
							localStorage.setItem("invoices", JSON.stringify(data.data))
						}
				})
				.catch((err) => {
					console.log(err.message);
				})

			}
		}
		setLastLocation(location.pathname)
	},[location])
	const handleShowFilter = (e) =>{
		updateShowFilter(true)	
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
	console.log({editIndex})
	console.log({editInvoice})
	console.log({displayIndex})
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
				return obj.Id == editIndex
			})
			console.log({index})
			invoiceArrClone.splice(index,1,args)
			setInvoiceArr(invoiceArrClone)
	}
	// function updateInvoiceArr (args) {
	// 	setInvoiceArr(args)
	// 	handleGoBack()
	// }
	function setFilterState (args) {
		let filterStateClone = [...filterState]

			// console.log({args})
					filterStateClone[args[0]] = args[1]
		
		// console.log({filterStateClone})
		updateFilterState(filterStateClone)
	}
	const setEditIndex =(args) =>{
		updateEditIndex(args)
			// 		let index = displayArr.findIndex(obj => {
			// 	console.log({obj})
			// 	return obj.props.index == args
			// })
			// 		console.log({index})
		updateEditInvoice(true)
		// updateDisplayIndex(index)
	}
	console.log({invoiceArr})

	let displayArr =[]
	for (var i = invoiceArr.length - 1; i >= 0; i--) {
		let el = (
				<DisplayInvoiceData 
					invoiceData={invoiceArr[i]}
					key={invoiceArr[i].id}
					index={invoiceArr[i].id}
					updateEditIndex={setEditIndex}
					editInvoice={editInvoice}
					mainEditIndex={editIndex}
					updateInvoiceData={updateInvoiceData}
					invoiceArr={invoiceArr}
					updateOpenEditModal={updateOpenModal}/>
			)
		displayArr.push(el)
	}

		if (filterState[0] == true) {
			console.log("in the first statement")
			// console.log({displayArr})
			const compareString = (a,b) => a > b ? 1 : a < b ? -1 : 0;
			
			displayArr = displayArr.sort(function(a,b){
			
				let x = a.props.invoiceData.status.startsWith("d");
				let y = b.props.invoiceData.status.startsWith("d");

				if (x) {
					// console.log({x})
					return y ? compareString(x,y) : -1
				}
				if (y) {
					return x ? -compareString(x,y) : 1
				}
					return compareString(x,y);
				})

			// console.log({displayArr})		
		}
		if (filterState[1] == true) {
			// console.log({displayArr})
			displayArr = displayArr.sort(function(a,b){
				console.log({a})
					let x = a.props.invoiceData.status.toUpperCase();
					let y = b.props.invoiceData.status.toUpperCase();
					if ( x > y) {return -1;}
					if (x < y) {return 1;}
					return 0;
				})

			// console.log({displayArr})
		}
		if (filterState[2] == true)  {
			// console.log({displayArr})
			const compareString = (a,b) => a > b ? 1 : a < b ? -1 : 0;
			
			displayArr = displayArr.sort(function(a,b){
			
				let x = a.props.invoiceData.status.startsWith("pa");
				let y = b.props.invoiceData.status.startsWith("pa");

				if (x) {
					// console.log({x})
					return y ? compareString(x,y) : -1
				}
				if (y) {
					return x ? -compareString(x,y) : 1
				}
					return compareString(x,y);
				})

			// console.log({displayArr})
		}
	useEffect(() =>{
		updateShowFilter(false)
	},[filterState])

	

	let filterArray = []
	for (var i = 0; i < filterList.length; i++) {
		let el = (

					<Input type="checkbox"
					index={i}
					key ={i}
					checkedValueFunction={setFilterState}
					propValue={filterState[i]}
					span={filterList[i]}/>
		)
		filterArray.push(el)
	}
	
 	return (
	    	
	    		<div className="invoiceMainContainer"> 
					{SideMenu}
			    	<div className="landingPage">
						<header className="invoiceAppHeader">
			    		  	<div className="pageTitle">
			    		 		<h2>Invoices</h2>
			    		 		{invoiceArr.length ? <p>There are {invoiceArr.length} total invoices</p> : <p>no invoices</p>}
			    		 	</div>
			    		 	<div className="btnHeaderCtnr">
				    			<button className="filterBtn" onClick={handleShowFilter}>
				    		  		filter by 

				    		  		{showFilter ? <IoIosArrowUp  /> : <IoIosArrowDown />}
				    		  		{showFilter ? <ul>
				    		  			{filterArray}
				    		  			</ul>: null
				    		  			}
				    		  	</button>
				    		  	<NavLink to="newInvoice">
				    		  	<button className="addNewInvoiceBtn">
					    			<AiFillPlusCircle className="addNewInvoiceIcon"/>
					    		  	<p>New Invoice</p>
				    		  	</button>
				    		  	</NavLink>
			    		  	</div>
						</header>
				    	{
				    		invoiceArr ?
				    		<div className="invoiceTableContainer">
								{displayArr}
				    		</div>
				    		 : <div>Oops </div>
				    	}
			    	</div>
	    			<Outlet />
	    		</div>
  )
}
