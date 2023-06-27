// 리액트 라이브러리
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

// 리액트 컴포넌트
import LocationComponent from "./getUserLocation";

// 네이버 지도 타입 선언
declare global {
  interface Window {
    naver: any;
  }
}

const MapContainer = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=qGdB41Ygrom686bqIH1TBDaBgwBlIdp7VwAjy3RN&submodules=geocoder`;
    document.head.appendChild(script);

    script.onload = () => {
      const map = new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(37.123, 127, 456),
        zoom: 10,
      });
    };
  }, []);

  return (
    <>
      <Helmet>
        <script src="`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=qGdB41Ygrom686bqIH1TBDaBgwBlIdp7VwAjy3RN&submodules=geocoder`"></script>
      </Helmet>
      <div id="map" style={{ width: "50vw", height: "50vh" }} />
    </>
  );
};

export default MapContainer;
