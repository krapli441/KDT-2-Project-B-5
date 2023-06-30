import React from "react";
import Map from "../../../utils/createTmapAPI";
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
const styles = {
  width: "340px",
  height: "930px",
  backgroundColor: "red",
};

export default function main() {
  return (
    <>
      {/*  <Map /> */}
      <div style={styles}></div>
      <MusicPlayer />
      <MdOutlineGpsFixed style={gpsBottunStyle} />
    </>
  );
}
