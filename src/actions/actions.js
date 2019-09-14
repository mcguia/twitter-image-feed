import axios from "axios";

const url = "http://localhost:9000/tweets";

export const fetchTweets = (tweets, query) => {
  var max_id = "0";
  if (tweets.length > 0) {
    max_id = tweets[tweets.length - 1].id_str;
  }

  return {
    type: "GET_TWEETS_SUCCESS",
    payload: { tweets, query, max_id }
  };
};
export const getTweets = (
  query = "#art",
  filter = "mixed",
  nsfw = "false",
  max_id = "0"
) => {
  return dispatch => {
    dispatch({ type: "GET_TWEETS_REQUEST" });
    return axios
      .get(
        url +
          "?q=" +
          encodeURIComponent(query) +
          "&result_type=" +
          filter +
          "&max_id=" +
          max_id +
          "&nsfw=" +
          nsfw
      )
      .then(response => {
        dispatch(fetchTweets(response.data.statuses, query));
      })
      .catch(error => {
        dispatch({
          type: "GET_TWEETS_FAILURE",
          payload: error
        });
      });
  };
};

export const setFilter = (query, filter, nsfw, max_id) => {
  return dispatch => {
    return axios
      .get(
        url +
          "?q=" +
          encodeURIComponent(query) +
          "&result_type=" +
          filter +
          "&max_id=" +
          max_id +
          "&nsfw=" +
          nsfw
      )
      .then(response => {
        dispatch({
          type: "SET_FILTER_SUCCESS",
          payload: filter
        });
        dispatch(fetchTweets(response.data.statuses, query));
      })
      .catch(error => {
        dispatch({
          type: "SET_FILTER_FAILURE",
          payload: error
        });
      });
  };
};

export const setNsfw = (query, filter, nsfw, max_id) => {
  return dispatch => {
    return axios
      .get(
        url +
          "?q=" +
          encodeURIComponent(query) +
          "&result_type=" +
          filter +
          "&max_id=" +
          max_id +
          "&nsfw=" +
          nsfw
      )
      .then(response => {
        dispatch({
          type: "SET_NSFW_SUCCESS",
          payload: nsfw
        });
        dispatch(fetchTweets(response.data.statuses, query));
      })
      .catch(error => {
        dispatch({
          type: "SET_NSFW_FAILURE",
          payload: error
        });
      });
  };
};
