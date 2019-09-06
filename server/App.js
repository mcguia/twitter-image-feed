const express = require("express");
const _ = require("lodash");
const config = require("./config");
const routes = require("./routes");
const Twitter = require("./twitter");

class App {
  constructor(config) {
    this.config = config;
    this.app = null;
    this.server = null;
    this.twitter = new Twitter(config);
    this.configure();
  }

  configure() {
    this.app = express();
    routes.configureRoutes(this.app, this.config);
  }

  launch(callback) {
    this.server = this.app.listen(this.config.port, () => {
      console.log("Listening on port " + this.server.address().port);

      if (_.isFunction(callback)) {
        callback();
      }
    });
  }
}

new App(config).launch();
