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

  getTweets(callback) {
    this.T.get(
      "search/tweets",
      { q: "#art filter:media", count: 5 },
      (err, data, response) => {
        if (err) {
          console.error(err);
          return callback(err);
        }
        console.log(data);
        callback(null, data);
      }
    );
  }
}

module.exports = Twitter;