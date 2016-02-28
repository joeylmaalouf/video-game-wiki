var app = angular.module("wiki", ["ngRoute", "ngSanitize"]);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when("/", {
      templateUrl : "../views/wiki.html",
      controller: "mainController"
    });
    $locationProvider.html5Mode(true);
});

app.controller("mainController", function ($scope, $http, $compile) {
  $scope.pageTitles = [];
  $scope.currentPage = {};
  $scope.contentTemplate = "";
  $scope.getPageTitles = function () {
    $http.get("/getPageTitles").then(
      function (res) { $scope.pageTitles = res.data; },
      function (err) { console.log("Error: " + err); }
    );
  };
  $scope.showAllPages = function () {
    $scope.contentTemplate = "views/list.html";
  };
  $scope.viewPage = function (pageTitle) {
    $http.get("/getPage/" + pageTitle).then(
      function (res) {
        $scope.currentPage = res.data;
        $scope.contentTemplate = "views/page.html";
      },
      function (err) { console.log("Error: " + err); }
    );
  };
  $scope.showRandomPage = function () {
    $scope.viewPage($scope.pageTitles[Math.floor(Math.random() * $scope.pageTitles.length)]);
  };
  $scope.showPageForm = function () {
    // TODO
  };
  $scope.makePage = function () {
    var formData = {/**/};
    $http.post("/makePage", formData).then(
      function (res) { 
        if (res.successful) {
          $scope.pageTitles.push(formData.title);
        }
      },
      function (err) { console.log("Error: " + err); }
    );
  };
  $scope.getPageTitles();
  $scope.showAllPages();
});
