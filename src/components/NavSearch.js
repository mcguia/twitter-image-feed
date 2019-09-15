import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTweets } from "../actions/actions";
import { Input } from "antd";
const { Search } = Input;

function NavSearch() {
  const [searchValue, setSearchValue] = useState("");
  const { query, sort, nsfw, max_id } = useSelector(state => ({
    query: state.app.query,
    sort: state.app.sort,
    nsfw: state.app.nsfw,
    max_id: state.app.max_id
  }));
  const dispatch = useDispatch();

  const handleSearchValue = e => {
    setSearchValue(e.target.value);
  };

  const onSearchFunction = () => {
    var max_id_next = max_id;
    if (query !== searchValue) {
      max_id_next = 0;
    }
    dispatch(getTweets(searchValue, sort, nsfw, max_id_next));
  };

  return (
    <Search
      placeholder="puppies, #art, etc"
      onChange={handleSearchValue}
      onSearch={onSearchFunction}
      style={{ width: 200 }}
    />
  );
}

export default NavSearch;
