import { Col, Layout, Row } from "antd";
import React, { useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import logo from "./components/Logo_ML.png";
import LandingPage from "./pages/LandingPage";
import { useAppDispatch } from "./redux/hooks";
import SearchPage from "./pages/SearchPage";
import { deleteItems } from "./redux/itemsSlice";
import ItemPage from "./pages/ItemPage";
import styles from "./styles/App.module.css";

const App = () => {
  // * ========== Variables ==========
  const { Header } = Layout;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  // * ========== UseEffects ==========
  useEffect(() => {
    if (pathname === "/") dispatch(deleteItems());
  }, [dispatch, pathname]);

  return (
    <Layout>
      <Header className={styles.header}>
        <Row justify="space-around" align="middle">
          <Link to="/">
            <Col span={4}>
              <img src={logo} alt="logo" />
            </Col>
          </Link>
          <Col span={18} className={styles.searchInput}>
            <SearchForm />
          </Col>
        </Row>
      </Header>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/api/items/" element={<SearchPage />} />
        <Route path="/api/items/:id" element={<ItemPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
