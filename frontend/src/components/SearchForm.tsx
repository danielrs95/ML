import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { searchItems } from "../redux/itemsSlice";
import "./SearchForm.css";

const { Search } = Input;

const SearchForm = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState<string>("");

  const dispatch = useAppDispatch();

  const searchHandler = (value: string) => {
    setQuery(value);
  };

  useEffect(() => {
    const queryURL = searchParams.get("search");
    if (queryURL) dispatch(searchItems(queryURL));
  }, [dispatch, searchParams]);

  return (
    <Link to={`/api/items/?search=${query}`}>
      <Search
        placeholder="Nunca dejes de buscar"
        size="large"
        onSearch={searchHandler}
        // onClick={() => undefined}
      />
    </Link>
  );
};

export default SearchForm;
