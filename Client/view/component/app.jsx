// 리액트 라이브러리
import React, { Component, useState } from "react";

import { Link, BrowserRouter, Route } from "react-router-dom";
import LocationTest from "./locationTest";

// 리액트 컴포넌트
import Map from "../utils/map";

function App() {
  return (
    <>
      <div>
        <p>hello 포람페!</p>
        <Map></Map>
        <Link>
          <LocationTest></LocationTest>
        </Link>
      </div>
    </>
  );
}

export default App;
