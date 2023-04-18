import React from "react";
import { Button } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
  return (
    <LandingBox>
      <Text>GET Start PING-PONG!</Text>
      <div>
        <Button style={{ marginRight: "10px" }}>
          <Link to="/login">Login</Link>
        </Button>
        <Button>
          <Link to="/register">Register</Link>
        </Button>
      </div>
    </LandingBox>
  );
}
