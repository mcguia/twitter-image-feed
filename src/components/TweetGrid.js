import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import { Empty, Select } from "antd";
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
const ImageGrid = styled(InfiniteScroll)`
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
  const { data, query, filter, max_id } = useSelector(state => ({
    data: state.app.tweets,
    query: state.app.query,
    filter: state.app.filter,
    max_id: state.app.max_id
  }));

  const dispatch = useDispatch();

  const useHandleChange = value => {
    dispatch(setFilter(query, value));
  };
  const loadFunc = () => {
    dispatch(getTweets(query, filter, max_id));
  };
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
    return (
      <div style={{ textAlign: "center", padding: "3em" }}>
        <Loading />
      </div>
    );
  }

  if (!loading && !data.length) {
    return (
      <Empty
        description="Sorry, no tweets available."
        style={{ padding: "3em" }}
      />
    );
  }

  return (
    <div>
      <SelectContainer>
        <Select
          defaultValue={filter}
          style={{ width: 120 }}
          onChange={useHandleChange}
        >
          <Option value="recent">Recent</Option>
          <Option value="mixed">Mixed</Option>
          <Option value="popular">Popular</Option>
        </Select>
      </SelectContainer>
      <ImageGrid
        pageStart={0}
        loadMore={loadFunc}
        hasMore={true}
        loader={<Loading />}
      >
        {data.length &&
          data.map(tweet => <Tweet tweet={tweet} key={tweet.id} />)}
      </ImageGrid>
    </div>
  );
}

export default TweetGrid;
