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
            }
        }
    };
});

LocatorApp.directive("selectionDetails", function() {
    return {
        restrict: "AE",
        templateUrl: "partials/details.html",
        scope: {
            "selection": "=ngModel"
        }
    };
});
