// 리액트 라이브러리
import React, { useState, useEffect } from "react";

// 리액트 컴포넌트
import LocationComponent from "./getUserLocation";

// 카카오 지도 타입 선언
declare global {
  interface Window {
    tMap: any;
  }
}

// 카카오 지도를 생성하는 로직
const MapContainer: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=발급받은 App key";

    // 스크립트 로드 완료 시 실행되는 이벤트 핸들러
    script.onload = () => {
      initTmap();
    };

    document.head.appendChild(script);
  }, []);

  // Tmapv2를 사용하여 지도 초기화 함수
  const initTmap = () => {
    const map = new window.tMap.Map("map_div", {
      center: new window.tMap.LatLng(37.566481622437934, 126.98502302169841), // 지도 초기 좌표
      width: "890px",
      height: "400px",
      zoom: 15,
    });
  };

  return <div id="map_div" style={{ width: "890px", height: "400px" }}></div>;
};

export default MapContainer;
