import React, { Component, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";

// 리액트 컴포넌트
import Intro from "../view/pages/introPage/introPageScreen";
import FirstAccess from "../view/pages/firstAccessPage/firstAccessScreen";
import Singup from "../view/pages/signUpPage/signUpScreen";
import Login from "../view/pages/loginPage/loginScreen";
import Home from "../view/pages/mainPage/mainScreen";
import Fun from "../view/pages/playlistPages/funPlayList/funPlayListScreen";
import Blockage from "../view/pages/playlistPages/blockagePlayList/blockagePlayListScreen";
import Normal from "../view/pages/playlistPages/normalPlayList/normalPlayListScreen";
import Stuck from "../view/pages/playlistPages/stuckPlayList/stuckPlayListScreen";
import Overall from "../view/pages/playlistPages/overallPlaylist/overallPlayListScreen";
import Nav from "../view/fragments/footer";
// import  from "../view/fragments";
// import Nav from "../view/fragments/footer";

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
      <div>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/first" element={<FirstAccess />} />
          <Route path="/signup" element={<Singup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/fun" element={<Fun />} />
          <Route path="/blockage" element={<Blockage />} />
          <Route path="/normal" element={<Normal />} />
          <Route path="/stuck" element={<Stuck />} />
          <Route path="/overall" element={<Overall />} />
        </Routes>
        {[
          "/",
          "/first",
          "/signup",
          "/login",
          "/fun",
          "/blockage",
          "/normal",
          "/stuck",
          "/overall",
        ].includes(location.pathname) ? null : (
          <Nav />
        )}
      </div>
    </Box>
  );
}
