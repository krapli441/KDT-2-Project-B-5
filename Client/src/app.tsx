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
import Fun from "../view/pages/playlistPages/funPlayList/funPlayListScreen";
import Blockage from "../view/pages/playlistPages/blockagePlayList/blockagePlayListScreen";
import Normal from "../view/pages/playlistPages/normalPlayList/normalPlayListScreen";
import Stuck from "../view/pages/playlistPages/stuckPlayList/stuckPlayListScreen";
import Nav from "../view/fragments/footer";
import Map from "../utils/mapscreen";

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
        <Route path="/" element={<Map />} />
        <Route path="/first" element={<FirstAccess />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/fun" element={<Fun />} />
        <Route path="/blockage" element={<Blockage />} />
        <Route path="/normal" element={<Normal />} />
        <Route path="/stuck" element={<Stuck />} />
      </Routes>
      {["/", "/first", "/signup", "/login", "/fun"].includes(
        location.pathname
      ) ? null : (
        <Nav />
      )}
    </Box>
  );
}
