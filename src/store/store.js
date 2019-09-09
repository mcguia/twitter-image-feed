import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
import thunkMiddleware from "redux-thunk";

import reducers from "../reducers/reducers";

const store = createStore(
  reducers,
  {},
  applyMiddleware(thunkMiddleware, promise)
);

export default store;
