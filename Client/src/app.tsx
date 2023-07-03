// 리액트 라이브러리
import React, { Component, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";
// 리액트 컴포넌트
import Intro from "../view/pages/introPage/IntroPageScreen";
import FirstAccess from "../view/pages/firstAccessPage/firstAccessScreen";
import SignUp from "../view/pages/signUpPage/signUpScreen";
import Login from "../view/pages/loginPage/loginScreen";
import Home from "../view/pages/mainPage/mainScreen";
import Tmap from "../view/pages/mapPage/mapScreen";
import Youtube from "../view/pages/youtubeText/youtubeTextScreen"

export default function App() {
  return (
    <Box
      className="container"
      display={"flex"}
      width={"430px"}
      height={"932px"}
      justifyContent={"center"}
      alignItems={"center"}
      backgroundColor={"white"}
    >
      <Routes>
        <Route path="/" element={<Intro />} />
        {/* <Route path="/first" element={<FirstAccess />} /> */}
        <Route path="/first" element={<Youtube/>}></Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tMap" element={<Tmap />} />
      </Routes>
    </Box>
  );
}
