import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import { getTweets, setFilter } from "../actions/actions";
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
  padding: 2em;
  display: -ms-inline-grid;
  display: inline-grid;
  grid-gap: 20px;
  -ms-grid-columns: (1fr) [5];
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  @media (max-width: 1404px) {
    -ms-grid-columns: (1fr) [4];
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 1182px) {
    -ms-grid-columns: (1fr) [3];
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 960px) {
    padding: 1em 0;
    -ms-grid-columns: (1fr) [2];
    grid-template-columns: repeat(2, 1fr);
  }
`;

function TweetGrid() {
  const [loading, setLoading] = useState(false);
  const data = useSelector(store => store.tweets.list);
  const query = useSelector(store => store.tweets.query);
  const filter = useSelector(store => store.filter);

  const dispatch = useDispatch();

  const useHandleChange = value => {
    dispatch(setFilter(query, value));
  };

  useEffect(() => {
    if (data.length) {
      setLoading(false);
    }
  }, [data.length]);

  useEffect(() => {
    dispatch(getTweets("#art"));
    setLoading(true);
  }, [dispatch]);

  useEffect(() => {}, [filter]);

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
