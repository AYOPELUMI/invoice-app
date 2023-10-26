import React, { useEffect, useState,useContext } from 'react';
import "./style.scss"
import{BiSolidChevronLeft, BiLogOut} from "react-icons/bi"
import PropTypes from 'prop-types';
import {Auth} from "../../assets/Auth"
import { useNavigate } from 'react-router-dom';

export const UserMenu = props => {
    const {
        userMenuBool,
        handleUserMenu
    } = props
    const {dispatch} = useContext(Auth)
    const Navigate = useNavigate()

    console.log({dispatch})
    const [left, setLeft] =useState(-300)
    const [opacity, setOpacity] = useState(0)
    useEffect(()=>{
        if (userMenuBool) {
            setLeft(0)
            setOpacity(1)
        }
        else{
            setLeft(-300)
            setOpacity(0)
        }
        
    },[userMenuBool])
    const handleIconClick =() =>{
        handleUserMenu(false)
    }
    const logout =() =>{
        dispatch({type: "LOGOUT", payload: null})
        Navigate("/login")
        handleUserMenu(false)
    }
    return (
        <div className='userMenuCtnr' style={{
            left: left +"%",
            opacity : opacity
        }}>
            <BiSolidChevronLeft className="goBackIcon" onClick={handleIconClick}/>

            <span onClick={logout}>
            <BiLogOut className='logoutIcon'  />
            <a>Log out</a>
            </span>
        </div>
    )
};
