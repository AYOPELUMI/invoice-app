import {redirect, useNavigate} from "react-router-dom"
import {useEffect} from "react"

export function RedirectToDashboard(){
	const navigate =useNavigate()
	useEffect(() =>{
		console.log("i am here")
		navigate("/dashboard")
	},[])
	return null
}