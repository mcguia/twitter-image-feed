import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import { Empty, Select, Switch, Typography } from "antd";
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

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  console.log(ref);
  return ref;
}

const ImageSearch = ({ query }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState({ tweets: [] });
  const [nsfw, setNsfw] = useState(false);
  const [sort, setSort] = useState("mixed");
  const [maxid, setMaxid] = useState("0");
  const [hasMore, setHasMore] = useState(true);
  const prevParams = usePrevious(sort);

  // TODO: just separate useEffect for sort, nsfw, query
  useEffect(
    () => {
      console.log(prevParams.current, sort);
      const fetchData = async () => {
        setIsLoading(true);
        const result = await axios(
          `http://localhost:9000/tweets?q=${encodeURIComponent(
            query
          )}&result_type=${sort}&max_id=${maxid}&nsfw=${nsfw}`
        );
        console.log(query);
        console.log(
          `http://localhost:9000/tweets?q=${encodeURIComponent(
            query
          )}&result_type=${sort}&max_id=${maxid}&nsfw=${nsfw}`
        );

        var rest;
        var more = true;

        const result_data = result.data.statuses;
        console.log(prevParams, sort);

        if (
          sort !== prevParams.current.sort ||
          nsfw !== prevParams.current.nsfw
        ) {
          //if sort or nsfw changed, return new batch of tweets
          rest = [...result_data];
          console.log(1);
        } else if (maxid !== "0" && query === prevParams.current.query) {
          // if same query, retain tweet list, slice duplicate
          if (result_data.length < 3) {
            rest = result_data.slice(0, 1);
            more = false;
            console.log(2);
          } else {
            rest = result_data.slice(1, result_data.length);
            console.log(3);
          }

          rest = [...data, ...rest];
        } else {
          rest = result_data;
        }

        setData(rest);
        setHasMore(more);
        setIsFetching(false);
        if (rest.length > 0) {
          setMaxid(rest[rest.length - 1].id_str);
        }
        setIsLoading(false);
      };
      fetchData();
    }, // eslint-disable-next-line
    [query, sort, nsfw, isFetching]
  );

  if (isLoading && !data.length) {
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
          onChange={value => setSort(value)}
        >
          <Option value="recent">Recent</Option>
          <Option value="mixed">Mixed</Option>
          <Option value="popular">Popular</Option>
        </Select>
        <Text style={{ paddingRight: "1em" }}>include NSFW</Text>
        <Switch onChange={value => setNsfw(value)} />
      </SelectContainer>

      {!isLoading && !data.length ? (
        <Empty
          description="Sorry, no tweets available."
          style={{ padding: "3em" }}
        />
      ) : (
        <ImageGrid
          pageStart={0}
          loadMore={() => setIsFetching(true)}
          hasMore={!isLoading && hasMore}
          loader={<Loading />}
        >
          {items}
        </ImageGrid>
      )}
    </div>
  );
};

export default ImageSearch;
