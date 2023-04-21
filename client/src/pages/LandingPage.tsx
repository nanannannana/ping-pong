import React, { useEffect } from "react";
import { Button } from "antd";
import styled from "styled-components";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNickname } from "../store/user";
import Kakao_Logout from "../services/KakaoLogout";

const LandingBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 155px);
`;

const Text = styled.div`
  font-size: 3rem;
  font-weight: bolder;
  padding-bottom: 20px;
`;

export default function LandingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const kakaoLogin = () => {
    window.location.href = `http://${process.env.REACT_APP_SERVER_URI}/auth/kakao`;
  };

  useEffect(() => {
    if (searchParams.get("user-no")) {
      // localStorage.setItem("token", searchParams.get("token") as string);
      localStorage.setItem("Id", searchParams.get("user-no") as string);
      localStorage.setItem("nickname", searchParams.get("nickname") as string);
      navigate("/room");
    }
  }, []);

  const kakaoLogout = async () => {
    window.location.href = Kakao_Logout;
    localStorage.clear();
  };

  return (
    <LandingBox>
      <Text>GET Start PING-PONG!</Text>
      <div>
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
      </div>
    </LandingBox>
  );
}
