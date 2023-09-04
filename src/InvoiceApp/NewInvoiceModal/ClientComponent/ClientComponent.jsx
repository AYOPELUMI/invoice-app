import {useState, useEffect} from 'react';
import{Input} from "../../assets/Input"
import './styles.scss';

export function ClientComponent(props){
const {
	getClientNameData,
	getClientEmailData,
	getClientStreetAddressData,
	getClientCityData,
	getClientPostCodeData,
	getClientCountryData,
	invoiceDetail,
	editInvoice
} = props

  return (
  			<label htmlFor="" className="topLabel">
 				<h5>Bill to</h5>
 				 <div className="topLabelFirstDiv">
 					<Input
	 					labelClassName ={"firstChild"}
	 					labelFor={<h4>Client's Name</h4>}
	 					type = {"text"}
	 					placeHolder={"Client's Name"}
	 					updateState={getClientNameData}
	 					required={true}
	 					propValue={invoiceDetail.clientName}
	 				></Input>
	 				<Input
	 					labelClassName ={"firstChild"}
	 					labelFor={<h4>Client's email</h4>}
	 					type = {"text"}
	 					placeHolder={"Client's email"}
	 					updateState={getClientEmailData}
	 					required={true}
	 					propValue={invoiceDetail.clientEmail}
	 				></Input>
	 				<Input
	 					labelClassName ={"firstChild"}
	 					labelFor={<h4>Street Address</h4>}
	 					type = {"text"}
	 					placeHolder={"Street Address"}
	 					updateState={getClientStreetAddressData}
	 					required={true}
	 					propValue={invoiceDetail.clientStreetAddress}
	 				></Input>
 					<div className="topLabelSecondDiv">
	 					<Input
	 					labelClassName ={'splitLabel'}
	 					labelFor={<h4>City</h4>}
	 					type={"text"}
	 					placeHolder={"City"}
	 					updateState={getClientCityData}
	 					required={true}
	 					propValue={invoiceDetail.clientCity}>
	 					</Input>
	 					<Input
	 					labelClassName ={'splitLabel'}
	 					labelFor={<h4>Post Code</h4>}
	 					type={"text"}
	 					placeHolder={"Post Code"}
	 					updateState={getClientPostCodeData}
	 					required={true}
	 					propValue={invoiceDetail.clientPostCode}>
	 					</Input>
	 					<Input
	 					labelClassName ={'splitLabel'}
	 					labelFor={<h4>Country</h4>}
	 					type={"text"}
	 					placeHolder={"Country"}
	 					updateState={getClientCountryData}
	 					required={true}
	 					propValue={invoiceDetail.clientCountry}>
	 					</Input>
 					</div>
 				</div>
 			</label>
   )
}


