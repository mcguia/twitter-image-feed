import { GET_TWEETS } from "./types";
import axios from "axios";

const url = "http://localhost:9000/tweets";

export const fetchTweets = tweets => {
    return {
        type: GET_TWEETS,
        tweets
    };
};

export const getTweets = () => {
    return dispatch => {
        return axios
            .get(url)
            .then(response => {
                dispatch(fetchTweets(response.data.statuses));
            })
            .catch(error => {
                throw error;
            });
    };
};
