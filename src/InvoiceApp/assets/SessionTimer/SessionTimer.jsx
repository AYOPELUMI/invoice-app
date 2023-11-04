import React, { useState, useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import {Button} from "../Button/Button"
import {UseIdle} from "../UseIdle";
import {Auth} from "../Auth";
import './styles.scss';




export const SessionTimer =(props) =>{


  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(10);
  const {dispatch} = useContext(Auth)

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
    setIsActive(false); //show modal
    setRemainingTime(10); //set 15 seconds as time remaining
  };

  const { isIdle } = UseIdle({ onIdle: handleIdle, idleTime: 3});

useEffect(() =>{
    addEvents()

    return(() => {
        removeEvents()
    })
},[])
  useEffect(() => {
    let interval;

    if (isIdle && isActive == false) {
      interval = setInterval(() => {
        setRemainingTime(
          (prevRemainingTime) =>
            prevRemainingTime > 0 ? prevRemainingTime - 1 : 0 //reduces the second by 1
        );
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isIdle, isActive]);
  console.log({remainingTime})
  console.log({isIdle})

  useEffect(() => {
    if (remainingTime === 0) {
      // alert("Time out!");
      // setShowModal(false)
        removeEvents()
  dispatch({type: "LOGOUT", payload: null})

    }
  }, [remainingTime, isActive, navigate]); // this is responsoble for logging user out after timer is down to zero and they have not clicked anything

const handleLogout =() =>{
  navigate("/login")
  dispatch({type: "LOGOUT", payload: null})

}
const LogoutModal = () => {
  return(
    <div className="LogoutModal">
      <div className="logoutCtnr">
        <h3>Session Timeout</h3>
        <span>kindly login again to continue</span>
        <Button type="button" propsOnClick={handleLogout} propsClassName="logoutBtn" displayWord="Ok"/>
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
