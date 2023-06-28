// 리액트 라이브러리
import React, { useState, useEffect } from "react";

// 리액트 컴포넌트
import LocationComponent from "../components/userLocation";

// 카카오 지도 타입 선언
declare global {
  interface Window {
    kakao: any;
  }
}
const MapContainer = () => {
  // * userLocation 훅을 불러혼다
  const [userLocation, setUserLocation] =
    useState<GeolocationCoordinates | null>(null);

  useEffect(() => {
    // ? 사용자 위치 정보를 가져오는 로직
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords);
        },
        (error) => {
          console.log("사용자 위치 정보를 가져오는데 실패했습니다.", error);
        },
        {
          enableHighAccuracy: true,
        }
      );
    } else {
      console.log("사용자 환경이 위치 정보를 제공하지 않습니다.");
    }

    // * 카카오 지도 API 로직
    setTimeout(() => {
      const container = document.getElementById("map");
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=584005aa7fee37a3ef459f49ebfc7e70&libraries=services&autoload=false`;
      document.head.appendChild(script);
      script.onload = () => {
        window.kakao.maps.load(() => {
          const options = {
            center: new window.kakao.maps.LatLng(36.3016838, 127.3789012),
            level: 3,
          };
          const map = new window.kakao.maps.Map(container, options); // 지도 생성
          let geocoder = new window.kakao.maps.services.Geocoder();

          geocoder.addressSearch(
            "제주특별자치도 제주시 첨단로 242",
            function (result: any, status: any) {
              // 정상적으로 검색이 완료됐으면
              if (status === window.kakao.maps.services.Status.OK) {
                var coords = new window.kakao.maps.LatLng(
                  result[0].y,
                  result[0].x
                );

                // 결과값으로 받은 위치를 마커로 표시합니다
                var marker = new window.kakao.maps.Marker({
                  map: map,
                  position: coords,
                });

                // 인포윈도우로 장소에 대한 설명을 표시합니다
                var infowindow = new window.kakao.maps.InfoWindow({
                  content:
                    '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>',
                });
                infowindow.open(map, marker);

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
              }
            }
          );
          // 지도에 교통정보를 표시하도록 지도타입을 추가합니다
          map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC);
          let marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(36.3016838, 127.3789012), // 마커의 좌표
            map: map, // 마커를 표시할 지도 객체
          });
        });
      };
    }, 3000);
  }, []);
  return (
    <>
      <div id="map" style={{ width: "50vw", height: "50vh" }} />
      <LocationComponent />
    </>
  );
};
export default MapContainer;
