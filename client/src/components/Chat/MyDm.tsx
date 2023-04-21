import React from "react";
import styled from "styled-components";

const MyName = styled.div`
  float: right;
  clear: both;
  margin-right: 7px;
  font-size: 0.7rem;
`;

const MyChat = styled.div`
  float: right;
  clear: both;
  background-color: #ebebeb;
  border-radius: 7px;
  margin: 7px;
  padding: 7px;
`;

export default function MyDm({
  text,
  nickname,
}: {
  text: string;
  nickname: string;
}) {
  return (
    <>
      <MyName>{nickname}</MyName>
      <MyChat>{text}</MyChat>
    </>
  );
}
