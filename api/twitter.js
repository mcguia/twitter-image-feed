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

  getTweets(search, user, sort, max_id, nsfw, fetch, callback) {
    let searchQuery = search + " filter:media -filter:retweets";
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
        max_id: max_id,
        from: user
      },
      (err, data, response) => {
        if (err) {
          console.error(err);
          return callback(err);
        }

        let parsed_data = { hasMore: true, max_id: "0", tweets: [] };

        // remove duplicate on paginated query
        if ((fetch === "true") & (data.statuses.length > 0)) {
          if (data.statuses.length < 3)
            parsed_data.tweets = data.statuses.slice(0, 1);
          else
            parsed_data.tweets = data.statuses.slice(1, data.statuses.length);
        } else parsed_data.tweets = data.statuses;

        // end of results
        if (data.statuses.length < 20) {
          parsed_data.hasMore = false;
        }

        // set max_id to last tweet (for twitter API pagination)
        if (parsed_data.tweets.length > 0)
          parsed_data.max_id =
            parsed_data.tweets[parsed_data.tweets.length - 1].id_str;

        callback(null, parsed_data);
      }
    );
  }
}

module.exports = Twitter;
