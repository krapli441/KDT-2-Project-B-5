// 리액트 라이브러리
import React, { useEffect } from "react";

// 리액트 컴포넌트
import useGeoLocation from "./geolocation";

declare global {
  interface Window {
    kakao: any;
  }
}
const MapContainer = () => {
  const location = useGeoLocation();
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
        new window.kakao.maps.Map(container, options);
      });
    };
  }, []);
  return (
    <>
      <div id="map" style={{ width: "50vw", height: "50vh" }} />
      <div className="geolocation">
        {location.loaded
          ? JSON.stringify(location)
          : "Location data not available yet."}
      </div>
    </>
  );
};
export default MapContainer;
