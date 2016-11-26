(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController",PageListController)
        .controller("NewPageController",NewPageController)
        .controller("EditPageController",EditPageController)

    function PageListController($routeParams,PageService){
        console.log("in page list controller")
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pages = PageService.findPageByWebsiteId(vm.wid);



    }

    function NewPageController($routeParams){

        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;

    }

    function EditPageController($routeParams){
        var vm = this;
        vm.uid= $routeParams.uid;
        vm.wid = $routeParams.wid;

    }
})();