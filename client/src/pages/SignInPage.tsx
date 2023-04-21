import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Kakao_Logout from "../services/KakaoLogout";

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 155px);
`;

export default function SignInPage() {
  const navigate = useNavigate();
  const kakaoLogin = () => {
    window.location.href = `http://${process.env.REACT_APP_SERVER_URI}/auth/kakao`;
    navigate("/room");
  };

  const kakaoLogout = () => {
    window.location.href = Kakao_Logout;
    localStorage.clear();
  };

  return (
    <LoginBox>
      <div
        style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "30px" }}
      >
        {localStorage.getItem("Id") ? "Logout" : "Login"}
      </div>

      {localStorage.getItem("Id") ? (
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
