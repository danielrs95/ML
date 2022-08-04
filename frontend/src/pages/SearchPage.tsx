import React, { useEffect } from "react";
import { Breadcrumb, Card, Col, Layout, List, Row, Typography } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import iconShipping from "../components/ic_shipping.png";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { searchItems } from "../redux/itemsSlice";
import LoadingSpin from "../components/LoadingSpin";
import styles from "../styles/App.module.css";

const SearchPage = () => {
  // * ========== Variables ==========
  const { Title, Paragraph } = Typography;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { Content } = Layout;

  // * ========== State variables ==========
  const items = useAppSelector((state: any) => state.items.items);
  const itemsStatus = useAppSelector((state: any) => state.items.status);
  const itemsLength = Object.keys(items).length;

  const categories = useAppSelector(
    (state: any) => state.items.items.categories
  );

  // * ========== UseEffects ==========
  useEffect(() => {
    const queryURL = searchParams.get("search");
    if (queryURL) dispatch(searchItems(queryURL));
  }, [dispatch, searchParams]);

  return (
    <Content>
      <Row justify="center" align="middle">
        <Col span={20}>
          <Breadcrumb className={styles.menuStyle}>
            {categories &&
              categories[0].map((category: any) => (
                <Breadcrumb.Item>{category.name}</Breadcrumb.Item>
              ))}
          </Breadcrumb>

          {itemsStatus === "loading" ? (
            <LoadingSpin />
          ) : (
            <List itemLayout="horizontal" grid={{ column: 1 }}>
              {itemsLength > 1 &&
                items.items.map((item: any) => (
                  <List.Item key={item.id}>
                    <Card
                      hoverable
                      style={{ padding: "16px" }}
                      onClick={() => navigate(`/api/items/${item.id}`)}
                    >
                      <div className={styles.cardBodyContainer}>
                        <img
                          className={styles.cardImg}
                          src={item.picture}
                          alt="thumbnail"
                        />

                        <div className={styles.cardBodyTitleContainer}>
                          <div className={styles.cardBodyTitle}>
                            <Title level={3}>
                              ${item.price.amount}{" "}
                              {item.free_shipping && (
                                <img src={iconShipping} alt="icon" />
                              )}
                            </Title>
                            <Paragraph style={{ fontSize: "12px" }}>
                              {item.address}
                            </Paragraph>
                          </div>
                          <h4 style={{ fontSize: "18px" }}>{item.title}</h4>
                        </div>
                      </div>
                    </Card>
                  </List.Item>
                ))}
            </List>
          )}
        </Col>
      </Row>
    </Content>
  );
};

export default SearchPage;
