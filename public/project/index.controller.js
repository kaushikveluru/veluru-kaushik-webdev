(function(){
    angular
        .module("OpenSourceMoney")
        .controller("IndexController",IndexController)

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
        console.log("rest api called")
        console.log("user data : "+vm.userData);
    }
})();