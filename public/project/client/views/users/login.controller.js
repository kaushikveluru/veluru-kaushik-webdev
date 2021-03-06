
(function() {

    'use strict';

    angular
        .module("FoodMaze")
        .controller("LoginController", LoginController);

    //Function to display the content on the homepage
    function LoginController(UserService, $location, $rootScope) {

        var vm = this;

        vm.login = login;

        function login (user) {

            //Service to validate the user credentials
            if (user == null) {
                vm.message = "Please enter the required fields";
                return;
            }

                UserService.login({username : user.username, password : user.password})
                    .then(function (response) {
                        var currentUser = response.data;
                        if(currentUser) {
                        $rootScope.user = response.data;
                        vm.user.username = $rootScope.user.username;
                        $location.url("/home");
                    }

                    else{
                            vm.message = "Invalid username/password";
                            }
                        },
                        function(err){
                            vm.message = "Invalid username/password";
                        }
                    );



        }
        }



})();
