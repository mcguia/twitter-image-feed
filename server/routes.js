const express = require("express");

module.exports.configureRoutes = (app, config) => {
    app.get("/", (req, res) => res.sendFile(config.templatePath));
    app.use("/", express.static(config.staticContentLocation));
};
