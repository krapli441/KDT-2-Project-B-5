import React, { Component, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Intro from "../view/IntroPage/IntroPageScreen";
// import login from "../view/loginPage/loginScreen";
// import  from "../view/fragments";
// import Nav from "../view/fragments/footer";

export default function App() {
  return (
    <div>
      <p>웹팩 개발서버 테스트</p>

      <Router>
        <Routes>
          <Route path="/" element={<Intro />} />
        </Routes>
      </Router>
    </div>
  );
}
