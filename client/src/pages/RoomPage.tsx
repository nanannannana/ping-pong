import { Input } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import "../components/RoomPage.css";
import { socket } from "../utils/socket";
import { useNavigate } from "react-router-dom";
import Room from "../components/Room";
import { IRoom } from "../components/Interfaces";
import chatImage from "../assets/image/chat.png";

const RoomBox = styled.div`
  width: 500px;
  margin: 0 auto;
  margin-top: 20px;
  height: calc(100vh - 195px);
  overflow: auto;

  @media (max-width: 500px) {
    width: 320px;
  }
`;
const RoomNotFound = styled.div`
  width: 450px;
  margin: 0 auto;
  height: calc(100vh - 230px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SearchBox = styled(Input.Search)`
  width: 450px;
  display: block;
  margin: auto;

  @media (max-width: 500px) {
    width: 300px;
  }
`;

export default function RoomPage() {
  const [rooms, setRooms] = useState([]);
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("joined", (room) => {
      navigate(`/chat/${room.roomInfo.roomName}`);
      sessionStorage.setItem("roomID", room.roomInfo._id);
      sessionStorage.setItem("isNew", room.isNew);
    });
    socket.emit("find-rooms", localStorage.getItem("Id"));
    socket.on("is-in-rooms", (rooms) => setRooms(rooms));
    socket.on("members", (members) => setMembers(members));
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
      <SearchBox
        placeholder="방을 검색 & 생성해보세요!"
        onSearch={onSearchRoom}
      />
      {rooms.length === 0 ? (
        <RoomNotFound>
          <img
            src={chatImage}
            alt="chatImage"
            style={{ width: "50px", height: "50px" }}
          />
        </RoomNotFound>
      ) : (
        rooms.map((v: IRoom, i: number) => (
          <Room
            key={i}
            roomName={v.roomName}
            members={members}
            withdrawal={null}
          />
        ))
      )}
    </RoomBox>
  );
}
