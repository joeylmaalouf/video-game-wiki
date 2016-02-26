var app = angular.module("wiki", ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.when("/", {
      templateUrl : "../views/wiki.html",
      controller: "mainController"
    });
    $locationProvider.html5Mode(true);
});

app.controller("mainController", function ($scope, $http) {
  $scope.pages = {};
  $scope.currentPage = {};
  $scope.pageFormData = {};
  $scope.getPages = function () {
    $http.get("/getPages").then(
      function (res) { $scope.pages = res.data; },
      function (err) { console.log("Error: " + err); }
    );
  };
  $scope.viewPage = function (pageTitle) {
    $scope.currentPage = $scope.pages[pageTitle];
  };
  $scope.makePage = function () {
    $http.post("/makePage", $scope.pageFormData).then(
      function (res) { $scope.getPages(); },
      function (err) { console.log("Error: " + err); }
    );
  };
  $scope.getPages();
});
