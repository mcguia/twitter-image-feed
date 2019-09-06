const express = require("express");
const Twitter = require("./twitter");

module.exports.configureRoutes = (app, config) => {
  const twitter = new Twitter(config);

  app.get("/", (req, res) => {
    twitter.getTweets();
    res.sendFile(config.templatePath);
  });
  app.use("/", express.static(config.staticContentLocation));
};
