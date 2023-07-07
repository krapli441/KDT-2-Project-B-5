// 리액트 라이브러리
import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
// 리액트 컴포넌트
import App from "./app";

// ! firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9I0sGuJh3PKKLvxuvNhbc7CeE3KyFduE",
  authDomain: "asphalt-1ec0c.firebaseapp.com",
  projectId: "asphalt-1ec0c",
  storageBucket: "asphalt-1ec0c.appspot.com",
  messagingSenderId: "808633747410",
  appId: "1:808633747410:web:ba7d4fb13cf123844b6a0b",
  measurementId: "G-0NT3PCGVDE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// !

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
