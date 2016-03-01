var app = angular.module("wiki", ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when("/", {
      templateUrl : "../views/wiki.html",
      controller: "mainController"
    });
    $locationProvider.html5Mode(true);
});

app.controller("mainController", function ($scope, $http) {
  $scope.pagesInfo = [];
  $scope.currentPage = {};
  $scope.contentTemplatePath = "";
  $scope.formMessage = "";
  $scope.formTitle = "";
  $scope.formBody = "";
  $scope.formExitButton = "";
  $scope.getPagesInfo = function () {
    $http.get("/getPagesInfo").then(
      function (res) { $scope.pagesInfo = res.data.sort(function (a, b) { return a.title.localeCompare(b.title); }); },
      function (err) { console.log(err); }
    );
  };
  $scope.showAllPages = function () {
    $scope.getPagesInfo();
    $scope.contentTemplatePath = "views/list.html";
  };
  $scope.viewPage = function (pageId) {
    $http.get("/getPage/" + pageId).then(
      function (res) {
        $scope.currentPage = res.data;
        $scope.contentTemplatePath = "views/page.html";
      },
      function (err) { console.log(err); }
    );
  };
  $scope.showRandomPage = function () {
    if ($scope.pagesInfo.length) {
      $scope.viewPage($scope.pagesInfo[Math.floor(Math.random() * $scope.pagesInfo.length)]._id);
    }
  };
  $scope.showPageForm = function (page) {
    $scope.formMessage    = page ? "Editing Page: " + page.title : "Create a New Page";
    $scope.formTitle      = page ? page.title                    : "";
    $scope.formBody       = page ? page.body                     : "";
    $scope.formExitButton = page ? "Delete"                      : "Cancel";
    $scope.currentPage = page;
    $scope.contentTemplatePath = "views/form.html";
  };
  $scope.submitPage = function () {
    if ($scope.formTitle && $scope.formBody) {
      $http.post("/submitPage", {
        "_id": $scope.currentPage ? $scope.currentPage._id : null,
        "title": $scope.formTitle,
        "body": $scope.formBody
      }).then(
        function (res) { $scope.viewPage(res.data._id); },
        function (err) { console.log(err); }
      );
      $scope.formMessage = "";
      $scope.formTitle = "";
      $scope.formBody = "";
      $scope.formExitButton = "";
    }
  };
  $scope.deletePage = function () {
    if ($scope.currentPage) {
      $http.put("/deletePage", {
        "_id": $scope.currentPage._id,
      }).then(
        function (res) { },
        function (err) { console.log(err); }
      );
    }
    $scope.showAllPages();
  };
  $scope.showAllPages();
});
