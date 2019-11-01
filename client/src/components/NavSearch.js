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
    const regex = /from:\s+(\w+)/;
    const usermatch = regex.exec(searchValue);
    let query = searchValue;
    let user = "";
    if (usermatch !== null) {
      query = searchValue.replace(usermatch[0], "");
      user = usermatch[1];
    }
    setOptions({
      ...options,
      query: query,
      max_id: "0",
      user: user,
      isFetching: false
    });
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
