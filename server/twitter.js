const Twit = require("twit");

class Twitter {
  constructor(config) {
    this.T = new Twit({
      consumer_key: config.twitterConsumerKey,
      consumer_secret: config.twitterConsumerSecret,
      access_token: config.twitterAccessToken,
      access_token_secret: config.twitterAccessSecret,
      timeout_ms: 60 * 1000
    });
  }

  getTweets() {
    const stream = this.T.stream("statuses/filter", {
      track: "#apple",
      language: "en"
    });

    stream.on("tweet", tweet => {
      console.log(tweet);
    });
  }
}

module.exports = Twitter;
