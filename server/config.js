const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const staticContentLocation = path.join(__dirname, "../build");

module.exports = {
    staticContentLocation,
    callbackPath: "auth/callback",
    port: process.env.PORT || "3000",
    templatePath: path.join(staticContentLocation, "index.html"),
    twitterConsumerKey: process.env.CONSUMER_KEY,
    twitterConsumerSecret: process.env.CONSUMER_SECRET
};

if (
    !module.exports.twitterConsumerKey ||
    !module.exports.twitterConsumerSecret
) {
    throw new Error("Please provide valid Twitter credentials");
}
