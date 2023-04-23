import React from "react";
import styled from "styled-components";

const Myfooter = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  border-top: 1px solid #f0f0f0;
`;

export default function Footer() {
  return <Myfooter>ping-pong</Myfooter>;
}
