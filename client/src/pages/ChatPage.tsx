import { useEffect, useRef, useState } from "react";
import { socket } from "../utils/socket";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Button, Input, Space } from "antd";
import MyDm from "../components/Chat/MyDm";
import OtherDm from "../components/Chat/OtherDm";
import Notice from "../components/Chat/Notice";
import { useDispatch, useSelector } from "react-redux";
import { addChat, setChatting } from "../store/chat";
import { IChat } from "../components/Interfaces";

const ChatBox = styled.div`
  max-width: 500px;
  margin: 7px auto 0 auto;
  padding: 10px;
  height: calc(100vh - 162px);

  @media (max-width: 500px) {
    width: 320px;
  }
`;

const Chatting = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #d7d7d7;
  height: calc(100vh - 230px);
  border-radius: 10px;
  overflow: auto;
`;

const InputBox = styled(Space.Compact)`
  width: 480px;

  @media (max-width: 500px) {
    width: 300px;
  }
`;

export default function ChattingPage() {
  const { roomName } = useParams();
  const dispatch = useDispatch();
  const roomID = sessionStorage.getItem("roomID");
  const chatting = useSelector((state: any) => state.chat.chatting);
  const [isDm, setIsDm] = useState("");
  const chatRef = useRef<any>(null);

  const getInputValue = (e: any) => setIsDm(e.target.value);

  useEffect(() => {
    // 기존 채팅 입장 시, 최신순 챗 가져옴
    socket.emit("join-room", roomName);
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
    // 새로운 챗 화면에 그림
    socket.on("new-chat", (chat) => dispatch(addChat(chat)));

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    // 이전 챗 기록이 있을 경우, scroll을 맨 밑으로 위치시킴
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatting.length, chatRef.current && chatRef.current.scrollHeight]);

  // 메세지 전송
  const sendMessage = (): void => {
    console.log("sendMessage ");
    socket.emit("send-chat", {
      message: isDm,
      user: {
        id: localStorage.getItem("Id"),
        nickname: localStorage.getItem("nickname"),
      },
      room: { roomID, roomName },
    });
    setIsDm("");
  };
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      socket.emit("send-chat", {
        message: isDm,
        user: {
          id: localStorage.getItem("Id"),
          nickname: localStorage.getItem("nickname"),
        },
        room: { roomID, roomName },
      });
      setIsDm("");
    }
  };

  return (
    <ChatBox>
      <Chatting ref={chatRef}>
        {chatting.length !== 0 &&
          chatting.map((v: IChat, i: number) =>
            v.notice ? (
              <Notice key={i} text={v.message} />
            ) : v.user._id === localStorage.getItem("Id") ? (
              <MyDm key={i} nickname={v.user.nickname} text={v.message} />
            ) : (
              <OtherDm key={i} nickname={v.user.nickname} text={v.message} />
            )
          )}
      </Chatting>
      <InputBox>
        <Input
          placeholder="Let's start talking 😊"
          value={isDm}
          onChange={(e) => getInputValue(e)}
          onPressEnter={(e) => handleEnter(e)}
        />
        <Button type="primary" onClick={() => sendMessage()}>
          send
        </Button>
      </InputBox>
    </ChatBox>
  );
}
