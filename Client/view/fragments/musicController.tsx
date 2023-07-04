// 리액트 라이브러리
import React, { useState, useEffect } from "react";

// 외부 라이브러리
import { Box, Button } from "@chakra-ui/react";

import { FaPlay } from "react-icons/Fa";
import { FaPause } from "react-icons/Fa";
import { IoIosSkipForward } from "react-icons/Io";
import { IoIosSkipBackward } from "react-icons/Io";

// 리액트 컴포넌트

import Beenzino from "../../public/music/TimeTravel.mp3";

const MusicController: React.FC = () => {
  const playMusic = () => {
    // 오디오 파일 경로
    const audioFile = Beenzino;

    // AudioContext 생성
    const audioContext = new AudioContext();

    // 오디오 요소 생성
    const audioElement = new Audio(audioFile);

    // MediaElementAudioSourceNode 생성
    const sourceNode = audioContext.createMediaElementSource(audioElement);

    // Web Audio 그래프에 연결
    sourceNode.connect(audioContext.destination);

    // 음악 재생
    audioElement.play();
  };
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
        <Box className="musicPlay" onClick={playMusic} cursor={"pointer"}>
          <FaPlay />
        </Box>
        <IoIosSkipForward />
      </Box>
    </>
  );
};

export default MusicController;
