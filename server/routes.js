const express = require("express");
const Twitter = require("./twitter");

module.exports.configureRoutes = (app, config) => {
  const twitter = new Twitter(config);

  app.get("/tweets", (req, res) => {
    let query = "";
    let sort = "mixed";
    let max_id = req.query.max_id;
    let user = req.query.user;
    if (user === null) user = "";
    if (max_id === "0") max_id = undefined;
    if (req.query.q !== "undefined" && req.query.q !== "") query = req.query.q;
    if (req.query.result_type !== "undefined") sort = req.query.result_type;

    twitter.getTweets(
      query,
      user,
      sort,
      max_id,
      req.query.nsfw,
      req.query.fetch,
      (err, data) => {
        if (err) {
          console.error("Error: Failed to fetch tweets");
          return res.status(500).send(err);
        }
        return res.json(data);
      }
    );
  });
};
