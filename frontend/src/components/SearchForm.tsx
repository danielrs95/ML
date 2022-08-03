import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";

const SearchForm = () => {
  return (
    <Form style={{ display: "flex" }}>
      <Form.Item style={{ margin: "0" }} labelCol={{ span: "5" }} noStyle>
        <Input placeholder="Nunca dejes de buscar" />
        <Button icon={<SearchOutlined />} />
      </Form.Item>
    </Form>
  );
};

export default SearchForm;
