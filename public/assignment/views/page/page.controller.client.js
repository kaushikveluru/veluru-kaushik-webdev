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

        for(var u in vm.pages){
            console.log("page name : "+vm.pages[u].name)
        }

    }

    function NewPageController($routeParams,PageService,$location){

        console.log("in new page controller ")
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.createNewPage = createNewPage;

        function createNewPage(pageName,pageTitle){
            console.log("name from form : "+pageName)
            console.log("title from form: "+pageTitle)

            var page =  { "_id": "999", "name": pageName, "websiteId": vm.wid, "description": pageTitle }
            console.log("new page name :"+page._id)
            PageService.createPage(vm.wid,page)
            $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page")



        }

    }

    function EditPageController($routeParams,PageService,$location){
        console.log("in edit page controller")
        var vm = this;
        vm.uid= $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.page = PageService.findPageById(vm.pid);

        vm.savePage = savePage;
        vm.deletePage = deletePage;

        function savePage(name,title){
            vm.page.name = name;
            vm.page.description =title;
            vm.page = PageService.updatePage(vm.pid,vm.page);

            var url = "/user/"+vm.uid+"/website/"+vm.wid+"/page"
            $location.url(url)
        }

        function deletePage(){
           PageService.deletePage(vm.pid);
            $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page")
        }


    }
})();