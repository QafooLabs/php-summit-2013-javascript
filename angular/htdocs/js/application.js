var LocatorApp = angular.module('LocatorApp', ['ngRoute']);

LocatorApp.config(function($routeProvider) {
    $routeProvider.when("/", {
        controller: "RoomplanController"
    }).when("/row/:rowId/seat/:seatId", {
        controller: "RoomplanController"
    }).otherwise({
        redirectTo: "/"
    });
});

