// 리액트 라이브러리
import React, { useEffect } from "react";

// 리액트 컴포넌트

// @ts-ignore
const { kakao } = window;

export default function Map() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;

      let locPosition = new kakao.maps.LatLng(lat, lng),
        message = `<div>현재 위치</div>`;

      displayMarker(locPosition, message);
    });
  } else {
    // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

    var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
      message = "geolocation을 사용할수 없어요..";

    displayMarker(locPosition, message);
  }

  // 지도에 마커와 인포윈도우를 표시하는 함수입니다
  function displayMarker(locPosition, message) {
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      map: map,
      position: locPosition,
    });

    var iwContent = message, // 인포윈도우에 표시할 내용
      iwRemoveable = true;

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    // 인포윈도우를 마커위에 표시합니다
    infowindow.open(window.kakao.map, marker);

    // 지도 중심좌표를 접속위치로 변경합니다
    window.kakao.map.setCenter(locPosition);
  }
  useEffect(() => {
    const container = document.getElementsByClassName("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
    };
    const map = new kakao.maps.Map(container, options);
  }, []);

  return (
    <>
      <div
        className="map"
        style={{
          width: "500px",
          height: "500px",
        }}
      ></div>
    </>
  );
}
