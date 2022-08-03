import { Breadcrumb, Col, Image, Layout, Row } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpin from "../components/LoadingSpin";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { searchById } from "../redux/itemsSlice";

const ItemPage = () => {
  // * ========== Variables ==========
  const { Content } = Layout;
  const dispatch = useAppDispatch();
  const { id } = useParams();

  // * ========== State variables ==========
  const item = useAppSelector((state: any) => state.items.items.item);
  const itemsStatus = useAppSelector((state: any) => state.items.status);

  // * ========== UseEffects ==========
  useEffect(() => {
    if (id) dispatch(searchById(id));
  }, [dispatch, id]);

  return (
    <Content>
      <Row justify="center" align="middle">
        <Col span={20}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
      </Row>
      <Row justify="center" align="top" style={{ height: "100vh" }}>
        <Col span={20}>
          {itemsStatus === "loading" ? (
            <LoadingSpin />
          ) : (
            item && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex" }}>
                  <Image src={item.picture} width={680} />
                  <div>
                    <h3
                      style={{ fontSize: "14px" }}
                    >{`${item.condition} - ${item.sold_quantity}`}</h3>
                    <h1>{item.title}</h1>
                    <h1>${item.price.amount}</h1>
                  </div>
                </div>
                <div>
                  <h1>Descripción del producto</h1>
                  <p>{item.description}</p>
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
