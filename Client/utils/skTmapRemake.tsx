// 리액트 라이브러리
import React, { useState, useEffect } from "react";

// 리액트 컴포넌트
import LocationComponent from "./getUserLocation";

declare global {
  interface Window {
    Tmapv3: any;
  }
}

let appKey = "4AfhmXH1W616IshxuKXD27orRe3ufLzD4EHChwyV";
let centerLon = 127.3789012;
let centerLat = 36.3016838;

let requestURI = `https://apis.openapi.sk.com/tmap/traffic?version=1&format=json&reqCoordType=WGS84GEO&resCoordType=EPSG3857&zoomLevel=1&trafficType=AROUND&radius=3&centorLon=${centerLon}&centerLat=${centerLat}&appKey=${appKey}`;

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

  // 교통 정보 데이터를 받아오는 로직
  fetch(requestURI, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("교통 정보 데이터를 가져오는 중 오류가 발생했습니다.");
      }
      return response.json();
    })
    .then((data) => {
      // 데이터 처리
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });

  // * SK open API를 사용하여 맵을 생성하는 useEffect 훅
  // * 윗단 useEffect로 사용자 정보를 가져올 경우 실행된다

  useEffect(() => {
    if (userLocation) {
      function generateMap() {
        let map = new window.Tmapv3.Map("TmapApp", {
          center: new window.Tmapv3.LatLng(
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
