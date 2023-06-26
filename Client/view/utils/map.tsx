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
  const userLocation = useGeoLocation();

  useEffect(() => {
    const loadKakaoMap = () => {
      return new Promise<void>((resolve) => {
        if (!window.kakao) {
          const script = document.createElement("script");
          script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=584005aa7fee37a3ef459f49ebfc7e70 &autoload=false`;
          script.onload = () => {
            window.kakao.maps.load(() => {
              resolve();
            });
          };
          document.head.appendChild(script);
        } else {
          resolve();
        }
      });
    };

    const initMap = () => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(
          userLocation.coordinates?.lat,
          userLocation.coordinates?.lng
        ),
        level: 3,
      };
      new window.kakao.maps.Map(container, options);
    };

    loadKakaoMap().then(() => {
      initMap();
    });
  }, [userLocation]);
  return (
    <>
      <div id="map" style={{ width: "50vw", height: "50vh" }} />
      <div className="geolocation">
        {userLocation.loaded
          ? JSON.stringify(userLocation.coordinates)
          : "Location data not available yet."}
      </div>
    </>
  );
};

export default MapContainer;
