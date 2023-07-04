import React, { useEffect } from "react";

import Beenzino from "../public/music/TimeTravel.mp3";

const AudioPlayer = () => {
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

  return <button onClick={playMusic}>Play Music</button>;
};

export default AudioPlayer;
