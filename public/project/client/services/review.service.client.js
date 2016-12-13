
(function(){

    'use strict';

    angular
        .module("FoodMaze")
        .factory("ReviewService",ReviewService);

    function ReviewService($http){

        var api = {

            addReview : addReview,
            findAllReviews: findAllReviews,
            findAllReviewsForUser: findAllReviewsForUser,
            deleteReview: deleteReview,
            updateReview: updateReview
        };

        return api;

        function findAllReviews(){
            return $http.get("/api/project/reviews");
        }

        function addReview(userId, review){

            return $http.post("/api/project/user/"+userId+"/addReview",review);

        }

        function findAllReviewsForUser(userId){

            return $http.get("/api/project/user/"+userId+"/reviews");

        }

        function deleteReview(id){
            return $http.delete("/api/project/review/"+id);
        }


        function updateReview(review){

            return $http.put("/api/project/review",review)
        }


    }

})();
