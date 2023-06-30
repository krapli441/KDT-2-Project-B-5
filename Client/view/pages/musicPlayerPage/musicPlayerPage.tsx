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
    position: "relative",
    top: "25rem",
    left: "10rem",
    zIndex: "999",
    backgroundColor: "aqua",
    justifyContent: "center",
  };

  return (
    <div style={musicPlayerStyle}>
      <></>
      <CgPlayTrackPrev fontSize={40} />
      {isPlaying ? (
        <CgPlayStop onClick={handleClick} fontSize={40} />
      ) : (
        <CgPlayButton onClick={handleClick} fontSize={40} />
      )}
      <CgPlayTrackNext fontSize={40} />
    </div>
  );
}
