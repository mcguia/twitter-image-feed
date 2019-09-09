import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import thunkMiddleware from "redux-thunk";

import reducers from "./reducers";

const store = createStore(
  reducers,
  {},
  applyMiddleware(thunkMiddleware, promiseMiddleware())
);

export default store;
