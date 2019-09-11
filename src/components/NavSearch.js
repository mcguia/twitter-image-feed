import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTweets } from "../actions/actions";
import { Input } from "antd";
const { Search } = Input;

function NavSearch() {
  const [searchValue, setSearchValue] = useState("");
  const filter = useSelector(store => store.filter);
  const dispatch = useDispatch();

  const handleSearchValue = e => {
    setSearchValue(e.target.value);
  };

  const onSearchFunction = () => {
    dispatch(getTweets(searchValue, filter));
  };

  return (
    <Search
      placeholder="puppies, #art, etc"
      onChange={handleSearchValue}
      onSearch={onSearchFunction}
      style={{ width: 300 }}
    />
  );
}

export default NavSearch;
