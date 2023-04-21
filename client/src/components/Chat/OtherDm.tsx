import React from "react";
import styled from "styled-components";

const OtherName = styled.div`
  float: left;
  clear: both;
  margin-left: 7px;
  font-size: 0.7rem;
`;
const OtherChat = styled.div`
  float: left;
  clear: both;
  background-color: #c9deff;
  border-radius: 7px;
  margin: 7px;
  padding: 7px;
`;

export default function OtherDm() {
  return (
    <>
      <OtherName>딸기</OtherName>
      <OtherChat>OtherDm</OtherChat>
    </>
  );
}
