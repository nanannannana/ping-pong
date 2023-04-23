import { Menu } from "antd";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./NavBar.css";
import logoImage from "../../assets/image/chat.png";

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
        <Logo src={logoImage} />
      </a>
      <Menu className="custom-menu" mode="horizontal">
        <Menu.Item key="chat" style={{ lineHeight: "5" }}>
          <a href="/room">Chat</a>
        </Menu.Item>
        <Menu.Item key="Mypage" style={{ lineHeight: "5" }}>
          <Link to="/mypage">Mypage</Link>
        </Menu.Item>
        {localStorage.getItem("token") && (
          <Menu.Item key="logout" style={{ lineHeight: "5" }}>
            <Link to="/login">Logout</Link>
          </Menu.Item>
        )}
      </Menu>
    </nav>
  );
}
