import { Button, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignUpBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 155px);
`;

interface SignUp {
  email: string;
  password: string;
  nickname: string;
}

export default function SignUpPage() {
  const navigate = useNavigate();
  const onFinish = (values: SignUp) => {
    fetch(`${process.env.REACT_APP_SERVER_URI}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 400)
          alert("이메일 혹은 비밀번호를 정확히 입력하세요.");
        else if (data.statusCode === 409)
          alert("이메일이 중복됩니다. 다시 입력해주세요.");
        else navigate("/login");
      });
  };

  return (
    <SignUpBox>
      <div
        style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "30px" }}
      >
        Register
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

        <Form.Item
          label="Nickname"
          name="nickname"
          rules={[{ required: true, message: "Please input your Nickname!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item style={{ float: "right" }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </SignUpBox>
  );
}
