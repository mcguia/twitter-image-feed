import { combineReducers } from "redux";

const INITIAL_STATE = {
  tweets: [],
  query: "",
  filter: "mixed",
  max_id: "0",
  isFetching: false,
  hasMore: true,
  nsfw: false,
  error: null
};

function fetchTweetsReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case "GET_TWEETS_REQUEST":
      return {
        ...state,
        isFetching: true
      };
    case "GET_TWEETS_SUCCESS":
      var rest;
      var more = true;

      if (state.max_id !== "0" && payload.query === state.query) {
        rest = payload.tweets.slice(1, payload.tweets.length);
        if (rest.length === 0) {
          more = false;
        }
        rest = [...state.tweets, ...rest];
      } else {
        rest = payload.tweets;
      }

      return {
        ...state,
        ...payload,
        isFetching: false,
        hasMore: more,
        error: null,
        tweets: rest
      };
    case "GET_TWEETS_FAILURE":
      return {
        ...state,
        isFetching: false,
        hasMore: false,
        error: payload
      };
    case "SET_FILTER_SUCCESS":
      return {
        ...state,
        tweets: [],
        filter: payload,
        max_id: "0"
      };
    case "SET_NSFW_SUCCESS":
      return {
        ...state,
        tweets: [],
        nsfw: payload,
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
