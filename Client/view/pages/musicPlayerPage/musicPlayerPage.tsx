import React, { useState } from "react";
import { CgPlayTrackPrev } from "react-icons/cg";
import { CgPlayTrackNext } from "react-icons/cg";
import { CgPlayButton } from "react-icons/cg";
import { CgPlayStop } from "react-icons/cg";

export default function musicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  const musicPlayerStyle: React.CSSProperties = {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
  };

  return (
    <div style={musicPlayerStyle}>
      <></>
      <CgPlayTrackPrev fontSize={70} color="white" />
      {isPlaying ? (
        <CgPlayStop onClick={handleClick} fontSize={70} color="white" />
      ) : (
        <CgPlayButton onClick={handleClick} fontSize={70} color="white" />
      )}
      <CgPlayTrackNext fontSize={70} color="white" />
    </div>
  );
}
