import { Button, Form, Input } from "antd";
import React from "react";
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

  const onFinish = (values: Login) => {
    fetch(`http://${process.env.REACT_APP_SERVER_URI}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 401) {
          alert("이메일 혹은 비밀번호를 다시 입력하세요.");
        } else if (data.statusCode === 400) {
          alert("이메일을 올바르게 작성해주세요.");
        } else {
          sessionStorage.setItem("nickname", data.nickname);
          navigate("/room");
        }
      })
      .catch((err) => console.error(err));
  };

  const kakaoLogin = () => {
    window.location.href = `http://${process.env.REACT_APP_SERVER_URI}/auth/kakao`;
  };

  return (
    <LoginBox>
      <div
        style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "30px" }}
      >
        Login
      </div>
      <Form
        name="basic"
        style={{ width: 400 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <img
          src="./kakao_img.png"
          style={{ float: "right", height: "32.5px" }}
          onClick={kakaoLogin}
        />

        <Form.Item style={{ float: "right", marginRight: "10px" }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </LoginBox>
  );
}
