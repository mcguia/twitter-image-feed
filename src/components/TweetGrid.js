import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import { getTweets } from "../actions/actions";
import styled from "styled-components";
import Loading from "./Loading";
import Tweet from "./Tweet";

const { Option } = Select;

const SelectContainer = styled.div`
  background: #fff;
  padding: 20px 30px;
  font-size: 14px;
  position: relative;
`;
const ImageGrid = styled.div`
  padding: 30px 30px 40px 30px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: minmax(50px, auto);

  .image-item:nth-child(4n) {
    grid-column-end: span 2;
  }
`;

function TweetGrid() {
  const [loading, setLoading] = useState(false);
  const data = useSelector(store => store.tweets.list);
  const query = useSelector(store => store.tweets.query);

  const dispatch = useDispatch();

  const useHandleChange = value => {
    dispatch(getTweets(query, value));
  };

  useEffect(() => {
    if (data.length) {
      setLoading(false);
    }
  }, [data.length]);

  useEffect(() => {
    dispatch(getTweets("#art", "popular"));
    setLoading(true);
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <SelectContainer>
        <Select
          defaultValue="popular"
          style={{ width: 120 }}
          onChange={useHandleChange}
        >
          <Option value="recent">Recent</Option>
          <Option value="popular">Popular</Option>
        </Select>
      </SelectContainer>
      <ImageGrid>
        {data.length &&
          data.map(tweet => <Tweet tweet={tweet} key={tweet.id} />)}
      </ImageGrid>
    </div>
  );
}

export default TweetGrid;
