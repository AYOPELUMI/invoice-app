import {useState, useEffect} from "react"
import {useRef} from 'react';
import {RiEyeCloseFill} from "react-icons/ri"
import {HiEye} from "react-icons/hi"
import "./Input.scss"

export function Input (props) {
	const{
		type,
		inputClassName,
		placeHolder,
		checkedValueFunction,
		required,
		inputChange,
		labelFor,
		labelClassName,
		propValue,
		updateState,
		index,
		span,
		errorMsg
	} = props

	const [inputValue, setValue] = useState("")
	const [checkedValue, setCheckedValue] = useState(false)
	const [focusBoolean, setFocusBoolean] = useState(false)
	const [divClickBoolean, setDivClickBoolean] = useState(false)
	const inputRef = useRef(null);
	const [showPassword, setShowPassword] = useState(false)
	let style = {}

useEffect(() => {
	if (propValue) {
		if (type=="checkbox") {
			setCheckedValue(propValue)
		}
		else{
			setValue(propValue)
			setFocusBoolean(true)
		}
	}
},[propValue])
	const handleChange = (e) => {
	
		if (type == "checkbox" || span) {
			let value = e.target.checked
			setCheckedValue(value)
			checkedValueFunction([index,value])
		}
		else{
			if (updateState) {
				updateState()
			}
			let value = e.target.value
			setValue(value)
		}
	}

	const handleOnFocus = (e) =>{
		setFocusBoolean(true)
		setDivClickBoolean(true)
	}
	const handleDivClick =(e) => {
		setDivClickBoolean(true)
		// handleclick(!divClickBoolean)
		console.log("i passed thru here")
		inputRef.current.focus()		
	}

	const handleBlur = (e) => {
		if (!inputValue) {
			setFocusBoolean(false)
			// setDivClickBoolean(false)
		}
		else{
			setFocusBoolean(true)
			updateState(inputValue)
			// setDivClickBoolean(true)
		}
	}
	const handleShowPassword = () =>{
		setShowPassword(!showPassword)
		console.log("i pass here")
	}

	if (!inputClassName || errorMsg || inputClassName=="error") {
		style={
			fontSize: focusBoolean ? "12px" : null,
			transform:  focusBoolean ? "translateY(-50px)" : "translateY(-160%)",
			zIndex : focusBoolean ? "2" : "1",
			left : focusBoolean ? "-2px" :"12px",
			opacity : focusBoolean? '0' : '1',
			color: inputClassName == "error" ? "red" : undefined
		}
	}

	return(
		<label className={labelClassName ? labelClassName : undefined} style ={{
			flexDirection : span ? "row" : undefined,
			cursor : span ? "pointer" : undefined
		}}>
			{labelFor}
			{errorMsg ? <p className="errorMsg" style={{
				 // top : type=="password" ?"100%" : undefined,
				 fontSize: type== "password" ? "12px" : undefined,
				 position : "static" 
			}}>{errorMsg}</p> : null}
			<div style={{
				position : "relative"
			}}>
					<input 
						type={showPassword ? "text" : type} 
						required={required ? true :false }  
						ref={inputRef} 
						checked={checkedValue} 
						onBlur={span ? null : handleBlur}  
						onFocus={span ? null : handleOnFocus} 
						className={inputClassName ? inputClassName : undefined} 
						onChange={handleChange} 
						value={inputValue}
						index={index}
						name={span}
						id={span}
					/>
					{type == "password" ? showPassword ? <HiEye className="passWordIcon"  onClick={handleShowPassword}/> : <RiEyeCloseFill onClick={handleShowPassword} className="passWordIcon"/> : null}
					<div 
						className="placeHolder" 
						style={style} 
						onClick={handleDivClick}>
						{placeHolder}
					</div>
				</div>
				{span ? span: null}
		</label>
	)
}