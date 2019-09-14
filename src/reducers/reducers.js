import { combineReducers } from "redux";

const INITIAL_STATE = {
  tweets: [],
  query: "",
  filter: "mixed",
  max_id: "0"
};

function fetchTweetsReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case "GET_TWEETS_SUCCESS":
      var rest;
      console.log("payload before: ", payload.tweets);
      console.log(payload.query, state.query);
      if (state.max_id !== "0" && payload.query === state.query) {
        rest = payload.tweets.slice(1, payload.tweets.length);
        rest = [...state.tweets, ...rest];
      } else {
        rest = payload.tweets;
      }
      console.log("state.tweets: ", state.tweets);
      console.log("payload minus first: ", rest);
      console.log("max_id: ", state.max_id);
      console.log("combined: ", [...state.tweets, ...rest]);
      return {
        ...state,
        ...payload,
        tweets: rest
      };
    case "SET_FILTER_SUCCESS":
      return {
        tweets: [],
        filter: payload,
        max_id: "0"
      };
    default:
      return state;
  }
}

const reducers = combineReducers({
  app: fetchTweetsReducer
});

export default reducers;
