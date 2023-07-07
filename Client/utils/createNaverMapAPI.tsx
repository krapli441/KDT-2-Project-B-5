// 리액트 라이브러리
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

// 리액트 컴포넌트
// import LocationComponent from "./getUserLocation";

// 네이버 지도 타입 선언
declare global {
  interface Window {
    naver: any;
  }
}

// 네이버 지도를 생성하는 로직
const MapContainer: React.FC = () => {
  const [userLocation, setUserLocation] =
    useState<GeolocationCoordinates | null>(null);

  // * 사용자 위치 정보를 가져오는 useEffect 훅
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords);
        },
        (error) => {
          console.log("사용자 위치 정보를 가져오는데 실패했습니다.", error);
        },
        {
          enableHighAccuracy: true,
        }
      );
    } else {
      console.log("사용자 환경이 위치 정보를 제공하지 않습니다.");
    }
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=9wujphq98b&submodules=geocoder";
    document.head.appendChild(script);

    script.onload = () => {
      const map = new window.naver.maps.Map("naverMap", {
        center: new window.naver.maps.LatLng(
          userLocation?.latitude,
          userLocation?.longitude
        ),
        zoom: 15,
      });
      let marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(
          userLocation?.latitude,
          userLocation?.longitude
        ),
        map: map,
      });
    };
  }, [userLocation]);

  return (
    <>
      <Helmet>
        <script src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=9wujphq98b&submodules=geocoder"></script>
      </Helmet>
      <div id="naverMap" style={{ width: "100vw", height: "100vh" }} />
    </>
  );
};

export default MapContainer;
