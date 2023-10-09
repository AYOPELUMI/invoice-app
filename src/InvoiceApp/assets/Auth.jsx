import {createContext, useState, useEffect, useReducer} from "react"

export const Auth = createContext()
const  reducer = (state, action) =>  {
	switch (action.type) {
		case "LOGIN":
			return { user: action.payload};

		case "LOGOUT":
			localStorage.removeItem("user");
			return {user :null};

		default:
			break;
	}
}

export const AuthProvider =({children}) =>{
	const [state, dispatch] = useReducer(reducer,{
		user: null,
	})

	useEffect(() => {
		const user =JSON.parse(localStorage.getItem("user"))
			console.log({user})
		if (user) {
			return dispatch({type: "LOGIN", payload:user})
		}
	},[])
	return(
		<Auth.Provider value={{...state, dispatch}}>
			{children}
		</Auth.Provider>
	)
}