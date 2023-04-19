import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "antd/dist/reset.css";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer";
import RoomPage from "./pages/RoomPage";
import ChatPage from "./pages/ChatPage";
import MyPage from "./pages/MyPage";
import PrivateRoutes from "./components/PrivateRoutes";
import { io, Socket } from "socket.io-client";
import { useDispatch } from "react-redux";

function App() {
  return (
    <div>
      <NavBar />
      <div style={{ paddingTop: "75px", minHeight: "calc(100vh - 80px)" }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<SignInPage />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/room" element={<RoomPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
