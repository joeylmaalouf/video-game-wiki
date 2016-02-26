var mongoose = require("mongoose");

var pageSchema = mongoose.Schema({
  "title": String,
  "body": String
});

module.exports = mongoose.model("Page", pageSchema, "pages");
