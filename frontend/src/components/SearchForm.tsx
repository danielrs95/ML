// import { SearchOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import React from "react";
import "./SearchForm.css";

const { Search } = Input;

const SearchForm = () => {
  return (
    <Form className="form-container">
      <Form.Item style={{ margin: "0", width: "100%" }}>
        <Search
          placeholder="Nunca dejes de buscar"
          size="large"
          // style={{ fontSize: "18px" }}
        />
      </Form.Item>
    </Form>
  );
};

export default SearchForm;
