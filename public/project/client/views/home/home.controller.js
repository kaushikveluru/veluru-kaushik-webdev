
(function() {

    'use strict';

    angular
        .module("FoodMaze")
        .controller("HomeController", HomeController);

    //Function to display the content on the homepage
    function HomeController($location, $rootScope, FoursquareService) {

        var vm  = this;
        vm.search = search;


        function search(name,place) {

            var finalName;
            var finalPlace;

            if (name == null && place == null) {
                finalName = "restaurants";
                finalPlace = "boston";

            }

            else if (name == null && place !== null){

                finalName = "restaurants";
                finalPlace = place;

            }

            else if (name !== null && place == null){

                finalName = name;
                finalPlace = "boston";

            }

            else {

                finalName = name;
                finalPlace = place;


            }

            FoursquareService
                .findByNameLocation(finalName, finalPlace)
                .then(function(response){
                    var result = response.data.response.venues;

                    if(result != "") {
                        $rootScope.info = response.data;
                        $rootScope.name = name;
                        $location.url("/search/" + name);
                    }else{

                        alert(" No results found");
                        return;
                    }
                });
        }




    }
})();
