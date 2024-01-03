import {useState, useEffect} from 'react';
import{Input} from "../../assets/Input"
import './styles.scss';


export function DateComponent (props){
	const {
		getData,
		invoiceDetail
	} = props



		// let invoiceDate = new Date(Date())
		// invoiceDate = invoiceDate.getDay() + "-" + invoiceDate.getMonth() +"-"+invoiceDate.getFullYea
		// let parsedInvoiceDate = Date.parse(invoiceDate)
		// let parsedDateValue = Date.parse(dateValue)
		// if(parsedInvoiceDate > parsedDateValue){
		// 	setDateValue(null)
	// 	// } 
 //    let formatedDate = new Date(invoiceDetail.invoiceDate)
	// console.log({ formatedDate })
	// let yr = formatedDate.getFullYear()
	// let month = formatedDate.getMonth()
	// let day = formatedDate.getDate()
	// let ymd = [yr, month, day]
	// formatedDate = ymd.join("-")
	// console.log([yr,month,day])

  return (
	<div className="dateCtnr">
		<Input
			labelFor={<h4>Invoice Date</h4>}
			type = {"date"}
			required={true}
			updateState={getData}
			value={invoiceDetail.invoiceDate}
		></Input>
{/*		<Input
			labelFor={<h4>Payment Terms</h4>}
			type = {"text"}
			required={true}
			placeHolder={"Payment Terms"}
			propValue={termsValue}
		></Input>*/}
	</div>
  )
}

