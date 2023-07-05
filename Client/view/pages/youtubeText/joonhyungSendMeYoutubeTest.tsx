import React, { useContext, useState, useEffect } from "react";
import YouTube from "react-youtube";
import { AuthContext } from "../../../utils/trafficCongestionContext";

const VideoPlayer = () => {
  const trafficStatusZero = ["aUndbCBVV0c", "Y3fMr-gLkis", "iGWKNrtbF9I"];
  const trafficStatusOne = ["nERQ6u1NZgA", "ApXoWvfEYVU", "r1hjXK1kzOc"];
  const trafficStatusTwo = ["s2qAzRWg5VQ", "uu_3AU3-a9E", "AAOyOZ3GeZ0"];
  const trafficStatusThree = ["CP9PXe74mW8", "00LLwjonJv4", "w4qYzE9hTto"];
  const trafficStatusFour = ["4Ukh9aQBzWc", "hAjiKVEWZSk", "kON9fn01rUQ"];
  const videoId2 = "Y3fMr-gLkis";
  const videoId1 = "DLr8m_W3HbU";

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const [currentVideoId, setCurrentVideoId] = useState(videoId1);
  const { congestion, isPlaying } = useContext(AuthContext);

  const onReady = (event: any) => {
    event.target.playVideo();
  };

  const onPlayerStateChange = (event: any) => {
    if (event.data === 0) {
      console.log("test=", congestion);

      // 랜덤 Video ID 선택
      let randomVideoId = currentVideoId;

      // 현재 Video ID와 다른 값이 나올 때까지 반복해서 선택
      while (randomVideoId === currentVideoId) {
        const randomIndex = Math.floor(Math.random() * 3);
        console.log("randomIndex:", randomIndex);

        if (congestion === "정보 없음") {
          randomVideoId = trafficStatusZero[randomIndex];
        } else if (congestion === "원활") {
          randomVideoId = trafficStatusOne[randomIndex];
        } else if (congestion === "서행") {
          randomVideoId = trafficStatusTwo[randomIndex];
        } else if (congestion === "지체") {
          randomVideoId = trafficStatusThree[randomIndex];
        } else if (congestion === "정체") {
          randomVideoId = trafficStatusFour[randomIndex];
        }
      }

      setCurrentVideoId(randomVideoId);
    }
  };

  useEffect(() => {
    const player = document.getElementById("youtube-player");
    if (player) {
      player.addEventListener("onStateChange", onPlayerStateChange);
    }
    return () => {
      if (player) {
        player.removeEventListener("onStateChange", onPlayerStateChange);
      }
    };
  }, [currentVideoId]);

  return (
    <>
      <YouTube
        id="youtube-player"
        className="player"
        style={{ width: "100%", height: "100%" }}
        videoId={currentVideoId}
        opts={opts}
        onReady={onReady}
        key={currentVideoId}
        onStateChange={onPlayerStateChange}
      />
    </>
  );
};

export default VideoPlayer;
