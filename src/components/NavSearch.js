import React, { useState } from "react";
import { Input } from "antd";
const { Search } = Input;

function NavSearch() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValue = e => {
    setSearchValue(e.target.value);
  };

  const onSearchFunction = () => {
    this.props.setQuery(searchValue);
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
