import React from "react";
import styled from "styled-components";

const Myfooter = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
`;

export default function Footer() {
  return <Myfooter>ping-pong</Myfooter>;
}
