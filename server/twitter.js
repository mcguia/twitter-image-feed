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

  getTweets(search, callback) {
    const searchQuery = search + " filter:media -filter:retweets";
    this.T.get(
      "search/tweets",
      {
        q: searchQuery,
        count: 10,
        tweet_mode: "extended",
        include_entities: true,
        entities: true
      },
      (err, data, response) => {
        if (err) {
          console.error(err);
          return callback(err);
        }
        callback(null, data);
      }
    );
  }
}

module.exports = Twitter;
