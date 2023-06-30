import React from "react";
import Map from "../../../utils/createTmapAPI";
import MusicPlayer from "../musicPlayerPage/musicPlayerPageScreen";
import { MdOutlineGpsFixed } from "react-icons/md";
import { Box } from "@chakra-ui/react";

const styles: React.CSSProperties = {
  width: "430px",
  height: "750px",
  backgroundColor: "red",
};

export default function main() {
  return (
    <>
      {/*  <Map /> */}
      <div style={styles}></div>
      {/*       <MusicPlayer />
      <MdOutlineGpsFixed style={gpsBottunStyle} /> */}
    </>
  );
}
