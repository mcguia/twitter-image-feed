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

  getTweets(search, filter, max_id, callback) {
    const searchQuery = search + " filter:media -filter:retweets";
    console.log(searchQuery, filter, max_id);
    this.T.get(
      "search/tweets",
      {
        q: searchQuery,
        result_type: filter,
        count: 10,
        tweet_mode: "extended",
        include_entities: true,
        entities: true,
        max_id: max_id
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
