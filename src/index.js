import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import Timeline from "./Timeline";
import * as serviceWorker from "./serviceWorker";
import store from "./store/store";

const routing = (
  <Router>
    <Provider store={store}>
      <Route exact path="/" component={App} />
      <Route path="/timeline" component={Timeline} />
    </Provider>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
