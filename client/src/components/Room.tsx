import { Card } from "antd";
import React from "react";

export default function Room() {
  return (
    <Card
      className="chatRoom"
      title="Room 66"
      extra={<a href="#">▶</a>}
      style={{ width: 450, margin: "10px auto" }}
    >
      <div>가나다, 마바사, 아자차</div>
    </Card>
  );
}
