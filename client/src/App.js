import React, { useState } from "react";
import ImageSearch from "./components/ImageSearch";
import Nav from "./components/Nav";

const App = () => {
  const [options, setOptions] = useState({
    query: "#art",
    user: "",
    max_id: "0",
    nsfw: false,
    sort: "mixed",
    isFetching: false
  });
  return (
    <div className="App">
      <Nav options={options} setOptions={setOptions} />
      <ImageSearch options={options} setOptions={setOptions} />
    </div>
  );
};

export default App;
