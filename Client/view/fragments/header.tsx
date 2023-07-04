// 리액트 라이브러리
import React from "react";

// 외부 라이브러리
import { Box, Text } from "@chakra-ui/react";

// 리액트 컴포넌트
const Header: React.FC = () => {
  return (
    <Box
      className="header"
      display={"flex"}
      alignItems={"center"}
      width={"100%"}
      height={"10%"}
    >
      <Text fontFamily={"Staatliches"} fontSize={"50px"}>
        ASPHALT
      </Text>
    </Box>
  );
};

export default Header;
