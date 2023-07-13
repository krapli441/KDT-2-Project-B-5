import React, { useEffect, useState,useContext } from "react";
import { AuthContext } from "./trafficCongestionContext";



function getCurrentPosition() {
    const {userCurrentLocation,setUserCurrentLocation}= useContext(AuthContext)     
      return new Promise((resolve,reject)=>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(position.coords)
            reject("error")
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
        }
      })
         
};

export default getCurrentPosition;
