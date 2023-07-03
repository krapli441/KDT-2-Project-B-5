// 리액트 라이브러리
import React, { useState, useEffect } from "react";

// 외부 라이브러리
import { Box } from "@chakra-ui/react";

// 리액트 컴포넌트
import SampleData from "./getTrafficSampleData";
import MusicController from "../view/fragments/musicController";
import NavigationController from "../view/fragments/navgiationController";
import "@dotlottie/player-component";

declare global {
  interface Window {
    Tmapv3: any;
  }
}

const MapContainer: React.FC = () => {
  const [userCurrentLocation, setUserCurrentLocation] =
    useState<GeolocationCoordinates | null>(null);
  const [userRealTimeLocation, setUserRealTimeLocation] =
    useState<GeolocationCoordinates | null>(null);
  const [map, setMap] = useState<any>(null);
  const [polyLineArr, setPolyLineArr] = useState<any[]>([]);
  const [marker, setMarker] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // * currentPosition으로 1차적으로 위치 정보 수집
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCurrentLocation(position.coords);
          console.log(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
        }
      );

      return () => {
        userCurrentLocation;
      };
    } else {
      console.log("사용자 환경이 위치 정보를 제공하지 않습니다.");
    }
  }, []);

  // * currentPosition으로 가져온 정보를 토대로 tMap 지도 생성
  useEffect(() => {
    if (userCurrentLocation) {
      function generateMap() {
        const map = new window.Tmapv3.Map("tMapContainer", {
          width: "100%",
          height: "100%",
          zoom: 15,
        });
        return { map, marker };
      }

      const map = generateMap();
      setMap(map);
      setIsLoading(false);
    }
  }, [userCurrentLocation]);

  // * 지도가 생성되었을 경우 currentPosition 정보를 토대로 마커 생성
  useEffect(() => {
    if (map && userCurrentLocation) {
      const centerLatLng = new window.Tmapv3.LatLng(
        userCurrentLocation.latitude,
        userCurrentLocation.longitude
      );
      map.setCenter(centerLatLng);

      if (marker) {
        marker.setPosition(centerLatLng);
      }
    }
  }, [map, userCurrentLocation]);

  // * 지도와 마커가 생성되었을 경우 watchPosition 메서드를 실행
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setUserRealTimeLocation(position.coords);
          console.log(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.log("사용자 환경이 위치 정보를 제공하지 않습니다.");
    }
  }, [map, userCurrentLocation]);

  // * watchPosition으로 가져온 위치 정보를 토대로 marker 포지션 재설정
  useEffect(() => {
    if (map && userRealTimeLocation) {
      const centerLatLng = new window.Tmapv3.LatLng(
        userRealTimeLocation?.latitude,
        userRealTimeLocation?.longitude
      );
      map.setCenter(centerLatLng);

      if (marker) {
        // 기존 마커 객체 제거
        marker.setMap(null);
      }

      // 새로운 마커 객체 생성 및 설정
      const newMarker = new window.Tmapv3.Marker({
        position: centerLatLng,
        map: map,
      });

      setMarker(newMarker);
    }
  }, [map, marker, userRealTimeLocation]);

  if (isLoading) {
    // 로딩 중인 경우 로딩 애니메이션을 표시
    return (
      <Box className="loadingScreen">
        <dotlottie-player
          src="https://lottie.host/3e0f94d0-2b5e-49a9-84bd-337295601c79/V27sRE6Xah.lottie"
          autoplay
          loop
          style={{ width: "100%", height: "100%" }}
        />
      </Box>
    );
  }

  return (
    <>
      <Box
        id="tMapContainer"
        width={"100%"}
        height={"100%"}
        position={"sticky"}
      ></Box>

      <Box
        className="navigationBar"
        display={"flex"}
        flexDirection={"column"}
        width={"100%"}
        height={"20%"}
        fontSize={"24px"}
        backgroundColor={"#21325E"}
        borderRadius={"10% 10% 0% 0%;"}
      >
        <MusicController />
        <NavigationController />
      </Box>
    </>
  );
};

export default MapContainer;
