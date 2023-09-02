import {useState, useEffect} from 'react';
import{Input} from "../../assets/Input"
import './styles.scss';

export function BillerComponent(props){
const{
	getData,
	invoiceDetail,
	editInvoice
} = props
// console.log({editInvoice})

const [billerAddress, setBillerAddress] = useState("")
const [billerCity, setBillerCity] = useState("")
const [billerPostCode, setBillerPostCode] = useState("")
const [billerCountry, setBillerCountry] = useState("")

useEffect(() =>{
	if (invoiceDetail) {
		// console.log({invoiceDetail})
		setBillerCountry(invoiceDetail.country)
		setBillerAddress(invoiceDetail.billFromStreetAddress)
		setBillerCity(invoiceDetail.billFromCity)
		setBillerPostCode(invoiceDetail.billFromPostCode)
	}
},[editInvoice])

function updateAddress(args){
	setBillerAddress(args)
}
function updateBillerCity(args){
	setBillerCity(args)
}
function updatePostCode (args) {
	setBillerPostCode(args)
}
function updateBillerCountry (args) {
	setBillerCountry(args)
	
}

useEffect(() =>{
	getData([billerAddress,billerCity,billerPostCode,billerCountry])
},[billerPostCode,billerCity,billerAddress,billerCountry])

  return (
	<label htmlFor="" className="topLabel">
		<h5>Bill from</h5>
		<div className="topLabelFirstDiv">
			<Input
				labelClassName ={"firstChild"}
				labelFor={<h4>Street Address</h4>}
				type = {"text"}
				placeHolder={"Street Address"}
				updateState={updateAddress}
				required={true}
				propValue={billerAddress}
			></Input>
			<div className="topLabelSecondDiv">
				<Input
				labelClassName ={'splitLabel'}
				labelFor={<h4>City</h4>}
				type={"text"}
				placeHolder={"City"}
				updateState={updateBillerCity}
				required={true}
				propValue={billerCity}>
				</Input>
				<Input
				labelClassName ={'splitLabel'}
				labelFor={<h4>Post Code</h4>}
				type={"text"}
				placeHolder={"Post Code"}
				updateState={updatePostCode}
				required={true}
				propValue={billerPostCode}>
				</Input>
				<Input
				labelClassName ={'splitLabel'}
				labelFor={<h4>Country</h4>}
				type={"text"}
				placeHolder={"Country"}
				updateState={updateBillerCountry}
				required={true}
				propValue={billerCountry}>
				</Input>
			</div>
		</div>
	</label>
  )
}

