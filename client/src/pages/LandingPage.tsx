import React, { useEffect } from "react";
import { Button } from "antd";
import styled from "styled-components";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNickname } from "../store/user";

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
    if (searchParams.get("token")) {
      localStorage.setItem("token", searchParams.get("token") as string);
      navigate("/room");
    }
  }, []);

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
    <LandingBox>
      <Text>GET Start PING-PONG!</Text>
      <div>
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
      </div>
    </LandingBox>
  );
}
