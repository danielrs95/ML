import React from "react";
import { Col, Layout, Row, Typography } from "antd";
import styles from "../styles/App.module.css";

const LandingPage = () => {
  // * ========== Variables ==========
  const { Content } = Layout;
  const { Title } = Typography;

  return (
    <Content>
      <Row justify="center" align="top" className={styles.content}>
        <Col span={20}>
          <Title level={2}>
            Usa el buscador para encontrar tu próxima compra!
          </Title>
        </Col>
      </Row>
    </Content>
  );
};

export default LandingPage;
