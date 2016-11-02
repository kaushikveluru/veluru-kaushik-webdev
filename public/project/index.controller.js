(function(){
    angular
        .module("OpenSourceMoney")
        .controller("IndexController",IndexController)
        .controller("ReposController",ReposController)

    function IndexController($http)
    {
        console.log("this is in index controller");
        console.log("index controller");
        var vm = this;
        vm.username="kaushikveluru"
        vm.userData=""
        console.log("index controller username : "+vm.username)

        $http.get("https://api.github.com/users/"+vm.username)
            .success(function(data) {
                console.log("inside success")
                vm.userData = data;
                console.log(data)
            });

    }

    function ReposController($http)
    {

    }


})();