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
  // const items = useAppSelector((state: any) => state.items.items);
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
        <Col>
          {itemsStatus === "loading" ? (
            <LoadingSpin />
          ) : (
            <div>
              <div>
                <Image />
                <div>Titulo y otras coasas</div>
              </div>
              <div>Descripcion</div>
            </div>
          )}
        </Col>
      </Row>
    </Content>
  );
};

export default ItemPage;
