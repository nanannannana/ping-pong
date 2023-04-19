import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 155px);
`;

interface Login {
  email: string;
  password: string;
}

export default function SignInPage() {
  const navigate = useNavigate();
  const kakaoLogin = () => {
    window.location.href = `http://${process.env.REACT_APP_SERVER_URI}/auth/kakao`;
  };

  const kakaoLogout = async () => {
    await fetch(`https://kapi.kakao.com/v1/user/unlink`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        localStorage.clear();
        alert("로그아웃 완료");
        navigate("/");
      } else {
        alert("카카오 로그아웃 실패!");
      }
    });
  };

  return (
    <LoginBox>
      <div
        style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "30px" }}
      >
        {localStorage.getItem("token") ? "Logout" : "Login"}
      </div>

      {localStorage.getItem("token") ? (
        <Button color="warning" onClick={kakaoLogout}>
          카카오 로그아웃
        </Button>
      ) : (
        <img
          src="./kakao_login.png"
          style={{ float: "right", height: "32.5px" }}
          alt="kakao_login"
          onClick={kakaoLogin}
        />
      )}
    </LoginBox>
  );
}
