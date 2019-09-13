import React, { Fragment } from "react";
import { Card, Icon } from "antd";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import TweetModal, { useModal } from "./TweetModal";

const TwitterCard = styled(Card)`
  border-radius: 4px;
  display: block;
  height: 0;
  padding-top: 78.22%;
  position: relative;
  width: 100%;
`;
const ThumbnailContent = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const ThumbnailImg = styled.img`
  padding: 10px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  left: 0;
  position: absolute;
  top: 0;
`;
const Info = styled.div`
    color: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    opacity: 0;
    transition: opacity .2s;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    &:hover {
      opacity:1;
    }
}
`;

const Details = styled.div`
  min-width: 0;
  padding-right: 15px;
  text-align: left;
`;

const Stats = styled.div`
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-item-align: end;
  align-self: flex-end;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-weight: 700;
  margin-left: auto;
  white-space: nowrap;
`;

const Credits = styled.div`
  background: linear-gradient(180deg, transparent 0, rgba(0, 0, 0, 0.6) 81%);
  margin-top: auto;
  padding: 30px 15px 18px;
  border-radius: 0 0 4px 4px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  pointer-events: none;
  position: relative;
  width: 100%;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
`;

const Tweet = ({ tweet }) => {
  const { isVisible, toggle } = useModal();

  const getImages = () => {
    if (!tweet.extended_entities) return null;
    const images = tweet.extended_entities.media;

    return images.map(img => (
      <div className="image-item" key={img.id}>
        <TwitterCard hoverable>
          <Link onClick={toggle}>
            <ThumbnailContent>
              <ThumbnailImg
                alt="twitter"
                src={img.media_url_https + "?format=jpg&name=small"}
              />
            </ThumbnailContent>
            <Info>
              <Credits>
                {getDetails(tweet)}
                {getStats(tweet)}
              </Credits>
            </Info>
          </Link>
        </TwitterCard>
      </div>
    ));
  };

  const getDetails = () => {
    return (
      <Details>
        <span>{tweet.user.screen_name}</span>
      </Details>
    );
  };

  const getStats = () => {
    return (
      <Stats>
        <span>
          <Icon type="heart" theme="filled" style={{ paddingRight: "5px" }} />
          {tweet.favorite_count}
        </span>
      </Stats>
    );
  };

  return (
    <Fragment>
      {tweet.extended_entities && getImages()}
      <TweetModal cancel={toggle} tweet={tweet} visible={isVisible} />
    </Fragment>
  );
};

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired
};

export default Tweet;
