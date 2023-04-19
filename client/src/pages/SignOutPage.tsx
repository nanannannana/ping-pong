import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignOutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);
  return <div>...</div>;
}
