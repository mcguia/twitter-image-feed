import React, { useEffect } from "react";
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
  const {
    data,
    query,
    filter,
    max_id,
    isFetching,
    hasMore,
    error
  } = useSelector(state => ({
    data: state.app.tweets,
    query: state.app.query,
    filter: state.app.filter,
    max_id: state.app.max_id,
    isFetching: state.app.isFetching,
    hasMore: state.app.hasMore,
    error: state.app.error
  }));
  const isEmpty = (!isFetching && !data.length) || error !== null;
  const dispatch = useDispatch();

  const useHandleChange = value => {
    dispatch(setFilter(query, value));
  };
  const loadFunc = () => {
    dispatch(getTweets(query, filter, max_id));
    console.log("scroll load...");
  };

  useEffect(() => {
    dispatch(getTweets());
  }, [dispatch]);

  if (isFetching && !data.length) {
    return (
      <div style={{ textAlign: "center", padding: "3em" }}>
        <Loading />
      </div>
    );
  }

  var items = [];

  if (data.length) {
    data.forEach((tweet, i) => {
      items.push(<Tweet tweet={tweet} key={i} />);
    });
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

      {isEmpty ? (
        <Empty
          description="Sorry, no tweets available."
          style={{ padding: "3em" }}
        />
      ) : (
        <ImageGrid
          pageStart={0}
          loadMore={loadFunc}
          hasMore={!isFetching && hasMore}
          loader={<Loading />}
        >
          {items}
        </ImageGrid>
      )}
    </div>
  );
}

export default TweetGrid;
