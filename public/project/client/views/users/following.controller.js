
(function() {

    'use strict';

    angular
        .module("FoodMaze")
        .controller("FollowingController", FollowingController);

    //Function to display the content on the homepage
    function FollowingController(UserService, $rootScope, $routeParams, ReviewService, RestaurantService) {

        var vm = this;
        vm.deleteUsersIFollow = deleteUsersIFollow;
        var selectedIndex = null;
        var username = $routeParams.username;

        function init(){



            var currUser = $rootScope.user;
            if (currUser != null) {
                vm.user = currUser;
            }


            UserService.getUsersIFollow($rootScope.user._id)
                .then(function(response){
                    vm.follows = response.data.follows;
                });
        }

        init();







        function deleteUsersIFollow(username){

            UserService.deleteUsersIFollow($rootScope.user._id,username)
                .then(function(response){
                    init();
                });

            UserService.findUserByUsername(username)
                .then(function(response){
                    var userid = response.data._id;
                    UserService.deleteMyFollowers(userid,$rootScope.user.username)
                        .then(function(response){
                            init();
                        });
                });


        }

    }
})();
