import {useEffect, useState} from 'react';
import {BiSolidChevronRight} from "react-icons/bi"
import {VscCircleLargeFilled} from "react-icons/vsc"
import{NavLink} from "react-router-dom"
import { numberFormat } from '../assets/numberFormat';
import  dayjs  from 'dayjs';
import './styles.scss';
import "./Reponsive.scss"


export const DisplayInvoiceData = props => {
	const {
		invoiceData,
		index,
		updateEditIndex,
		editInvoice,
		mainEditIndex,
		updateInvoiceData,
		invoiceArr,
		updateInvoiceArr,
		updateOpenEditModal
	} = props
	

	const [totalAmount, setTotalAmount] = useState(0)
	const [editIndex, setEditIndex] = useState("")
	
	useEffect(() =>{
		let itemList = invoiceData.itemList 
		let total = 0   
		for (var i = 0; i < itemList.length; i++) {
			total += Number(itemList[i].quantity)* Number(itemList[i].price)
		}
		setTotalAmount(total.toFixed(2))
	},[invoiceArr])
	
	useEffect(() => {
		setEditIndex(mainEditIndex)
	},[mainEditIndex])

	const formattedDate = (args) =>{
		let newDate = dayjs(args).format("YYYY-MM-DD")
		return newDate
	}
	const handleEdit = () =>{
		setEditIndex(props.index)
		updateEditIndex(props.index)
		localStorage.setItem("lastIndex", props.index)
	}


  return (	
	  	<NavLink to={`/dashboard/invoice/${invoiceData.id}`} key={invoiceData.id}>
			<div className="tableRow" index={index} onClick={handleEdit}>
					<span>
						<h4 className="invoiceId" index={index}>
							#{invoiceData.id.slice(0,6)}
						</h4>
						<h5 className="invoiceDueDate" index={index}>
							Due {formattedDate(invoiceData.invoiceDate)}
						</h5>
					</span>
					<p className="invoiceClient" index={index}>
						{invoiceData.clientName}
					</p>
					<span>
						<p className = "invoicePrice" index={index}>
							£{numberFormat(totalAmount)}
						</p>
						<span className={invoiceData.status =="pending" ? "invoiceStatusPending" : invoiceData.status == "paid" ? "invoiceStatusPaid" : "invoiceStatusDraft"} index={index}>
							<VscCircleLargeFilled />
							<p>{invoiceData.status}</p>
						</span>
					</span>
					<BiSolidChevronRight className="icon" index={index} />
			</div>
		</NavLink>
  )
}
