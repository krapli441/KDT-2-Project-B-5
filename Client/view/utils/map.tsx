// 리액트 라이브러리
import React, { useEffect } from "react";

// 리액트 컴포넌트

// 
declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map() {
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
