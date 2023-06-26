// 리액트 라이브러리
import React, { useEffect } from "react";

// 리액트 컴포넌트
import useGeoLocation from "./geolocation";

// ...import 문 생략...

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
          script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_JAVASCRIPT_KEY&autoload=false`;
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

    const requestLocationPermission = () => {
      return new Promise<boolean>((resolve) => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            () => {
              resolve(true); // 위치 정보 권한이 허용된 경우
            },
            () => {
              resolve(false); // 위치 정보 권한이 거부된 경우
            }
          );
        } else {
          resolve(false); // 위치 정보를 지원하지 않는 경우
        }
      });
    };

    const handleLocationPermission = async () => {
      const granted = await requestLocationPermission();
      if (granted) {
        loadKakaoMap().then(() => {
          initMap();
        });
      } else {
        console.log("Location permission denied.");
      }
    };

    handleLocationPermission();
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
