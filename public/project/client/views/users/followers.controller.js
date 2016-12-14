
(function() {

    'use strict';

    angular
        .module("FoodMaze")
        .controller("FollowersController", FollowersController);

    //Function to display the content on the homepage
    function FollowersController(UserService, $rootScope, $routeParams, ReviewService, RestaurantService) {

        var vm = this;
        vm.deleteMyFollowers = deleteMyFollowers;
        var selectedIndex = null;
        var username = $routeParams.username;

        function init(){



            var currUser = $rootScope.user;
            if (currUser != null) {
                vm.user = currUser;
            }

            UserService.getMyFollowers($rootScope.user._id)
                .then(function(response){
                    vm.followedBy = response.data.followedBy;
                });

        }

        init();









        function deleteMyFollowers(username){

            UserService.deleteMyFollowers($rootScope.user._id,username)
                .then(function(response){
                    init();
                });


            UserService.findUserByUsername(username)
                .then(function(response){
                    var userid = response.data._id;
                    UserService.deleteUsersIFollow(userid,$rootScope.user.username)
                        .then(function(response){
                            init();
                        });
                });
        }
    }
})();
