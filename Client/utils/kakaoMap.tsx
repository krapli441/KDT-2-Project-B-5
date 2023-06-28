// 리액트 라이브러리
import React, { useState, useEffect } from "react";

// 리액트 컴포넌트
import LocationComponent from "./getUserLocation";

// 카카오 지도 타입 선언
declare global {
  interface Window {
    kakao: any;
  }
}

// 카카오 지도를 생성하는 로직
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

  // * 카카오 지도 API를 이용하여 맵을 생성하는 useEffect 훅
  useEffect(() => {
    if (userLocation) {
      const container = document.getElementById("kakaoMap");

      const script = document.createElement("script");
      script.async = true;
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=584005aa7fee37a3ef459f49ebfc7e70&autoload=false`;
      document.head.appendChild(script);

      script.onload = () => {
        window.kakao.maps.load(() => {
          const options = {
            center: new window.kakao.maps.LatLng(
              userLocation.latitude,
              userLocation.longitude
            ),
            level: 3,
          };
          const map = new window.kakao.maps.Map(container, options);
          map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC);
          let marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(
              userLocation.latitude,
              userLocation.longitude
            ),
            map: map,
          });
        });
      };
    }
  }, [userLocation]);

  return (
    <>
      <div id="kakaoMap" style={{ width: "100vw", height: "100vh" }} />
    </>
  );
};

export default MapContainer;
