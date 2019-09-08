import React, { Component } from "react";
import styled from "styled-components";

const img = styled.img`
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

    getSubtitle() {
        const tweet = this.props.tweet;
        return `By ${tweet.user.name}, at ${new Date(
            tweet.created_at
        ).toUTCString()}`;
    }

    render() {
        return <div className="tweet-card">{this.getSubtitle()}</div>;
    }
}

export default Tweet;
