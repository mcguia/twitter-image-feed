import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
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
  overflow: hidden !important;
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

const ImageSearch = ({ options, setOptions }) => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  let max_id = useRef("0");

  // trigger infinite load
  function fetchMoreTweets() {
    setOptions({ ...options, max_id: max_id.current, isFetching: true });
  }

  useEffect(() => {
    const searchAPI = async () => {
      setIsLoading(true);
      var maxid = options.max_id;
      try {
        const result = await axios(
          `/api/tweets?q=${encodeURIComponent(options.query)}&user=${
            options.user
          }&result_type=${options.sort}&max_id=${maxid}&nsfw=${
            options.nsfw
          }&fetch=${options.isFetching}`
        );
        // infinite load: append to data
        if (options.isFetching)
          setData(data => [...data, ...result.data.tweets]);
        // query, sort, nsfw change: reset data
        else {
          setData(result.data.tweets);
        }
        setHasMore(result.data.hasMore);
        max_id.current = result.data.max_id;
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    searchAPI();
  }, [options]);

  if (isError) return <div>Something went wrong...</div>;

  if (isLoading && !data.length) {
    return (
      <div style={{ textAlign: "center", padding: "3em" }}>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <SelectContainer>
        <Select
          defaultValue={options.sort}
          style={{ width: 120, paddingRight: "3em" }}
          onChange={value => {
            max_id.current = "0";
            setOptions({
              ...options,
              max_id: "0",
              sort: value,
              isFetching: false
            });
          }}
        >
          <Option value="recent">Recent</Option>
          <Option value="mixed">Mixed</Option>
          <Option value="popular">Popular</Option>
        </Select>
        <Text style={{ paddingRight: "1em" }}>include NSFW</Text>
        <Switch
          onChange={value => {
            max_id.current = "0";
            setOptions({
              ...options,
              max_id: "0",
              nsfw: value,
              isFetching: false
            });
          }}
        />
      </SelectContainer>

      {!isLoading && !data.length ? (
        <Empty
          description="Sorry, no tweets available."
          style={{ padding: "3em" }}
        />
      ) : (
        <ImageGrid
          dataLength={data.length}
          pageStart={0}
          next={fetchMoreTweets}
          hasMore={hasMore}
          loader={<Loading />}
          endMessage={<p>End of tweets.</p>}
        >
          {data && data.map((tweet, i) => <Tweet tweet={tweet} key={i} />)}
        </ImageGrid>
      )}
    </div>
  );
};

ImageSearch.propTypes = {
  options: PropTypes.object.isRequired,
  setOptions: PropTypes.func.isRequired
};

export default ImageSearch;
