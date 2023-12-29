/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useContext, useState,useRef,useCallback } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiFillPlusCircle } from "react-icons/ai";
import { DisplayInvoiceData } from "../DisplayInvoiceData/DisplayInvoiceData";
import { Outlet } from "react-router-dom";
import { Input } from "../assets/Input";
import { Auth } from "../assets/Auth";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { WelcomeModal } from "./WelcomeModal/WelcomeModal";
import apiFetch from '../../apiFetch';

import "./styles.scss"
import "./Reponsive.scss"

export const HomePage = props => {
	const {
		invoiceArr,
		editIndex,
	  	editInvoice,
	  	displayIndex,
	  	filterState,
	  	showFilter,
	  	updateShowFilter,
	  	updateEditIndex,
	  	updateEditInvoice,
	  	updateFilterState,
	  	SideMenu,
	  	updateInvoiceArr,
	  	setLastLocation
	} = props;

	const filterList = ["Draft", "Pending", "Paid"];
	const [showWelcomeModal, setShowWelcomeModal] = useState(true)
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useContext(Auth);
	const filterRef = useRef(null)

	console.log({ user });
	let authUser
		if (JSON.parse(localStorage.getItem("user"))) {
			authUser = JSON.parse(localStorage.getItem("user")).token
		}
		else if (user) {
			authUser = user.token
		}
	useEffect(() => {
		console.log({ user });
		let localUser = localStorage.getItem("user");
		console.log({ localUser });
		
		
		console.log({authUser})

		if (location.pathname == "/dashboard") {
			if (user == null && localUser == null) {
				console.log("i am passing here")
				navigate("/login");
			}
			else {
				
				console.log(localStorage.getItem("user"));
				apiFetch("/invoices/list", {
					method: 'GET',
					headers: {
						'content-type': 'application/json',
						'authorization': authUser
					}
				})
					.then((response) => response.json())
					.then((data) => {
						console.log({ data });
						console.log("i am here");
						if (user) {
							updateInvoiceArr(data.data);
							localStorage.setItem("invoices", JSON.stringify(data.data));
						}
					})
					.catch((err) => {
						console.log(err.message);
					});

			}
		}
		setLastLocation(location.pathname);
	}, [location.pathname]);

	const handleShowFilter = (e) => {
		e.stopPropagation()
		updateShowFilter(!showFilter);
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
		updateShowFilter(false)
	}
		useOutsideClick(handleCloseFilter, filterRef);
	


	function updateShowWelcomeModal(args) {
		setShowWelcomeModal(!showWelcomeModal);
	}
	function updateInvoiceArray(args) {
		// console.log({args})
		let invoiceArrClone = [...invoiceArr];
		invoiceArrClone.push(args);
		setInvoiceArr(invoiceArrClone);
		// ArrayInvoice.push(args)
	}
	console.log({ editIndex });
	console.log({ editInvoice });
	console.log({ displayIndex });
	
	const handleGoBack = () => {
		seteditIndex(undefined);
		setEditInvoice(!editInvoice);
	};
	function updateInvoiceData(args) {
		let invoiceArrClone = [...invoiceArr];
		console.log({ args });
		console.log({ editIndex });
		let index = invoiceArrClone.findIndex(obj => {
			console.log({ obj });
			return obj.Id == editIndex;
		});
		console.log({ index });
		invoiceArrClone.splice(index, 1, args);
		setInvoiceArr(invoiceArrClone);
	}
	// function updateInvoiceArr (args) {
	// 	setInvoiceArr(args)
	// 	handleGoBack()
	// }
	function setFilterState(args) {
		let filterStateClone = [...filterState];

		console.log({args})
		for (var i = 0; i < filterStateClone.length; i++) {
			if (args[0] ==i) {
				filterStateClone[i] = args[1]
			}
			else{
				filterStateClone[i] = false
			}
		}
		filterStateClone[args[0]] = args[1];

		// console.log({filterStateClone})
		updateFilterState(filterStateClone);
	}
	const setEditIndex = (args) => {
		updateEditIndex(args);
		// 		let index = displayArr.findIndex(obj => {
		// 	console.log({obj})
		// 	return obj.props.index == args
		// })
		// 		console.log({index})
		updateEditInvoice(true);
		// updateDisplayIndex(index)
	};
	console.log({ invoiceArr });

	let displayArr = [];
	for (var i = invoiceArr.length - 1; i >= 0; i--) {
		let el = (
			<DisplayInvoiceData
				invoiceData={invoiceArr[i]}
				key={invoiceArr[i].id}
				index={invoiceArr[i].id}
				updateEditIndex={setEditIndex}
				editInvoice={editInvoice}
				mainEditIndex={editIndex}
				updateInvoiceData={updateInvoiceData}
				invoiceArr={invoiceArr}
				/>
		);
		displayArr.push(el);
	}

	if (filterState[0] == true) {
		console.log("in the first statement");
		// console.log({displayArr})
		const compareString = (a, b) => a > b ? 1 : a < b ? -1 : 0;

		displayArr = displayArr.sort(function (a, b) {

			let x = a.props.invoiceData.status.startsWith("d");
			let y = b.props.invoiceData.status.startsWith("d");

			if (x) {
				// console.log({x})
				return y ? compareString(x, y) : -1;
			}
			if (y) {
				return x ? -compareString(x, y) : 1;
			}
			return compareString(x, y);
		});

		// console.log({displayArr})		
	}
	if (filterState[1] == true) {
		// console.log({displayArr})
		displayArr = displayArr.sort(function (a, b) {
			console.log({ a });
			let x = a.props.invoiceData.status.toUpperCase();
			let y = b.props.invoiceData.status.toUpperCase();
			if (x > y) { return -1; }
			if (x < y) { return 1; }
			return 0;
		});

		// console.log({displayArr})
	}
	if (filterState[2] == true) {
		// console.log({displayArr})
		const compareString = (a, b) => a > b ? 1 : a < b ? -1 : 0;

		displayArr = displayArr.sort(function (a, b) {

			let x = a.props.invoiceData.status.startsWith("pa");
			let y = b.props.invoiceData.status.startsWith("pa");

			if (x) {
				// console.log({x})
				return y ? compareString(x, y) : -1;
			}
			if (y) {
				return x ? -compareString(x, y) : 1;
			}
			return compareString(x, y);
		});

		// console.log({displayArr})
	}
	// useEffect(() => {
	// 	updateShowFilter(false);
	// }, [filterState]);



	let filterArray = [];
	for (var i = 0; i < filterList.length; i++) {
		let el = (

			<Input type="checkbox"
				index={i}
				key={i}
				checkedValueFunction={setFilterState}
				checked={filterState[i]}
				span={filterList[i]} />
		);
		filterArray.push(el);
	}

	return (
		<div className="invoiceMainContainer">
			{SideMenu}
			<div className="landingPage">
				<header className="invoiceAppHeader">
					<div className="pageTitle">
						<h2>Invoices</h2>
						{invoiceArr.length ?<div> <span>There are </span><p>{invoiceArr.length}</p><span>total</span> <p>invoices</p> </div>: <p>no invoices</p>}
					</div>
					<div className="btnHeaderCtnr">
						<div className="filterBtn" ref={filterRef} onClick={handleShowFilter}>
							filter by status
							{showFilter ? <IoIosArrowUp /> : <IoIosArrowDown />}
							{showFilter ? <ul ref={filterRef}>
								{filterArray}
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
				{invoiceArr ?
					<div className="invoiceTableContainer">
						{displayArr}
					</div>
					: <div>Oops </div>}
			</div>
			{invoiceArr.length == 0 && showWelcomeModal ? <WelcomeModal  updateShowWelcomeModal ={updateShowWelcomeModal} showWelcomeModal={showWelcomeModal}/> : null}
			<Outlet />
		</div>
	)
}
