import React, { useState } from 'react';
import {ThemeContextWrapper} from "../ThemeContextWrapper"
import {ThemeContext, themes} from "../ThemeContext.js"
import {RiMoonFill} from "react-icons/ri"
import {RiSunFill} from "react-icons/ri"
import { Auth} from '../assets/Auth';
import { RiMenuFill } from 'react-icons/ri';
import './styles.scss';
import { useContext } from 'react';
import { UserMenu } from './userMenu/userMenu';


export const SideMenu = (props) =>{
		const {
			darkMode,
			updateDarkMode
		} = props
		const [userMenuBool, setUserMenuBool] =useState(false)
		console.log(JSON.parse(localStorage.getItem("user")))
		const {user} = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")) : useContext(Auth)
		console.log({user})

		const handleUserMenu = () =>{
			setUserMenuBool(!userMenuBool)
		}
		function handleUserMenuFn(args){
			setUserMenuBool(args)
		}
		return(
		  	<div className="sideMenu">
		    	<div className='sideBar1'>
					<RiMenuFill className='menuIcon' onClick={handleUserMenu}/>
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
				<UserMenu userMenuBool={userMenuBool} handleUserMenu={handleUserMenuFn} />
			</div>
		)
	}