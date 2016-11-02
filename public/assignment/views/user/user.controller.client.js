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
        console.log("entering LoginController")
        var vm = this;
        vm.login = login;


        function login(username,password)
        {

            user = UserService.findUserByCredentials(username,password);

            if(user != null)
            {
                if(user.username === username && user.password === password)
                {
                    uid = user._id;
                    $location.url("/user/"+uid);
                }
            }
            else
            {
                vm.error="No such user exists";
            }

        }
    }

    function RegisterController(UserService){
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
                var user = {"_id":"999", "username: ":username, "password": password, "firstName": username,"lastName":username, "email":username+"@gmail.com" }

                UserService.createUser(user);
            }
        }
    }

    function ProfileController($routeParams,UserService) {

        var vm = this;
        var uid = $routeParams.uid

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