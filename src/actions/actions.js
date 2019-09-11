import { GET_TWEETS } from "./types";
import axios from "axios";

const url = "http://localhost:9000/tweets";

export const fetchTweets = (tweets, query) => {
  return {
    type: GET_TWEETS,
    query: query,
    tweets
  };
};

export const getTweets = (query, filter) => {
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
