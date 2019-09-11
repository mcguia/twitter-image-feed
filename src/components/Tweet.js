import React, { Component, Fragment } from "react";
import { Card } from "antd";
import PropTypes from "prop-types";
import styled from "styled-components";

const TwitterCard = styled(Card)`
  .ant-card-body {
    padding: 10px;
  }
  display: flex;
  height: 400px;
`;
const ThumbnailImg = styled.img`
  display: flex;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

class Tweet extends Component {
  getTitle() {
    const parser = new DOMParser();
    return parser.parseFromString(
      `<html><body>${this.props.tweet.text}`,
      "text/html"
    ).body.textContent;
  }

  getImages() {
    const images = this.props.tweet.extended_entities.media;

    return images.map(img => (
      <div className="image-item" key={img.id}>
        <TwitterCard hoverable>
          <ThumbnailImg
            alt="twitter"
            src={img.media_url_https + "?format=jpg&name=small"}
          />
        </TwitterCard>
      </div>
    ));
  }

  getSubtitle() {
    const tweet = this.props.tweet;
    return `By ${tweet.user.name}, at ${new Date(
      tweet.created_at
    ).toUTCString()}`;
  }

  render() {
    console.log(this.props.tweet);
    return (
      <Fragment>
        {this.props.tweet.extended_entities && this.getImages()}
      </Fragment>
    );
  }
}

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired
};

export default Tweet;
