
(function() {

    'use strict';

    angular
        .module("FoodMaze")
        .controller("MyReviewsController", MyReviewsController);

    //Function to display the content on the homepage
    function MyReviewsController(UserService, $rootScope, $routeParams, ReviewService, RestaurantService) {

        var vm = this;
        vm.deleteReview = deleteReview;
        vm.updateReview = updateReview;
        var selectedIndex = null;
        var username = $routeParams.username;

        function init(){

            var currUser = $rootScope.user;
            if (currUser != null) {
                vm.user = currUser;
            }

            ReviewService.findAllReviewsForUser($rootScope.user._id)
                .then(function (response) {
                    vm.reviews = response.data;
                });

        }

        init();




        function deleteReview($index){

            var index = vm.reviews[$index]._id;
            ReviewService.deleteReview(index)
                .then(function(response){
                    if(response.data == "OK"){
                        vm.reviews.splice($index,1);
                    }
                });
        }

        function selectReview($index){
            vm.title={};
            selectedIndex = vm.reviews[$index];
            vm.title = selectedIndex.reviews;


        }

        function updateReview(review) {

            if(review != null && selectedIndex != null) {
                var newReview = {
                    "_id": selectedIndex._id,
                    "reviews": review
                }
                ReviewService.updateReview(newReview)
                    .then(function (response) {

                        if (response.statusText === "OK") {
                            init();
                            vm.title = null;
                            selectedIndex = null
                        }

                    });
            }


        }


    }
})();
