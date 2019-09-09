import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTweets } from "../actions/actions";
import styled from "styled-components";
import Loading from "./Loading";
import Tweet from "./Tweet";

function TweetGrid() {
  const [loading, setLoading] = useState(false);
  const data = useSelector(store => store.tweets.list);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data.length) {
      setLoading(false);
    }
  }, [data.length]);

  useEffect(() => {
    dispatch(getTweets());
    setLoading(true);
  }, [dispatch]);

  return (
    <div className="center-container">
      {data.length && data.map(tweet => <Tweet tweet={tweet} key={tweet.id} />)}
    </div>
  );
}

export default TweetGrid;
