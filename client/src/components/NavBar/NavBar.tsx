import { Menu } from "antd";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./NavBar.css";

const Logo = styled.img`
  width: 30px;
  height: 30px;
  margin: 20px 50px 0 20px;
  float: left;
`;

export default function NavBar() {
  return (
    <nav style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      <a href="/">
        <Logo src="./chat.png" />
      </a>
      <Menu className="custom-menu" mode="horizontal">
        <Menu.Item key="home" style={{ lineHeight: "5" }}>
          <Link to="/room">Home</Link>
        </Menu.Item>
        <Menu.Item key="chat" style={{ lineHeight: "5" }}>
          <Link to="/chat">Chat</Link>
        </Menu.Item>
        <Menu.Item key="Mypage" style={{ lineHeight: "5" }}>
          <Link to="/mypage">Mypage</Link>
        </Menu.Item>
        <Menu.Item key="login" style={{ lineHeight: "5" }}>
          <Link to="/login">Login</Link>
        </Menu.Item>
      </Menu>
    </nav>
  );
}
