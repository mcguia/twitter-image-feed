import React from "react";
import TweetGrid from "./components/TweetGrid";
import Nav from "./components/Nav";

const App = () => {
  return (
    <div className="App">
      <Nav />
      <TweetGrid />
    </div>
  );
};

export default App;
