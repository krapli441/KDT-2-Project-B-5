import React, { useContext, useState } from "react";
import YouTube from "react-youtube";
import { AuthContext } from "../../../utils/Context";

const VideoPlayer = () => {
  const trafficStatusZero = ['aUndbCBVV0c','mkMiGm7Q','mkMiGm7Q'];
  const trafficStatusOne = ['nERQ6u1NZgA','ApXoWvfEYVU','r1hjXK1kzOc'];
  const trafficStatusTwo = ['s2qAzRWg5VQ','uu_3AU3-a9E','AAOyOZ3GeZ0'];
  const trafficStatusThree = ['CP9PXe74mW8','00LLwjonJv4','w4qYzE9hTto'];
  const trafficStatusFour = ['4Ukh9aQBzWc','hAjiKVEWZSk','kON9fn01rUQ'];
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
  const { congestion, isPlaying } = useContext(AuthContext);

  const onReady = (event: any) => {
    event.target.playVideo();
  };

  const onPlayerStateChange = (event: any) => {
    if (event.data === 0) {
      console.log('test=', congestion);

      // 랜덤 인덱스 생성
      const randomIndex = Math.floor(Math.random() * 3);
      console.log('randomIndex:', randomIndex);

      // 랜덤 Video ID 선택
      let randomVideoId = "";
      randomVideoId = trafficStatusFour[randomIndex];
      // if (congestion === 0) {
      //   randomVideoId = trafficStatusZero[randomIndex];
      // } else if (congestion === 1) {
      //   randomVideoId = trafficStatusOne[randomIndex];
      // } else if (congestion === 2) {
      //   randomVideoId = trafficStatusTwo[randomIndex];
      // } else if (congestion === 3) {
      //   randomVideoId = trafficStatusThree[randomIndex];
      // } else if (congestion === 4) {
      //   randomVideoId = trafficStatusFour[randomIndex];
      // }

      setCurrentVideoId(randomVideoId);
    }
  };

  return (
    <>
      <YouTube
        className="player"
        style={{ width: "100%", height: "50%" }}
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
