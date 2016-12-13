
(function() {

    'use strict';

    var details_url = "https://api.foursquare.com/v2/venues/ID?&client_id=DNCEOI4KJLLPSTNS0HRTMYTIM1TDGBG31I2O2TWYBRDKCIRH&client_secret=0D4XRV2WDAPBZNWHZLSKITFYGZFZGPIWNWAVMX2E3UBFDBNB&v=20140806";

    angular
        .module("FoodMaze")
        .factory("FoursquareService", FoursquareService);

    function FoursquareService($http) {

        var api = {
            findByNameLocation: findByNameLocation,
            findRestaurantByID: findRestaurantByID,
            findRestaurantByOption : findRestaurantByOption
        };
        return api;

        function findByNameLocation(name,place) {

            return $http({
                method: "JSONP",
                params: {
                  query: name,
                    near : place,
                    categoryId : "4d4b7105d754a06374d81259",
                    limit : 10,
                    client_id : 'DNCEOI4KJLLPSTNS0HRTMYTIM1TDGBG31I2O2TWYBRDKCIRH',
                    client_secret : '0D4XRV2WDAPBZNWHZLSKITFYGZFZGPIWNWAVMX2E3UBFDBNB',
                    v : '20140806'
                },
                url: "https://api.foursquare.com/v2/venues/search?callback=JSON_CALLBACK",
                isArray: true
            });


        }

        function findRestaurantByID(id) {

                var url = details_url
                    .replace("ID", id);
                return $http.get(url);
        }

        function findRestaurantByOption(name){

            return $http({
                method: "JSONP",
                params: {
                    query: name,
                    near : "Boston",
                    categoryId : "4d4b7105d754a06374d81259",
                    limit : 10,
                    client_id : 'DNCEOI4KJLLPSTNS0HRTMYTIM1TDGBG31I2O2TWYBRDKCIRH',
                    client_secret : '0D4XRV2WDAPBZNWHZLSKITFYGZFZGPIWNWAVMX2E3UBFDBNB',
                    v : '20140806'
                },
                url: "https://api.foursquare.com/v2/venues/search?callback=JSON_CALLBACK",
                isArray: true
            });

        }


    }
})();