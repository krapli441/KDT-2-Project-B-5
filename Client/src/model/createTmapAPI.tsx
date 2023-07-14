// 리액트 라이브러리
import React, { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "./trafficCongestionContext";
// 외부 라이브러리
import { Box } from "@chakra-ui/react";

// 리액트 컴포넌트
import YoutubePlayer from "../view/pages/youtubePlayer/youtubePlayer";
import Header from "../view/components/header";
import getTrafficData from "./trafficRequestURI";
import TrafficAroundData from "./getTrafficAroundData";

// API 환경변수

const apikey = process.env.APIKEY_FIRST;

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
  const [polyLineArr, setPolyLineArr] = useState<any[]>([]);
  const markerRef = useRef<any>(null);
  const [userLocationCurrentTime, setCurrentTime] = useState(Date.now());
  const [userAroundTrafficCurrentTime, setUserAroundTrafficCurrentTime] =
    useState(Date.now());

  const { congestion, setCongestion } = useContext(AuthContext);
  const { color, setColor } = useContext(AuthContext);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000); // 1분마다 도로교통 데이터를 갱신

    return () => {
      clearInterval(intervalId);
    };
  }, [userLocationCurrentTime]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setUserAroundTrafficCurrentTime(Date.now());
    }, 240000);
    return () => {
      clearInterval(intervalId);
    };
  }, [userAroundTrafficCurrentTime]);

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

  const drawingAroundTrafficCongestion = () => {
    const trafficCongestionRequestURI = `https://apis.openapi.sk.com/tmap/traffic?version=${TrafficAroundData.version}&format=json&reqCoordType=${TrafficAroundData.reqCoordType}&resCoordType=${TrafficAroundData.resCoordType}&centerLat=${userRealTimeLocation?.latitude}&centerLon=${userRealTimeLocation?.longitude}&trafficType=${TrafficAroundData.trafficType}&radius=${TrafficAroundData.radius}&zoomLevel=${TrafficAroundData.zoomLevel}&callback=${TrafficAroundData.callback}&appKey=${apikey}`;

    fetch(trafficCongestionRequestURI)
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
        //! 사용자 위치의 도로 교통 정보(혼잡도)를 나타내는 부분
        console.log(congestionValues); // ['2'], length: 1, Prototype: Array(0)
        if (polyLineArr) {
          polyLineArr.forEach((polyline) => {
            polyline.setMap(null); // 이전에 그려진 혼잡도 제거
          });
        }
        setPolyLineArr([]);
        const newPolyLineArr: any[] = [];

        for (const i in resultData) {
          const geometry = resultData[i].geometry;
          const properties = resultData[i].properties;

          if (geometry.type === "LineString") {
            const drawInfoArr: any[] = [];

            for (const j in geometry.coordinates) {
              const latlng = new window.Tmapv3.Point(
                geometry.coordinates[j][0],
                geometry.coordinates[j][1]
              );
              const convertPoint =
                new window.Tmapv3.Projection.convertEPSG3857ToWGS84GEO(latlng);
              const convertChange = new window.Tmapv3.LatLng(
                convertPoint._lat,
                convertPoint._lng
              );
              drawInfoArr.push(convertChange);
            }

            let lineColor = "";
            const sectionCongestion = properties.congestion;
            if (sectionCongestion === 0) {
              lineColor = "#06050D";
            } else if (sectionCongestion === 1) {
              lineColor = "#61AB25";
            } else if (sectionCongestion === 2) {
              lineColor = "#FFFF00";
            } else if (sectionCongestion === 3) {
              lineColor = "#FF7200";
            } else if (sectionCongestion === 4) {
              lineColor = "#FF0000";
            }

            const polyline = new window.Tmapv3.Polyline({
              path: drawInfoArr,
              strokeColor: lineColor,
              strokeWeight: 6,
              map: map,
            });
            newPolyLineArr.push(polyline);
          }
        }

        setPolyLineArr(newPolyLineArr);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTrafficDataFirst = () => {
    setTimeout(() => {
      getTrafficData(
        userCurrentLocation?.latitude,
        userCurrentLocation?.longitude,
        setCongestion,
        setColor
      );
    }, 3500); // 3.5초 후에 교통 정보 요청 실행
  };

  useEffect(() => {
    getTrafficDataFirst();
  }, [userCurrentLocation]);

  useEffect(() => {
    if (userLocationCurrentTime) {
      getTrafficData(
        userRealTimeLocation?.latitude,
        userRealTimeLocation?.longitude,
        setCongestion,
        setColor
      );
    }
  }, [userLocationCurrentTime]);

  useEffect(() => {
    if (userAroundTrafficCurrentTime) {
      drawingAroundTrafficCongestion();
    }
  }, [userAroundTrafficCurrentTime]);

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
