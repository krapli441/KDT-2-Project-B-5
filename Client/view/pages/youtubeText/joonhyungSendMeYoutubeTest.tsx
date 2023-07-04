import React from "react";
import YouTube from "react-youtube";
const VideoPlayer = () => {
  // YouTube 동영상 ID를 가져옵니다.
  const videoId2 = "Y3fMr-gLkis";
  const videoId1 = "LtbrEnpVEDI";
  // YouTube 재생 옵션을 설정합니다.
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  // onReady 이벤트 핸들러
  const onReady = (event: any) => {
    event.target.playVideo();
  };
  const onPlayerStateChange = (event:any) => {
    if (event.data === 0) {
      
        <YouTube
        className="player"    
        style={{ width: "100%", height: "50%" }}
        videoId={videoId2}
        opts={opts}
        onReady={onReady}
        key={videoId2}
        onStateChange={onPlayerStateChange}
      />
    }
  };

  return (
    <YouTube
      className="player"    
      style={{ width: "100%", height: "50%" }}
      videoId={videoId1}
      opts={opts}
      onReady={onReady}
      key={videoId1}
      onStateChange={onPlayerStateChange}
    />
  );
};
export default VideoPlayer;







