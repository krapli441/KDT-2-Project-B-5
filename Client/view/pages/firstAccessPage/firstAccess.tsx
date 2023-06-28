import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillGoogleCircle } from "react-icons/ai";
import { HiOutlinePencilAlt } from "react-icons/Hi";
import IntroLogo from "../introPage/introLogo.png";

export default function Login() {
  return (
    <>
      <div /* className={loginStyle.main} */>
        <img
          /*           className={loginStyle.titleImg}
           */ src={IntroLogo}
          width="80%"
          alt="로고"
        />
        <div /* className={loginStyle.loginTypeBox} */>
          <div /* className={loginStyle.googleLoginButton} */>
            <AiFillGoogleCircle /* className={loginStyle.googleLoginIcon}  */ />
            Google을 이용하여 시작하기
          </div>
          <NavLink to="/signup" /* className={loginStyle.link} */>
            <div /* className={loginStyle.signUpButton} */>
              <HiOutlinePencilAlt /* className={loginStyle.createAccountIcon}  */
              />
              회원가입
            </div>
          </NavLink>
        </div>
        <NavLink to="/login">
          <div /* className={loginStyle.moveToLogin} */>
            <p>계정이 이미 있으신가요?</p>
          </div>
        </NavLink>
      </div>
    </>
  );
}

//first > 회원가입  signup or 비번 찾기 login >home
