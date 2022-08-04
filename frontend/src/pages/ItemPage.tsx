/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ShopOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Layout, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import LoadingSpin from "../components/LoadingSpin";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { searchById, searchItems } from "../redux/itemsSlice";
import styles from "../styles/App.module.css";

const ItemPage = () => {
  // * ========== Variables ==========
  const { Title, Paragraph } = Typography;
  const [searchParams] = useSearchParams();
  const { Content } = Layout;
  const dispatch = useAppDispatch();
  const { id } = useParams();

  // * ========== State variables ==========
  const item = useAppSelector((state: any) => state.items.items.item);
  const itemsStatus = useAppSelector((state: any) => state.items.status);

  // * ========== Estados ==========
  const [categories, setCategories] = useState([]);

  // * ========== UseEffects ==========
  useEffect(() => {
    if (id) dispatch(searchById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (item) setCategories(item.categoryResponse);
  }, [item]);

  useEffect(() => {
    const queryURL = searchParams.get("search");
    if (queryURL) dispatch(searchItems(queryURL));
  }, [dispatch, searchParams]);

  // * ========== Handlers ==========
  const formatAsCurrency = (itemInstance: any) => {
    const numberFormat1 = new Intl.NumberFormat(itemInstance.price.amount);

    return numberFormat1.format(itemInstance.price.amount);
  };

  return (
    <Content className={styles.content}>
      <Row justify="center" align="middle">
        <Col span={20}>
          <Breadcrumb className={styles.menuStyle}>
            {categories &&
              categories.map((category: any) => (
                <Breadcrumb.Item key={category.id}>
                  {category.name}
                </Breadcrumb.Item>
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
                      $ {formatAsCurrency(item)}
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
                    <Paragraph
                      className={styles.description}
                      type="secondary"
                      ellipsis={{ expandable: false, rows: 10 }}
                    >
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
