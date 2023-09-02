import {useState, useffect} from 'react';
import {Input} from "../assets/Input"
import {FcGoogle} from "react-icons/fc"
import userData from "../assets/userData.json"
import{useNavigate} from "react-router-dom"
import './styles.scss';


export const LoginPage = props => {

    const {
        getUserData
    } = props

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorValidity, setErrorValidity] = useState(undefined)
    const [errorMsg, setErrorMsg] = useState(" ")
    const navigate = useNavigate()
    
    const fetchUserDetails =() =>{
        fetch("https://invoice-api-production-b7bc.up.railway.app/api/v1/login",{
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
           setErrorMsg(data.message)
           setErrorValidity(false)

            }
            else {
                getUserData(data)
                setErrorMsg("login successful")
                setErrorValidity(true)
                let currentTime = Date.now()
                console.log({currentTime})
                localStorage.setItem("activeTime", 300)
                localStorage.setItem("lastActivity", currentTime)
                navigate("../dashboard")
            }
        })
        .catch((err) => {
           console.log(err.message);
           setErrorMsg("newtwirk unavailable")

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
        fetchUserDetails()
        // let error = false
        // let errMsg = "incorrect email or password"
        // for (var i = 0; i < userData.length; i++) {
        //     if (email == userData[i].email && password == userData[i].password){
        //         getUserData(userData[i])
        //         error = true
        //         errMsg = ""
        //         navigate("/dashboard")
        //         break
        //     }
        // }
        // setErrorValidity(error)
        // setErrorMsg(errMsg)
    }
    if(errorValidity){
    }
    const handleSignUpLink = () =>{
        navigate("../signUp")
    }

    return (
        <div className="loginMainCtnr">
        	<div className="loginCtnr">
        		<header>
        			<h2>Title</h2>
        			<h2>Form</h2>
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
                            labelFor={<h5>Email *</h5>}
                            inpurClassName="loginInput"
                            placeHolder="Enter your email"
                            type="email"
                            propValue={email}
                            updateState={updateEmail}
                            inputClassName={errorValidity ? undefined : errorValidity == false ?"error" : undefined}
                            errorMsg={!errorValidity ? "" : " "}
                        />
    	    			<Input 
                            required={true}
                            labelFor={<h5>Password *</h5>}
                            inpurClassName="loginInput"
                            placeHolder="Password"
                            type="password"
                            propValue={password}
                            updateState={updatePassword}
                            inputClassName={errorValidity ? undefined : errorValidity == false ?"error" : errorValidity == null ? undefined : undefined}
                        />
    	    			<p className="resetPasswordLink">Forgot password</p>
        			</div>
        			<button type="button" onClick={handleSubmit}>log in</button>
        		</form>
        		<span>Don't have an account ?<a href="#" onClick={handleSignUpLink}> Sign up</a></span>
        	</div>
        	<div className="displayCntr">
        		<div>
        			<a href="#" onClick={handleSignUpLink}>Sign Up</a>
        		</div>
        	</div>
        </div>
    )
}