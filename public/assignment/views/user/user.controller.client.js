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
            console.log("calling service")
            var promise = UserService.findUserByCredentials(user.username,user.password);
            promise
                .success(function(user){
                    if(user==null){
                        vm.error="No such user";
                    }
                    else{
                        vm.user = user;
                        console.log("navigating to user page")
                        console.log("user id : "+user._id)
                        $location.url("/user/"+user._id);
                    }
                })
                .error(function(err){
                    console.log(err);
                })
        }
    }

    function RegisterController($location,UserService){
        var vm = this;
        vm.register = register;

        function register(user)
        {
            console.log("in register method")
            if(user.password != user.verifypassword)
            {
                vm.error = "passwords do not match"
            }
            else
            {
                console.log("creating user in register controller")
                var createUser = UserService.createUser(user);
                createUser
                    .success(function(userNew){
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


        var user = UserService.findUserById(uid);

        if(user != null)
        {
            vm.user = user;
        }
        else
        {
            vm.error = "profile for user id: "+uid+" doesn't exist"
        }



    }
})();