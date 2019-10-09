const Twit = require("twit");

class Twitter {
  constructor(config) {
    this.T = new Twit({
      consumer_key: config.twitterConsumerKey,
      consumer_secret: config.twitterConsumerSecret,
      app_only_auth: true,
      timeout_ms: 60 * 1000
    });
  }

  getTweets(search, sort, max_id, nsfw, callback) {
    var searchQuery = search + " filter:media -filter:retweets";
    if (nsfw === "false") searchQuery += " filter:safe -#nsfw -#porn";
    this.T.get(
      "search/tweets",
      {
        q: searchQuery,
        result_type: sort,
        count: 20,
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

  getTimeline(screen_name, max_id, callback) {
    this.T.get(
      "statuses/home_timeline",
      {
        screen_name: screen_name,
        count: 20,
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
