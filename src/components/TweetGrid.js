import React from "react";
import styled from "styled-components";
import Loading from "./Loading";
import Tweet from "./Tweet";

function getTweets() {
  try {
    return JSON.parse(this.props.tweets).statuses;
  } catch (e) {
    return [];
  }
}

function useTweets() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);

    getTweets().then(() => {
      setLoading(false);
    });
  }, []);

  return [loading];
}

export default function TweetGrid() {
  const [loading] = useTweets();

  if (loading === true) {
    return <Loading />;
  }

  return (
    <div className="center-container">
      <h1 className="tweets-title">{this.title}</h1>
      {this.getTweets().map(tweet => (
        <Tweet tweet={tweet} />
      ))}
    </div>
  );
}
