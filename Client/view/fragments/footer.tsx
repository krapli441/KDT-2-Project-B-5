// 리액트 라이브러리
import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
// 리액트 컴포넌트
import MusicPlayer from "../pages/musicPlayerPage/musicPlayerPageScreen";

// 리액트 아이콘
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
      </div>
    </div>
  );
}
