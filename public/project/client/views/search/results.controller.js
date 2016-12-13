
(function() {

    'use strict';

    angular
        .module("FoodMaze")
        .controller("ResultsController", ResultsController);

    //Function to display the content on the homepage
    function ResultsController($location, $routeParams) {

        var vm = this;
        vm.$location = $location;
        vm.name = $routeParams.name;
    }
})();
