// 리액트 라이브러리
import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

// 외부 라이브러리
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import "@fontsource/staatliches";

// 리액트 컴포넌트
import IndeterminateExample from "./checkBox";

const CreateAccount: React.FC = () => {
  const [input, setInput] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const isError = input === "";

  return (
    <>
      <Box
        className="header"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"80%"}
      >
        <Box className="signUpInfoText">
          <Text fontSize={"24px"}>회원가입</Text>
          <Text fontSize={"13px"}>회원 정보를 입력해주세요.</Text>
        </Box>
        <Box className="serviceLogoText">
          <Text fontFamily={"Staatliches"} fontSize={"50px"}>
            ASPHALT
          </Text>
        </Box>
      </Box>
      <FormControl
        className="createAccountForm"
        display={"flex"}
        flexDirection={"column"}
        width={"80%"}
        gap={"27px"}
        isRequired
      >
        <Input
          type="email"
          placeholder="아이디 (이메일)"
          height={"60px"}
          required
        />

        <Input
          type="password"
          placeholder="비밀번호"
          height={"60px"}
          required
        />

        <Input
          type="password"
          placeholder="비밀번호 확인"
          height={"60px"}
          required
        />
        <Input type="text" placeholder="이름" height={"60px"} required />
        <Input
          type="number"
          placeholder="휴대전화번호"
          height={"60px"}
          required
        />
        <IndeterminateExample />
        <Button
          mt={4}
          backgroundColor="#FFB703"
          color="white"
          type="submit"
          width={"340px"}
          height={"60px"}
          _hover={{ bg: "#FF8B03" }}
          _active={{
            bg: "#FF7C03",
            transform: "scale(0.98)",
          }}
        >
          회원가입
        </Button>
      </FormControl>
    </>
  );
};

export default CreateAccount;
