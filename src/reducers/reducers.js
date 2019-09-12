import { combineReducers } from "redux";
import { GET_TWEETS, SET_FILTER } from "../actions/types";

const initialState = {
  tweets: {
    list: [],
    query: ""
  },
  filter: "popular"
};

function fetchTweetsReducer(state = initialState.tweets, action) {
  switch (action.type) {
    case GET_TWEETS:
      return {
        list: action.tweets,
        query: action.query
      };
    default:
      return state;
  }
}
function filterReducer(state = initialState.filter, action) {
  switch (action.type) {
    case SET_FILTER:
      return {
        filter: action.filter
      };
    default:
      return state;
  }
}
const reducers = combineReducers({
  tweets: fetchTweetsReducer,
  filter: filterReducer
});

export default reducers;
