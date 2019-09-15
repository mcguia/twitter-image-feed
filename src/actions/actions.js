import axios from "axios";

const url = "http://localhost:9000/tweets";

export const fetchTweets = (tweets, query, filter, nsfw) => {
  var max_id = "0";
  if (tweets.length > 0) {
    max_id = tweets[tweets.length - 1].id_str;
  }

  return {
    type: "GET_TWEETS_SUCCESS",
    payload: { tweets, query, filter, nsfw, max_id }
  };
};

export const getTweets = (
  query = "#art",
  filter = "mixed",
  nsfw = "false",
  max_id = "0"
) => dispatch => {
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
      dispatch(fetchTweets(response.data.statuses, query, filter, nsfw));
    })
    .catch(error => {
      dispatch({
        type: "GET_TWEETS_FAILURE",
        payload: error
      });
    });
};

export const setFilter = (query, filter, nsfw, max_id) => dispatch => {
  return dispatch(getTweets(query, filter, nsfw, max_id))
    .then(() => {
      dispatch({
        type: "SET_FILTER_SUCCESS",
        payload: filter
      });
    })
    .catch(error => {
      dispatch({
        type: "SET_FILTER_FAILURE",
        payload: error
      });
    });
};

export const setNsfw = (query, filter, nsfw, max_id) => dispatch => {
  return dispatch(getTweets(query, filter, nsfw, max_id))
    .then(() => {
      dispatch({
        type: "SET_NSFW_SUCCESS",
        payload: nsfw
      });
    })
    .catch(error => {
      dispatch({
        type: "SET_NSFW_FAILURE",
        payload: error
      });
    });
};
