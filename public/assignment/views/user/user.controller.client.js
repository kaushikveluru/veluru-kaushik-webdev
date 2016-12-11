(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController)
        .controller("RegisterController",RegisterController)
        .controller("ProfileController",ProfileController)


    var users=[
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];


    function LoginController($location,UserService){
        var vm = this;
        vm.login = login;

        function login(user){
            var promise = UserService.findUserByCredentials(user.username,user.password);
            promise
                .success(function(user){
                    if(user==null){
                        vm.error="No such user";
                    }
                    else{
                        vm.user = user;
                        $location.url("/user"+user._id);
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

        function register(username,password,verifypassword)
        {
            console.log("in register method")
            if(password != verifypassword)
            {
                vm.error = "passwords do not match"
            }
            else
            {
                var user = {_id: "999", username: username, password: password, firstName: username,   lastName: username, email: username+"@gmail.com" }
                user = UserService.createUser(user);
                $location.url("/user/"+user._id)
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