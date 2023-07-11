// 리액트 라이브러리
import React, { useContext } from "react";
import { AuthContext } from "../../../utils/trafficCongestionContext";

// 외부 라이브러리
import { Box, Text } from "@chakra-ui/react";

// 리액트 컴포넌트
const Header: React.FC = () => {
  const { congestion } = useContext(AuthContext);
  const { color } = useContext(AuthContext);

  return (
    <Box
      className="header"
      display={"flex"}
      justifyContent={"space-around"}
      alignItems={"center"}
      width={"100%"}
      height={"10%"}
      gap={"80px"}
    >
      <Text fontFamily={"Staatliches"} fontSize={"50px"}>
        ASPHALT
      </Text>
      <Text
        fontFamily={"Pretendard"}
        fontSize={"30px"}
        fontWeight={"bold"}
        textAlign={"center"}
        color={"white"}
        background={color}
        borderRadius={"10px"}
        width={"30%"}
        transition={"all 0.2s ease"}
      >
        {congestion}
      </Text>
    </Box>
  );
};

export default Header;
