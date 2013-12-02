LocatorApp.controller('RoomplanController', function ($scope, $http, $routeParams, SeatAnnotationService, $route, $location) {
    $scope.selection = null;
    $http.get("data/roomplan.json").then(function(response) {
        $scope.roomplan = SeatAnnotationService.annotate(response.data);

        if ($routeParams.seatId && $routeParams.rowId) {
            $scope.selection = $scope.roomplan.rows[$routeParams.rowId-1].seats[$routeParams.seatId-1];
        }
    });

    $scope.$watch("selection", function(selection) {
        if (selection !== null) {
            $location.path("/row/" + selection.row + "/seat/" + selection.seat).replace();
        }
    });
});