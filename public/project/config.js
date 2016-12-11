(function(){
    angular
        .module("smartpool")
        .config(Config);

    function Config($routeProvider)
    {
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs:"model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "LoginController",
                controllerAs:"model"
            })
            .when("/profile", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "LoginController",
                controllerAs:"model"
            })
            .when("/searchride", {
                templateUrl: "views/ride/search-ride.view.client.html",
                controller: "LoginController",
                controllerAs:"model"
            })
            .when("/addride", {
                templateUrl: "views/ride/add-ride.view.client.html",
                controller: "LoginController",
                controllerAs:"model"
            })
            .when("/", {
                templateUrl: "views/home.view.client.html",
                controller: "LoginController",
                controllerAs:"model"
            })



    }
})();
