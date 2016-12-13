(function() {

    'use strict';

    angular
        .module("FoodMaze")
        .controller("MainController", MainController);

    function MainController($scope, $location) {

        $scope.$location = $location;
    }

})();