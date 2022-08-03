import React, { FC } from "react";
import { Breadcrumb, Card, Col, Layout, List, Row } from "antd";
import iconShipping from "../components/ic_shipping.png";

type SearchPageType = {
  items: any;
};

const SearchPage: FC<SearchPageType> = ({ items }) => {
  const { Content } = Layout;
  return (
    <Content>
      <Row justify="center" align="middle" style={{ height: "100%vh" }}>
        <Col span={20}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>

          <List itemLayout="horizontal" grid={{ column: 1 }}>
            {items.items.map((item: any) => (
              <List.Item key={item.id}>
                <Card hoverable style={{ padding: "16px" }}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <img
                      src={item.picture}
                      alt="thumbnail"
                      style={{ width: "180px" }}
                    />

                    <div style={{ width: "100%" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <h1 style={{ fontSize: "24px" }}>
                          ${item.price.amount}
                          {item.free_shipping ? (
                            <img src={iconShipping} alt="icon" />
                          ) : null}
                        </h1>
                        <span style={{ fontSize: "12px" }}>{item.address}</span>
                      </div>
                      <h4 style={{ fontSize: "18px" }}>{item.title}</h4>
                    </div>
                  </div>
                </Card>
              </List.Item>
            ))}
          </List>
        </Col>
      </Row>
    </Content>
  );
};

export default SearchPage;
