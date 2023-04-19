import { Card, Input } from "antd";
import React, { useEffect } from "react";
import styled from "styled-components";
import "../components/RoomPage.css";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { socket } from "../utils/socket";

const RoomBox = styled.div`
  max-width: 1280px;
  margin-top: 20px;
`;

export default function RoomPage() {
  useEffect(() => {
    socket.connect();
    socket.emit("events", "hello");
  }, []);

  const onSearchRoom = (roomName: string) => {
    socket.emit("join", roomName);
  };

  return (
    <RoomBox>
      <Input.Search
        placeholder="input search text"
        onSearch={onSearchRoom}
        style={{ width: 450, display: "block", margin: "auto" }}
      />
      <Card
        className="chatRoom"
        title="Default size card"
        extra={<a href="#">More</a>}
        style={{ width: 450, margin: "10px auto" }}
      >
        <div>Card content</div>
      </Card>
      <Card
        className="chatRoom"
        title="Default size card"
        extra={<a href="#">More</a>}
        style={{ width: 450, margin: "10px auto" }}
      >
        <div>Card content</div>
      </Card>
    </RoomBox>
  );
}
