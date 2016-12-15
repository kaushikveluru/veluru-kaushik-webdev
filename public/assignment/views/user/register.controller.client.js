
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);
    
    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, verifyPassword) {
            if(password != verifyPassword){
                vm.error = "The passwords do not match";
            } else {
                UserService
                    .findUserByUserName(username)
                    .success(function (user) {
                        if(user === '0'){
                            UserService
                                .createUser(username, password)
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
