import React, { Component, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Intro from "../view/IntroPage/IntroPageScreen";
import FirstPage from "../view/firstPage/firstPageScreen";
import Singup from "../view/signUp/signUpScreen";
import Login from "../view/loginPage/loginScreen";
// import  from "../view/fragments";
// import Nav from "../view/fragments/footer";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/first" element={<FirstPage />} />
          <Route path="/signup" element={<Singup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}
