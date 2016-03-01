var path = require("path");
var Page = require("../models/pageModel");

var routes = {};

routes.home = function (req, res) {
  res.sendFile("main.html", { "root": path.join(__dirname, "../public") });
};

routes.getPagesInfo = function (req, res) {
  Page.find({}, function (err, pages) {
    if (err) return res.status(500).send({"error": err});
    var pagesInfo = [];
    pages.forEach(function (page) {
      pagesInfo.push({"_id": page._id, "title": page.title});
    });
    res.json(pagesInfo);
  });
};

routes.getPage = function (req, res) {
  Page.findById(req.params._id, function (err, page) {
    if (err) return res.status(500).send({"error": err});
    res.json(page.toObject());
  });
};

routes.submitPage = function (req, res) {
  var pageData = {
    "title": req.body.title,
    "body": req.body.body,
    "timestamp": new Date()
  };
  var callback = function (err, page) {
    if (err) return res.status(500).send({"error": err});
    res.json(page.toObject());
  };
  if (req.body._id) { Page.findOneAndUpdate({"_id": req.body._id}, pageData, callback); }
  else { Page.create(pageData, callback); }
};

routes.deletePage = function (req, res) {
  Page.findByIdAndRemove(req.body._id, function (err, page) {
    if (err) return res.status(500).send({"error": err});
    res.json(page.toObject());
  });
};

module.exports = routes;
