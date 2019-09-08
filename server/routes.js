const express = require("express");
const Twitter = require("./twitter");

module.exports.configureRoutes = (app, config) => {
  const twitter = new Twitter(config);

  app.get("/tweets", (req, res) => {
    twitter.getTweets((err, data) => {
      if (err) {
        console.error("Error: Failed to fetch tweets");
        return res.status(500).send(err);
      }
      return res.json(data);
    });
  });
};
