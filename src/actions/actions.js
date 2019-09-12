import { GET_TWEETS, SET_FILTER } from "./types";
import axios from "axios";

const url = "http://localhost:9000/tweets";

export const fetchTweets = (tweets, query) => {
  return {
    type: GET_TWEETS,
    query: query,
    tweets
  };
};

export const setFilter2 = filter => {
  return {
    type: SET_FILTER,
    filter: filter
  };
};

export const getTweets = (query, filter) => {
  if (!filter) filter = "popular";
  return dispatch => {
    return axios
      .get(url + "?q=" + encodeURIComponent(query) + "&result_type=" + filter)
      .then(response => {
        dispatch(fetchTweets(response.data.statuses, query));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const setFilter = (query, filter) => {
  return dispatch => {
    return axios
      .get(url + "?q=" + encodeURIComponent(query) + "&result_type=" + filter)
      .then(response => {
        dispatch(fetchTweets(response.data.statuses, query));
        dispatch(setFilter2(filter));
      })
      .catch(error => {
        throw error;
      });
  };
};
