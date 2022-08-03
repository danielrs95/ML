import { Col, Layout, Row } from "antd";
import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import logo from "./components/Logo_ML.png";

const { Header, Content } = Layout;

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Header style={{ background: "#FFe600" }}>
          <Row justify="center" align="middle" style={{ height: "100%" }}>
            <Link to="/">
              <Col span={2}>
                <img src={logo} alt="logo" />
              </Col>
            </Link>
            <Col span={18}>
              <SearchForm />
            </Col>
          </Row>
        </Header>
        <Content>
          <Row justify="center" align="middle" style={{ height: "100%vh" }}>
            <Col span={20}>Content</Col>
          </Row>
        </Content>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
