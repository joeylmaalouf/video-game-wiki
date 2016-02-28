var path = require("path");
var Page = require("../models/pageModel");

var routes = {};

routes.home = function (req, res) {
  res.sendFile("main.html", { "root": path.join(__dirname, "../public") });
};

routes.getPageTitles = function (req, res) {
  Page.find({}, function (err, pages) {
    if (err) return res.send(500, {"error": err});
    var pageTitles = [];
    pages.forEach(function (page) {
      pageTitles.push(page.title);
    });
    res.json(pageTitles);
  });
};

routes.getPage = function (req, res) {
  Page.findOne({"title": req.params.title}, function (err, page) {
    if (err) return res.send(500, {"error": err});
    res.json(page.toObject());
  });
};

routes.submitPage = function (req, res) {
  Page.findOneAndUpdate({"title": req.body.title}, req.body, {"upsert": true}, function (err, page) {
    if (err) return res.send(500, {"error": err});
    res.json(req.body);
  });
};

module.exports = routes;
