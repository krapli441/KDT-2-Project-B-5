// 리액트 라이브러리
import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
// 리액트 컴포넌트
import App from "./app";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
    <ChakraProvider>
      <Box
        id="rootBackground"
        width={"100vw"}
        height={"100vh"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        backgroundColor={"gray.700"}
      >
        <App></App>
      </Box>
    </ChakraProvider>
  </BrowserRouter>
);
