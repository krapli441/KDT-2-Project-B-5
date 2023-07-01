// 리액트 라이브러리
import React from "react";
import { Box, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
// 리액트 컴포넌트
import { BsKeyFill } from "react-icons/Bs";
import { HiOutlinePencilAlt } from "react-icons/Hi";
import IntroLogo from "../introPage/introLogo.png";

const flexCenter = {
  display: "flex",
  alignItems: "center",
};

const buttonStyling = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "340px",
  height: "60px",
  borderRadius: "5px",
};

export default function Login() {
  return (
    <>
      <Box
        className="main"
        style={flexCenter}
        width={"100%"}
        height={"100%"}
        flexDirection={"column"}
        justifyContent={"space-evenly"}
        backgroundColor={"white"}
      >
        <img src={IntroLogo} width="70%" alt="로고" />
        <Box
          className="selectLoginType"
          style={flexCenter}
          flexDirection={"column"}
          justifyContent={"space-evenly"}
          width={"100%"}
          height={"180px"}
        >
          <Link to={"/signup"}>
            <Box
              className="createAccoutButton"
              style={buttonStyling}
              backgroundColor={"#D9D9D9"}
            >
              회원가입
            </Box>
          </Link>
          <Link to="/login">
            <Box
              className="loginButton"
              style={buttonStyling}
              backgroundColor={"#FFB703"}
            >
              로그인
            </Box>
          </Link>
          <Link to="/tMap">티맵으로 이동하기</Link>
        </Box>
      </Box>
    </>
  );
}
