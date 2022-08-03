import { Col, Layout, Row } from "antd";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import logo from "./components/Logo_ML.png";
import LandingPage from "./pages/LandingPage";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { RootState } from "./store";
import SearchPage from "./pages/SearchPage";
import { deleteItems } from "./redux/itemsSlice";

const App = () => {
  // * Variables
  const { Header } = Layout;
  const dispatch = useAppDispatch();

  // * State selectors
  const items = useAppSelector((state: RootState) => state.items.items);
  const itemsLength = Object.keys(items).length;

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/") dispatch(deleteItems());
  }, [dispatch, pathname]);

  return (
    <Layout>
      <Header style={{ background: "#FFe600" }}>
        <Row justify="center" align="middle" style={{ height: "100%" }}>
          <Link to="/">
            <Col span={2}>
              <img src={logo} alt="logo" />
            </Col>
          </Link>
          <Col span={18} style={{ lineHeight: "0", margin: "0 10px" }}>
            <SearchForm />
          </Col>
        </Row>
      </Header>
      {itemsLength > 1 ? <SearchPage /> : <LandingPage />}
    </Layout>
  );
};

export default App;
