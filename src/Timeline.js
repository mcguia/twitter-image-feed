import React, { useState } from "react";
import ImageSearch from "./components/ImageSearch";
import Nav from "./components/Nav";

const Timeline = () => {
  const [query, setQuery] = useState("#art");
  return (
    <div className="App">
      <Nav query={query} setQuery={setQuery} />
      <ImageSearch query={query} />
    </div>
  );
};

export default Timeline;
