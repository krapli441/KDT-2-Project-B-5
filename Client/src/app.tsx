import React, { Component, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Intro from "../view/IntroPage/IntroPageScreen";
import login from "../view/loginPage/loginScreen";
import Firstlogin from "../view/firstLoginPage/";
import  from "../view/fragments";
import Nav from "../view/fragments/footer";

export default function App() {

  return (
    <>
      <div className="container">
          <Routes>
            <Route path="/" element={<Intro />} />
{/*             <Route path="/home" element={<MainScreen />} />
            <Route path="/Intro" element={<IntroPageScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/welcome_1" element={<FirstLoginPage />} />
            <Route path="/welcome_2" element={<WelcomeSecond />} />
            <Route path="/welcome_3" element={<WelcomeThird />} /> */}
          </Routes>
{/*         {[
          "/",
          "/first",
          "/signup",
          "/login",
          "/welcome_1",
          "/welcome_2",
          "/welcome_3",
        ].includes(location.pathname) ? null : (
          <Nav />
        )} */}
      </div>
    </>
  );
}
