// 리액트 라이브러리
import React, { useState, useEffect } from "react";

// 리액트 컴포넌트
import LocationComponent from "./getUserLocation";

declare global {
  interface Window {
    Tmapv2: any;
  }
}

const MapContainer: React.FC = () => {
  const [userLocation, setUserLocation] =
    useState<GeolocationCoordinates | null>(null);

  // * 사용자 위치 정보를 가져오는 useEffect

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords);
        },
        (error) => {
          console.log("사용자 위치 정보를 가져오는데 실패했습니다.");
        },
        {
          enableHighAccuracy: true,
        }
      );
    } else {
      console.log("사용자 환경이 위치 정보를 제공하지 않습니다.");
    }
  }, []);

  // * SK open API를 사용하여 맵을 생성하는 useEffect 훅
  // * 윗단 useEffect로 사용자 정보를 가져올 경우 실행된다

  useEffect(() => {
    if (userLocation) {
      // const script = document.createElement("script");
      // script.src =
      //   "https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=4AfhmXH1W616IshxuKXD27orRe3ufLzD4EHChwyV";
      function generateMap() {
        let map = new window.Tmapv2.Map("TmapApp", {
          center: new window.Tmapv2.LatLng(
            userLocation?.latitude,
            userLocation?.longitude
          ),
          width: "100%",
          height: "100%",
          zoom: 15,
        });
      }
      generateMap();
    }
  }, [userLocation]);

  return (
    <div
      id="TmapApp"
      style={{
        height: "403px",
        width: "936px",
      }}
    ></div>
  );
};

export default MapContainer;
