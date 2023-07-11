// 리액트 라이브러리
import React, { useState, useEffect, useRef, useContext } from "react";

// 외부 라이브러리
import { Box } from "@chakra-ui/react";

// 리액트 컴포넌트
import YoutubePlayer from "../view/pages/youtubePlayer/youtubePlayer";
import Header from "../view/components/header";
import getTrafficData from "./trafficRequestURI";

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
  const [isMapReady, setMapReady] = useState(true);
  const markerRef = useRef<any>(null);
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000); // 1분마다 도로교통 데이터를 갱신

    return () => {
      clearInterval(intervalId);
    };
  }, [currentTime]);

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

  // * 2. currentPosition으로 가져온 정보를 토대로 티맵 지도 생성
  useEffect(() => {
    if (userCurrentLocation) {
      const checkTmapv3Loaded = () => {
        if (window.Tmapv3) {
          return true;
        } else {
          setTimeout(checkTmapv3Loaded, 50);
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

  // * 지도가 생성되었을 경우 currentPosition 정보를 토대로
  // * 지도를 사용자 위치로 정렬함.

  useEffect(() => {
    if (map && userCurrentLocation) {
      const centerLatLng = new window.Tmapv3.LatLng(
        userCurrentLocation.latitude,
        userCurrentLocation.longitude
      );
      map.setCenter(centerLatLng);
    }
  }, [map, userCurrentLocation]);

  // * currentPosition과 지도가 모두 준비되었을 경우
  // * 실행하는 useEffect 훅.
  // * watchPosition으로 사용자의 실시간 위치를 불러옴
  useEffect(() => {
    if (userCurrentLocation && map) {
      const checkLatLngLoaded = () => {
        if (window.Tmapv3 && window.Tmapv3.LatLng) {
          return true;
        } else {
          setTimeout(checkLatLngLoaded, 100);
        }
      };

      const isLatLngLoaded = checkLatLngLoaded();
      if (isLatLngLoaded) {
        const watchId = navigator.geolocation.watchPosition((position) => {
          setUserRealTimeLocation(position.coords);
          console.log("watchPosition으로 위치 수집 : ", position.coords);
        });
        return () => {
          navigator.geolocation.clearWatch(watchId);
        };
      }
    } else {
      console.log("사용자 환경이 위치 정보를 제공하지 않습니다.");
    }
  }, [userCurrentLocation, map]);

  // * watchPosition에서 가져온 값을 토대로
  // * 지도의 마커를 갱신함

  useEffect(() => {
    if (userRealTimeLocation) {
      const centerLatLng = new window.Tmapv3.LatLng(
        userRealTimeLocation?.latitude,
        userRealTimeLocation?.longitude
      );
      map.setCenter(centerLatLng);
      if (markerRef.current) {
        markerRef.current.setPosition(centerLatLng);
      } else {
        const newMarker = new window.Tmapv3.Marker({
          position: centerLatLng,
          map: map,
        });
        markerRef.current = newMarker;
      }
    }
  }, [userRealTimeLocation]);

  const getTrafficDataFirst = () => {
    setTimeout(() => {
      getTrafficData(
        userRealTimeLocation?.latitude,
        userRealTimeLocation?.longitude
      );
    }, 3500); // 3.5초 후에 교통 정보 요청 실행
  };

  useEffect(() => {
    getTrafficDataFirst();
  }, [userCurrentLocation]);

  useEffect(() => {
    if (currentTime) {
      getTrafficData(
        userRealTimeLocation?.latitude,
        userRealTimeLocation?.longitude
      );
    }
  }, [currentTime]);

  return (
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
          <YoutubePlayer />
        </Box>
      )}
    </>
  );
};

export default MapContainer;
