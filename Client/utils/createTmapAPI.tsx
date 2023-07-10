// 리액트 라이브러리
import React, { useState, useEffect, useRef, useContext } from "react";

// 외부 라이브러리
import { Box, position } from "@chakra-ui/react";

// 리액트 컴포넌트
import TrafficPointData from "./getTrafficPointData";
import { AuthContext } from "./trafficCongestionContext";
import VideoPlayer from "../view/pages/youtubePlayer/youtubePlayer";
import Header from "../view/fragments/header";

// 모듈
import getDistance from "./getDistance";

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
  const [marker, setMarker] = useState<any>(null);
  const [isMapReady, setMapReady] = useState(true);
  const markerRef = useRef<any>(null);
  const { congestion, setCongestion } = useContext(AuthContext);
  const { color, setColor } = useContext(AuthContext);
  const prevPosition = useRef<GeolocationCoordinates | null>(null);

  // * currentPosition으로 1차적으로 위치 정보 수집
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCurrentLocation(position.coords);
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

  useEffect(() => {
    console.log("사용자의 currentPosition 좌표 : ", userCurrentLocation);
  }, [userCurrentLocation]);

  // * currentPosition으로 가져온 정보를 토대로 티맵 지도 생성

  useEffect(() => {
    if (userCurrentLocation) {
      const checkTmapv3Loaded = () => {
        if (window.Tmapv3) {
          return true;
        } else {
          setTimeout(checkTmapv3Loaded, 1);
        }
      };

      const generateMap = () => {
        const map = new window.Tmapv3.Map("tMapContainer", {
          width: "100%",
          height: "70%",
          zoom: 15,
        });
        return { map };
      };
      const isTmapv3Loaded = checkTmapv3Loaded();

      if (isTmapv3Loaded) {
        const { map } = generateMap();
        setMap(map), setMapReady(false);
      }
    }
  }, [userCurrentLocation]);

  return (
    <>
      <>
        {!isMapReady && <Header />}
        <Box id="tMapContainer" position={"sticky"}>
          {isMapReady && (
            <dotlottie-player
              src="https://lottie.host/21edb5c7-0e2f-41fe-bd21-12a0c246b066/0ajUoSiKvd.json"
              autoplay
              loop
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </Box>
        {!isMapReady && (
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
            {/* 현재 혼잡도 : {congestion} */}
            <VideoPlayer />
            {/* <MusicController />
            <NavigationController /> */}
          </Box>
        )}
      </>
    </>
  );
};

export default MapContainer;
