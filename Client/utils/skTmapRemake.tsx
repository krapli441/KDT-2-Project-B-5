// 리액트 라이브러리
import React, { useState, useEffect } from "react";

// 리액트 컴포넌트
import LocationComponent from "./getUserLocation";
import SampleData from "./getTrafficSampleData";

declare global {
  interface Window {
    Tmapv2: any;
  }
}

let requestURI = `https://apis.openapi.sk.com/tmap/traffic?version=${SampleData.version}&minLat=${SampleData.minLat}&minLon=${SampleData.minLon}&maxLat=${SampleData.maxLat}&maxLon=${SampleData.maxLon}&centerLat=${SampleData.centerLat}&centerLon=${SampleData.centerLon}&reqCoordType=${SampleData.reqCoordType}&resCoordType=${SampleData.resCoordType}&trafficType=${SampleData.trafficType}&zoomLevel=${SampleData.zoomLevel}&callback=${SampleData.callback}&appKey=${SampleData.appKey}`;

const MapContainer: React.FC = () => {
  const [userLocation, setUserLocation] =
    useState<GeolocationCoordinates | null>(null);
  const [polyLineArr, setPolyLineArr] = useState<any[]>([]);

  // * 사용자 위치 정보를 가져오는 useEffect

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

  // 교통 정보 데이터를 받아오는 로직
  // fetch(requestURI, {
  //   method: "GET",
  // })
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error();
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     // 데이터 처리
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // * SK open API를 사용하여 맵을 생성하는 useEffect 훅
  // * 윗단 useEffect로 사용자 정보를 가져올 경우 실행된다

  useEffect(() => {
    if (userLocation) {
      function generateMap() {
        let map = new window.Tmapv2.Map("TmapApp", {
          center: new window.Tmapv2.LatLng(
            userLocation?.latitude,
            userLocation?.longitude
          ),
          width: "100%",
          height: "100%",
          zoom: 15,
        });
        return map;
      }
      const map = generateMap();
      const requestURI = `https://apis.openapi.sk.com/tmap/traffic?version=${SampleData.version}&minLat=${SampleData.minLat}&minLon=${SampleData.minLon}&maxLat=${SampleData.maxLat}&maxLon=${SampleData.maxLon}&centerLat=${SampleData.centerLat}&centerLon=${SampleData.centerLon}&reqCoordType=${SampleData.reqCoordType}&resCoordType=${SampleData.resCoordType}&trafficType=${SampleData.trafficType}&zoomLevel=${SampleData.zoomLevel}&callback=${SampleData.callback}&appKey=${SampleData.appKey}`;

      fetch(requestURI)
        .then((response) => {
          if (!response.ok) {
            throw new Error("요청이 실패하였습니다.");
          }
          return response.json();
        })
        .then((data) => {
          const resultData = data.features;

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
                const latlng = new window.Tmapv2.Point(
                  geometry.coordinates[j][0],
                  geometry.coordinates[j][1]
                );
                const convertPoint =
                  new window.Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
                    latlng
                  );
                const convertChange = new window.Tmapv2.LatLng(
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

              const polyline = new window.Tmapv2.Polyline({
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
