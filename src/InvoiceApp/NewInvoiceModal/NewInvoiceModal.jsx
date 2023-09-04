import {useState, useEffect} from 'react';
import {ItemDetails} from "./ItemDetails/ItemDetails"
import {Input} from "../assets/Input"
import invoiceObj from "../assets/InvoiceData.js"
import {BillerComponent} from "./BillerComponent/BillerComponent"
import {ClientComponent} from "./ClientComponent/ClientComponent"
import {DateComponent} from "./DateComponent/DateComponent"
import {useNavigate, useParams, redirect,useLocation} from "react-router-dom"

import './styles.scss';
	let itemArray =[]
	let displayItemDetailsArr = []

export function NewInvoiceModal (props) {

	const {
		openModal,
		updateOpenModal,
		getData,
		invoiceDetail,
		editIndex,
		updateInvoiceData,
		invoiceArr,
		authenticateUser
	} = props

	// console.log({props})
	const {params} = useParams()
	const [left,setLeft] = useState(-100)
	const [display, setDisplay] = useState(0)
	const [displayItemDetailsArray, setDisplayItemDetailArray] = useState([])
	const [itemIndex, setItemIndex] = useState(0)
	const [invoiceData, setInvoiceData] = useState({})
	const [itemsDataArr, setItemsDataArr] = useState([])
	const [draft, setDraft] = useState(false)
	const [editInvoice, setEditInvoice] = useState(false)
	const [errorMsg, setErrorMsg] = useState("")
	const navigate = useNavigate()
	const location = useLocation()
	
	useEffect(() => {
		// console.log({authenticateUser})
		if (authenticateUser== undefined || authenticateUser==null) {
			console.log("it is true")
			navigate("/login")
		}
		else{
			const fetchInvoiceDetails =() =>{
		        fetch("https://invoice-api-production-b7bc.up.railway.app/api/v1/invoices/"+invoiceDetail.id,{
		            method: 'GET',
		            headers: {
		                'content-type': 'application/json',
		                'authorization' : authenticateUser
		            }
		        })
		        .then((response) => response.json())
		        .then((data) => {
		            console.log({data})
		    		let formatedDate = new Date(data.invoice.invoiceDate)
					console.log({ formatedDate })
					let yr = formatedDate.getFullYear()
					let month = formatedDate.getMonth()
					let day = formatedDate.getDate()
					let ymd = [yr, month, day]
					console.log([yr,month,day])
		 			setInvoiceData({
		 				...data.invoice,
		 				invoiceDate: [yr, month, day].join('-')
		 			})
		 			if (data.invoice.status == "draft") {
		 				setDraft(true)
		 			}
		 			setItemsDataArr(data.invoice.itemList)
		 			// console.log("itemList is "+data.invoice.itemList)
		 			setItemIndex(data.invoice.itemList.length +1)
		 			let displayArr = []
		 			for (var i = 0; i < data.invoice.itemList.length; i++) {
		 				displayArr.push(i)
		 			}
		 			setDisplayItemDetailArray(displayArr)
		 			setEditInvoice(true)
		        })
		        .catch((err) => {
		           console.log(err.message);
		        })
			    }
			   if (invoiceDetail) {
		    		fetchInvoiceDetails()
			   }
		}
		console.log("location path is -"+ location.pathname)
	},[location])
	// console.log({invoiceDetail})
	// console.log({invoiceData})
	// console.log({editInvoice})
	// console.log({displayItemDetailsArray})
	// console.log({invoiceArr})
	// console.log({itemIndex})

	const handleCloseModal =() => {
		exitApp()
		setLeft(-100)
		setTimeout(() => {
			if (invoiceDetail){
				navigate(-1)
			}
			else{
				navigate(-1)
			}
		  // Todo...
		}, 900)
	}

	function  updateDisplayItemDetailArr (args){
		let displayItemDetailsArrayClone = [...displayItemDetailsArray]
		let itemsDataArrClone = [...itemsDataArr]
		let invoiceDataClone = {...invoiceData}
		console.log({args})
		console.log({itemsDataArrClone})
		console.log({displayItemDetailsArrayClone})
		 console.log({itemIndex})
			let newIndex = displayItemDetailsArrayClone.indexOf(Number(args))
			console.log({newIndex})
					console.log({args})
		console.log({itemsDataArrClone})
		console.log({displayItemDetailsArrayClone})
			displayItemDetailsArrayClone.splice(Number(args),1)
			console.log({displayItemDetailsArrayClone})
			itemsDataArrClone.splice(Number(args),1)
			console.log({itemsDataArrClone})
			invoiceDataClone.itemList = itemsDataArrClone
			setItemsDataArr(itemsDataArrClone)
			setInvoiceData(invoiceDataClone)
			setDisplayItemDetailArray(displayItemDetailsArrayClone)
		
	}
	const handleAddItemDetails =() => {
		let displayItemDetailsArrayClone = [...displayItemDetailsArray]
			let el = itemIndex
			console.log({itemIndex})
		displayItemDetailsArrayClone.push(el)
		setDisplayItemDetailArray(displayItemDetailsArrayClone)
		setItemIndex(itemIndex+1)
	}
	let displayArr =[]
	for (var i = 0; i < displayItemDetailsArray.length; i++) {
		let el
		if (invoiceDetail){
			el = ( <ItemDetails 
						index ={i}
						key={displayItemDetailsArray[i]}
						getData={GetItemsData}
						itemDetail={itemsDataArr[i]}
						handleDel = {updateDisplayItemDetailArr}
					/>)
		}
		else{
			el = ( <ItemDetails 
				index ={i}
				key={displayItemDetailsArray[i]}
				getData={GetItemsData}
				handleDel = {updateDisplayItemDetailArr}
			/>)
		}
		displayArr.push(el)
	}
	function exitApp () {
			setTimeout(() => {
				setDisplay(0)
			}, 700)
	}
	function GetBillerStreetData (args) {
		console.log({args})
		let billerDataClone = {...invoiceData}
		billerDataClone.billFromStreetAddress =args
		console.log({billerDataClone})
		setInvoiceData(billerDataClone)
	}
	function GetBillerCityData (args) {
		console.log({args})
		let billerDataClone = {...invoiceData}
		billerDataClone.billFromCity =args
		console.log({billerDataClone})
		setInvoiceData(billerDataClone)
	}
	function GetBillerCountryData (args) {
		console.log({args})
		let billerDataClone = {...invoiceData}
		billerDataClone.country= args
		console.log({billerDataClone})
		setInvoiceData(billerDataClone)
	}
	function GetBillerPostCodeData (args) {
		console.log({args})
		let billerDataClone = {...invoiceData}
		billerDataClone.billFromPostCode = args,
		setInvoiceData(billerDataClone)
	}
	function GetClientNameData(args){
		// console.log({args})
		let clientDataClone = {...invoiceData}
		clientDataClone.clientName = args			
		setInvoiceData(clientDataClone)
	}
	function GetClientEmailData(args){
		// console.log({args})
		let clientDataClone = {...invoiceData}
		clientDataClone.clientEmail = args		
		setInvoiceData(clientDataClone)
	}
	function GetClientStreetAddressData(args){
		// console.log({args})
		let clientDataClone = {...invoiceData}
		clientDataClone.clientStreetAddress =args	
		setInvoiceData(clientDataClone)
	}
	function GetClientCityData(args){
		// console.log({args})
		let clientDataClone = {...invoiceData}
		clientDataClone.clientCity= args		
		setInvoiceData(clientDataClone)
	}
	function GetClientPostCodeData(args){
		// console.log({args})
		let clientDataClone = {...invoiceData}
		clientDataClone.clientPostCode = args		
		setInvoiceData(clientDataClone)
	}
	function GetClientCountryData(args){
		// console.log({args})
		let clientDataClone = {...invoiceData}
		clientDataClone.clientCountry = args		
		setInvoiceData(clientDataClone)
	}	
	function GetDateData (args) {
		let dateObjClone ={...invoiceData}
		console.log({args})
		dateObjClone.invoiceDate = args
		// dateObjClone.PaymentTerms = args[1]
		setInvoiceData(dateObjClone)
	}
	// console.log({invoiceData})
	function updateDescription (args) {
		let descriptionClone = {...invoiceData}
		descriptionClone.projectDescription = args
		setInvoiceData(descriptionClone)
	}
	function GetItemsData (args){
		console.log({args})
		let displayItemDetailsArrayClone = [...displayItemDetailsArray]
		let itemsArr ={...invoiceData}
		// console.log({displayItemDetailsArrayClone})
		// console.log({args})
		let itemsDataArrClone = [...itemsDataArr]

		let newIndex = displayItemDetailsArrayClone.indexOf(args[0])
		console.log({newIndex})
		itemsDataArrClone[args[0]] = args[1]
		setItemsDataArr(itemsDataArrClone)
		itemsArr.itemList= itemsDataArrClone
		console.log({itemsArr})
		setInvoiceData(itemsArr)
	}

	const customFetch = (url, options) => {
		return fetch(url, options)
					.then((response) =>  {
			        	return response.json().then(data => {
			        		return [response.ok, data]
			        	})
			        }).then(customResponse => {
			        	let [ok, data] = customResponse
			        	if (!ok) {
			        		console.log([ok])
			        		let error = new Error()
			        		error.data = data
			        		return Promise.reject(error)
			        	} else {
			        		return data
			        	}
			        })
	}

	const simpleCustomFetch = async (url, options) => {
			const response =  await  fetch(url, options)
			const data = await response.json()

			if (!response.ok) {
				let error =  new Error()
				error.data = data
				throw error
			} else {
				return data
			}	
	}


	const handlesubmit = (event) =>{
		event.preventDefault()
		let invoiceDataClone = {...invoiceData}
		let invoiceArrLength = invoiceArr.length
		if (invoiceDetail) {
			console.log("i pass through here")
			console.log({invoiceData})
			// updateInvoiceData(invoiceData)
			const fetchUserDetails =() =>{
			        simpleCustomFetch("https://invoice-api-production-b7bc.up.railway.app/api/v1/invoices/"+invoiceData.id+"/update",{
			            method: 'PATCH',
			            headers: {
			                'content-type': 'application/json',
			                'authorization' : authenticateUser
			            },
			            body: JSON.stringify({
			               billFromCity: invoiceDataClone.billFromCity,
			               billFromStreetAddress: invoiceDataClone.billFromStreetAddress,
			               billFromPostCode: invoiceDataClone.billFromPostCode,
			               country: invoiceDataClone.country,
			               clientName: invoiceDataClone.clientName,
			               clientEmail : invoiceDataClone.clientEmail,
			               clientStreetAddress : invoiceDataClone.clientStreetAddress,
			               clientCity : invoiceDataClone.clientCity,
			               clientPostCode : invoiceDataClone.clientPostCode,
			               clientCountry : invoiceDataClone.clientCountry,
			               projectDescription : invoiceDataClone.projectDescription,
			               invoiceDate: invoiceDataClone.invoiceDate,
			               itemList: invoiceDataClone.itemList
			
			            })
			        })
			        .then((data) =>  {
			        	console.log({data})
			        	alert('invoice created successfully')
			        	handleCloseModal()
			        })
			        .catch(err => {
			        	 console.log(err.data.message)
			        	 setErrorMsg(err.data.errors)
			        })
			}
			fetchUserDetails()
		}
		else{
			console.log({invoiceDataClone})
		    	if (draft){
		    		console.log({draft})
				    const fetchUserDetails =() =>{
				        fetch("https://invoice-api-production-b7bc.up.railway.app/api/v1/invoices/new?saveAsDraft=true",{
				            method: 'POST',
				            headers: {
				                'content-type': 'application/json',
				                'authorization' : authenticateUser
				            },
				            body: JSON.stringify({
				               billFromCity: invoiceDataClone.billFromCity,
				               billFromStreetAddress: invoiceDataClone.billFromStreetAddress,
				               billFromPostCode: invoiceDataClone.billFromPostCode,
				               country: invoiceDataClone.country,
				               clientName: invoiceDataClone.clientName,
				               clientEmail : invoiceDataClone.clientEmail,
				               clientStreetAddress : invoiceDataClone.clientStreetAddress,
				               clientCity : invoiceDataClone.clientCity,
				               clientPostCode : invoiceDataClone.clientPostCode,
				               clientCountry : invoiceDataClone.clientCountry,
				               projectDescription : invoiceDataClone.projectDescription,
				               invoiceDate: invoiceDataClone.invoiceDate,
				               itemList: invoiceDataClone.itemList
				
				            })
				        })
				        .then((response) => response.json())
				        .then((data) => {
				            console.log({data})
				            if (data.message == "Invoice created successfully") {
								handleCloseModal()
				            }
				        })
				        .catch((err) => {
				           console.log(err.message);
				        })
				    }
				    fetchUserDetails()
		    	}
		    	else {
				    const fetchUserDetails =() =>{
				        fetch("https://invoice-api-production-b7bc.up.railway.app/api/v1/invoices/new",{
				            method: 'POST',
				            headers: {
				                'content-type': 'application/json',
				                'authorization' : authenticateUser
				            },
				            body: JSON.stringify({
				               billFromCity: invoiceDataClone.billFromCity,
				               billFromStreetAddress: invoiceDataClone.billFromStreetAddress,
				               billFromPostCode: invoiceDataClone.billFromPostCode,
				               country: invoiceDataClone.country,
				               clientName: invoiceDataClone.clientName,
				               clientEmail : invoiceDataClone.clientEmail,
				               clientStreetAddress : invoiceDataClone.clientStreetAddress,
				               clientCity : invoiceDataClone.clientCity,
				               clientPostCode : invoiceDataClone.clientPostCode,
				               clientCountry : invoiceDataClone.clientCountry,
				               projectDescription : invoiceDataClone.projectDescription,
				               invoiceDate: invoiceDataClone.invoiceDate,
				               itemList: invoiceDataClone.itemList				
				            })
				        })
				        .then((response) => response.json())
				        .then((data) => {
				            console.log({data})
				            if (data.message == "Invoice created successfully") {
								handleCloseModal()
				            }
				        })
				        .catch((err) => {
				           console.log(err.message);
				        })
				    }
				    fetchUserDetails()
		    	}
		}
	}
	const handleDraft =() => {
		setDraft(true)
	}
	// console.log({draft})
	// console.log({invoiceData})
	useEffect(() =>{
			setDisplay(1)
	  		setLeft(0)
	},[])

  	return (
	 	<div className="modalCtnr" style={{
	 		opacity: display
	 		}}>
	 		<form action="" onSubmit={handlesubmit} className="mainContent" style={{
	 			left: left +"%"
	 		}}>
		 		<header>
	 				{invoiceDetail ? <h2>Edit  <span>#</span>{invoiceDetail.id.slice(0,5)}</h2>:<h2>New Invoice</h2>}
	 			</header>
	 			<BillerComponent 
	 				getCityData = {GetBillerCityData}
	 				getPostCodeData = {GetBillerPostCodeData}
	 				getStreetData = {GetBillerStreetData}
	 				getCountryData = {GetBillerCountryData}
	 				invoiceDetail={invoiceData} />
	 			<ClientComponent 
	 				getClientNameData={GetClientNameData}
					getClientEmailData = {GetClientEmailData}
					getClientStreetAddressData={GetClientStreetAddressData}
					getClientCityData={GetClientCityData}
					getClientPostCodeData={GetClientPostCodeData}
					getClientCountryData={GetClientCountryData}
	 				invoiceDetail={invoiceData}
	 			/>
	 			<DateComponent 
	 			getData={GetDateData}
	 			invoiceDetail={invoiceData}/>
	 			<Input
					labelFor={<h4>Payment Description</h4>}
					type={"text"}
					placeHolder={"Payment Description"}
					required={true}
					updateState={updateDescription}
					propValue={invoiceData.projectDescription}
					
				/>
	 			<div>
		 			<h3>Item List</h3>
		 			{displayArr}
	 			</div>
	 			<button type="button"  className="addNewItemBtn" onClick={handleAddItemDetails}>+ Add New Item</button>
	 			{errorMsg ? <span className="errorSpan">***{errorMsg}</span> : null}
	 			<div className={invoiceDetail ? "btnCtnr edit" : "btnCtnr"}>
	 				{invoiceDetail ? null :
	 						<button className="discardBtn" onClick={handleCloseModal}>Discard</button>
	 					}
	 				<div>
	 					{invoiceDetail ? <button className="discardBtn"type ="button" onClick={handleCloseModal}>Cancel</button> : null}
		 				{invoiceDetail ? null : <button type = "submit" onClick={handleDraft} className="saveBtn">Save as Draft</button>}
		 				<button  type = "submit" className="sendBtn" >{invoiceDetail ? "Save Changes" :"Send & Send"}</button>
	 				</div>
	 			</div>
	 		</form>
	 	</div>   
	)
}
