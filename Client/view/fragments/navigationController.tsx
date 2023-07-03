// 리액트 라이브러리
import React, { useState, useEffect } from "react";

// 외부 라이브러리
import { Box } from "@chakra-ui/react";

import { BiSolidPlaylist } from "react-icons/Bi";
import { AiFillHome } from "react-icons/Ai";
import { BiCurrentLocation } from "react-icons/Bi";

// 리액트 컴포넌트

const NavigationController: React.FC = () => {
  return (
    <>
      <Box
        className="navigationController"
        display={"flex"}
        width={"100%"}
        height={"100%"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
        color="white"
      >
        <BiSolidPlaylist />
        <AiFillHome />
        <BiCurrentLocation />
      </Box>
    </>
  );
};

export default NavigationController;