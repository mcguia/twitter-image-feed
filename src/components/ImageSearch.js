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

  const maxid = useRef("0");
  // sort or nsfw change, fetch new list

  function fetchMoreTweets() {
    setOptions({ ...options, isFetching: true });
  }

  useEffect(() => {
    const searchAPI = async () => {
      setIsLoading(true);
      try {
        const result = await axios(
          `http://localhost:9000/tweets?q=${encodeURIComponent(
            options.query
          )}&result_type=${options.sort}&max_id=${maxid.current}&nsfw=${
            options.nsfw
          }&fetch=${options.isFetching}`
        );
        if (options.isFetching)
          setData(data => [...data, ...result.data.tweets]);
        else {
          setData(result.data.tweets);
        }
        setHasMore(result.data.hasMore);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    searchAPI();
  }, [options]);

  useEffect(() => {
    if (data && data.length > 0) {
      maxid.current = data[data.length - 1].id_str;
    }
  }, [data]);

  if (isError) return <div>Something went wrong...</div>;

  if (isLoading && !data) {
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
          onChange={value =>
            setOptions({ ...options, sort: value, isFetching: false })
          }
        >
          <Option value="recent">Recent</Option>
          <Option value="mixed">Mixed</Option>
          <Option value="popular">Popular</Option>
        </Select>
        <Text style={{ paddingRight: "1em" }}>include NSFW</Text>
        <Switch
          onChange={value =>
            setOptions({ ...options, nsfw: value, isFetching: false })
          }
        />
      </SelectContainer>

      {!isLoading && !data ? (
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
