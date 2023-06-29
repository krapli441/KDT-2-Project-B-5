// 리액트 라이브러리
import React from "react";
import { Box, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
// 리액트 컴포넌트
import { BsKeyFill } from "react-icons/Bs";
import { HiOutlinePencilAlt } from "react-icons/Hi";
import IntroLogo from "../introPage/introLogo.png";

export default function Login() {
  return (
    <>
      <Box
        className="loginPage"
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        backgroundColor={"white"}
      >
        <img src={IntroLogo} width="70%" alt="로고" />
        <Box
          className="selectLoginType"
          display="flex"
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
          width={"301px"}
          height={"100px"}
        >
          <Box className="createAccoutButton">
            <HiOutlinePencilAlt />
            회원가입
          </Box>
          <Box className="loginButton">
            <BsKeyFill />
            로그인
          </Box>
          <Link to="/tMap">티맵으로 이동하기</Link>
        </Box>
      </Box>
    </>
  );
}
