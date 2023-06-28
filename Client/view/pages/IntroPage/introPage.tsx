// 리액트 라이브러리
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";

// 리액트 컴포넌트
import IntroLogo from "./introLogo.png";

function introPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/first");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Box className="introLogo">
        <img src={IntroLogo} width="80%" alt="시작로고" />
      </Box>
    </>
  );
}

export default introPage;
