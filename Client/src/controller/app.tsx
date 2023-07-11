// 리액트 라이브러리
import React, { Component, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// 외부 라이브러리
import { Box } from "@chakra-ui/react";
import { useMediaQuery } from "react-responsive";

// 리액트 컴포넌트
import Intro from "../view/pages/introPage/introPageScreen";
import FirstAccess from "../view/pages/firstAccessPage/firstAccessScreen";
import SignUp from "../view/pages/signUpPage/signUpSecond";
import Login from "../view/pages/loginPage/loginSecond";
import Home from "../view/pages/mainPage/mainScreen";
import Tmap from "../view/pages/mapPage/mapScreen";
import Youtube from "../view/pages/youtubePlayer/youtubeTextScreen";
import { AuthProvider } from "../../utils/trafficCongestionContext";

export default function App() {
  const isMobile = useMediaQuery({ maxWidth: 428, maxHeight: 932 });

  return (
    <Box
      className="container"
      display={"flex"}
      flexDirection={"column"}
      width={isMobile ? "100%" : "430px"}
      height={isMobile ? "100%" : "932px"}
      justifyContent={"center"}
      alignItems={"center"}
      backgroundColor={"white"}
    >
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/first" element={<FirstAccess />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tMap" element={<Tmap />} />
          <Route path="/test" element={<Youtube />} />
        </Routes>
      </AuthProvider>
    </Box>
  );
}
