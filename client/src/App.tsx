import React from "react";
import { Route, Routes } from "react-router-dom";
import "antd/dist/reset.css";
import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer";
import RoomPage from "./pages/RoomPage";

function App() {
  return (
    <div>
      <NavBar />
      <div style={{ paddingTop: "75px", minHeight: "calc(100vh - 80px)" }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/room" element={<RoomPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/register" element={<SignUpPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
