import {useState, useEffect, useContext} from 'react';
import {Input} from "../assets/Input"
import { Button } from '../assets/Button/Button';
import{useNavigate} from "react-router-dom"
import toast ,{Toaster} from "react-hot-toast"
import {Auth} from "../assets/Auth"

import './styles.scss';
import apiFetch from '../../apiFetch';


export const LoginPage = props => {
    const {
        getUserData,
        lastLocation
    } = props

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorValidity, setErrorValidity] = useState(undefined)
    const [isLoading, setIsloading] = useState(false)
    const [errorMsg, setErrorMsg] = useState(" ")
    const navigate = useNavigate()
    const {dispatch} = useContext(Auth)
    console.log({dispatch})
    console.log(localStorage.getItem("user"))
    useEffect(() =>{
        localStorage.removeItem("user")
        dispatch({type: "LOGOUT", payload: null})
    },[])
    console.log({email})
    console.log({password})
    const fetchUserDetails =() =>{
        setIsloading(true)
        console.log(localStorage.getItem("user"))
      return apiFetch("/login",{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
               email: email,
               password: password
            })
        })
        .then((response) => response.json())
        .then((data) => {
            console.log({data})
            if (!data.user) {
                if (data.errors) {
                    setErrorMsg(data.errors[0])
                    toast.error(data.errors[0])
                }
                else{
                    setErrorMsg(data.message)
                    toast.error(data.message)
                }
                setErrorValidity(false)
                 setIsloading(false)
            }
            else {
                setErrorMsg("login successful")
                toast.success("login successful")
                setErrorValidity(true)
                localStorage.setItem("user",JSON.stringify(data))
                dispatch({type: "LOGIN", payload: data})
               let lastLocationFromLocal = localStorage.getItem("lastLocation")
               setIsloading(false)
               console.log({lastLocation})
               console.log({lastLocationFromLocal})
                let locationRecord = lastLocation ? lastLocation : lastLocationFromLocal 
                setTimeout(() => {
                    console.log({locationRecord})
                    // getUserData(data)
                    if (locationRecord == null || locationRecord == undefined) {
                        // if (data.user) {
                        console.log("going to dashboard")
                        navigate("/dashboard")
                    }
                    else{
                        console.log("going thru else statement")
                        console.log({lastLocation})
                        navigate(locationRecord)
                    }
                  toast.dismiss()
                }, 2000)
            }
        })
        .catch((err) => {
           console.log(err.message);
           setErrorMsg("network unavailable")
           setErrorValidity(false)
           toast.error("metwork unavailable")
            setIsloading(false)
        })
    }

    function updateEmail (args) {
        setEmail(args)
        setErrorValidity(undefined)
        setErrorMsg("")
    }
    function updatePassword (args) {
        setPassword(args)
        setErrorValidity(undefined)
        setErrorMsg("")
    }
    const handleSubmit =() =>{
        if (!setErrorValidity) {
            setErrorValidity(true)
            setErrorMsg("")
        }
        if (isNaN(email) && password.length != 0){
            fetchUserDetails()
            toast.dismiss()
        }
        else{
            setErrorMsg("invalid input")
            setErrorValidity(false)
        }
    }
    if(errorValidity){
    }
    const handleSignUpLink = () =>{
        navigate("/signUp")
    }


    return (
        <div className="loginMainCtnr">
        	<div className="loginCtnr">
                <Toaster />          
        		<header>
        			<h2>Title</h2>
        			<h2>Form</h2 >
        		</header>
        		<form action="" >
        			<div className="formDiv">
        				<h2>Hi! There</h2>
        				<p>Welcome to something</p>
        			</div>
                    <p className={errorValidity ? "msgSuccess" : errorValidity == false ? "msgInvalid" : null}>{errorMsg}</p>
        			<div className="formDiv">
    	    			<Input 
                            required={true}
                            labelFor={<h5>Email <span>*</span></h5>}
                            placeHolder="Enter your email"
                            type="email"
                            propValue={email}
                            updateState={updateEmail}
                            inputClassName={errorValidity ? undefined : errorValidity == false ?"error" : undefined}
                            errorMsg={!errorValidity ? "" : " "}
                        />
    	    			<Input 
                            required={true}
                            labelFor={<h5>Password <span>*</span></h5>}
                            placeHolder="Password"
                            type="password"
                            propValue={password}
                            updateState={updatePassword}
                            inputClassName={errorValidity ? undefined : errorValidity == false ?"error" : errorValidity == null ? undefined : undefined}
                        />
    	    			<p className="resetPasswordLink">Forgot password</p>
        			</div>
        			<Button propsType="button" propsOnClick={handleSubmit} propsDisabled={isLoading} >{isLoading ? <i className="loadingIcon"> </i> : "log in"}</Button>
        		</form>
        		<span>Don't have an account ?<a onClick={handleSignUpLink}> Sign up</a></span>
        	</div>
        	<div className="displayCntr">
        		<div>
        			<a onClick={handleSignUpLink}>Sign Up</a>
        		</div>
        	</div>
        </div>
    )
}