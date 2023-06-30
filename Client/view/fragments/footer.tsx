import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import MusicPlayer from "../pages/musicPlayerPage/musicPlayerPageScreen";

import { AiFillHome } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoMdMenu } from "react-icons/io";

const navAllStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
  fontSize: "40px",
  height: "180px",
  flexDirection: "column",
  backgroundColor: "#21325E",
};

const navStyle: React.CSSProperties = {
  display: "flex",
  borderTop: "1px solid black",
  justifyContent: "space-evenly",
};

export default function nav() {
  return (
    <div>
      <div style={navAllStyle}>
        <MusicPlayer />

        <div style={navStyle}>
          <IoMdMenu fontSize="60px" />
          <AiFillHome fontSize="60px" />
        </div>
      </div>
    </div>
  );
}
