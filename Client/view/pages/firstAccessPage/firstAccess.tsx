// 리액트 라이브러리
import React from "react";
import { Box, Image } from "@chakra-ui/react";
// 리액트 컴포넌트
import { NavLink } from "react-router-dom";
import { BsKeyFill } from "react-icons/Bs";
import { HiOutlinePencilAlt } from "react-icons/Hi";
import IntroLogo from "../introPage/introLogo.png";

export default function Login() {
  return (
    <>
      <Box>
        <img src={IntroLogo}></img>
        <Box>
          <Box className="createAccoutButton">
            <HiOutlinePencilAlt />
            회원가입
          </Box>
          <Box className="loginButton">
            <BsKeyFill />
            로그인
          </Box>
        </Box>
      </Box>
    </>
  );
}
