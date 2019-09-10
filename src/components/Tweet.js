import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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

  getImage() {
    const img_url = this.props.tweet.extended_entities.media[0].media_url_https;
    return img_url + "?format=jpg&name=small";
  }

  getSubtitle() {
    const tweet = this.props.tweet;
    return `By ${tweet.user.name}, at ${new Date(
      tweet.created_at
    ).toUTCString()}`;
  }

  render() {
    return (
      <div className="image-item">
        {this.props.tweet.extended_entities && (
          <ThumbnailImg src={this.getImage()}></ThumbnailImg>
        )}
      </div>
    );
  }
}

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired
};

export default Tweet;
