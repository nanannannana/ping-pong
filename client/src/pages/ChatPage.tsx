import React, { useEffect } from "react";
import { socket } from "../utils/socket";

export default function ChatPage() {
  useEffect(() => {
    socket.emit("events", "events");
  }, []);
  return <div>ChatPage</div>;
}
