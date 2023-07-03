// 리액트 라이브러리
import React, { useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import "@dotlottie/player-component";
import {AuthContext} from '../../../utils/Context'
// 리액트 컴포넌트
import IntroLogo from "./introLogo.png";


function IntroPage() {
  const {setCongestion}= useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCongestion(3)
      navigate("/first");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Box
        className="introLogo"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        backgroundColor={"white"}
      >
        <dotlottie-player
          src="../../components/asphalt.lottie"
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
        {/* <img src={IntroLogo} width="70%" alt="로고" /> */}
      </Box>
    </>
  );
}

export default IntroPage;