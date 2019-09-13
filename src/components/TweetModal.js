import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Button,
  Carousel,
  Divider,
  Icon,
  Modal,
  Typography
} from "antd";
import styled from "styled-components";
const { Text, Title } = Typography;

const UserInfo = styled.div`
  -webkit-box-direction: normal;
  -webkit-box-orient: horizontal;
  flex-direction: row;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-basis: auto;
  flex-shrink: 0;
  padding-bottom: 10px;
`;
const Username = styled.div`
  -webkit-box-align: stretch;
  -webkit-box-direction: normal;
  -webkit-box-orient: vertical;
  -webkit-flex-basis: auto;
  -webkit-flex-direction: column;
  flex-direction: column;
  display: flex;
  margin-left: 5px;
`;
const UserLink = styled.a`
  -webkit-box-align: stretch;
  -webkit-box-direction: normal;
  -webkit-box-orient: vertical;
  -webkit-flex-basis: auto;
  -webkit-flex-direction: column;
  flex-direction: column;
  display: flex;
`;
const CarouselWrapper = styled.div`
  .ant-carousel .slick-slide {
    text-align: center;
    height: 100%;
    background: #364d79;
    overflow: hidden;
  }

  .ant-carousel .slick-slide h3 {
    color: #fff;
  }
`;
const ImageItem = styled.div`
  padding-bottom: 2em;
`;
const Level = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const LevelLeft = styled.div`
  justify-content: flex-start;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
`;
const LevelRight = styled.div`
  justify-content: flex-end;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
`;

export const useModal = () => {
  const [isVisible, setVisible] = useState(false);

  function toggle() {
    setVisible(!isVisible);
  }

  return {
    isVisible,
    toggle
  };
};

const TweetModal = ({ cancel, tweet, visible }) => {
  if (!tweet.extended_entities) return null;
  const images = tweet.extended_entities.media;
  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    year: "numeric",
    month: "short",
    day: "2-digit"
  };
  const date = new Date(tweet.created_at).toLocaleDateString("en-us", options);

  const TweetImage = () => {
    if (images.length === 1) {
      return (
        <ImageItem>
          <img
            alt="twitter"
            src={images[0].media_url_https + "?format=jpg&name=large"}
            style={{ maxWidth: "100%" }}
          />
        </ImageItem>
      );
    } else if (images.length > 1) {
      return (
        <CarouselWrapper>
          <Carousel adaptiveHeight arrows={true}>
            {images.map(img => (
              <ImageItem key={img.id}>
                <img
                  alt="twitter"
                  src={img.media_url_https + "?format=jpg&name=large"}
                  style={{ maxWidth: "100%" }}
                />
              </ImageItem>
            ))}
          </Carousel>
        </CarouselWrapper>
      );
    }
  };

  return (
    <Modal visible={visible} onCancel={cancel} width={1200} footer={null}>
      <UserInfo>
        <a
          href={`https://twitter.com/${tweet.user.screen_name}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Avatar src={tweet.user.profile_image_url_https} size={50} />
        </a>
        <Username>
          <UserLink
            href={`https://twitter.com/${tweet.user.screen_name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Text strong>{tweet.user.name}</Text>
            <Text>{tweet.user.screen_name}</Text>
          </UserLink>
        </Username>
      </UserInfo>

      <Title level={4} style={{ paddingBottom: "1rem" }}>
        {tweet.full_text}
      </Title>
      <TweetImage />
      <Text>{date}</Text>
      <Divider />
      <Level>
        <LevelLeft>
          <Icon type="retweet" style={{ paddingRight: "5px" }} />
          {tweet.retweet_count}
          <Icon
            type="heart"
            theme="filled"
            style={{ paddingLeft: "10px", paddingRight: "5px" }}
          />
          {tweet.favorite_count}
        </LevelLeft>
        <LevelRight>
          <a
            href={`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button type="primary">View on Twitter</Button>
          </a>
        </LevelRight>
      </Level>
    </Modal>
  );
};

TweetModal.propTypes = {
  cancel: PropTypes.func.isRequired,
  tweet: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired
};

export default TweetModal;
