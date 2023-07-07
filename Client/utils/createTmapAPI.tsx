// 리액트 라이브러리
import React, { useState, useEffect, useRef, useContext } from "react";

// 외부 라이브러리
import { Box } from "@chakra-ui/react";

// 리액트 컴포넌트
import TrafficPointData from "./getTrafficPointData";
import { AuthContext } from "./trafficCongestionContext";
import VideoPlayer from "../view/pages/youtubeText/joonhyungSendMeYoutubeTest";
import Header from "../view/fragments/header";
import getDistance from "../utils/getUserDistance";

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
  const prevPosition = useRef<GeolocationCoordinates | null>(null);
  const { congestion, setCongestion } = useContext(AuthContext);
  const { color, setColor } = useContext(AuthContext);

  // * currentPosition으로 1차적으로 위치 정보 수집
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCurrentLocation(position.coords);
          // console.log(position.coords.latitude, position.coords.longitude);
          // console.log("1. 최초 위치 불러옴");
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
      const checkTmapv3Loaded = () => {
        if (window.Tmapv3) {
          return true;
        } else {
          setTimeout(checkTmapv3Loaded, 50);
        }
      };

      const generateMap = () => {
        // console.log("2. 최초 위치를 토대로 맵 생성");
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
        setMap(map);
        setMapReady(false);
      }
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
          if (
            !prevPosition.current ||
            getDistance(prevPosition.current, position.coords) >= 50
          ) {
            setUserRealTimeLocation(position.coords);
            prevPosition.current = position.coords;
            console.log(
              "4. watchPosition으로 사용자의 실시간 위치 정보를 수집"
            );
          }
        });

        return () => {
          navigator.geolocation.clearWatch(watchId);
        };
      }
    } else {
      console.log("사용자 환경이 위치 정보를 제공하지 않습니다.");
    }
  }, [userCurrentLocation, map]);

  // * watchPosition으로 가져온 위치 정보를 토대로 marker 포지션 재설정
  useEffect(() => {
    // console.log("5. 실시간 위치 정보를 토대로 마커 갱신");
    if (userRealTimeLocation) {
      const centerLatLng = new window.Tmapv3.LatLng(
        userRealTimeLocation?.latitude,
        userRealTimeLocation?.longitude
      );
      map.setCenter(centerLatLng);

      if (markerRef.current) {
        // 기존 마커 객체 제거
        markerRef.current.setMap(null);
      }

      // 새로운 마커 객체 생성 및 설정
      const newMarker = new window.Tmapv3.Marker({
        position: centerLatLng,
        map: map,
      });

      markerRef.current = newMarker;
    }
  }, [userRealTimeLocation]);

  // ? 사용자 위치 교통 정보를 요청하는 함수
  const getPointTrafficData = () => {
    const requestURI = `https://apis.openapi.sk.com/tmap/traffic?version=${TrafficPointData.version}&format=json&reqCoordType=${TrafficPointData.reqCoordType}&resCoordType=${TrafficPointData.resCoordType}&centerLat=${userRealTimeLocation?.latitude}&centerLon=${userRealTimeLocation?.longitude}&trafficType=${TrafficPointData.trafficType}&zoomLevel=${TrafficPointData.zoomLevel}&callback=${TrafficPointData.callback}&appKey=${TrafficPointData.appKey}`;

    fetch(requestURI)
      .then((response) => {
        if (!response.ok) {
          throw new Error("요청이 실패하였습니다.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("요청이 성공하였습니다.");
        const resultData = data.features;
        const congestionValues = resultData.map(
          (item: any) => item.properties.congestion
        );
        // 혼잡도 정보를 useContext로 관리
        setCongestion(congestionValues[0]);
        setColor(congestionValues[0]);
        //! 사용자 위치의 도로 교통 정보(혼잡도)를 나타내는 부분
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ! 5초 뒤에 교통정보 요청 함수를 실행
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getPointTrafficData(); // 사용자 위치 교통정보 요청 함수 실행
      // getAroundTrafficData(); // 사용자 주변 교통정보 요청 함수 실행
      const intervalPoint = setInterval(getPointTrafficData, 10000); // 10초마다 반복 실행
      // const intervalAround = setInterval(getAroundTrafficData, 10000); // 10초마다 반복 실행
      // 컴포넌트가 언마운트될 때 interval 제거
      return () => {
        clearInterval(intervalPoint);
        // clearInterval(intervalAround);
      };
    }, 100);

    // 컴포넌트가 언마운트될 때 timeout 제거
    return () => {
      clearTimeout(timeoutId);
    };
  }, [userRealTimeLocation]);

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
