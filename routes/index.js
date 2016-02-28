var path = require("path");
var Page = require("../models/pageModel");

var routes = {};

routes.home = function (req, res) {
  res.sendFile("main.html", { "root": path.join(__dirname, "../public") });
};

routes.getPageTitles = function (req, res) {
  Page.find({}, function (err, pages) {
    if (err) return console.log(err);
    var pageTitles = [];
    pages.forEach(function (page) {
      pageTitles.push(page.title);
    });
    res.json(pageTitles);
  });
};

routes.getPage = function (req, res) {
  Page.findOne({"title": req.params.title}, function (err, page) {
    if (err) return console.log(err);
    res.json(page.toObject());
  });
};

routes.makePage = function (req, res) {
  Page.count({"title": req.body.title}, function (err, count) {
    if (!count) {
      Page.create(req.body, function (err, page) {
        if (err) return console.log(err);
        res.json({"successful": true, "title": page.title});
      });
    }
    else {
      res.json({"successful": false});
    }
  });
};

module.exports = routes;
