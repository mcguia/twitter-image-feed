import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "redux";
import { getTweets } from "../actions/actions";
import styled from "styled-components";
import Loading from "./Loading";
import Tweet from "./Tweet";

function TweetGrid() {
  const [loading, setLoading] = useState(false);
  const data = useSelector(store => store.tweets);
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

  if (loading === true) {
    return <Loading />;
  }

  return (
    <div className="center-container">
      {this.data.map(tweet => (
        <Tweet tweet={tweet} key={tweet.id} />
      ))}
    </div>
  );
}

export default TweetGrid;
