import React, { useEffect, useState,useContext } from "react";
import { AuthContext } from "./trafficCongestionContext";



function getCurrentPosition() {
  const {userCurrentLocation,setUserCurrentLocation}= useContext(AuthContext)    

  useEffect(() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserCurrentLocation(position.coords);
            // console.log(position.coords.latitude, position.coords.longitude);
            // console.log("1. 최초 위치 불러옴");
          },
          (error) => {
            console.log(error);
          },
          {
            enableHighAccuracy: true,
          }
        );
        return () => {
          userCurrentLocation;
        };
      } else {
        console.log("사용자 환경이 위치 정보를 제공하지 않습니다.");
      }

  }, []);
};

export default getCurrentPosition;
