// 리액트 라이브러리
import React, { Component, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";
// 리액트 컴포넌트
import Intro from "../view/pages/introPage/introPageScreen";
import FirstAccess from "../view/pages/firstAccessPage/firstAccessScreen";
import SignUp from "../view/pages/signUpPage/signUpScreen";
import Login from "../view/pages/loginPage/loginScreen";
import Home from "../view/pages/mainPage/mainScreen";

export default function App() {
  return (
    <Box
      className="container"
      width={"430px"}
      height={"932px"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/first" element={<FirstAccess />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Box>
  );
}
