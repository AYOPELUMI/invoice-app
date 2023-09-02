import {useState, useEffect} from 'react';
import {FcGoogle} from "react-icons/fc"
import {AiFillApple} from "react-icons/ai"
import {Input} from "../assets/Input"
import {useNavigate} from "react-router-dom"
import './styles.scss';

const DEFAULT_HEADER = {
	'content-type': 'application/json',
}

export const SignUp = props => {
	const {
		userData
	} = props
	const navigate = useNavigate()

	const [fullName, setFullName] = useState("")
	const [fullNameValidity, setFullNameValidity] = useState(false)
	const [fullNameErrorMsg, setFullNameErrorMsg] = useState("")

	const [email, setEmail] = useState("")
	const [emailValidity, setEmailValidity] = useState(false)
	const [emailErrorMsg, setEmailErrorMsg] = useState("")

	const [userName, setUserName] = useState("")
	const [userNameValidity, setUserNameValidity] = useState(false)
	const [userNameErrorMsg, setUserNameErrorMsg] = useState("")

	const [password, setPassword] = useState("")
	const [passwordValidity, setPasswordValidity] = useState(false)
	const [passwordErrorMsg, setPasswordErrorMsg] = useState("")

	const [confirmPassword, setConfirmPassword] = useState("")
	const [confirmPasswordValidity, setConfirmPasswordValidity] = useState(false)
	const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState("")
	const [invalidMsg, setInvalidMsg] = useState("")
	const [checkValidity, setCheckValidity] = useState(false)


	function updateName (args) {
		setFullNameValidity(false)
		setFullNameErrorMsg("")
		setFullName(args)
	}
	function updateEmail (args) {
		setEmail(args)
		setEmailValidity(false)
		setEmailErrorMsg("")
	}
	function updateUserName (args) {
		setUserName(args)
		setUserNameValidity(false)
		setUserNameErrorMsg("")
	}
	function updatePassword (args) {
		setPasswordValidity(false)
		setPasswordErrorMsg("")
		setPassword(args)
	}
	function updateConfirmPaaword (args) {
		setConfirmPassword(args)
		setConfirmPasswordValidity(false)
		setConfirmPasswordErrorMsg("")
	}

	const handleFullNameChanges = () => {
		let validity = true
		let errorMsg = "please enter your full name" 
		console.log({fullName})
		if (fullName) {
			for (var i = 0; i < fullName.length; i++) {
			 	if (fullName[i] == " ") {
			 		validity = false
			 		errorMsg = ""
			 		break;
			 	}
			 	console.log({validity})
			}
		}
		else{
			validity = true
		}

		if (userName.length != 0 && userName.length < 16) {
			setUserNameValidity(false)
		}
		else{
			setUserNameValidity(true)
			setUserNameErrorMsg("username must be less than 16 characters")
		}

		console.log({validity})
		setFullNameErrorMsg(errorMsg)
		setFullNameValidity(validity)
	}
	function handleEmailValidity (){
		if (isNaN(email)) {
			for (var i = 0; i < email.length; i++) {
				if ("@" == email[i] && email.includes(".com")){
					setEmailValidity(false)
					setEmailErrorMsg("")
					break;
				}
				else {
					setEmailValidity(true)
					setEmailErrorMsg("enter appropriate email")
				}
			}
		}
		else{
			setEmailValidity(true)
			setEmailErrorMsg("enter appropriate email")
		}
	}
	function IsAllPresent(str) {
		let pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*,.?]).+$")

		if (pattern.test(str)) {
			return false
		}
		else{
			return true
		}
	}

	const handlePasswordValidity = () =>{
		let passwordVerification = IsAllPresent(password)
		if (password == "") {
			console.log("i am in the of statement")
			setPasswordValidity(true)
			setPasswordErrorMsg("Please enter your password")
		}
		if (confirmPassword == "") {
			setConfirmPasswordValidity(true)
			setConfirmPasswordErrorMsg("confirm your password")
			return
		}
		if(password){
			if(passwordVerification){
				setPasswordErrorMsg("must contain at least 1 uppercase, alphanumeric & special characters ")
				setPasswordValidity(passwordVerification)
			 return
			}
			else if (password.length < 8){
			 	setPasswordValidity(true)
			 	setPasswordErrorMsg("password must be 8 digits")
			}
		}
		if (password != confirmPassword){
			setConfirmPasswordErrorMsg("password don't not conform ")
			setConfirmPasswordValidity(true)
		}
	}

	const handleSubmit =() =>{
		handleFullNameChanges()
		handlePasswordValidity()
		handleEmailValidity()

		setCheckValidity(true)
		console.log({emailValidity})
		console.log({fullNameValidity})
		console.log({userNameValidity})
		console.log({passwordValidity})
		console.log({confirmPasswordValidity})
	}
	const handleLoginLink = () =>{
		navigate('../login')
	}

		useEffect(() =>{
			if (checkValidity){
				if (!fullNameValidity && !emailValidity && !userNameValidity && !passwordValidity && !confirmPasswordValidity) {
					fetchUserDetails()

					navigate("/dashboard")
				}
				setCheckValidity(false)
			}
		},[checkValidity])
	const fetchUserDetails =() =>{
		fetch("https://invoice-api-production-b7bc.up.railway.app/api/v1/signup",{
			method: 'POST',
			headers: {
				...DEFAULT_HEADER,
				},
			body: JSON.stringify({
			   email: email,
			   password: password,
			   name : fullName
			})
		})
		.then((response) => response.json())
		.then((data) => {
			console.log({data})
			userData(data)
		})
		.catch((err) => {
		   console.log(err.message);
		})
	}


	return (
		<div className="signUpMainCtnr">
			<div className="signUpCtnr">
				<header>
					<h2>Create account</h2>
					<p>Send your invoice acreoss the world</p>
				</header>
				{invalidMsg ? <p className="invalidMsg">{invalidMsg}</p> : null}
				<form action="">
					<Input 
		    			required={true}
		    			labelFor={<h5>Full Name *</h5>}
		    			inpurClassName="loginInput"
		    			placeHolder="Enter your full name"
		    			type="text"
		    			propValue={fullName}
		    			updateState={updateName}
		    			inputClassName={fullNameValidity ? "error" : undefined}
		    			errorMsg ={fullNameValidity ? fullNameErrorMsg : ""}/>				
					<Input 
		    			required={true}
		    			labelFor={<h5>Email *</h5>}
		    			inpurClassName="loginInput"
		    			placeHolder="Enter your email"
		    			type="email"
		    			propValue={email}
		    			updateState={updateEmail}
		    			inputClassName={emailValidity? "error": undefined}
		    			errorMsg={emailValidity ? emailErrorMsg : ""}/>
		    		<Input 
		    			required={true}
		    			labelFor={<h5>Username *</h5>}
		    			inpurClassName="loginInput"
		    			placeHolder="Enter your username"
		    			type="text"
		    			propValue={userName}
		    			inputClassName={userNameValidity ? "error" : undefined}
		    			updateState={updateUserName}
		    			errorMsg={userNameValidity ? userNameErrorMsg : ""}/>
		    		<Input 
		    			required={true}
		    			labelFor={<h5>Password *</h5>}
		    			inpurClassName="loginInput"
		    			placeHolder="create a password"
		    			type="password"
		    			propValue={password}
		    			updateState={updatePassword}
		    			inputClassName={passwordValidity ? "error" : undefined}
		    			errorMsg={passwordValidity ? passwordErrorMsg : ""}/>
		    		<Input 
		    			required={true}
		    			labelFor={<h5> Confirm Password *</h5>}
		    			inpurClassName="loginInput"
		    			placeHolder="Confirm password"
		    			type="password"
		    			propValue={confirmPassword}
		    			updateState={updateConfirmPaaword}
		    			inputClassName={confirmPasswordValidity ? "error" : undefined}
		    			errorMsg={confirmPasswordValidity ? confirmPasswordErrorMsg : ""}/>
				</form>
		    	<button type = "submit" onClick={handleSubmit}> Create account</button>
				<span>Already have an account ?<a href="#"onClick={handleLoginLink}> Log in</a></span>
			</div>
			<div className="displayCtnr">
			</div>
		</div>   
	)
}