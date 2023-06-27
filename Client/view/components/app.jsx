// 리액트 라이브러리
import React, { Component, useState } from "react";
import { Link } from "react-router-dom";

// 리액트 컴포넌트
import Map from "../utils/kakaoMap";

function App() {
  return (
    <>
      <div>
        <p>hello 포람페!</p>
        <Map></Map>
        <Link to="/naver">
          <p>네이버 지도</p>
        </Link>
      </div>
    </>
  );
}

export default App;
