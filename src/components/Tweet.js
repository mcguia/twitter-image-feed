import React, { Component } from "react";
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
    console.log(this.props.tweet.extended_entities.media[0]);
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
        <ThumbnailImg src={this.getImage()}></ThumbnailImg>
      </div>
    );
  }
}

export default Tweet;
