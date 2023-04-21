import { useEffect, useRef, useState } from "react";
import { socket } from "../utils/socket";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { Button, Input, Space } from "antd";
import MyDm from "../components/Chat/MyDm";
import OtherDm from "../components/Chat/OtherDm";
import Notice from "../components/Chat/Notice";
import { useDispatch, useSelector } from "react-redux";
import { addChat, newToExisting, setChatting, setRoom } from "../store/chat";
import { IChat } from "../components/Interfaces";

const ChatBox = styled.div`
  max-width: 500px;
  margin: 20px auto 0 auto;
  padding: 10px;
  height: calc(100vh - 175px);
`;
const Chatting = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #d7d7d7;
  height: calc(100vh - 230px);
  border-radius: 10px;
  overflow: auto;
`;

export default function ChattingPage() {
  const { roomName } = useParams();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const roomID = state.roomID;
  const chatting = useSelector((state: any) => state.chat.chatting);
  const [isDm, setIsDm] = useState(null);

  const getInputValue = (e: any) => setIsDm(e.target.value);

  useEffect(() => {
    // 기존 채팅 입장 시, 최신순 챗 가져옴
    socket.emit("find-chats", {
      roomName,
      roomID,
      isNew: sessionStorage.getItem("isNew"),
      nickname: localStorage.getItem("nickname"),
    });
    socket.on("prev-chats", (chat) => dispatch(setChatting(chat)));
    // 첫 입장 시, 입장 notice
    socket.on("notice", (chat) => {
      dispatch(addChat(chat));
      sessionStorage.removeItem("isNew");
    });
    socket.on("new-chat", (chat) => dispatch(addChat(chat)));
  }, []);
  // console.log("chat 확인", chatting);

  const sendMessage = (): void => {
    socket.emit("send-chat", {
      message: isDm,
      user: localStorage.getItem("Id"),
      room: { roomID, roomName },
    });
  };

  return (
    <ChatBox>
      <Chatting>
        {chatting.length !== 0 &&
          chatting.map((v: IChat, i: number) =>
            v.notice ? (
              <Notice key={i} text={v.message} />
            ) : v.user._id === localStorage.getItem("Id") ? (
              <MyDm key={i} nickname={"나나"} text={v.message} />
            ) : (
              <OtherDm key={i} />
            )
          )}
      </Chatting>
      <Space.Compact style={{ width: "480px" }}>
        <Input
          placeholder="Let's start talking 😊"
          onChange={(e) => getInputValue(e)}
        />
        <Button type="primary" onClick={() => sendMessage()}>
          send
        </Button>
      </Space.Compact>
    </ChatBox>
  );
}
