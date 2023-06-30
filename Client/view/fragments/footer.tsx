// 리액트 라이브러리
import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
// 리액트 컴포넌트
import MusicPlayer from "../pages/musicPlayerPage/musicPlayerPageScreen";

// 리액트 아이콘
import { AiFillHome } from "react-icons/ai";
import { IoMdMenu } from "react-icons/io";
import { BiSearchAlt2 } from "react-icons/bi";

// ? gps 버튼 저기로 바꾸면 어떨까요 귀찮아서 검색이미지로 놔둠
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
          <IoMdMenu fontSize="60px" color="white" />
          <AiFillHome fontSize="60px" color="white" />
          <BiSearchAlt2 fontSize="60px" color="white" />
        </div>
      </div>
    </div>
  );
}
