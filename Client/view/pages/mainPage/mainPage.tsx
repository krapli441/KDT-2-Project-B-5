import React from "react";
import NaverMap from "../../../utils/naverMap";
import MusicPlayer from "../musicPlayerPage/musicPlayerPageScreen";
import { MdOutlineGpsFixed } from "react-icons/md";

export default function main() {
  return (
    <>
      <MusicPlayer />
      <MdOutlineGpsFixed fontSize="40px" />
      <NaverMap />
    </>
  );
}
