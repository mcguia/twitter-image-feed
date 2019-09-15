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
      /** if filter or nsfw changed, return new batch of tweets **/
      if (state.filter !== payload.filter || state.nsfw !== payload.nsfw) {
        rest = [...payload.tweets];
      } else if (state.max_id !== "0" && payload.query === state.query) {
        /** if max_id set, and query hasn't changed, retain tweet list.
      slice off duplicate tweet **/
        if (payload.tweets.length < 3 || state.max_id === payload.max_id) {
          rest = payload.tweets.slice(0, 1);
          more = false;
        } else {
          rest = payload.tweets.slice(1, payload.tweets.length);
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
        filter: payload
      };
    case "SET_NSFW_SUCCESS":
      return {
        ...state,
        nsfw: payload
      };
    default:
      return state;
  }
}

const reducers = combineReducers({
  app: fetchTweetsReducer
});

export default reducers;
