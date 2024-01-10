/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useContext, useState,useRef,useCallback } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiFillPlusCircle } from "react-icons/ai";
import { DisplayInvoiceData } from "../DisplayInvoiceData/DisplayInvoiceData";
import { Auth } from "../assets/Auth";
import { NavLink, useNavigate, useLocation,Outlet } from "react-router-dom";
import { WelcomeModal } from "./WelcomeModal/WelcomeModal";
import apiFetch from '../../apiFetch';

import "./styles.scss"
import "./Reponsive.scss"

export const HomePage = props => {
	const {
		invoiceArr,
		editIndex,
	  	updateEditIndex,
	  	SideMenu,
	  	updateInvoiceArr,
	  	setLastLocation
	} = props;

	const filterList = ["draft", "pending", "paid"];
	const [showWelcomeModal, setShowWelcomeModal] = useState(true)
	const [selectedFilters, setSelectedFilters] = useState([])
	const [showFilter, setShowFilter] =useState(false)
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useContext(Auth);
	const filterRef = useRef(null)

	// console.log({ user });
	let authUser
		if (JSON.parse(localStorage.getItem("user"))) {
			authUser = JSON.parse(localStorage.getItem("user")).token
		}
		else if (user) {
			authUser = user.token
		}
	useEffect(() => {
				apiFetch("/invoices/list", {
					method: 'GET',
					headers: {
						'content-type': 'application/json',
						'authorization': authUser
					}
				})
					.then((response) => response.json())
					.then((data) => {
						if (user) {
							updateInvoiceArr(data.data);
							localStorage.setItem("invoices", JSON.stringify(data.data));
						}
					})
					.catch((err) => {
						console.log(err.message);
					});

		setLastLocation(location.pathname);
	}, [location.pathname]);

	const handleShowFilter = (e) => {
		setShowFilter(true);	
	}
	function useOutsideClick(handleClose, ref) {
		const handleClick = useCallback((event) => {
		  if (ref?.current?.contains && !ref.current.contains(event.target)) {
			  handleClose();
		  }
		},[handleClose, filterRef])
	   
		useEffect(() => {
		  document.addEventListener("mouseup", handleClick);
	   
		  return () => { document.removeEventListener("mouseup", handleClick); };
		}, [handleClick])
	}
	const handleCloseFilter =() =>{
		setShowFilter(false)
	}
	
	useOutsideClick(handleCloseFilter, filterRef);
	
	function updateShowWelcomeModal() {
		setShowWelcomeModal(!showWelcomeModal);
	}


	const setEditIndex = (args) => {
		updateEditIndex(args);
	}


	const renderInvoiceList = (invoiceList) => {
		let displayArr = [];
		for (var i = invoiceList.length - 1; i >= 0; i--) {
			let el = (
				<DisplayInvoiceData
					invoiceData={invoiceList[i]}
					key={invoiceList[i].id}
					index={invoiceList[i].id}
					updateEditIndex={setEditIndex}
					mainEditIndex={editIndex}

					/>
			);
			displayArr.push(el);
		}
		return displayArr
	}
	
	const handleFilterChange = (e) => {
		let { value, checked } = e.target
		if (checked) {
			setSelectedFilters(selectedFilters.concat(value))
		}	else {
			setSelectedFilters(selectedFilters.filter(filter => filter !== value))
		}
		
	}

	const renderFilterOptions = () => {
		let filterArray = [];
		filterList.forEach((filter,index) => {
			let el = (
				<label>
					<input type='checkbox' value={filter.toLowerCase()} key={`filter-item-${index}`} onChange={handleFilterChange} />
					{filter}
				</label>
			);
			filterArray.push(el)
		})
		return filterArray

	}

	const getFilteredInvoiceList = () => {
		if (selectedFilters.length > 0) {
			let filteredInvoiceList = invoiceArr.filter(invoice => {
				if (selectedFilters.includes(invoice.status.toLowerCase() )) {
					return true 
				} else {
					return false 
				}
			})
			return filteredInvoiceList
		} else {
			return invoiceArr
		}
	}

	const filteredInvoiceList = getFilteredInvoiceList()
	

	return (
		<div className="invoiceMainContainer">
			{SideMenu}
			<div className="landingPage">
				<header className="invoiceAppHeader">
					<div className="pageTitle">
						<h2>Invoices</h2>
						{invoiceArr.length > 0 ?<div> <span>There are </span><p>{invoiceArr.length}</p><span>total</span> <p>invoices</p> </div>: <p> no invoices</p>}
					</div>
					<div className="btnHeaderCtnr">
						<div className="filterBtn"  onClick={handleShowFilter}>
							filter by status
							{showFilter ? <IoIosArrowUp /> : <IoIosArrowDown />}
							{showFilter ? <ul ref={filterRef}>
	
								{renderFilterOptions()}
							</ul> : null}
						</div>
						<NavLink to="newInvoice">
							<button className="addNewInvoiceBtn">
								<AiFillPlusCircle className="addNewInvoiceIcon" />
								<p>New</p> <span>Invoice</span>
							</button>
						</NavLink>
					</div>
				</header>
				{filteredInvoiceList.length > 0 ?
					<div className="invoiceTableContainer">
						{renderInvoiceList(filteredInvoiceList)}
					</div>
					: <div>
						{ invoiceArr.length  === 0 ? (
							<div>you have no invoice</div>
						): (
							<div>You have invoice, you just don't have any one matching the selected filters: {selectedFilters.join(',')}</div>
						)} 
					</div>}
			</div>
			{invoiceArr.length == 0 && showWelcomeModal ? <WelcomeModal  updateShowWelcomeModal ={updateShowWelcomeModal} showWelcomeModal={showWelcomeModal}/> : null}
			<Outlet />
		</div>
	)
}
