// 리액트 라이브러리
import React, { useState, useEffect, useRef } from "react";

// 외부 라이브러리
import { Box } from "@chakra-ui/react";

// 리액트 컴포넌트
import AroundTrafficSampleData from "./getAroundTrafficSampleData";
import PointTrafficSampleData from "./getPointTrafficSampleData";
import MusicController from "../view/fragments/musicController";
import NavigationController from "../view/fragments/navgiationController";
import RefreshUserLocationButton from "../view/fragments/refreshUserLocationButton";

declare global {
  interface Window {
    Tmapv3: any;
  }
}

const MapContainer: React.FC = () => {
  const [userLocation, setUserLocation] =
    useState<GeolocationCoordinates | null>(null);
  const [polyLineArr, setPolyLineArr] = useState<any[]>([]);
  const [map, setMap] = useState<any | null>(null);
  const mapRef = useRef<any>(null); // useRef를 사용하여 map 상태에 접근

  // * 사용자 위치 정보를 가져오도록 하는 getCurrentPosition 메서드
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords);
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
        }
      );
    } else {
      console.log("사용자 환경이 위치 정보를 제공하지 않습니다.");
    }
  }, []);

  // * SK open API를 사용하여 맵을 생성하는 useEffect 훅
  useEffect(() => {
    if (userLocation) {
      function generateMap() {
        const center = new window.Tmapv3.LatLng(
          userLocation?.latitude,
          userLocation?.longitude
        );
        const mapOptions = {
          center: center,
          width: "100%",
          height: "80%",
          zoom: 15,
        };
        const newMap = new window.Tmapv3.Map("tMapContainer", mapOptions);
        mapRef.current = newMap; // mapRef에 생성된 맵 저장
      }

      // 기존의 맵 제거
      const mapContainer = document.getElementById("tMapContainer");
      if (mapContainer) {
        mapContainer.innerHTML = "";
      }
      generateMap();
    }
  }, [userLocation]);

  useEffect(() => {
    if (userLocation && mapRef.current) {
      const markerOptions = {
        position: new window.Tmapv3.LatLng(
          userLocation.latitude,
          userLocation.longitude
        ),
        map: mapRef.current, // 저장된 맵 사용
      };
      const marker = new window.Tmapv3.Marker(markerOptions);
    }
  }, [userLocation]);

  // * 사용자 위치 정보를 가져오도록 하는 watchPosition 메서드
  useEffect(() => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
      };
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          console.log(
            "현재 위치:",
            position.coords.latitude,
            position.coords.longitude
          );
          setUserLocation(position.coords);
        },
        (error) => {
          if (error.code === error.TIMEOUT) {
            console.log("위치 정보를 가져오는 중 시간이 초과되었습니다.");
          } else {
            console.log(
              "실시간 위치 정보를 불러오는 중 오류가 발생했습니다.",
              error
            );
          }
        },
        options
      );

      return () => {
        // 컴포넌트가 언마운트되거나 업데이트되면 watchPosition을 중지.
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.log("사용자 환경이 위치 정보를 제공하지 않습니다.");
    }
  }, []);

  // ! 사용자 위치 정보를 가져오는 useEffect
  useEffect(() => {
    if (userLocation) {
      if (map) {
        const trafficPointRequestURI = `https://apis.openapi.sk.com/tmap/traffic?version=${PointTrafficSampleData.version}&format=json&reqCoordType=${PointTrafficSampleData.reqCoordType}&resCoordType=${PointTrafficSampleData.resCoordType}&centerLat=${userLocation.latitude}&centerLon=${userLocation.longitude}&trafficType=${PointTrafficSampleData.trafficType}&zoomLevel=${PointTrafficSampleData.zoomLevel}&callback=${PointTrafficSampleData.callback}&appKey=${PointTrafficSampleData.appKey}`;

        fetch(trafficPointRequestURI, {
          method: "GET",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("현재 위치 교통정보 요청이 실패하였습니다.");
            }
            return response.json();
          })
          .then((data) => {
            console.log("현재 위치 교통정보를 성공적으로 수신했습니다.");
            const resultData = data.features;
            console.log(resultData);
          });

        // ! 사용자 주변 교통정보 데이터를 가져오는 fetch
        const trafficAroundRequestURI = `https://apis.openapi.sk.com/tmap/traffic?version=${AroundTrafficSampleData.version}&format=json&reqCoordType=${AroundTrafficSampleData.reqCoordType}&resCoordType=${AroundTrafficSampleData.resCoordType}&centerLat=${userLocation.latitude}&centerLon=${userLocation.longitude}&trafficType=${AroundTrafficSampleData.trafficType}&radius=${AroundTrafficSampleData.radius}&zoomLevel=${AroundTrafficSampleData.zoomLevel}&callback=${AroundTrafficSampleData.callback}&appKey=${AroundTrafficSampleData.appKey}`;

        fetch(trafficAroundRequestURI, {
          method: "GET",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("사용자 주변 교통정보 요청이 실패하였습니다.");
            }
            return response.json();
          })
          .then((data) => {
            console.log("사용자 주변 교통정보를 성공적으로 수신했습니다.");
            const resultData = data.features;
            console.log(resultData);

            if (polyLineArr.length > 0) {
              polyLineArr.forEach((polyline) => {
                polyline.setMap(null);
              });
            }

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
                    new window.Tmapv3.Projection.convertEPSG3857ToWGS84GEO(
                      latlng
                    );
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
                  lineColor = "#E87506";
                } else if (sectionCongestion === 4) {
                  lineColor = "#D61125";
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
            console.log("에러:", error);
          });
      }
    }
  }, [userLocation, map]);

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
