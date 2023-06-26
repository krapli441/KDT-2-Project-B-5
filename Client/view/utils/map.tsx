// 리액트 라이브러리
import React, { useEffect } from "react";

// 리액트 컴포넌트

// @ts-ignore
const { kakao } = window;

export default function Map() {
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
