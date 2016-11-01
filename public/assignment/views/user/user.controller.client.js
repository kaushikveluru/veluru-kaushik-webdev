(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController",LoginController)
        .controller("RegisterController",RegisterController)
        .controller("ProfileController",ProfileController)

    function LoginController(){
        var vm = this;
        console.log("hello from login controller");
    }

    function RegisterController(){
        var vm = this;
    }

    function ProfileController(){
        var vm = this;

    }
})();