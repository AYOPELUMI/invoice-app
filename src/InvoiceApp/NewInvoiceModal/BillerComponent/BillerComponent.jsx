import {useState, useEffect} from 'react';
import{Input} from "../../assets/Input"
import './styles.scss';

export function BillerComponent(props){
const{
	getCityData,
	getCountryData,
	getPostCodeData,
	getStreetData,
	invoiceDetail,
	editInvoice
} = props
// console.log({editInvoice})

  return (
	<label htmlFor="" className="topLabel">
		<h5>Bill from</h5>
		<div className="topLabelFirstDiv">
			<Input
				labelClassName ={"firstChild"}
				labelFor={<h4>Street Address</h4>}
				type = {"text"}
				placeHolder={"Street Address"}
				updateState={getStreetData}
				required={true}
				value={invoiceDetail.billFromStreetAddress}
			></Input>
			<div className="topLabelSecondDiv">
				<Input
				labelClassName ={'splitLabel'}
				labelFor={<h4>City</h4>}
				type={"text"}
				placeHolder={"City"}
				updateState={getCityData}
				required={true}
				value={invoiceDetail.billFromCity}>
				</Input>
				<Input
				labelClassName ={'splitLabel'}
				labelFor={<h4>Post Code</h4>}
				type={"text"}
				placeHolder={"Post Code"}
				updateState={getPostCodeData}
				required={true}
				value={invoiceDetail.billFromPostCode}>
				</Input>
				<Input
				labelClassName ={'splitLabel'}
				labelFor={<h4>Country</h4>}
				type={"text"}
				placeHolder={"Country"}
				updateState={getCountryData}
				required={true}
				value={invoiceDetail.country}>
				</Input>
			</div>
		</div>
	</label>
  )
}

