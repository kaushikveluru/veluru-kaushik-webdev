

(function(){

    'use strict';

    angular
        .module("FoodMaze")
        .controller("DetailsController", detailsController);

    function detailsController($routeParams, FoursquareService, $rootScope, UserService, $location, ReviewService,RestaurantService) {

        var vm = this;
        vm.addReview = addReview;
        vm.follow = follow;
        vm.removeFollow = removeFollow;
        var findres;

        vm.id = $routeParams.id;
        var hotelId = $routeParams.id;

        function init() {

            RestaurantService.findAllReviewsforHotel(hotelId)
                .then(function (response) {
                    vm.allReviews = response.data;
                    if(vm.allReviews.length==0){
                        vm.noreviews="Be the first one to write a review!"
                    }
                });

            if ($rootScope.user) {

                UserService.findUserById($rootScope.user._id)
                    .then(function (response) {
                        $rootScope.user = response.data;
                    });

        }

            RestaurantService.findRestaurantById(hotelId)
               .then(function(response){
                   findres = response.data;

               });


        }

        init();






        function checkIfUserReviewed(venue,review){

            var flag = false;
            ReviewService.findAllReviewsForUser($rootScope.user._id)
                .then(function(response){
                    var result = response.data;

                    for(var i in result){
                        if(result[i].restaurantId === venue.id){
                            alert("You cannot review more than once!");
                            flag = true;
                            vm.review = null;
                            break;
                        }
                    }

                    if(!flag){

                        var newReview =
                        {
                            "userId": $rootScope.user._id,
                            "username": $rootScope.user.username,
                            "restaurantId": venue.id,
                            "restaurantName": venue.name,
                            "reviews": review

                        };
                        ReviewService.addReview($rootScope.user._id, newReview)
                            .then(function(response){
                                vm.review = null;
                            init();
                        });

                    }
                });


        }

        function addReview(venue,review){
            vm.allReviews=""
            if($rootScope.user) {

                if (review != null) {

                    if (findres == "") {
                        var details = {

                            "restaurantId": venue.id,
                            "restaurantName": venue.name,
                        }

                        RestaurantService.addRestaurantById(details);
                        init();
                    }


                    checkIfUserReviewed(venue,review);

                }

            }else{
                alert("Please login to write a review");
                $location.url("/login");
            }
        }

        function follow(username){
            if($rootScope.user){

                UserService.addfollowers($rootScope.user._id,username)
                    .then(function(response){
                        init();
                    });

                UserService.userFollowedby(username,$rootScope.user.username);
            }else{
                alert("Please login to Follow a User");
                $location.url("/login");
            }
        }

        function removeFollow(username){

            UserService.deleteUsersIFollow($rootScope.user._id,username)
                .then(function(response){
                    console.log(response);
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

        FoursquareService.findRestaurantByID(vm.id)
            .then(function(response) {

                vm.info = response.data;

                var address = vm.info.response.venue.name;



            });

    }
})();