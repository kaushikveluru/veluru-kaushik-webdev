(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController",PageListController)
        .controller("NewPageController",NewPageController)
        .controller("EditPageController",EditPageController)

    function PageListController($routeParams){
        var vm = this;
        vm.uid = $routeParams.uid;
    }

    function NewPageController($routeParams){

        var vm = this;
        vm.uid = $routeParams.uid;

    }

    function EditPageController($routeParams){
        var vm = this;
        vm.uid= $routeParams.uid;

    }
})();