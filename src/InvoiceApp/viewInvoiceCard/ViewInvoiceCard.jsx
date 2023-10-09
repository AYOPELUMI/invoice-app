import {useState, useEffect, useContext} from 'react';
import{NewInvoiceModal} from "../NewInvoiceModal/NewInvoiceModal"
import {DeleteModal} from "./DeleteModal/DeleteModal"
import {VscCircleLargeFilled} from "react-icons/vsc"
import {NavLink} from "react-router-dom"
import {BiSolidChevronLeft} from "react-icons/bi"
import {useParams, Outlet} from "react-router-dom"
import {ThemeContextWrapper} from "../ThemeContextWrapper"
import {ThemeContext, themes} from "../ThemeContext.js"
import {useNavigate, useLocation} from "react-router-dom"
import {Auth} from "../assets/Auth"

import './styles.scss';


export const ViewInvoiceCard = props => {
	const{
		invoiceData,
		invoiceArr,
		updateInvoiceData,
		index,
		ResetEditIndex,
		updateInvoiceArr,
		updateOpenEditModal,
		SideMenu,
		updateDarkMode,
		updateEditIndex,
		authenticateUser,
		editIndex,
		setLastLocation
	} = props
	console.log({props})
	const {params} = useParams()

	const[invoiceDetail, setInvoiceDetail] = useState(invoiceData)
	const [openDeleteModal, setOpenDeleteModal] = useState(false)
	const [totalAmount, setTotalAmount] = useState(0)
	const navigate = useNavigate()
	const location = useLocation()
	const {user} = useContext(Auth)
	
	console.log({user})
	console.log(localStorage.getItem("invoices"))
	
	let localUser = JSON.parse(localStorage.getItem("user"))
	let invoiceId =  localStorage.getItem("lastIndex") ? localStorage.getItem("lastIndex") : invoiceData.id 
	
	useEffect(() => {
		console.log({authenticateUser})
		console.log({localUser})
		if (!user && !localUser) {
			console.log("it is true")
			navigate("/login")
			setLastLocation(location.pathname)
		}
		else{
			console.log({invoiceId})
			let array = JSON.parse(localStorage.getItem("invoices"))
			console.log({array})
			for (var i = 0; i < array.length; i++) {
				if (invoiceId == array[i].id) {
					setInvoiceDetail(array[i])
					break;
				}
			}
			const fetchInvoiceDetails =() =>{
		        fetch("https://invoice-api-production-b7bc.up.railway.app/api/v1/invoices/"+invoiceId,{
		            method: 'GET',
		            headers: {
		                'content-type': 'application/json',
		                'authorization' : localUser.token ? localUser.token : user.token
		            }
		        })
		        .then((response) => response.json())
		        .then((data) => {
		            console.log({data})
		            setInvoiceDetail(data.invoice)
		        })
		        .catch((err) => {
		           console.log(err.message);
		        })
			    }

		    fetchInvoiceDetails()
			}
		console.log("location path is -"+ location.pathname)
		setLastLocation(location.pathname)
	},[location])
	useEffect(() =>{
		if (invoiceDetail) {	let itemList = invoiceDetail.itemList 
				let total = 0   
			
				for (var i = 0; i < itemList.length; i++) {
					total += Number(itemList[i].quantity)*Number(itemList[i].price)
				}
				setTotalAmount(total.toFixed(2))}
	},[invoiceDetail])
 
	let itemListDisplay = []
 if (invoiceDetail) {
	let itemList = invoiceDetail.itemList

	for (var i = 0; i < itemList.length; i++) {
		let el = (
			<div className="itemDiv" key={i} index={i}>
   				<h3>{itemList[i].name}</h3>
   				<h4>{itemList[i].quantity}</h4>
   				<h4>£{itemList[i].price.toFixed(2)}</h4>
   				<h3> £{(Number(itemList[i].quantity)*Number(itemList[i].price.toFixed(2))).toFixed(2)}</h3>
   			</div>
		)
		itemListDisplay.push(el)
	}
 	// statement
 }

	const updateInvoiceStatusPd =() =>{
		console.log("i pass here")
		console.log({localUser})
		console.log({invoiceId})
		console.log(user.token)
					const fetchInvoiceDetails =() =>{
		        fetch("https://invoice-api-production-b7bc.up.railway.app/api/v1/invoices/"+invoiceId+"/mark-as-paid",{
		            method: 'POST',
		            headers: {
		                'content-type': 'application/json',
		                'authorization' : localUser.token ? localUser.token : user.token
		            }
		        })
		        .then((response) => response.json())
		        .then((data) => {
		            console.log({data})
		            setInvoiceDetail(data.invoice)
		        })
		        .catch((err) => {
		           console.log(err.message);
		        })
			    }

		    fetchInvoiceDetails()
			
		// let invoiceDataClone = {...invoiceDetail}
		// invoiceDataClone.status = "Paid"
		// console.log({invoiceDataClone})
		// updateInvoiceData(invoiceDataClone)
	}

	const handleDeleteInvoice =() =>{
		setOpenDeleteModal(true)
	}
	function updateOpenVModal(args){
		updateEditIndex(invoiceData.id)
	}
	function updateDeleteModal (args) {
		setOpenDeleteModal(args)
	}

	const formattedDate = (args) =>{
		let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug","Sept","Oct", "Nov", "Dec"]
		let newDate = new Date(args)
		let yr = newDate.getFullYear()
		let month = months[newDate.getMonth()]
		let day = newDate.getDate()
		let ymd = [yr, month, day]
		return ymd.join(" ")
	}

	return (
		<div className="invoiceCardModal" >
		    {SideMenu}
				{ invoiceDetail ? <>
					<div className="goBackDiv">
									<NavLink to="/dashboard">
										<BiSolidChevronLeft className="goBackIcon" /> Go Back
									</NavLink>
					</div>
						    	<div className="invoiceCardCtnr">
							   		<div className="statusBtnCtnr">
							   			<div> 
								   			<p>Status :</p>
								   			<p className={invoiceDetail.status == "pending" ? "pending" :invoiceDetail.status == "paid" ? "paid" : "draft"}><VscCircleLargeFilled /> {invoiceDetail.status}</p>
							   			</div>
							   			<div>
							   				<NavLink to={`editInvoice/${invoiceDetail.id}`}>
								   				<button className="editBtn" disabled={invoiceDetail.status == "paid"} onClick={updateOpenVModal}>Edit</button>
								   			</NavLink>
								   			<button className="delBtn" onClick={handleDeleteInvoice}>Delete</button>
								   			<button className="paidBtn" disabled={invoiceDetail.status == "paid"} onClick={updateInvoiceStatusPd}>Mark as Paid</button>
							   			</div>
							   		</div>
							   		<div className="mainInvoiceCard">
							   			<div className="cardBiller">
									   		<div className="paymentDescription">
									   			<h3>{invoiceDetail.id.slice(0,6)}</h3>
									   			<h4>{invoiceDetail.projectDescription}</h4>
									   		</div>
									   		<div className="billerAddress">
									   			<h4>{invoiceDetail.billFromStreetAddress}</h4>
									   			<h4>{invoiceDetail.billFromCity}</h4>
									   			<h4>{invoiceDetail.billFromPostCode}</h4>
									   			<h4>{invoiceDetail.country}</h4>
									   		</div>
							   			</div>
								   		<div className="cardClient">
								   			<div>
									   			<div className="invoiceDate">
									   				<h4>Invoice Date</h4>
									   				<h3>{formattedDate(invoiceDetail.createdAt)}</h3>
									   			</div>
									   			<div className="invoiceDate">
									   				<h4>Payment Due</h4>
									   				<h3>{formattedDate(invoiceDetail.invoiceDate)}</h3>
									   			</div>
								   			</div>
								   			<div className="clientAdd">
								   				<h4>Bill To</h4>
								   				<h3>{invoiceDetail.clientName}</h3>
								   				<p>{invoiceDetail.clientAddress}</p>
									   			<p>{invoiceDetail.clientCity}</p>
									   			<p>{invoiceDetail.clientPostCode}</p>
									   			<p>{invoiceDetail.clientCountry}</p>
								   			</div>
								   			<div className="clientEmail">
								   				<h4>Sent To</h4>
								   				<h3>{invoiceDetail.clientEmail}</h3>
								   			</div>
								   		</div>
								   		<div className="itemDetailCtnr">
								   			<div>
								   				<h4>Item Name</h4>
								   				<h4>QTY</h4>
								   				<h4>Price</h4>
								   				<h4>Total</h4>
								   			</div>
								   			{itemListDisplay}
									   		<div className="totalDiv">
									   			<h5>Amount Due</h5>
									   			<h2>£{totalAmount}</h2>
									   		</div>
								   		</div>
							   		</div>
						    	</div>
						    	<Outlet />
						   	    	<div>
							   	    	{openDeleteModal ? 
							    		<DeleteModal 
							    			invoiceData={invoiceDetail} 
							    			invoiceArr={invoiceArr} 
							    			updateInvoiceArr={updateInvoiceArr}
							    			updateDeleteModal={updateDeleteModal}
							    			index={index}
							    			ResetEditIndex={ResetEditIndex}
							    			authenticateUser={authenticateUser} 
							    		/> : null} 
						   	    	</div>
						   	    	</>
						   	    	 : null}

		</div>
	)
}

