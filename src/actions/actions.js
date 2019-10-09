import axios from "axios";

const url = "http://localhost:9000/tweets";

export const fetchTweets = (tweets, query, sort, nsfw) => {
  var max_id = "0";
  if (tweets.length > 0) {
    max_id = tweets[tweets.length - 1].id_str;
  }

  return {
    type: "GET_TWEETS_SUCCESS",
    payload: { tweets, query, sort, nsfw, max_id }
  };
};

export const getTweets = (
  query = "#art",
  sort = "mixed",
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
        sort +
        "&max_id=" +
        max_id +
        "&nsfw=" +
        nsfw
    )
    .then(response => {
      dispatch(fetchTweets(response.data.statuses, query, sort, nsfw));
    })
    .catch(error => {
      dispatch({
        type: "GET_TWEETS_FAILURE",
        payload: error
      });
    });
};

export const setSort = (query, sort, nsfw, max_id) => dispatch => {
  return dispatch(getTweets(query, sort, nsfw, max_id))
    .then(() => {
      dispatch({
        type: "SET_SORT_SUCCESS",
        payload: sort
      });
    })
    .catch(error => {
      dispatch({
        type: "SET_SORT_FAILURE",
        payload: error
      });
    });
};

export const setNsfw = (query, sort, nsfw, max_id) => dispatch => {
  return dispatch(getTweets(query, sort, nsfw, max_id))
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
