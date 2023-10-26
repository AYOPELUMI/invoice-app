import React, { useEffect, useState } from 'react';
import "./style.scss"
import{BiSolidChevronLeft} from "react-icons/bi"
import PropTypes from 'prop-types';

export const UserMenu = props => {
    const {
        userMenuBool,
        handleUserMenu
    } = props
    const [left, setLeft] =useState(-200)
    const [opacity, setOpacity] = useState(0)
    useEffect(()=>{
        if (userMenuBool) {
            setLeft(0)
            setOpacity(1)
        }
        else{
            setLeft(-200)
            setOpacity(0)
        }
        
    },[userMenuBool])
    const handleIconClick =() =>{
        handleUserMenu(false)
    }
    return (
        <div className='userMenuCtnr' style={{
            left: left +"%",
            opacity : opacity
        }}>
            <BiSolidChevronLeft className="goBackIcon" onClick={handleIconClick}/>
        </div>
    )
};
