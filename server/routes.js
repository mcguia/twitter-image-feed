const express = require("express");
const Twitter = require("./twitter");

module.exports.configureRoutes = (app, config) => {
  const twitter = new Twitter(config);

  app.get("/tweets", (req, res) => {
    var query = "#art";
    var filter = "mixed";
    var max_id = req.query.max_id;
    if (max_id === "0") max_id = undefined;
    if (req.query.q !== "undefined" && req.query.q !== "") query = req.query.q;
    if (req.query.result_type !== "undefined") filter = req.query.result_type;
    twitter.getTweets(query, filter, max_id, (err, data) => {
      if (err) {
        console.error("Error: Failed to fetch tweets");
        return res.status(500).send(err);
      }
      return res.json(data);
    });
  });
};
