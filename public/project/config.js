(function(){
    angular
        .module("OpenSourceMoney")
        .config(Config);

    function Config($routeProvider)
    {
        $routeProvider
            .when("/", {
                templateUrl: "github.view.client.js.html",
                controller: "IndexController",
                controllerAs:"model"
            })
    }
})();
