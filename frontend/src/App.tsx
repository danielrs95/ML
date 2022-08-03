import { Col, Layout, Row } from "antd";
import React from "react";
import SearchForm from "./components/SearchForm";

const { Header, Content } = Layout;

const App = () => {
  return (
    <Layout>
      <Header style={{ background: "#FFe600" }}>
        <Row justify="center" align="middle" style={{ height: "100%" }}>
          <Col span={2}>Logo</Col>
          <Col span={18}>
            <SearchForm />
          </Col>
        </Row>
      </Header>
      <Content>Content</Content>
    </Layout>
  );
};

export default App;
