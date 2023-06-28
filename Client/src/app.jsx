import React, {Component, useState} from 'react';
import { Route, Routes, useLocation } from "react-router-dom";


export default function App() {
    
    
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setPageTitle("");
        break;
      case "/home":
        setPageTitle("홈");
        break;
      case "/account":
        setPageTitle("내 정보");
        break;
      case "/station":
        setPageTitle("정류장");
        break;
      case "/first":
        setPageTitle("");
        break;
      case "/login":
        setPageTitle("");
        break;
      case "/signup":
        setPageTitle("회원가입");
        break;
      case "/welcome_1":
        setPageTitle("");
        break;
      case "/welcome_2":
        setPageTitle("");
        break;
      case "/welcome_3":
        setPageTitle("");
        break;
      default:
        setPageTitle("홈");
        break;
    }
  }, [location.pathname]);
  
    return (
    <>
      <div className="container">
        <Header title={pageTitle} />
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/home" element={<MainScreen />} />
            <Route path="/first" element={<FirstPage />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/welcome_1" element={<FirstLoginPage />} />
            <Route path="/welcome_2" element={<WelcomeSecond />} />
            <Route path="/welcome_3" element={<WelcomeThird />} />
          </Routes>
        {[
          "/",
          "/first",
          "/signup",
          "/login",
          "/welcome_1",
          "/welcome_2",
          "/welcome_3",
        ].includes(location.pathname) ? null : (
          <Nav />
        )}
      </div>
    </>
  );

}
