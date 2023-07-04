// 리액트 라이브러리
import React, { useState, useEffect } from "react";

// 외부 라이브러리
import { Box, Button } from "@chakra-ui/react";

import { FaPlay, FaPause } from "react-icons/Fa";
import { IoIosSkipForward, IoIosSkipBackward } from "react-icons/Io";

// 리액트 컴포넌트
import YouTubeScreen from "../pages/youtubeText/youtubeTextScreen";
import Beenzino from "../../public/music/TimeTravel.mp3";

const MusicController: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const songs: string[] = ["song1", "song2", "song3"]; // 노래 리스트

  const playMusic = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextSong = () => {
    const nextSong = (currentSong + 1) % songs.length;
    setCurrentSong(nextSong);
  };

  const handlePreviousSong = () => {
    const previousSong = (currentSong - 1 + songs.length) % songs.length;
    setCurrentSong(previousSong);
  };

  return (
    <>
      <Box
        className="musicPlayCotroller"
        display={"flex"}
        width={"100%"}
        height={"20%"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
        color="white"
      >
        <IoIosSkipBackward onClick={handlePreviousSong} />
        <Box>
          <FaPlay className="musicPlay" onClick={playMusic} cursor="pointer" />
        </Box>
        <IoIosSkipForward onClick={handleNextSong} />
      </Box>
    </>
  );
};

export default MusicController;
