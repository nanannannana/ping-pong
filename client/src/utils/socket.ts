import { io } from "socket.io-client";

export const socket = io(`http://${process.env.REACT_APP_SERVER_URI}`);