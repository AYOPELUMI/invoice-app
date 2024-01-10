/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/no-children-prop */
/* eslint-disable no-undef */
import {useState, useEffect, useContext} from 'react';
import {DeleteModal} from "./DeleteModal/DeleteModal"
import {VscCircleLargeFilled} from "react-icons/vsc"
import {BiSolidChevronLeft} from "react-icons/bi"
import {useNavigate, useLocation, Outlet, NavLink} from "react-router-dom"
import { Button } from '../assets/Button/Button.jsx';
import {Auth} from "../assets/Auth"
import {numberFormat} from "../assets/numberFormat.js"
import apiFetch from '../../apiFetch';
import './styles.scss';
import "./Reponsive.scss"
import  dayjs  from 'dayjs';


export const ViewInvoiceCard = props => {
	const{
		invoiceData,
		ResetEditIndex,
		SideMenu,
		setLastLocation
	} = props
	console.log({props})


	const[invoiceDetail, setInvoiceDetail] = useState(invoiceData)
	const [openDeleteModal, setOpenDeleteModal] = useState(false)
	const [totalAmount, setTotalAmount] = useState(0)
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()
	const location = useLocation()
	const {user} = useContext(Auth)
	
	console.log({user})

	let localUser = JSON.parse(localStorage.getItem("user"))
	let invoiceId =  localStorage.getItem("lastIndex") ? localStorage.getItem("lastIndex") : invoiceData.id 
	
	useEffect(() => {
			setLastLocation(location.pathname)
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
		        apiFetch("/invoices/"+invoiceId,{
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
		console.log("location path is -"+ location.pathname)
		setLastLocation(location.pathname)
	},[location])
	useEffect(() =>{
		if (invoiceDetail) 
		{	let itemList = invoiceDetail.itemList 
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
				<span>
					<h4>{numberFormat(itemList[i].quantity)}</h4>
					<p className='reponsiveDisplay'>x</p>
					<h4>£{numberFormat(itemList[i].price.toFixed(2))}</h4>
				</span>
   				<h3 className="gridLastChild"> £{numberFormat((Number(itemList[i].quantity)*Number(itemList[i].price.toFixed(2))).toFixed(2))}</h3>
   			</div>
		)
		itemListDisplay.push(el)
	}
 }

	const updateInvoiceStatusPd =() =>{
		console.log("i pass here")
		console.log({localUser})
		console.log({invoiceId})
		console.log(user.token)
	
	const fetchInvoiceDetails =() =>{
		setIsLoading(true)
        apiFetch("/invoices/"+invoiceId+"/mark-as-paid",{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization' : localUser.token ? localUser.token : user.token
            }
	        })
	        .then(() => {
				let invoiceDetailClone = {...invoiceDetail}

					invoiceDetailClone.status = "paid"

					setInvoiceDetail(invoiceDetailClone)
					setIsLoading(false)
		        })
		        .catch((err) => {
		           console.log(err.message);
				   setIsLoading(false)
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
	function updateDeleteModal (args) {
		setOpenDeleteModal(args)
	}

	const formattedDate = (args) =>{
		let newDate = dayjs(args).format("YYYY-MM-DD")
		return newDate
	}

	return (
		<div className="invoiceCardModal" >
		    {SideMenu}
				{ invoiceDetail ? 
					<>
						<div className="invoiceCardCtnr">
							<div className="goBackDiv">
								<NavLink to="/dashboard">
									<BiSolidChevronLeft className="goBackIcon" /> Go Back
								</NavLink>
							</div>
							<div className="statusBtnCtnr">
								<div> 
									<p>Status :</p>
									<p className={invoiceDetail.status == "pending" ? "pending" :invoiceDetail.status == "paid" ? "paid" : "draft"}><VscCircleLargeFilled /> {invoiceDetail.status}</p>
								</div>
								<div>
									<NavLink to={`editInvoice`}>
										<Button className="editBtn" btnDisabled={invoiceDetail.status == "paid"} children="Edit"/>
									</NavLink>
									<Button className="delBtn" onClick={handleDeleteInvoice}children="Delete" />
									<Button className="paidBtn" disabled={isLoading} btnDisabled={invoiceDetail.status == "paid"} onClick={updateInvoiceStatusPd} children="Mark as Paid"/>
								</div>
							</div>
							<div className="mainInvoiceCard">
								<div className="cardBiller">
									<div className="paymentDescription">
										<h3>#{invoiceDetail.id.slice(0,6)}</h3>
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
									<div className='invoiceDateCtnr'>
										
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
										<h2>£{numberFormat(totalAmount)}</h2>
									</div>
								</div>
							</div>
							<div className='reponsiveBtnCtnr'>
									<NavLink to={`editInvoice`}>
										<Button className="editBtn" btnDisabled={invoiceDetail.status == "paid"} children="Edit"/>
									</NavLink>
									<Button className="delBtn" onClick={handleDeleteInvoice}children="Delete" />
									<Button className="paidBtn" disabled={isLoading} btnDisabled={invoiceDetail.status == "paid"} onClick={updateInvoiceStatusPd} children="Mark as Paid"/>
							</div>
						</div>
						<Outlet />
							<>
								{openDeleteModal ? 
								<DeleteModal 
									invoiceData={invoiceDetail}
									updateDeleteModal={updateDeleteModal}
									ResetEditIndex={ResetEditIndex}
									authenticateUser={user.token} 
								/> : null} 
							</>
					</>
				: null}

		</div>
	)
}

