import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTweets } from "../actions/actions";
import styled from "styled-components";
import Loading from "./Loading";
import Tweet from "./Tweet";

const ImageGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: minmax(50px, auto);

  .image-item:nth-child(5n) {
    grid-column-end: span 2;
  }
`;

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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="center-container">
      <ImageGrid>
        {data.length &&
          data.map(tweet => <Tweet tweet={tweet} key={tweet.id} />)}
      </ImageGrid>
    </div>
  );
}

export default TweetGrid;
