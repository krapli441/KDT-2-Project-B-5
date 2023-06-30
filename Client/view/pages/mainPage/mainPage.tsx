import React from "react";
import Map from "../../../utils/createTmapAPI";
import MusicPlayer from "../musicPlayerPage/musicPlayerPageScreen";
import { MdOutlineGpsFixed } from "react-icons/md";
import { Box } from "@chakra-ui/react";

const gpsBottunStyle: React.CSSProperties = {
  display: "flex",
  position: "relative",
  top: "25rem",
  left: "10rem",
  zIndex: "999",
  backgroundColor: "red",
  justifyContent: "center",
  textAlign: "center",

  fontSize: "40px",
};
const styles: React.CSSProperties = {
  width: "430px",
  height: "930px",
  backgroundColor: "red",
  zIndex: "999",
  bottom: "0",
  position: "fixed",
};

export default function main() {
  return (
    <Box>
      {/*  <Map /> */}
      <div style={styles}></div>
      {/*       <MusicPlayer />
      <MdOutlineGpsFixed style={gpsBottunStyle} /> */}
    </Box>
  );
}
