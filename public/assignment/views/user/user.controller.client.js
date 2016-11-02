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


        function login(username,password)
        {
            user = UserService.findUserByCredentials(username,password);

            if(user != null)
            {
                if(user.password === vm.user.password)
                {
                    $location.url("/user/"+user._id)
                }
            }
            else
            {
                vm.error="No such user"
            }
        }
    }

    function RegisterController(){
        var vm = this;
    }

    function ProfileController($routeParams,UserService) {

        var vm = this;
        var uid = $routeParams.uid
        console.log("user id: "+uid)

        for (var u in users)
        {
            if(users[u]._id === uid)
            {
                console.log("found user again in profile controller : ",users[u].username)
                vm.user = users[u];
                break;
            }
        }


    }
})();