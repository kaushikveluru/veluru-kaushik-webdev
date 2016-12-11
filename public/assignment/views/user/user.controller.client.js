(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController)
        .controller("RegisterController",RegisterController)
        .controller("ProfileController",ProfileController)


    function LoginController($location,UserService){
        var vm = this;
        vm.login = login;

        function login(user){
            if(user == null){
                vm.error = "Empty username or password"
            }
            var promise = UserService.findUserByCredentials(user.username,user.password);
            promise
                .success(function(user){
                    if(user==null){
                        vm.error="No such user";
                    }
                    else{
                        vm.user = user;
                        $location.url("/user/"+user._id);
                    }
                })
                .error(function(err){
                    vm.error = err;
                    console.log(err);
                })
        }
    }

    function RegisterController($location,UserService){
        var vm = this;
        vm.register = register;

        function register(user)
        {
            if(user.password != user.verifypassword)
            {
                vm.error = "passwords do not match"
            }
            else
            {
                var createUser = UserService.createUser(user);
                createUser
                    .success(function(userNew){
                        vm.user = userNew;
                        $location.url("/user/"+userNew._id)
                    })
                    .error(function(err){
                        console.log(err);
                    })
            }
        }
    }

    function ProfileController($routeParams,UserService) {

        var vm = this;
        var uid = $routeParams.uid
        vm.uid = uid;

        function init()
        {
            var user = UserService.findUserById(uid)
                user
                .success(function(user){
                    vm.user = user
                })
                .error(function(user){vm.error = "profile for user id: "+uid+"doesn't exist"})
        }
        init();

    }
})();