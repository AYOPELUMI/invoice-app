import {useState, useEffect, useContext} from 'react';
import {ItemDetails} from "./ItemDetails/ItemDetails"
import {Input} from "../assets/Input"
import invoiceObj from "../assets/InvoiceData.js"
import {BillerComponent} from "./BillerComponent/BillerComponent"
import {ClientComponent} from "./ClientComponent/ClientComponent"
import {DateComponent} from "./DateComponent/DateComponent"
import toast, {Toaster} from "react-hot-toast"
import {Auth} from "../assets/Auth"
import {useNavigate, useParams, redirect,useLocation} from "react-router-dom"

import './styles.scss';
import dayjs from 'dayjs';
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
		authenticateUser,
		setLastLocation
	} = props

	console.log({props})
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
	const {user} = useContext(Auth)
	
	useEffect(() =>{
			setDisplay(1)
	  		setLeft(0)
	},[])
	useEffect(() =>{
		setDraft(false)
	},[invoiceData])
	useEffect(() => {
		// console.log({authenticateUser})
		let localUser = localStorage.getItem("user")
		console.log({user})
		if (user == null && localUser == null) {
			console.log("it is true")
			navigate("/login")
			setLastLocation(location.pathname)
		}
		else{
			console.log({user})
			const fetchInvoiceDetails =() =>{
		        fetch("https://invoice-api-production-b7bc.up.railway.app/api/v1/invoices/"+invoiceDetail.id,{
		            method: 'GET',
		            headers: {
		                'content-type': 'application/json',
		                'authorization' : user.token
		            }
		        })
		        .then((response) => response.json())
		        .then((data) => {

		            console.log({data})
		    		let formatedDate = dayjs(data.invoice.invoiceDate).format("YYYY-MM-DD")
		 			setInvoiceData({
		 				...data.invoice,
		 				invoiceDate: formatedDate
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
		 			toast.success("invoice retrieved")
		        })
		        .catch((err) => {
		           console.log(err.message);
		           toast.error(err.message)
		        })
			    }
			   if (invoiceDetail) {
		    		fetchInvoiceDetails()
			   }
		}
		console.log("location path is -"+ location.pathname)
		setLastLocation(location.pathname)
	},[location,invoiceDetail])
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
				navigate("/dashboard")
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
						getData={getItemsData}
						itemDetail={itemsDataArr[i]}
						handleDel = {updateDisplayItemDetailArr}
					/>)
		}
		else{
			el = ( <ItemDetails 
				index ={i}
				key={displayItemDetailsArray[i]}
				getData={getItemsData}
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
	function getBillerStreetData (args) {
		console.log({args})
		let billerDataClone = {...invoiceData}
		billerDataClone.billFromStreetAddress =args
		console.log({billerDataClone})
		setInvoiceData(billerDataClone)
	}
	function getBillerCityData (args) {
		console.log({args})
		let billerDataClone = {...invoiceData}
		billerDataClone.billFromCity =args
		console.log({billerDataClone})
		setInvoiceData(billerDataClone)
	}
	function getBillerCountryData (args) {
		console.log({args})
		let billerDataClone = {...invoiceData}
		billerDataClone.country= args
		console.log({billerDataClone})
		setInvoiceData(billerDataClone)
	}
	function getBillerPostCodeData (args) {
		console.log({args})
		let billerDataClone = {...invoiceData}
		billerDataClone.billFromPostCode = args,
		setInvoiceData(billerDataClone)
	}
	function getClientNameData(args){
		// console.log({args})
		let clientDataClone = {...invoiceData}
		clientDataClone.clientName = args			
		setInvoiceData(clientDataClone)
	}
	function getClientEmailData(args){
		// console.log({args})
		let clientDataClone = {...invoiceData}
		clientDataClone.clientEmail = args		
		setInvoiceData(clientDataClone)
		setErrorMsg("")
	}
	function getClientStreetAddressData(args){
		// console.log({args})
		let clientDataClone = {...invoiceData}
		clientDataClone.clientStreetAddress =args	
		setInvoiceData(clientDataClone)
	}
	function getClientCityData(args){
		// console.log({args})
		let clientDataClone = {...invoiceData}
		clientDataClone.clientCity= args		
		setInvoiceData(clientDataClone)
	}
	function getClientPostCodeData(args){
		// console.log({args})
		let clientDataClone = {...invoiceData}
		clientDataClone.clientPostCode = args		
		setInvoiceData(clientDataClone)
	}
	function getClientCountryData(args){
		// console.log({args})
		let clientDataClone = {...invoiceData}
		clientDataClone.clientCountry = args		
		setInvoiceData(clientDataClone)
	}	
	function getDateData (args) {
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
	function getItemsData (args){
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
			const updateUserDetails =() =>{
			        simpleCustomFetch("https://invoice-api-production-b7bc.up.railway.app/api/v1/invoices/"+invoiceData.id+"/update",{
			            method: 'PATCH',
			            headers: {
			                'content-type': 'application/json',
			                'authorization' : user.token
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
			        	toast.success('invoice saved successfully')
			        	setTimeout(() => {
			        		handleCloseModal()
			        	}, 3000)
			        })
			        .catch(err => {
			        	console.log({err})
			        	 // console.log(err.data.message)
			        	 setErrorMsg(err.data.errors)
				         toast.error(data.errors[0])
			        })
			}
			updateUserDetails()
		}
		else{
			console.log({invoiceDataClone})
		    	if (draft){
		    		console.log({draft})
				    const postUserDetailsDraft =() =>{
				        fetch("https://invoice-api-production-b7bc.up.railway.app/api/v1/invoices/new?saveAsDraft=true",{
				            method: 'POST',
				            headers: {
				                'content-type': 'application/json',
				                'authorization' : user.token
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
								toast.success("invoice saved successfully")
								setTimeout(() => {
									handleCloseModal()
								}, 3000)
				            }
				            else{
				            	setErrorMsg(data.errors[0])
				            	toast.error(data.errors[0])
				            }
				        })
				        .catch((err) => {
				           console.log(err.message);
				           toast.error(err.message)
				        })
				    }
				    postUserDetailsDraft()
		    	}
		    	else {
				    const postUserDetailsPending =() =>{
				        fetch("https://invoice-api-production-b7bc.up.railway.app/api/v1/invoices/new",{
				            method: 'POST',
				            headers: {
				                'content-type': 'application/json',
				                'authorization' : user.token
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
								toast.success("invoice saved successfully")
								setTimeout(() => {
									handleCloseModal()
								}, 3000)
				            }
				            else{
				            	setErrorMsg(data.errors[0])
				            	toast.error(data.errors[0])
				            	
				            }
				        })
				        .catch((err) => {
				           console.log(err.message);
				           toast.error(err.message)
				        })
				    }
				    postUserDetailsPending()
		    	}
		}
	}
	const handleDraft =() => {
		setDraft(true)
	}
	// console.log({draft})
	// console.log({invoiceData})
	console.log({errorMsg})
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
	 			<Toaster />
	 			<BillerComponent 
	 				getCityData = {getBillerCityData}
	 				getPostCodeData = {getBillerPostCodeData}
	 				getStreetData = {getBillerStreetData}
	 				getCountryData = {getBillerCountryData}
	 				invoiceDetail={invoiceData} />
	 			<ClientComponent 
	 				getClientNameData={getClientNameData}
					getClientEmailData = {getClientEmailData}
					getClientStreetAddressData={getClientStreetAddressData}
					getClientCityData={getClientCityData}
					getClientPostCodeData={getClientPostCodeData}
					getClientCountryData={getClientCountryData}
	 				invoiceDetail={invoiceData}
	 			/>
	 			<DateComponent 
	 			getData={getDateData}
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