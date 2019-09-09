import { combineReducers } from "redux";
import { GET_TWEETS } from "../actions/types";

const initialState = {
    tweets: {
        list: []
    }
};

function fetchTweetsReducer(state = initialState.tweets, action) {
    switch (action.type) {
        case GET_TWEETS:
            return {
                list: action.payload
            };
        default:
            return state;
    }
}

const reducers = combineReducers({
    tweets: fetchTweetsReducer
});

export default reducers;
