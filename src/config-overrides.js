const { override, fixBabelImports } = require("customize-cra");
const path = require("path");

function overrideEntry(config) {
  config.context = __dirname;
  config.entry = "./index.js";
  return config;
}
module.exports = override(
  overrideEntry,
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css"
  })
);
