import { Col, Layout, Row } from "antd";
import React from "react";

const LandingPage = () => {
  const { Content } = Layout;
  return (
    <Content>
      <Row justify="center" align="middle" style={{ height: "100%vh" }}>
        <Col span={20}>Usa el buscador para encontrar tu próxima compra!</Col>
      </Row>
    </Content>
  );
};

export default LandingPage;
