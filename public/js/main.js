var app = angular.module("wiki", ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when("/", {
      templateUrl : "../views/wiki.html",
      controller: "mainController"
    });
    $locationProvider.html5Mode(true);
});

app.controller("mainController", function ($scope, $http) {
  $scope.pageTitles = [];
  $scope.currentPage = {};
  $scope.contentTemplatePath = "";
  $scope.formMessage = "";
  $scope.formTitle = "";
  $scope.formBody = "";
  $scope.getPageTitles = function () {
    $http.get("/getPageTitles").then(
      function (res) { $scope.pageTitles = res.data.sort(); },
      function (err) { console.log(err); }
    );
  };
  $scope.showAllPages = function () {
    $scope.getPageTitles();
    $scope.contentTemplatePath = "views/list.html";
  };
  $scope.viewPage = function (pageTitle) {
    $http.get("/getPage/" + pageTitle).then(
      function (res) {
        $scope.currentPage = res.data;
        $scope.contentTemplatePath = "views/page.html";
      },
      function (err) { console.log(err); }
    );
  };
  $scope.showRandomPage = function () {
    if ($scope.pageTitles.length) {
      $scope.viewPage($scope.pageTitles[Math.floor(Math.random() * $scope.pageTitles.length)]);
    }
  };
  $scope.showPageForm = function (page) {
    $scope.formMessage = page ? "Editing Page: " + page.title : "Create a New Page";
    $scope.formTitle = page ? page.title : "";
    $scope.formBody = page ? page.body : "";
    $scope.contentTemplatePath = "views/form.html";
  };
  $scope.submitPage = function () {
    if ($scope.formTitle && $scope.formBody) {
      $http.post("/submitPage", {
        "title": $scope.formTitle,
        "body": $scope.formBody,
        "timestamp": new Date()
      }).then(
        function (res) { $scope.viewPage(res.data.title); },
        function (err) { console.log(err); }
      );
      $scope.formTitle = "";
      $scope.formBody = "";
    }
  };
  $scope.showAllPages();
});
