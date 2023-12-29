import React, { useState } from 'react';
import {ThemeContext, themes} from "../ThemeContext.js"
import {RiMoonFill} from "react-icons/ri"
import {RiSunFill} from "react-icons/ri"
import { Auth} from '../assets/Auth';
import {BiLogOut} from "react-icons/bi"
import {useNavigate} from "react-router-dom"
// import { RiMenuFill } from 'react-icons/ri';
import './styles.scss';
import "./Reponsive.scss"
import { useContext } from 'react';


export const SideMenu = (props) =>{
		const {
			darkMode,
			updateDarkMode
		} = props
		const [userMenuBool, setUserMenuBool] =useState(false)
		const [sideMenuWidth, setSideMenuWidth] = useState(70)
		console.log(JSON.parse(localStorage.getItem("user")))
		const {user} = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : useContext(Auth)
		console.log({user})
		const {dispatch} = useContext(Auth)
		const navigate = useNavigate()

		const handleUserMenu = () =>{
			setUserMenuBool(!userMenuBool)
			if (userMenuBool) {
				setSideMenuWidth(70)
			}
			else {
				setSideMenuWidth(190)
			}
		}
		function handleUserMenuFn(args){
			setUserMenuBool(args)
			setSideMenuWidth(70)
		}
		    const logout =() =>{
        dispatch({type: "LOGOUT", payload: null})
        navigate("/login")
        handleUserMenuFn(false)
    }
		return(
		  	<div className="sideMenu" >
		    	<div className='sideBar1'>
		    						{/*<RiMenuFill className='menuIcon' onClick={handleUserMenu}/>*/}
		    						<BiLogOut className="logoutIcon" onClick={logout}/>
		    						<div className="avatarCtnr">
		    							<ThemeContext.Consumer>
		    								{({changeTheme}) =>(
		    									<i onClick={() => {
		    										updateDarkMode(!darkMode)
		    										changeTheme(darkMode ? themes.light : themes.dark)
		    									}}
		    									>{darkMode ? <RiSunFill className="themeIcon"> </RiSunFill> : <RiMoonFill className="themeIcon"></RiMoonFill>}
		    								</i>
		    								)}
		    							</ThemeContext.Consumer> 
		    							<div className="avatar" >
		    							</div>
		    							<span className='usernameSpan'>{user? user.name : null}</span>
		    				    	</div>
		    					</div>
		    		
			</div>
		)
	}


	// function Layout({ children }) {
	// 	return (
	// 		<div className='dashboard-layout'>
	// 			<SideMenu />
	// 			<div style={{ maxWidth: 900, marginLeft: 'auto', marginRight: 'auto', marginTop: '3rem'}}>
	// 				{children}
	// 			</div>
	// 		</div>
	// 	)
	// }