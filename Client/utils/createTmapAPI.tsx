// 리액트 라이브러리
import React, { useState, useEffect } from "react";

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
  const [map, setMap] = useState<any>(null);
  const [polyLineArr, setPolyLineArr] = useState<any[]>([]);
  const [marker, setMarker] = useState<any>(null);
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation(position.coords);
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
  }, []);
  useEffect(() => {
    if (userLocation) {
      function generateMap() {
        const map = new window.Tmapv3.Map("TmapApp", {
          width: "100%",
          height: "100%",
          zoom: 15,
        });
        const marker = new window.Tmapv3.Marker({
          position: new window.Tmapv3.LatLng(
            userLocation?.latitude,
            userLocation?.longitude
          ),
          map: map,
        });
        setMap(map);
        setMarker(marker);
        return map;
      }
      const map = generateMap();
      const fetchTrafficData = () => {
        if (map) {
          const requestURI = `https://apis.openapi.sk.com/tmap/traffic?version=${AroundTrafficSampleData.version}&format=json&reqCoordType=${AroundTrafficSampleData.reqCoordType}&resCoordType=${AroundTrafficSampleData.resCoordType}&centerLat=${userLocation.latitude}&centerLon=${userLocation.longitude}&trafficType=${AroundTrafficSampleData.trafficType}&zoomLevel=${AroundTrafficSampleData.zoomLevel}&callback=${AroundTrafficSampleData.callback}&appKey=${AroundTrafficSampleData.appKey}`;
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
              console.log(congestionValues);
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
        }
      };
      const intervalId = setInterval(fetchTrafficData, 5000);
      return () => {
        clearInterval(intervalId);
        if (polyLineArr.length > 0) {
          polyLineArr.forEach((polyline) => {
            polyline.setMap(null);
          });
        }
        if (marker) {
          marker.setMap(null);
        }
      };
    }
  }, [userLocation]);
  useEffect(() => {
    if (map && userLocation) {
      const centerLatLng = new window.Tmapv3.LatLng(
        userLocation.latitude,
        userLocation.longitude
      );
      map.setCenter(centerLatLng);
      if (marker) {
        setMarker(marker.setPosition(centerLatLng));
      }
    }
  }, [map, marker, userLocation]);
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
