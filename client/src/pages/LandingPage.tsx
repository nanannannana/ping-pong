import React, { useEffect } from "react";
import { Button } from "antd";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const navigate = useNavigate();

  const kakaoLogin = () => {
    window.location.href = `http://${process.env.REACT_APP_SERVER_URI}/auth/kakao`;
  };

  useEffect(() => {
    if (searchParams.get("user-no")) {
      localStorage.setItem("Id", searchParams.get("user-no") as string);
      localStorage.setItem("nickname", searchParams.get("nickname") as string);
      navigate("/room");
    } else if (searchParams.get("unlink")) {
      if (searchParams.get("unlink") === "success") {
        localStorage.clear();
        sessionStorage.clear();
        alert("회원 탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.");
        navigate("/");
      } else {
        alert("탈퇴 처리 중 오류가 발생했습니다. 다시 시도해 주세요.");
        navigate("/");
      }
    }
  }, []);

  const kakaoLogout = async () => {
    window.location.href = Kakao_Logout;
    fetch(`http://${process.env.REACT_APP_SERVER_URI}/auth/logout`, {
      method: "GET",
    });
    localStorage.clear();
  };

  return (
    <LandingBox>
      <Text>GET START PING-PONG!</Text>
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
