
import React, { useContext, useState } from "react";
import { useIdleTimer } from "react-idle-timer";

export function UseIdle({ onIdle, idleTime }) {
  const [isIdle, setIsIdle] = useState(null);

  //handles what happens when the user is idle
  const handleOnIdle = (event) => {
      console.log({event})
    setIsIdle(true); //set the state to true
    const currentTime = new Date();
    const formattedCurrentTime = currentTime.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    });

    console.log("user is idle", event); //log the user is idle followed by the event
    console.log("Last Active time", getLastActiveTime()); // you the log the time the user was last active
    localStorage.setItem("lastActiveItem",getLastActiveTime())
    console.log("Current time", formattedCurrentTime); //gets the curent time maybe to see what
    localStorage.setItem("current Time",formattedCurrentTime)
    onIdle(); //then call onIdle function
  };

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * idleTime,
    onIdle: handleOnIdle,
    debounce: 500,
  });
  return {
    getRemainingTime,
    getLastActiveTime,
    isIdle,
  }
}
