const path = require("path");
const express = require("express");
const _ = require("lodash");
const cors = require("cors");
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
    this.app.use(cors());
    routes.configureRoutes(this.app, this.config);

    if (process.env.NODE_ENV === "production") {
      // Serve any static files
      this.app.use(express.static(path.join(__dirname, "client/build")));
      // Handle React routing, return all requests to React app
      this.app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "client/build", "index.html"));
      });
    }
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
