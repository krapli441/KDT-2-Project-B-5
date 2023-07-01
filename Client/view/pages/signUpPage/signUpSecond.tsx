// 리액트 라이브러리
import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

// 외부 라이브러리
import {
  Box,
  FormControl,
  Input,
  Button,
  Text,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import "@fontsource/staatliches";

// 리액트 컴포넌트
import CreateAccountCheckBox from "./checkBox";

const CreateAccount: React.FC = () => {
  const [input, setInput] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phoneNumber: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에서 formData를 처리하는 작업을 수행합니다.
    // 예: 서버로 데이터 전송 등
    console.log(formData);
  };

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
        onSubmit={handleSubmit}
      >
        <Input
          type="email"
          placeholder="아이디 (이메일)"
          height={"60px"}
          required
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <Input
          type="password"
          placeholder="비밀번호"
          height={"60px"}
          required
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />

        <Input
          type="password"
          placeholder="비밀번호 확인"
          height={"60px"}
          required
        />
        <Input
          type="text"
          placeholder="이름"
          height={"60px"}
          required
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <NumberInput>
          <NumberInputField
            height={"60px"}
            placeholder="휴대전화번호"
            name="number"
            onChange={handleInputChange}
            value={formData.phoneNumber}
          ></NumberInputField>
        </NumberInput>
        <CreateAccountCheckBox />
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
      <Link to="/first">
        <Button
          mt={4}
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
          돌아가기
        </Button>
      </Link>
    </>
  );
};

export default CreateAccount;
