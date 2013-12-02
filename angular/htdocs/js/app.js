var LocatorApp = angular.module("LocatorApp", []);

LocatorApp.controller("RoomplanController", function($scope, $http) {
    $scope.roomplan = {};
    $scope.selection = null;

    var requestPromise = $http.get("data/roomplan.json");

    requestPromise.then(function(response) {
        $scope.roomplan = response.data;
    });
});

LocatorApp.directive("roomplan", function() {
    return {
        restrict: "AE",
        templateUrl: "partials/roomplan.html",
        scope: {
            "roomplan": "=ngModel",
            "selection": "=selectionModel"
        },
        controller: function($scope) {
            $scope.selectSeat = function(seat) {
                $scope.selection = seat;
            };
        }
    };
});