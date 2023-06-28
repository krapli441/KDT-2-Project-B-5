// 리액트 라이브러리
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// 리액트 컴포넌트
import App from "./app";
import Naver from "../utils/naverMap";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/naver" element={<Naver />}></Route>
    </Routes>
    <App></App>
  </BrowserRouter>
);
