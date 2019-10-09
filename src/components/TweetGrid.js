import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import { Empty, Select, Switch, Typography } from "antd";
import { getTweets, setSort, setNsfw } from "../actions/actions";
import styled from "styled-components";
import Loading from "./Loading";
import Tweet from "./Tweet";
const { Text } = Typography;
const { Option } = Select;

const SelectContainer = styled.div`
  background: #fff;
  padding: 20px 30px;
  font-size: 14px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
    sort,
    max_id,
    isFetching,
    hasMore,
    nsfw,
    error
  } = useSelector(state => ({
    data: state.app.tweets,
    query: state.app.query,
    sort: state.app.sort,
    max_id: state.app.max_id,
    isFetching: state.app.isFetching,
    hasMore: state.app.hasMore,
    nsfw: state.app.nsfw,
    error: state.app.error
  }));
  const isEmpty = (!isFetching && !data.length) || error !== null;
  const dispatch = useDispatch();

  const handleChange = value => {
    dispatch(setSort(query, value, nsfw, max_id));
  };
  const nsfwChange = value => {
    dispatch(setNsfw(query, sort, value, max_id));
  };
  const loadFunc = () => {
    dispatch(getTweets(query, sort, nsfw, max_id));
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
          defaultValue={sort}
          style={{ width: 120, paddingRight: "3em" }}
          onChange={handleChange}
        >
          <Option value="recent">Recent</Option>
          <Option value="mixed">Mixed</Option>
          <Option value="popular">Popular</Option>
        </Select>
        <Text style={{ paddingRight: "1em" }}>include NSFW</Text>
        <Switch onChange={nsfwChange} />
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
