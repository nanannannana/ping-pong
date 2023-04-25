import { Button, Card } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { socket } from "../utils/socket";
import { IRoom } from "../components/Interfaces";
import Room from "../components/Room";
import chatImage from "../assets/image/chat.png";
import { useNavigate } from "react-router-dom";

const OutBox = styled.div`
  width: 550px;
  margin: 0 auto;
  padding-top: 20px;
  height: calc(100vh - 155px);
  background-color: #ecf3ff;
`;
const MypageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
`;
const RoomNotFound = styled.div`
  width: 450px;
  margin: 0 auto;
  height: calc(100vh - 325px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Text = styled.p`
  margin-bottom: 7px;
`;
const MypageMain = styled.div`
  padding: 15px;
  background-color: #fff;
  border-radius: 10px;
  width: 500px;
  height: calc(100vh - 275px);
  margin: 5px auto 0 auto;
  overflow: auto;
`;

export default function MyPage() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [members, setMembers] = useState([]);

  const kakaoUnlink = () => {
    window.location.href = `http://${process.env.REACT_APP_SERVER_URI}/auth/unlink`;
  };
  useEffect(() => {
    socket.emit("find-rooms", localStorage.getItem("Id"));
    socket.on("is-in-rooms", (rooms) => setRooms(rooms));
    socket.on("members", (members) => setMembers(members));
  }, []);

  return (
    <OutBox>
      <MypageHeader>
        <div
          style={{
            display: "inline-block",
            fontSize: "1.7rem",
            fontWeight: "bolder",
          }}
        >
          <Text>{localStorage.getItem("nickname")}님,</Text>
          <Text>안녕하세요!</Text>
        </div>
        <Button style={{ marginTop: "1.3rem" }} onClick={() => kakaoUnlink()}>
          회원 탈퇴
        </Button>
      </MypageHeader>
      <MypageMain>
        <div style={{ fontWeight: "bolder", paddingLeft: "20px" }}>
          채팅방 목록
        </div>
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
              withdrawal={true}
            />
          ))
        )}
      </MypageMain>
    </OutBox>
  );
}
