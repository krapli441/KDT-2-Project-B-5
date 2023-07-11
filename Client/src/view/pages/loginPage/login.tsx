import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      userId: email,
      password: password,
    };

    fetch("/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("POST 요청이 실패했습니다.");
        }
      })
      /*       .then((data) => {
        if (data.boolean === true) {
          if (data.result[0].lastAccess === null) {
            setCookie("userId", data.result[0].userId);
            setCookie("userNum", data.result[0].userNum);
            setCookie("userName", data.result[0].userName);
            navigate("/welcome_1");
          } else {
            setCookie("userNum", data.result[0].userNum);
            setCookie("userId", data.result[0].userId);
            setCookie("userName", data.result[0].userName);
            navigate("/home");
            // 로그인 성공했을 때 쿠키 생성
          }
        } else {
          alert("로그인 실패");
        }
      })
 */ .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className={``}>
        <form className="main" onSubmit={handleSubmit}>
          <div className={``}>
            <div className={``}>로그인</div>
            <div className={``}>회원 정보를 입력해주세요.</div>
          </div>
          <div className={``}>
            <input
              className="inputText"
              name="userId"
              type="email"
              placeholder="이메일"
              value={email}
              onChange={handleChangeEmail}
            />
            <input
              className="inputText"
              name="password"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={handleChangePassword}
            />
            <button type="submit" className={``}>
              로그인
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
