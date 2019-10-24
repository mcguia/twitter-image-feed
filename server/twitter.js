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

  getTweets(search, sort, max_id, nsfw, fetch, callback) {
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

        let parsed_data = { hasMore: true, tweets: [] };

        // remove duplicate on paginated query
        if (fetch === "true") {
          if (data.statuses.length < 3)
            parsed_data.tweets = data.statuses.slice(0, 1);
          else
            parsed_data.tweets = data.statuses.slice(1, data.statuses.length);
        } else parsed_data.tweets = data.statuses;

        if (data.statuses.length < 20) {
          parsed_data.hasMore = false;
        }

        callback(null, parsed_data);
      }
    );
  }
}

module.exports = Twitter;
