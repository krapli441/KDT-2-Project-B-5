import React, { useState } from "react";
import YouTube from "react-youtube";

const VideoPlayer = () => {
  const videoId2 = "Y3fMr-gLkis";
  const videoId1 = "LtbrEnpVEDI";
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const [currentVideoId, setCurrentVideoId] = useState(videoId1);

  const onReady = (event: any) => {
    event.target.playVideo();
  };

  const onPlayerStateChange = (event: any) => {
    if (event.data === 0 && currentVideoId === videoId1) {
      setCurrentVideoId(videoId2);
    }
  };

  return (
    <YouTube
      className="player"
      style={{ width: "100%", height: "50%" }}
      videoId={currentVideoId}
      opts={opts}
      onReady={onReady}
      key={currentVideoId}
      onStateChange={onPlayerStateChange}
    />
  );
};

export default VideoPlayer;
