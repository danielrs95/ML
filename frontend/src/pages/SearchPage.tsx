import React, { useEffect } from "react";
import { Breadcrumb, Card, Col, Layout, List, Row } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import iconShipping from "../components/ic_shipping.png";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { searchItems } from "../redux/itemsSlice";
import LoadingSpin from "../components/LoadingSpin";
// import { RootState } from "../store";

// type SearchPageType = {
//   items: any;
// };

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { Content } = Layout;

  const items = useAppSelector((state: any) => state.items.items);
  const itemsStatus = useAppSelector((state: any) => state.items.status);
  const itemsLength = Object.keys(items).length;

  useEffect(() => {
    const queryURL = searchParams.get("search");
    if (queryURL) dispatch(searchItems(queryURL));
  }, [dispatch, searchParams]);

  return (
    <Content>
      <Row justify="center" align="middle" style={{ height: "100%vh" }}>
        <Col span={20}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
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
                            <span style={{ fontSize: "12px" }}>
                              {item.address}
                            </span>
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
