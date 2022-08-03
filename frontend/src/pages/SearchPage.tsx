import { Col, Layout, Row } from "antd";
import React from "react";

const SearchPage = () => {
  const { Content } = Layout;
  return (
    <Content>
      <Row justify="center" align="middle" style={{ height: "100%vh" }}>
        <Col span={20}>Content</Col>
      </Row>
    </Content>
  );
};

export default SearchPage;
