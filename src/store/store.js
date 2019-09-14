import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import promise from "redux-promise-middleware";
import thunkMiddleware from "redux-thunk";
import reducers from "../reducers/reducers";

const loggerMiddleware = createLogger();

const store = createStore(
  reducers,
  {},
  applyMiddleware(thunkMiddleware, loggerMiddleware, promise)
);

export default store;
