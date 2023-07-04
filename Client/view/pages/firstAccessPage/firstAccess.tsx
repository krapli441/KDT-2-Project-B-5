// 리액트 라이브러리
import React, { useEffect } from "react";
import { Box, Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// 리액트 컴포넌트
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
        className="main"
        style={flexCenter}
        width={"100%"}
        height={"100%"}
        flexDirection={"column"}
        justifyContent={"space-evenly"}
        justifyContent={"space-evenly"}
        backgroundColor={"white"}
      >
        <img src={IntroLogo} width="70%" alt="로고" />
        <Box
          className="selectLoginType"
          style={flexCenter}
          style={flexCenter}
          flexDirection={"column"}
          justifyContent={"space-evenly"}
          width={"100%"}
          height={"180px"}
          width={"100%"}
          height={"180px"}
        >
          <Link to={"/signup"}>
            <Button
              backgroundColor="#D9D9D9"
              color="white"
              width={"340px"}
              height={"60px"}
              _hover={{ bg: "#C9C9C9" }}
              _active={{
                bg: "#B3B3B3",
                transform: "scale(0.98)",
              }}
            >
              회원가입
            </Button>
          </Link>
          <Link to="/login">
            <Button
              className="loginButton"
              style={buttonStyling}
              backgroundColor={"#FFB703"}
              color={"white"}
              _hover={{ bg: "#FF8B03" }}
              _active={{
                bg: "#FF7C03",
                transform: "scale(0.98)",
              }}
            >
              로그인
            </Button>
          </Link>
          <Box
            className="createAccoutButton"
            style={buttonStyling}
            backgroundColor={"#D9D9D9"}
          >
            회원가입
          </Box>
          <Box
            className="loginButton"
            style={buttonStyling}
            backgroundColor={"#FFB703"}
          >
            로그인
          </Box>
          <Link to="/tMap">티맵으로 이동하기</Link>
        </Box>
      </Box>
    </>
  );
}
