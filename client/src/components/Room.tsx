import { Card } from "antd";
import { members } from "./Types";
import { socket } from "../utils/socket";
import styled from "styled-components";

const RoomCard = styled(Card)`
  width: 450px;
  margin: 10px auto;

  @media (max-width: 500px) {
    width: 300px;
  }
`;

export default function Room({
  roomName,
  members,
  withdrawal,
}: {
  roomName: string;
  members: members;
  withdrawal: Boolean | null;
}) {
  const handleClick = () => {
    socket.emit("join", {
      roomName,
      userNo: localStorage.getItem("Id"),
      nickName: localStorage.getItem("nickname"),
    });
  };
  const handleWithdrawal = () => {
    socket.emit("withdrawal", {
      roomName,
      userNo: localStorage.getItem("Id"),
    });
  };

  return (
    <RoomCard
      className="chatRoom"
      title={`Room ${roomName}`}
      extra={
        withdrawal ? (
          <div
            style={{ fontWeight: "bolder", color: "#007cf0" }}
            onClick={() => handleWithdrawal()}
          >
            Out
          </div>
        ) : (
          <div onClick={() => handleClick()}>▶</div>
        )
      }
    >
      {members.length !== 0 && (
        <div>
          {members.map((v, i) => (
            <span key={i}>{v.nickname} </span>
          ))}
        </div>
      )}
    </RoomCard>
  );
}
