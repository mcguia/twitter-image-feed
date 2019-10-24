import React, { useState } from "react";
import ImageSearch from "./components/ImageSearch";
import Nav from "./components/Nav";

const Timeline = () => {
  const [options, setOptions] = useState({
    query: "#art",
    nsfw: false,
    sort: "mixed",
    isFetching: false
  });
  return (
    <div className="Timeline">
      <Nav options={options} setOptions={setOptions} />
      <ImageSearch options={options} setOptions={setOptions} />
    </div>
  );
};

export default Timeline;
