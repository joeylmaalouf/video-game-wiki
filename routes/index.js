var path = require("path");
var Page = require("../models/pageModel");

var routes = {};

routes.home = function (req, res) {
  res.sendFile("main.html", { "root": path.join(__dirname, "../public") });
};

routes.getPages = function (req, res) {
  Page.find({}, function (err, pages) {
    if (err) return console.log(err);
    var pagesDict = {};
    pages.forEach(function (page) {
      pagesDict[page.title] = page;
    });
    res.json(pagesDict);
  });
};

routes.makePage = function (req, res) {
  Page.create(req.body, function (err, page) {
    if (err) return console.log(err);
    res.json(page);
  });
};

module.exports = routes;
