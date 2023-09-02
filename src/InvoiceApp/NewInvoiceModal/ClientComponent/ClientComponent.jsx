import {useState, useEffect} from 'react';
import{Input} from "../../assets/Input"
import './styles.scss';

export function ClientComponent(props){
const {
	getData,
	invoiceDetail,
	editInvoice
} = props

const [clientName, setClientName] = useState("")
const [clientEmail, setClientEmail] = useState("")
const [clientAddress, setClientAddress] = useState("")
const [clientCity, setClientCity] = useState("")
const [clientPostCode, setClientPostCode] = useState("")
const [clientCountry, setClientCountry] = useState("")
// console.log({invoiceDetail})
useEffect(() =>{
	if (invoiceDetail) {
		// console.log({invoiceDetail})
		setClientEmail(invoiceDetail.clientEmail)
		setClientCountry(invoiceDetail.clientCountry)
		setClientName(invoiceDetail.clientName)
		setClientAddress(invoiceDetail.clientStreetAddress)
		setClientCity(invoiceDetail.clientCity)
		setClientPostCode(invoiceDetail.clientPostCode)
	}
},[editInvoice])
function updateAddress(args){
	setClientAddress(args)
}
function updateClientCity(args){
	setClientCity(args)
}
function updatePostCode (args) {
	setClientPostCode(args)
}
function updateClientCountry (args) {
	setClientCountry(args)
}
function updateClientName (args) {
	setClientName(args)
}
function updateClientEmail (args) {
	setClientEmail(args)
}
useEffect(() =>{
	getData([clientName,clientEmail,clientAddress,clientCity,clientPostCode,clientCountry])
},[clientPostCode,clientCity,clientAddress,clientCountry,clientEmail,clientName])


  return (
  			<label htmlFor="" className="topLabel">
 				<h5>Bill to</h5>
 				 <div className="topLabelFirstDiv">
 					<Input
	 					labelClassName ={"firstChild"}
	 					labelFor={<h4>Client's Name</h4>}
	 					type = {"text"}
	 					placeHolder={"Client's Name"}
	 					updateState={updateClientName}
	 					required={true}
	 					propValue={clientName}
	 				></Input>
	 				<Input
	 					labelClassName ={"firstChild"}
	 					labelFor={<h4>Client's email</h4>}
	 					type = {"text"}
	 					placeHolder={"Client's email"}
	 					updateState={updateClientEmail}
	 					required={true}
	 					propValue={clientEmail}
	 				></Input>
	 				<Input
	 					labelClassName ={"firstChild"}
	 					labelFor={<h4>Street Address</h4>}
	 					type = {"text"}
	 					placeHolder={"Street Address"}
	 					updateState={updateAddress}
	 					required={true}
	 					propValue={clientAddress}
	 				></Input>
 					<div className="topLabelSecondDiv">
	 					<Input
	 					labelClassName ={'splitLabel'}
	 					labelFor={<h4>City</h4>}
	 					type={"text"}
	 					placeHolder={"City"}
	 					updateState={updateClientCity}
	 					required={true}
	 					propValue={clientCity}>
	 					</Input>
	 					<Input
	 					labelClassName ={'splitLabel'}
	 					labelFor={<h4>Post Code</h4>}
	 					type={"text"}
	 					placeHolder={"Post Code"}
	 					updateState={updatePostCode}
	 					required={true}
	 					propValue={clientPostCode}>
	 					</Input>
	 					<Input
	 					labelClassName ={'splitLabel'}
	 					labelFor={<h4>Country</h4>}
	 					type={"text"}
	 					placeHolder={"Country"}
	 					updateState={updateClientCountry}
	 					required={true}
	 					propValue={clientCountry}>
	 					</Input>
 					</div>
 				</div>
 			</label>
   )
}


