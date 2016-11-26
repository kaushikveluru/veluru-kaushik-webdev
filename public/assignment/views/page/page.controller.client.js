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

    function NewPageController($routeParams,PageService,$location){

        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.createNewPage = createNewPage;

        function createNewPage(pageName,pageTitle){

            var page =  { "_id": "999", "name": pageName, "websiteId": vm.wid, "description": pageTitle }
            PageService.createPage(vm.wid,page)
            $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page")
            return page;
        }

    }

    function EditPageController($routeParams){
        var vm = this;
        vm.uid= $routeParams.uid;
        vm.wid = $routeParams.wid;

    }
})();