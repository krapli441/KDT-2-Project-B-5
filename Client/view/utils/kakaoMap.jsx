// 리액트 라이브러리
import React, { useEffect } from "react";

// 리액트 컴포넌트

export default function kakaoMap() {
  // const container = document.getElementById("map");
  // const options = {
  //   container: new kakao.maps.LatLng(33.450701, 126.570667),
  //   level: 3,
  // };
  // const map = new kakao.maps.Map(container, options);

  return (
    <>
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: "100%", height: "360px" }}
      >
        <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
          <div style={{ color: "#000" }}>Hello World!</div>
        </MapMarker>
      </Map>
    </>
  );
}
