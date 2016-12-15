
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);
    
    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;


        /**
         * creates a new user if
         * 1) the password and verifyPassword matches
         * 2) the username does not already exists
         * 3) if either of the above conditions are not met,
         * it returns an appropriate error message to view
         * @param username
         * @param password
         * @param verifyPassword
         */
        function register(username, password, verifyPassword) {
            if(password != verifyPassword){
                vm.error = "The passwords do not match";
            } else {
                UserService
                    .findUserByUserName(username)
                    .success(function (user) {
                        if(user === '0'){
                            UserService
                                .register(username, password)
                                .success(function (user) {
                                    $location.url("/user/" + user._id);
                                })
                                .error(function (error) {
                                    console.log(error);
                                });
                        }else{
                            vm.error = "The given username already exists.";
                        }
                    })
                    .error(function (error) {
                        console.log(error);
                    });
            }

        }

    }

})();
