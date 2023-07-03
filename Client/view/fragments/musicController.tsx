// 리액트 라이브러리
import React, { useState, useEffect } from "react";

// 외부 라이브러리
import { Box } from "@chakra-ui/react";

import { FaPlay } from "react-icons/Fa";
import { FaPause } from "react-icons/Fa";
import { IoIosSkipForward } from "react-icons/Io";
import { IoIosSkipBackward } from "react-icons/Io";

// 리액트 컴포넌트

const MusicController: React.FC = () => {
  return (
    <>
      <Box
        className="musicPlayCotroller"
        display={"flex"}
        width={"100%"}
        height={"100%"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
        color="white"
      >
        <IoIosSkipBackward />
        <FaPlay />
        <IoIosSkipForward />
      </Box>
    </>
  );
};

export default MusicController;