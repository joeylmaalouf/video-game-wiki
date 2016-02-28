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
  $scope.contentTemplate = "";
  $scope.inputTitle = "";
  $scope.inputBody = "";
  $scope.getPageTitles = function () {
    $http.get("/getPageTitles").then(
      function (res) { $scope.pageTitles = res.data; },
      function (err) { console.log(err); }
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
      function (err) { console.log(err); }
    );
  };
  $scope.showRandomPage = function () {
    // maybe hide/strikethrough/fade via css if no pages
    if ($scope.pageTitles.length) {
      $scope.viewPage($scope.pageTitles[Math.floor(Math.random() * $scope.pageTitles.length)]);
    }
  };
  $scope.showPageForm = function () {
    $scope.contentTemplate = "views/new.html";
  };
  $scope.makePage = function () {
    if ($scope.inputTitle && $scope.inputBody) {
      $http.post("/makePage", {
        "title": $scope.inputTitle,
        "body": $scope.inputBody,
        "timestamp": new Date()
      }).then(
        function (res) {
          if (res.data.successful) {
            $scope.pageTitles.push(res.data.title);
            $scope.viewPage(res.data.title);
          }
          else {
            $scope.showAllPages();
          }
        },
        function (err) { console.log(err); }
      );
      $scope.inputTitle = "";
      $scope.inputBody = "";
    }
  };
  $scope.getPageTitles();
  $scope.showAllPages();
});
