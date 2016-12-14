
(function() {

    'use strict';

    angular
        .module("FoodMaze")
        .controller("ProfileController", ProfileController);

    //Function to display the content on the homepage
    function ProfileController(UserService, $rootScope, $routeParams, ReviewService, RestaurantService) {

        var vm = this;
        vm.update = update;
        var selectedIndex = null;
        var username = $routeParams.username;

        function init(){



            var currUser = $rootScope.user;
            if (currUser != null) {
                vm.user = currUser;
            }


        }

        init();

        function update(user) {

            UserService.updateUser($rootScope.user._id,user)
                .then(  function(response){
                    $rootScope.user  = response.config.data;

                });

        }



    }
})();
