import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
const { Search } = Input;

const NavSearch = ({ options, setOptions }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValue = e => {
    setSearchValue(e.target.value);
  };

  const onSearchFunction = () => {
    setOptions({ ...options, query: searchValue, isFetching: false });
  };

  return (
    <Search
      placeholder="puppies, #art, etc"
      onChange={handleSearchValue}
      onSearch={onSearchFunction}
      style={{ width: 200 }}
    />
  );
};

NavSearch.propTypes = {
  options: PropTypes.object.isRequired,
  setOptions: PropTypes.func.isRequired
};

export default NavSearch;
