(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);
    
    function LoginController($location, UserService) {
        var vm = this;
        vm.login= login;

        /**
         * checks the user credentials, if valid then logs in
         * @param username
         * @param password
         */
        function login(username, password) {
            UserService
                .login(username, password)
                .success(function (user) {
                    if(user === '0'){
                        vm.error = "No such user."
                    } else{
                        $location.url("/user/" + user._id);
                    }
                })
                .error(function (error) {
                    console.log(error);
                });
        }
    }
})();