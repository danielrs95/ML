import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { searchItems } from "../redux/itemsSlice";

const { Search } = Input;

const SearchForm = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const searchHandler = (value: string) => {
    if (value) {
      navigate(`/api/items/?search=${query}`);
    }
  };

  useEffect(() => {
    const queryURL = searchParams.get("search");
    if (queryURL) dispatch(searchItems(queryURL));
  }, [dispatch, searchParams]);

  return (
    <Search
      placeholder="Nunca dejes de buscar"
      size="large"
      allowClear
      onSearch={searchHandler}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default SearchForm;
