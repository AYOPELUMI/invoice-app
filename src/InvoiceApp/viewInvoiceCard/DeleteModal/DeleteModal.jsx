import React from 'react';
import {useNavigate} from "react-router-dom"

import './styles.scss';
import apiFetch from '../../../apiFetch';


export const DeleteModal = props => {
	const {
		invoiceData,
		invoiceArr,
		updateInvoiceArr,
		updateDeleteModal,
		index,
		ResetEditIndex,
		authenticateUser
	} = props
	const navigate = useNavigate()

	console.log({props})

// console.log({authenticateUser})
		if (authenticateUser== undefined || authenticateUser==null) {
			console.log("it is true")
			navigate("/login")
		}

			const fetchInvoiceDetails =() =>{
		        apiFetch("/invoices/"+ invoiceData.id +"/delete",{
		            method: 'DELETE',
		            headers: {
		                'content-type': 'application/json',
		                'authorization' : authenticateUser
		            }
		        })
		        .then((response) => response.json())
		        .then((data) => {


		        })
		        .catch((err) => {
		           console.log(err.message);
		        })
			    }


	const handleDelete =() =>{
		    fetchInvoiceDetails()
		updateDeleteModal(false)
		setTimeout(() => {
			navigate(-1)
			ResetEditIndex()
		  // Todo...
		},500)
	}

	const handleCancel =() => {
		updateDeleteModal(false)
	} 
  return (
    
    <div className="deleteModalCtnr">
    	<div className="delCtnr">
    		<div className="textCtnr">
    		<h2>Confirm Deletion</h2>
    		<p>Are yoi sire you want to delete invoice #{invoiceData.Id}.This action cannot be undone</p>
    		</div>
	    	<div className="btnCtnr">
	    	<button className="cancelBtn" onClick={handleCancel}>Cancel</button>
	    	<button className="delBtn" onClick={handleDelete}>Delete</button>
	    	</div>
    	</div>
    </div>
  );
};

