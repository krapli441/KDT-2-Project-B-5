// 리액트 라이브러리
import React, { Component, useState } from "react";
import { Link } from "react-router-dom";

// 리액트 컴포넌트
import Map from "../utils/kakaoMap";
import NaverMap from "../utils/naverMap";

function App() {
  return (
    <>
      <div>
        <p>hello 포람페!</p>
        <Map></Map>
        <NaverMap></NaverMap>
      </div>
    </>
  );
}

export default App;
