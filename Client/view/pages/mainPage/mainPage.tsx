import React from "react";
import NaverMap from "../../../utils/naverMap";
import MusicPlayer from "../musicPlayerPage/musicPlayerPageScreen";
import { MdOutlineGpsFixed } from "react-icons/md";

const gpsBottunStyle: React.CSSProperties = {
  display: "flex",
  position: "relative",
  top: "25rem",
  left: "10rem",
  zIndex: "999",
  backgroundColor: "red",
  justifyContent: "center",
  fontSize: "40px",
};

export default function main() {
  return (
    <>
      <NaverMap />

      <MusicPlayer />
      <MdOutlineGpsFixed style={gpsBottunStyle} />
    </>
  );
}
