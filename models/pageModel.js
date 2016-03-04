// The database model definition of a wiki page.

var mongoose = require("mongoose");

var pageSchema = mongoose.Schema({
  "title": String,
  "body": String,
  "timestamp": Date
});

module.exports = mongoose.model("Page", pageSchema, "pages");
