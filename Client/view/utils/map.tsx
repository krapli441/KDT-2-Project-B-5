// 리액트 라이브러리
import React, { useEffect } from "react";

// 리액트 컴포넌트
import LocationComponent from "../component/userLocation";

// 카카오 지도 타입 선언
declare global {
  interface Window {
    kakao: any;
  }
}
const MapContainer = () => {
  useEffect(() => {
    const container = document.getElementById("map");
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=584005aa7fee37a3ef459f49ebfc7e70&autoload=false`;
    document.head.appendChild(script);
    script.onload = () => {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(36.3016838, 127.3789012),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options); // 지도 생성

        // 지도에 교통정보를 표시하도록 지도타입을 추가합니다
        map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC);
        let marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(36.3016838, 127.3789012), // 마커의 좌표
          map: map, // 마커를 표시할 지도 객체
        });
      });
    };
  }, []);
  return (
    <>
      <div id="map" style={{ width: "50vw", height: "50vh" }} />
      <LocationComponent />
    </>
  );
};
export default MapContainer;
