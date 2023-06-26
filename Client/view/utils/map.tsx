import React, { useEffect } from "react";
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
        new window.kakao.maps.Map(container, options);
      });
    };
  }, []);
  return <div id="map" style={{ width: "100vw", height: "100vh" }} />;
};
export default MapContainer;
