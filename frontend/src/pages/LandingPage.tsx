import React from "react";
import { Col, Layout, Result, Row } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import styles from "../styles/App.module.css";

const LandingPage = () => {
  // * ========== Variables ==========
  const { Content } = Layout;

  return (
    <Content>
      <Row justify="center" align="middle" className={styles.content}>
        <Col span={20}>
          <Result
            className={styles.welcome}
            icon={<SmileOutlined />}
            title="Bienvenido! Empieza a buscar tus productos"
          />
        </Col>
      </Row>
    </Content>
  );
};

export default LandingPage;
