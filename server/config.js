const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const staticContentLocation = path.join(__dirname, "../build");

module.exports = {
  staticContentLocation,
  callbackPath: "auth/callback",
  port: process.env.PORT || "9000",
  templatePath: path.join(staticContentLocation, "index.html"),
  twitterConsumerKey: process.env.CONSUMER_KEY,
  twitterConsumerSecret: process.env.CONSUMER_SECRET,
  twitterAccessToken: process.env.ACCESS_TOKEN,
  twitterAccessSecret: process.env.ACCESS_SECRET
};

if (
  !module.exports.twitterConsumerKey ||
  !module.exports.twitterConsumerSecret ||
  !module.exports.twitterAccessToken ||
  !module.exports.twitterAccessSecret
) {
  throw new Error("Please provide valid Twitter credentials");
}
