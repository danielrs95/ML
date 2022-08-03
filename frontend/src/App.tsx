import { Col, Layout, Row } from "antd";
import React, { useEffect } from "react";
import SearchForm from "./components/SearchForm";

import logo from "./components/Logo_ML.png";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { searchItems } from "./redux/itemsSlice";

const { Header, Content } = Layout;

const App = () => {
  const dispatch = useAppDispatch();

  const itemsStatus = useAppSelector((state) => state.items.status);

  useEffect(() => {
    if (itemsStatus === "idle") dispatch(searchItems());
  }, [dispatch, itemsStatus]);

  return (
    <Layout>
      <Header style={{ background: "#FFe600" }}>
        <Row justify="center" align="middle" style={{ height: "100%" }}>
          <Col span={2}>
            <img src={logo} alt="logo" />
          </Col>
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
  );
};

export default App;
