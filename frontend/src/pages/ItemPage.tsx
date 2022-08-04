/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ShopOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Layout, Row, Typography } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpin from "../components/LoadingSpin";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { searchById } from "../redux/itemsSlice";
import styles from "../styles/App.module.css";

const ItemPage = () => {
  // * ========== Variables ==========
  const { Title, Paragraph } = Typography;
  const { Content } = Layout;
  const dispatch = useAppDispatch();
  const { id } = useParams();

  // * ========== State variables ==========
  const item = useAppSelector((state: any) => state.items.items.item);
  const itemsStatus = useAppSelector((state: any) => state.items.status);
  const categories = useAppSelector(
    (state: any) => state.items.items.item.categoryResponse
  );

  // * ========== UseEffects ==========
  useEffect(() => {
    if (id) dispatch(searchById(id));
  }, [dispatch, id]);

  return (
    <Content>
      <Row justify="center" align="middle">
        <Col span={20}>
          <Breadcrumb className={styles.menuStyle}>
            {categories &&
              categories.map((category: any) => (
                <Breadcrumb.Item>{category.name}</Breadcrumb.Item>
              ))}
          </Breadcrumb>
        </Col>
      </Row>
      <Row justify="center" align="top">
        <Col span={20}>
          {itemsStatus === "loading" ? (
            <LoadingSpin />
          ) : (
            item && (
              <div className={styles.itemDetailContainer}>
                <div className={styles.itemImgTitleContainer}>
                  <img
                    src={item.picture}
                    className={styles.itemDetailImg}
                    alt="product"
                  />
                  <div className={styles.itemDetailInfo}>
                    <Title level={4} type="secondary" className={styles.sold}>
                      {`${item.condition} - ${item.sold_quantity} vendidos`}
                    </Title>
                    <Title level={3} className={styles.title}>
                      {item.title}
                    </Title>
                    <Title level={1} className={styles.price}>
                      ${item.price.amount}
                    </Title>
                    <Button
                      size="large"
                      type="primary"
                      icon={<ShoppingCartOutlined />}
                      style={{ marginBottom: "32px" }}
                    >
                      Comprar
                    </Button>
                    <Title level={3}>Descripción del producto</Title>
                    <Paragraph className={styles.description}>
                      {item.description}
                    </Paragraph>
                  </div>
                </div>
              </div>
            )
          )}
        </Col>
      </Row>
    </Content>
  );
};

export default ItemPage;
