import React, { useState, useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import {Button} from "../Button/Button"
import {UseIdle} from "../UseIdle";
import {Auth} from "../Auth";
import  Dayjs  from "dayjs";
import './styles.scss';
import { IoFlash } from "react-icons/io5";




export const SessionTimer =(props) =>{


  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true)
  const [remainingTime, setRemainingTime] = useState(10);
  const {dispatch, user} = useContext(Auth)
  const localUser = JSON.parse(localStorage.getItem("user"))
console.log({user})
console.log({localUser})

  const events =["click", "load", "keydown", "scroll"]
  const eventHandler =(eventType) =>{
    if (eventType) {
      setIsActive(true)
    }
    else {
        setIsActive(false)
    }
  }
  const addEvents = () =>{
    events.forEach((eventName) => {
      window.addEventListener(eventName,eventHandler)
    })
  }
  const removeEvents = () =>{
    events.forEach((eventName) => {
      window.removeEventListener(eventName,eventHandler)
    })
  }

  const handleIdle = () => {
    setIsActive(false)
    setRemainingTime(10); //set 15 seconds as time remaining
  };

  const { isIdle,getLastActiveTime} = UseIdle({ onIdle: handleIdle, idleTime: 3});
  console.log({remainingTime})
  let lastActiveTime = getLastActiveTime()
  localStorage.setItem("lastActiveTime",lastActiveTime)
  console.log({lastActiveTime})


  useEffect(() =>{
    if(user ==null && localUser == null){
      navigate("/login")
    }
           let currentTime = Dayjs()
        let lastActiveTime = Dayjs(localStorage.getItem("lastActiveTime")).format()
        console.log({lastActiveTime})
        console.log({currentTime})
        let diff = currentTime.diff(lastActiveTime,"second")  
        console.log({diff})
        if (diff == 250){
          setRemainingTime(0)
        }
    addEvents()

    return(() => {
        removeEvents()
    })
},[])
  useEffect(() => {
    let interval;

    if (isIdle && isActive== false) {
      interval = setInterval(() => {
        let currentTime = Dayjs()
        let lastActiveTime = Dayjs(localStorage.getItem("lastActiveTime")).format()
        console.log({lastActiveTime})
        console.log({currentTime})
        let diff = currentTime.diff(lastActiveTime,"second")  
        console.log({diff})
        if (diff == 250){
          setRemainingTime(0)
          setIsActive(true)
        }
      }, 1000);
    }

    if (remainingTime === 0) {
      // alert("Time out!");
      // setShowModal(false)
      removeEvents()
      dispatch({type: "LOGOUT", payload: null})

    }

    return () => {
      clearInterval(interval);
    };
  }, [isIdle,isActive,remainingTime, navigate]);


 // this is responsoble for logging user out after timer is down to zero and they have not clicked anything

const handleLogout =() =>{
  navigate("/login")
}
const LogoutModal = () => {
  return(
    <div className="LogoutModal">
      <div className="logoutCtnr">
        <h3>Session Timeout</h3>
        <span>kindly login again to continue</span>
        <Button type="button" onClick={handleLogout} className="logoutBtn" displayWord="Ok"/>
      </div>
    </div>)
}

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  return (
    <>
     {props.children}
     {remainingTime ==0 ? <LogoutModal /> : null}
    </>
  );
}
