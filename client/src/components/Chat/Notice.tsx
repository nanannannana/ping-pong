import React from "react";
import styled from "styled-components";

const Noti = styled.div`
  margin: 0 auto 7px auto;
  padding: 3px 0;
  clear: both;
  text-align: center;
  border-radius: 7px;
  border: 1px solid #939393;
  font-size: 0.8rem;
  width: 200px;
`;

export default function Notice({ text }: { text: string }) {
  return <Noti>{text}</Noti>;
}
