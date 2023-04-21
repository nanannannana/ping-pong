import { Input } from "antd";
import { useEffect } from "react";
import styled from "styled-components";
import "../components/RoomPage.css";
import { socket } from "../utils/socket";
import { useNavigate } from "react-router-dom";
import Room from "../components/Room";
import { useDispatch } from "react-redux";
import { setRoom } from "../store/chat";

const RoomBox = styled.div`
  max-width: 1280px;
  margin-top: 20px;
`;

export default function RoomPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.connect();
    socket.on("joined", (room) => {
      navigate(`/chat/${room.roomInfo.roomName}`, {
        state: { roomID: room.roomInfo._id },
      });
      sessionStorage.setItem("isNew", room.isNew);
    });
  }, [socket]);

  // room 생성
  const onSearchRoom = (roomName: string) => {
    socket.emit("join", {
      roomName,
      userNo: localStorage.getItem("Id"),
      nickName: localStorage.getItem("nickname"),
    });
  };

  return (
    <RoomBox>
      <Input.Search
        placeholder="방을 검색 & 생성해보세요!"
        onSearch={onSearchRoom}
        style={{ width: 450, display: "block", margin: "auto" }}
      />
      <Room />
      <Room />
    </RoomBox>
  );
}
