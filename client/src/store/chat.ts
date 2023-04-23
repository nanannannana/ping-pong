import { IChat } from "../components/Interfaces";
import { prevChat } from "../components/Types";

const initState = {
  roomID: "",
  isNew: "",
  chatting: [],
};

const SETROOM = "chat/SETROOMID";
const SETCHATTING = "chat/SETCHATTING";
const ADDCHCT = "chat/ADDCHAT";

export const setRoom = (room: { roomID: string; isNew: boolean }) => ({
  type: SETROOM,
  payload: room,
});
export const setChatting = (chat: prevChat) => ({
  type: SETCHATTING,
  payload: chat,
});
export const addChat = (chat: IChat) => ({ type: ADDCHCT, payload: chat });

export default function chat(
  state = initState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case SETROOM:
      return {
        ...state,
        roomID: action.payload.roomID,
        isNew: action.payload.isNew,
      };
    case SETCHATTING:
      return {
        ...state,
        chatting: action.payload,
      };
    case ADDCHCT:
      return {
        ...state,
        chatting: state.chatting.concat(action.payload),
      };
    default:
      return state;
  }
}
