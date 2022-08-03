import { Space, Spin } from "antd";
import React from "react";

const LoadingSpin = () => (
  <div
    style={{
      alignItems: "center",
      display: "flex",
      flexWrap: "wrap",
      height: "100vh",
      justifyContent: "center",
    }}
  >
    <Space align="center">
      <Spin
        size="large"
        style={{
          fontSize: "5em !importan",
        }}
      />
    </Space>
  </div>
);

export default LoadingSpin;
