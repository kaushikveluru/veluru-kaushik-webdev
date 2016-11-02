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


    function LoginController($location){
        var vm = this;
        console.log("hello from login controller");

        vm.login = login;
        function login(username,password)
        {

            var found = false;
            for(var u in users)
            {
                user = users[u]
                if(user.username === username && user.password === password)
                {
                    found = true;
                    console.log("user found")
                    $location.url("/user/"+user._id)
                    break;
                }
            }
            if(!found)
            {   vm.error="No such user"
                console.log("user not found")
            }


        }
    }

    function RegisterController(){
        var vm = this;
    }

    function ProfileController($routeParams) {

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